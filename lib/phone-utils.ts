// Formata o telefone para o padrão brasileiro (00) 00000-0000
export function formatPhoneNumber(value: string): string {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, "")

  // Limita a 11 dígitos
  const limited = numbers.slice(0, 11)

  // Aplica a máscara
  if (limited.length <= 2) {
    return limited
  } else if (limited.length <= 7) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2)}`
  } else {
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`
  }
}

// Remove a formatação e adiciona o código do país (+55)
export function preparePhoneForDatabase(formattedPhone: string): string {
  const numbers = formattedPhone.replace(/\D/g, "")
  return `55${numbers}`
}

// Valida se o telefone tem 10 ou 11 dígitos (formato brasileiro)
export function isValidBrazilianPhone(phone: string): boolean {
  const numbers = phone.replace(/\D/g, "")
  return numbers.length === 10 || numbers.length === 11
}
