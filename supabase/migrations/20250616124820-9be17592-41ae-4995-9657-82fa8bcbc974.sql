
-- Habilitar RLS em todas as tabelas (se ainda não estiverem)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contratos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.oportunidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tarefas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estrategias ENABLE ROW LEVEL SECURITY;

-- Remover políticas existentes se houver
DROP POLICY IF EXISTS "Usuários podem ver e editar seu próprio perfil" ON public.profiles;
DROP POLICY IF EXISTS "Usuários podem gerenciar seus próprios clientes" ON public.clientes;
DROP POLICY IF EXISTS "Usuários podem gerenciar seus próprios contratos" ON public.contratos;
DROP POLICY IF EXISTS "Usuários podem gerenciar suas próprias oportunidades" ON public.oportunidades;
DROP POLICY IF EXISTS "Usuários podem gerenciar suas próprias tarefas" ON public.tarefas;
DROP POLICY IF EXISTS "Usuários podem gerenciar suas próprias estratégias" ON public.estrategias;

-- Políticas RLS para profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Políticas RLS para clientes
CREATE POLICY "Users can view own clients" ON public.clientes
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own clients" ON public.clientes
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own clients" ON public.clientes
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own clients" ON public.clientes
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para contratos
CREATE POLICY "Users can view own contracts" ON public.contratos
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own contracts" ON public.contratos
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own contracts" ON public.contratos
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own contracts" ON public.contratos
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para oportunidades
CREATE POLICY "Users can view own opportunities" ON public.oportunidades
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own opportunities" ON public.oportunidades
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own opportunities" ON public.oportunidades
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own opportunities" ON public.oportunidades
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para tarefas
CREATE POLICY "Users can view own tasks" ON public.tarefas
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own tasks" ON public.tarefas
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tasks" ON public.tarefas
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own tasks" ON public.tarefas
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para estratégias
CREATE POLICY "Users can view own strategies" ON public.estrategias
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own strategies" ON public.estrategias
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own strategies" ON public.estrategias
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own strategies" ON public.estrategias
  FOR DELETE USING (auth.uid() = user_id);
