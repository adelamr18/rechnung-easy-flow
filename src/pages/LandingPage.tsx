import { Link } from 'react-router-dom';
import { ShieldCheck, BarChart3, FileText, CheckCircle2, Sparkles } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Footer from '@/components/Layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const copy = {
  en: {
    heroTag: 'Beta access · Free during testing',
    heroTitle: 'Simple Invoicing & Expense Tracking',
    heroAccent: 'for Local Businesses',
    heroSub1: 'Create invoices and save every receipt in under 30 seconds — from your phone or laptop.',
    heroSub2:
      'Perfect for cafés, bakeries, handymen, cleaners, barbers — anyone who wants fast, clean paperwork without the hassle. Snap a receipt, auto-extract the details, and generate professional PDFs in seconds.',
    ctaPrimary: 'Start Free Beta',
    ctaSecondary: 'See the app',
    badgeNote: 'No credit card · Free during beta',
    heroBullets: [
      '10 languages supported',
      'Works on mobile & desktop',
      'Your data stored in the EU',
      'Automatic PDF creation',
      'OCR-powered imports',
      'Unlimited Pro (beta)',
    ],
    previewTitle: 'Dashboard preview',
    previewNote: 'Actual interface preview from our internal beta — optimized for tidy, local business workflows.',
    featuresTag: 'Everything you need to get started',
    featuresTitle: 'Features built for simplicity & speed',
    featuresSub: 'Powerful automation wrapped in a friendly interface.',
    featuresAudience: 'Made for cafés, bakeries, cleaners, handymen, barbers, tutors & more.',
    featureCards: [
      { icon: <FileText />, title: 'Automatic PDFs', description: 'Create professional invoices in one click.' },
      { icon: <ShieldCheck />, title: 'Secure OCR', description: 'Extract line items from receipts instantly.' },
      { icon: <BarChart3 />, title: 'Dashboard insights', description: 'Track invoicing volume and expenses.' },
      { icon: <Sparkles />, title: 'Beta upgrades', description: 'Unlock unlimited Pro features during beta.' },
    ],
    workflowTag: 'See it in action',
    workflowTitle: 'A lightweight workflow for busy founders',
    workflowSub: 'From upload to finished PDF in under one minute.',
    workflowSteps: [
      'Upload invoice or receipt',
      'Review extracted line items',
      'Download polished PDF',
    ],
    workflowStepDesc: [
      'Drag-and-drop or email your document to the inbox.',
      'Make quick edits; quantities and totals stay in sync.',
      'Use Basic, Advanced, or Elite templates — all branded for you.',
    ],
    betaCtaTag: 'Ready to get started?',
    betaCtaTitle: 'Join the beta and help shape the future of InvoiceEasy.',
    betaCtaButton: 'Create Free Beta Account',
    betaCtaNote: 'Already using InvoiceEasy? Use the Login link in the header.',
    nav: { features: 'Features', workflow: 'Workflow', beta: 'Beta Notice', login: 'Login', register: 'Create Free Account' },
    betaNotice: [
      'InvoiceEasy is in a non-commercial beta. No paid plans, no contracts — just testing and feedback so we can build the right tool for local businesses.',
      'PDFs are for internal tests during this phase and should be reviewed before you forward them to customers.',
    ],
  },
  de: {
    heroTag: 'Beta-Zugang · Kostenlos während der Testphase',
    heroTitle: 'Einfache Rechnungen & Belegerfassung',
    heroAccent: 'für lokale Unternehmen',
    heroSub1: 'Erstellen Sie Rechnungen und speichern Sie Belege in unter 30 Sekunden – am Handy oder Laptop.',
    heroSub2:
      'Perfekt für Cafés, Bäckereien, Handwerker, Reinigungen, Friseure – alle, die schnelle, saubere Dokumente ohne Aufwand möchten. Foto vom Beleg, Daten automatisch auslesen, PDF in Sekunden.',
    ctaPrimary: 'Kostenlos starten (Beta)',
    ctaSecondary: 'App ansehen',
    badgeNote: 'Keine Kreditkarte · Kostenlos in der Beta',
    heroBullets: [
      '10 Sprachen verfügbar',
      'Funktioniert auf Handy & Desktop',
      'Deine Daten liegen in der EU',
      'Automatische PDF-Erstellung',
      'OCR-Importe',
      'Unlimitiertes Pro (Beta)',
    ],
    previewTitle: 'Dashboard-Vorschau',
    previewNote: 'Echte Oberfläche aus unserer internen Beta — optimiert für schlanke Abläufe.',
    featuresTag: 'Alles für den Start',
    featuresTitle: 'Funktionen für Tempo & Einfachheit',
    featuresSub: 'Starke Automatisierung in einer freundlichen Oberfläche.',
    featuresAudience: 'Gemacht für Cafés, Bäckereien, Reinigungen, Handwerker, Friseure, Tutoren & mehr.',
    featureCards: [
      { icon: <FileText />, title: 'Automatische PDFs', description: 'Professionelle Rechnungen mit einem Klick.' },
      { icon: <ShieldCheck />, title: 'Sichere OCR', description: 'Positionen aus Belegen sofort auslesen.' },
      { icon: <BarChart3 />, title: 'Dashboard-Insights', description: 'Rechnungsvolumen und Ausgaben im Blick.' },
      { icon: <Sparkles />, title: 'Beta-Upgrades', description: 'Unbegrenztes Pro während der Beta.' },
    ],
    workflowTag: 'So funktioniert es',
    workflowTitle: 'Leichter Workflow für Vielbeschäftigte',
    workflowSub: 'Vom Upload zum fertigen PDF in unter einer Minute.',
    workflowSteps: [
      'Rechnung oder Beleg hochladen',
      'Erkannte Positionen prüfen',
      'Poliertes PDF herunterladen',
    ],
    workflowStepDesc: [
      'Per Drag-and-drop oder per E-Mail in die Inbox.',
      'Schnell anpassen; Mengen und Summen bleiben synchron.',
      'Basic-, Advanced- oder Elite-Templates – alle gebrandet.',
    ],
    betaCtaTag: 'Bereit für den Start?',
    betaCtaTitle: 'Tritt der Beta bei und gestalte InvoiceEasy mit.',
    betaCtaButton: 'Kostenlosen Beta-Account erstellen',
    betaCtaNote: 'Schon Nutzer? Nutze den Login-Link im Header.',
    nav: { features: 'Funktionen', workflow: 'Ablauf', beta: 'Beta-Hinweis', login: 'Login', register: 'Kostenlos registrieren' },
    betaNotice: [
      'InvoiceEasy läuft in einer nicht-kommerziellen Beta. Keine kostenpflichtigen Pläne, keine Verträge — nur Tests und Feedback, damit wir das richtige Werkzeug für lokale Unternehmen bauen.',
      'PDFs dienen in dieser Phase internen Tests und sollten vor dem Weiterleiten geprüft werden.',
    ],
  },
  pl: {
    heroTag: 'Dostęp beta · Za darmo w testach',
    heroTitle: 'Proste fakturowanie i paragony',
    heroAccent: 'dla lokalnych firm',
    heroSub1: 'Twórz faktury i zapisuj paragony w mniej niż 30 sekund — z telefonu lub laptopa.',
    heroSub2:
      'Idealne dla kawiarni, piekarni, fachowców, firm sprzątających, fryzjerów — wszystkich, którzy chcą szybkiej, czystej papierologii. Zrób zdjęcie, automatycznie wyodrębnij dane i wygeneruj PDF w kilka sekund.',
    ctaPrimary: 'Rozpocznij darmową betę',
    ctaSecondary: 'Zobacz aplikację',
    badgeNote: 'Bez karty · Za darmo w becie',
    heroBullets: [
      'Obsługa 10 języków',
      'Działa na telefonie i komputerze',
      'Twoje dane w UE',
      'Automatyczne PDF',
      'Importy OCR',
      'Nielimitowane Pro (beta)',
    ],
    previewTitle: 'Podgląd panelu',
    previewNote: 'Prawdziwy podgląd z naszej wewnętrznej bety — zoptymalizowany pod lokalne biznesy.',
    featuresTag: 'Wszystko na start',
    featuresTitle: 'Funkcje dla prostoty i szybkości',
    featuresSub: 'Mocna automatyzacja w przyjaznym interfejsie.',
    featuresAudience: 'Dla kawiarni, piekarni, sprzątających, fachowców, fryzjerów, korepetytorów i więcej.',
    featureCards: [
      { icon: <FileText />, title: 'Automatyczne PDF', description: 'Profesjonalne faktury jednym kliknięciem.' },
      { icon: <ShieldCheck />, title: 'Bezpieczne OCR', description: 'Natychmiastowe odczyty pozycji z paragonów.' },
      { icon: <BarChart3 />, title: 'Wgląd w panel', description: 'Kontrola nad fakturami i wydatkami.' },
      { icon: <Sparkles />, title: 'Ulepszenia beta', description: 'Nielimitowane Pro w trakcie bety.' },
    ],
    workflowTag: 'Zobacz w akcji',
    workflowTitle: 'Lekki workflow dla zapracowanych',
    workflowSub: 'Od uploadu do gotowego PDF w minutę.',
    workflowSteps: [
      'Wyślij fakturę lub paragon',
      'Sprawdź rozpoznane pozycje',
      'Pobierz dopracowane PDF',
    ],
    workflowStepDesc: [
      'Przeciągnij i upuść lub wyślij e-mailem do skrzynki.',
      'Szybkie poprawki; ilości i sumy są spójne.',
      'Szablony Basic, Advanced lub Elite — wszystkie z Twoim brandem.',
    ],
    betaCtaTag: 'Gotowy na start?',
    betaCtaTitle: 'Dołącz do bety i współtwórz InvoiceEasy.',
    betaCtaButton: 'Utwórz darmowe konto beta',
    betaCtaNote: 'Już używasz? Skorzystaj z linku Login w nagłówku.',
    nav: { features: 'Funkcje', workflow: 'Przepływ', beta: 'Informacja o becie', login: 'Logowanie', register: 'Załóż darmowe konto' },
    betaNotice: [
      'InvoiceEasy działa w trybie beta i niekomercyjnym. Brak płatnych planów i umów — testujemy i zbieramy opinie, aby stworzyć najlepsze narzędzie dla lokalnych firm.',
      'PDF-y w tej fazie służą testom wewnętrznym i powinny być sprawdzone przed wysłaniem klientom.',
    ],
  },
  ru: {
    heroTag: 'Доступ к бета-версии · Бесплатно во время теста',
    heroTitle: 'Простые счета и чеки',
    heroAccent: 'для локального бизнеса',
    heroSub1: 'Создавайте счета и сохраняйте чеки менее чем за 30 секунд — с телефона или ноутбука.',
    heroSub2:
      'Для кафе, пекарен, мастеров, клинеров, барберов — всех, кому нужен быстрый и чистый документооборот. Фото чека, авто-извлечение данных, PDF за секунды.',
    ctaPrimary: 'Начать бесплатно (бета)',
    ctaSecondary: 'Посмотреть приложение',
    badgeNote: 'Без карты · Бесплатно в бете',
    heroBullets: [
      'Поддержка 10 языков',
      'Работает на мобильных и десктопах',
      'Данные хранятся в ЕС',
      'Автоматическое создание PDF',
      'OCR-импорт',
      'Безлимитный Pro (бета)',
    ],
    previewTitle: 'Превью панели',
    previewNote: 'Реальный интерфейс нашей внутренней беты — оптимизирован под локальный бизнес.',
    featuresTag: 'Все для старта',
    featuresTitle: 'Функции для скорости и простоты',
    featuresSub: 'Сильная автоматизация в дружелюбном интерфейсе.',
    featuresAudience: 'Для кафе, пекарен, клинеров, мастеров, барберов, репетиторов и др.',
    featureCards: [
      { icon: <FileText />, title: 'Авто-PDF', description: 'Проф. счета одним кликом.' },
      { icon: <ShieldCheck />, title: 'Безопасный OCR', description: 'Мгновенно считывает позиции с чеков.' },
      { icon: <BarChart3 />, title: 'Инсайты панели', description: 'Отслеживайте счета и расходы.' },
      { icon: <Sparkles />, title: 'Бета-апгрейды', description: 'Безлимитный Pro в бете.' },
    ],
    workflowTag: 'Как это работает',
    workflowTitle: 'Легкий процесс для занятых',
    workflowSub: 'От загрузки до готового PDF за минуту.',
    workflowSteps: [
      'Загрузите счет или чек',
      'Проверьте распознанные позиции',
      'Скачайте готовый PDF',
    ],
    workflowStepDesc: [
      'Перетащите файл или отправьте на почту.',
      'Быстро правьте; суммы синхронизированы.',
      'Шаблоны Basic, Advanced или Elite с вашим брендом.',
    ],
    betaCtaTag: 'Готовы начать?',
    betaCtaTitle: 'Присоединяйтесь к бете и помогайте развивать InvoiceEasy.',
    betaCtaButton: 'Создать бесплатный бета-аккаунт',
    betaCtaNote: 'Уже с нами? Используйте ссылку Login в шапке.',
    nav: { features: 'Функции', workflow: 'Процесс', beta: 'Бета-инфо', login: 'Войти', register: 'Регистрация' },
    betaNotice: [
      'InvoiceEasy работает в некоммерческой бете. Нет платных планов и контрактов — только тесты и обратная связь, чтобы сделать лучший инструмент для локального бизнеса.',
      'PDF в этой фазе для внутренних тестов и требуют проверки перед отправкой клиентам.',
    ],
  },
  es: {
    heroTag: 'Acceso beta · Gratis durante las pruebas',
    heroTitle: 'Facturación y gastos simples',
    heroAccent: 'para negocios locales',
    heroSub1: 'Crea facturas y guarda recibos en menos de 30 segundos, desde móvil o portátil.',
    heroSub2:
      'Para cafeterías, panaderías, técnicos, limpiadores, barberos — quien necesite papeleo rápido y limpio. Toma una foto, extrae datos automáticamente y genera PDF en segundos.',
    ctaPrimary: 'Empieza gratis (beta)',
    ctaSecondary: 'Ver la app',
    badgeNote: 'Sin tarjeta · Gratis en beta',
    heroBullets: [
      '10 idiomas soportados',
      'Funciona en móvil y escritorio',
      'Tus datos en la UE',
      'Creación automática de PDF',
      'Importaciones OCR',
      'Pro ilimitado (beta)',
    ],
    previewTitle: 'Vista previa del panel',
    previewNote: 'Vista real de nuestra beta interna — optimizada para flujos locales.',
    featuresTag: 'Todo para empezar',
    featuresTitle: 'Funciones para rapidez y sencillez',
    featuresSub: 'Automatización potente en una interfaz amigable.',
    featuresAudience: 'Para cafés, panaderías, limpiadores, técnicos, barberos, tutores y más.',
    featureCards: [
      { icon: <FileText />, title: 'PDF automáticos', description: 'Facturas profesionales en un clic.' },
      { icon: <ShieldCheck />, title: 'OCR seguro', description: 'Extrae ítems de recibos al instante.' },
      { icon: <BarChart3 />, title: 'Insights del panel', description: 'Controla facturación y gastos.' },
      { icon: <Sparkles />, title: 'Mejoras beta', description: 'Pro ilimitado durante la beta.' },
    ],
    workflowTag: 'Míralo en acción',
    workflowTitle: 'Flujo ligero para fundadores ocupados',
    workflowSub: 'De la subida al PDF final en menos de un minuto.',
    workflowSteps: [
      'Sube factura o recibo',
      'Revisa los ítems extraídos',
      'Descarga el PDF pulido',
    ],
    workflowStepDesc: [
      'Arrastra o envía por email a la bandeja.',
      'Edita rápido; cantidades y totales se mantienen.',
      'Usa plantillas Basic, Advanced o Elite con tu marca.',
    ],
    betaCtaTag: '¿Listo para empezar?',
    betaCtaTitle: 'Únete a la beta y ayuda a construir InvoiceEasy.',
    betaCtaButton: 'Crear cuenta beta gratis',
    betaCtaNote: '¿Ya eres usuario? Usa el enlace Login en el header.',
    nav: { features: 'Funciones', workflow: 'Flujo', beta: 'Aviso beta', login: 'Login', register: 'Crear cuenta gratis' },
    betaNotice: [
      'InvoiceEasy está en beta no comercial. Sin planes de pago ni contratos — solo pruebas y feedback para crear la herramienta correcta para negocios locales.',
      'Los PDF son para pruebas internas y deben revisarse antes de enviarlos a clientes.',
    ],
  },
  tr: {
    heroTag: 'Beta erişimi · Test süresince ücretsiz',
    heroTitle: 'Kolay fatura ve gider takibi',
    heroAccent: 'yerel işletmeler için',
    heroSub1: 'Faturaları ve fişleri 30 saniyeden kısa sürede kaydedin — telefondan veya laptop’tan.',
    heroSub2:
      'Kafeler, fırınlar, ustalar, temizlik, berberler — hızlı ve temiz evrak isteyen herkes için. Foto çek, verileri otomatik çıkar, saniyeler içinde PDF üret.',
    ctaPrimary: 'Ücretsiz başla (beta)',
    ctaSecondary: 'Uygulamayı gör',
    badgeNote: 'Kart yok · Beta boyunca ücretsiz',
    heroBullets: [
      '10 dil desteği',
      'Mobil ve masaüstünde çalışır',
      'Verilerin AB’de saklanır',
      'Otomatik PDF oluşturma',
      'OCR içe aktarma',
      'Sınırsız Pro (beta)',
    ],
    previewTitle: 'Panel önizlemesi',
    previewNote: 'İç beta arayüzümüzden gerçek görüntü — yerel iş akışları için optimize.',
    featuresTag: 'Başlamak için her şey',
    featuresTitle: 'Hız ve sadelik için tasarlandı',
    featuresSub: 'Güçlü otomasyon, dostane arayüz.',
    featuresAudience: 'Kafe, fırın, temizlik, ustalar, berberler, eğitmenler ve daha fazlası.',
    featureCards: [
      { icon: <FileText />, title: 'Otomatik PDF', description: 'Tek tıkla profesyonel faturalar.' },
      { icon: <ShieldCheck />, title: 'Güvenli OCR', description: 'Fiş satırlarını anında çıkarır.' },
      { icon: <BarChart3 />, title: 'Panel içgörüleri', description: 'Fatura ve giderleri takip edin.' },
      { icon: <Sparkles />, title: 'Beta yükseltmeleri', description: 'Beta süresince sınırsız Pro.' },
    ],
    workflowTag: 'Nasıl çalışır',
    workflowTitle: 'Yoğun kurucular için hafif akış',
    workflowSub: 'Yüklemeden son PDF’e bir dakikanın altında.',
    workflowSteps: [
      'Fatura veya fiş yükle',
      'Çıkarılan satırları kontrol et',
      'Düzenli PDF indir',
    ],
    workflowStepDesc: [
      'Sürükle-bırak veya e-posta ile gelen kutusuna gönder.',
      'Hızlı düzelt; adet ve toplamlar senkron kalır.',
      'Basic, Advanced veya Elite şablonları markanla kullan.',
    ],
    betaCtaTag: 'Hazır mısın?',
    betaCtaTitle: 'Betaya katıl ve InvoiceEasy’yi birlikte şekillendirelim.',
    betaCtaButton: 'Ücretsiz beta hesabı oluştur',
    betaCtaNote: 'Zaten kullanıyor musun? Üstteki Login bağlantısını kullan.',
    nav: { features: 'Özellikler', workflow: 'Akış', beta: 'Beta notu', login: 'Giriş', register: 'Ücretsiz kayıt' },
    betaNotice: [
      'InvoiceEasy ticari olmayan beta aşamasında. Ücretli plan yok, sözleşme yok — yerel işletmeler için doğru aracı yapmak üzere test ve geri bildirim topluyoruz.',
      'PDF’ler bu aşamada iç test içindir; müşterilere göndermeden önce kontrol edin.',
    ],
  },
  ar: {
    heroTag: 'وصول تجريبي · مجاني أثناء الاختبار',
    heroTitle: 'فواتير ونفقات بسيطة',
    heroAccent: 'للأعمال المحلية',
    heroSub1: 'أنشئ الفواتير واحفظ الإيصالات في أقل من 30 ثانية — من الهاتف أو الحاسوب.',
    heroSub2:
      'مثالي للمقاهي، المخابز، الحرفيين، شركات التنظيف، صالونات الحلاقة — لكل من يريد إنهاء الأوراق بسرعة وبسلاسة. التقط صورة، استخرج البيانات تلقائياً، واحصل على PDF في ثوانٍ.',
    ctaPrimary: 'ابدأ مجاناً (بيتا)',
    ctaSecondary: 'شاهد التطبيق',
    badgeNote: 'لا حاجة لبطاقة · مجاني في البيتا',
    heroBullets: [
      'يدعم 10 لغات',
      'يعمل على الجوال والكمبيوتر',
      'بياناتك مخزنة في الاتحاد الأوروبي',
      'إنشاء PDF تلقائي',
      'استيراد OCR',
      'Pro غير محدود (بيتا)',
    ],
    previewTitle: 'عرض للوحة التحكم',
    previewNote: 'معاينة حقيقية من الإصدار الداخلي التجريبي — محسّنة لعمليات الأعمال المحلية.',
    featuresTag: 'كل ما تحتاجه للبدء',
    featuresTitle: 'ميزات للسرعة والبساطة',
    featuresSub: 'أتمتة قوية بواجهة ودودة.',
    featuresAudience: 'للمقاهي، المخابز، التنظيف، الحرفيين، الحلاقين، المدرسين وغيرهم.',
    featureCards: [
      { icon: <FileText />, title: 'PDF تلقائي', description: 'فواتير احترافية بنقرة واحدة.' },
      { icon: <ShieldCheck />, title: 'OCR آمن', description: 'يستخرج عناصر الإيصال فوراً.' },
      { icon: <BarChart3 />, title: 'رؤى لوحة التحكم', description: 'تتبع الفواتير والمصروفات.' },
      { icon: <Sparkles />, title: 'ترقيات بيتا', description: 'Pro غير محدود أثناء البيتا.' },
    ],
    workflowTag: 'شاهدها عملياً',
    workflowTitle: 'تدفق خفيف للمؤسسين المشغولين',
    workflowSub: 'من الرفع إلى PDF جاهز في أقل من دقيقة.',
    workflowSteps: [
      'ارفع فاتورة أو إيصال',
      'راجع العناصر المستخرجة',
      'حمّل PDF مصقولاً',
    ],
    workflowStepDesc: [
      'اسحب وأفلت أو أرسل بالبريد إلى صندوق الوارد.',
      'عدّل بسرعة؛ الكميات والمجاميع تبقى متزامنة.',
      'استخدم قوالب Basic أو Advanced أو Elite بعلامتك.',
    ],
    betaCtaTag: 'جاهز للبدء؟',
    betaCtaTitle: 'انضم إلى البيتا وساعد في تطوير InvoiceEasy.',
    betaCtaButton: 'أنشئ حساب بيتا مجاني',
    betaCtaNote: 'تستخدمه بالفعل؟ استخدم رابط تسجيل الدخول في الأعلى.',
    nav: { features: 'الميزات', workflow: 'التدفق', beta: 'ملاحظة بيتا', login: 'تسجيل الدخول', register: 'إنشاء حساب مجاني' },
    betaNotice: [
      'InvoiceEasy في مرحلة تجريبية غير تجارية. لا خطط مدفوعة ولا عقود — فقط اختبار وملاحظات لبناء الأداة المناسبة للأعمال المحلية.',
      'ملفات PDF للاختبار الداخلي حالياً ويجب مراجعتها قبل إرسالها للعملاء.',
    ],
  },
  zh: {
    heroTag: 'Beta 访问 · 测试期免费',
    heroTitle: '简单的开票与费用管理',
    heroAccent: '为本地商户打造',
    heroSub1: '30 秒内创建发票并保存收据 — 适用于手机和电脑。',
    heroSub2:
      '适合咖啡馆、面包店、手艺人、清洁、理发等需要快速处理文档的团队。拍照、自动提取数据、几秒生成 PDF。',
    ctaPrimary: '免费开始 (Beta)',
    ctaSecondary: '查看应用',
    badgeNote: '无需信用卡 · Beta 期免费',
    heroBullets: [
      '支持 10 种语言',
      '移动端与桌面端可用',
      '数据存储在欧盟',
      '自动生成 PDF',
      'OCR 导入',
      '无限制 Pro（Beta）',
    ],
    previewTitle: '仪表盘预览',
    previewNote: '来自内部测试版的真实界面 — 为本地业务优化。',
    featuresTag: '开启所需的一切',
    featuresTitle: '为速度与简洁而生',
    featuresSub: '强大自动化，友好界面。',
    featuresAudience: '适用于咖啡馆、面包店、清洁、手艺人、理发师、教师等。',
    featureCards: [
      { icon: <FileText />, title: '自动 PDF', description: '一键生成专业发票。' },
      { icon: <ShieldCheck />, title: '安全 OCR', description: '即时读取收据条目。' },
      { icon: <BarChart3 />, title: '仪表盘洞察', description: '跟踪发票和支出。' },
      { icon: <Sparkles />, title: 'Beta 升级', description: 'Beta 期间无限 Pro。' },
    ],
    workflowTag: '实际演示',
    workflowTitle: '为忙碌的创始人准备的轻量流程',
    workflowSub: '从上传到完成 PDF 不到一分钟。',
    workflowSteps: [
      '上传发票或收据',
      '检查提取的条目',
      '下载精修 PDF',
    ],
    workflowStepDesc: [
      '拖拽上传或邮件发送到收件箱。',
      '快速编辑；数量与总额保持同步。',
      '使用 Basic/Advanced/Elite 模板并添加你的品牌。',
    ],
    betaCtaTag: '准备开始？',
    betaCtaTitle: '加入测试版，共同完善 InvoiceEasy。',
    betaCtaButton: '创建免费的 Beta 账户',
    betaCtaNote: '已在使用？请在顶部使用登录链接。',
    nav: { features: '功能', workflow: '流程', beta: '测试说明', login: '登录', register: '创建免费账户' },
    betaNotice: [
      'InvoiceEasy 处于非商业测试阶段。没有付费计划或合同 — 我们通过测试和反馈为本地商户打造合适工具。',
      '当前 PDF 仅用于内部测试，发送给客户前请先检查。',
    ],
  },
  ko: {
    heroTag: '베타 접근 · 테스트 기간 무료',
    heroTitle: '간단한 인보이스와 지출 관리',
    heroAccent: '로컬 비즈니스를 위해',
    heroSub1: '30초 안에 인보이스와 영수증을 저장하세요 — 모바일과 데스크톱 모두 지원.',
    heroSub2:
      '카페, 베이커리, 수리, 청소, 바버 등 빠르고 깔끔한 서류 작업이 필요한 팀을 위해. 사진 찍고, 자동 추출하고, 몇 초 만에 PDF 생성.',
    ctaPrimary: '무료 시작 (베타)',
    ctaSecondary: '앱 보기',
    badgeNote: '카드 불필요 · 베타 기간 무료',
    heroBullets: [
      '10개 언어 지원',
      '모바일·데스크톱 사용 가능',
      '데이터는 EU에 저장',
      '자동 PDF 생성',
      'OCR 가져오기',
      '무제한 Pro (베타)',
    ],
    previewTitle: '대시보드 미리보기',
    previewNote: '내부 베타의 실제 화면 — 로컬 워크플로에 최적화.',
    featuresTag: '시작을 위한 모든 것',
    featuresTitle: '속도와 단순함을 위한 기능',
    featuresSub: '강력한 자동화, 친근한 인터페이스.',
    featuresAudience: '카페, 베이커리, 청소, 수리, 바버, 튜터 등 다양한 업종에.',
    featureCards: [
      { icon: <FileText />, title: '자동 PDF', description: '한 번에 전문 인보이스 생성.' },
      { icon: <ShieldCheck />, title: '안전한 OCR', description: '영수증 항목을 즉시 추출.' },
      { icon: <BarChart3 />, title: '대시보드 인사이트', description: '인보이스와 지출을 추적.' },
      { icon: <Sparkles />, title: '베타 업그레이드', description: '베타 동안 무제한 Pro.' },
    ],
    workflowTag: '실제로 보기',
    workflowTitle: '바쁜 창업자를 위한 가벼운 흐름',
    workflowSub: '업로드부터 완성된 PDF까지 1분 미만.',
    workflowSteps: [
      '인보이스 또는 영수증 업로드',
      '추출된 항목 검토',
      '다듬어진 PDF 다운로드',
    ],
    workflowStepDesc: [
      '드래그앤드롭 또는 이메일로 보내기.',
      '빠르게 수정; 수량과 합계는 동기화.',
      'Basic/Advanced/Elite 템플릿을 브랜드와 함께 사용.',
    ],
    betaCtaTag: '시작할까요?',
    betaCtaTitle: '베타에 참여해 InvoiceEasy를 함께 만드세요.',
    betaCtaButton: '무료 베타 계정 만들기',
    betaCtaNote: '이미 사용 중인가요? 상단 로그인 링크를 이용하세요.',
    nav: { features: '기능', workflow: '흐름', beta: '베타 안내', login: '로그인', register: '무료 가입' },
    betaNotice: [
      'InvoiceEasy는 비상업적 베타 단계입니다. 유료 플랜이나 계약이 없으며, 테스트와 피드백을 통해 로컬 비즈니스를 위한 도구를 만듭니다.',
      'PDF는 현재 내부 테스트용이며 고객에게 보내기 전에 확인하세요.',
    ],
  },
  ja: {
    heroTag: 'ベータアクセス・テスト期間は無料',
    heroTitle: 'シンプルな請求と経費管理',
    heroAccent: 'ローカルビジネス向け',
    heroSub1: '30秒以内に請求書とレシートを保存 — スマホでもPCでも。',
    heroSub2:
      'カフェ、ベーカリー、職人、クリーニング、バーバーなど、素早くきれいに事務処理したい方へ。写真を撮り、データを自動抽出し、数秒でPDFを生成。',
    ctaPrimary: '無料で始める (ベータ)',
    ctaSecondary: 'アプリを見る',
    badgeNote: 'カード不要・ベータ期間無料',
    heroBullets: [
      '10言語に対応',
      'モバイルとデスクトップで利用可能',
      'データはEUに保存',
      '自動PDF作成',
      'OCR取り込み',
      '無制限Pro (ベータ)',
    ],
    previewTitle: 'ダッシュボードプレビュー',
    previewNote: '社内ベータの実際の画面 — ローカル業務向けに最適化。',
    featuresTag: '開始に必要なすべて',
    featuresTitle: 'スピードとシンプルさのための機能',
    featuresSub: '強力な自動化を親しみやすいUIで。',
    featuresAudience: 'カフェ、ベーカリー、クリーニング、職人、バーバー、講師などに。',
    featureCards: [
      { icon: <FileText />, title: '自動PDF', description: 'ワンクリックでプロの請求書。' },
      { icon: <ShieldCheck />, title: '安全なOCR', description: 'レシート項目を即座に抽出。' },
      { icon: <BarChart3 />, title: 'ダッシュボード分析', description: '請求と経費を可視化。' },
      { icon: <Sparkles />, title: 'ベータ特典', description: 'ベータ期間中はProが無制限。' },
    ],
    workflowTag: '実際の流れ',
    workflowTitle: '忙しい創業者のための軽量フロー',
    workflowSub: 'アップロードから完成PDFまで1分以内。',
    workflowSteps: [
      '請求書またはレシートをアップロード',
      '抽出された項目を確認',
      '整えたPDFをダウンロード',
    ],
    workflowStepDesc: [
      'ドラッグ＆ドロップまたはメールで受信箱へ。',
      '素早く編集；数量と合計は同期。',
      'Basic/Advanced/Eliteテンプレをブランド付きで使用。',
    ],
    betaCtaTag: 'さあ始めましょう',
    betaCtaTitle: 'ベータに参加してInvoiceEasyを一緒に作りましょう。',
    betaCtaButton: '無料ベータアカウントを作成',
    betaCtaNote: 'すでに利用中ですか？ヘッダーのログインリンクをどうぞ。',
    nav: { features: '機能', workflow: 'フロー', beta: 'ベータ案内', login: 'ログイン', register: '無料登録' },
    betaNotice: [
      'InvoiceEasyは非商用のベータ段階です。料金プランや契約はなく、テストとフィードバックでローカルビジネス向けツールを磨いています。',
      'PDFは現時点では内部テスト用です。顧客に送る前にご確認ください。',
    ],
  },
} as const;

