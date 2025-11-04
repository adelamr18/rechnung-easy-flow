import React, { useEffect, useState } from 'react';
import { Receipt, Euro, Calendar, FileText, Trash2, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api';

interface Expense {
  id: string;
  amount: number;
  note: string | null;
  receiptUrl: string | null;
  expenseDate: string;
  createdAt: string;
}

const ExpensesList: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [receiptPreviews, setReceiptPreviews] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<Expense | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadExpenses();
  }, []);

  useEffect(() => {
    return () => {
      Object.values(receiptPreviews).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [receiptPreviews]);

  const loadExpenses = async () => {
    try {
      const data = await apiClient.getExpenses();
      setExpenses(data);
      await generatePreviews(data);
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

  const generatePreviews = async (items: Expense[]) => {
    const previews: Record<string, string> = {};

    await Promise.all(
      items
        .filter((expense) => expense.receiptUrl)
        .map(async (expense) => {
          try {
            const blob = await apiClient.fetchExpenseReceipt(expense.id);
            previews[expense.id] = URL.createObjectURL(blob);
          } catch (error) {
            console.error('Failed to load receipt preview', error);
          }
        })
    );

    setReceiptPreviews(previews);
  };

  const handleDeleteClick = (expense: Expense) => {
    setDeleteTarget(expense);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      await apiClient.deleteExpense(deleteTarget.id);
      setExpenses((prev) => prev.filter((e) => e.id !== deleteTarget.id));
      setReceiptPreviews((prev) => {
        const next = { ...prev };
        if (next[deleteTarget.id]) {
          URL.revokeObjectURL(next[deleteTarget.id]);
          delete next[deleteTarget.id];
        }
        return next;
      });
      toast({
        title: t('toast.success'),
        description: t('expenses.deletedDesc'),
      });
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message || t('auth.errorOccurred'),
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const cancelDelete = () => {
    setDeleteTarget(null);
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="card-warm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t('expenses.title')}
            </h1>
            <p className="text-muted-foreground text-lg mt-2">
              {t('expenses.list')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">{t('expenses.totalMonth')}</p>
            <p className="text-2xl font-bold text-warning">
              {totalExpenses.toFixed(2)}{t('common.euro')}
            </p>
          </div>
        </div>
      </div>

      {/* Add New Expense Button */}
      <Link 
        to="/expenses/upload"
        className="btn-large btn-primary w-full block text-center"
      >
        <Receipt className="h-6 w-6" />
        {t('expenses.addNew')}
      </Link>

      {/* Expenses List */}
      <div className="space-y-4">
        {loading ? (
          <div className="card-warm text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : expenses.length === 0 ? (
          <div className="card-warm text-center py-12">
            <Receipt className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              {t('expenses.noExpenses')}
            </h3>
            <p className="text-muted-foreground">
              {t('expenses.uploadFirst')}
            </p>
          </div>
        ) : (
          expenses.map((expense) => (
            <div key={expense.id} className="card-warm">
              <div className="flex items-center gap-4">
                {/* Receipt Image */}
                <div className="flex-shrink-0">
                  {receiptPreviews[expense.id] ? (
                    <img
                      src={receiptPreviews[expense.id]}
                      alt="Receipt"
                      className="w-20 h-20 rounded-lg object-cover border border-border"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-lg border border-border bg-muted flex items-center justify-center">
                      <Receipt className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Expense Details */}
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(expense.expenseDate).toLocaleDateString('de-DE')}
                      </div>
                      
                      {expense.note && (
                        <div className="flex items-center gap-2 text-foreground mb-2">
                          <FileText className="h-4 w-4" />
                          <span className="font-medium">{expense.note}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-warning font-bold text-xl">
                          <Euro className="h-5 w-5" />
                          {expense.amount.toFixed(2)}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteClick(expense)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm px-4">
          <div className="card-warm w-full max-w-md">
            <h2 className="text-xl font-semibold text-foreground">
              {t('expenses.deleteConfirmTitle')}
            </h2>
            <p className="text-muted-foreground mt-3">
              {t('expenses.deleteConfirmMessage')}
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={cancelDelete}
                className="btn-secondary"
                disabled={deleting}
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={confirmDelete}
                className="btn-destructive flex items-center gap-2"
                disabled={deleting}
              >
                {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                {t('actions.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensesList;
