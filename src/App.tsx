import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import PresentationDetails from "./pages/PresentationDetails";
import Presentation from "./pages/Presentation";
import GamePlay from "./pages/GamePlay";
import QuestionManager from "./pages/QuestionManager";
import ScrollKeeperPlay from "./pages/ScrollKeeperPlay";
import GameDetails from "./pages/GameDetails";
import CollectionDetails from "./pages/CollectionDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/presentation/:presentationId" element={<PresentationDetails />} />
            <Route path="/presentation/:presentationId/view" element={<Presentation />} />
            <Route path="/collection/:collectionId" element={<CollectionDetails />} />
            <Route path="/game/:gameId" element={<GameDetails />} />
            <Route path="/game/:gameId/play" element={<GamePlay />} />
            <Route path="/game/:gameId/questions" element={<QuestionManager />} />
            <Route path="/game/scroll-keeper/play" element={<ScrollKeeperPlay />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