const LandingPage: React.FC = () => {
  const { language } = useLanguage();
  const c = copy[language as keyof typeof copy] ?? copy.en;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-900">
      <header className="sticky top-0 z-20 bg-[#FAF7F2]/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-semibold text-primary">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 via-orange-400 to-yellow-300 text-white shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="text-left">
              <span className="leading-none text-primary">InvoiceEasy</span>
              <p className="text-xs text-muted-foreground font-normal">Smart receipts &amp; billing</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="hover:text-primary">{c.nav.features}</a>
            <a href="#workflow" className="hover:text-primary">{c.nav.workflow}</a>
            <a href="#beta" className="hover:text-primary">{c.nav.beta}</a>
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <Link to="/login" className="text-sm font-medium text-primary hover:text-primary/80">
              {c.nav.login}
            </Link>
            <Link
              to="/register"
              className="text-sm font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90"
            >
              {c.nav.register}
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-16 space-y-24">
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
              {c.heroTag}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {c.heroTitle}
              <span className="block text-primary">{c.heroAccent}</span>
            </h1>
            <p className="text-lg text-slate-600">
              {c.heroSub1}
            </p>
            <p className="text-lg text-slate-600">
              {c.heroSub2}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                {c.ctaPrimary}
              </Link>
              <a
                href="#workflow"
                className="px-6 py-3 rounded-full border border-primary text-primary font-semibold hover:bg-primary/5"
              >
                {c.ctaSecondary}
              </a>
            </div>
            <p className="text-xs text-slate-500">{c.badgeNote}</p>
            <div className="grid sm:grid-cols-2 gap-3 pt-4">
              {c.heroBullets.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-primary/15 bg-white/50 px-4 py-3 shadow-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl shadow-xl p-6 lg:p-8 space-y-4">
            <div className="font-medium text-slate-700 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              {c.previewTitle}
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 flex justify-center">
              <img
                src="/images/dashboard-preview.png"
                alt="InvoiceEasy dashboard preview"
                className="w-full max-w-none h-auto object-cover scale-[1.1] md:scale-[1.02] lg:scale-[0.98] transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <p className="text-xs text-slate-500 text-center">
              {c.previewNote}
            </p>
          </div>
        </section>

      <section id="features" className="space-y-8">
        <div className="text-center space-y-3">
          <p className="text-sm font-semibold text-primary">{c.featuresTag}</p>
          <h2 className="text-3xl font-bold">{c.featuresTitle}</h2>
          <p className="text-slate-600">{c.featuresSub}</p>
          <p className="text-sm text-slate-500">{c.featuresAudience}</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {c.featureCards.map((feature) => (
            <div key={feature.title} className="card-warm h-full space-y-4 text-center">
              <div className="mx-auto h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="text-sm text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="space-y-8">
        <div className="text-center space-y-3">
          <p className="text-sm font-semibold text-primary">{c.workflowTag}</p>
          <h2 className="text-3xl font-bold">{c.workflowTitle}</h2>
          <p className="text-slate-600">{c.workflowSub}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {c.workflowSteps.map((step, index) => (
            <div key={step} className="rounded-3xl border border-slate-200 bg-white p-6 space-y-4 text-center">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                {index + 1}
              </span>
              <p className="font-semibold">{step}</p>
              <p className="text-sm text-slate-600">
                {c.workflowStepDesc[index]}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="beta" className="rounded-3xl border border-amber-200 bg-amber-50/70 p-8 space-y-4">
        <div className="flex items-center gap-3 text-amber-700 font-semibold text-lg">
          <ShieldCheck className="h-6 w-6" />
          {c.nav.beta}
        </div>
        {c.betaNotice.map((note) => (
          <p key={note} className="text-sm text-amber-800">
            {note}
          </p>
        ))}
      </section>

      <section className="text-center space-y-4">
        <p className="text-sm text-primary font-semibold">{c.betaCtaTag}</p>
        <h2 className="text-3xl font-bold">{c.betaCtaTitle}</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/register"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90"
          >
            {c.betaCtaButton}
          </Link>
        </div>
        <p className="text-xs text-slate-500">{c.betaCtaNote}</p>
      </section>
    </main>
    <Footer />
  </div>
  );
};

export default LandingPage;
