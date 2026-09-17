import { ComponentItem, CategoryItem, PaymentPlan, Transaction, SiteSettings, User } from '../types';

export const initialCategories: CategoryItem[] = [
  { id: 'all', key: 'cat_all', name: { uz: 'Barchasi', en: 'All', ru: 'Все' }, icon: 'Layers' },
  { id: 'buttons', key: 'cat_buttons', name: { uz: 'Tugmalar', en: 'Buttons', ru: 'Кнопки' }, icon: 'MousePointer' },
  { id: 'cards', key: 'cat_cards', name: { uz: 'Kartalar', en: 'Cards', ru: 'Карточки' }, icon: 'CreditCard' },
  { id: 'inputs', key: 'cat_inputs', name: { uz: 'Kiritish maydonlari', en: 'Inputs', ru: 'Поля ввода' }, icon: 'Type' },
  { id: 'navbars', key: 'cat_navbars', name: { uz: 'Navigatsiya', en: 'Navigation', ru: 'Навигация' }, icon: 'Navigation' },
  { id: 'hero', key: 'cat_hero', name: { uz: 'Hero seksiyalar', en: 'Hero Sections', ru: 'Главный экран' }, icon: 'Sparkles' },
  { id: 'badges', key: 'cat_badges', name: { uz: 'Nishonlar (Badges)', en: 'Badges & Pills', ru: 'Бейджи и метки' }, icon: 'Tag' },
  { id: 'modals', key: 'cat_modals', name: { uz: 'Modallar', en: 'Modals', ru: 'Модальные окна' }, icon: 'Maximize2' },
  { id: 'metrics', key: 'cat_metrics', name: { uz: 'Metrikalar', en: 'Metrics & Charts', ru: 'Метрики и Графики' }, icon: 'BarChart' },
  { id: 'terminal', key: 'cat_terminal', name: { uz: 'Terminallar', en: 'Terminals', ru: 'Терминалы' }, icon: 'Terminal' },
];

