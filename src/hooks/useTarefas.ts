
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

type Tarefa = Tables<'tarefas'>;
type TarefaInsert = TablesInsert<'tarefas'>;
type TarefaUpdate = TablesUpdate<'tarefas'>;

export const useTarefas = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tarefas = [], isLoading } = useQuery({
    queryKey: ['tarefas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tarefas')
        .select(`
          *,
          clientes (
            nome,
            empresa
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const createTarefa = useMutation({
    mutationFn: async (tarefa: Omit<TarefaInsert, 'user_id'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('tarefas')
        .insert({ ...tarefa, user_id: user.id })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tarefas'] });
      toast({
        title: "Tarefa criada com sucesso!",
        description: "A tarefa foi adicionada ao sistema."
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar tarefa",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const updateTarefa = useMutation({
    mutationFn: async ({ id, ...updates }: TarefaUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('tarefas')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tarefas'] });
      toast({
        title: "Tarefa atualizada com sucesso!",
        description: "As informações da tarefa foram atualizadas."
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar tarefa",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  return {
    tarefas,
    isLoading,
    createTarefa,
    updateTarefa
  };
};
