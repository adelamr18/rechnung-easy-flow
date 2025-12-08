import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Building, Loader, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useToast } from '@/hooks/use-toast';

const copy = {
  en: {
    badge: 'Built for local businesses',
    headline: 'Create invoices and track receipts in minutes.',
    sub: 'Join the InvoiceEasy beta to manage paperwork for cafés, bakeries, cleaning services, barbers, and more. No credit card required — your feedback shapes the roadmap.',
    bullets: [
      'Starter plan free during beta',
      'OCR-powered receipt capture',
      '3 PDF styles with unique flair',
      'Upgrade to Pro-Beta anytime',
    ],
    placeholders: {
      company: 'My bakery',
      email: 'you@email.com',
      password: '••••••••',
      confirm: '••••••••',
    },
  },
  de: {
    badge: 'Gemacht für lokale Unternehmen',
    headline: 'Rechnungen schreiben und Belege in Minuten erfassen.',
    sub: 'Tritt der InvoiceEasy-Beta bei, um Papierkram für Cafés, Bäckereien, Reinigungen, Friseure und mehr zu managen. Keine Kreditkarte nötig — dein Feedback prägt die Roadmap.',
    bullets: [
      'Starter-Plan gratis in der Beta',
      'OCR für Belegerfassung',
      '3 PDF-Styles mit besonderem Look',
      'Upgrade auf Pro-Beta jederzeit',
    ],
    placeholders: {
      company: 'Meine Bäckerei',
      email: 'du@email.de',
      password: '••••••••',
      confirm: '••••••••',
    },
  },
  pl: {
    badge: 'Dla lokalnych firm',
    headline: 'Twórz faktury i zbieraj paragony w kilka minut.',
    sub: 'Dołącz do bety InvoiceEasy, aby zarządzać papierologią dla kawiarni, piekarni, firm sprzątających, fryzjerów i innych. Bez karty — twoja opinia kształtuje rozwój.',
    bullets: [
      'Plan Starter darmowy w becie',
      'Paragony z OCR',
      '3 style PDF z charakterem',
      'Upgrade do Pro-Beta w każdej chwili',
    ],
    placeholders: {
      company: 'Moja piekarnia',
      email: 'twoj@email.pl',
      password: '••••••••',
      confirm: '••••••••',
    },
  },
  ru: {
    badge: 'Для локального бизнеса',
    headline: 'Создавайте счета и фиксируйте чеки за минуты.',
    sub: 'Присоединяйтесь к бете InvoiceEasy, чтобы управлять бумагами для кафе, пекарен, клинеров, барберов и др. Без карты — ваш фидбек определяет дорожную карту.',
    bullets: [
      'Starter бесплатно в бете',
      'OCR для чеков',
      '3 стиля PDF с акцентом',
      'Апгрейд до Pro-Beta в любой момент',
    ],
    placeholders: {
      company: 'Моя пекарня',
      email: 'you@email.com',
      password: '••••••••',
      confirm: '••••••••',
    },
  },
  es: {
    badge: 'Para negocios locales',
    headline: 'Crea facturas y gestiona recibos en minutos.',
    sub: 'Únete a la beta de InvoiceEasy para manejar papeleo de cafés, panaderías, limpieza, barberos y más. Sin tarjeta — tu feedback marca el camino.',
    bullets: [
      'Plan Starter gratis en beta',
      'Captura de recibos con OCR',
      '3 estilos PDF con personalidad',
      'Sube a Pro-Beta cuando quieras',
    ],
    placeholders: {
      company: 'Mi panadería',
      email: 'tu@email.com',
      password: '••••••••',
      confirm: '••••••••',
    },
  },
  tr: {
    badge: 'Yerel işletmeler için',
    headline: 'Dakikalar içinde fatura ve fiş takibi.',
    sub: 'InvoiceEasy betasına katılın; kafe, fırın, temizlik, berber ve daha fazlası için evrakları yönetin. Kart gerekmez — geri bildiriminiz yol haritasını belirler.',
    bullets: [
      'Beta süresince Starter ücretsiz',
      'OCR ile fiş yakalama',
      '3 PDF stili',
      'İstediğin zaman Pro-Beta’ya geç',
    ],
    placeholders: {
      company: 'Benim fırınım',
      email: 'sizin@email.com',
      password: '••••••••',
      confirm: '••••••••',
    },
  },
  ar: {
    badge: 'للأعمال المحلية',
    headline: 'أنشئ الفواتير وتابع الإيصالات في دقائق.',
    sub: 'انضم إلى نسخة InvoiceEasy التجريبية لإدارة أوراق المقاهي، المخابز، التنظيف، الحلاقين وغيرهم. لا حاجة لبطاقة — ملاحظاتك توجه خطتنا.',
    bullets: [
      'خطة Starter مجانية في البيتا',
      'التقاط الإيصالات عبر OCR',
      '3 أنماط PDF مميزة',
      'ترقية إلى Pro-Beta في أي وقت',
    ],
    placeholders: {
      company: 'مخبزي',
      email: 'you@email.com',
      password: '••••••••',
      confirm: '••••••••',
    },
  },
  zh: {
    badge: '为本地商户',
    headline: '几分钟内完成开票和收据管理。',
    sub: '加入 InvoiceEasy 测试版，为咖啡馆、面包店、清洁、理发等管理文档。无需信用卡 — 你的反馈决定路线图。',
    bullets: [
      'Beta 期间 Starter 免费',
      'OCR 收据捕获',
      '3 种 PDF 样式',
      '随时升级到 Pro-Beta',
    ],
    placeholders: {
      company: '我的面包店',
      email: 'you@email.com',
      password: '••••••••',
      confirm: '••••••••',
    },
  },
  ko: {
    badge: '로컬 비즈니스를 위해',
    headline: '몇 분 안에 인보이스와 영수증을 정리하세요.',
    sub: 'InvoiceEasy 베타에 참여해 카페, 베이커리, 청소, 바버 등을 위한 서류를 관리하세요. 카드 불필요 — 여러분의 피드백이 로드맵을 만듭니다.',
    bullets: [
      '베타 동안 Starter 무료',
      'OCR로 영수증 캡처',
      '3가지 PDF 스타일',
      '언제든 Pro-Beta로 업그레이드',
    ],
    placeholders: {
      company: '내 빵집',
      email: 'you@email.com',
      password: '••••••••',
      confirm: '••••••••',
    },
  },
  ja: {
    badge: 'ローカルビジネス向け',
    headline: '数分で請求書とレシートを整理。',
    sub: 'InvoiceEasy ベータに参加し、カフェ、ベーカリー、清掃、バーバーなどの書類を管理。カード不要 — あなたの声が開発を決めます。',
    bullets: [
      'ベータ中はStarter無料',
      'OCRでレシート取り込み',
      '個性ある3つのPDFスタイル',
      'いつでもPro-Betaにアップグレード',
    ],
    placeholders: {
      company: '私のベーカリー',
      email: 'you@email.com',
      password: '••••••••',
      confirm: '••••••••',
    },
  },
} as const;

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);

  const { register: registerUser } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const c = copy[language as keyof typeof copy] ?? copy.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: t('auth.passwordsMismatch'),
        description: t('auth.checkPassword'),
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const success = await registerUser(email, password, companyName);
      if (success) {
        toast({
          title: t('auth.registerSuccess'),
          description: t('auth.welcomeMessage'),
        });
        navigate('/dashboard');
      } else {
        toast({
          title: t('auth.registerFailed'),
          description: t('auth.checkInputs'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: t('auth.error'),
        description: t('auth.errorOccurred'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEEFEA] via-white to-[#FAF7F2] flex flex-col">
      <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between w-full">
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

      <div className="flex-1 w-full">
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
              {c.bullets.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white/90 p-4 text-sm font-medium flex items-center gap-2"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-md ml-auto">
            <div className="card-warm shadow-xl border border-slate-100">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">{t('auth.createAccount')}</h2>
                <p className="text-muted-foreground text-lg">{t('auth.startToday')}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-foreground mb-2">
                    {t('auth.companyName')}
                  </label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="companyName"
                      type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="input-large pl-12 w-full"
                    placeholder={c.placeholders.company}
                    required
                  />
                </div>
              </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {t('auth.email')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="email"
                      type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-large pl-12 w-full"
                    placeholder={c.placeholders.email}
                    required
                  />
                </div>
              </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    {t('auth.password')}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="password"
                      type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-large pl-12 w-full"
                    placeholder={c.placeholders.password}
                    required
                  />
                </div>
              </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                    {t('auth.confirmPassword')}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="confirmPassword"
                      type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-large pl-12 w-full"
                    placeholder={c.placeholders.confirm}
                    required
                  />
                </div>
              </div>

                <button type="submit" disabled={loading} className="btn-large btn-primary w-full">
                  {loading ? <Loader className="h-5 w-5 animate-spin" /> : t('auth.createAccount')}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  {t('auth.hasAccount')}{' '}
                  <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
                    {t('auth.login')}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