export const initialComponents: ComponentItem[] = [
  {
    id: 'comp-1',
    title: 'Shimmer Neon Button',
    slug: 'shimmer-neon-button',
    description: {
      uz: 'Aylanuvchi konik gradient va porlash effekti bilan jihozlangan interaktiv tugma.',
      en: 'A high-impact interactive button with rotating conic gradient border and hover neon glow.',
      ru: 'Интерактивная кнопка с вращающимся коническим градиентом и неоновым свечением при наведении.'
    },
    category: 'buttons',
    tags: ['Tailwind', 'CSS Animation', 'Buttons', 'Glow'],
    previewType: 'shimmer-button',
    author: {
      name: 'Shadman UI',
      handle: '@shadman',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      verified: true
    },
    upvotes: 842,
    views: 4210,
    copies: 1320,
    isPro: false,
    dependencies: ['lucide-react', 'clsx', 'tailwind-merge'],
    cliCommand: 'npx prosta@latest add shimmer-button',
    dateAdded: '2026-08-10',
    code: `import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const ShimmerButton = ({ text = "Explore Components" }: { text?: string }) => {
  return (
    <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl p-[2px] font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20">
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#2563eb_0%,#93c5fd_50%,#2563eb_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[10px] bg-neutral-950 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-3xl transition-all duration-300 group-hover:bg-neutral-900/90 gap-2">
        <Sparkles className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform" />
        {text}
        <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
      </span>
    </button>
  );
};`
  },
  {
    id: 'comp-2',
    title: 'Glassmorphism Pricing Card',
    slug: 'glassmorphism-pricing-card',
    description: {
      uz: 'Zamonaviy shisha effekti (backdrop-blur) va oylik/yillik to\'lov tugmasiga ega narx kartasi.',
      en: 'Modern frosted glass pricing card with animated monthly/yearly switch and perk checkmarks.',
      ru: 'Премиум карточка тарифов с эффектом матового стекла, переключателем периода и списком фич.'
    },
    category: 'cards',
    tags: ['Tailwind', 'Glassmorphism', 'Pricing', 'Cards'],
    previewType: 'glass-pricing',
    author: {
      name: 'Elena Rostova',
      handle: '@erostova',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      verified: true
    },
    upvotes: 1120,
    views: 6850,
    copies: 2045,
    isPro: true,
    dependencies: ['lucide-react'],
    cliCommand: 'npx prosta@latest add glass-pricing',
    dateAdded: '2026-08-14',
    code: `import React, { useState } from 'react';
import { Check } from 'lucide-react';

export const GlassPricingCard = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="w-full max-w-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xl p-5 shadow-xl transition-all hover:border-blue-500/50">
      <div className="flex justify-between items-center mb-3">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
          PRO PLAN
        </span>
        <button
          onClick={() => setIsYearly(!isYearly)}
          className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-blue-500 flex items-center gap-1 font-medium"
        >
          {isYearly ? 'Yearly (-20%)' : 'Monthly'}
        </button>
      </div>

      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-3xl font-extrabold text-neutral-900 dark:text-white">
          {isYearly ? '$149' : '$19'}
        </span>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          {isYearly ? '/year' : '/month'}
        </span>
      </div>

      <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-4">
        Full access to 100+ production-ready interactive components.
      </p>

      <div className="space-y-2 mb-4 text-xs">
        {['All PRO UI Components', 'Full TSX & Tailwind Source', 'Commercial License', 'Discord VIP Access'].map((f, i) => (
          <div key={i} className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
            <Check className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
            <span>{f}</span>
          </div>
        ))}
      </div>

      <button className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-md shadow-blue-500/25 transition-all">
        Get Started with Visa
      </button>
    </div>
  );
};`
  },
  {
    id: 'comp-3',
    title: 'Spotlight Search Input',
    slug: 'spotlight-search-input',
    description: {
      uz: 'Sichqoncha harakatini kuzatib boruvchi yorug\'lik (spotlight) va klaviatura yorlig\'iga ega qidiruv maydoni.',
      en: 'Search input with dynamic cursor spotlight tracking effect and native shortcut badge.',
      ru: 'Инпут поиска с динамическим световым пятном, следующим за курсором, и хоткеем ⌘K.'
    },
    category: 'inputs',
    tags: ['Tailwind', 'Inputs', 'Spotlight', 'Search'],
    previewType: 'spotlight-input',
    author: {
      name: 'Alex Rivera',
      handle: '@arivera',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      verified: true
    },
    upvotes: 954,
    views: 5310,
    copies: 1740,
    isPro: false,
    dependencies: ['lucide-react'],
    cliCommand: 'npx prosta@latest add spotlight-input',
    dateAdded: '2026-08-16',
    code: `import React, { useState, useRef } from 'react';
import { Search, X } from 'lucide-react';

export const SpotlightInput = () => {
  const [query, setQuery] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-sm rounded-xl p-[1px] overflow-hidden group transition-all"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: \`radial-gradient(200px circle at \${mousePos.x}px \${mousePos.y}px, rgba(37,99,235,0.4), transparent 80%)\`,
        }}
      />
      <div className="relative flex items-center bg-white dark:bg-neutral-900 rounded-xl px-3 py-2 border border-neutral-200 dark:border-neutral-800">
        <Search className="w-4 h-4 text-neutral-400 mr-2 flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Spotlight search components..."
          className="w-full bg-transparent text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none"
        />
        <kbd className="hidden sm:inline-flex items-center rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 text-[10px] font-mono text-neutral-500">
          ⌘K
        </kbd>
      </div>
    </div>
  );
};`
  },
  {
    id: 'comp-4',
    title: 'Floating Island Navigation',
    slug: 'floating-island-navbar',
    description: {
      uz: 'Ekran pastida yoki tepasida suzuvchi, faol element ko\'rsatkichiga ega orolcha navigatsiya paneli.',
      en: 'MacOS dock-style floating navigation pill with glowing active tabs and blur backdrop.',
      ru: 'Плавающая навигационная панель в стиле macOS dock с эффектом размытия и плавной анимацией.'
    },
    category: 'navbars',
    tags: ['Tailwind', 'Navigation', 'Dock', 'Blur'],
    previewType: 'floating-island',
    author: {
      name: 'Timur Aliyev',
      handle: '@taliyev',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      verified: true
    },
    upvotes: 1240,
    views: 7420,
    copies: 2890,
    isPro: false,
    dependencies: ['lucide-react'],
    cliCommand: 'npx prosta@latest add floating-nav',
    dateAdded: '2026-08-18',
    code: `import React, { useState } from 'react';
import { Home, Layers, BarChart3, Settings, User } from 'lucide-react';

export const FloatingIslandNav = () => {
  const [activeTab, setActiveTab] = useState('components');
  const items = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'components', icon: Layers, label: 'Components' },
    { id: 'stats', icon: BarChart3, label: 'Metrics' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="flex items-center gap-1 p-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 shadow-2xl backdrop-blur-xl">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={\`relative px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 \${
              isActive
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
            }\`}
          >
            <Icon className="w-3.5 h-3.5" />
            {isActive && <span className="text-[11px] font-medium">{item.label}</span>}
          </button>
        );
      })}
    </nav>
  );
};`
  },
  {
    id: 'comp-5',
    title: 'Bento Feature Grid Box',
    slug: 'bento-feature-grid',
    description: {
      uz: 'Zamonaviy Apple va Linear uslubidagi bento kartalar to\'plami (CLI, tezlik va TypeScript).',
      en: 'Apple and Linear inspired Bento layout with animated CLI snippet and live metric badges.',
      ru: 'Бенто-сетка в стиле Apple и Linear с анимированным CLI и бейджами высокой производительности.'
    },
    category: 'cards',
    tags: ['Tailwind', 'Bento', 'Features', 'Grid'],
    previewType: 'bento-grid',
    author: {
      name: 'Sarah Jenkins',
      handle: '@sjenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      verified: true
    },
    upvotes: 1450,
    views: 8900,
    copies: 3120,
    isPro: true,
    dependencies: ['lucide-react'],
    cliCommand: 'npx prosta@latest add bento-grid',
    dateAdded: '2026-08-20',
    code: `import React from 'react';
import { Terminal, Zap, ShieldCheck } from 'lucide-react';

export const BentoFeatureGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-2.5 w-full max-w-sm p-2 text-left">
      <div className="col-span-2 rounded-xl bg-neutral-100 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 p-3.5 relative overflow-hidden group">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
          <span className="text-[10px] uppercase tracking-wider font-mono text-blue-600 dark:text-blue-400 font-bold">
            Interactive CLI
          </span>
        </div>
        <h4 className="text-xs font-bold text-neutral-900 dark:text-white mb-1">
          Direct Terminal Addition
        </h4>
        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
          npx prosta@latest add button
        </p>
      </div>

      <div className="rounded-xl bg-neutral-100 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 p-3">
        <div className="flex items-center justify-between mb-1">
          <Zap className="w-4 h-4 text-amber-500" />
          <span className="text-[10px] font-mono text-green-500 font-bold">+99.9%</span>
        </div>
        <div className="text-base font-bold text-neutral-900 dark:text-white">0.2ms</div>
        <div className="text-[10px] text-neutral-400">Zero Runtime Overhead</div>
      </div>

      <div className="rounded-xl bg-neutral-100 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 p-3">
        <div className="flex items-center justify-between mb-1">
          <ShieldCheck className="w-4 h-4 text-blue-500" />
          <span className="text-[10px] font-mono text-blue-400 font-bold">100%</span>
        </div>
        <div className="text-base font-bold text-neutral-900 dark:text-white">TypeScript</div>
        <div className="text-[10px] text-neutral-400">Strict Types Ready</div>
      </div>
    </div>
  );
};`
  },
  {
    id: 'comp-6',
    title: 'Magnetic Spring Button',
    slug: 'magnetic-spring-button',
    description: {
      uz: 'Kursor yaqinlashganda unga magnitdek tortiluvchi silliq fizik animatsiyali tugma.',
      en: 'Physics-based magnetic button that pulls towards cursor with organic dampening effect.',
      ru: 'Магнитная кнопка с физической пружинной анимацией, притягивающаяся к курсору.'
    },
    category: 'buttons',
    tags: ['Tailwind', 'Physics', 'Buttons', 'Motion'],
    previewType: 'magnetic-button',
    author: {
      name: 'Michael Chen',
      handle: '@mchen',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
      verified: true
    },
    upvotes: 780,
    views: 3950,
    copies: 980,
    isPro: false,
    dependencies: ['lucide-react'],
    cliCommand: 'npx prosta@latest add magnetic-button',
    dateAdded: '2026-08-22',
    code: `import React, { useState, useRef } from 'react';
import { Flame } from 'lucide-react';

export const MagneticButton = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setOffset({
      x: (e.clientX - centerX) * 0.35,
      y: (e.clientY - centerY) * 0.35,
    });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: \`translate(\${offset.x}px, \${offset.y}px)\`,
        transition: offset.x === 0 ? 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none',
      }}
      className="px-6 py-2.5 rounded-full bg-blue-600 text-white text-xs font-semibold shadow-lg shadow-blue-500/30 hover:bg-blue-500 active:scale-95 flex items-center gap-2"
    >
      <Flame className="w-4 h-4 text-yellow-300" />
      Magnetic Pull
    </button>
  );
};`
  },
  {
    id: 'comp-7',
    title: 'Animated Gradient Border Card',
    slug: 'animated-gradient-border-card',
    description: {
      uz: 'Aylanuvchi 360 darajali ko\'k va binafsha nurli chegaraga ega futuristik karta.',
      en: 'Conic gradient rotating border card with crisp dark styling and smooth infinite animation.',
      ru: 'Карточка с бесконечно вращающимся градиентным неоновым контуром.'
    },
    category: 'cards',
    tags: ['Tailwind', 'CSS Border', 'Gradient', 'Glow'],
    previewType: 'animated-gradient',
    author: {
      name: 'Shadman UI',
      handle: '@shadman',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      verified: true
    },
    upvotes: 1390,
    views: 7800,
    copies: 2650,
    isPro: false,
    dependencies: [],
    cliCommand: 'npx prosta@latest add animated-gradient-card',
    dateAdded: '2026-08-25',
    code: `import React from 'react';

export const AnimatedGradientCard = () => {
  return (
    <div className="relative p-[1.5px] overflow-hidden rounded-2xl w-full max-w-xs shadow-xl">
      <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,#2563eb_0%,#38bdf8_30%,#a855f7_60%,#2563eb_100%)]" />
      <div className="relative rounded-2xl bg-white dark:bg-neutral-950 p-4 border border-neutral-100 dark:border-neutral-900">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-blue-500/10 text-blue-500 font-bold">
            CONIC BORDER
          </span>
          <span className="text-[10px] text-neutral-400">360° Motion</span>
        </div>
        <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-1">
          Neon Conic Gradient
        </h4>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
          Smooth CSS border beam animation without any external heavy libraries.
        </p>
      </div>
    </div>
  );
};`
  },
  {
    id: 'comp-8',
    title: 'Retro Grid 3D Hero Wireframe',
    slug: 'retro-grid-hero',
    description: {
      uz: 'Sayberpank uslubidagi 3D perspektivali to\'rli pol foni va porlovchi sarlavha.',
      en: 'Cyberpunk style 3D perspective floor grid with radial ambient glow and headline.',
      ru: '3D перспектива ретро-сетки в стиле киберпанк с радиальным свечением для главного экрана.'
    },
    category: 'hero',
    tags: ['Tailwind', '3D Grid', 'Hero', 'Background'],
    previewType: 'retro-grid',
    author: {
      name: 'Otabek Mirzayev',
      handle: '@otabek_m',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      verified: true
    },
    upvotes: 1890,
    views: 11400,
    copies: 4200,
    isPro: true,
    dependencies: ['lucide-react'],
    cliCommand: 'npx prosta@latest add retro-grid',
    dateAdded: '2026-08-28',
    code: `import React from 'react';
import { Sparkles } from 'lucide-react';

export const RetroGridHero = () => {
  return (
    <div className="relative w-full h-48 overflow-hidden rounded-xl bg-neutral-950 flex flex-col items-center justify-center border border-neutral-800">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: \`
            linear-gradient(to right, rgba(37, 99, 235, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(37, 99, 235, 0.3) 1px, transparent 1px)
          \`,
          backgroundSize: '24px 24px',
          transform: 'perspective(200px) rotateX(60deg) translateY(-20px)',
          transformOrigin: 'top center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950 pointer-events-none" />
      <div className="relative z-10 text-center px-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono mb-2">
          <Sparkles className="w-3 h-3" /> Cyberpunk Grid
        </div>
        <h3 className="text-base font-extrabold text-white tracking-tight">
          Next-Gen UI Architecture
        </h3>
      </div>
    </div>
  );
};`
  },
  {
    id: 'comp-9',
    title: 'Live Metrics Counter Card',
    slug: 'live-metrics-counter-card',
    description: {
      uz: 'Har bir necha soniyada yangilanuvchi jonli hisoblagich va mini grafik ustunlari.',
      en: 'Real-time animated counter with dynamic mini sparkline bars and growth indicator.',
      ru: 'Карточка живой аналитики с авто-инкрементом счетчика и динамическим графиком активности.'
    },
    category: 'metrics',
    tags: ['Tailwind', 'Metrics', 'Live Data', 'Charts'],
    previewType: 'live-metrics',
    author: {
      name: 'Dmitry Ivanov',
      handle: '@divanov',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
      verified: true
    },
    upvotes: 910,
    views: 4890,
    copies: 1530,
    isPro: false,
    dependencies: ['lucide-react'],
    cliCommand: 'npx prosta@latest add live-metrics',
    dateAdded: '2026-09-01',
    code: `import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

export const LiveMetricsCard = () => {
  const [count, setCount] = useState(48290);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xs rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 shadow-lg">
      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1">
        <span>Component API Requests</span>
        <span className="flex items-center gap-1 text-emerald-500 font-semibold text-[11px]">
          <TrendingUp className="w-3 h-3" /> +24.8%
        </span>
      </div>
      <div className="text-2xl font-black text-neutral-900 dark:text-white font-mono tracking-tight mb-2">
        {count.toLocaleString()}
      </div>
      <div className="flex items-end gap-1 h-8 pt-1">
        {[40, 65, 45, 80, 55, 90, 75, 100, 85, 95].map((h, i) => (
          <div
            key={i}
            style={{ height: \`\${h}%\` }}
            className="flex-1 bg-blue-500/30 hover:bg-blue-500 transition-colors rounded-sm"
          />
        ))}
      </div>
    </div>
  );
};`
  },
  {
    id: 'comp-10',
    title: 'Interactive 6-Digit OTP Pin Input',
    slug: 'otp-pin-input',
    description: {
      uz: 'Avtomatik keyingi katakka o\'tish va xavfsiz tasdiqlash uchun 6 xonali PIN kiritish.',
      en: 'Sleek 6-digit OTP code verification input with auto-advance and backspace handling.',
      ru: '6-значный инпут для ввода OTP / SMS кода с автопереходом и поддержкой клавиши Backspace.'
    },
    category: 'inputs',
    tags: ['Tailwind', 'Inputs', 'OTP', 'Forms'],
    previewType: 'otp-input',
    author: {
      name: 'Timur Aliyev',
      handle: '@taliyev',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      verified: true
    },
    upvotes: 670,
    views: 3120,
    copies: 890,
    isPro: false,
    dependencies: [],
    cliCommand: 'npx prosta@latest add otp-input',
    dateAdded: '2026-09-03',
    code: `import React, { useState, useRef } from 'react';

export const OtpPinInput = () => {
  const [otp, setOtp] = useState(['4', '2', '4', '', '', '']);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (val: string, index: number) => {
    if (!/^\\d*$/.test(val)) return;
    const next = [...otp];
    next[index] = val.slice(-1);
    setOtp(next);
    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex gap-2">
        {otp.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => (inputsRef.current[idx] = el)}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className="w-8 h-10 text-center font-mono text-sm font-bold rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
          />
        ))}
      </div>
    </div>
  );
};`
  },
  {
    id: 'comp-11',
    title: 'Minimalist Dark/Light Mode Toggle Switch',
    slug: 'dark-toggle-switch',
    description: {
      uz: 'Quyosh va oy piktogrammalariga ega nafis silliq rejim almashtiruvchi tugma.',
      en: 'Smooth sliding day & night theme switcher switch with animated sun and moon icons.',
      ru: 'Минималистичный переключатель темной и светлой темы с анимированными иконками солнца и луны.'
    },
    category: 'buttons',
    tags: ['Tailwind', 'Theme', 'Toggle', 'Dark Mode'],
    previewType: 'dark-toggle',
    author: {
      name: 'Alex Rivera',
      handle: '@arivera',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      verified: true
    },
    upvotes: 1540,
    views: 8200,
    copies: 3840,
    isPro: false,
    dependencies: ['lucide-react'],
    cliCommand: 'npx prosta@latest add dark-toggle',
    dateAdded: '2026-09-05',
    code: `import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const DarkToggleSwitch = () => {
  const [isDark, setIsDark] = useState(true);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className={\`relative w-14 h-8 rounded-full p-1 transition-colors duration-300 \${
        isDark ? 'bg-neutral-800 border border-neutral-700' : 'bg-blue-100 border border-blue-200'
      }\`}
    >
      <div
        className={\`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 shadow-md \${
          isDark ? 'translate-x-6 bg-neutral-950 text-blue-400' : 'translate-x-0 bg-white text-amber-500'
        }\`}
      >
        {isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
      </div>
    </button>
  );
};`
  },
  {
    id: 'comp-12',
    title: 'Canvas Confetti Modal Trigger',
    slug: 'confetti-modal',
    description: {
      uz: 'Muvaffaqiyatli xarid yoki harakat paytida salyut (konfetti) otuvchi bayramona interaktiv modal.',
      en: 'Delightful celebration trigger with real-time canvas confetti physics burst.',
      ru: 'Интерактивный триггер с физическим салютом из конфетти для успешных действий и покупок.'
    },
    category: 'modals',
    tags: ['Canvas Confetti', 'Modals', 'Celebration', 'Interactive'],
    previewType: 'confetti-modal',
    author: {
      name: 'Elena Rostova',
      handle: '@erostova',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      verified: true
    },
    upvotes: 2150,
    views: 12800,
    copies: 5120,
    isPro: true,
    dependencies: ['canvas-confetti', 'lucide-react'],
    cliCommand: 'npx prosta@latest add confetti-modal',
    dateAdded: '2026-09-08',
    code: `import React from 'react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';

export const ConfettiModalPreview = () => {
  const handleTrigger = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#60a5fa', '#93c5fd', '#ffffff'],
    });
  };

  return (
    <button
      onClick={handleTrigger}
      className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-2"
    >
      <Sparkles className="w-4 h-4 text-yellow-300" />
      Fire Canvas Confetti
    </button>
  );
};`
  },
  {
    id: 'comp-13',
    title: 'Dynamic Stacked Toast Notification',
    slug: 'dynamic-toast',
    description: {
      uz: 'Zamonaviy Sonner uslubidagi suzuvchi xabarnoma kartasi (to\'liq animatsiya bilan).',
      en: 'Stacked dynamic toast alert with smooth entry, icon badge, and instant dismiss.',
      ru: 'Всплывающее стековое уведомление (toast) в стиле Sonner с плавной анимацией появления.'
    },
    category: 'modals',
    tags: ['Tailwind', 'Toast', 'Notifications', 'UI'],
    previewType: 'dynamic-toast',
    author: {
      name: 'Sarah Jenkins',
      handle: '@sjenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      verified: true
    },
    upvotes: 820,
    views: 4100,
    copies: 1340,
    isPro: false,
    dependencies: ['lucide-react'],
    cliCommand: 'npx prosta@latest add dynamic-toast',
    dateAdded: '2026-09-10',
    code: `import React, { useState } from 'react';
import { Bell, X } from 'lucide-react';

export const DynamicToast = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
          <Bell className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-semibold text-neutral-900 dark:text-white">New Pro Component</div>
          <div className="text-[10px] text-neutral-500 dark:text-neutral-400">Added by @shadcn 2m ago</div>
        </div>
      </div>
      <button onClick={() => setVisible(false)} className="text-neutral-400 hover:text-white p-1">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};`
  },
  {
    id: 'comp-14',
    title: 'Sonar Radar Status Badge',
    slug: 'sonar-badge',
    description: {
      uz: 'Tarmoq holati va to\'lov shlyuzi ishini ko\'rsatuvchi to\'lqinli radar nishoni.',
      en: 'Pulsing radar sonar wave status badge indicating live server uptime or gateway status.',
      ru: 'Индикатор статуса с пульсирующей радио-волной радара для отображения аптайма системы.'
    },
    category: 'badges',
    tags: ['Tailwind', 'Sonar', 'Badges', 'Status'],
    previewType: 'sonar-badge',
    author: {
      name: 'Otabek Mirzayev',
      handle: '@otabek_m',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      verified: true
    },
    upvotes: 1180,
    views: 6100,
    copies: 2200,
    isPro: false,
    dependencies: [],
    cliCommand: 'npx prosta@latest add sonar-badge',
    dateAdded: '2026-09-12',
    code: `import React from 'react';

export const SonarBadge = () => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-medium">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      Stripe Visa Gateway Active
    </div>
  );
};`
  },
  {
    id: 'comp-15',
    title: 'Terminal Package Command Switcher',
    slug: 'terminal-copy-block',
    description: {
      uz: 'pnpm, npm, yarn va bun o\'rtasida almashinuvchi terminal oynasi va nusxalash tugmasi.',
      en: 'MacOS terminal window with package manager tabs and single-click copy to clipboard.',
      ru: 'Терминальный блок в стиле macOS с вкладками для pnpm, npm, yarn, bun и кнопкой копирования.'
    },
    category: 'terminal',
    tags: ['Tailwind', 'Terminal', 'CLI', 'Code'],
    previewType: 'terminal-copy',
    author: {
      name: 'Shadman UI',
      handle: '@shadman',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      verified: true
    },
    upvotes: 1940,
    views: 10400,
    copies: 4670,
    isPro: false,
    dependencies: ['lucide-react'],
    cliCommand: 'npx prosta@latest add terminal-block',
    dateAdded: '2026-09-14',
    code: `import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const TerminalCopyBlock = () => {
  const [manager, setManager] = useState<'pnpm' | 'npm' | 'yarn' | 'bun'>('pnpm');
  const [copied, setCopied] = useState(false);

  const command = \`\${manager} \${manager === 'npm' ? 'i' : 'add'} @prosta/ui\`;

  const copy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-sm rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-3 py-2 bg-neutral-900 border-b border-neutral-800">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono">
          {(['pnpm', 'npm', 'yarn', 'bun'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setManager(m)}
              className={\`px-1.5 py-0.5 rounded transition-colors \${
                manager === m ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:text-white'
              }\`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between p-3 font-mono text-xs">
        <span className="text-blue-400">
          <span className="text-neutral-500 mr-2">$</span>
          {command}
        </span>
        <button onClick={copy} className="text-neutral-400 hover:text-white transition-colors p-1">
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};`
  },
  {
    id: 'comp-16',
    title: 'Radial Speed Meter Gauge',
    slug: 'radial-progress-ring',
    description: {
      uz: 'SVG asosidagi foiz hisoblagichiga ega doirasimon tezlik va progress o\'lchagichi.',
      en: 'Circular SVG speed metric gauge with smooth animated arc fill and interactive values.',
      ru: 'Круговой SVG индикатор производительности и скорости с плавной шкалой заполнения.'
    },
    category: 'metrics',
    tags: ['Tailwind', 'SVG', 'Progress', 'Charts'],
    previewType: 'radial-progress',
    author: {
      name: 'Michael Chen',
      handle: '@mchen',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
      verified: true
    },
    upvotes: 1105,
    views: 5900,
    copies: 1820,
    isPro: true,
    dependencies: [],
    cliCommand: 'npx prosta@latest add radial-progress',
    dateAdded: '2026-09-15',
    code: `import React, { useState } from 'react';

export const RadialProgressRing = () => {
  const [percent, setPercent] = useState(84);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            className="text-neutral-200 dark:text-neutral-800 stroke-current"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            className="text-blue-600 stroke-current transition-all duration-1000 ease-out"
            strokeWidth="8"
            strokeDasharray={251.2}
            strokeDashoffset={251.2 - (251.2 * percent) / 100}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-base font-extrabold text-neutral-900 dark:text-white font-mono">
            {percent}%
          </span>
          <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold">
            Speed Score
          </span>
        </div>
      </div>
    </div>
  );
};`
  }
];

