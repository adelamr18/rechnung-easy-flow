import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ScanLine, BarChart3, Sparkles, ArrowRight } from 'lucide-react';
import Footer from '@/components/Layout/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:py-32">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              InvoiceEasy — Simple Invoicing & Expense Tracking
              <span className="block text-primary mt-2">(Beta)</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Test our early version for freelancers and small businesses.
              <br />
              Create invoices, manage expenses, and generate PDFs — free during the beta phase.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/register">
                  Create Free Test Account
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link to="/login">Login</Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              No credit card required · Beta Version · Non-commercial
            </p>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">
            Core Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover-scale">
              <CardHeader>
                <FileText className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Automatic PDF Invoicing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Clean, professional PDFs in one click.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardHeader>
                <ScanLine className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Receipt OCR Extraction</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Upload a photo — vendor, amount, and date are auto-detected.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardHeader>
                <BarChart3 className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Dashboard Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track total income, expenses, and profit.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardHeader>
                <Sparkles className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Free During Beta</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Unlimited usage during the test phase.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Screenshot Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">
            See It In Action
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-muted rounded-lg overflow-hidden shadow-lg hover-scale">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <FileText className="w-16 h-16 text-primary/40" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-center">Invoice Creator</h3>
              </div>
            </div>

            <div className="bg-muted rounded-lg overflow-hidden shadow-lg hover-scale">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <BarChart3 className="w-16 h-16 text-primary/40" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-center">Dashboard</h3>
              </div>
            </div>

            <div className="bg-muted rounded-lg overflow-hidden shadow-lg hover-scale">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <ScanLine className="w-16 h-16 text-primary/40" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-center">PDF Preview</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beta Disclaimer */}
      <section className="py-16 px-4 bg-warning/10 border-y border-warning/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Beta Notice</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            This platform is currently operating in a <strong>non-commercial beta testing phase</strong>.
            No paid services, subscriptions, or legally binding invoices are provided.
            All features are for development, usability testing, and feedback only.
          </p>
          <p className="text-sm text-muted-foreground">
            Contact:{' '}
            <a href="mailto:support@invoiceeasy.org" className="underline text-primary">
              support@invoiceeasy.org
            </a>
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-foreground">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join our beta testing program and help us shape the future of simple invoicing.
          </p>
          <Button asChild size="lg">
            <Link to="/register">
              Create Your Free Account
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;