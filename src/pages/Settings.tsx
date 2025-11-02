import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Crown, Check, Loader } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { apiClient } from '@/lib/api';

const Settings: React.FC = () => {
  const { t } = useLanguage();
  const { user, refreshAuth } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(user?.plan || 'free');

  useEffect(() => {
    // Check URL params for Stripe success
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      toast({
        title: t('toast.success'),
        description: 'Upgrade successful!',
      });
      refreshAuth();
      window.history.replaceState({}, '', '/settings');
    } else if (params.get('canceled') === 'true') {
      toast({
        title: t('toast.error'),
        description: 'Payment canceled',
        variant: 'destructive',
      });
      window.history.replaceState({}, '', '/settings');
    }
  }, []);

  useEffect(() => {
    if (user) {
      setCurrentPlan(user.plan);
    }
  }, [user]);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const { url } = await apiClient.createCheckout();
      window.location.href = url;
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message || t('auth.errorOccurred'),
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  const plans = [
    {
      name: t('settings.free'),
      price: '0€',
      period: t('settings.perMonth'),
      features: [
        t('settings.feature1'),
        t('settings.feature2'),
        t('settings.feature3'),
        t('settings.feature4')
      ],
      current: true,
      color: 'btn-secondary'
    },
    {
      name: t('settings.pro'),
      price: '7€',
      period: t('settings.perMonth'),
      features: [
        t('settings.feature5'),
        t('settings.feature6'),
        t('settings.feature7'),
        t('settings.feature8'),
        t('settings.feature9'),
        t('settings.feature10')
      ],
      current: false,
      color: 'btn-primary'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative border-2 rounded-xl p-6 ${
                plan.current 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border bg-background'
              }`}
            >
              {currentPlan === (plan.name === t('settings.free') ? 'free' : 'pro') && (
                <div className="absolute -top-3 left-6 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {t('settings.currentPlan')}
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-success flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`btn-large ${plan.color} w-full`}
                disabled={currentPlan === (plan.name === t('settings.free') ? 'free' : 'pro') || loading}
                onClick={plan.name === t('settings.pro') && currentPlan !== 'pro' ? handleUpgrade : undefined}
              >
                {currentPlan === (plan.name === t('settings.free') ? 'free' : 'pro') ? (
                  t('settings.currentPlan')
                ) : loading ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    {t('expenses.saving')}
                  </>
                ) : (
                  <>
                    <Crown className="h-5 w-5" />
                    {t('settings.upgrade')}
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="card-warm">
        <div className="text-center text-sm text-muted-foreground">
          <p>
            {t('settings.contact')}{' '}
            <a href="mailto:support@invoiceeasy.de" className="text-primary hover:text-primary/80">
              support@invoiceeasy.de
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;