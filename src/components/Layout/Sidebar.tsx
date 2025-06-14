
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  DollarSign,
  CheckSquare,
  Lightbulb,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      name: "CRM",
      href: "/crm",
      icon: Users,
    },
    {
      name: "Pipeline",
      href: "/pipeline",
      icon: TrendingUp,
    },
    {
      name: "Financeiro",
      href: "/financeiro",
      icon: DollarSign,
    },
    {
      name: "Tarefas",
      href: "/tarefas",
      icon: CheckSquare,
    },
    {
      name: "Estratégias IA",
      href: "/estrategias",
      icon: Lightbulb,
    },
  ];

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-40 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <h1 className="font-bold text-xl text-gray-900">
            AgencyHub
          </h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4">
        <div className="space-y-2">
          <Link
            to="/configuracoes"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>Configurações</span>}
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>Sair</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
