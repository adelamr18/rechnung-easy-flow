import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, ScanLine, BarChart3, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import Footer from '@/components/Layout/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
              <Sparkles className="w-4 h-4" />
              Beta Version — Free Testing Phase
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
              Simple Invoicing & Expense Tracking
              <span className="block text-primary mt-2">for Freelancers & Small Businesses</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Test our early version: Create professional invoices, manage expenses, and generate PDFs — completely free during the beta phase.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button asChild size="lg" className="w-full sm:w-auto text-base px-8 h-12">
                <Link to="/register">
                  Create Free Test Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 h-12">
                <Link to="/login">Login</Link>
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                Non-commercial
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="px-4 py-16 sm:py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Everything You Need to Get Started
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed for simplicity and efficiency
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border bg-card">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Automatic PDF Invoicing
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Generate clean, professional invoices with one click. Export as PDF instantly.
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border bg-card">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ScanLine className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Receipt OCR Extraction
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Upload a receipt photo and let AI automatically extract vendor, amount, and date.
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border bg-card">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Dashboard Insights
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Track your total income, expenses, and profit at a glance with visual charts.
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border bg-card">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Free During Beta
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Unlimited access to all features during the testing phase. No hidden costs.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Screenshot Section */}
      <section className="px-4 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              See It In Action
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A glimpse into the InvoiceEasy interface
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center">
                <FileText className="w-20 h-20 text-primary/30 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-6 bg-card border-t border-border">
                <h3 className="text-lg font-semibold text-foreground text-center">Invoice Creator</h3>
                <p className="text-sm text-muted-foreground text-center mt-2">Professional invoice templates</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="aspect-[4/3] bg-gradient-to-br from-success/20 via-success/10 to-success/5 flex items-center justify-center">
                <BarChart3 className="w-20 h-20 text-success/30 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-6 bg-card border-t border-border">
                <h3 className="text-lg font-semibold text-foreground text-center">Dashboard Overview</h3>
                <p className="text-sm text-muted-foreground text-center mt-2">Financial insights at a glance</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="aspect-[4/3] bg-gradient-to-br from-accent/30 via-accent/20 to-accent/10 flex items-center justify-center">
                <ScanLine className="w-20 h-20 text-accent-foreground/30 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-6 bg-card border-t border-border">
                <h3 className="text-lg font-semibold text-foreground text-center">PDF Export</h3>
                <p className="text-sm text-muted-foreground text-center mt-2">Ready-to-send documents</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beta Disclaimer */}
      <section className="px-4 py-12 bg-warning/5 border-y border-warning/20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-warning" />
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">Beta Notice</h2>
              <p className="text-muted-foreground leading-relaxed">
                This platform is currently operating in a <strong>non-commercial beta testing phase</strong>. 
                No paid services, subscriptions, or legally binding invoices are provided. All features are for 
                development, usability testing, and feedback only.
              </p>
              <p className="text-sm text-muted-foreground">
                Questions or feedback? Contact us at{' '}
                <a href="mailto:support@invoiceeasy.org" className="text-primary hover:underline font-medium">
                  support@invoiceeasy.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Join our beta testing program and help us shape the future of simple invoicing. 
            Your feedback matters.
          </p>
          <Button asChild size="lg" className="text-base px-8 h-12">
            <Link to="/register">
              Create Your Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;