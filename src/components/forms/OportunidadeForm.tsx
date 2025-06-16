
import { useState } from 'react';
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

interface OportunidadeFormProps {
  onSuccess?: () => void;
}

const OportunidadeForm = ({ onSuccess }: OportunidadeFormProps) => {
  const { createOportunidade } = useOportunidades();
  const { clientes } = useClientes();
  const [formData, setFormData] = useState({
    cliente_id: '',
    valor: 0,
    etapa: 'prospect' as const,
    probabilidade: 0,
    data_fechamento: '',
    descricao: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    createOportunidade.mutate(formData, {
      onSuccess: () => {
        setFormData({
          cliente_id: '',
          valor: 0,
          etapa: 'prospect',
          probabilidade: 0,
          data_fechamento: '',
          descricao: ''
        });
        onSuccess?.();
      }
    });
  };

  return (
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

      <Button type="submit" disabled={createOportunidade.isPending}>
        {createOportunidade.isPending ? "Salvando..." : "Salvar Oportunidade"}
      </Button>
    </form>
  );
};

export default OportunidadeForm;
