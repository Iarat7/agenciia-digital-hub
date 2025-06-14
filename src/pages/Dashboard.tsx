
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Calendar,
  Target,
  Award
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [kpis, setKpis] = useState({
    totalClients: 0,
    activeProjects: 0,
    monthlyRevenue: 0,
    pendingTasks: 0,
    conversionRate: 0,
    completedTasks: 0
  });

  useEffect(() => {
    // Simular dados dos KPIs - será substituído por dados reais do Supabase
    setKpis({
      totalClients: 24,
      activeProjects: 18,
      monthlyRevenue: 45000,
      pendingTasks: 12,
      conversionRate: 23.5,
      completedTasks: 156
    });
  }, []);

  const quickStats = [
    {
      title: "Clientes Ativos",
      value: kpis.totalClients,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Faturamento Mensal",
      value: `R$ ${kpis.monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Projetos Ativos",
      value: kpis.activeProjects,
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Tarefas Pendentes",
      value: kpis.pendingTasks,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard - Agência Digital
          </h1>
          <p className="text-gray-600">
            Visão geral dos seus projetos, clientes e faturamento
          </p>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/crm')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                CRM - Clientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Gerencie seus clientes, histórico e informações de contato
              </p>
              <Button className="w-full">Acessar CRM</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/pipeline')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Pipeline Comercial
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Acompanhe leads, propostas e conversões
              </p>
              <Button className="w-full">Ver Pipeline</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/financeiro')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Controle Financeiro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Contratos, pagamentos e vencimentos
              </p>
              <Button className="w-full">Ver Financeiro</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/tarefas')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-purple-600" />
                Gestão de Tarefas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Organize tarefas por cliente e projeto
              </p>
              <Button className="w-full">Ver Tarefas</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/estrategias')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-indigo-600" />
                Estratégias IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Gere estratégias personalizadas com IA
              </p>
              <Button className="w-full">Criar Estratégia</Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">Novo cliente cadastrado</p>
                  <p className="text-sm text-gray-600">Empresa ABC Tech - há 2 horas</p>
                </div>
                <Badge variant="outline">Novo</Badge>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">Proposta enviada</p>
                  <p className="text-sm text-gray-600">Projeto de SEO - há 4 horas</p>
                </div>
                <Badge variant="outline">Proposta</Badge>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">Tarefa concluída</p>
                  <p className="text-sm text-gray-600">Criação de conteúdo - há 6 horas</p>
                </div>
                <Badge variant="outline">Concluído</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