export const initialPricingPlans: PaymentPlan[] = [
  {
    id: 'plan-free',
    name: {
      uz: 'Boshlang\'ich (Bepul)',
      en: 'Hobby (Free)',
      ru: 'Базовый (Бесплатно)'
    },
    price: 0,
    interval: 'month',
    description: {
      uz: 'Yakka ishlab chiquvchilar va shaxsiy loyihalar uchun qulay start.',
      en: 'Perfect for independent developers and personal hobby projects.',
      ru: 'Идеально для индивидуальных разработчиков и личных проектов.'
    },
    features: {
      uz: ['50+ Bepul UI komponentlar', 'CLI orqali tezkor o\'rnatish', 'React va Tailwind CSS kodlari', 'Jamiyat forumi yordami'],
      en: ['50+ Free UI Components', 'CLI direct installation', 'React & Tailwind CSS code', 'Community Discord support'],
      ru: ['50+ бесплатных компонентов', 'Быстрая установка через CLI', 'Код на React и Tailwind CSS', 'Поддержка сообщества']
    },
    popular: false,
    stripePriceId: 'price_free_tier'
  },
  {
    id: 'plan-pro',
    name: {
      uz: 'PRO Dasturchi',
      en: 'PRO Developer',
      ru: 'PRO Разработчик'
    },
    price: 19,
    interval: 'month',
    description: {
      uz: 'Barcha 100+ premium komponentlar va cheksiz tijoriy litsenziya.',
      en: 'Unrestricted access to all 100+ Pro components with commercial license.',
      ru: 'Полный доступ ко всем 100+ PRO компонентам с коммерческой лицензией.'
    },
    features: {
      uz: [
        'Barcha 100+ PRO UI Komponentlar',
        'To\'liq TypeScript va CSS manba kodi',
        'Tijoriy foydalanish litsenziyasi',
        'Haftalik yangi komponent yangilanishlari',
        'Stripe & Visa orqali xavfsiz to\'lov',
        '24/7 ustuvor texnik yordam'
      ],
      en: [
        'All 100+ PRO UI Components',
        'Full TypeScript & CSS source code',
        'Unlimited Commercial License',
        'Weekly new component releases',
        'Secure Stripe & Visa payment',
        'Priority 24/7 technical support'
      ],
      ru: [
        'Все 100+ PRO UI компонентов',
        'Полный исходный код TypeScript и CSS',
        'Коммерческая лицензия без ограничений',
        'Еженедельные релизы новых компонентов',
        'Безопасная оплата через Stripe и Visa',
        'Приоритетная техподдержка 24/7'
      ]
    },
    popular: true,
    stripePriceId: 'price_1N_pro_monthly'
  },
  {
    id: 'plan-team',
    name: {
      uz: 'Studio & Jamoa',
      en: 'Team & Studio',
      ru: 'Студия и Команда'
    },
    price: 299,
    interval: 'one-time',
    description: {
      uz: 'Agentliklar va mahsulot jamoalari uchun bir umrlik cheksiz ruxsatnoma.',
      en: 'Lifetime access for product agencies, startups, and design teams.',
      ru: 'Пожизненный доступ для агентств, стартапов и команд разработки.'
    },
    features: {
      uz: [
        'Cheksiz jamoa a\'zolari (O\'rinlar)',
        'Bir umrlik litsenziya va barcha yangilanishlar',
        'Figma dizayn manbalari (.fig fayllar)',
        'Xususiy komponentlar reyestri integratsiyasi',
        'Shaxsiy Slack kanali yordami'
      ],
      en: [
        'Unlimited team seats & developers',
        'Lifetime access & all future updates',
        'Complete Figma UI design kit (.fig)',
        'Private component registry support',
        'Dedicated VIP Slack channel'
      ],
      ru: [
        'Неограниченное число мест в команде',
        'Пожизненный доступ и обновления',
        'Полный Figma UI дизайн-кит (.fig)',
        'Поддержка приватного реестра компонентов',
        'Персональный VIP канал в Slack'
      ]
    },
    popular: false,
    stripePriceId: 'price_team_lifetime'
  }
];

