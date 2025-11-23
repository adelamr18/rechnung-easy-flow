const Datenschutz: React.FC = () => (
  <main className="max-w-3xl mx-auto px-4 py-8 text-sm leading-relaxed space-y-4">
    <h1 className="text-2xl font-semibold">Datenschutzerklärung (Beta – Nicht-kommerzieller Testbetrieb)</h1>

    <section>
      <p className="font-semibold">1. Verantwortlicher</p>
      <p>
        InvoiceEasy – Beta Version
        <br />
        E-Mail:{' '}
        <a href="mailto:support@invoiceeasy.org" className="underline">
          support@invoiceeasy.org
        </a>
      </p>
    </section>

    <section>
      <p className="font-semibold">2. Zweck der Datenverarbeitung</p>
      <p>Nur technisch notwendige Daten werden verarbeitet (Login, Spracheinstellungen, Testuploads, Fehlerlogs).</p>
      <p>Keine Weitergabe an Dritte.</p>
    </section>

    <section>
      <p className="font-semibold">3. Keine kommerzielle Nutzung</p>
      <p>Keine kostenpflichtigen Dienste, kein Tracking zu Marketingzwecken.</p>
    </section>

    <section>
      <p className="font-semibold">4. Speicherdauer</p>
      <p>Daten können jederzeit auf Anfrage gelöscht werden.</p>
    </section>

    <section>
      <p className="font-semibold">5. Nutzerrechte</p>
      <p>
        Auskunft, Löschung, Berichtigung – Anfrage per E-Mail an{' '}
        <a href="mailto:support@invoiceeasy.org" className="underline">
          support@invoiceeasy.org
        </a>
      </p>
    </section>
  </main>
);

export default Datenschutz;
