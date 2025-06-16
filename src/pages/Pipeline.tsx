
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Eye,
  Edit,
  DollarSign,
  Calendar,
  TrendingUp
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useOportunidades } from "@/hooks/useOportunidades";
import OportunidadeForm from "@/components/forms/OportunidadeForm";

const Pipeline = () => {
  const { oportunidades, isLoading } = useOportunidades();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando oportunidades...</p>
          </div>
        </div>
      </div>
    );
  }

  const totalValor = oportunidades.reduce((acc, opp) => acc + (opp.valor || 0), 0);
  const valorPonderado = oportunidades.reduce((acc, opp) => acc + ((opp.valor || 0) * (opp.probabilidade || 0) / 100), 0);

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pipeline Comercial</h1>
              <p className="text-gray-600">Gerencie suas oportunidades de vendas</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Nova Oportunidade
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Criar Nova Oportunidade</DialogTitle>
                </DialogHeader>
                <OportunidadeForm onSuccess={() => setIsDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total em Pipeline</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {totalValor.toLocaleString('pt-BR')}</div>
                <p className="text-xs text-muted-foreground">
                  {oportunidades.length} oportunidades
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Valor Ponderado</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {valorPonderado.toLocaleString('pt-BR')}</div>
                <p className="text-xs text-muted-foreground">
                  Baseado na probabilidade
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25%</div>
                <p className="text-xs text-muted-foreground">
                  Últimos 30 dias
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Lista de Oportunidades */}
        <div className="grid gap-6">
          {oportunidades.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">Nenhuma oportunidade encontrada. Crie sua primeira oportunidade!</p>
              </CardContent>
            </Card>
          ) : (
            oportunidades.map((oportunidade) => (
              <Card key={oportunidade.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {oportunidade.clientes?.nome || 'Cliente não encontrado'}
                        </h3>
                        <Badge className={getEtapaColor(oportunidade.etapa || 'prospect')}>
                          {getEtapaText(oportunidade.etapa || 'prospect')}
                        </Badge>
                        <Badge variant="outline">
                          {oportunidade.probabilidade || 0}% probabilidade
                        </Badge>
                      </div>
                      <p className="text-gray-600 font-medium mb-3">
                        {oportunidade.clientes?.empresa || 'Empresa não informada'}
                      </p>
                      <p className="text-gray-700 mb-4">
                        {oportunidade.descricao}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Valor da Proposta</p>
                          <p className="text-xl font-semibold text-green-600">
                            R$ {(oportunidade.valor || 0).toLocaleString('pt-BR')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Fechamento Previsto</p>
                          <p className="text-sm font-medium">
                            {oportunidade.data_fechamento 
                              ? new Date(oportunidade.data_fechamento).toLocaleDateString('pt-BR')
                              : 'Não definido'
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Pipeline;
