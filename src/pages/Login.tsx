import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader } from 'lucide-react';
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with language switcher */}
      <div className="p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">InvoiceEasy</div>
        <LanguageSwitcher />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="card-warm">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {t('auth.welcome')}
              </h1>
              <p className="text-muted-foreground text-lg">
                {t('auth.signInSubtitle')}
              </p>
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

              <button
                type="submit"
                disabled={loading}
                className="btn-large btn-primary w-full"
              >
                {loading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  t('auth.login')
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                {t('auth.noAccount')}{' '}
                <Link
                  to="/register"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  {t('auth.register')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;