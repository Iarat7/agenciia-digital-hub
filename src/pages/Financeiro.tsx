
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
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

interface Contrato {
  id: string;
  cliente: string;
  empresa: string;
  valor_mensal: number;
  data_vencimento: string;
  status_pagamento: 'pago' | 'pendente' | 'atrasado';
  tipo_servico: string;
  data_inicio: string;
  observacoes: string;
}

const Financeiro = () => {
  const [contratos, setContratos] = useState<Contrato[]>([]);

  useEffect(() => {
    const contratosSimulados: Contrato[] = [
      {
        id: "1",
        cliente: "João Silva",
        empresa: "Tech Solutions",
        valor_mensal: 5000,
        data_vencimento: "2024-01-15",
        status_pagamento: "pago",
        tipo_servico: "SEO + Tráfego Pago",
        data_inicio: "2023-06-15",
        observacoes: "Cliente pontual, sem problemas"
      },
      {
        id: "2",
        cliente: "Maria Santos",
        empresa: "Inovação Digital",
        valor_mensal: 3000,
        data_vencimento: "2024-01-20",
        status_pagamento: "pendente",
        tipo_servico: "Redes Sociais",
        data_inicio: "2023-08-20",
        observacoes: "Pagamento programado para hoje"
      },
      {
        id: "3",
        cliente: "Carlos Oliveira",
        empresa: "StartupXYZ",
        valor_mensal: 7500,
        data_vencimento: "2024-01-10",
        status_pagamento: "atrasado",
        tipo_servico: "Growth Marketing",
        data_inicio: "2023-05-10",
        observacoes: "Entrar em contato urgente"
      }
    ];
    setContratos(contratosSimulados);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pago":
        return "bg-green-100 text-green-800";
      case "pendente":
        return "bg-yellow-100 text-yellow-800";
      case "atrasado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pago":
        return <CheckCircle className="h-4 w-4" />;
      case "pendente":
        return <Clock className="h-4 w-4" />;
      case "atrasado":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pago":
        return "Pago";
      case "pendente":
        return "Pendente";
      case "atrasado":
        return "Atrasado";
      default:
        return status;
    }
  };

  const totalReceita = contratos.reduce((acc, contrato) => acc + contrato.valor_mensal, 0);
  const receitaPaga = contratos.filter(c => c.status_pagamento === 'pago').reduce((acc, contrato) => acc + contrato.valor_mensal, 0);
  const receitaPendente = contratos.filter(c => c.status_pagamento === 'pendente').reduce((acc, contrato) => acc + contrato.valor_mensal, 0);
  const receitaAtrasada = contratos.filter(c => c.status_pagamento === 'atrasado').reduce((acc, contrato) => acc + contrato.valor_mensal, 0);

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Controle Financeiro</h1>
              <p className="text-gray-600">Gerencie contratos, vencimentos e pagamentos</p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Novo Contrato
            </Button>
          </div>

          {/* KPIs Financeiros */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {totalReceita.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {contratos.length} contratos ativos
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Confirmada</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">R$ {receitaPaga.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Pagamentos recebidos
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Pendente</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">R$ {receitaPendente.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Aguardando pagamento
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Atrasada</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">R$ {receitaAtrasada.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Pagamentos em atraso
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Lista de Contratos */}
        <div className="grid gap-6">
          {contratos.map((contrato) => (
            <Card key={contrato.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {contrato.cliente}
                      </h3>
                      <Badge className={getStatusColor(contrato.status_pagamento)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(contrato.status_pagamento)}
                          {getStatusText(contrato.status_pagamento)}
                        </div>
                      </Badge>
                    </div>
                    <p className="text-gray-600 font-medium mb-2">
                      {contrato.empresa}
                    </p>
                    <p className="text-gray-700 mb-4">
                      {contrato.tipo_servico}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Valor Mensal</p>
                        <p className="text-lg font-semibold text-green-600">
                          R$ {contrato.valor_mensal.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Próximo Vencimento</p>
                        <p className="text-sm font-medium">
                          {new Date(contrato.data_vencimento).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Cliente desde</p>
                        <p className="text-sm font-medium">
                          {new Date(contrato.data_inicio).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>

                    {contrato.observacoes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">{contrato.observacoes}</p>
                      </div>
                    )}
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

export default Financeiro;
