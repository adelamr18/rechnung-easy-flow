import React from 'react';
import { Settings as SettingsIcon, Crown, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Settings: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const plans = [
    {
      name: 'Kostenlos',
      price: '0€',
      period: '/Monat',
      features: [
        '5 Rechnungen pro Monat',
        '10 Ausgaben-Uploads',
        'Basis PDF-Export',
        'Email Support'
      ],
      current: true,
      color: 'btn-secondary'
    },
    {
      name: 'Pro',
      price: '9,99€',
      period: '/Monat',
      features: [
        'Unbegrenzte Rechnungen',
        'Unbegrenzte Ausgaben',
        'Erweiterte PDF-Vorlagen',
        'Automatische Backups',
        'Prioritäts-Support',
        'Steuer-Export für Steuerberater'
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
              {t('nav.settings')}
            </h1>
            <p className="text-muted-foreground text-lg">
              Verwalten Sie Ihr Konto und Abonnement
            </p>
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div className="card-warm">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Kontoinformationen
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Firmenname
            </label>
            <p className="text-lg text-muted-foreground">{user?.companyName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              E-Mail
            </label>
            <p className="text-lg text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Language Settings */}
      <div className="card-warm">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Sprache
        </h2>
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-foreground">
            Interface-Sprache:
          </label>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="card-warm">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Abonnement
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
              {plan.current && (
                <div className="absolute -top-3 left-6 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Aktueller Plan
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
                disabled={plan.current}
              >
                {plan.current ? (
                  'Aktueller Plan'
                ) : (
                  <>
                    <Crown className="h-5 w-5" />
                    Upgrade
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
            Haben Sie Fragen? Kontaktieren Sie uns unter{' '}
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