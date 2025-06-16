
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

type Contrato = Tables<'contratos'>;
type ContratoInsert = TablesInsert<'contratos'>;
type ContratoUpdate = TablesUpdate<'contratos'>;

export const useContratos = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: contratos = [], isLoading } = useQuery({
    queryKey: ['contratos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contratos')
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

  const createContrato = useMutation({
    mutationFn: async (contrato: Omit<ContratoInsert, 'user_id'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('contratos')
        .insert({ ...contrato, user_id: user.id })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contratos'] });
      toast({
        title: "Contrato criado com sucesso!",
        description: "O contrato foi adicionado ao sistema."
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar contrato",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const updateContrato = useMutation({
    mutationFn: async ({ id, ...updates }: ContratoUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('contratos')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contratos'] });
      toast({
        title: "Contrato atualizado com sucesso!",
        description: "As informações do contrato foram atualizadas."
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar contrato",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const deleteContrato = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contratos')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contratos'] });
      toast({
        title: "Contrato removido com sucesso!",
        description: "O contrato foi removido do sistema."
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao remover contrato",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  return {
    contratos,
    isLoading,
    createContrato,
    updateContrato,
    deleteContrato
  };
};
