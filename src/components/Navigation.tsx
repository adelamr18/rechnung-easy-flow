import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FileText, Receipt, Settings, LogOut, Sparkles, LifeBuoy } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import FeedbackModal from '@/components/FeedbackModal';

const Navigation: React.FC = () => {
  const { logout } = useAuth();
  const { t } = useLanguage();
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const navItems = [
    { to: '/invoices', icon: FileText, label: t('nav.invoices') },
    { to: '/expenses', icon: Receipt, label: t('nav.expenses') },
    { to: '/settings', icon: Settings, label: t('nav.settings') },
  ];

  return (
    <nav className="bg-card border-b border-border px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 text-2xl font-bold text-primary hover:opacity-90 transition">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 via-orange-400 to-yellow-300 text-white shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="text-left">
            <div className="leading-none text-primary">InvoiceEasy</div>
            <p className="text-xs text-muted-foreground font-normal">Smart receipts & billing</p>
          </div>
        </Link>

        {/* Navigation Links - Hidden on small screens */}
        <div className="hidden md:flex items-center space-x-6 md:ml-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setFeedbackOpen(true)}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors font-medium"
          >
            <LifeBuoy className="h-4 w-4" />
            {t('settings.support', { defaultValue: 'Support' })}
          </button>
          <LanguageSwitcher />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden sm:inline font-medium">{t('nav.logout')}</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden mt-4 flex overflow-x-auto gap-2 pb-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-accent hover:text-accent-foreground'
              }`
            }
          >
            <item.icon className="h-4 w-4" />
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
      <FeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        source="header_button"
        title="Send Feedback"
        description="Have an idea or found a bug? Let us know so we can keep improving InvoiceEasy."
      />
    </nav>
  );
};

export default Navigation;
