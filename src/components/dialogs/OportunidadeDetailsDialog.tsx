
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign,
  Calendar,
  TrendingUp,
  Building,
  User,
  Edit,
  Trash2
} from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type Oportunidade = Tables<'oportunidades'> & {
  clientes?: {
    nome: string;
    empresa: string;
  };
};

interface OportunidadeDetailsDialogProps {
  oportunidade: Oportunidade | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (oportunidade: Oportunidade) => void;
  onDelete: (oportunidadeId: string) => void;
}

const OportunidadeDetailsDialog = ({ 
  oportunidade, 
  open, 
  onOpenChange, 
  onEdit, 
  onDelete 
}: OportunidadeDetailsDialogProps) => {
  if (!oportunidade) return null;

  const getEtapaColor = (etapa: string) => {
    switch (etapa) {
      case "prospect":
        return "bg-blue-100 text-blue-800";
      case "proposta":
        return "bg-yellow-100 text-yellow-800";
      case "negociacao":
        return "bg-orange-100 text-orange-800";
      case "fechado":
        return "bg-green-100 text-green-800";
      case "perdido":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getEtapaText = (etapa: string) => {
    switch (etapa) {
      case "prospect":
        return "Prospect";
      case "proposta":
        return "Proposta";
      case "negociacao":
        return "Negociação";
      case "fechado":
        return "Fechado";
      case "perdido":
        return "Perdido";
      default:
        return etapa;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Detalhes da Oportunidade</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(oportunidade)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(oportunidade.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Badge className={getEtapaColor(oportunidade.etapa || 'prospect')}>
              {getEtapaText(oportunidade.etapa || 'prospect')}
            </Badge>
            <Badge variant="outline">
              {oportunidade.probabilidade || 0}% probabilidade
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Cliente</p>
                  <p className="font-medium">{oportunidade.clientes?.nome || 'Cliente não encontrado'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Building className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Empresa</p>
                  <p className="font-medium">{oportunidade.clientes?.empresa || 'Empresa não informada'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Valor da Proposta</p>
                  <p className="font-medium text-green-600 text-xl">
                    R$ {(oportunidade.valor || 0).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Probabilidade</p>
                  <p className="font-medium">{oportunidade.probabilidade || 0}%</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Fechamento Previsto</p>
                  <p className="font-medium">
                    {oportunidade.data_fechamento 
                      ? new Date(oportunidade.data_fechamento).toLocaleDateString('pt-BR')
                      : 'Não definido'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Criado em</p>
                  <p className="font-medium">
                    {new Date(oportunidade.created_at || '').toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Descrição</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">{oportunidade.descricao}</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <p className="font-medium text-blue-900">Valor Ponderado</p>
            </div>
            <p className="text-2xl font-bold text-blue-600">
              R$ {((oportunidade.valor || 0) * (oportunidade.probabilidade || 0) / 100).toLocaleString('pt-BR')}
            </p>
            <p className="text-sm text-blue-700">
              Valor baseado na probabilidade de fechamento
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OportunidadeDetailsDialog;
