"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatPhoneNumber } from "@/lib/phone-utils"
import { submitLead } from "@/app/actions/submit-lead"
import { Loader2, CheckCircle2, Phone, User } from "lucide-react"

export function LeadForm() {
  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setTelefone(formatted)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    const formData = new FormData()
    formData.append("nome", nome)
    formData.append("telefone", telefone)

    const result = await submitLead(formData)

    setIsLoading(false)

    if (result.success) {
      setMessage({ type: "success", text: result.message || "Cadastro realizado!" })
      setNome("")
      setTelefone("")

      // Limpa a mensagem após 5 segundos
      setTimeout(() => setMessage(null), 5000)
    } else {
      setMessage({ type: "error", text: result.error || "Erro ao enviar" })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <Label htmlFor="nome" className="text-sm font-medium text-white/90">
          Nome completo
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-300/60" />
          <Input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
            required
            disabled={isLoading}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-blue-400 focus:ring-blue-400/20 h-12"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefone" className="text-sm font-medium text-white/90">
          Telefone
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-300/60" />
          <Input
            id="telefone"
            type="tel"
            value={telefone}
            onChange={handlePhoneChange}
            placeholder="(00) 00000-0000"
            required
            disabled={isLoading}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-blue-400 focus:ring-blue-400/20 h-12"
          />
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg flex items-center gap-2 text-sm ${
            message.type === "success"
              ? "bg-green-500/20 text-green-100 border border-green-500/30"
              : "bg-red-500/20 text-red-100 border border-red-500/30"
          }`}
        >
          {message.type === "success" && <CheckCircle2 className="h-5 w-5" />}
          {message.text}
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg shadow-blue-500/30 transition-all duration-200"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Enviando...
          </>
        ) : (
          "Quero entrar no Grupo"
        )}
      </Button>

      <p className="text-xs text-center text-white/50">Seus dados estão protegidos e não serão compartilhados</p>
    </form>
  )
}
