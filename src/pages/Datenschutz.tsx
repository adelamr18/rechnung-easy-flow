import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const content = {
  de: {
    title: 'Datenschutzerklärung (Beta – Nicht-kommerzieller Testbetrieb)',
    responsible: '1. Verantwortlicher',
    purpose: '2. Zweck der Datenverarbeitung',
    purposeDesc:
      'Nur technisch notwendige Daten werden verarbeitet (Login, Spracheinstellungen, Testuploads, Fehlerlogs).',
    noShare: 'Keine Weitergabe an Dritte.',
    commercial: '3. Keine kommerzielle Nutzung',
    commercialDesc: 'Keine kostenpflichtigen Dienste, kein Tracking zu Marketingzwecken.',
    retention: '4. Speicherdauer',
    retentionDesc: 'Daten können jederzeit auf Anfrage gelöscht werden.',
    rights: '5. Nutzerrechte',
    rightsDesc:
      'Auskunft, Löschung, Berichtigung – Anfrage per E-Mail an support@invoiceeasy.org',
    emailLabel: 'E-Mail',
  },
  en: {
    title: 'Privacy Notice (Beta – Non-commercial test environment)',
    responsible: '1. Controller',
    purpose: '2. Purpose of processing',
    purposeDesc:
      'Only technically necessary data is processed (login, language settings, test uploads, error logs).',
    noShare: 'No sharing with third parties.',
    commercial: '3. No commercial use',
    commercialDesc: 'No paid services; no marketing tracking.',
    retention: '4. Data retention',
    retentionDesc: 'Data can be deleted at any time upon request.',
    rights: '5. User rights',
    rightsDesc: 'Access, deletion, rectification — request via email to support@invoiceeasy.org',
    emailLabel: 'Email',
  },
  pl: {
    title: 'Polityka prywatności (Beta – test niekomercyjny)',
    responsible: '1. Administrator',
    purpose: '2. Cel przetwarzania',
    purposeDesc:
      'Przetwarzane są tylko dane technicznie niezbędne (logowanie, język, testowe uploady, logi błędów).',
    noShare: 'Brak udostępniania podmiotom trzecim.',
    commercial: '3. Brak komercyjnego wykorzystania',
    commercialDesc: 'Brak płatnych usług i śledzenia marketingowego.',
    retention: '4. Okres przechowywania',
    retentionDesc: 'Dane mogą być usunięte na żądanie w dowolnym momencie.',
    rights: '5. Prawa użytkownika',
    rightsDesc:
      'Dostęp, usunięcie, sprostowanie — zgłoszenie e-mailem na support@invoiceeasy.org',
    emailLabel: 'E-mail',
  },
  ru: {
    title: 'Политика конфиденциальности (Бета — некоммерческий тест)',
    responsible: '1. Ответственный',
    purpose: '2. Цель обработки',
    purposeDesc:
      'Обрабатываются только технически необходимые данные (логин, язык, тестовые загрузки, логи ошибок).',
    noShare: 'Нет передачи третьим лицам.',
    commercial: '3. Нет коммерческого использования',
    commercialDesc: 'Нет платных сервисов и маркетингового трекинга.',
    retention: '4. Срок хранения',
    retentionDesc: 'Данные можно удалить по запросу в любое время.',
    rights: '5. Права пользователя',
    rightsDesc: 'Доступ, удаление, исправление — запрос по email support@invoiceeasy.org',
    emailLabel: 'E-mail',
  },
  es: {
    title: 'Política de privacidad (Beta – Prueba no comercial)',
    responsible: '1. Responsable',
    purpose: '2. Finalidad del tratamiento',
    purposeDesc:
      'Solo se procesan datos técnicamente necesarios (login, idioma, cargas de prueba, registros de errores).',
    noShare: 'Sin cesión a terceros.',
    commercial: '3. Sin uso comercial',
    commercialDesc: 'Sin servicios de pago ni tracking de marketing.',
    retention: '4. Plazo de conservación',
    retentionDesc: 'Los datos pueden eliminarse en cualquier momento bajo solicitud.',
    rights: '5. Derechos del usuario',
    rightsDesc: 'Acceso, eliminación, rectificación — por email a support@invoiceeasy.org',
    emailLabel: 'E-mail',
  },
  tr: {
    title: 'Gizlilik bildirimi (Beta – Ticari olmayan test)',
    responsible: '1. Sorumlu',
    purpose: '2. İşleme amacı',
    purposeDesc:
      'Sadece teknik olarak gerekli veriler işlenir (giriş, dil ayarı, test yüklemeleri, hata logları).',
    noShare: 'Üçüncülere aktarım yok.',
    commercial: '3. Ticari kullanım yok',
    commercialDesc: 'Ücretli hizmet yok, pazarlama takibi yok.',
    retention: '4. Saklama süresi',
    retentionDesc: 'Veriler talep edildiğinde her zaman silinebilir.',
    rights: '5. Kullanıcı hakları',
    rightsDesc: 'Erişim, silme, düzeltme — support@invoiceeasy.org adresine e-posta ile.',
    emailLabel: 'E-posta',
  },
  ar: {
    title: 'بيان الخصوصية (بيتا – اختبار غير تجاري)',
    responsible: '1. المسؤول',
    purpose: '2. غرض المعالجة',
    purposeDesc:
      'يتم معالجة البيانات الضرورية فقط (تسجيل الدخول، اللغة، التحميلات التجريبية، سجلات الأخطاء).',
    noShare: 'لا مشاركة مع أطراف ثالثة.',
    commercial: '3. لا استخدام تجاري',
    commercialDesc: 'لا خدمات مدفوعة ولا تتبع تسويقي.',
    retention: '4. مدة التخزين',
    retentionDesc: 'يمكن حذف البيانات في أي وقت عند الطلب.',
    rights: '5. حقوق المستخدم',
    rightsDesc: 'وصول، حذف، تصحيح — عبر البريد support@invoiceeasy.org',
    emailLabel: 'البريد الإلكتروني',
  },
  zh: {
    title: '隐私声明（Beta – 非商业测试）',
    responsible: '1. 负责人',
    purpose: '2. 处理目的',
    purposeDesc:
      '仅处理技术必需的数据（登录、语言设置、测试上传、错误日志）。',
    noShare: '不与第三方共享。',
    commercial: '3. 无商业用途',
    commercialDesc: '无付费服务，无营销跟踪。',
    retention: '4. 存储期限',
    retentionDesc: '可随时应请求删除数据。',
    rights: '5. 用户权利',
    rightsDesc: '访问、删除、更正 — 发送邮件至 support@invoiceeasy.org',
    emailLabel: '电子邮件',
  },
  ko: {
    title: '개인정보 보호 고지 (베타 – 비상업적 테스트)',
    responsible: '1. 책임자',
    purpose: '2. 처리 목적',
    purposeDesc:
      '로그인, 언어 설정, 테스트 업로드, 오류 로그 등 기술적으로 필요한 데이터만 처리합니다.',
    noShare: '제3자 제공 없음.',
    commercial: '3. 상업적 이용 없음',
    commercialDesc: '유료 서비스나 마케팅 추적 없음.',
    retention: '4. 보관 기간',
    retentionDesc: '요청 시 언제든지 데이터 삭제 가능.',
    rights: '5. 이용자 권리',
    rightsDesc: '열람, 삭제, 정정 — support@invoiceeasy.org로 이메일 문의',
    emailLabel: '이메일',
  },
  ja: {
    title: 'プライバシー告知（ベータ・非商用テスト）',
    responsible: '1. 管理者',
    purpose: '2. 処理目的',
    purposeDesc:
      'ログイン、言語設定、テストアップロード、エラーログなど技術的に必要なデータのみを処理します。',
    noShare: '第三者提供はありません。',
    commercial: '3. 商用利用なし',
    commercialDesc: '有料サービスやマーケティング追跡はありません。',
    retention: '4. 保存期間',
    retentionDesc: 'データは要請によりいつでも削除可能です。',
    rights: '5. 利用者の権利',
    rightsDesc: '開示、削除、訂正 — support@invoiceeasy.org へメールでご連絡ください',
    emailLabel: 'Eメール',
  },
} as const;

const Datenschutz: React.FC = () => {
  const { language } = useLanguage();
  const c = content[language as keyof typeof content] ?? content.en;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 text-sm leading-relaxed space-y-4">
      <h1 className="text-2xl font-semibold">{c.title}</h1>

      <section>
        <p className="font-semibold">{c.responsible}</p>
        <p>
          InvoiceEasy – Beta Version
          <br />
          {c.emailLabel}:{' '}
          <a href="mailto:support@invoiceeasy.org" className="underline">
            support@invoiceeasy.org
          </a>
        </p>
      </section>

      <section>
        <p className="font-semibold">{c.purpose}</p>
        <p>{c.purposeDesc}</p>
        <p>{c.noShare}</p>
      </section>

      <section>
        <p className="font-semibold">{c.commercial}</p>
        <p>{c.commercialDesc}</p>
      </section>

      <section>
        <p className="font-semibold">{c.retention}</p>
        <p>{c.retentionDesc}</p>
      </section>

      <section>
        <p className="font-semibold">{c.rights}</p>
        <p>
          {c.rightsDesc}{' '}
          <a href="mailto:support@invoiceeasy.org" className="underline">
            support@invoiceeasy.org
          </a>
        </p>
      </section>
    </main>
  );
};

export default Datenschutz;
