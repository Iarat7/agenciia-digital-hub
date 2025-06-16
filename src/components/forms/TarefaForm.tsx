
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
import { useTarefas } from '@/hooks/useTarefas';
import { useClientes } from '@/hooks/useClientes';

interface TarefaFormProps {
  onSuccess?: () => void;
}

const TarefaForm = ({ onSuccess }: TarefaFormProps) => {
  const { createTarefa } = useTarefas();
  const { clientes } = useClientes();
  const [formData, setFormData] = useState({
    cliente_id: '',
    titulo: '',
    descricao: '',
    responsavel: '',
    status: 'pendente' as const,
    prioridade: 'media' as const,
    data_prazo: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    createTarefa.mutate(formData, {
      onSuccess: () => {
        setFormData({
          cliente_id: '',
          titulo: '',
          descricao: '',
          responsavel: '',
          status: 'pendente',
          prioridade: 'media',
          data_prazo: ''
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
      
      <div>
        <Label htmlFor="titulo">Título da Tarefa</Label>
        <Input
          id="titulo"
          value={formData.titulo}
          onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea
          id="descricao"
          value={formData.descricao}
          onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="responsavel">Responsável</Label>
          <Input
            id="responsavel"
            value={formData.responsavel}
            onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="data_prazo">Data do Prazo</Label>
          <Input
            id="data_prazo"
            type="date"
            value={formData.data_prazo}
            onChange={(e) => setFormData({ ...formData, data_prazo: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as any })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="em_andamento">Em Andamento</SelectItem>
              <SelectItem value="concluida">Concluída</SelectItem>
              <SelectItem value="atrasada">Atrasada</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="prioridade">Prioridade</Label>
          <Select value={formData.prioridade} onValueChange={(value) => setFormData({ ...formData, prioridade: value as any })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="baixa">Baixa</SelectItem>
              <SelectItem value="media">Média</SelectItem>
              <SelectItem value="alta">Alta</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" disabled={createTarefa.isPending}>
        {createTarefa.isPending ? "Salvando..." : "Salvar Tarefa"}
      </Button>
    </form>
  );
};

export default TarefaForm;
