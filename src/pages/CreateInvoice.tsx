import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, FileText, Euro, Calendar, Save, Upload, Loader2, ShieldAlert, Download } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api';
import { downloadBlob } from '@/lib/download';

const CreateInvoice: React.FC = () => {
  const [customerName, setCustomerName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisItems, setAnalysisItems] = useState<Array<{
    description: string;
    quantity?: number | null;
    unitPrice?: number | null;
    totalPrice?: number | null;
  }>>([]);
  const [readyToSave, setReadyToSave] = useState(false);
  const [lastInvoiceId, setLastInvoiceId] = useState<string | null>(null);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [pendingTemplate, setPendingTemplate] = useState<'basic' | 'advanced' | 'elite' | null>(null);
  const [lastTemplate, setLastTemplate] = useState<'basic' | 'advanced' | 'elite' | null>(null);
  const [downloadingLatest, setDownloadingLatest] = useState(false);
  const [notesEditedManually, setNotesEditedManually] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const normalizedPlan = (user?.plan ?? 'starter').toLowerCase();
  const isPremiumPlan = normalizedPlan === 'pro' || normalizedPlan === 'elite';
  const isFormValid = serviceDescription.trim().length > 0 && amount.trim().length > 0;
  const pdfDescriptionKey = React.useMemo(() => {
    if (normalizedPlan === 'elite') return 'invoice.pdfSectionSubtitleElite';
    if (normalizedPlan === 'pro') return 'invoice.pdfSectionSubtitlePro';
    return 'invoice.pdfSectionSubtitleStarter';
  }, [normalizedPlan]);

  const templateLabelMap = React.useMemo(
    () => ({
      basic: t('invoice.templateBasic'),
      advanced: t('invoice.templateAdvanced'),
      elite: t('invoice.templateElite'),
    }),
    [t]
  );

  const buildNotesSummary = React.useCallback((analysis: any) => {
    const vendor = analysis?.vendorName?.trim() || 'your vendor';
    const date = analysis?.invoiceDate
      ? new Date(analysis.invoiceDate).toLocaleDateString()
      : new Date().toLocaleDateString();
    const itemCount = analysis?.items?.length || analysisItems.length;
    const total = analysis?.totalAmount
      ? `${analysis.totalAmount.toFixed(2)} ${analysis?.currencyCode || 'EUR'}`
      : `${amount || '0.00'} EUR`;
    return `Receipt captured from ${vendor} on ${date}. ${itemCount} line items totaling ${total}.`;
  }, [analysisItems.length, amount]);

  const formatQuantity = React.useCallback((value?: number | null) => {
    if (value == null) return '';
    return Number.isInteger(value) ? value.toString() : value.toFixed(2);
  }, []);

  const resetPdfState = React.useCallback(() => {
    setLastInvoiceId(null);
    setGeneratedPdfUrl(null);
    setLastTemplate(null);
    setNotesEditedManually(false);
  }, []);

  const triggerPdfDownload = React.useCallback(
    async (invoiceId: string, showSpinner = false) => {
      if (!invoiceId) return;
      if (showSpinner) {
        setDownloadingLatest(true);
      }
      try {
        const blob = await apiClient.downloadInvoicePdf(invoiceId);
        downloadBlob(blob, `invoice_${invoiceId}.pdf`);
      } catch (error: any) {
        toast({
          title: t('auth.error'),
          description: error.message || t('auth.errorOccurred'),
          variant: 'destructive',
        });
      } finally {
        if (showSpinner) {
          setDownloadingLatest(false);
        }
      }
    },
    [t, toast]
  );

  const handleDownloadLatestPdf = React.useCallback(async () => {
    if (!lastInvoiceId || !generatedPdfUrl) {
      toast({
        title: t('auth.error'),
        description: t('invoice.pdfAwaitSave'),
        variant: 'destructive',
      });
      return;
    }

    await triggerPdfDownload(lastInvoiceId, true);
  }, [generatedPdfUrl, lastInvoiceId, t, toast, triggerPdfDownload]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedAmount = amount.replace(/\s/g, '').replace(',', '.');
    const parsedAmount = Number(normalizedAmount);

    if (!isFormValid || Number.isNaN(parsedAmount) || parsedAmount < 0) {
      toast({
        title: t('auth.error'),
        description: t('auth.errorOccurred'),
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const result = await apiClient.createInvoice({
        customerName: customerName.trim(),
        serviceDescription: serviceDescription.trim(),
        amount: parsedAmount,
        invoiceDate: date,
        items: analysisItems.length
          ? analysisItems.map((item) => ({
              description: item.description,
              quantity: item.quantity ?? null,
              unitPrice: item.unitPrice ?? null,
              totalPrice: item.totalPrice ?? null,
            }))
          : undefined,
      });

      toast({
        title: t('invoice.created'),
        description: t('invoice.createdDesc'),
      });

      const invoiceId = result.id;
      setLastInvoiceId(invoiceId);
      const defaultTemplate: 'basic' | 'advanced' | 'elite' =
        normalizedPlan === 'elite'
          ? 'elite'
          : normalizedPlan === 'pro'
            ? 'advanced'
            : 'basic';
      const templateToStore = result.downloadUrl ? defaultTemplate : null;
      setGeneratedPdfUrl(result.downloadUrl ?? null);
      setLastTemplate(templateToStore);
      if (result.downloadUrl) {
        await triggerPdfDownload(invoiceId);
      }

      setCustomerName('');
      setServiceDescription('');
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);
      setAnalysisItems([]);
      setNotesEditedManually(false);
      setReadyToSave(false);
      setPendingTemplate(null);
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
    resetPdfState();
    setReadyToSave(false);
    setAnalysisItems([]);
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
        const parsedItems = response.items
          .map((item: any) => ({
            description: item.description?.trim(),
            quantity: item.quantity ?? null,
            unitPrice: item.unitPrice ?? null,
            totalPrice: item.totalPrice ?? item.unitPrice ?? null,
          }))
          .filter((item: any) => item.description);
        setAnalysisItems(parsedItems);
      }

      if (!notesEditedManually || !serviceDescription.trim()) {
        setServiceDescription(buildNotesSummary(response));
        setNotesEditedManually(false);
      }

      toast({
        title: t('invoice.analysisComplete'),
        description: t('invoice.analysisCompleteDesc'),
      });
      setReadyToSave(true);
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

  const handleGeneratePdf = async (template: 'basic' | 'advanced' | 'elite') => {
    if (!lastInvoiceId) {
      toast({
        title: t('auth.error'),
        description: t('invoice.pdfAwaitSave'),
        variant: 'destructive',
      });
      return;
    }

    setPendingTemplate(template);
    try {
      const result = await apiClient.generateInvoicePdf(lastInvoiceId, template);
      setGeneratedPdfUrl(result.downloadUrl);
      setLastTemplate(template);
      toast({
        title: t('invoice.pdfReadyTitle'),
        description: t('invoice.pdfReadyDesc'),
      });
      if (result.downloadUrl) {
        await triggerPdfDownload(lastInvoiceId);
      }
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message || t('auth.errorOccurred'),
        variant: 'destructive',
      });
    } finally {
      setPendingTemplate(null);
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
                <span className="flex items-center justify-center gap-2">
                  {analyzing ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Upload className="h-5 w-5" />
                  )}
                  <span>
                    {analyzing ? t('invoice.analyzing') : t('invoice.uploadInvoice')}
                  </span>
                </span>
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
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  setReadyToSave(true);
                  if (lastInvoiceId || generatedPdfUrl || lastTemplate) {
                    resetPdfState();
                  }
                }}
                className="input-large pl-12 w-full"
                placeholder="Max Mustermann"
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
                onChange={(e) => {
                  setServiceDescription(e.target.value);
                  setNotesEditedManually(true);
                  setReadyToSave(true);
                  if (lastInvoiceId || generatedPdfUrl || lastTemplate) {
                    resetPdfState();
                  }
                }}
                className="input-large pl-12 w-full min-h-[120px] resize-none"
                placeholder={t('invoice.service')}
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
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setReadyToSave(true);
                    if (lastInvoiceId || generatedPdfUrl || lastTemplate) {
                      resetPdfState();
                    }
                  }}
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
                  onChange={(e) => {
                    setDate(e.target.value);
                    setReadyToSave(true);
                    if (lastInvoiceId || generatedPdfUrl || lastTemplate) {
                      resetPdfState();
                    }
                  }}
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
                    <span>
                      {item.description || t('invoice.itemPlaceholder')}
                      {item.quantity != null && (
                        <span className="text-muted-foreground"> · ×{formatQuantity(item.quantity)}</span>
                      )}
                      {item.unitPrice != null && (
                        <span className="text-muted-foreground"> · @{item.unitPrice.toFixed(2)}€</span>
                      )}
                    </span>
                    {item.totalPrice != null && (
                      <span>{item.totalPrice.toFixed(2)}€</span>
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
            disabled={loading || analyzing || !readyToSave || !isFormValid}
            className={`btn-large btn-primary w-full ${loading || analyzing || !readyToSave || !isFormValid ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <span className="flex items-center justify-center gap-2">
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Save className="h-5 w-5" />
              )}
              <span>{loading ? t('invoice.saving') : t('invoice.save')}</span>
            </span>
          </button>

          <div className="mt-6 rounded-xl border border-border bg-muted/20 p-5 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{t('invoice.pdfSectionTitle')}</h3>
              <p className="text-sm text-muted-foreground">
                {t(pdfDescriptionKey)}
              </p>
            </div>

            {lastInvoiceId ? (
              <>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => void handleGeneratePdf('basic')}
                    disabled={pendingTemplate !== null}
                    className={`flex-1 min-w-[180px] rounded-xl border border-primary/30 bg-background px-5 py-3 text-base font-medium transition hover:bg-primary/5 ${
                      pendingTemplate === 'basic' ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                      <div className="flex items-center justify-center gap-2">
                        {pendingTemplate === 'basic' ? (
                          <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        ) : (
                          <Save className="h-4 w-4 text-primary" />
                        )}
                        <span>
                          {pendingTemplate === 'basic' ? t('invoice.pdfGenerating') : t('invoice.generateBasic')}
                        </span>
                      </div>
                  </button>

                  {normalizedPlan !== 'starter' && (
                    <button
                      type="button"
                      onClick={() => void handleGeneratePdf('advanced')}
                      disabled={pendingTemplate !== null}
                      className={`flex-1 min-w-[180px] rounded-xl border border-primary bg-primary px-5 py-3 text-base font-medium text-primary-foreground transition hover:bg-primary/90 ${
                        pendingTemplate === 'advanced' ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {pendingTemplate === 'advanced' ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4" />
                        )}
                        <span>
                          {pendingTemplate === 'advanced'
                            ? t('invoice.pdfGenerating')
                            : t('invoice.generateAdvanced')}
                        </span>
                      </div>
                    </button>
                  )}

                  {normalizedPlan === 'elite' && (
                    <button
                      type="button"
                      onClick={() => void handleGeneratePdf('elite')}
                      disabled={pendingTemplate !== null}
                      className={`flex-1 min-w-[180px] rounded-xl border border-[#38BDF8] bg-[#38BDF8] px-5 py-3 text-base font-medium text-slate-900 transition hover:bg-[#0EA5E9] ${
                        pendingTemplate === 'elite' ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {pendingTemplate === 'elite' ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4" />
                        )}
                        <span>
                          {pendingTemplate === 'elite'
                            ? t('invoice.pdfGenerating')
                            : t('invoice.generateElite')}
                        </span>
                      </div>
                    </button>
                  )}
                </div>

                {generatedPdfUrl && (
                  <div className="flex flex-col gap-2 rounded-xl border border-border bg-background px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{t('invoice.pdfDownload')}</p>
                      {lastTemplate && (
                        <p className="text-xs text-muted-foreground">
                          {t('invoice.pdfLastTemplate')}: {templateLabelMap[lastTemplate]}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => void handleDownloadLatestPdf()}
                      disabled={downloadingLatest}
                      className={`inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition ${
                        downloadingLatest ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary/90'
                      }`}
                    >
                      {downloadingLatest ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                      {downloadingLatest ? t('invoice.pdfDownloading') : t('invoice.pdfDownload')}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">{t('invoice.pdfAwaitSave')}</p>
            )}
          </div>

          {!isPremiumPlan && (
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