export const initialTransactions: Transaction[] = [
  {
    id: 'tx_3N829xVisa4242',
    customerName: 'Javohir Usmonov',
    email: 'javohir.dev@gmail.com',
    cardBrand: 'visa',
    last4: '4242',
    amount: 19,
    currency: 'USD',
    status: 'succeeded',
    date: '2026-09-16 14:32',
    planName: 'PRO Developer (Monthly)'
  },
  {
    id: 'tx_3N782xVisa9012',
    customerName: 'Sarah Connor',
    email: 's.connor@skyline.io',
    cardBrand: 'visa',
    last4: '1881',
    amount: 149,
    currency: 'USD',
    status: 'succeeded',
    date: '2026-09-15 09:12',
    planName: 'PRO Developer (Annual)'
  },
  {
    id: 'tx_3N641xVisa4242',
    customerName: 'Dmitry Orlov',
    email: 'd.orlov@yandex.ru',
    cardBrand: 'visa',
    last4: '4242',
    amount: 299,
    currency: 'USD',
    status: 'succeeded',
    date: '2026-09-14 18:45',
    planName: 'Team & Studio (Lifetime)'
  },
  {
    id: 'tx_3N512xVisa5555',
    customerName: 'Alisher Qodirov',
    email: 'alisher@fintech.uz',
    cardBrand: 'visa',
    last4: '4242',
    amount: 19,
    currency: 'USD',
    status: 'succeeded',
    date: '2026-09-13 11:20',
    planName: 'PRO Developer (Monthly)'
  }
];

