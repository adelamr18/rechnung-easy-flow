import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const content = {
  de: {
    title: 'Impressum (Beta – Nicht-kommerzieller Testbetrieb)',
    responsibleTitle: 'Verantwortlich für diese Testplattform:',
    responsibleBody: 'InvoiceEasy – Beta Version',
    contactTitle: 'Kontakt:',
    contactEmail: 'E-Mail',
    legalNotice:
      'Diese Plattform befindet sich im nicht-kommerziellen Testbetrieb. Es werden keine kostenpflichtigen Dienste, keine Verträge und keine geschäftsmäßigen Leistungen angeboten. Alle Funktionen dienen ausschließlich der Produktentwicklung, Nutzerforschung und Fehleranalyse.',
    ddgNotice:
      'Eine Anbieterkennzeichnung nach DDG § 5 ist nicht erforderlich, da keine geschäftsmäßigen Telemedien angeboten werden.',
  },
  en: {
    title: 'Imprint (Beta – Non-commercial test environment)',
    responsibleTitle: 'Responsible for this test platform:',
    responsibleBody: 'InvoiceEasy – Beta Version',
    contactTitle: 'Contact:',
    contactEmail: 'Email',
    legalNotice:
      'This platform is operated as a non-commercial beta. No paid services, contracts, or commercial offerings are provided. All features exist solely for product development, user research, and debugging.',
    ddgNotice:
      'A provider identification under DDG § 5 is not required because no commercial telemedia are offered.',
  },
  pl: {
    title: 'Nota prawna (Beta – test niekomercyjny)',
    responsibleTitle: 'Odpowiedzialny za tę platformę testową:',
    responsibleBody: 'InvoiceEasy – wersja beta',
    contactTitle: 'Kontakt:',
    contactEmail: 'E-mail',
    legalNotice:
      'Platforma działa w trybie beta i niekomercyjnym. Brak płatnych usług, umów i ofert komercyjnych. Funkcje służą wyłącznie rozwojowi produktu, badaniom użytkowników i analizie błędów.',
    ddgNotice:
      'Identyfikacja dostawcy wg DDG § 5 nie jest wymagana, ponieważ nie są oferowane komercyjne usługi online.',
  },
} as const;

const Impressum: React.FC = () => {
  const { language } = useLanguage();
  const c = content[language as keyof typeof content] ?? content.en;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 text-sm leading-relaxed space-y-4">
      <h1 className="text-2xl font-semibold">{c.title}</h1>
      <section>
        <p className="font-semibold">{c.responsibleTitle}</p>
        <p>{c.responsibleBody}</p>
      </section>
      <section>
        <p className="font-semibold">{c.contactTitle}</p>
        <p>
          {c.contactEmail}:{' '}
          <a href="mailto:support@invoiceeasy.org" className="underline">
            support@invoiceeasy.org
          </a>
        </p>
      </section>
      <p>{c.legalNotice}</p>
      <p>{c.ddgNotice}</p>
    </main>
  );
};

export default Impressum;
