import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const content = {
  de: {
    title: 'Datenschutzerklärung (Beta – Nicht-kommerzieller Testbetrieb)',
    responsible: '1. Verantwortlicher',
    purpose: '2. Zweck der Datenverarbeitung',
    purposeDesc:
      'Nur technisch notwendige Daten werden verarbeitet (Login, Spracheinstellungen, Testuploads, Fehlerlogs).',
    noShare: 'Keine Weitergabe an Dritte.',
    commercial: '3. Keine kommerzielle Nutzung',
    commercialDesc: 'Keine kostenpflichtigen Dienste, kein Tracking zu Marketingzwecken.',
    retention: '4. Speicherdauer',
    retentionDesc: 'Daten können jederzeit auf Anfrage gelöscht werden.',
    rights: '5. Nutzerrechte',
    rightsDesc:
      'Auskunft, Löschung, Berichtigung – Anfrage per E-Mail an support@invoiceeasy.org',
    emailLabel: 'E-Mail',
  },
  en: {
    title: 'Privacy Notice (Beta – Non-commercial test environment)',
    responsible: '1. Controller',
    purpose: '2. Purpose of processing',
    purposeDesc:
      'Only technically necessary data is processed (login, language settings, test uploads, error logs).',
    noShare: 'No sharing with third parties.',
    commercial: '3. No commercial use',
    commercialDesc: 'No paid services; no marketing tracking.',
    retention: '4. Data retention',
    retentionDesc: 'Data can be deleted at any time upon request.',
    rights: '5. User rights',
    rightsDesc: 'Access, deletion, rectification — request via email to support@invoiceeasy.org',
    emailLabel: 'Email',
  },
  pl: {
    title: 'Polityka prywatności (Beta – test niekomercyjny)',
    responsible: '1. Administrator',
    purpose: '2. Cel przetwarzania',
    purposeDesc:
      'Przetwarzane są tylko dane technicznie niezbędne (logowanie, język, testowe uploady, logi błędów).',
    noShare: 'Brak udostępniania podmiotom trzecim.',
    commercial: '3. Brak komercyjnego wykorzystania',
    commercialDesc: 'Brak płatnych usług i śledzenia marketingowego.',
    retention: '4. Okres przechowywania',
    retentionDesc: 'Dane mogą być usunięte na żądanie w dowolnym momencie.',
    rights: '5. Prawa użytkownika',
    rightsDesc:
      'Dostęp, usunięcie, sprostowanie — zgłoszenie e-mailem na support@invoiceeasy.org',
    emailLabel: 'E-mail',
  },
} as const;

const Datenschutz: React.FC = () => {
  const { language } = useLanguage();
  const c = content[language as keyof typeof content] ?? content.en;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 text-sm leading-relaxed space-y-4">
      <h1 className="text-2xl font-semibold">{c.title}</h1>

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

      <section>
        <p className="font-semibold">{c.purpose}</p>
        <p>{c.purposeDesc}</p>
        <p>{c.noShare}</p>
      </section>

      <section>
        <p className="font-semibold">{c.commercial}</p>
        <p>{c.commercialDesc}</p>
      </section>

      <section>
        <p className="font-semibold">{c.retention}</p>
        <p>{c.retentionDesc}</p>
      </section>

      <section>
        <p className="font-semibold">{c.rights}</p>
        <p>
          {c.rightsDesc}{' '}
          <a href="mailto:support@invoiceeasy.org" className="underline">
            support@invoiceeasy.org
          </a>
        </p>
      </section>
    </main>
  );
};

export default Datenschutz;
