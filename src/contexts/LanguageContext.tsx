import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'de' | 'en' | 'pl' | 'ru' | 'es' | 'tr' | 'ar' | 'zh' | 'ko' | 'ja';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  de: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.invoices': 'Rechnungen',
    'nav.expenses': 'Ausgaben',
    'nav.settings': 'Einstellungen',
    'nav.logout': 'Abmelden',
    
    // Auth
    'auth.login': 'Anmelden',
    'auth.register': 'Registrieren',
    'auth.email': 'E-Mail',
    'auth.password': 'Passwort',
    'auth.confirmPassword': 'Passwort bestätigen',
    'auth.companyName': 'Firmenname',
    'auth.noAccount': 'Noch kein Konto?',
    'auth.hasAccount': 'Bereits ein Konto?',
    'auth.welcome': 'Willkommen zurück',
    'auth.createAccount': 'Konto erstellen',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.income': 'Einnahmen',
    'dashboard.expenses': 'Ausgaben', 
    'dashboard.profit': 'Gewinn',
    'dashboard.thisMonth': 'Diesen Monat',
    
    // Invoice
    'invoice.create': 'Rechnung erstellen',
    'invoice.customer': 'Kunde',
    'invoice.service': 'Leistung',
    'invoice.amount': 'Betrag',
    'invoice.date': 'Datum',
    'invoice.generate': 'PDF erstellen',
    
    // Expenses
    'expenses.title': 'Ausgaben',
    'expenses.upload': '📸 Foto vom Beleg machen',
    'expenses.amount': 'Betrag (optional)',
    'expenses.note': 'Notiz (optional)',
    'expenses.save': 'Speichern',
    
    // Common
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.delete': 'Löschen',
    'common.edit': 'Bearbeiten',
    'common.euro': '€',
  },
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.invoices': 'Invoices',
    'nav.expenses': 'Expenses',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',
    
    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.companyName': 'Company Name',
    'auth.noAccount': 'No account yet?',
    'auth.hasAccount': 'Already have an account?',
    'auth.welcome': 'Welcome back',
    'auth.createAccount': 'Create Account',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.income': 'Income',
    'dashboard.expenses': 'Expenses',
    'dashboard.profit': 'Profit',
    'dashboard.thisMonth': 'This Month',
    
    // Invoice
    'invoice.create': 'Create Invoice',
    'invoice.customer': 'Customer',
    'invoice.service': 'Service',
    'invoice.amount': 'Amount',
    'invoice.date': 'Date',
    'invoice.generate': 'Generate PDF',
    
    // Expenses
    'expenses.title': 'Expenses',
    'expenses.upload': '📸 Take Receipt Photo',
    'expenses.amount': 'Amount (optional)',
    'expenses.note': 'Note (optional)',
    'expenses.save': 'Save',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.euro': '€',
  },
  // Add more languages with similar structure
  pl: {
    'nav.dashboard': 'Panel główny',
    'nav.invoices': 'Faktury',
    'nav.expenses': 'Wydatki',
    'nav.settings': 'Ustawienia',
    'nav.logout': 'Wyloguj',
    'auth.login': 'Zaloguj',
    'auth.register': 'Zarejestruj',
    'auth.email': 'Email',
    'auth.password': 'Hasło',
    'auth.confirmPassword': 'Potwierdź hasło',
    'auth.companyName': 'Nazwa firmy',
    'auth.noAccount': 'Nie masz konta?',
    'auth.hasAccount': 'Masz już konto?',
    'auth.welcome': 'Witaj ponownie',
    'auth.createAccount': 'Utwórz konto',
    'dashboard.title': 'Panel główny',
    'dashboard.income': 'Przychody',
    'dashboard.expenses': 'Wydatki',
    'dashboard.profit': 'Zysk',
    'dashboard.thisMonth': 'Ten miesiąc',
    'invoice.create': 'Utwórz fakturę',
    'invoice.customer': 'Klient',
    'invoice.service': 'Usługa',
    'invoice.amount': 'Kwota',
    'invoice.date': 'Data',
    'invoice.generate': 'Generuj PDF',
    'expenses.title': 'Wydatki',
    'expenses.upload': '📸 Zrób zdjęcie paragonu',
    'expenses.amount': 'Kwota (opcjonalne)',
    'expenses.note': 'Notatka (opcjonalne)',
    'expenses.save': 'Zapisz',
    'common.save': 'Zapisz',
    'common.cancel': 'Anuluj',
    'common.delete': 'Usuń',
    'common.edit': 'Edytuj',
    'common.euro': '€',
  },
  // Simplified versions for other languages
  ru: { 'nav.dashboard': 'Панель', 'nav.invoices': 'Счета', 'nav.expenses': 'Расходы', 'nav.settings': 'Настройки', 'nav.logout': 'Выйти', 'auth.login': 'Войти', 'auth.register': 'Регистрация', 'auth.email': 'Email', 'auth.password': 'Пароль', 'auth.confirmPassword': 'Подтвердить пароль', 'auth.companyName': 'Название компании', 'auth.noAccount': 'Нет аккаунта?', 'auth.hasAccount': 'Есть аккаунт?', 'auth.welcome': 'Добро пожаловать', 'auth.createAccount': 'Создать аккаунт', 'dashboard.title': 'Панель', 'dashboard.income': 'Доходы', 'dashboard.expenses': 'Расходы', 'dashboard.profit': 'Прибыль', 'dashboard.thisMonth': 'В этом месяце', 'invoice.create': 'Создать счет', 'invoice.customer': 'Клиент', 'invoice.service': 'Услуга', 'invoice.amount': 'Сумма', 'invoice.date': 'Дата', 'invoice.generate': 'Создать PDF', 'expenses.title': 'Расходы', 'expenses.upload': '📸 Сфотографировать чек', 'expenses.amount': 'Сумма (опционально)', 'expenses.note': 'Заметка (опционально)', 'expenses.save': 'Сохранить', 'common.save': 'Сохранить', 'common.cancel': 'Отмена', 'common.delete': 'Удалить', 'common.edit': 'Редактировать', 'common.euro': '€' },
  es: { 'nav.dashboard': 'Panel', 'nav.invoices': 'Facturas', 'nav.expenses': 'Gastos', 'nav.settings': 'Ajustes', 'nav.logout': 'Cerrar sesión', 'auth.login': 'Iniciar sesión', 'auth.register': 'Registrarse', 'auth.email': 'Email', 'auth.password': 'Contraseña', 'auth.confirmPassword': 'Confirmar contraseña', 'auth.companyName': 'Nombre de empresa', 'auth.noAccount': '¿No tienes cuenta?', 'auth.hasAccount': '¿Ya tienes cuenta?', 'auth.welcome': 'Bienvenido', 'auth.createAccount': 'Crear cuenta', 'dashboard.title': 'Panel', 'dashboard.income': 'Ingresos', 'dashboard.expenses': 'Gastos', 'dashboard.profit': 'Beneficio', 'dashboard.thisMonth': 'Este mes', 'invoice.create': 'Crear factura', 'invoice.customer': 'Cliente', 'invoice.service': 'Servicio', 'invoice.amount': 'Cantidad', 'invoice.date': 'Fecha', 'invoice.generate': 'Generar PDF', 'expenses.title': 'Gastos', 'expenses.upload': '📸 Foto del recibo', 'expenses.amount': 'Cantidad (opcional)', 'expenses.note': 'Nota (opcional)', 'expenses.save': 'Guardar', 'common.save': 'Guardar', 'common.cancel': 'Cancelar', 'common.delete': 'Eliminar', 'common.edit': 'Editar', 'common.euro': '€' },
  tr: { 'nav.dashboard': 'Panel', 'nav.invoices': 'Faturalar', 'nav.expenses': 'Giderler', 'nav.settings': 'Ayarlar', 'nav.logout': 'Çıkış', 'auth.login': 'Giriş', 'auth.register': 'Kayıt', 'auth.email': 'Email', 'auth.password': 'Şifre', 'auth.confirmPassword': 'Şifreyi onayla', 'auth.companyName': 'Şirket adı', 'auth.noAccount': 'Hesabınız yok mu?', 'auth.hasAccount': 'Zaten hesabınız var mı?', 'auth.welcome': 'Hoş geldiniz', 'auth.createAccount': 'Hesap oluştur', 'dashboard.title': 'Panel', 'dashboard.income': 'Gelir', 'dashboard.expenses': 'Giderler', 'dashboard.profit': 'Kar', 'dashboard.thisMonth': 'Bu ay', 'invoice.create': 'Fatura oluştur', 'invoice.customer': 'Müşteri', 'invoice.service': 'Hizmet', 'invoice.amount': 'Tutar', 'invoice.date': 'Tarih', 'invoice.generate': 'PDF oluştur', 'expenses.title': 'Giderler', 'expenses.upload': '📸 Fiş fotoğrafı çek', 'expenses.amount': 'Tutar (opsiyonel)', 'expenses.note': 'Not (opsiyonel)', 'expenses.save': 'Kaydet', 'common.save': 'Kaydet', 'common.cancel': 'İptal', 'common.delete': 'Sil', 'common.edit': 'Düzenle', 'common.euro': '€' },
  ar: { 'nav.dashboard': 'لوحة القيادة', 'nav.invoices': 'الفواتير', 'nav.expenses': 'المصروفات', 'nav.settings': 'الإعدادات', 'nav.logout': 'تسجيل الخروج', 'auth.login': 'تسجيل الدخول', 'auth.register': 'التسجيل', 'auth.email': 'البريد الإلكتروني', 'auth.password': 'كلمة المرور', 'auth.confirmPassword': 'تأكيد كلمة المرور', 'auth.companyName': 'اسم الشركة', 'auth.noAccount': 'ليس لديك حساب؟', 'auth.hasAccount': 'لديك حساب بالفعل؟', 'auth.welcome': 'مرحباً بعودتك', 'auth.createAccount': 'إنشاء حساب', 'dashboard.title': 'لوحة القيادة', 'dashboard.income': 'الدخل', 'dashboard.expenses': 'المصروفات', 'dashboard.profit': 'الربح', 'dashboard.thisMonth': 'هذا الشهر', 'invoice.create': 'إنشاء فاتورة', 'invoice.customer': 'العميل', 'invoice.service': 'الخدمة', 'invoice.amount': 'المبلغ', 'invoice.date': 'التاريخ', 'invoice.generate': 'إنشاء PDF', 'expenses.title': 'المصروفات', 'expenses.upload': '📸 تصوير الإيصال', 'expenses.amount': 'المبلغ (اختياري)', 'expenses.note': 'ملاحظة (اختياري)', 'expenses.save': 'حفظ', 'common.save': 'حفظ', 'common.cancel': 'إلغاء', 'common.delete': 'حذف', 'common.edit': 'تعديل', 'common.euro': '€' },
  zh: { 'nav.dashboard': '仪表板', 'nav.invoices': '发票', 'nav.expenses': '支出', 'nav.settings': '设置', 'nav.logout': '登出', 'auth.login': '登录', 'auth.register': '注册', 'auth.email': '邮箱', 'auth.password': '密码', 'auth.confirmPassword': '确认密码', 'auth.companyName': '公司名称', 'auth.noAccount': '还没有账户？', 'auth.hasAccount': '已有账户？', 'auth.welcome': '欢迎回来', 'auth.createAccount': '创建账户', 'dashboard.title': '仪表板', 'dashboard.income': '收入', 'dashboard.expenses': '支出', 'dashboard.profit': '利润', 'dashboard.thisMonth': '本月', 'invoice.create': '创建发票', 'invoice.customer': '客户', 'invoice.service': '服务', 'invoice.amount': '金额', 'invoice.date': '日期', 'invoice.generate': '生成PDF', 'expenses.title': '支出', 'expenses.upload': '📸 拍摄收据', 'expenses.amount': '金额（可选）', 'expenses.note': '备注（可选）', 'expenses.save': '保存', 'common.save': '保存', 'common.cancel': '取消', 'common.delete': '删除', 'common.edit': '编辑', 'common.euro': '€' },
  ko: { 'nav.dashboard': '대시보드', 'nav.invoices': '인보이스', 'nav.expenses': '지출', 'nav.settings': '설정', 'nav.logout': '로그아웃', 'auth.login': '로그인', 'auth.register': '회원가입', 'auth.email': '이메일', 'auth.password': '비밀번호', 'auth.confirmPassword': '비밀번호 확인', 'auth.companyName': '회사명', 'auth.noAccount': '계정이 없으신가요?', 'auth.hasAccount': '이미 계정이 있으신가요?', 'auth.welcome': '다시 오신 것을 환영합니다', 'auth.createAccount': '계정 생성', 'dashboard.title': '대시보드', 'dashboard.income': '수입', 'dashboard.expenses': '지출', 'dashboard.profit': '이익', 'dashboard.thisMonth': '이번 달', 'invoice.create': '인보이스 생성', 'invoice.customer': '고객', 'invoice.service': '서비스', 'invoice.amount': '금액', 'invoice.date': '날짜', 'invoice.generate': 'PDF 생성', 'expenses.title': '지출', 'expenses.upload': '📸 영수증 사진 찍기', 'expenses.amount': '금액 (선택사항)', 'expenses.note': '메모 (선택사항)', 'expenses.save': '저장', 'common.save': '저장', 'common.cancel': '취소', 'common.delete': '삭제', 'common.edit': '편집', 'common.euro': '€' },
  ja: { 'nav.dashboard': 'ダッシュボード', 'nav.invoices': '請求書', 'nav.expenses': '支出', 'nav.settings': '設定', 'nav.logout': 'ログアウト', 'auth.login': 'ログイン', 'auth.register': '登録', 'auth.email': 'メール', 'auth.password': 'パスワード', 'auth.confirmPassword': 'パスワード確認', 'auth.companyName': '会社名', 'auth.noAccount': 'アカウントをお持ちでない方？', 'auth.hasAccount': '既にアカウントをお持ちの方？', 'auth.welcome': 'おかえりなさい', 'auth.createAccount': 'アカウント作成', 'dashboard.title': 'ダッシュボード', 'dashboard.income': '収入', 'dashboard.expenses': '支出', 'dashboard.profit': '利益', 'dashboard.thisMonth': '今月', 'invoice.create': '請求書作成', 'invoice.customer': '顧客', 'invoice.service': 'サービス', 'invoice.amount': '金額', 'invoice.date': '日付', 'invoice.generate': 'PDF生成', 'expenses.title': '支出', 'expenses.upload': '📸 レシート写真を撮る', 'expenses.amount': '金額（任意）', 'expenses.note': 'メモ（任意）', 'expenses.save': '保存', 'common.save': '保存', 'common.cancel': 'キャンセル', 'common.delete': '削除', 'common.edit': '編集', 'common.euro': '€' },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('de'); // Default to German

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};