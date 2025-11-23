const Terms: React.FC = () => (
  <main className="max-w-3xl mx-auto px-4 py-8 text-sm leading-relaxed space-y-4">
    <h1 className="text-2xl font-semibold">Terms &amp; Conditions (Beta – Testphase)</h1>
    <p>
      Diese Anwendung befindet sich in einem nicht-kommerziellen Testbetrieb. Es werden keine kostenpflichtigen Dienste,
      keine Abonnements und keine rechtlich verbindlichen Verträge angeboten.
    </p>
    <p>
      Nach der Geschäftsregistrierung und dem Start kommerzieller Funktionen werden vollständige AGB bereitgestellt.
    </p>
    <section>
      <p className="font-semibold">Verantwortlich:</p>
      <p>
        InvoiceEasy – Beta Version
        <br />
        E-Mail:{' '}
        <a href="mailto:support@invoiceeasy.org" className="underline">
          support@invoiceeasy.org
        </a>
      </p>
    </section>
  </main>
);

export default Terms;
