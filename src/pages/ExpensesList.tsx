import React, { useEffect, useState } from 'react';
import { Receipt, Euro, Calendar, FileText, Trash2 } from 'lucide-react';
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

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const data = await apiClient.getExpenses();
      setExpenses(data);
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

  const handleDelete = async (id: string) => {
    if (!confirm(t('actions.delete') + '?')) return;

    try {
      await apiClient.deleteExpense(id);
      setExpenses(expenses.filter(e => e.id !== id));
      toast({
        title: t('toast.success'),
        description: t('expenses.savedDesc'),
      });
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message || t('auth.errorOccurred'),
        variant: 'destructive',
      });
    }
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
                  {expense.receiptUrl ? (
                    <img
                      src={expense.receiptUrl}
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
                        onClick={() => handleDelete(expense.id)}
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
    </div>
  );
};

export default ExpensesList;