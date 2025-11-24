import { Link } from 'react-router-dom';
import { ShieldCheck, BarChart3, FileText, CheckCircle2, Sparkles } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Footer from '@/components/Layout/Footer';

const LandingPage: React.FC = () => (
  <div className="min-h-screen bg-[#FAF7F2] text-slate-900">
    <header className="sticky top-0 z-20 bg-[#FAF7F2]/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-semibold text-primary">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 via-orange-400 to-yellow-300 text-white shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="text-left">
            <span className="leading-none text-primary">InvoiceEasy</span>
            <p className="text-xs text-muted-foreground font-normal">Smart receipts &amp; billing</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features" className="hover:text-primary">Features</a>
          <a href="#workflow" className="hover:text-primary">Workflow</a>
          <a href="#beta" className="hover:text-primary">Beta Notice</a>
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <Link to="/login" className="text-sm font-medium text-primary hover:text-primary/80">
            Login
          </Link>
          <Link
            to="/register"
            className="text-sm font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90"
          >
            Create Free Account
          </Link>
        </div>
      </div>
    </header>

    <main className="max-w-6xl mx-auto px-4 py-16 space-y-24">
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
            Beta access · Free during testing
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Simple Invoicing & Expense Tracking
            <span className="block text-primary">for Local Businesses</span>
          </h1>
          <p className="text-lg text-slate-600">
            Create invoices and save every receipt in under 30 seconds — from your phone or laptop.
          </p>
          <p className="text-lg text-slate-600">
            Perfect for cafés, bakeries, handymen, cleaners, barbers — anyone who wants fast, clean paperwork without the hassle.
            Snap a receipt, auto-extract the details, and generate professional PDFs in seconds.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/register"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90 shadow-lg shadow-primary/20"
            >
              Start Free Beta
            </Link>
            <a
              href="#workflow"
              className="px-6 py-3 rounded-full border border-primary text-primary font-semibold hover:bg-primary/5"
            >
              See the app
            </a>
          </div>
          <p className="text-xs text-slate-500">No credit card · Free during beta</p>
          <div className="grid sm:grid-cols-2 gap-3 pt-4">
            {[
              '10 languages supported',
              'Works on mobile & desktop',
              'Your data stored in the EU',
              'Automatic PDF creation',
              'OCR-powered imports',
              'Unlimited Pro (beta)',
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-primary/15 bg-white/50 px-4 py-3 shadow-sm"
              >
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-3xl shadow-xl p-6 lg:p-8 space-y-4">
          <div className="font-medium text-slate-700 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Dashboard preview
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 flex justify-center">
            <img
              src="/images/dashboard-preview.png"
              alt="InvoiceEasy dashboard preview"
              className="w-full max-w-none h-auto object-cover scale-[1.1] md:scale-[1.02] lg:scale-[0.98] transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <p className="text-xs text-slate-500 text-center">
            Actual interface preview from our internal beta — optimized for tidy, local business workflows.
          </p>
        </div>
      </section>

      <section id="features" className="space-y-8">
        <div className="text-center space-y-3">
          <p className="text-sm font-semibold text-primary">Everything you need to get started</p>
          <h2 className="text-3xl font-bold">Features built for simplicity & speed</h2>
          <p className="text-slate-600">Powerful automation wrapped in a friendly interface.</p>
          <p className="text-sm text-slate-500">Made for cafés, bakeries, cleaners, handymen, barbers, tutors & more.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: <FileText />, title: 'Automatic PDFs', description: 'Create professional invoices in one click.' },
            { icon: <ShieldCheck />, title: 'Secure OCR', description: 'Extract line items from receipts instantly.' },
            { icon: <BarChart3 />, title: 'Dashboard insights', description: 'Track invoicing volume and expenses.' },
            { icon: <Sparkles />, title: 'Beta upgrades', description: 'Unlock unlimited Pro features during beta.' },
          ].map((feature) => (
            <div key={feature.title} className="card-warm h-full space-y-4 text-center">
              <div className="mx-auto h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="text-sm text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="space-y-8">
        <div className="text-center space-y-3">
          <p className="text-sm font-semibold text-primary">See it in action</p>
          <h2 className="text-3xl font-bold">A lightweight workflow for busy founders</h2>
          <p className="text-slate-600">From upload to finished PDF in under one minute.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            'Upload invoice or receipt',
            'Review extracted line items',
            'Download polished PDF',
          ].map((step, index) => (
            <div key={step} className="rounded-3xl border border-slate-200 bg-white p-6 space-y-4 text-center">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                {index + 1}
              </span>
              <p className="font-semibold">{step}</p>
              <p className="text-sm text-slate-600">
                {index === 0 && 'Drag-and-drop or email your document to the inbox.'}
                {index === 1 && 'Make quick edits; quantities and totals stay in sync.'}
                {index === 2 && 'Use Basic, Advanced, or Elite templates — all branded for you.'}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="beta" className="rounded-3xl border border-amber-200 bg-amber-50/70 p-8 space-y-4">
        <div className="flex items-center gap-3 text-amber-700 font-semibold text-lg">
          <ShieldCheck className="h-6 w-6" />
          Beta Notice
        </div>
        <p className="text-sm text-amber-800">
          InvoiceEasy is in a non-commercial beta. No paid plans, no contracts — just testing and feedback so we can build the right tool for local businesses.
        </p>
        <p className="text-sm text-amber-800">
          PDFs are for internal tests during this phase and should be reviewed before you forward them to customers.
        </p>
      </section>

      <section className="text-center space-y-4">
        <p className="text-sm text-primary font-semibold">Ready to get started?</p>
        <h2 className="text-3xl font-bold">Join the beta and help shape the future of InvoiceEasy.</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/register"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90"
          >
            Create Free Beta Account
          </Link>
        </div>
        <p className="text-xs text-slate-500">Already using InvoiceEasy? Use the Login link in the header.</p>
      </section>
    </main>
    <Footer />
  </div>
);

export default LandingPage;
