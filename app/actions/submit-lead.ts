"use server"

import { getSupabaseServerClient } from "@/lib/supabase-server"
import { preparePhoneForDatabase, isValidBrazilianPhone } from "@/lib/phone-utils"
import { z } from "zod"

// Schema de validação
const leadSchema = z.object({
  nome: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),
  telefone: z.string().refine(isValidBrazilianPhone, "Telefone inválido"),
})

export async function submitLead(formData: FormData) {
  try {
    // Validação dos dados
    const nome = formData.get("nome") as string
    const telefone = formData.get("telefone") as string

    const validation = leadSchema.safeParse({ nome, telefone })

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.errors[0].message,
      }
    }

    // Prepara o telefone com código do país
    const telefoneComPais = preparePhoneForDatabase(telefone)

    // Sanitização adicional
    const nomeLimpo = nome.trim()

    // Conexão com Supabase
    const supabase = await getSupabaseServerClient()

    // Insert no banco de dados
    const { error } = await supabase.from("leads").insert({
      nome: nomeLimpo,
      telefone: telefoneComPais,
    })

    if (error) {
      console.error("[v0] Erro ao inserir lead:", error)
      return {
        success: false,
        error: "Erro ao enviar dados. Tente novamente.",
      }
    }

    return {
      success: true,
      message: "Lead cadastrado com sucesso!",
    }
  } catch (error) {
    console.error("[v0] Erro inesperado:", error)
    return {
      success: false,
      error: "Erro inesperado. Tente novamente.",
    }
  }
}
