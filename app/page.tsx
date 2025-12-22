import { LeadForm } from "@/components/lead-form"
import { Sparkles, Shield, Zap } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8 text-white">
            

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                Participe do Grupo Grátis{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100">
                  de Comunicação
                </span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100/80 text-pretty leading-relaxed">
                Entre para o Grupo Grátis e tenha acesso a conteúdos exclusivos que vão te ajudar a se comunicar com mais clareza, segurança e naturalidade, mesmo que você seja tímido ou introvertido.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-500/20 p-2 mt-1">
                  <Zap className="h-5 w-5 text-blue-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Dicas práticas de comunicação</h3>
                  <p className="text-sm text-blue-100/70">Conteúdos simples e aplicáveis para melhorar sua fala no dia a dia.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-500/20 p-2 mt-1">
                  <Shield className="h-5 w-5 text-blue-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Aulas gratuitas de oratória e dicção</h3>
                  <p className="text-sm text-blue-100/70">Exercícios, técnicas e orientações para falar melhor e com mais confiança.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Entre no Grupo Grátis</h2>
                <p className="text-blue-100/70">Preencha os dados abaixo e receba o acesso imediatamente.</p>
              </div>

              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
