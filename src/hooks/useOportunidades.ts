
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

type Oportunidade = Tables<'oportunidades'>;
type OportunidadeInsert = TablesInsert<'oportunidades'>;
type OportunidadeUpdate = TablesUpdate<'oportunidades'>;

export const useOportunidades = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: oportunidades = [], isLoading } = useQuery({
    queryKey: ['oportunidades'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('oportunidades')
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

  const createOportunidade = useMutation({
    mutationFn: async (oportunidade: Omit<OportunidadeInsert, 'user_id'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('oportunidades')
        .insert({ ...oportunidade, user_id: user.id })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['oportunidades'] });
      toast({
        title: "Oportunidade criada com sucesso!",
        description: "A oportunidade foi adicionada ao pipeline."
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar oportunidade",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const updateOportunidade = useMutation({
    mutationFn: async ({ id, ...updates }: OportunidadeUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('oportunidades')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['oportunidades'] });
      toast({
        title: "Oportunidade atualizada com sucesso!",
        description: "As informações da oportunidade foram atualizadas."
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar oportunidade",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  return {
    oportunidades,
    isLoading,
    createOportunidade,
    updateOportunidade
  };
};
