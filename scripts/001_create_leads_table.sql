-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Apenas operações de INSERT são permitidas publicamente (para o formulário)
-- Ninguém pode ler, atualizar ou deletar sem autenticação
CREATE POLICY "Allow public insert only" ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Prevenir leitura pública
CREATE POLICY "Prevent public read" ON leads
  FOR SELECT
  TO anon
  USING (false);

-- Policy: Prevenir atualização pública
CREATE POLICY "Prevent public update" ON leads
  FOR UPDATE
  TO anon
  USING (false);

-- Policy: Prevenir deleção pública
CREATE POLICY "Prevent public delete" ON leads
  FOR DELETE
  TO anon
  USING (false);

-- Comentários para documentação
COMMENT ON TABLE leads IS 'Tabela para armazenar leads capturados pelo formulário';
COMMENT ON COLUMN leads.nome IS 'Nome completo do lead';
COMMENT ON COLUMN leads.telefone IS 'Telefone com código do país (ex: 5511999999999)';
