
import { useState, useEffect } from "react";
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

interface Oportunidade {
  id: string;
  cliente: string;
  empresa: string;
  valor: number;
  etapa: 'prospect' | 'proposta' | 'negociacao' | 'fechado' | 'perdido';
  probabilidade: number;
  data_fechamento: string;
  descricao: string;
}

const Pipeline = () => {
  const [oportunidades, setOportunidades] = useState<Oportunidade[]>([]);

  useEffect(() => {
    const oportunidadesSimuladas: Oportunidade[] = [
      {
        id: "1",
        cliente: "João Silva",
        empresa: "Tech Solutions",
        valor: 15000,
        etapa: "proposta",
        probabilidade: 70,
        data_fechamento: "2024-02-15",
        descricao: "Campanha de marketing digital completa"
      },
      {
        id: "2",
        cliente: "Maria Santos",
        empresa: "Inovação Digital",
        valor: 8000,
        etapa: "negociacao",
        probabilidade: 50,
        data_fechamento: "2024-02-20",
        descricao: "Gestão de redes sociais"
      },
      {
        id: "3",
        cliente: "Carlos Oliveira",
        empresa: "StartupXYZ",
        valor: 25000,
        etapa: "prospect",
        probabilidade: 30,
        data_fechamento: "2024-03-01",
        descricao: "Plano completo de growth marketing"
      }
    ];
    setOportunidades(oportunidadesSimuladas);
  }, []);

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

  const totalValor = oportunidades.reduce((acc, opp) => acc + opp.valor, 0);
  const valorPonderado = oportunidades.reduce((acc, opp) => acc + (opp.valor * opp.probabilidade / 100), 0);

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
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nova Oportunidade
            </Button>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total em Pipeline</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {totalValor.toLocaleString()}</div>
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
                <div className="text-2xl font-bold">R$ {valorPonderado.toLocaleString()}</div>
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
          {oportunidades.map((oportunidade) => (
            <Card key={oportunidade.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {oportunidade.cliente}
                      </h3>
                      <Badge className={getEtapaColor(oportunidade.etapa)}>
                        {getEtapaText(oportunidade.etapa)}
                      </Badge>
                      <Badge variant="outline">
                        {oportunidade.probabilidade}% probabilidade
                      </Badge>
                    </div>
                    <p className="text-gray-600 font-medium mb-3">
                      {oportunidade.empresa}
                    </p>
                    <p className="text-gray-700 mb-4">
                      {oportunidade.descricao}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Valor da Proposta</p>
                        <p className="text-xl font-semibold text-green-600">
                          R$ {oportunidade.valor.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Fechamento Previsto</p>
                        <p className="text-sm font-medium">
                          {new Date(oportunidade.data_fechamento).toLocaleDateString('pt-BR')}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pipeline;
