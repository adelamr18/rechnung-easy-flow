import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

      try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: t('auth.loginSuccess'),
          description: t('auth.welcomeBack'),
        });
        navigate('/dashboard');
      } else {
        toast({
          title: t('auth.loginFailed'),
          description: t('auth.checkInputs'),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t('auth.error'),
        description: t('auth.errorOccurred'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F0FF] via-white to-[#FAF7F2]">
      <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-primary">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-orange-400 to-yellow-300 text-white shadow-md">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-tight">
            <span>InvoiceEasy</span>
            <span className="text-xs text-muted-foreground font-normal">Smart receipts &amp; billing</span>
          </div>
        </Link>
        <LanguageSwitcher />
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold w-fit">
            Beta Access · Free forever during testing
          </span>
          <h1 className="text-4xl font-bold leading-tight text-slate-900">
            Log in and pick up where you left off.
          </h1>
          <p className="text-lg text-slate-600">
            Built for cafés, bakeries, cleaners, barbers, and local service teams that need paperwork done fast.
            Manage invoices, receipts, and PDF templates from any device.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Create invoices in under 30 seconds',
              'Auto-extract receipt items (OCR)',
              'Dashboard insights for cashflow',
              'Unlimited Pro features during beta',
            ].map((feature) => (
              <div key={feature} className="rounded-2xl border border-slate-200 bg-white/90 p-4 text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-md ml-auto">
          <div className="card-warm shadow-xl border border-slate-100">
            <div className="text-center mb-8 space-y-2">
              <h2 className="text-3xl font-bold text-foreground">{t('auth.welcome')}</h2>
              <p className="text-sm text-muted-foreground">{t('auth.signInSubtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  {t('auth.email')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-large pl-12 w-full"
                    placeholder="you@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-large pl-12 w-full"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-large btn-primary w-full">
                {loading ? <Loader className="h-5 w-5 animate-spin" /> : t('auth.login')}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-500">
              {t('auth.noAccount')}{' '}
              <Link to="/register" className="text-primary hover:text-primary/80 font-medium">
                {t('auth.register')}
              </Link>
              <p className="mt-2 text-xs text-muted-foreground">Need help? Email support@invoiceeasy.org</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
