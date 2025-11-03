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
    'auth.signInSubtitle': 'Melden Sie sich bei Ihrem Konto an',
    'auth.startToday': 'Starten Sie noch heute',
    'auth.loginSuccess': 'Login erfolgreich',
    'auth.loginFailed': 'Login fehlgeschlagen',
    'auth.registerSuccess': 'Registrierung erfolgreich',
    'auth.registerFailed': 'Registrierung fehlgeschlagen',
    'auth.welcomeMessage': 'Willkommen bei InvoiceEasy!',
    'auth.welcomeBack': 'Willkommen zurück!',
    'auth.checkInputs': 'Bitte überprüfen Sie Ihre Eingaben.',
    'auth.error': 'Fehler',
    'auth.errorOccurred': 'Ein Fehler ist aufgetreten.',
    'auth.passwordsMismatch': 'Passwörter stimmen nicht überein',
    'auth.checkPassword': 'Bitte überprüfen Sie Ihre Passwort-Eingabe.',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.income': 'Einnahmen',
    'dashboard.expenses': 'Ausgaben', 
    'dashboard.profit': 'Gewinn',
    'dashboard.thisMonth': 'Diesen Monat',
    'dashboard.welcome': 'Willkommen',
    'dashboard.quickActions': 'Schnellaktionen',
    'dashboard.monthlyOverview': 'Monatliche Übersicht',
    'dashboard.newInvoiceDesc': 'Neue Rechnung erstellen',
    'dashboard.newExpenseDesc': 'Ausgabe hinzufügen',
    
    // Invoice
    'invoice.create': 'Rechnung erstellen',
    'invoice.customer': 'Kunde',
    'invoice.service': 'Leistung',
    'invoice.amount': 'Betrag',
    'invoice.date': 'Datum',
    'invoice.generate': 'PDF erstellen',
    'invoice.subtitle': 'Neue Rechnung für Ihre Kunden',
    'invoice.legalNotice': 'Rechtlicher Hinweis:',
    'invoice.legalText': 'Diese Rechnung wird automatisch mit dem Zusatz "Gemäß § 19 UStG wird keine Umsatzsteuer ausgewiesen." versehen.',
    'invoice.creating': 'PDF wird erstellt...',
    'invoice.created': 'Rechnung erstellt!',
    'invoice.createdDesc': 'Die Rechnung wurde erfolgreich als PDF generiert.',
    'invoice.uploadInvoice': 'Rechnung hochladen und analysieren',
    'invoice.analyzing': 'Analyse läuft...',
    'invoice.analysisComplete': 'Analyse abgeschlossen',
    'invoice.analysisCompleteDesc': 'Die Rechnungsdaten wurden ausgefüllt. Bitte überprüfen Sie die Angaben.',
    'invoice.analysisSummary': 'Erkannte Positionen',
    'invoice.itemPlaceholder': 'Position',
    'invoice.additionalItems': 'Weitere Positionen wurden erkannt.',
    'invoice.uploadHelper': 'Nutzen Sie den OCR-Upload, um Rechnungsdaten automatisch auszufüllen.',
    'invoice.orEnterManually': 'Oder geben Sie die Daten unten manuell ein.',
    'invoice.pdfLockedTitle': 'PDF-Export gesperrt',
    'invoice.pdfLockedDesc': 'Upgrade auf den Pro- oder Elite-Tarif, um Rechnungen als PDF zu generieren.',
    'invoice.upgradeCta': 'Jetzt upgraden',
    
    // Expenses
    'expenses.title': 'Ausgaben',
    'expenses.upload': '📸 Foto vom Beleg machen',
    'expenses.uploadFile': 'Datei hochladen',
    'expenses.amount': 'Betrag (optional)',
    'expenses.note': 'Notiz (optional)',
    'expenses.save': 'Speichern',
    'expenses.subtitle': 'Laden Sie Ihre Belege hoch',
    'expenses.loadedSuccess': 'Beleg erfolgreich geladen',
    'expenses.saving': 'Wird gespeichert...',
    'expenses.saved': 'Ausgabe gespeichert!',
    'expenses.savedDesc': 'Der Beleg wurde erfolgreich hochgeladen.',
    'expenses.noReceiptSelected': 'Kein Beleg ausgewählt',
    'expenses.pleaseUpload': 'Bitte laden Sie einen Beleg hoch oder machen Sie ein Foto.',
    'expenses.list': 'Ihre hochgeladenen Belege',
    'expenses.totalMonth': 'Gesamt diesen Monat',
    'expenses.addNew': 'Neue Ausgabe hinzufügen',
    'expenses.noExpenses': 'Noch keine Ausgaben',
    'expenses.uploadFirst': 'Laden Sie Ihren ersten Beleg hoch, um zu beginnen.',
    'expenses.deleteConfirmTitle': 'Ausgabe löschen?',
    'expenses.deleteConfirmMessage': 'Möchten Sie diese Ausgabe wirklich löschen? Dieser Vorgang kann nicht rückgängig gemacht werden.',
    'expenses.deletedDesc': 'Die Ausgabe wurde entfernt.',
    
    // Settings
    'settings.title': 'Einstellungen',
    'settings.subtitle': 'Verwalten Sie Ihr Konto und Abonnement',
    'settings.accountInfo': 'Kontoinformationen',
    'settings.language': 'Sprache',
    'settings.languageLabel': 'Interface-Sprache:',
    'settings.subscription': 'Abonnement',
    'settings.currentPlan': 'Aktueller Plan',
    'settings.upgrade': 'Upgrade',
    'settings.starter': 'Starter',
    'settings.elite': 'Elite',
    'settings.contact': 'Haben Sie Fragen? Kontaktieren Sie uns unter',
    'settings.free': 'Kostenlos',
    'settings.pro': 'Pro',
    'settings.perMonth': '/Monat',
    'settings.starterFeature1': '5 Rechnungen pro Monat',
    'settings.starterFeature2': '5 Ausgaben-Uploads',
    'settings.starterFeature3': 'E-Mail-Support',
    'settings.starterFeature4': 'Manueller PDF-Download',
    'settings.proFeature1': 'Unbegrenzte Rechnungen',
    'settings.proFeature2': 'Unbegrenzte Ausgaben',
    'settings.proFeature3': 'Erweiterte PDF-Vorlagen',
    'settings.proFeature4': 'Prioritäts-Support',
    'settings.eliteFeature1': 'Alles aus Pro inklusive',
    'settings.eliteFeature2': 'Automatische Backups',
    'settings.eliteFeature3': 'Steuerexport für Steuerberater',
    'settings.eliteFeature4': 'Dedizierter Erfolgsmanager',
    
    // Common
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.delete': 'Löschen',
    'common.edit': 'Bearbeiten',
    'common.euro': '€',
    
    // Toast
    'toast.success': 'Erfolgreich',
    'toast.error': 'Fehler',
    
    // Actions
    'actions.delete': 'Löschen',
    'actions.save': 'Speichern',
    'actions.cancel': 'Abbrechen',
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
    'auth.signInSubtitle': 'Sign in to your account',
    'auth.startToday': 'Start today',
    'auth.loginSuccess': 'Login successful',
    'auth.loginFailed': 'Login failed',
    'auth.registerSuccess': 'Registration successful',
    'auth.registerFailed': 'Registration failed',
    'auth.welcomeMessage': 'Welcome to InvoiceEasy!',
    'auth.welcomeBack': 'Welcome back!',
    'auth.checkInputs': 'Please check your inputs.',
    'auth.error': 'Error',
    'auth.errorOccurred': 'An error occurred.',
    'auth.passwordsMismatch': 'Passwords do not match',
    'auth.checkPassword': 'Please check your password input.',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.income': 'Income',
    'dashboard.expenses': 'Expenses',
    'dashboard.profit': 'Profit',
    'dashboard.thisMonth': 'This Month',
    'dashboard.welcome': 'Welcome',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.monthlyOverview': 'Monthly Overview',
    'dashboard.newInvoiceDesc': 'Create new invoice',
    'dashboard.newExpenseDesc': 'Add expense',
    
    // Invoice
    'invoice.create': 'Create Invoice',
    'invoice.customer': 'Customer',
    'invoice.service': 'Service',
    'invoice.amount': 'Amount',
    'invoice.date': 'Date',
    'invoice.generate': 'Generate PDF',
    'invoice.subtitle': 'New invoice for your customers',
    'invoice.legalNotice': 'Legal Notice:',
    'invoice.legalText': 'This invoice will automatically include the text "No VAT shown according to § 19 UStG."',
    'invoice.creating': 'Creating PDF...',
    'invoice.created': 'Invoice created!',
    'invoice.createdDesc': 'The invoice was successfully generated as PDF.',
    'invoice.uploadInvoice': 'Upload invoice for OCR',
    'invoice.analyzing': 'Analyzing...',
    'invoice.analysisComplete': 'Invoice analyzed',
    'invoice.analysisCompleteDesc': 'Invoice details were pre-filled. Please review before saving.',
    'invoice.analysisSummary': 'Detected line items',
    'invoice.itemPlaceholder': 'Item',
    'invoice.additionalItems': 'Additional items detected.',
    'invoice.uploadHelper': 'Let our OCR fill in your invoice details automatically.',
    'invoice.orEnterManually': 'Or enter the details manually below.',
    'invoice.pdfLockedTitle': 'PDF export unavailable',
    'invoice.pdfLockedDesc': 'Upgrade to Pro or Elite to generate invoices as PDF.',
    'invoice.upgradeCta': 'Upgrade now',
    
    // Expenses
    'expenses.title': 'Expenses',
    'expenses.upload': '📸 Take Receipt Photo',
    'expenses.uploadFile': 'Upload File',
    'expenses.amount': 'Amount (optional)',
    'expenses.note': 'Note (optional)',
    'expenses.save': 'Save',
    'expenses.subtitle': 'Upload your receipts',
    'expenses.loadedSuccess': 'Receipt loaded successfully',
    'expenses.saving': 'Saving...',
    'expenses.saved': 'Expense saved!',
    'expenses.savedDesc': 'The receipt was successfully uploaded.',
    'expenses.noReceiptSelected': 'No receipt selected',
    'expenses.pleaseUpload': 'Please upload a receipt or take a photo.',
    'expenses.list': 'Your uploaded receipts',
    'expenses.totalMonth': 'Total this month',
    'expenses.addNew': 'Add new expense',
    'expenses.noExpenses': 'No expenses yet',
    'expenses.uploadFirst': 'Upload your first receipt to get started.',
    'expenses.deleteConfirmTitle': 'Delete expense?',
    'expenses.deleteConfirmMessage': 'Are you sure you want to delete this expense? This action cannot be undone.',
    'expenses.deletedDesc': 'The expense has been removed.',
    
    // Settings
    'settings.title': 'Settings',
    'settings.subtitle': 'Manage your account and subscription',
    'settings.accountInfo': 'Account Information',
    'settings.language': 'Language',
    'settings.languageLabel': 'Interface Language:',
    'settings.subscription': 'Subscription',
    'settings.currentPlan': 'Current Plan',
    'settings.upgrade': 'Upgrade',
    'settings.starter': 'Starter',
    'settings.elite': 'Elite',
    'settings.contact': 'Have questions? Contact us at',
    'settings.free': 'Free',
    'settings.pro': 'Pro',
    'settings.perMonth': '/month',
    'settings.starterFeature1': '5 invoices per month',
    'settings.starterFeature2': '5 expense uploads',
    'settings.starterFeature3': 'Email support',
    'settings.starterFeature4': 'Manual PDF download',
    'settings.proFeature1': 'Unlimited invoices',
    'settings.proFeature2': 'Unlimited expenses',
    'settings.proFeature3': 'Advanced PDF templates',
    'settings.proFeature4': 'Priority support',
    'settings.eliteFeature1': 'Everything in Pro included',
    'settings.eliteFeature2': 'Automatic backups',
    'settings.eliteFeature3': 'Tax export for accountants',
    'settings.eliteFeature4': 'Dedicated success manager',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.euro': '€',
    
    // Toast
    'toast.success': 'Success',
    'toast.error': 'Error',
    
    // Actions
    'actions.delete': 'Delete',
    'actions.save': 'Save',
    'actions.cancel': 'Cancel',
  },
  // Add more languages with similar structure
  pl: {
    'nav.dashboard': 'Panel główny', 'nav.invoices': 'Faktury', 'nav.expenses': 'Wydatki', 'nav.settings': 'Ustawienia', 'nav.logout': 'Wyloguj', 
    'auth.login': 'Zaloguj', 'auth.register': 'Zarejestruj', 'auth.email': 'Email', 'auth.password': 'Hasło', 'auth.confirmPassword': 'Potwierdź hasło', 'auth.companyName': 'Nazwa firmy', 'auth.noAccount': 'Nie masz konta?', 'auth.hasAccount': 'Masz już konto?', 'auth.welcome': 'Witaj ponownie', 'auth.createAccount': 'Utwórz konto', 'auth.signInSubtitle': 'Zaloguj się do swojego konta', 'auth.startToday': 'Rozpocznij dziś', 'auth.loginSuccess': 'Logowanie udane', 'auth.loginFailed': 'Logowanie nie powiodło się', 'auth.registerSuccess': 'Rejestracja udana', 'auth.registerFailed': 'Rejestracja nie powiodła się', 'auth.welcomeMessage': 'Witaj w InvoiceEasy!', 'auth.welcomeBack': 'Witaj ponownie!', 'auth.checkInputs': 'Sprawdź wprowadzone dane.', 'auth.error': 'Błąd', 'auth.errorOccurred': 'Wystąpił błąd.', 'auth.passwordsMismatch': 'Hasła nie pasują', 'auth.checkPassword': 'Sprawdź wprowadzone hasło.',
    'dashboard.title': 'Panel główny', 'dashboard.income': 'Przychody', 'dashboard.expenses': 'Wydatki', 'dashboard.profit': 'Zysk', 'dashboard.thisMonth': 'Ten miesiąc', 'dashboard.welcome': 'Witaj', 'dashboard.quickActions': 'Szybkie akcje', 'dashboard.monthlyOverview': 'Przegląd miesięczny', 'dashboard.newInvoiceDesc': 'Utwórz nową fakturę', 'dashboard.newExpenseDesc': 'Dodaj wydatek',
    'invoice.create': 'Utwórz fakturę', 'invoice.customer': 'Klient', 'invoice.service': 'Usługa', 'invoice.amount': 'Kwota', 'invoice.date': 'Data', 'invoice.generate': 'Generuj PDF', 'invoice.subtitle': 'Nowa faktura dla klientów', 'invoice.legalNotice': 'Informacja prawna:', 'invoice.legalText': 'Faktura zostanie automatycznie oznaczona tekstem zgodnie z § 19 UStG.', 'invoice.creating': 'Tworzenie PDF...', 'invoice.created': 'Faktura utworzona!', 'invoice.createdDesc': 'Faktura została pomyślnie wygenerowana jako PDF.',
    'expenses.title': 'Wydatki', 'expenses.upload': '📸 Zrób zdjęcie paragonu', 'expenses.uploadFile': 'Prześlij plik', 'expenses.amount': 'Kwota (opcjonalne)', 'expenses.note': 'Notatka (opcjonalne)', 'expenses.save': 'Zapisz', 'expenses.subtitle': 'Prześlij swoje paragony', 'expenses.loadedSuccess': 'Paragon załadowany pomyślnie', 'expenses.saving': 'Zapisywanie...', 'expenses.saved': 'Wydatek zapisany!', 'expenses.savedDesc': 'Paragon został pomyślnie przesłany.', 'expenses.noReceiptSelected': 'Nie wybrano paragonu', 'expenses.pleaseUpload': 'Prześlij paragon lub zrób zdjęcie.', 'expenses.list': 'Twoje przesłane paragony', 'expenses.totalMonth': 'Suma w tym miesiącu', 'expenses.addNew': 'Dodaj nowy wydatek', 'expenses.noExpenses': 'Brak wydatków', 'expenses.uploadFirst': 'Prześlij swój pierwszy paragon, aby rozpocząć.',
    'settings.title': 'Ustawienia', 'settings.subtitle': 'Zarządzaj kontem i subskrypcją', 'settings.accountInfo': 'Informacje o koncie', 'settings.language': 'Język', 'settings.languageLabel': 'Język interfejsu:', 'settings.subscription': 'Subskrypcja', 'settings.currentPlan': 'Aktualny plan', 'settings.upgrade': 'Ulepsz', 'settings.contact': 'Masz pytania? Skontaktuj się z nami pod adresem', 'settings.free': 'Darmowy', 'settings.pro': 'Pro', 'settings.perMonth': '/miesiąc', 'settings.feature1': '5 faktur miesięcznie', 'settings.feature2': '10 przesłanych wydatków', 'settings.feature3': 'Podstawowy eksport PDF', 'settings.feature4': 'Wsparcie email', 'settings.feature5': 'Nieograniczone faktury', 'settings.feature6': 'Nieograniczone wydatki', 'settings.feature7': 'Zaawansowane szablony PDF', 'settings.feature8': 'Automatyczne kopie zapasowe', 'settings.feature9': 'Priorytetowe wsparcie', 'settings.feature10': 'Eksport podatkowy dla księgowych',
    'common.save': 'Zapisz', 'common.cancel': 'Anuluj', 'common.delete': 'Usuń', 'common.edit': 'Edytuj', 'common.euro': '€',
    'toast.success': 'Sukces', 'toast.error': 'Błąd', 'actions.delete': 'Usuń', 'actions.save': 'Zapisz', 'actions.cancel': 'Anuluj',
  },
  // Simplified versions for other languages  
  ru: { 'nav.dashboard': 'Панель', 'nav.invoices': 'Счета', 'nav.expenses': 'Расходы', 'nav.settings': 'Настройки', 'nav.logout': 'Выйти', 'auth.login': 'Войти', 'auth.register': 'Регистрация', 'auth.email': 'Email', 'auth.password': 'Пароль', 'auth.confirmPassword': 'Подтвердить пароль', 'auth.companyName': 'Название компании', 'auth.noAccount': 'Нет аккаунта?', 'auth.hasAccount': 'Есть аккаунт?', 'auth.welcome': 'Добро пожаловать', 'auth.createAccount': 'Создать аккаунт', 'auth.signInSubtitle': 'Войдите в свой аккаунт', 'auth.startToday': 'Начать сегодня', 'auth.loginSuccess': 'Вход выполнен', 'auth.loginFailed': 'Вход не выполнен', 'auth.registerSuccess': 'Регистрация успешна', 'auth.registerFailed': 'Регистрация не удалась', 'auth.welcomeMessage': 'Добро пожаловать в InvoiceEasy!', 'auth.welcomeBack': 'С возвращением!', 'auth.checkInputs': 'Проверьте введенные данные.', 'auth.error': 'Ошибка', 'auth.errorOccurred': 'Произошла ошибка.', 'auth.passwordsMismatch': 'Пароли не совпадают', 'auth.checkPassword': 'Проверьте введенный пароль.', 'dashboard.title': 'Панель', 'dashboard.income': 'Доходы', 'dashboard.expenses': 'Расходы', 'dashboard.profit': 'Прибыль', 'dashboard.thisMonth': 'В этом месяце', 'dashboard.welcome': 'Добро пожаловать', 'dashboard.quickActions': 'Быстрые действия', 'dashboard.monthlyOverview': 'Обзор за месяц', 'dashboard.newInvoiceDesc': 'Создать новый счет', 'dashboard.newExpenseDesc': 'Добавить расход', 'invoice.create': 'Создать счет', 'invoice.customer': 'Клиент', 'invoice.service': 'Услуга', 'invoice.amount': 'Сумма', 'invoice.date': 'Дата', 'invoice.generate': 'Создать PDF', 'invoice.subtitle': 'Новый счет для клиентов', 'invoice.legalNotice': 'Правовое уведомление:', 'invoice.legalText': 'Счет будет автоматически помечен текстом согласно § 19 UStG.', 'invoice.creating': 'Создание PDF...', 'invoice.created': 'Счет создан!', 'invoice.createdDesc': 'Счет успешно создан как PDF.', 'expenses.title': 'Расходы', 'expenses.upload': '📸 Сфотографировать чек', 'expenses.uploadFile': 'Загрузить файл', 'expenses.amount': 'Сумма (опционально)', 'expenses.note': 'Заметка (опционально)', 'expenses.save': 'Сохранить', 'expenses.subtitle': 'Загрузите свои чеки', 'expenses.loadedSuccess': 'Чек успешно загружен', 'expenses.saving': 'Сохранение...', 'expenses.saved': 'Расход сохранен!', 'expenses.savedDesc': 'Чек успешно загружен.', 'expenses.noReceiptSelected': 'Чек не выбран', 'expenses.pleaseUpload': 'Загрузите чек или сделайте фото.', 'expenses.list': 'Ваши загруженные чеки', 'expenses.totalMonth': 'Всего в этом месяце', 'expenses.addNew': 'Добавить новый расход', 'expenses.noExpenses': 'Нет расходов', 'expenses.uploadFirst': 'Загрузите первый чек, чтобы начать.', 'settings.title': 'Настройки', 'settings.subtitle': 'Управление аккаунтом и подпиской', 'settings.accountInfo': 'Информация об аккаунте', 'settings.language': 'Язык', 'settings.languageLabel': 'Язык интерфейса:', 'settings.subscription': 'Подписка', 'settings.currentPlan': 'Текущий план', 'settings.upgrade': 'Обновить', 'settings.contact': 'Есть вопросы? Свяжитесь с нами по адресу', 'settings.free': 'Бесплатный', 'settings.pro': 'Pro', 'settings.perMonth': '/месяц', 'settings.feature1': '5 счетов в месяц', 'settings.feature2': '10 загрузок расходов', 'settings.feature3': 'Базовый экспорт PDF', 'settings.feature4': 'Email поддержка', 'settings.feature5': 'Неограниченные счета', 'settings.feature6': 'Неограниченные расходы', 'settings.feature7': 'Расширенные шаблоны PDF', 'settings.feature8': 'Автоматические резервные копии', 'settings.feature9': 'Приоритетная поддержка', 'settings.feature10': 'Налоговый экспорт для бухгалтеров', 'common.save': 'Сохранить', 'common.cancel': 'Отмена', 'common.delete': 'Удалить', 'common.edit': 'Редактировать', 'common.euro': '€', 'toast.success': 'Успешно', 'toast.error': 'Ошибка', 'actions.delete': 'Удалить', 'actions.save': 'Сохранить', 'actions.cancel': 'Отмена' },
  es: { 'nav.dashboard': 'Panel', 'nav.invoices': 'Facturas', 'nav.expenses': 'Gastos', 'nav.settings': 'Ajustes', 'nav.logout': 'Cerrar sesión', 'auth.login': 'Iniciar sesión', 'auth.register': 'Registrarse', 'auth.email': 'Email', 'auth.password': 'Contraseña', 'auth.confirmPassword': 'Confirmar contraseña', 'auth.companyName': 'Nombre de empresa', 'auth.noAccount': '¿No tienes cuenta?', 'auth.hasAccount': '¿Ya tienes cuenta?', 'auth.welcome': 'Bienvenido', 'auth.createAccount': 'Crear cuenta', 'auth.signInSubtitle': 'Inicia sesión en tu cuenta', 'auth.startToday': 'Comienza hoy', 'auth.loginSuccess': 'Inicio de sesión exitoso', 'auth.loginFailed': 'Inicio de sesión fallido', 'auth.registerSuccess': 'Registro exitoso', 'auth.registerFailed': 'Registro fallido', 'auth.welcomeMessage': '¡Bienvenido a InvoiceEasy!', 'auth.welcomeBack': '¡Bienvenido de nuevo!', 'auth.checkInputs': 'Por favor verifica tus datos.', 'auth.error': 'Error', 'auth.errorOccurred': 'Ha ocurrido un error.', 'auth.passwordsMismatch': 'Las contraseñas no coinciden', 'auth.checkPassword': 'Por favor verifica tu contraseña.', 'dashboard.title': 'Panel', 'dashboard.income': 'Ingresos', 'dashboard.expenses': 'Gastos', 'dashboard.profit': 'Beneficio', 'dashboard.thisMonth': 'Este mes', 'dashboard.welcome': 'Bienvenido', 'dashboard.quickActions': 'Acciones rápidas', 'dashboard.monthlyOverview': 'Resumen mensual', 'dashboard.newInvoiceDesc': 'Crear nueva factura', 'dashboard.newExpenseDesc': 'Añadir gasto', 'invoice.create': 'Crear factura', 'invoice.customer': 'Cliente', 'invoice.service': 'Servicio', 'invoice.amount': 'Cantidad', 'invoice.date': 'Fecha', 'invoice.generate': 'Generar PDF', 'invoice.subtitle': 'Nueva factura para clientes', 'invoice.legalNotice': 'Aviso legal:', 'invoice.legalText': 'La factura se marcará automáticamente según § 19 UStG.', 'invoice.creating': 'Creando PDF...', 'invoice.created': '¡Factura creada!', 'invoice.createdDesc': 'La factura se generó exitosamente como PDF.', 'expenses.title': 'Gastos', 'expenses.upload': '📸 Foto del recibo', 'expenses.uploadFile': 'Subir archivo', 'expenses.amount': 'Cantidad (opcional)', 'expenses.note': 'Nota (opcional)', 'expenses.save': 'Guardar', 'expenses.subtitle': 'Sube tus recibos', 'expenses.loadedSuccess': 'Recibo cargado exitosamente', 'expenses.saving': 'Guardando...', 'expenses.saved': '¡Gasto guardado!', 'expenses.savedDesc': 'El recibo se subió exitosamente.', 'expenses.noReceiptSelected': 'No se seleccionó recibo', 'expenses.pleaseUpload': 'Sube un recibo o toma una foto.', 'expenses.list': 'Tus recibos subidos', 'expenses.totalMonth': 'Total este mes', 'expenses.addNew': 'Añadir nuevo gasto', 'expenses.noExpenses': 'Sin gastos aún', 'expenses.uploadFirst': 'Sube tu primer recibo para comenzar.', 'settings.title': 'Ajustes', 'settings.subtitle': 'Administra tu cuenta y suscripción', 'settings.accountInfo': 'Información de cuenta', 'settings.language': 'Idioma', 'settings.languageLabel': 'Idioma de interfaz:', 'settings.subscription': 'Suscripción', 'settings.currentPlan': 'Plan actual', 'settings.upgrade': 'Mejorar', 'settings.contact': '¿Tienes preguntas? Contáctanos en', 'settings.free': 'Gratis', 'settings.pro': 'Pro', 'settings.perMonth': '/mes', 'settings.feature1': '5 facturas por mes', 'settings.feature2': '10 subidas de gastos', 'settings.feature3': 'Exportación PDF básica', 'settings.feature4': 'Soporte por email', 'settings.feature5': 'Facturas ilimitadas', 'settings.feature6': 'Gastos ilimitados', 'settings.feature7': 'Plantillas PDF avanzadas', 'settings.feature8': 'Copias de seguridad automáticas', 'settings.feature9': 'Soporte prioritario', 'settings.feature10': 'Exportación fiscal para contadores', 'common.save': 'Guardar', 'common.cancel': 'Cancelar', 'common.delete': 'Eliminar', 'common.edit': 'Editar', 'common.euro': '€', 'toast.success': 'Éxito', 'toast.error': 'Error', 'actions.delete': 'Eliminar', 'actions.save': 'Guardar', 'actions.cancel': 'Cancelar' },
  tr: { 'nav.dashboard': 'Panel', 'nav.invoices': 'Faturalar', 'nav.expenses': 'Giderler', 'nav.settings': 'Ayarlar', 'nav.logout': 'Çıkış', 'auth.login': 'Giriş', 'auth.register': 'Kayıt', 'auth.email': 'Email', 'auth.password': 'Şifre', 'auth.confirmPassword': 'Şifreyi onayla', 'auth.companyName': 'Şirket adı', 'auth.noAccount': 'Hesabınız yok mu?', 'auth.hasAccount': 'Zaten hesabınız var mı?', 'auth.welcome': 'Hoş geldiniz', 'auth.createAccount': 'Hesap oluştur', 'auth.signInSubtitle': 'Hesabınıza giriş yapın', 'auth.startToday': 'Bugün başlayın', 'auth.loginSuccess': 'Giriş başarılı', 'auth.loginFailed': 'Giriş başarısız', 'auth.registerSuccess': 'Kayıt başarılı', 'auth.registerFailed': 'Kayıt başarısız', 'auth.welcomeMessage': 'InvoiceEasy\'e hoş geldiniz!', 'auth.welcomeBack': 'Tekrar hoş geldiniz!', 'auth.checkInputs': 'Lütfen girişlerinizi kontrol edin.', 'auth.error': 'Hata', 'auth.errorOccurred': 'Bir hata oluştu.', 'auth.passwordsMismatch': 'Şifreler eşleşmiyor', 'auth.checkPassword': 'Lütfen şifrenizi kontrol edin.', 'dashboard.title': 'Panel', 'dashboard.income': 'Gelir', 'dashboard.expenses': 'Giderler', 'dashboard.profit': 'Kar', 'dashboard.thisMonth': 'Bu ay', 'dashboard.welcome': 'Hoş geldiniz', 'dashboard.quickActions': 'Hızlı işlemler', 'dashboard.monthlyOverview': 'Aylık genel bakış', 'dashboard.newInvoiceDesc': 'Yeni fatura oluştur', 'dashboard.newExpenseDesc': 'Gider ekle', 'invoice.create': 'Fatura oluştur', 'invoice.customer': 'Müşteri', 'invoice.service': 'Hizmet', 'invoice.amount': 'Tutar', 'invoice.date': 'Tarih', 'invoice.generate': 'PDF oluştur', 'invoice.subtitle': 'Müşterileriniz için yeni fatura', 'invoice.legalNotice': 'Yasal bildirim:', 'invoice.legalText': 'Fatura otomatik olarak § 19 UStG\'ye göre işaretlenecektir.', 'invoice.creating': 'PDF oluşturuluyor...', 'invoice.created': 'Fatura oluşturuldu!', 'invoice.createdDesc': 'Fatura PDF olarak başarıyla oluşturuldu.', 'expenses.title': 'Giderler', 'expenses.upload': '📸 Fiş fotoğrafı çek', 'expenses.uploadFile': 'Dosya yükle', 'expenses.amount': 'Tutar (opsiyonel)', 'expenses.note': 'Not (opsiyonel)', 'expenses.save': 'Kaydet', 'expenses.subtitle': 'Fişlerinizi yükleyin', 'expenses.loadedSuccess': 'Fiş başarıyla yüklendi', 'expenses.saving': 'Kaydediliyor...', 'expenses.saved': 'Gider kaydedildi!', 'expenses.savedDesc': 'Fiş başarıyla yüklendi.', 'expenses.noReceiptSelected': 'Fiş seçilmedi', 'expenses.pleaseUpload': 'Bir fiş yükleyin veya fotoğraf çekin.', 'expenses.list': 'Yüklenen fişleriniz', 'expenses.totalMonth': 'Bu ay toplam', 'expenses.addNew': 'Yeni gider ekle', 'expenses.noExpenses': 'Henüz gider yok', 'expenses.uploadFirst': 'Başlamak için ilk fişinizi yükleyin.', 'settings.title': 'Ayarlar', 'settings.subtitle': 'Hesabınızı ve aboneliğinizi yönetin', 'settings.accountInfo': 'Hesap bilgileri', 'settings.language': 'Dil', 'settings.languageLabel': 'Arayüz dili:', 'settings.subscription': 'Abonelik', 'settings.currentPlan': 'Mevcut plan', 'settings.upgrade': 'Yükselt', 'settings.contact': 'Sorularınız mı var? Bize ulaşın:', 'settings.free': 'Ücretsiz', 'settings.pro': 'Pro', 'settings.perMonth': '/ay', 'settings.feature1': 'Ayda 5 fatura', 'settings.feature2': '10 gider yüklemesi', 'settings.feature3': 'Temel PDF dışa aktarma', 'settings.feature4': 'Email desteği', 'settings.feature5': 'Sınırsız fatura', 'settings.feature6': 'Sınırsız gider', 'settings.feature7': 'Gelişmiş PDF şablonları', 'settings.feature8': 'Otomatik yedeklemeler', 'settings.feature9': 'Öncelikli destek', 'settings.feature10': 'Muhasebeciler için vergi dışa aktarma', 'common.save': 'Kaydet', 'common.cancel': 'İptal', 'common.delete': 'Sil', 'common.edit': 'Düzenle', 'common.euro': '€', 'toast.success': 'Başarılı', 'toast.error': 'Hata', 'actions.delete': 'Sil', 'actions.save': 'Kaydet', 'actions.cancel': 'İptal' },
  ar: { 'nav.dashboard': 'لوحة القيادة', 'nav.invoices': 'الفواتير', 'nav.expenses': 'المصروفات', 'nav.settings': 'الإعدادات', 'nav.logout': 'تسجيل الخروج', 'auth.login': 'تسجيل الدخول', 'auth.register': 'التسجيل', 'auth.email': 'البريد الإلكتروني', 'auth.password': 'كلمة المرور', 'auth.confirmPassword': 'تأكيد كلمة المرور', 'auth.companyName': 'اسم الشركة', 'auth.noAccount': 'ليس لديك حساب؟', 'auth.hasAccount': 'لديك حساب بالفعل؟', 'auth.welcome': 'مرحباً بعودتك', 'auth.createAccount': 'إنشاء حساب', 'auth.signInSubtitle': 'سجل دخولك إلى حسابك', 'auth.startToday': 'ابدأ اليوم', 'auth.loginSuccess': 'تم تسجيل الدخول بنجاح', 'auth.loginFailed': 'فشل تسجيل الدخول', 'auth.registerSuccess': 'تم التسجيل بنجاح', 'auth.registerFailed': 'فشل التسجيل', 'auth.welcomeMessage': 'مرحباً بك في InvoiceEasy!', 'auth.welcomeBack': 'مرحباً بعودتك!', 'auth.checkInputs': 'يرجى التحقق من المدخلات.', 'auth.error': 'خطأ', 'auth.errorOccurred': 'حدث خطأ.', 'auth.passwordsMismatch': 'كلمات المرور غير متطابقة', 'auth.checkPassword': 'يرجى التحقق من كلمة المرور.', 'dashboard.title': 'لوحة القيادة', 'dashboard.income': 'الدخل', 'dashboard.expenses': 'المصروفات', 'dashboard.profit': 'الربح', 'dashboard.thisMonth': 'هذا الشهر', 'dashboard.welcome': 'مرحباً', 'dashboard.quickActions': 'إجراءات سريعة', 'dashboard.monthlyOverview': 'نظرة عامة شهرية', 'dashboard.newInvoiceDesc': 'إنشاء فاتورة جديدة', 'dashboard.newExpenseDesc': 'إضافة مصروف', 'invoice.create': 'إنشاء فاتورة', 'invoice.customer': 'العميل', 'invoice.service': 'الخدمة', 'invoice.amount': 'المبلغ', 'invoice.date': 'التاريخ', 'invoice.generate': 'إنشاء PDF', 'invoice.subtitle': 'فاتورة جديدة للعملاء', 'invoice.legalNotice': 'إشعار قانوني:', 'invoice.legalText': 'سيتم وضع علامة على الفاتورة تلقائياً وفقاً لـ § 19 UStG.', 'invoice.creating': 'جاري إنشاء PDF...', 'invoice.created': 'تم إنشاء الفاتورة!', 'invoice.createdDesc': 'تم إنشاء الفاتورة بنجاح كملف PDF.', 'expenses.title': 'المصروفات', 'expenses.upload': '📸 تصوير الإيصال', 'expenses.uploadFile': 'تحميل ملف', 'expenses.amount': 'المبلغ (اختياري)', 'expenses.note': 'ملاحظة (اختياري)', 'expenses.save': 'حفظ', 'expenses.subtitle': 'قم بتحميل إيصالاتك', 'expenses.loadedSuccess': 'تم تحميل الإيصال بنجاح', 'expenses.saving': 'جاري الحفظ...', 'expenses.saved': 'تم حفظ المصروف!', 'expenses.savedDesc': 'تم تحميل الإيصال بنجاح.', 'expenses.noReceiptSelected': 'لم يتم تحديد إيصال', 'expenses.pleaseUpload': 'يرجى تحميل إيصال أو التقاط صورة.', 'expenses.list': 'إيصالاتك المحملة', 'expenses.totalMonth': 'الإجمالي هذا الشهر', 'expenses.addNew': 'إضافة مصروف جديد', 'expenses.noExpenses': 'لا توجد مصروفات حتى الآن', 'expenses.uploadFirst': 'قم بتحميل أول إيصال لك للبدء.', 'settings.title': 'الإعدادات', 'settings.subtitle': 'إدارة حسابك واشتراكك', 'settings.accountInfo': 'معلومات الحساب', 'settings.language': 'اللغة', 'settings.languageLabel': 'لغة الواجهة:', 'settings.subscription': 'الاشتراك', 'settings.currentPlan': 'الخطة الحالية', 'settings.upgrade': 'ترقية', 'settings.contact': 'هل لديك أسئلة؟ اتصل بنا على', 'settings.free': 'مجاني', 'settings.pro': 'احترافي', 'settings.perMonth': '/شهر', 'settings.feature1': '5 فواتير شهرياً', 'settings.feature2': '10 تحميلات للمصروفات', 'settings.feature3': 'تصدير PDF أساسي', 'settings.feature4': 'دعم عبر البريد الإلكتروني', 'settings.feature5': 'فواتير غير محدودة', 'settings.feature6': 'مصروفات غير محدودة', 'settings.feature7': 'قوالب PDF متقدمة', 'settings.feature8': 'نسخ احتياطية تلقائية', 'settings.feature9': 'دعم ذو أولوية', 'settings.feature10': 'تصدير ضريبي للمحاسبين', 'common.save': 'حفظ', 'common.cancel': 'إلغاء', 'common.delete': 'حذف', 'common.edit': 'تعديل', 'common.euro': '€', 'toast.success': 'نجاح', 'toast.error': 'خطأ', 'actions.delete': 'حذف', 'actions.save': 'حفظ', 'actions.cancel': 'إلغاء' },
  zh: { 'nav.dashboard': '仪表板', 'nav.invoices': '发票', 'nav.expenses': '支出', 'nav.settings': '设置', 'nav.logout': '登出', 'auth.login': '登录', 'auth.register': '注册', 'auth.email': '邮箱', 'auth.password': '密码', 'auth.confirmPassword': '确认密码', 'auth.companyName': '公司名称', 'auth.noAccount': '还没有账户？', 'auth.hasAccount': '已有账户？', 'auth.welcome': '欢迎回来', 'auth.createAccount': '创建账户', 'auth.signInSubtitle': '登录您的账户', 'auth.startToday': '今天开始', 'auth.loginSuccess': '登录成功', 'auth.loginFailed': '登录失败', 'auth.registerSuccess': '注册成功', 'auth.registerFailed': '注册失败', 'auth.welcomeMessage': '欢迎来到InvoiceEasy！', 'auth.welcomeBack': '欢迎回来！', 'auth.checkInputs': '请检查您的输入。', 'auth.error': '错误', 'auth.errorOccurred': '发生错误。', 'auth.passwordsMismatch': '密码不匹配', 'auth.checkPassword': '请检查您的密码。', 'dashboard.title': '仪表板', 'dashboard.income': '收入', 'dashboard.expenses': '支出', 'dashboard.profit': '利润', 'dashboard.thisMonth': '本月', 'dashboard.welcome': '欢迎', 'dashboard.quickActions': '快速操作', 'dashboard.monthlyOverview': '每月概览', 'dashboard.newInvoiceDesc': '创建新发票', 'dashboard.newExpenseDesc': '添加支出', 'invoice.create': '创建发票', 'invoice.customer': '客户', 'invoice.service': '服务', 'invoice.amount': '金额', 'invoice.date': '日期', 'invoice.generate': '生成PDF', 'invoice.subtitle': '客户的新发票', 'invoice.legalNotice': '法律声明：', 'invoice.legalText': '发票将根据§ 19 UStG自动标记。', 'invoice.creating': '正在创建PDF...', 'invoice.created': '发票已创建！', 'invoice.createdDesc': '发票已成功生成为PDF。', 'expenses.title': '支出', 'expenses.upload': '📸 拍摄收据', 'expenses.uploadFile': '上传文件', 'expenses.amount': '金额（可选）', 'expenses.note': '备注（可选）', 'expenses.save': '保存', 'expenses.subtitle': '上传您的收据', 'expenses.loadedSuccess': '收据加载成功', 'expenses.saving': '正在保存...', 'expenses.saved': '支出已保存！', 'expenses.savedDesc': '收据已成功上传。', 'expenses.noReceiptSelected': '未选择收据', 'expenses.pleaseUpload': '请上传收据或拍照。', 'expenses.list': '您上传的收据', 'expenses.totalMonth': '本月总计', 'expenses.addNew': '添加新支出', 'expenses.noExpenses': '尚无支出', 'expenses.uploadFirst': '上传您的第一张收据以开始。', 'settings.title': '设置', 'settings.subtitle': '管理您的账户和订阅', 'settings.accountInfo': '账户信息', 'settings.language': '语言', 'settings.languageLabel': '界面语言：', 'settings.subscription': '订阅', 'settings.currentPlan': '当前计划', 'settings.upgrade': '升级', 'settings.contact': '有问题吗？请联系我们：', 'settings.free': '免费', 'settings.pro': '专业版', 'settings.perMonth': '/月', 'settings.feature1': '每月5张发票', 'settings.feature2': '10次支出上传', 'settings.feature3': '基本PDF导出', 'settings.feature4': '电子邮件支持', 'settings.feature5': '无限发票', 'settings.feature6': '无限支出', 'settings.feature7': '高级PDF模板', 'settings.feature8': '自动备份', 'settings.feature9': '优先支持', 'settings.feature10': '会计师税务导出', 'common.save': '保存', 'common.cancel': '取消', 'common.delete': '删除', 'common.edit': '编辑', 'common.euro': '€', 'toast.success': '成功', 'toast.error': '错误', 'actions.delete': '删除', 'actions.save': '保存', 'actions.cancel': '取消' },
  ko: { 'nav.dashboard': '대시보드', 'nav.invoices': '인보이스', 'nav.expenses': '지출', 'nav.settings': '설정', 'nav.logout': '로그아웃', 'auth.login': '로그인', 'auth.register': '회원가입', 'auth.email': '이메일', 'auth.password': '비밀번호', 'auth.confirmPassword': '비밀번호 확인', 'auth.companyName': '회사명', 'auth.noAccount': '계정이 없으신가요?', 'auth.hasAccount': '이미 계정이 있으신가요?', 'auth.welcome': '다시 오신 것을 환영합니다', 'auth.createAccount': '계정 생성', 'auth.signInSubtitle': '계정에 로그인하세요', 'auth.startToday': '오늘 시작하세요', 'auth.loginSuccess': '로그인 성공', 'auth.loginFailed': '로그인 실패', 'auth.registerSuccess': '등록 성공', 'auth.registerFailed': '등록 실패', 'auth.welcomeMessage': 'InvoiceEasy에 오신 것을 환영합니다!', 'auth.welcomeBack': '다시 오신 것을 환영합니다!', 'auth.checkInputs': '입력 내용을 확인하세요.', 'auth.error': '오류', 'auth.errorOccurred': '오류가 발생했습니다.', 'auth.passwordsMismatch': '비밀번호가 일치하지 않습니다', 'auth.checkPassword': '비밀번호를 확인하세요.', 'dashboard.title': '대시보드', 'dashboard.income': '수입', 'dashboard.expenses': '지출', 'dashboard.profit': '이익', 'dashboard.thisMonth': '이번 달', 'dashboard.welcome': '환영합니다', 'dashboard.quickActions': '빠른 작업', 'dashboard.monthlyOverview': '월간 개요', 'dashboard.newInvoiceDesc': '새 인보이스 생성', 'dashboard.newExpenseDesc': '지출 추가', 'invoice.create': '인보이스 생성', 'invoice.customer': '고객', 'invoice.service': '서비스', 'invoice.amount': '금액', 'invoice.date': '날짜', 'invoice.generate': 'PDF 생성', 'invoice.subtitle': '고객을 위한 새 인보이스', 'invoice.legalNotice': '법적 고지:', 'invoice.legalText': '인보이스는 § 19 UStG에 따라 자동으로 표시됩니다.', 'invoice.creating': 'PDF 생성 중...', 'invoice.created': '인보이스가 생성되었습니다!', 'invoice.createdDesc': '인보이스가 PDF로 성공적으로 생성되었습니다.', 'expenses.title': '지출', 'expenses.upload': '📸 영수증 사진 찍기', 'expenses.uploadFile': '파일 업로드', 'expenses.amount': '금액 (선택사항)', 'expenses.note': '메모 (선택사항)', 'expenses.save': '저장', 'expenses.subtitle': '영수증 업로드', 'expenses.loadedSuccess': '영수증이 성공적으로 로드되었습니다', 'expenses.saving': '저장 중...', 'expenses.saved': '지출이 저장되었습니다!', 'expenses.savedDesc': '영수증이 성공적으로 업로드되었습니다.', 'expenses.noReceiptSelected': '영수증이 선택되지 않았습니다', 'expenses.pleaseUpload': '영수증을 업로드하거나 사진을 찍으세요.', 'expenses.list': '업로드된 영수증', 'expenses.totalMonth': '이번 달 총액', 'expenses.addNew': '새 지출 추가', 'expenses.noExpenses': '아직 지출이 없습니다', 'expenses.uploadFirst': '시작하려면 첫 번째 영수증을 업로드하세요.', 'settings.title': '설정', 'settings.subtitle': '계정 및 구독 관리', 'settings.accountInfo': '계정 정보', 'settings.language': '언어', 'settings.languageLabel': '인터페이스 언어:', 'settings.subscription': '구독', 'settings.currentPlan': '현재 플랜', 'settings.upgrade': '업그레이드', 'settings.contact': '질문이 있으신가요? 문의하세요:', 'settings.free': '무료', 'settings.pro': '프로', 'settings.perMonth': '/월', 'settings.feature1': '월 5개 인보이스', 'settings.feature2': '10개 지출 업로드', 'settings.feature3': '기본 PDF 내보내기', 'settings.feature4': '이메일 지원', 'settings.feature5': '무제한 인보이스', 'settings.feature6': '무제한 지출', 'settings.feature7': '고급 PDF 템플릿', 'settings.feature8': '자동 백업', 'settings.feature9': '우선 지원', 'settings.feature10': '회계사를 위한 세금 내보내기', 'common.save': '저장', 'common.cancel': '취소', 'common.delete': '삭제', 'common.edit': '편집', 'common.euro': '€', 'toast.success': '성공', 'toast.error': '오류', 'actions.delete': '삭제', 'actions.save': '저장', 'actions.cancel': '취소' },
  ja: { 'nav.dashboard': 'ダッシュボード', 'nav.invoices': '請求書', 'nav.expenses': '支出', 'nav.settings': '設定', 'nav.logout': 'ログアウト', 'auth.login': 'ログイン', 'auth.register': '登録', 'auth.email': 'メール', 'auth.password': 'パスワード', 'auth.confirmPassword': 'パスワード確認', 'auth.companyName': '会社名', 'auth.noAccount': 'アカウントをお持ちでない方？', 'auth.hasAccount': '既にアカウントをお持ちの方？', 'auth.welcome': 'おかえりなさい', 'auth.createAccount': 'アカウント作成', 'auth.signInSubtitle': 'アカウントにログイン', 'auth.startToday': '今日から始める', 'auth.loginSuccess': 'ログイン成功', 'auth.loginFailed': 'ログイン失敗', 'auth.registerSuccess': '登録成功', 'auth.registerFailed': '登録失敗', 'auth.welcomeMessage': 'InvoiceEasyへようこそ！', 'auth.welcomeBack': 'おかえりなさい！', 'auth.checkInputs': '入力内容を確認してください。', 'auth.error': 'エラー', 'auth.errorOccurred': 'エラーが発生しました。', 'auth.passwordsMismatch': 'パスワードが一致しません', 'auth.checkPassword': 'パスワードを確認してください。', 'dashboard.title': 'ダッシュボード', 'dashboard.income': '収入', 'dashboard.expenses': '支出', 'dashboard.profit': '利益', 'dashboard.thisMonth': '今月', 'dashboard.welcome': 'ようこそ', 'dashboard.quickActions': 'クイックアクション', 'dashboard.monthlyOverview': '月次概要', 'dashboard.newInvoiceDesc': '新しい請求書を作成', 'dashboard.newExpenseDesc': '支出を追加', 'invoice.create': '請求書作成', 'invoice.customer': '顧客', 'invoice.service': 'サービス', 'invoice.amount': '金額', 'invoice.date': '日付', 'invoice.generate': 'PDF生成', 'invoice.subtitle': '顧客向けの新しい請求書', 'invoice.legalNotice': '法的通知：', 'invoice.legalText': '請求書は§ 19 UStGに従って自動的にマークされます。', 'invoice.creating': 'PDF作成中...', 'invoice.created': '請求書が作成されました！', 'invoice.createdDesc': '請求書がPDFとして正常に生成されました。', 'expenses.title': '支出', 'expenses.upload': '📸 レシート写真を撮る', 'expenses.uploadFile': 'ファイルをアップロード', 'expenses.amount': '金額（任意）', 'expenses.note': 'メモ（任意）', 'expenses.save': '保存', 'expenses.subtitle': 'レシートをアップロード', 'expenses.loadedSuccess': 'レシートが正常にロードされました', 'expenses.saving': '保存中...', 'expenses.saved': '支出が保存されました！', 'expenses.savedDesc': 'レシートが正常にアップロードされました。', 'expenses.noReceiptSelected': 'レシートが選択されていません', 'expenses.pleaseUpload': 'レシートをアップロードするか写真を撮ってください。', 'expenses.list': 'アップロードされたレシート', 'expenses.totalMonth': '今月の合計', 'expenses.addNew': '新しい支出を追加', 'expenses.noExpenses': 'まだ支出がありません', 'expenses.uploadFirst': '最初のレシートをアップロードして始めましょう。', 'settings.title': '設定', 'settings.subtitle': 'アカウントとサブスクリプションを管理', 'settings.accountInfo': 'アカウント情報', 'settings.language': '言語', 'settings.languageLabel': 'インターフェース言語：', 'settings.subscription': 'サブスクリプション', 'settings.currentPlan': '現在のプラン', 'settings.upgrade': 'アップグレード', 'settings.contact': 'ご質問がありますか？お問い合わせください：', 'settings.free': '無料', 'settings.pro': 'プロ', 'settings.perMonth': '/月', 'settings.feature1': '月5件の請求書', 'settings.feature2': '10件の支出アップロード', 'settings.feature3': '基本PDF エクスポート', 'settings.feature4': 'メールサポート', 'settings.feature5': '無制限の請求書', 'settings.feature6': '無制限の支出', 'settings.feature7': '高度なPDFテンプレート', 'settings.feature8': '自動バックアップ', 'settings.feature9': '優先サポート', 'settings.feature10': '会計士向け税務エクスポート', 'common.save': '保存', 'common.cancel': 'キャンセル', 'common.delete': '削除', 'common.edit': '編集', 'common.euro': '€', 'toast.success': '成功', 'toast.error': 'エラー', 'actions.delete': '削除', 'actions.save': '保存', 'actions.cancel': 'キャンセル' },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Load from localStorage or default to German
    const saved = localStorage.getItem('invoice-language');
    return (saved as Language) || 'de';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('invoice-language', lang);
    // Update document direction for RTL languages
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  // Set initial direction
  React.useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] ?? translations.en[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
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
