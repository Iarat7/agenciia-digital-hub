
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOportunidades } from '@/hooks/useOportunidades';
import { useClientes } from '@/hooks/useClientes';
import { Tables } from "@/integrations/supabase/types";

type Oportunidade = Tables<'oportunidades'> & {
  clientes?: {
    nome: string;
    empresa: string;
  };
};

interface OportunidadeEditDialogProps {
  oportunidade: Oportunidade | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OportunidadeEditDialog = ({ oportunidade, open, onOpenChange }: OportunidadeEditDialogProps) => {
  const { updateOportunidade } = useOportunidades();
  const { clientes } = useClientes();
  const [formData, setFormData] = useState({
    cliente_id: '',
    valor: 0,
    etapa: 'prospect' as const,
    probabilidade: 0,
    data_fechamento: '',
    descricao: ''
  });

  useEffect(() => {
    if (oportunidade) {
      setFormData({
        cliente_id: oportunidade.cliente_id || '',
        valor: oportunidade.valor || 0,
        etapa: (oportunidade.etapa as any) || 'prospect',
        probabilidade: oportunidade.probabilidade || 0,
        data_fechamento: oportunidade.data_fechamento || '',
        descricao: oportunidade.descricao || ''
      });
    }
  }, [oportunidade]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oportunidade) return;
    
    updateOportunidade.mutate({
      id: oportunidade.id,
      ...formData
    }, {
      onSuccess: () => {
        onOpenChange(false);
      }
    });
  };

  if (!oportunidade) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Oportunidade</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cliente">Cliente</Label>
            <Select value={formData.cliente_id} onValueChange={(value) => setFormData({ ...formData, cliente_id: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um cliente" />
              </SelectTrigger>
              <SelectContent>
                {clientes.map((cliente) => (
                  <SelectItem key={cliente.id} value={cliente.id}>
                    {cliente.nome} - {cliente.empresa}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="valor">Valor da Proposta</Label>
              <Input
                id="valor"
                type="number"
                value={formData.valor}
                onChange={(e) => setFormData({ ...formData, valor: Number(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label htmlFor="probabilidade">Probabilidade (%)</Label>
              <Input
                id="probabilidade"
                type="number"
                min="0"
                max="100"
                value={formData.probabilidade}
                onChange={(e) => setFormData({ ...formData, probabilidade: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="etapa">Etapa</Label>
              <Select value={formData.etapa} onValueChange={(value) => setFormData({ ...formData, etapa: value as any })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prospect">Prospect</SelectItem>
                  <SelectItem value="proposta">Proposta</SelectItem>
                  <SelectItem value="negociacao">Negociação</SelectItem>
                  <SelectItem value="fechado">Fechado</SelectItem>
                  <SelectItem value="perdido">Perdido</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="data_fechamento">Data de Fechamento</Label>
              <Input
                id="data_fechamento"
                type="date"
                value={formData.data_fechamento}
                onChange={(e) => setFormData({ ...formData, data_fechamento: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={updateOportunidade.isPending}>
              {updateOportunidade.isPending ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OportunidadeEditDialog;
