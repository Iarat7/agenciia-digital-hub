
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Calendar, 
  DollarSign,
  Edit,
  Trash2
} from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type Cliente = Tables<'clientes'>;

interface ClienteDetailsDialogProps {
  cliente: Cliente | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (cliente: Cliente) => void;
  onDelete: (clienteId: string) => void;
}

const ClienteDetailsDialog = ({ 
  cliente, 
  open, 
  onOpenChange, 
  onEdit, 
  onDelete 
}: ClienteDetailsDialogProps) => {
  if (!cliente) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-800";
      case "inativo":
        return "bg-red-100 text-red-800";
      case "prospect":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Detalhes do Cliente</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(cliente)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(cliente.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">{cliente.nome}</h2>
            <Badge className={getStatusColor(cliente.status || 'prospect')}>
              {cliente.status?.charAt(0).toUpperCase() + cliente.status?.slice(1)}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Building className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Empresa</p>
                  <p className="font-medium">{cliente.empresa}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">E-mail</p>
                  <p className="font-medium">{cliente.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Telefone</p>
                  <p className="font-medium">{cliente.telefone || 'Não informado'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Cidade</p>
                  <p className="font-medium">{cliente.cidade || 'Não informado'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Valor do Contrato</p>
                  <p className="font-medium text-green-600">
                    R$ {(cliente.valor_contrato || 0).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Cliente desde</p>
                  <p className="font-medium">
                    {new Date(cliente.created_at || '').toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {cliente.observacoes && (
            <div>
              <p className="text-sm text-gray-500 mb-2">Observações</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">{cliente.observacoes}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClienteDetailsDialog;
