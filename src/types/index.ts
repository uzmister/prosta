export type Language = 'uz' | 'en' | 'ru';
export type Theme = 'dark' | 'light';

export interface Author {
  name: string;
  handle: string;
  avatar: string;
  verified?: boolean;
}

export interface ComponentItem {
  id: string;
  title: string;
  slug: string;
  description: {
    uz: string;
    en: string;
    ru: string;
  };
  category: string;
  tags: string[];
  code: string;
  cssCode?: string;
  previewType: string;
  author: Author;
  upvotes: number;
  views: number;
  copies: number;
  isPro: boolean;
  dependencies: string[];
  cliCommand: string;
  dateAdded: string;
}

export interface CategoryItem {
  id: string;
  key: string;
  name: {
    uz: string;
    en: string;
    ru: string;
  };
  icon: string;
  count?: number;
}

export interface PaymentPlan {
  id: string;
  name: {
    uz: string;
    en: string;
    ru: string;
  };
  price: number;
  interval: 'month' | 'year' | 'one-time';
  description: {
    uz: string;
    en: string;
    ru: string;
  };
  features: {
    uz: string[];
    en: string[];
    ru: string[];
  };
  popular?: boolean;
  stripePriceId: string;
}

export interface Transaction {
  id: string;
  customerName: string;
  email: string;
  cardBrand: 'visa' | 'mastercard' | 'amex';
  last4: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'refunded';
  date: string;
  planName: string;
  receiptUrl?: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: {
    uz: string;
    en: string;
    ru: string;
  };
  description: {
    uz: string;
    en: string;
    ru: string;
  };
  primaryColor: string;
  accentName: string;
  stripePublicKey: string;
  stripeSecretKey: string;
  stripeWebhookSecret: string;
  stripeCurrency: string;
  testMode: boolean;
  enableVisaPayments: boolean;
  require3dSecure: boolean;
  bannerVisible: boolean;
  bannerText: {
    uz: string;
    en: string;
    ru: string;
  };
  githubUrl: string;
  twitterUrl: string;
  discordUrl: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user';
  isPro: boolean;
  proPlan?: string;
  proSince?: string;
}
