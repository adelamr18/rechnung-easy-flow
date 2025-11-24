import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Building, Loader, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useToast } from '@/hooks/use-toast';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);

  const { register: registerUser } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: t('auth.passwordsMismatch'),
        description: t('auth.checkPassword'),
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const success = await registerUser(email, password, companyName);
      if (success) {
        toast({
          title: 'Registrierung erfolgreich',
          description: 'Willkommen bei InvoiceEasy!',
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Registrierung fehlgeschlagen',
          description: 'Bitte überprüfen Sie Ihre Eingaben.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Fehler',
        description: 'Ein Fehler ist aufgetreten.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEEFEA] via-white to-[#FAF7F2] flex flex-col">
      <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between w-full">
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

      <div className="flex-1 w-full">
        <div className="max-w-6xl mx-auto px-4 pb-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold w-fit">
              Built for local businesses
            </span>
            <h1 className="text-4xl font-bold leading-tight text-slate-900">
              Create invoices and track receipts in minutes.
            </h1>
            <p className="text-lg text-slate-600">
              Join the InvoiceEasy beta to manage paperwork for cafés, bakeries, cleaning services, barbers, and more.
              No credit card required — your feedback shapes the roadmap.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Starter plan free during beta',
                'OCR-powered receipt capture',
                '3 PDF styles with unique flair',
                'Upgrade to Pro-Beta anytime',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white/90 p-4 text-sm font-medium flex items-center gap-2"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-md ml-auto">
            <div className="card-warm shadow-xl border border-slate-100">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">{t('auth.createAccount')}</h2>
                <p className="text-muted-foreground text-lg">{t('auth.startToday')}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-foreground mb-2">
                    {t('auth.companyName')}
                  </label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="companyName"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="input-large pl-12 w-full"
                      placeholder="Meine Bäckerei"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {t('auth.email')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-large pl-12 w-full"
                      placeholder="ihre@email.de"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    {t('auth.password')}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
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

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                    {t('auth.confirmPassword')}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="input-large pl-12 w-full"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn-large btn-primary w-full">
                  {loading ? <Loader className="h-5 w-5 animate-spin" /> : t('auth.createAccount')}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  {t('auth.hasAccount')}{' '}
                  <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
                    {t('auth.login')}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
