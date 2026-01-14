import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ExpenseProvider } from "@/context/ExpenseContext";
import Navbar from "@/components/Navbar";
import Dashboard from "@/pages/Dashboard";
import AddExpense from "@/pages/AddExpense";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ExpenseProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Main app layout with navbar */}
          <div className="min-h-screen bg-background">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/add" element={<AddExpense />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </ExpenseProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
