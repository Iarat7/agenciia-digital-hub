
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb,
  Sparkles,
  Download,
  Eye,
  Plus,
  Zap,
  Target,
  TrendingUp
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Estrategia {
  id: string;
  titulo: string;
  tipo: string;
  cliente: string;
  descricao: string;
  data_criacao: string;
  status: 'gerada' | 'em_analise' | 'aprovada' | 'implementada';
}

const EstrategiasIA = () => {
  const [estrategias] = useState<Estrategia[]>([
    {
      id: "1",
      titulo: "Estratégia de Growth para E-commerce",
      tipo: "Growth Marketing",
      cliente: "Tech Solutions",
      descricao: "Estratégia completa focada em aumentar conversões através de funis otimizados e retargeting...",
      data_criacao: "2024-01-15",
      status: "aprovada"
    },
    {
      id: "2",
      titulo: "Campanha de Lançamento de Produto",
      tipo: "Marketing Digital",
      cliente: "Inovação Digital",
      descricao: "Plano integrado para lançamento de produto incluindo teasing, pré-venda e go-to-market...",
      data_criacao: "2024-01-18",
      status: "em_analise"
    }
  ]);

  const [novaEstrategia, setNovaEstrategia] = useState({
    cliente: "",
    tipo: "",
    objetivos: "",
    publico: "",
    contexto: ""
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "gerada":
        return "bg-blue-100 text-blue-800";
      case "em_analise":
        return "bg-yellow-100 text-yellow-800";
      case "aprovada":
        return "bg-green-100 text-green-800";
      case "implementada":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "gerada":
        return "Gerada";
      case "em_analise":
        return "Em Análise";
      case "aprovada":
        return "Aprovada";
      case "implementada":
        return "Implementada";
      default:
        return status;
    }
  };

  const handleGerarEstrategia = async () => {
    setIsGenerating(true);
    // Aqui será implementada a integração com OpenAI via Edge Function
    setTimeout(() => {
      setIsGenerating(false);
      // Simular sucesso por enquanto
    }, 3000);
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Lightbulb className="h-8 w-8 text-yellow-500" />
                Estratégias IA
              </h1>
              <p className="text-gray-600">Gere estratégias personalizadas com inteligência artificial</p>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Estratégias Geradas</CardTitle>
                <Sparkles className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{estrategias.length}</div>
                <p className="text-xs text-muted-foreground">
                  Total de estratégias criadas
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Em Implementação</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {estrategias.filter(e => e.status === 'aprovada' || e.status === 'implementada').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Estratégias ativas
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">
                  Estratégias aprovadas pelos clientes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gerador de Estratégias */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-500" />
                Gerar Nova Estratégia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Cliente</label>
                <Input
                  placeholder="Selecione ou digite o nome do cliente"
                  value={novaEstrategia.cliente}
                  onChange={(e) => setNovaEstrategia({...novaEstrategia, cliente: e.target.value})}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Tipo de Estratégia</label>
                <Select value={novaEstrategia.tipo} onValueChange={(value) => setNovaEstrategia({...novaEstrategia, tipo: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="growth">Growth Marketing</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="content">Marketing de Conteúdo</SelectItem>
                    <SelectItem value="paid">Tráfego Pago</SelectItem>
                    <SelectItem value="seo">SEO</SelectItem>
                    <SelectItem value="email">Email Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Objetivos</label>
                <Textarea
                  placeholder="Descreva os objetivos específicos (ex: aumentar vendas em 30%, gerar 500 leads/mês...)"
                  value={novaEstrategia.objetivos}
                  onChange={(e) => setNovaEstrategia({...novaEstrategia, objetivos: e.target.value})}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Público-Alvo</label>
                <Textarea
                  placeholder="Descreva o público-alvo (idade, interesses, comportamento...)"
                  value={novaEstrategia.publico}
                  onChange={(e) => setNovaEstrategia({...novaEstrategia, publico: e.target.value})}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Contexto do Negócio</label>
                <Textarea
                  placeholder="Informações sobre o negócio, mercado, concorrência, orçamento disponível..."
                  value={novaEstrategia.contexto}
                  onChange={(e) => setNovaEstrategia({...novaEstrategia, contexto: e.target.value})}
                />
              </div>

              <Button 
                onClick={handleGerarEstrategia} 
                disabled={isGenerating || !novaEstrategia.cliente || !novaEstrategia.tipo}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                    Gerando Estratégia...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Gerar Estratégia com IA
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Lista de Estratégias */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Estratégias Criadas</h2>
            </div>

            {estrategias.map((estrategia) => (
              <Card key={estrategia.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {estrategia.titulo}
                        </h3>
                        <Badge className={getStatusColor(estrategia.status)}>
                          {getStatusText(estrategia.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {estrategia.tipo} • {estrategia.cliente}
                      </p>
                      <p className="text-gray-700 mb-4">
                        {estrategia.descricao}
                      </p>
                      <p className="text-sm text-gray-500">
                        Criada em {new Date(estrategia.data_criacao).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Visualizar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {estrategias.length === 0 && (
              <div className="text-center py-12">
                <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhuma estratégia criada ainda
                </h3>
                <p className="text-gray-600 mb-4">
                  Use o gerador de IA para criar sua primeira estratégia personalizada
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstrategiasIA;
