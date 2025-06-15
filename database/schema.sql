
-- Habilitar RLS (Row Level Security) e criar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de usuários (profiles) - estende auth.users
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  nome TEXT,
  empresa TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de clientes
CREATE TABLE public.clientes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nome TEXT NOT NULL,
  empresa TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT,
  cidade TEXT,
  status TEXT CHECK (status IN ('ativo', 'inativo', 'prospect')) DEFAULT 'prospect',
  valor_contrato DECIMAL(10,2) DEFAULT 0,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de contratos/financeiro
CREATE TABLE public.contratos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  cliente_id UUID REFERENCES public.clientes(id) ON DELETE CASCADE NOT NULL,
  valor_mensal DECIMAL(10,2) NOT NULL,
  data_vencimento DATE NOT NULL,
  status_pagamento TEXT CHECK (status_pagamento IN ('pago', 'pendente', 'atrasado')) DEFAULT 'pendente',
  tipo_servico TEXT NOT NULL,
  data_inicio DATE NOT NULL,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de oportunidades (pipeline)
CREATE TABLE public.oportunidades (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  cliente_id UUID REFERENCES public.clientes(id) ON DELETE CASCADE NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  etapa TEXT CHECK (etapa IN ('prospect', 'proposta', 'negociacao', 'fechado', 'perdido')) DEFAULT 'prospect',
  probabilidade INTEGER CHECK (probabilidade >= 0 AND probabilidade <= 100) DEFAULT 0,
  data_fechamento DATE,
  descricao TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de tarefas
CREATE TABLE public.tarefas (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  cliente_id UUID REFERENCES public.clientes(id) ON DELETE CASCADE NOT NULL,
  titulo TEXT NOT NULL,
  descricao TEXT,
  responsavel TEXT NOT NULL,
  status TEXT CHECK (status IN ('pendente', 'em_andamento', 'concluida', 'atrasada')) DEFAULT 'pendente',
  prioridade TEXT CHECK (prioridade IN ('baixa', 'media', 'alta')) DEFAULT 'media',
  data_prazo DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de estratégias geradas por IA
CREATE TABLE public.estrategias (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  cliente_id UUID REFERENCES public.clientes(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  tipo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  conteudo_completo TEXT,
  status TEXT CHECK (status IN ('gerada', 'em_analise', 'aprovada', 'implementada')) DEFAULT 'gerada',
  prompt_original TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contratos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.oportunidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tarefas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estrategias ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Usuários podem ver e editar seu próprio perfil" ON public.profiles
  FOR ALL USING (auth.uid() = id);

-- Políticas RLS para clientes
CREATE POLICY "Usuários podem gerenciar seus próprios clientes" ON public.clientes
  FOR ALL USING (auth.uid() = user_id);

-- Políticas RLS para contratos
CREATE POLICY "Usuários podem gerenciar seus próprios contratos" ON public.contratos
  FOR ALL USING (auth.uid() = user_id);

-- Políticas RLS para oportunidades
CREATE POLICY "Usuários podem gerenciar suas próprias oportunidades" ON public.oportunidades
  FOR ALL USING (auth.uid() = user_id);

-- Políticas RLS para tarefas
CREATE POLICY "Usuários podem gerenciar suas próprias tarefas" ON public.tarefas
  FOR ALL USING (auth.uid() = user_id);

-- Políticas RLS para estratégias
CREATE POLICY "Usuários podem gerenciar suas próprias estratégias" ON public.estrategias
  FOR ALL USING (auth.uid() = user_id);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar updated_at
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.clientes
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.contratos
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.oportunidades
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.tarefas
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.estrategias
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Função para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, nome)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'nome');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Inserir dados de exemplo (opcional - apenas para teste)
INSERT INTO public.clientes (user_id, nome, empresa, email, telefone, cidade, status, valor_contrato, observacoes) VALUES
  ('00000000-0000-0000-0000-000000000000', 'João Silva', 'Tech Solutions', 'joao@techsolutions.com', '(11) 99999-9999', 'São Paulo', 'ativo', 5000.00, 'Cliente estratégico, foco em SEO'),
  ('00000000-0000-0000-0000-000000000000', 'Maria Santos', 'Inovação Digital', 'maria@inovacao.com', '(11) 88888-8888', 'Rio de Janeiro', 'prospect', 3000.00, 'Interessada em redes sociais'),
  ('00000000-0000-0000-0000-000000000000', 'Carlos Oliveira', 'StartupXYZ', 'carlos@startupxyz.com', '(11) 77777-7777', 'Belo Horizonte', 'ativo', 7500.00, 'Foco em performance marketing');

-- Nota: Substitua '00000000-0000-0000-0000-000000000000' pelo ID real do usuário após a autenticação
