
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, Target, Calendar, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Users,
      title: "CRM Completo",
      description: "Gerencie clientes, histórico e informações de contato de forma centralizada"
    },
    {
      icon: Target,
      title: "Pipeline Comercial",
      description: "Acompanhe leads, propostas e conversões em um funil visual"
    },
    {
      icon: BarChart3,
      title: "Controle Financeiro",
      description: "Monitore contratos, pagamentos e vencimentos automaticamente"
    },
    {
      icon: Calendar,
      title: "Gestão de Tarefas",
      description: "Organize tarefas por cliente e projeto com prazos e prioridades"
    },
    {
      icon: Award,
      title: "Estratégias com IA",
      description: "Gere estratégias personalizadas com inteligência artificial"
    },
    {
      icon: TrendingUp,
      title: "Dashboards Inteligentes",
      description: "Visualize KPIs e métricas importantes em tempo real"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">CRM Agência</span>
          </div>
          <Link to="/auth">
            <Button>Entrar / Cadastrar</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Sistema CRM para
          <span className="text-blue-600"> Agências Digitais</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Gerencie clientes, controle financeiro, pipeline comercial e gere estratégias com IA. 
          Tudo em uma plataforma completa para sua agência crescer.
        </p>
        <div className="space-x-4">
          <Link to="/auth">
            <Button size="lg" className="px-8 py-3 text-lg">
              Começar Agora
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
            Ver Demo
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tudo que sua agência precisa
          </h2>
          <p className="text-lg text-gray-600">
            Funcionalidades completas para gerenciar e fazer crescer seu negócio
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para transformar sua agência?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Comece hoje mesmo e veja os resultados na primeira semana
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
              Criar Conta Grátis
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BarChart3 className="h-6 w-6" />
            <span className="text-xl font-bold">CRM Agência</span>
          </div>
          <p className="text-gray-400">
            © 2024 CRM Agência. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
