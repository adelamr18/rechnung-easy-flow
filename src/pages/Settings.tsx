import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Crown, Check, Loader, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { apiClient } from '@/lib/api';

const Settings: React.FC = () => {
  const { t } = useLanguage();
  const { user, refreshAuth } = useAuth();
  const { toast } = useToast();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [showProModal, setShowProModal] = useState(false);
  const [unlockingPro, setUnlockingPro] = useState(false);

  const normalizePlan = (plan?: string | null) => {
    switch ((plan ?? 'starter').toLowerCase()) {
      case 'elite':
        return 'elite';
      case 'pro':
      case 'pro-beta':
        return 'pro';
      case 'starter':
      case 'free':
      default:
        return 'starter';
    }
  };

  const [currentPlan, setCurrentPlan] = useState(() => normalizePlan(user?.plan));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success') === 'true';
    const canceled = params.get('canceled') === 'true';
    const sessionId = params.get('session_id');

    const clearQuery = () => window.history.replaceState({}, '', '/settings');

    if (success) {
      (async () => {
        try {
          if (sessionId) {
            await apiClient.confirmCheckoutSession(sessionId);
          }
          await refreshAuth();
          toast({
            title: t('toast.success'),
            description: 'Upgrade successful!',
          });
        } catch (error: any) {
          toast({
            title: t('auth.error'),
            description: error.message || t('auth.errorOccurred'),
            variant: 'destructive',
          });
        } finally {
          clearQuery();
        }
      })();
    } else if (canceled) {
      toast({
        title: t('toast.error'),
        description: 'Payment canceled',
        variant: 'destructive',
      });
      clearQuery();
    }
  }, []);

  useEffect(() => {
    if (user) {
      setCurrentPlan(normalizePlan(user.plan));
    }
  }, [user]);

  const handleUpgrade = async (targetPlan: 'pro' | 'elite') => {
    setLoadingPlan(targetPlan);
    try {
      const { url } = targetPlan === 'elite'
        ? await apiClient.createEliteCheckout()
        : await apiClient.createCheckout();
      window.location.href = url;
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message || t('auth.errorOccurred'),
        variant: 'destructive',
      });
      setLoadingPlan(null);
    }
  };

  const handleUnlockProBeta = async () => {
    setUnlockingPro(true);
    try {
      await apiClient.unlockProBeta();
      await refreshAuth();
      toast({
        title: t('beta.unlockTitle'),
        description: t('beta.unlockBody'),
      });
      setShowProModal(false);
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message || t('auth.errorOccurred'),
        variant: 'destructive',
      });
    } finally {
      setUnlockingPro(false);
    }
  };

  const plans = [
    {
      id: 'starter',
      name: t('settings.starter'),
      price: '0€',
      period: t('settings.perMonth'),
      features: [
        t('settings.starterFeature1'),
        t('settings.starterFeature2'),
        t('settings.starterFeature3'),
        t('settings.starterFeature4'),
      ],
      color: 'btn-secondary',
      action: null,
    },
    {
      id: 'pro',
      name: `${t('settings.pro')} (Beta)`,
      price: t('settings.free'),
      period: 'Beta',
      features: [
        t('settings.proFeature1'),
        t('settings.proFeature2'),
        t('settings.proFeature3'),
        t('settings.proFeature4'),
      ],
      color: 'btn-primary',
      action: () => setShowProModal(true),
    },
    {
      id: 'elite',
      name: t('settings.elite'),
      price: '',
      period: '',
      features: [
        t('settings.eliteFeature1'),
        t('settings.eliteFeature2'),
        t('settings.eliteFeature3'),
      ],
      color: 'btn-primary',
      action: null,
      comingSoon: true,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {currentPlan === 'starter' && (
        <div className="card-highlight flex items-center gap-3 text-sm text-foreground border border-dashed border-primary/40 bg-primary/5 p-4 rounded-xl">
          <AlertCircle className="h-5 w-5 text-primary" />
          <div>
            <p>{t('beta.noticeSoft')}</p>
            <p className="text-muted-foreground text-xs mt-1">{t('beta.noticeStrong')}</p>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="card-warm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <SettingsIcon className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t('settings.title')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('settings.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div className="card-warm">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          {t('settings.accountInfo')}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {t('auth.companyName')}
            </label>
            <p className="text-lg text-muted-foreground">{user?.companyName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {t('auth.email')}
            </label>
            <p className="text-lg text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Language Settings */}
      <div className="card-warm">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          {t('settings.language')}
        </h2>
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-foreground">
            {t('settings.languageLabel')}
          </label>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="card-warm">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          {t('settings.subscription')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isCurrent = currentPlan === plan.id;
            const isLoading = loadingPlan === plan.id;
            const isComingSoon = Boolean((plan as any).comingSoon);
            return (
              <div key={plan.name} className="flex">
                <div
                  className={`relative border-2 rounded-xl p-6 flex flex-col w-full ${
                    isCurrent
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-background'
                  } ${isComingSoon ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''}`}
                >
                  {isCurrent && (
                    <div className="absolute -top-3 left-6 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {t('settings.currentPlan')}
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
                      <span>{plan.name}</span>
                      {isComingSoon && (
                        <span className="text-sm text-muted-foreground">
                          ({t('settings.comingSoon')})
                        </span>
                      )}
                      {plan.id === 'pro' && (
                        <span className="text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          Beta
                        </span>
                      )}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1">
                      {isComingSoon ? (
                        <span className="text-muted-foreground">
                          {t('settings.launchingSoon')}
                        </span>
                      ) : (
                        <>
                          <span className={`text-3xl font-bold ${plan.id === 'pro' ? 'text-muted-foreground' : 'text-foreground'}`}>
                            {plan.price}
                          </span>
                          <span className="text-muted-foreground">
                            {plan.period}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-success flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {isComingSoon ? (
                    <button
                      className="opacity-40 cursor-not-allowed bg-muted text-muted-foreground px-4 py-2 rounded-md w-full font-medium"
                      disabled
                    >
                      {t('settings.comingSoon')}
                    </button>
                  ) : (
                    <button
                      className={`btn-large ${plan.color} w-full`}
                      disabled={isCurrent || isLoading}
                      onClick={!isCurrent && plan.action ? plan.action : undefined}
                    >
                      {isCurrent ? (
                        t('settings.currentPlan')
                      ) : isLoading ? (
                        <>
                          <Loader className="h-5 w-5 animate-spin" />
                          {t('expenses.saving')}
                        </>
                      ) : (
                        <>
                          <Crown className="h-5 w-5" />
                          {plan.id === 'pro' ? t('settings.unlockProBeta') : t('settings.upgrade')}
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="card-warm">
        <div className="text-center text-sm text-muted-foreground">
          <p>
            {t('settings.contact')}{' '}
            <a href="mailto:support@invoiceeasy.org" className="text-primary hover:text-primary/80">
              support@invoiceeasy.org
            </a>
          </p>
        </div>
      </div>
      {showProModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-background p-6 shadow-xl space-y-4">
            <h3 className="text-xl font-semibold text-foreground">{t('beta.unlockTitle')}</h3>
            <p className="text-sm text-muted-foreground">{t('beta.unlockBody')}</p>
            <div className="rounded-xl border border-dashed border-primary/40 p-4 text-sm text-foreground">
              {t('beta.unlockPrompt')}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                className="btn-primary flex-1 disabled:opacity-70"
                onClick={handleUnlockProBeta}
                disabled={unlockingPro}
              >
                {unlockingPro ? <Loader className="h-4 w-4 animate-spin" /> : t('settings.unlockProBeta')}
              </button>
              <button type="button" className="btn-secondary flex-1" onClick={() => setShowProModal(false)}>
                {t('beta.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
