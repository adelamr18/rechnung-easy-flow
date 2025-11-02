import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Building, Loader } from 'lucide-react';
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
  const { register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: t('auth.passwordsMismatch'),
        description: t('auth.checkPassword'),
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const success = await register(email, password, companyName);
      if (success) {
        toast({
          title: "Registrierung erfolgreich",
          description: "Willkommen bei InvoiceEasy!",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Registrierung fehlgeschlagen",
          description: "Bitte überprüfen Sie Ihre Eingaben.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Ein Fehler ist aufgetreten.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with language switcher */}
      <div className="p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">InvoiceEasy</div>
        <LanguageSwitcher />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="card-warm">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {t('auth.createAccount')}
              </h1>
              <p className="text-muted-foreground text-lg">
                {t('auth.startToday')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-foreground mb-2">
                  {t('auth.companyName')}
                </label>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
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
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                  {t('auth.confirmPassword')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
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

              <button
                type="submit"
                disabled={loading}
                className="btn-large btn-primary w-full"
              >
                {loading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  t('auth.createAccount')
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                {t('auth.hasAccount')}{' '}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  {t('auth.login')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;