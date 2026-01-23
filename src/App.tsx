import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CGU from "./pages/CGU";
import MentionsLegales from "./pages/MentionsLegales";
import Entreprise from "./pages/Entreprise";
import Portfolio from "./pages/Portfolio";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/p/legal" element={<MentionsLegales />} />
        <Route path="/p/terms" element={<CGU />} />
        <Route path="/p/enterprise" element={<Entreprise />} />
        <Route path="/p/portfolio" element={<Portfolio />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
