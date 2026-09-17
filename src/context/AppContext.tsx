import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Language, 
  Theme, 
  ComponentItem, 
  CategoryItem, 
  PaymentPlan, 
  Transaction, 
  SiteSettings, 
  User 
} from '../types';
import { 
  initialCategories, 
  initialComponents, 
  initialPricingPlans, 
  initialTransactions, 
  initialSiteSettings, 
  initialCurrentUser 
} from '../data/initialData';
import { translations } from '../i18n/translations';

interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['uz'];
  theme: Theme;
  toggleTheme: () => void;
  
  // Data
  components: ComponentItem[];
  categories: CategoryItem[];
  siteSettings: SiteSettings;
  plans: PaymentPlan[];
  transactions: Transaction[];
  currentUser: User;
  
  // Handlers
  addComponent: (item: Omit<ComponentItem, 'id' | 'views' | 'copies' | 'upvotes' | 'dateAdded'>) => void;
  updateComponent: (id: string, updated: Partial<ComponentItem>) => void;
  deleteComponent: (id: string) => void;
  upvoteComponent: (id: string) => void;
  recordCopy: (id: string) => void;
  
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  updatePlans: (newPlans: PaymentPlan[]) => void;
  processPayment: (plan: PaymentPlan, cardDetails: { cardNumber: string; cardHolder: string }) => Promise<{ success: boolean; transactionId: string }>;
  
  // UI states
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  
  selectedComponentModal: ComponentItem | null;
  setSelectedComponentModal: (comp: ComponentItem | null) => void;
  checkoutModalPlan: PaymentPlan | null;
  setCheckoutModalPlan: (plan: PaymentPlan | null) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAddCompModalOpen: boolean;
  setIsAddCompModalOpen: (open: boolean) => void;
  isPricingModalOpen: boolean;
  setIsPricingModalOpen: (open: boolean) => void;

  toasts: ToastState[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Language
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('prosta_lang');
    return (saved === 'uz' || saved === 'en' || saved === 'ru') ? saved : 'uz';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('prosta_lang', lang);
  };

  const t = translations[language];

  // 2. Theme (Dark / Light)
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('prosta_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('prosta_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // 3. Components
  const [components, setComponents] = useState<ComponentItem[]>(() => {
    const saved = localStorage.getItem('prosta_components');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse components', e);
      }
    }
    return initialComponents;
  });

  useEffect(() => {
    localStorage.setItem('prosta_components', JSON.stringify(components));
  }, [components]);

  // 4. Categories
  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    const saved = localStorage.getItem('prosta_categories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse categories', e);
      }
    }
    return initialCategories;
  });

  useEffect(() => {
    localStorage.setItem('prosta_categories', JSON.stringify(categories));
  }, [categories]);

  // 5. Site Settings
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('prosta_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse settings', e);
      }
    }
    return initialSiteSettings;
  });

  useEffect(() => {
    localStorage.setItem('prosta_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  // 6. Pricing Plans
  const [plans, setPlans] = useState<PaymentPlan[]>(() => {
    const saved = localStorage.getItem('prosta_plans');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse plans', e);
      }
    }
    return initialPricingPlans;
  });

  useEffect(() => {
    localStorage.setItem('prosta_plans', JSON.stringify(plans));
  }, [plans]);

  // 7. Transactions
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('prosta_transactions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse transactions', e);
      }
    }
    return initialTransactions;
  });

  useEffect(() => {
    localStorage.setItem('prosta_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // 8. User state
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('prosta_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse user', e);
      }
    }
    return initialCurrentUser;
  });

  useEffect(() => {
    localStorage.setItem('prosta_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('trending');
  const [selectedComponentModal, setSelectedComponentModal] = useState<ComponentItem | null>(null);
  const [checkoutModalPlan, setCheckoutModalPlan] = useState<PaymentPlan | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAddCompModalOpen, setIsAddCompModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  // Component Actions
  const addComponent = (item: Omit<ComponentItem, 'id' | 'views' | 'copies' | 'upvotes' | 'dateAdded'>) => {
    const newId = `comp-${Date.now()}`;
    const newItem: ComponentItem = {
      ...item,
      id: newId,
      views: 1,
      copies: 0,
      upvotes: 1,
      dateAdded: new Date().toISOString().split('T')[0],
    };
    setComponents(prev => [newItem, ...prev]);
    showToast(language === 'uz' ? "Komponent muvaffaqiyatli qo'shildi!" : language === 'ru' ? "Компонент успешно добавлен!" : "Component added successfully!", 'success');
  };

  const updateComponent = (id: string, updated: Partial<ComponentItem>) => {
    setComponents(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
    showToast(language === 'uz' ? "Komponent yangilandi!" : language === 'ru' ? "Компонент обновлен!" : "Component updated!", 'success');
  };

  const deleteComponent = (id: string) => {
    setComponents(prev => prev.filter(c => c.id !== id));
    showToast(language === 'uz' ? "Komponent o'chirildi!" : language === 'ru' ? "Компонент удален!" : "Component deleted!", 'info');
  };

  const upvoteComponent = (id: string) => {
    setComponents(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, upvotes: c.upvotes + 1 };
      }
      return c;
    }));
    showToast(language === 'uz' ? "Yoqdi belgilandi! ❤️" : language === 'ru' ? "Понравилось! ❤️" : "Upvoted! ❤️", 'success');
  };

  const recordCopy = (id: string) => {
    setComponents(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, copies: c.copies + 1 };
      }
      return c;
    }));
  };

  const updateSiteSettings = (newSettings: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...newSettings }));
    showToast(language === 'uz' ? "Sayt sozlamalari saqlandi!" : language === 'ru' ? "Настройки сайта сохранены!" : "Site settings saved!", 'success');
  };

  const updatePlans = (newPlans: PaymentPlan[]) => {
    setPlans(newPlans);
    showToast(language === 'uz' ? "Tariflar saqlandi!" : language === 'ru' ? "Тарифные планы сохранены!" : "Plans updated!", 'success');
  };

  // Visa & Stripe payment processing simulation
  const processPayment = async (plan: PaymentPlan, cardDetails: { cardNumber: string; cardHolder: string }): Promise<{ success: boolean; transactionId: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cleanCard = cardDetails.cardNumber.replace(/\s+/g, '');
        const last4 = cleanCard.length >= 4 ? cleanCard.slice(-4) : '4242';
        const txId = `tx_${Date.now()}_visa_${last4}`;
        
        const now = new Date();
        const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        const newTx: Transaction = {
          id: txId,
          customerName: cardDetails.cardHolder || 'Pro Developer',
          email: currentUser.email,
          cardBrand: 'visa',
          last4: last4,
          amount: plan.price,
          currency: siteSettings.stripeCurrency || 'USD',
          status: 'succeeded',
          date: dateStr,
          planName: plan.name[language] || plan.name.en,
        };

        setTransactions(prev => [newTx, ...prev]);

        // Upgrade current user to Pro
        setCurrentUser(prev => ({
          ...prev,
          isPro: true,
          proPlan: plan.name.en,
          proSince: dateStr,
        }));

        resolve({ success: true, transactionId: txId });
      }, 1600);
    });
  };

  const resetAllData = () => {
    localStorage.removeItem('prosta_components');
    localStorage.removeItem('prosta_categories');
    localStorage.removeItem('prosta_settings');
    localStorage.removeItem('prosta_plans');
    localStorage.removeItem('prosta_transactions');
    localStorage.removeItem('prosta_user');
    
    setComponents(initialComponents);
    setCategories(initialCategories);
    setSiteSettings(initialSiteSettings);
    setPlans(initialPricingPlans);
    setTransactions(initialTransactions);
    setCurrentUser(initialCurrentUser);
    
    showToast(language === 'uz' ? "Barcha ma'lumotlar qayta tiklandi!" : language === 'ru' ? "Данные успешно сброшены!" : "Reset to default data!", 'info');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        theme,
        toggleTheme,
        components,
        categories,
        siteSettings,
        plans,
        transactions,
        currentUser,
        addComponent,
        updateComponent,
        deleteComponent,
        upvoteComponent,
        recordCopy,
        updateSiteSettings,
        updatePlans,
        processPayment,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedTag,
        setSelectedTag,
        sortBy,
        setSortBy,
        selectedComponentModal,
        setSelectedComponentModal,
        checkoutModalPlan,
        setCheckoutModalPlan,
        isAdminOpen,
        setIsAdminOpen,
        isAddCompModalOpen,
        setIsAddCompModalOpen,
        isPricingModalOpen,
        setIsPricingModalOpen,
        toasts,
        showToast,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
