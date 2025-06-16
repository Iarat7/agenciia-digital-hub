
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

type Cliente = Tables<'clientes'>;
type ClienteInsert = TablesInsert<'clientes'>;
type ClienteUpdate = TablesUpdate<'clientes'>;

export const useClientes = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: clientes = [], isLoading } = useQuery({
    queryKey: ['clientes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const createCliente = useMutation({
    mutationFn: async (cliente: Omit<ClienteInsert, 'user_id'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('clientes')
        .insert({ ...cliente, user_id: user.id })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
      toast({
        title: "Cliente criado com sucesso!",
        description: "O cliente foi adicionado ao sistema."
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar cliente",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const updateCliente = useMutation({
    mutationFn: async ({ id, ...updates }: ClienteUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('clientes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
      toast({
        title: "Cliente atualizado com sucesso!",
        description: "As informações do cliente foram atualizadas."
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar cliente",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const deleteCliente = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('clientes')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
      toast({
        title: "Cliente removido com sucesso!",
        description: "O cliente foi removido do sistema."
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao remover cliente",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  return {
    clientes,
    isLoading,
    createCliente,
    updateCliente,
    deleteCliente
  };
};
