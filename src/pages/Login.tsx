import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useToast } from '@/hooks/use-toast';

const copy = {
  en: {
    badge: 'Beta Access · Free forever during testing',
    headline: 'Log in and pick up where you left off.',
    sub: 'Built for cafés, bakeries, cleaners, barbers, and local service teams that need paperwork done fast. Manage invoices, receipts, and PDF templates from any device.',
    bullets: [
      'Create invoices in under 30 seconds',
      'Auto-extract receipt items (OCR)',
      'Dashboard insights for cashflow',
      'Unlimited Pro features during beta',
    ],
    help: 'Need help? Email support@invoiceeasy.org',
    emailPlaceholder: 'you@email.com',
    passwordPlaceholder: '••••••••',
  },
  de: {
    badge: 'Beta-Zugang · Kostenlos in der Testphase',
    headline: 'Einloggen und nahtlos weitermachen.',
    sub: 'Für Cafés, Bäckereien, Reinigungen, Friseure und lokale Services, die Papierkram schnell erledigen möchten. Verwalte Rechnungen, Belege und PDF-Templates auf jedem Gerät.',
    bullets: [
      'Rechnungen in unter 30 Sekunden erstellen',
      'Belegpositionen automatisch auslesen (OCR)',
      'Dashboard-Einblicke für Cashflow',
      'Unbegrenzte Pro-Features in der Beta',
    ],
    help: 'Brauchst du Hilfe? support@invoiceeasy.org',
    emailPlaceholder: 'du@email.de',
    passwordPlaceholder: '••••••••',
  },
  pl: {
    badge: 'Dostęp beta · Za darmo w testach',
    headline: 'Zaloguj się i kontynuuj bez przerw.',
    sub: 'Dla kawiarni, piekarni, firm sprzątających, fryzjerów i lokalnych usług, które chcą szybko ogarniać papierologię. Zarządzaj fakturami, paragonami i PDF-ami na każdym urządzeniu.',
    bullets: [
      'Faktury w mniej niż 30 sekund',
      'Automatyczny odczyt paragonów (OCR)',
      'Wgląd w cashflow w panelu',
      'Nielimitowane funkcje Pro w becie',
    ],
    help: 'Potrzebujesz pomocy? support@invoiceeasy.org',
    emailPlaceholder: 'ty@email.pl',
    passwordPlaceholder: '••••••••',
  },
  ru: {
    badge: 'Бета-доступ · Бесплатно во время теста',
    headline: 'Войдите и продолжайте без паузы.',
    sub: 'Для кафе, пекарен, клинеров, барберов и сервисных команд, которым нужен быстрый документооборот. Управляйте счетами, чеками и PDF с любого устройства.',
    bullets: [
      'Создавайте счета за 30 секунд',
      'Авто-извлечение чеков (OCR)',
      'Инсайты по денежному потоку',
      'Безлимитный Pro в бете',
    ],
    help: 'Нужна помощь? support@invoiceeasy.org',
    emailPlaceholder: 'you@example.com',
    passwordPlaceholder: '••••••••',
  },
  es: {
    badge: 'Acceso beta · Gratis en pruebas',
    headline: 'Inicia sesión y continúa sin interrupciones.',
    sub: 'Para cafeterías, panaderías, limpieza, barberos y equipos locales que necesitan trámites rápidos. Gestiona facturas, recibos y PDFs desde cualquier dispositivo.',
    bullets: [
      'Crea facturas en 30 segundos',
      'Extrae ítems de recibos (OCR)',
      'Insights de flujo de caja',
      'Pro ilimitado en beta',
    ],
    help: '¿Necesitas ayuda? support@invoiceeasy.org',
    emailPlaceholder: 'tu@email.com',
    passwordPlaceholder: '••••••••',
  },
  tr: {
    badge: 'Beta erişimi · Testte ücretsiz',
    headline: 'Giriş yapın ve kaldığınız yerden devam edin.',
    sub: 'Kafeler, fırınlar, temizlik, berberler ve hızlı evrak isteyen yerel ekipler için. Faturalar, fişler ve PDF’leri her cihazdan yönetin.',
    bullets: [
      '30 saniyede fatura',
      'Fiş satırları otomatik (OCR)',
      'Nakit akışı içgörüleri',
      'Beta süresince sınırsız Pro',
    ],
    help: 'Yardım lazım mı? support@invoiceeasy.org',
    emailPlaceholder: 'sizin@email.com',
    passwordPlaceholder: '••••••••',
  },
  ar: {
    badge: 'وصول تجريبي · مجاني أثناء الاختبار',
    headline: 'سجّل الدخول وأكمل عملك فوراً.',
    sub: 'للمقاهي، المخابز، التنظيف، الحلاقين والفرق المحلية التي تحتاج لإنهاء الأوراق بسرعة. أدِر الفواتير والإيصالات وملفات PDF من أي جهاز.',
    bullets: [
      'إنشاء فاتورة في 30 ثانية',
      'استخراج الإيصالات تلقائياً (OCR)',
      'رؤى التدفق النقدي',
      'Pro غير محدود في البيتا',
    ],
    help: 'بحاجة لمساعدة؟ support@invoiceeasy.org',
    emailPlaceholder: 'you@email.com',
    passwordPlaceholder: '••••••••',
  },
  zh: {
    badge: 'Beta 访问 · 测试期免费',
    headline: '登录并无缝继续。',
    sub: '为咖啡馆、面包店、清洁、理发等本地团队设计，快速完成文档。随时随地管理发票、收据和 PDF。',
    bullets: [
      '30 秒内生成发票',
      '自动提取收据 (OCR)',
      '现金流洞察',
      'Beta 期间无限 Pro',
    ],
    help: '需要帮助？support@invoiceeasy.org',
    emailPlaceholder: 'you@email.com',
    passwordPlaceholder: '••••••••',
  },
  ko: {
    badge: '베타 접근 · 테스트 동안 무료',
    headline: '로그인하고 바로 이어서 작업하세요.',
    sub: '카페, 베이커리, 청소, 바버 등 빠른 서류 처리가 필요한 로컬 팀을 위해. 인보이스, 영수증, PDF를 모든 기기에서 관리.',
    bullets: [
      '30초 안에 인보이스',
      '영수증 자동 추출 (OCR)',
      '캐시플로 인사이트',
      '베타 동안 무제한 Pro',
    ],
    help: '도움이 필요하세요? support@invoiceeasy.org',
    emailPlaceholder: 'you@email.com',
    passwordPlaceholder: '••••••••',
  },
  ja: {
    badge: 'ベータアクセス・テスト期間無料',
    headline: 'ログインしてすぐ再開。',
    sub: 'カフェ、ベーカリー、クリーニング、バーバーなど、素早く事務を片付けたいチーム向け。請求書・レシート・PDFをどのデバイスからでも管理。',
    bullets: [
      '30秒で請求書作成',
      'レシート自動抽出 (OCR)',
      'キャッシュフローの洞察',
      'ベータ中はPro無制限',
    ],
    help: 'ヘルプが必要ですか？support@invoiceeasy.org',
    emailPlaceholder: 'you@email.com',
    passwordPlaceholder: '••••••••',
  },
} as const;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const c = copy[language as keyof typeof copy] ?? copy.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

      try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: t('auth.loginSuccess'),
          description: t('auth.welcomeBack'),
        });
        navigate('/dashboard');
      } else {
        toast({
          title: t('auth.loginFailed'),
          description: t('auth.checkInputs'),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t('auth.error'),
        description: t('auth.errorOccurred'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F0FF] via-white to-[#FAF7F2]">
      <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-primary">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-orange-400 to-yellow-300 text-white shadow-md">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-tight">
            <span>InvoiceEasy</span>
            <span className="text-xs text-muted-foreground font-normal">Smart receipts &amp; billing</span>
          </div>
        </Link>
        <LanguageSwitcher />
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold w-fit">
            {c.badge}
          </span>
          <h1 className="text-4xl font-bold leading-tight text-slate-900">
            {c.headline}
          </h1>
          <p className="text-lg text-slate-600">
            {c.sub}
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {c.bullets.map((feature) => (
              <div key={feature} className="rounded-2xl border border-slate-200 bg-white/90 p-4 text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-md ml-auto">
          <div className="card-warm shadow-xl border border-slate-100">
            <div className="text-center mb-8 space-y-2">
              <h2 className="text-3xl font-bold text-foreground">{t('auth.welcome')}</h2>
              <p className="text-sm text-muted-foreground">{t('auth.signInSubtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  {t('auth.email')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-large pl-12 w-full"
                  placeholder={c.emailPlaceholder}
                  required
                />
              </div>
            </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="password"
                    type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-large pl-12 w-full"
                  placeholder={c.passwordPlaceholder}
                  required
                />
              </div>
            </div>

              <button type="submit" disabled={loading} className="btn-large btn-primary w-full">
                {loading ? <Loader className="h-5 w-5 animate-spin" /> : t('auth.login')}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-500">
              {t('auth.noAccount')}{' '}
              <Link to="/register" className="text-primary hover:text-primary/80 font-medium">
                {t('auth.register')}
              </Link>
              <p className="mt-2 text-xs text-muted-foreground">{c.help}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
