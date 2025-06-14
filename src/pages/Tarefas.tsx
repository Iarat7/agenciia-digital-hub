
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search,
  Eye,
  Edit,
  CheckSquare,
  Clock,
  AlertCircle,
  User,
  Calendar
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  cliente: string;
  responsavel: string;
  status: 'pendente' | 'em_andamento' | 'concluida' | 'atrasada';
  prioridade: 'baixa' | 'media' | 'alta';
  data_prazo: string;
  data_criacao: string;
}

const Tarefas = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todas");
  const [filterPrioridade, setFilterPrioridade] = useState("todas");

  useEffect(() => {
    const tarefasSimuladas: Tarefa[] = [
      {
        id: "1",
        titulo: "Criar campanha Google Ads",
        descricao: "Desenvolvimento de campanha de tráfego pago para lançamento de produto",
        cliente: "Tech Solutions",
        responsavel: "João Marketing",
        status: "em_andamento",
        prioridade: "alta",
        data_prazo: "2024-01-25",
        data_criacao: "2024-01-15"
      },
      {
        id: "2",
        titulo: "Relatório mensal de redes sociais",
        descricao: "Compilar métricas e insights das redes sociais do cliente",
        cliente: "Inovação Digital",
        responsavel: "Maria Social",
        status: "pendente",
        prioridade: "media",
        data_prazo: "2024-01-30",
        data_criacao: "2024-01-18"
      },
      {
        id: "3",
        titulo: "Otimização SEO do site",
        descricao: "Implementar melhorias de SEO técnico e conteúdo",
        cliente: "StartupXYZ",
        responsavel: "Pedro SEO",
        status: "atrasada",
        prioridade: "alta",
        data_prazo: "2024-01-20",
        data_criacao: "2024-01-10"
      },
      {
        id: "4",
        titulo: "Criação de conteúdo blog",
        descricao: "Escrever 3 artigos para o blog do cliente",
        cliente: "Tech Solutions",
        responsavel: "Ana Conteúdo",
        status: "concluida",
        prioridade: "media",
        data_prazo: "2024-01-22",
        data_criacao: "2024-01-12"
      }
    ];
    setTarefas(tarefasSimuladas);
  }, []);

  const filteredTarefas = tarefas.filter(tarefa => {
    const matchesSearch = tarefa.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tarefa.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tarefa.responsavel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "todas" || tarefa.status === filterStatus;
    const matchesPrioridade = filterPrioridade === "todas" || tarefa.prioridade === filterPrioridade;
    return matchesSearch && matchesStatus && matchesPrioridade;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-blue-100 text-blue-800";
      case "em_andamento":
        return "bg-yellow-100 text-yellow-800";
      case "concluida":
        return "bg-green-100 text-green-800";
      case "atrasada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "baixa":
        return "bg-gray-100 text-gray-800";
      case "media":
        return "bg-orange-100 text-orange-800";
      case "alta":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pendente":
        return <Clock className="h-4 w-4" />;
      case "em_andamento":
        return <AlertCircle className="h-4 w-4" />;
      case "concluida":
        return <CheckSquare className="h-4 w-4" />;
      case "atrasada":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pendente":
        return "Pendente";
      case "em_andamento":
        return "Em Andamento";
      case "concluida":
        return "Concluída";
      case "atrasada":
        return "Atrasada";
      default:
        return status;
    }
  };

  const getPrioridadeText = (prioridade: string) => {
    switch (prioridade) {
      case "baixa":
        return "Baixa";
      case "media":
        return "Média";
      case "alta":
        return "Alta";
      default:
        return prioridade;
    }
  };

  const totalTarefas = tarefas.length;
  const tarefasPendentes = tarefas.filter(t => t.status === 'pendente').length;
  const tarefasAndamento = tarefas.filter(t => t.status === 'em_andamento').length;
  const tarefasAtrasadas = tarefas.filter(t => t.status === 'atrasada').length;

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestão de Tarefas</h1>
              <p className="text-gray-600">Organize e acompanhe tarefas por cliente</p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nova Tarefa
            </Button>
          </div>

          {/* KPIs de Tarefas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Tarefas</CardTitle>
                <CheckSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTarefas}</div>
                <p className="text-xs text-muted-foreground">
                  Todas as tarefas
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
                <Clock className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{tarefasPendentes}</div>
                <p className="text-xs text-muted-foreground">
                  Aguardando início
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
                <AlertCircle className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{tarefasAndamento}</div>
                <p className="text-xs text-muted-foreground">
                  Sendo executadas
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Atrasadas</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{tarefasAtrasadas}</div>
                <p className="text-xs text-muted-foreground">
                  Precisam de atenção
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filtros */}
          <div className="flex gap-4 items-center mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por tarefa, cliente ou responsável..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todos os Status</SelectItem>
                <SelectItem value="pendente">Pendentes</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="concluida">Concluídas</SelectItem>
                <SelectItem value="atrasada">Atrasadas</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPrioridade} onValueChange={setFilterPrioridade}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="media">Média</SelectItem>
                <SelectItem value="baixa">Baixa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Lista de Tarefas */}
        <div className="grid gap-6">
          {filteredTarefas.map((tarefa) => (
            <Card key={tarefa.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {tarefa.titulo}
                      </h3>
                      <Badge className={getStatusColor(tarefa.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(tarefa.status)}
                          {getStatusText(tarefa.status)}
                        </div>
                      </Badge>
                      <Badge className={getPrioridadeColor(tarefa.prioridade)}>
                        {getPrioridadeText(tarefa.prioridade)}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4">
                      {tarefa.descricao}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="h-4 w-4" />
                        <span className="font-medium">Cliente:</span> {tarefa.cliente}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="h-4 w-4" />
                        <span className="font-medium">Responsável:</span> {tarefa.responsavel}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium">Prazo:</span> {new Date(tarefa.data_prazo).toLocaleDateString('pt-BR')}
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

        {filteredTarefas.length === 0 && (
          <div className="text-center py-12">
            <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma tarefa encontrada
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Tente ajustar seus filtros de busca' : 'Comece criando sua primeira tarefa'}
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Tarefa
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tarefas;
