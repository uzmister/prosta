import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sun, 
  Moon, 
  Search, 
  Plus, 
  Layers, 
  ShieldCheck, 
  Sliders, 
  Globe, 
  Sparkles, 
  ChevronDown, 
  CreditCard,
  X,
  ExternalLink
} from 'lucide-react';
import { Language } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    t, 
    theme, 
    toggleTheme, 
    siteSettings, 
    currentUser, 
    searchQuery, 
    setSearchQuery,
    isAdminOpen, 
    setIsAdminOpen,
    setIsAddCompModalOpen,
    setIsPricingModalOpen
  } = useApp();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'uz', label: "O'zbekcha", flag: '🇺🇿' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-[#09090b]/85 border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-200">
      {/* Top Announcement Banner */}
      {siteSettings.bannerVisible && !isBannerDismissed && (
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 relative">
          <span>{siteSettings.bannerText[language] || siteSettings.bannerText.en}</span>
          <button
            onClick={() => setIsPricingModalOpen(true)}
            className="underline underline-offset-2 hover:text-blue-100 font-bold ml-1 text-[11px]"
          >
            {t.pricing_choose_plan} &rarr;
          </button>
          <button
            onClick={() => setIsBannerDismissed(true)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsAdminOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:bg-blue-500 transition-colors">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5 font-black text-lg tracking-tight text-neutral-900 dark:text-white">
                <span>{siteSettings.siteName}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              </div>
            </div>
          </button>

          <span className="hidden md:inline-block px-2 py-0.5 text-[10px] font-mono rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-semibold">
            Registry v2.4
          </span>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.nav_search_placeholder}
              className="w-full bg-neutral-100 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 rounded-xl pl-9 pr-12 py-1.5 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-1.5 py-0.5 text-[10px] font-mono text-neutral-500">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin Dashboard Button */}
          <button
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isAdminOpen
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-200 hover:border-blue-500/50'
            }`}
            title={t.nav_admin}
          >
            <Sliders className="w-3.5 h-3.5 text-blue-500" />
            <span className="hidden sm:inline">{t.nav_admin}</span>
          </button>

          {/* Pricing Button */}
          <button
            onClick={() => setIsPricingModalOpen(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors hidden lg:flex items-center gap-1"
          >
            <CreditCard className="w-3.5 h-3.5 text-blue-500" />
            <span>{t.nav_pricing}</span>
          </button>

          {/* Add Component Button */}
          <button
            onClick={() => setIsAddCompModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.nav_add_component}</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-200 hover:border-neutral-400 transition-colors"
            >
              <span className="text-sm">{currentLang.flag}</span>
              <span className="font-mono uppercase text-[11px] font-bold">{currentLang.code}</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl py-1 z-50">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${
                      language === l.code ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-500/5' : 'text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </span>
                    {language === l.code && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Day / Night Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-blue-500 hover:border-blue-500/50 transition-all"
            title={theme === 'dark' ? t.nav_theme_light : t.nav_theme_dark}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-blue-600" />
            )}
          </button>

          {/* Pro Status or Get Pro */}
          {currentUser.isPro ? (
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
              <span>{t.nav_pro_badge}</span>
            </div>
          ) : (
            <button
              onClick={() => setIsPricingModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>{t.nav_get_pro}</span>
            </button>
          )}

          {/* User Avatar */}
          <div className="w-8 h-8 rounded-full ring-2 ring-blue-500/30 overflow-hidden flex-shrink-0 cursor-pointer" title={currentUser.name}>
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