export const initialSiteSettings: SiteSettings = {
  siteName: '21st.dev',
  tagline: {
    uz: 'Dizayn muhandislari uchun komponentlar reyestri',
    en: 'The npm for Design Engineers',
    ru: 'Реестр компонентов для дизайн-инженеров'
  },
  description: {
    uz: 'Dizaynerlar va frontend dasturchilar uchun zamonaviy interaktiv React va Tailwind UI komponentlari.',
    en: 'Ready-to-use React, Tailwind CSS, and TypeScript components to discover, preview, copy and paste.',
    ru: 'Готовые компоненты React, Tailwind CSS и TypeScript для современных интерфейсов.'
  },
  primaryColor: '#2563eb', // Electric royal blue
  accentName: 'Royal Blue',
  stripePublicKey: 'pk_test_51Mz21stDevProstaLiveSandboxKey998124',
  stripeSecretKey: 'sk_test_51Mz21stDevProstaSecretKeySecured99120',
  stripeWebhookSecret: 'whsec_9b2e81fa67cb1a4c892e88a',
  stripeCurrency: 'USD',
  testMode: true,
  enableVisaPayments: true,
  require3dSecure: true,
  bannerVisible: true,
  bannerText: {
    uz: '🚀 Yangi 21st.dev komponentlar reyestri ishga tushdi! Visa va Stripe orqali PRO ulanish mumkin.',
    en: '🚀 The 21st.dev UI Registry is live! Unlock 100+ components with Visa & Stripe.',
    ru: '🚀 Запущен реестр компонентов 21st.dev! Подключайте PRO тариф картой Visa через Stripe.'
  },
  githubUrl: 'https://github.com/uzmister/prosta',
  twitterUrl: 'https://twitter.com/21st_dev',
  discordUrl: 'https://discord.gg/21stdev'
};

export const initialCurrentUser: User = {
  id: 'usr_admin',
  name: 'Agent Mode Admin',
  email: 'admin@21st.dev',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  role: 'admin',
  isPro: true,
  proPlan: 'PRO Developer',
  proSince: '2026-08-01'
};
