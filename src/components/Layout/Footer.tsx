import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, Language } from '@/contexts/LanguageContext';

type FooterContent = {
  brandLine: string;
  impressum: string;
  datenschutz: string;
  agb: string;
};

const baseContent: FooterContent = {
  brandLine: 'InvoiceEasy — All rights reserved',
  impressum: 'Impressum',
  datenschutz: 'Privacy',
  agb: 'Terms',
};

const localized: Partial<Record<Language, Partial<FooterContent>>> = {
  de: {
    brandLine: 'InvoiceEasy — Alle Rechte vorbehalten',
    datenschutz: 'Datenschutz',
    agb: 'AGB',
  },
  es: { datenschutz: 'Privacidad', agb: 'Términos' },
  pl: { datenschutz: 'Prywatność', agb: 'Regulamin' },
  ru: { datenschutz: 'Конфиденциальность', agb: 'Условия' },
  tr: { datenschutz: 'Gizlilik', agb: 'Şartlar' },
  ar: { brandLine: 'InvoiceEasy — جميع الحقوق محفوظة', datenschutz: 'الخصوصية', agb: 'الشروط' },
  zh: { datenschutz: '隐私政策', agb: '条款' },
  ko: { datenschutz: '개인정보 보호', agb: '이용약관' },
  ja: { datenschutz: 'プライバシー', agb: '利用規約' },
};

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const content = { ...baseContent, ...(localized[language] || {}) };

  return (
    <footer className="border-t mt-8 py-4 text-xs text-muted-foreground bg-[#FAF7F2]">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <div>
          © {new Date().getFullYear()} {content.brandLine}
        </div>
        <div className="flex gap-4">
          <Link to="/impressum" className="hover:underline">
            {content.impressum}
          </Link>
          <Link to="/datenschutz" className="hover:underline">
            {content.datenschutz}
          </Link>
          <Link to="/agb" className="hover:underline">
            {content.agb}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
