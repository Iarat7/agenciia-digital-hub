
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import CRM from "./pages/CRM";
import Pipeline from "./pages/Pipeline";
import Financeiro from "./pages/Financeiro";
import Tarefas from "./pages/Tarefas";
import EstrategiasIA from "./pages/EstrategiasIA";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/pipeline" element={<Pipeline />} />
            <Route path="/financeiro" element={<Financeiro />} />
            <Route path="/tarefas" element={<Tarefas />} />
            <Route path="/estrategias" element={<EstrategiasIA />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
