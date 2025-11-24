import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Layout/Footer";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import CreateInvoice from "@/pages/CreateInvoice";
import InvoicesList from "@/pages/InvoicesList";
import UploadExpense from "@/pages/UploadExpense";
import ExpensesList from "@/pages/ExpensesList";
import Settings from "@/pages/Settings";
import NotFound from "./pages/NotFound";
import Impressum from "@/pages/Impressum";
import Datenschutz from "@/pages/Datenschutz";
import Terms from "@/pages/Terms";
import LandingPage from "@/pages/LandingPage";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  const withFooter = (node: React.ReactNode) => (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 py-6">{node}</main>
      <Footer />
    </div>
  );

  const renderPrivate = (node: React.ReactNode) =>
    isAuthenticated ? (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <main className="flex-1 py-6">{node}</main>
        <Footer />
      </div>
    ) : (
      <Navigate to="/login" replace />
    );

  const renderPublicAuth = (node: React.ReactNode) =>
    isAuthenticated ? <Navigate to="/dashboard" replace /> : withFooter(node);

  const renderLegal = (node: React.ReactNode) => withFooter(node);

  return (
  <Routes>
    {/* Public routes */}
    <Route 
      path="/login" 
      element={renderPublicAuth(<Login />)} 
    />
    <Route 
      path="/register" 
      element={renderPublicAuth(<Register />)} 
    />

    {/* Protected routes */}
    <Route 
      path="/dashboard" 
      element={renderPrivate(<Dashboard />)} 
    />
    <Route 
      path="/invoices" 
      element={renderPrivate(<InvoicesList />)} 
    />
    <Route 
      path="/invoices/create" 
      element={renderPrivate(<CreateInvoice />)} 
    />
    <Route 
      path="/expenses" 
      element={renderPrivate(<ExpensesList />)} 
    />
    <Route 
      path="/expenses/upload" 
      element={renderPrivate(<UploadExpense />)} 
    />
    <Route 
      path="/settings" 
      element={renderPrivate(<Settings />)} 
    />

    {/* Landing page */}
    <Route path="/" element={<LandingPage />} />

    {/* Legal pages */}
    <Route
      path="/impressum"
      element={renderLegal(<Impressum />)}
    />
    <Route
      path="/datenschutz"
      element={renderLegal(<Datenschutz />)}
    />
    <Route
      path="/agb"
      element={renderLegal(<Terms />)}
    />
    
    {/* Catch all */}
    <Route path="*" element={withFooter(<NotFound />)} />
  </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
