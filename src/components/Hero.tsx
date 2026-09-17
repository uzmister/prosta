import React from 'react';
import { useApp } from '../context/AppContext';
import { ComponentItem, CategoryItem } from '../types';
import { 
  Sparkles, 
  Terminal, 
  Search, 
  Flame, 
  Clock, 
  Copy, 
  Filter, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  MousePointer, 
  CreditCard, 
  Type, 
  Navigation, 
  Tag, 
  Maximize2, 
  BarChart, 
  Layers 
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { 
    t, 
    siteSettings, 
    language, 
    components, 
    categories, 
    selectedCategory, 
    setSelectedCategory,
    selectedTag,
    setSelectedTag,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    setIsPricingModalOpen
  } = useApp();

  const tags = ['Tailwind', 'CSS Animation', 'Inputs', 'Pricing', 'Bento', 'Physics', 'Glassmorphism', 'SVG'];

  const categoryIcons: Record<string, React.FC<{ className?: string }>> = {
    all: Layers,
    buttons: MousePointer,
    cards: CreditCard,
    inputs: Type,
    navbars: Navigation,
    hero: Sparkles,
    badges: Tag,
    modals: Maximize2,
    metrics: BarChart,
    terminal: Terminal,
  };

  const totalCopies = components.reduce((acc: number, c: ComponentItem) => acc + c.copies, 0);

  return (
    <section className="relative pt-12 pb-8 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 dark:bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span>{t.hero_badge}</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-white max-w-4xl mx-auto leading-[1.1] mb-6">
          <span>{t.hero_title_1}</span>{' '}
          <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 bg-clip-text text-transparent">
            {t.hero_title_2}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          {t.hero_subtitle}
        </p>

        {/* Quick action buttons & stats */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <a
            href="#components-grid"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <span>{t.hero_browse_all}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={() => setIsPricingModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-800 dark:text-white border border-neutral-200 dark:border-neutral-800 text-sm font-semibold transition-all inline-flex items-center gap-2"
          >
            <CreditCard className="w-4 h-4 text-blue-500" />
            <span>Visa & Stripe PRO</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 max-w-xl mx-auto py-3 px-6 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/80 backdrop-blur-md mb-12">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white font-mono">
              {components.length}+
            </div>
            <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
              {t.hero_stats_components}
            </div>
          </div>
          <div className="text-center border-x border-neutral-200 dark:border-neutral-800">
            <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">
              {totalCopies.toLocaleString()}+
            </div>
            <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
              {t.hero_stats_copies}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white font-mono">
              8,500+
            </div>
            <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
              {t.hero_stats_developers}
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div id="components-grid" className="scroll-mt-24 pt-4">
          <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-3 scrollbar-none no-scrollbar">
            {categories.map((cat: CategoryItem) => {
              const Icon = categoryIcons[cat.id] || Layers;
              const isSelected = selectedCategory === cat.id;
              const count = cat.id === 'all' 
                ? components.length 
                : components.filter((c: ComponentItem) => c.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-500/20'
                      : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.name[language] || cat.name.en}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-blue-700 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Subfilter & Tags Row */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            {/* Tag pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-neutral-400 font-mono text-[11px] mr-1 hidden sm:inline">Tags:</span>
              <button
                onClick={() => setSelectedTag('')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                  selectedTag === ''
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold'
                    : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                All
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition-colors ${
                    selectedTag === tag
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 border border-neutral-200/60 dark:border-neutral-800'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
              <span className="text-neutral-500 text-[11px]">{t.filter_sort}:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="trending">{t.filter_trending}</option>
                <option value="newest">{t.filter_newest}</option>
                <option value="most_copied">{t.filter_most_copied}</option>
                <option value="free">{t.filter_free}</option>
                <option value="pro">{t.filter_pro}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
