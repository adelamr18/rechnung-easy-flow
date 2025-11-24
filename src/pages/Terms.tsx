import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const content = {
  de: {
    title: 'Terms & Conditions (Beta – Testphase)',
    intro1:
      'Diese Anwendung befindet sich in einem nicht-kommerziellen Testbetrieb. Es werden keine kostenpflichtigen Dienste, keine Abonnements und keine rechtlich verbindlichen Verträge angeboten.',
    intro2:
      'Nach der Geschäftsregistrierung und dem Start kommerzieller Funktionen werden vollständige AGB bereitgestellt.',
    responsible: 'Verantwortlich:',
    emailLabel: 'E-Mail',
  },
  en: {
    title: 'Terms & Conditions (Beta – Test phase)',
    intro1:
      'This application runs as a non-commercial beta. No paid services, subscriptions, or legally binding contracts are offered.',
    intro2:
      'Full terms will be published after business registration and the launch of commercial features.',
    responsible: 'Responsible:',
    emailLabel: 'Email',
  },
  pl: {
    title: 'Regulamin (Beta – faza testów)',
    intro1:
      'Aplikacja działa w trybie beta i niekomercyjnym. Brak płatnych usług, subskrypcji oraz prawnie wiążących umów.',
    intro2:
      'Pełny regulamin zostanie udostępniony po rejestracji działalności i uruchomieniu funkcji komercyjnych.',
    responsible: 'Odpowiedzialny:',
    emailLabel: 'E-mail',
  },
} as const;

const Terms: React.FC = () => {
  const { language } = useLanguage();
  const c = content[language as keyof typeof content] ?? content.en;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 text-sm leading-relaxed space-y-4">
      <h1 className="text-2xl font-semibold">{c.title}</h1>
      <p>{c.intro1}</p>
      <p>{c.intro2}</p>
      <section>
        <p className="font-semibold">{c.responsible}</p>
        <p>
          InvoiceEasy – Beta Version
          <br />
          {c.emailLabel}:{' '}
          <a href="mailto:support@invoiceeasy.org" className="underline">
            support@invoiceeasy.org
          </a>
        </p>
      </section>
    </main>
  );
};

export default Terms;
