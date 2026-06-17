import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load case study pages for better performance
const CaseStudiesFunds = lazy(() => import("./pages/CaseStudiesFunds"));
const CaseStudiesInstitutions = lazy(() => import("./pages/CaseStudiesInstitutions"));
const CaseStudiesStartups = lazy(() => import("./pages/CaseStudiesStartups"));
const AboutSignalworks = lazy(() => import("./pages/AboutSignalworks"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><div className="w-8 h-8 border-4 border-electric border-t-transparent rounded-full animate-spin"></div></div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about-signalworks" element={<AboutSignalworks />} />
            <Route path="/case-studies/funds-and-investors" element={<CaseStudiesFunds />} />
            <Route path="/case-studies/institutions-and-accelerators" element={<CaseStudiesInstitutions />} />
            <Route path="/case-studies/startups-and-founders" element={<CaseStudiesStartups />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
