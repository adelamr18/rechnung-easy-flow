const Impressum: React.FC = () => (
  <main className="max-w-3xl mx-auto px-4 py-8 text-sm leading-relaxed space-y-4">
    <h1 className="text-2xl font-semibold">Impressum (Beta – Nicht-kommerzieller Testbetrieb)</h1>
    <section>
      <p className="font-semibold">Verantwortlich für diese Testplattform:</p>
      <p>InvoiceEasy – Beta Version</p>
    </section>
    <section>
      <p className="font-semibold">Kontakt:</p>
      <p>
        E-Mail:{' '}
        <a href="mailto:support@invoiceeasy.org" className="underline">
          support@invoiceeasy.org
        </a>
      </p>
    </section>
    <p>
      Diese Plattform befindet sich im nicht-kommerziellen Testbetrieb. Es werden keine kostenpflichtigen Dienste,
      keine Verträge und keine geschäftsmäßigen Leistungen angeboten. Alle Funktionen dienen ausschließlich der
      Produktentwicklung, Nutzerforschung und Fehleranalyse.
    </p>
    <p>
      Eine Anbieterkennzeichnung nach DDG § 5 ist nicht erforderlich, da keine geschäftsmäßigen Telemedien
      angeboten werden.
    </p>
  </main>
);

export default Impressum;
