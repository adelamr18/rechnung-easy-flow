import React, { useState } from 'react';
import { User, FileText, Euro, Calendar, Download } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const CreateInvoice: React.FC = () => {
  const [customerName, setCustomerName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate PDF generation
    setTimeout(() => {
      // Create a simple "PDF" download
      const invoiceData = {
        invoiceNumber: `INV-${Date.now()}`,
        date: date,
        company: user?.companyName,
        customer: customerName,
        service: serviceDescription,
        amount: amount,
        legal: "Gemäß § 19 UStG wird keine Umsatzsteuer ausgewiesen."
      };

      const content = `
RECHNUNG ${invoiceData.invoiceNumber}

Datum: ${new Date(date).toLocaleDateString('de-DE')}
Von: ${invoiceData.company}
An: ${customerName}

Leistung: ${serviceDescription}
Betrag: ${amount}€

${invoiceData.legal}
      `.trim();

      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Rechnung_${invoiceData.invoiceNumber}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Rechnung erstellt!",
        description: "Die Rechnung wurde erfolgreich als PDF generiert.",
      });

      // Reset form
      setCustomerName('');
      setServiceDescription('');
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);
      
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="card-warm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            {t('invoice.create')}
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            Neue Rechnung für Ihre Kunden
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="customer" className="block text-sm font-medium text-foreground mb-2">
              {t('invoice.customer')}
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                id="customer"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="input-large pl-12 w-full"
                placeholder="Max Mustermann"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
              {t('invoice.service')}
            </label>
            <div className="relative">
              <FileText className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
              <textarea
                id="service"
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
                className="input-large pl-12 w-full min-h-[120px] resize-none"
                placeholder="Beschreibung der erbrachten Leistung..."
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-foreground mb-2">
                {t('invoice.amount')}
              </label>
              <div className="relative">
                <Euro className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="input-large pl-12 w-full"
                  placeholder="100.00"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-foreground mb-2">
                {t('invoice.date')}
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="input-large pl-12 w-full"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-accent/50 p-4 rounded-lg">
            <p className="text-sm text-accent-foreground">
              <strong>Rechtlicher Hinweis:</strong> Diese Rechnung wird automatisch mit dem Zusatz 
              "Gemäß § 19 UStG wird keine Umsatzsteuer ausgewiesen." versehen.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-large btn-success w-full"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                PDF wird erstellt...
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                {t('invoice.generate')}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoice;