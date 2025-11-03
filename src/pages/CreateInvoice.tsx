import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, FileText, Euro, Calendar, Download, Upload, Loader2, ShieldAlert } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api';

const CreateInvoice: React.FC = () => {
  const [customerName, setCustomerName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisItems, setAnalysisItems] = useState<Array<{ description?: string | null; total?: number | null }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const normalizedPlan = (user?.plan ?? 'starter').toLowerCase();
  const canGeneratePdf = normalizedPlan === 'pro' || normalizedPlan === 'elite';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canGeneratePdf) {
      toast({
        title: t('invoice.pdfLockedTitle'),
        description: t('invoice.pdfLockedDesc'),
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const invoiceDate = date.split('T')[0]; // Convert to YYYY-MM-DD
      const result = await apiClient.createInvoice({
        customerName,
        serviceDescription,
        amount: parseFloat(amount),
        invoiceDate,
      });

      toast({
        title: t('invoice.created'),
        description: t('invoice.createdDesc'),
      });

      // Download PDF
      if (result.downloadUrl) {
        window.open(result.downloadUrl, '_blank');
      }

      // Reset form
      setCustomerName('');
      setServiceDescription('');
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message || t('auth.errorOccurred'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async (file: File) => {
    setAnalyzing(true);
    try {
      const response = await apiClient.analyzeInvoice(file);

      if (response.customerName) {
        setCustomerName(response.customerName);
      }

      if (response.notes && !serviceDescription) {
        setServiceDescription(response.notes);
      }

      if (response.totalAmount) {
        setAmount(response.totalAmount.toFixed(2));
      }

      if (response.invoiceDate) {
        const parsed = new Date(response.invoiceDate);
        if (!Number.isNaN(parsed.getTime())) {
          setDate(parsed.toISOString().split('T')[0]);
        }
      }

      if (response.items?.length) {
        setAnalysisItems(
          response.items.map((item: any) => ({
            description: item.description,
            total: item.totalPrice ?? item.unitPrice,
          }))
        );

        if (!serviceDescription) {
          const description = response.items
            .map((item: any) => item.description)
            .filter(Boolean)
            .join(', ');
          if (description) {
            setServiceDescription(description);
          }
        }
      }

      toast({
        title: t('invoice.analysisComplete'),
        description: t('invoice.analysisCompleteDesc'),
      });
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message || t('auth.errorOccurred'),
        variant: 'destructive',
      });
    } finally {
      setAnalyzing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAnalyzeClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      void handleAnalyze(file);
    }
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
            {t('invoice.subtitle')}
          </p>
        </div>

        <div className="mb-6">
          <div className="rounded-2xl border border-primary/40 bg-primary/5 p-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Upload className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-primary">
              {t('invoice.uploadInvoice')}
            </h3>
            <p className="mt-2 text-sm text-primary/80">
              {t('invoice.uploadHelper')}
            </p>

            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={handleAnalyzeClick}
                className="btn-large btn-primary min-w-[220px]"
                disabled={analyzing}
              >
                {analyzing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {t('invoice.analyzing')}
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    {t('invoice.uploadInvoice')}
                  </>
                )}
              </button>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              {t('invoice.orEnterManually')}
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf,image/*"
            className="hidden"
            onChange={handleFileChange}
          />
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
              <strong>{t('invoice.legalNotice')}</strong> {t('invoice.legalText')}
            </p>
          </div>

          {analysisItems.length > 0 && (
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">
                {t('invoice.analysisSummary')}
              </h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {analysisItems.slice(0, 5).map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.description || t('invoice.itemPlaceholder')}</span>
                    {item.total != null && (
                      <span>{item.total.toFixed(2)}€</span>
                    )}
                  </li>
                ))}
              </ul>
              {analysisItems.length > 5 && (
                <p className="text-xs text-muted-foreground mt-2">
                  {t('invoice.additionalItems')}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !canGeneratePdf}
            className={`btn-large w-full ${canGeneratePdf ? 'btn-success' : 'btn-secondary cursor-not-allowed opacity-70'}`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                {t('invoice.creating')}
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                {t('invoice.generate')}
              </>
            )}
          </button>

          {!canGeneratePdf && (
            <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
              <div className="flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{t('invoice.pdfLockedTitle')}</p>
                  <p className="mt-1 text-destructive/80">{t('invoice.pdfLockedDesc')}</p>
                  <Link
                    to="/settings"
                    className="mt-2 inline-flex items-center text-primary hover:underline"
                  >
                    {t('invoice.upgradeCta')}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateInvoice;
