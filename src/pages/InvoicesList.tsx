import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Download, FileText, Loader2, Trash2 } from 'lucide-react';
import { apiClient, InvoiceLineItem } from '@/lib/api';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { downloadBlob } from '@/lib/download';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface InvoiceListItem {
  id: string;
  customerName: string;
  serviceDescription: string;
  amount: number;
  currency: string;
  invoiceDate: string;
  downloadUrl: string | null;
  items?: InvoiceLineItem[] | null;
  createdAt: string;
}

const localeMap: Record<Language, string> = {
  de: 'de-DE',
  en: 'en-US',
  pl: 'pl-PL',
  ru: 'ru-RU',
  es: 'es-ES',
  tr: 'tr-TR',
  ar: 'ar-SA',
  zh: 'zh-CN',
  ko: 'ko-KR',
  ja: 'ja-JP',
};

const pageSize = 20;

const InvoicesList: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [invoices, setInvoices] = useState<InvoiceListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<InvoiceListItem | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const activeLocale = localeMap[language] ?? 'en-US';

  useEffect(() => {
    void loadInvoices(1, true);
  }, []);

  const loadInvoices = async (pageToLoad: number, reset = false) => {
    if (reset) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const data = await apiClient.getInvoices(pageToLoad, pageSize);
      setInvoices((prev) => (reset ? data : [...prev, ...data]));
      setHasMore(data.length === pageSize);
      setPage(pageToLoad);
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message || t('auth.errorOccurred'),
        variant: 'destructive',
      });
    } finally {
      if (reset) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  };

  const formatInvoiceDate = (value: string) => {
    if (!value) return '—';
    const parts = value.split('-').map(Number);
    if (parts.length === 3 && parts.every((part) => !Number.isNaN(part))) {
      const [year, month, day] = parts;
      const date = new Date(year, month - 1, day);
      return new Intl.DateTimeFormat(activeLocale, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(date);
    }

    const fallback = new Date(value);
    if (Number.isNaN(fallback.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat(activeLocale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(fallback);
  };

  const formatTimestamp = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat(activeLocale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleDownload = async (invoice: InvoiceListItem) => {
    if (!invoice.downloadUrl) {
      toast({
        title: t('auth.error'),
        description: t('invoiceHistory.downloadMissing'),
        variant: 'destructive',
      });
      return;
    }

    setDownloadingId(invoice.id);
    try {
      const blob = await apiClient.downloadInvoicePdf(invoice.id);
      downloadBlob(blob, `invoice_${invoice.id}.pdf`);
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message || t('auth.errorOccurred'),
        variant: 'destructive',
      });
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDeleteClick = (invoice: InvoiceListItem) => {
    setDeleteTarget(invoice);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);
    try {
      await apiClient.deleteInvoice(deleteTarget.id);
      setInvoices((prev) => prev.filter((item) => item.id !== deleteTarget.id));
      toast({
        title: t('toast.success'),
        description: t('invoiceHistory.deleted'),
      });
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message || t('auth.errorOccurred'),
        variant: 'destructive',
      });
    } finally {
      setDeletingId(null);
      setDeleteDialogOpen(false);
      setDeleteTarget(null);
    }
  };

  const closeDeleteDialog = () => {
    if (deletingId) return;
    setDeleteDialogOpen(false);
    setDeleteTarget(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <div className="card-warm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t('invoiceHistory.title')}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t('invoiceHistory.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <Link
        to="/invoices/create"
        className="btn-large btn-primary w-full block text-center"
      >
        {t('invoice.create')}
      </Link>

      <div className="space-y-4">
        {loading ? (
          <div className="card-warm text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : invoices.length === 0 ? (
          <div className="card-warm text-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground">
              {t('invoiceHistory.empty')}
            </h3>
            <p className="text-muted-foreground mt-2">
              {t('invoiceHistory.emptyDesc')}
            </p>
          </div>
        ) : (
          invoices.map((invoice) => (
            <div key={invoice.id} className="card-warm space-y-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="h-4 w-4" />
                    {formatInvoiceDate(invoice.invoiceDate)}
                  </div>
                  <p className="text-xl font-semibold text-foreground">
                    {invoice.customerName || t('invoice.customer')}
                  </p>
                  {invoice.serviceDescription && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {invoice.serviceDescription}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{t('invoice.amount')}</p>
                  <p className="text-3xl font-bold text-foreground">
                    {invoice.amount.toFixed(2)}{t('common.euro')}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('invoiceHistory.savedOn')}: {formatTimestamp(invoice.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => void handleDownload(invoice)}
                  disabled={!invoice.downloadUrl || downloadingId === invoice.id}
                  className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
                    !invoice.downloadUrl || downloadingId === invoice.id
                      ? 'border-border bg-muted text-muted-foreground cursor-not-allowed'
                      : 'border-primary text-primary hover:bg-primary/10'
                  }`}
                >
                  {downloadingId === invoice.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  {downloadingId === invoice.id
                    ? t('invoice.pdfDownloading')
                    : t('invoice.pdfDownload')}
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteClick(invoice)}
                  disabled={deletingId === invoice.id}
                  className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
                    deletingId === invoice.id
                      ? 'border-border bg-muted text-muted-foreground cursor-not-allowed'
                      : 'border-destructive text-destructive hover:bg-destructive/10'
                  }`}
                >
                  {deletingId === invoice.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  {t('common.delete')}
                </button>
              </div>

              {!invoice.downloadUrl && (
                <p className="text-xs text-muted-foreground">
                  {t('invoiceHistory.downloadMissing')}
                </p>
              )}
            </div>
          ))
        )}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => void loadInvoices(page + 1)}
          disabled={loadingMore}
          className="btn-large btn-secondary w-full"
        >
          {loadingMore ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              {t('invoiceHistory.loadingMore')}
            </>
          ) : (
            t('invoiceHistory.loadMore')
          )}
        </button>
      )}
      <AlertDialog open={deleteDialogOpen} onOpenChange={(open) => (open ? setDeleteDialogOpen(true) : closeDeleteDialog())}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('invoiceHistory.deleteConfirm')}</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget?.customerName
                ? `${t('invoiceHistory.savedOn')}: ${formatInvoiceDate(deleteTarget.invoiceDate)} — ${deleteTarget.customerName}`
                : t('invoiceHistory.subtitle')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeDeleteDialog} disabled={!!deletingId}>
              {t('common.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={!!deletingId}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deletingId ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t('invoice.saving')}
                </>
              ) : (
                t('common.delete')
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InvoicesList;
