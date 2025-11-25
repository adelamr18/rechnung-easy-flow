import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const content = {
  de: {
    title: 'Impressum (Beta – Nicht-kommerzieller Testbetrieb)',
    responsibleTitle: 'Verantwortlich für diese Testplattform:',
    responsibleBody: 'InvoiceEasy – Beta Version',
    contactTitle: 'Kontakt:',
    contactEmail: 'E-Mail',
    legalNotice:
      'Diese Plattform befindet sich im nicht-kommerziellen Testbetrieb. Es werden keine kostenpflichtigen Dienste, keine Verträge und keine geschäftsmäßigen Leistungen angeboten. Alle Funktionen dienen ausschließlich der Produktentwicklung, Nutzerforschung und Fehleranalyse.',
    ddgNotice:
      'Eine Anbieterkennzeichnung nach DDG § 5 ist nicht erforderlich, da keine geschäftsmäßigen Telemedien angeboten werden.',
  },
  en: {
    title: 'Imprint (Beta – Non-commercial test environment)',
    responsibleTitle: 'Responsible for this test platform:',
    responsibleBody: 'InvoiceEasy – Beta Version',
    contactTitle: 'Contact:',
    contactEmail: 'Email',
    legalNotice:
      'This platform is operated as a non-commercial beta. No paid services, contracts, or commercial offerings are provided. All features exist solely for product development, user research, and debugging.',
    ddgNotice:
      'A provider identification under DDG § 5 is not required because no commercial telemedia are offered.',
  },
  pl: {
    title: 'Nota prawna (Beta – test niekomercyjny)',
    responsibleTitle: 'Odpowiedzialny za tę platformę testową:',
    responsibleBody: 'InvoiceEasy – wersja beta',
    contactTitle: 'Kontakt:',
    contactEmail: 'E-mail',
    legalNotice:
      'Platforma działa w trybie beta i niekomercyjnym. Brak płatnych usług, umów i ofert komercyjnych. Funkcje służą wyłącznie rozwojowi produktu, badaniom użytkowników i analizie błędów.',
    ddgNotice:
      'Identyfikacja dostawcy wg DDG § 5 nie jest wymagana, ponieważ nie są oferowane komercyjne usługi online.',
  },
  ru: {
    title: 'Правовая информация (Бета — некоммерческий тест)',
    responsibleTitle: 'Ответственный за эту тестовую платформу:',
    responsibleBody: 'InvoiceEasy – Beta версия',
    contactTitle: 'Контакт:',
    contactEmail: 'E-mail',
    legalNotice:
      'Платформа работает в некоммерческой бете. Нет платных услуг, контрактов или коммерческих предложений. Все функции только для разработки продукта, исследований и анализа ошибок.',
    ddgNotice:
      'Указание поставщика по DDG § 5 не требуется, так как не предлагаются коммерческие телемедийные услуги.',
  },
  es: {
    title: 'Aviso legal (Beta – Prueba no comercial)',
    responsibleTitle: 'Responsable de esta plataforma de prueba:',
    responsibleBody: 'InvoiceEasy – Versión beta',
    contactTitle: 'Contacto:',
    contactEmail: 'E-mail',
    legalNotice:
      'La plataforma está en beta no comercial. No hay servicios de pago, contratos ni ofertas comerciales. Todas las funciones son solo para desarrollo, investigación de usuarios y análisis de errores.',
    ddgNotice:
      'No se requiere aviso de proveedor según DDG § 5 ya que no se ofrecen telemedios comerciales.',
  },
  tr: {
    title: 'Künye (Beta – Ticari olmayan test)',
    responsibleTitle: 'Bu test platformundan sorumlu:',
    responsibleBody: 'InvoiceEasy – Beta Sürüm',
    contactTitle: 'İletişim:',
    contactEmail: 'E-posta',
    legalNotice:
      'Platform ticari olmayan beta aşamasındadır. Ücretli hizmet, sözleşme veya ticari teklif yoktur. Tüm özellikler yalnızca ürün geliştirme, kullanıcı araştırması ve hata analizi içindir.',
    ddgNotice:
      'DDG § 5 uyarınca sağlayıcı bildirimi gerekmez; ticari telemedya sunulmuyor.',
  },
  ar: {
    title: 'إشعار قانوني (بيتا – اختبار غير تجاري)',
    responsibleTitle: 'المسؤول عن هذه المنصة التجريبية:',
    responsibleBody: 'InvoiceEasy – نسخة بيتا',
    contactTitle: 'التواصل:',
    contactEmail: 'البريد الإلكتروني',
    legalNotice:
      'المنصة في مرحلة بيتا غير تجارية. لا توجد خدمات مدفوعة أو عقود أو عروض تجارية. جميع الوظائف مخصصة للتطوير والبحث وتحليل الأخطاء.',
    ddgNotice:
      'لا يلزم إشعار مزود وفقاً لـ DDG § 5 لأنه لا يتم تقديم خدمات إلكترونية تجارية.',
  },
  zh: {
    title: '法律声明（Beta 非商业测试）',
    responsibleTitle: '测试平台负责人：',
    responsibleBody: 'InvoiceEasy – Beta 版本',
    contactTitle: '联系：',
    contactEmail: '电子邮件',
    legalNotice:
      '平台处于非商业测试阶段。无付费服务、合同或商业提供。所有功能仅用于产品开发、用户研究和错误分析。',
    ddgNotice:
      '未提供商业电信媒体，因此无需根据 DDG § 5 提供供应商说明。',
  },
  ko: {
    title: '법적 고지 (베타 – 비상업적 테스트)',
    responsibleTitle: '이 테스트 플랫폼 책임자:',
    responsibleBody: 'InvoiceEasy – 베타 버전',
    contactTitle: '문의:',
    contactEmail: '이메일',
    legalNotice:
      '이 플랫폼은 비상업적 베타 단계입니다. 유료 서비스, 계약 또는 상업적 제공이 없습니다. 모든 기능은 제품 개발, 사용자 연구, 오류 분석용입니다.',
    ddgNotice:
      '상업적 텔레미디어가 아니므로 DDG § 5에 따른 제공자 표시는 필요하지 않습니다.',
  },
  ja: {
    title: '特定商取引表示（ベータ・非商用テスト）',
    responsibleTitle: '本テストプラットフォームの責任者:',
    responsibleBody: 'InvoiceEasy – ベータ版',
    contactTitle: '連絡先:',
    contactEmail: 'Eメール',
    legalNotice:
      '本プラットフォームは非商用のベータ運用です。有料サービスや契約、商用提供はありません。機能は製品開発、ユーザー調査、バグ分析のみを目的とします。',
    ddgNotice:
      '商用テレメディアではないため、DDG § 5 に基づく表示は不要です。',
  },
} as const;

const Impressum: React.FC = () => {
  const { language } = useLanguage();
  const c = content[language as keyof typeof content] ?? content.en;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 text-sm leading-relaxed space-y-4">
      <h1 className="text-2xl font-semibold">{c.title}</h1>
      <section>
        <p className="font-semibold">{c.responsibleTitle}</p>
        <p>{c.responsibleBody}</p>
      </section>
      <section>
        <p className="font-semibold">{c.contactTitle}</p>
        <p>
          {c.contactEmail}:{' '}
          <a href="mailto:support@invoiceeasy.org" className="underline">
            support@invoiceeasy.org
          </a>
        </p>
      </section>
      <p>{c.legalNotice}</p>
      <p>{c.ddgNotice}</p>
    </main>
  );
};

export default Impressum;
