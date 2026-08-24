import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import HomeLoans from "./pages/services/HomeLoans";
import MortgageLoans from "./pages/services/MortgageLoans";
import BalanceTransfer from "./pages/services/BalanceTransfer";
import ProductPage from "./pages/services/ProductPage";
import EmiCalculatorPage from "./pages/EmiCalculatorPage";
import EligibilityCheckerPage from "./pages/EligibilityCheckerPage";
import BankComparisonPage from "./pages/BankComparisonPage";
import Testimonials from "./pages/Testimonials";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import LegalPage from "./pages/LegalPage";
import SitemapPage from "./pages/SitemapPage";
import { privacyPolicy, terms } from "./content/legal";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/home-loans" element={<HomeLoans />} />
            <Route path="/services/mortgage-loans" element={<MortgageLoans />} />
            <Route path="/services/balance-transfer" element={<BalanceTransfer />} />
            {/* Loan against property and mortgage loan are one product — one page, two URLs. */}
            <Route path="/services/loan-against-property" element={<MortgageLoans />} />
            {/* Construction, renovation, commercial, plot and business loans share one
                data-driven page — see src/content/products.ts. Declared after the
                specific service routes so those keep their own pages. */}
            <Route path="/services/:slug" element={<ProductPage />} />
            <Route path="/emi-calculator" element={<EmiCalculatorPage />} />
            <Route path="/eligibility-checker" element={<EligibilityCheckerPage />} />
            <Route path="/bank-comparison" element={<BankComparisonPage />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/privacy-policy" element={<LegalPage doc={privacyPolicy} />} />
            <Route path="/terms" element={<LegalPage doc={terms} />} />
            <Route path="/sitemap" element={<SitemapPage />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
