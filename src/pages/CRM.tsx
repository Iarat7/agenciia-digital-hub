
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  MapPin,
  Edit,
  Eye,
  Filter
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Cliente {
  id: string;
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  cidade: string;
  status: 'ativo' | 'inativo' | 'prospect';
  valor_contrato: number;
  data_cadastro: string;
  observacoes: string;
}

const CRM = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Dados simulados - será substituído por dados do Supabase
  useEffect(() => {
    const clientesSimulados: Cliente[] = [
      {
        id: "1",
        nome: "João Silva",
        empresa: "Tech Solutions",
        email: "joao@techsolutions.com",
        telefone: "(11) 99999-9999",
        cidade: "São Paulo",
        status: "ativo",
        valor_contrato: 5000,
        data_cadastro: "2024-01-15",
        observacoes: "Cliente estratégico, foco em SEO"
      },
      {
        id: "2",
        nome: "Maria Santos",
        empresa: "Inovação Digital",
        email: "maria@inovacao.com",
        telefone: "(11) 88888-8888",
        cidade: "Rio de Janeiro",
        status: "prospect",
        valor_contrato: 3000,
        data_cadastro: "2024-02-10",
        observacoes: "Interessada em redes sociais"
      },
      {
        id: "3",
        nome: "Carlos Oliveira",
        empresa: "StartupXYZ",
        email: "carlos@startupxyz.com",
        telefone: "(11) 77777-7777",
        cidade: "Belo Horizonte",
        status: "ativo",
        valor_contrato: 7500,
        data_cadastro: "2024-01-20",
        observacoes: "Foco em performance marketing"
      }
    ];
    setClientes(clientesSimulados);
  }, []);

  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch = cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.empresa.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "todos" || cliente.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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

  const handleNovoCliente = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CRM - Clientes</h1>
              <p className="text-gray-600">Gerencie seus clientes e prospects</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleNovoCliente} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Novo Cliente
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div>
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input id="nome" placeholder="Digite o nome" />
                  </div>
                  <div>
                    <Label htmlFor="empresa">Empresa</Label>
                    <Input id="empresa" placeholder="Nome da empresa" />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="email@exemplo.com" />
                  </div>
                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" placeholder="(11) 99999-9999" />
                  </div>
                  <div>
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input id="cidade" placeholder="Cidade" />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prospect">Prospect</SelectItem>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="valor">Valor do Contrato</Label>
                    <Input id="valor" type="number" placeholder="0,00" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="observacoes">Observações</Label>
                    <Textarea id="observacoes" placeholder="Informações adicionais sobre o cliente" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setIsDialogOpen(false)}>
                    Salvar Cliente
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filtros */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nome ou empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="ativo">Ativos</SelectItem>
                <SelectItem value="prospect">Prospects</SelectItem>
                <SelectItem value="inativo">Inativos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Lista de Clientes */}
        <div className="grid gap-6">
          {filteredClientes.map((cliente) => (
            <Card key={cliente.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {cliente.nome}
                      </h3>
                      <Badge className={getStatusColor(cliente.status)}>
                        {cliente.status.charAt(0).toUpperCase() + cliente.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-gray-600 font-medium mb-3">
                      {cliente.empresa}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        {cliente.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        {cliente.telefone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        {cliente.cidade}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Valor do Contrato</p>
                        <p className="text-lg font-semibold text-green-600">
                          R$ {cliente.valor_contrato.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Cliente desde</p>
                        <p className="text-sm font-medium">
                          {new Date(cliente.data_cadastro).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>

                    {cliente.observacoes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">{cliente.observacoes}</p>
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

        {filteredClientes.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum cliente encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Tente ajustar seus filtros de busca' : 'Comece cadastrando seu primeiro cliente'}
            </p>
            <Button onClick={handleNovoCliente}>
              <Plus className="h-4 w-4 mr-2" />
              Cadastrar Cliente
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CRM;
