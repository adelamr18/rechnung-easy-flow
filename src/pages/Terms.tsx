import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const content = {
  de: {
    title: 'Terms & Conditions (Beta – Testphase)',
    intro1:
      'Diese Anwendung befindet sich in einem nicht-kommerziellen Testbetrieb. Es werden keine kostenpflichtigen Dienste, keine Abonnements und keine rechtlich verbindlichen Verträge angeboten.',
    intro2:
      'Nach der Geschäftsregistrierung und dem Start kommerzieller Funktionen werden vollständige AGB bereitgestellt.',
    responsible: 'Verantwortlich:',
    emailLabel: 'E-Mail',
  },
  en: {
    title: 'Terms & Conditions (Beta – Test phase)',
    intro1:
      'This application runs as a non-commercial beta. No paid services, subscriptions, or legally binding contracts are offered.',
    intro2:
      'Full terms will be published after business registration and the launch of commercial features.',
    responsible: 'Responsible:',
    emailLabel: 'Email',
  },
  pl: {
    title: 'Regulamin (Beta – faza testów)',
    intro1:
      'Aplikacja działa w trybie beta i niekomercyjnym. Brak płatnych usług, subskrypcji oraz prawnie wiążących umów.',
    intro2:
      'Pełny regulamin zostanie udostępniony po rejestracji działalności i uruchomieniu funkcji komercyjnych.',
    responsible: 'Odpowiedzialny:',
    emailLabel: 'E-mail',
  },
  ru: {
    title: 'Правила и условия (Бета – тестовая фаза)',
    intro1:
      'Приложение в некоммерческом тесте. Нет платных сервисов, подписок или юридически обязательных договоров.',
    intro2:
      'После регистрации бизнеса и запуска коммерческих функций будут опубликованы полные условия.',
    responsible: 'Ответственный:',
    emailLabel: 'E-mail',
  },
  es: {
    title: 'Términos y condiciones (Beta – fase de prueba)',
    intro1:
      'La aplicación está en prueba no comercial. No hay servicios de pago, suscripciones ni contratos legalmente vinculantes.',
    intro2:
      'Tras el registro comercial y el lanzamiento de funciones de pago, se publicarán los términos completos.',
    responsible: 'Responsable:',
    emailLabel: 'E-mail',
  },
  tr: {
    title: 'Şartlar ve Koşullar (Beta – Test aşaması)',
    intro1:
      'Uygulama ticari olmayan testtedir. Ücretli hizmet, abonelik veya yasal bağlayıcı sözleşme yoktur.',
    intro2:
      'Şirket kaydı ve ticari özellikler açıldığında tam Şartlar yayınlanacaktır.',
    responsible: 'Sorumlu:',
    emailLabel: 'E-posta',
  },
  ar: {
    title: 'الشروط والأحكام (بيتا – مرحلة الاختبار)',
    intro1:
      'التطبيق في اختبار غير تجاري. لا توجد خدمات مدفوعة أو اشتراكات أو عقود ملزمة قانونياً.',
    intro2:
      'بعد التسجيل التجاري وإطلاق الميزات التجارية سيتم نشر الشروط الكاملة.',
    responsible: 'المسؤول:',
    emailLabel: 'البريد الإلكتروني',
  },
  zh: {
    title: '条款与条件（Beta – 测试阶段）',
    intro1:
      '本应用处于非商业测试。无付费服务、订阅或具法律约束力的合同。',
    intro2:
      '在商业注册并上线付费功能后，将提供完整条款。',
    responsible: '负责人：',
    emailLabel: '电子邮件',
  },
  ko: {
    title: '약관 (베타 – 테스트 단계)',
    intro1:
      '본 앱은 비상업적 테스트 중입니다. 유료 서비스, 구독, 법적 구속력이 있는 계약이 없습니다.',
    intro2:
      '사업 등록 및 상업 기능 출시 후 전체 약관이 제공됩니다.',
    responsible: '책임자:',
    emailLabel: '이메일',
  },
  ja: {
    title: '利用規約（ベータ・テスト段階）',
    intro1:
      '本アプリは非商用のテスト運用です。有料サービス、サブスクリプション、法的拘束力のある契約はありません。',
    intro2:
      '事業登録と商用機能の開始後、完全な規約を公開します。',
    responsible: '責任者:',
    emailLabel: 'Eメール',
  },
} as const;

const Terms: React.FC = () => {
  const { language } = useLanguage();
  const c = content[language as keyof typeof content] ?? content.en;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 text-sm leading-relaxed space-y-4">
      <h1 className="text-2xl font-semibold">{c.title}</h1>
      <p>{c.intro1}</p>
      <p>{c.intro2}</p>
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
    </main>
  );
};

export default Terms;
