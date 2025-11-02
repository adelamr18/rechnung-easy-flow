import React from 'react';
import { Receipt, Euro, Calendar, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

// Mock data for demo
const expenses = [
  {
    id: '1',
    date: '2024-06-15',
    amount: 25.50,
    note: 'Büromaterial',
    imageUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120"><rect width="200" height="120" fill="%23f3f4f6"/><text x="100" y="60" text-anchor="middle" dy="0.3em" font-family="Arial" font-size="14" fill="%23666">Receipt Image</text></svg>'
  },
  {
    id: '2',
    date: '2024-06-12',
    amount: 45.80,
    note: 'Tanken',
    imageUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120"><rect width="200" height="120" fill="%23f3f4f6"/><text x="100" y="60" text-anchor="middle" dy="0.3em" font-family="Arial" font-size="14" fill="%23666">Receipt Image</text></svg>'
  },
  {
    id: '3',
    date: '2024-06-10',
    amount: 12.30,
    note: 'Kaffee für Besprechung',
    imageUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120"><rect width="200" height="120" fill="%23f3f4f6"/><text x="100" y="60" text-anchor="middle" dy="0.3em" font-family="Arial" font-size="14" fill="%23666">Receipt Image</text></svg>'
  },
];

const ExpensesList: React.FC = () => {
  const { t } = useLanguage();

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
        {expenses.length === 0 ? (
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
                  <img
                    src={expense.imageUrl}
                    alt="Receipt"
                    className="w-20 h-20 rounded-lg object-cover border border-border"
                  />
                </div>

                {/* Expense Details */}
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(expense.date).toLocaleDateString('de-DE')}
                      </div>
                      
                      {expense.note && (
                        <div className="flex items-center gap-2 text-foreground mb-2">
                          <FileText className="h-4 w-4" />
                          <span className="font-medium">{expense.note}</span>
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1 text-warning font-bold text-xl">
                        <Euro className="h-5 w-5" />
                        {expense.amount.toFixed(2)}
                      </div>
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