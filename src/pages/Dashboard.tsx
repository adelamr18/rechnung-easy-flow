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

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const summary = await apiClient.getMonthlySummary();
      setIncome(summary.income);
      setExpenses(summary.expenses);
      setProfit(summary.profit);
      
      // Transform chart data
      const transformed = summary.chart.map(point => ({
        month: point.label.split(' ')[0],
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t('dashboard.welcome')}, {user?.companyName}!
            </h1>
            <p className="text-muted-foreground text-lg mt-2">
              {t('dashboard.thisMonth')} - {new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <DollarSign className="h-8 w-8 text-primary" />
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
                  dataKey="month" 
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
                  name="Einnahmen"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="expenses" 
                  fill="hsl(var(--warning))" 
                  name="Ausgaben"
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