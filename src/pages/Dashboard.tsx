import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, FileText, Receipt } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { apiClient } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [profit, setProfit] = useState(0);
  const [chartData, setChartData] = useState<Array<{ label: string; income: number; expenses: number }>>([]);
  const [range, setRange] = useState<'month' | 'all'>('month');
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  useEffect(() => {
    loadSummary();
  }, [range, selectedMonth]);

  const loadSummary = async () => {
    try {
      setLoading(true);

      const params =
        range === 'all'
          ? { allTime: true }
          : (() => {
              const [yearStr, monthStr] = selectedMonth.split('-');
              const year = Number(yearStr);
              const month = Number(monthStr);
              return Number.isFinite(year) && Number.isFinite(month)
                ? { year, month }
                : undefined;
            })();

      const summary = await apiClient.getMonthlySummary(params);
      setIncome(summary.income);
      setExpenses(summary.expenses);
      setProfit(summary.profit);
      
      const transformed = summary.chart.map(point => ({
        label: point.label.split(' ')[0],
        income: point.income,
        expenses: point.expenses,
      }));
      setChartData(transformed);
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

  const stats = [
    {
      title: t('dashboard.income'),
      value: `${income}${t('common.euro')}`,
      icon: TrendingUp,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: t('dashboard.expenses'),
      value: `${expenses}${t('common.euro')}`,
      icon: TrendingDown,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: t('dashboard.profit'),
      value: `${profit}${t('common.euro')}`,
      icon: DollarSign,
      color: profit >= 0 ? 'text-success' : 'text-destructive',
      bgColor: profit >= 0 ? 'bg-success/10' : 'bg-destructive/10'
    }
  ];

  const quickActions = [
    {
      title: t('invoice.create'),
      description: t('dashboard.newInvoiceDesc'),
      icon: FileText,
      to: '/invoices/create',
      color: 'btn-primary'
    },
    {
      title: t('expenses.upload'),
      description: t('dashboard.newExpenseDesc'),
      icon: Receipt,
      to: '/expenses/upload',
      color: 'btn-secondary'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      {/* Welcome Header */}
      <div className="card-warm">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t('dashboard.welcome')}, {user?.companyName}!
            </h1>
            <p className="text-muted-foreground text-lg mt-2">
              {range === 'all'
                ? t('dashboard.allTime')
                : new Date(`${selectedMonth}-01`).toLocaleDateString(undefined, {
                    month: 'long',
                    year: 'numeric',
                  })}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <label className="text-sm text-muted-foreground">{t('dashboard.rangeLabel')}</label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => {
                setRange('month');
                setSelectedMonth(e.target.value);
              }}
              className="rounded-md border border-border bg-white px-3 py-2 text-sm text-foreground shadow-sm"
              aria-label={t('dashboard.selectMonth')}
              disabled={range === 'all'}
            />
            <button
              type="button"
              onClick={() => setRange(range === 'all' ? 'month' : 'all')}
              className={`px-3 py-2 text-sm rounded-md border transition ${
                range === 'all'
                  ? 'bg-primary text-white border-primary'
                  : 'border-border text-foreground bg-white hover:bg-muted'
              }`}
            >
              {range === 'all' ? t('dashboard.selectMonth') : t('dashboard.allTime')}
            </button>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="card-warm">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="card-warm">
        <h3 className="text-xl font-semibold text-foreground mb-6">
          {t('dashboard.monthlyOverview')}
        </h3>
        <div className="h-80">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="label" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Bar 
                  dataKey="income" 
                  fill="hsl(var(--success))" 
                  name={t('dashboard.income')}
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="expenses" 
                  fill="hsl(var(--warning))" 
                  name={t('dashboard.expenses')}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card-warm">
        <h3 className="text-xl font-semibold text-foreground mb-6">
          {t('dashboard.quickActions')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.to}
              className={`btn-large ${action.color} block text-center hover:scale-105 transition-transform`}
            >
              <action.icon className="h-6 w-6" />
              <div>
                <div className="font-medium">{action.title}</div>
                <div className="text-sm opacity-80">{action.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
