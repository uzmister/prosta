import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ComponentItem, CategoryItem, PaymentPlan, Transaction } from '../types';
import { 
  BarChart3, 
  Layers, 
  CreditCard, 
  Sliders, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Lock, 
  Sparkles, 
  DollarSign, 
  Eye, 
  Copy, 
  ShieldCheck, 
  Key, 
  Globe, 
  RotateCcw,
  Save,
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    t, 
    language, 
    components, 
    categories, 
    siteSettings, 
    plans, 
    transactions, 
    addComponent, 
    updateComponent, 
    deleteComponent, 
    updateSiteSettings, 
    updatePlans,
    showToast,
    resetAllData,
    setIsAdminOpen 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'components' | 'stripe' | 'categories' | 'settings'>('overview');

  // Search in components tab
  const [compSearch, setCompSearch] = useState('');
  const [compCatFilter, setCompCatFilter] = useState('all');

  // Add / Edit Component Form Modal State
  const [editingComp, setEditingComp] = useState<ComponentItem | null>(null);
  const [isCompFormOpen, setIsCompFormOpen] = useState(false);

  // Component form values
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formCategory, setFormCategory] = useState('buttons');
  const [formIsPro, setFormIsPro] = useState(false);
  const [formTags, setFormTags] = useState('Tailwind, React');
  const [formDescUz, setFormDescUz] = useState('');
  const [formDescEn, setFormDescEn] = useState('');
  const [formDescRu, setFormDescRu] = useState('');
  const [formCode, setFormCode] = useState('');
  const [formAuthorName, setFormAuthorName] = useState('Admin Developer');
  const [formAuthorHandle, setFormAuthorHandle] = useState('@admin');
  const [formCli, setFormCli] = useState('');
  const [formPreviewType, setFormPreviewType] = useState('shimmer-button');

  // Stripe form values
  const [stripePk, setStripePk] = useState(siteSettings.stripePublicKey);
  const [stripeSk, setStripeSk] = useState(siteSettings.stripeSecretKey);
  const [stripeWh, setStripeWh] = useState(siteSettings.stripeWebhookSecret);
  const [stripeCurrency, setStripeCurrency] = useState(siteSettings.stripeCurrency);
  const [stripeTestMode, setStripeTestMode] = useState(siteSettings.testMode);
  const [stripeVisaEnabled, setStripeVisaEnabled] = useState(siteSettings.enableVisaPayments);
  const [stripe3dsRequired, setStripe3dsRequired] = useState(siteSettings.require3dSecure);

  // Pricing plans local state
  const [editedPlans, setEditedPlans] = useState<PaymentPlan[]>(plans);

  // Site settings form
  const [siteName, setSiteName] = useState(siteSettings.siteName);
  const [taglineUz, setTaglineUz] = useState(siteSettings.tagline.uz);
  const [taglineEn, setTaglineEn] = useState(siteSettings.tagline.en);
  const [taglineRu, setTaglineRu] = useState(siteSettings.tagline.ru);
  const [bannerVisible, setBannerVisible] = useState(siteSettings.bannerVisible);
  const [bannerUz, setBannerUz] = useState(siteSettings.bannerText.uz);
  const [bannerEn, setBannerEn] = useState(siteSettings.bannerText.en);
  const [bannerRu, setBannerRu] = useState(siteSettings.bannerText.ru);
  const [primaryColor, setPrimaryColor] = useState(siteSettings.primaryColor);
  const [githubUrl, setGithubUrl] = useState(siteSettings.githubUrl);

  // New category form
  const [newCatId, setNewCatId] = useState('');
  const [newCatUz, setNewCatUz] = useState('');
  const [newCatEn, setNewCatEn] = useState('');
  const [newCatRu, setNewCatRu] = useState('');

  // Overview metrics calculation
  const totalRevenue = transactions
    .filter(tx => tx.status === 'succeeded')
    .reduce((acc, tx) => acc + tx.amount, 0);
  const totalCopies = components.reduce((acc, c) => acc + c.copies, 0);
  const proSubscribersCount = transactions.length + 12;

  // Open Edit Component
  const handleEditComp = (comp: ComponentItem) => {
    setEditingComp(comp);
    setFormTitle(comp.title);
    setFormSlug(comp.slug);
    setFormCategory(comp.category);
    setFormIsPro(comp.isPro);
    setFormTags(comp.tags.join(', '));
    setFormDescUz(comp.description.uz);
    setFormDescEn(comp.description.en);
    setFormDescRu(comp.description.ru);
    setFormCode(comp.code);
    setFormAuthorName(comp.author.name);
    setFormAuthorHandle(comp.author.handle);
    setFormCli(comp.cliCommand);
    setFormPreviewType(comp.previewType);
    setIsCompFormOpen(true);
  };

  // Open Add Component
  const handleOpenAddComp = () => {
    setEditingComp(null);
    setFormTitle('');
    setFormSlug('');
    setFormCategory('buttons');
    setFormIsPro(false);
    setFormTags('Tailwind, React, TypeScript');
    setFormDescUz("Yangi zamonaviy interaktiv komponent.");
    setFormDescEn('A brand new interactive component.');
    setFormDescRu('Новый интерактивный компонент.');
    setFormCode(`import React from 'react';\n\nexport const CustomComponent = () => {\n  return (\n    <div className="p-4 rounded-xl bg-blue-600 text-white font-bold">\n      Custom Component\n    </div>\n  );\n};`);
    setFormAuthorName('Prosta Creator');
    setFormAuthorHandle('@creator');
    setFormCli('npx prosta@latest add new-component');
    setFormPreviewType('shimmer-button');
    setIsCompFormOpen(true);
  };

  // Save Component Form
  const handleSaveCompForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle) return;

    const tagsArray = formTags.split(',').map(t => t.trim()).filter(Boolean);

    if (editingComp) {
      updateComponent(editingComp.id, {
        title: formTitle,
        slug: formSlug || formTitle.toLowerCase().replace(/\s+/g, '-'),
        category: formCategory,
        isPro: formIsPro,
        tags: tagsArray,
        description: {
          uz: formDescUz,
          en: formDescEn,
          ru: formDescRu,
        },
        code: formCode,
        cliCommand: formCli || `npx prosta@latest add ${formSlug}`,
        previewType: formPreviewType,
      });
    } else {
      addComponent({
        title: formTitle,
        slug: formSlug || formTitle.toLowerCase().replace(/\s+/g, '-'),
        category: formCategory,
        isPro: formIsPro,
        tags: tagsArray,
        description: {
          uz: formDescUz,
          en: formDescEn,
          ru: formDescRu,
        },
        code: formCode,
        cliCommand: formCli || `npx prosta@latest add ${formSlug}`,
        previewType: formPreviewType,
        author: {
          name: formAuthorName,
          handle: formAuthorHandle,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
          verified: true,
        },
        dependencies: ['lucide-react', 'clsx'],
      });
    }

    setIsCompFormOpen(false);
  };

  // Save Stripe & Visa Settings
  const handleSaveStripe = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings({
      stripePublicKey: stripePk,
      stripeSecretKey: stripeSk,
      stripeWebhookSecret: stripeWh,
      stripeCurrency: stripeCurrency,
      testMode: stripeTestMode,
      enableVisaPayments: stripeVisaEnabled,
      require3dSecure: stripe3dsRequired,
    });
    updatePlans(editedPlans);
    showToast(t.admin_stripe_saved_toast, 'success');
  };

  // Save Site General Settings
  const handleSaveSiteSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings({
      siteName,
      tagline: {
        uz: taglineUz,
        en: taglineEn,
        ru: taglineRu,
      },
      bannerVisible,
      bannerText: {
        uz: bannerUz,
        en: bannerEn,
        ru: bannerRu,
      },
      primaryColor,
      githubUrl,
    });
    showToast(t.admin_gen_saved_toast, 'success');
  };

  // Filter components
  const filteredComponents = components.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(compSearch.toLowerCase()) ||
      c.tags.some(t => t.toLowerCase().includes(compSearch.toLowerCase()));
    const matchesCat = compCatFilter === 'all' || c.category === compCatFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-[#070709] text-neutral-900 dark:text-neutral-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Dashboard Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#0f0f13] border border-neutral-200 dark:border-neutral-800 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Sliders className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
                  {t.admin_title}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  Visa & Stripe Ready
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {t.admin_subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => {
                if (window.confirm(t.admin_gen_reset_confirm)) {
                  resetAllData();
                }
              }}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 hover:bg-red-500/10 hover:text-red-500 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 transition-colors flex items-center gap-1.5"
              title="Reset Database"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.admin_gen_reset_db}</span>
            </button>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all flex items-center gap-1.5 shadow-md"
            >
              <span>{t.common_close}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'overview', icon: BarChart3, label: t.admin_tab_overview },
            { id: 'components', icon: Layers, label: t.admin_tab_components, badge: components.length },
            { id: 'stripe', icon: CreditCard, label: t.admin_tab_stripe },
            { id: 'categories', icon: Sliders, label: t.admin_tab_categories },
            { id: 'settings', icon: Settings, label: t.admin_tab_settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-white dark:bg-[#0f0f13] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-neutral-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive ? 'bg-blue-700 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Stats 4 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Stat 1: Revenue */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0f0f13] border border-neutral-200 dark:border-neutral-800 shadow-md">
                <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 text-xs mb-2">
                  <span>{t.admin_stat_revenue}</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                    $
                  </div>
                </div>
                <div className="text-2xl font-black font-mono text-neutral-900 dark:text-white">
                  ${totalRevenue.toLocaleString()}.00
                </div>
                <div className="text-[11px] text-emerald-500 font-medium mt-1">
                  +18.2% from Visa / Stripe
                </div>
              </div>

              {/* Stat 2: Total Components */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0f0f13] border border-neutral-200 dark:border-neutral-800 shadow-md">
                <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 text-xs mb-2">
                  <span>{t.admin_stat_components}</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black font-mono text-neutral-900 dark:text-white">
                  {components.length}
                </div>
                <div className="text-[11px] text-blue-400 font-medium mt-1">
                  {components.filter(c => c.isPro).length} PRO • {components.filter(c => !c.isPro).length} FREE
                </div>
              </div>

              {/* Stat 3: Copies */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0f0f13] border border-neutral-200 dark:border-neutral-800 shadow-md">
                <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 text-xs mb-2">
                  <span>{t.admin_stat_copies}</span>
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                    <Copy className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black font-mono text-neutral-900 dark:text-white">
                  {totalCopies.toLocaleString()}
                </div>
                <div className="text-[11px] text-indigo-400 font-medium mt-1">
                  Active developers copying code
                </div>
              </div>

              {/* Stat 4: Pro Users */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0f0f13] border border-neutral-200 dark:border-neutral-800 shadow-md">
                <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 text-xs mb-2">
                  <span>{t.admin_stat_pro_users}</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black font-mono text-neutral-900 dark:text-white">
                  {proSubscribersCount}
                </div>
                <div className="text-[11px] text-amber-400 font-medium mt-1">
                  Subscribed via Stripe Visa
                </div>
              </div>
            </div>

            {/* Recent Visa & Stripe Transactions Table */}
            <div className="rounded-3xl bg-white dark:bg-[#0f0f13] border border-neutral-200 dark:border-neutral-800 p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-500" />
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                    {t.admin_recent_transactions}
                  </h3>
                </div>
                <span className="text-xs text-neutral-400 font-mono">
                  {transactions.length} Records
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 uppercase text-[10px]">
                      <th className="py-2.5 px-3">Transaction ID</th>
                      <th className="py-2.5 px-3">Customer</th>
                      <th className="py-2.5 px-3">Payment Card</th>
                      <th className="py-2.5 px-3">Plan</th>
                      <th className="py-2.5 px-3">Amount</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 text-neutral-700 dark:text-neutral-300">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-colors">
                        <td className="py-3 px-3 text-blue-500 font-semibold">{tx.id}</td>
                        <td className="py-3 px-3">
                          <div className="font-sans font-semibold text-neutral-900 dark:text-white">{tx.customerName}</div>
                          <div className="text-[10px] text-neutral-400">{tx.email}</div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-bold">
                            <CreditCard className="w-3 h-3" />
                            VISA •••• {tx.last4}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-sans">{tx.planName}</td>
                        <td className="py-3 px-3 font-bold text-neutral-900 dark:text-white">
                          ${tx.amount}.00
                        </td>
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-500 font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {tx.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-neutral-400 text-[11px]">{tx.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COMPONENTS MANAGEMENT */}
        {activeTab === 'components' && (
          <div className="rounded-3xl bg-white dark:bg-[#0f0f13] border border-neutral-200 dark:border-neutral-800 p-6 shadow-xl space-y-5">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <div className="relative w-full">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={compSearch}
                    onChange={(e) => setCompSearch(e.target.value)}
                    placeholder="Search component by name, tags..."
                    className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <select
                  value={compCatFilter}
                  onChange={(e) => setCompCatFilter(e.target.value)}
                  className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name[language] || c.name.en}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleOpenAddComp}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 active:scale-95 transition-all self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>{t.admin_comp_add}</span>
              </button>
            </div>

            {/* Components Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 uppercase text-[10px] font-mono">
                    <th className="py-2.5 px-3">{t.admin_comp_title}</th>
                    <th className="py-2.5 px-3">{t.admin_comp_category}</th>
                    <th className="py-2.5 px-3">{t.admin_comp_status}</th>
                    <th className="py-2.5 px-3">{t.admin_comp_stats}</th>
                    <th className="py-2.5 px-3 text-right">{t.admin_comp_actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                  {filteredComponents.map((comp) => (
                    <tr key={comp.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                          <span>{comp.title}</span>
                          <span className="text-[10px] text-neutral-400 font-mono">({comp.slug})</span>
                        </div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
                          CLI: {comp.cliCommand}
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                          {comp.category}
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        <button
                          onClick={() => updateComponent(comp.id, { isPro: !comp.isPro })}
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-transform active:scale-95 ${
                            comp.isPro
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                          }`}
                          title="Click to toggle PRO / FREE"
                        >
                          {comp.isPro ? (
                            <>
                              <Sparkles className="w-2.5 h-2.5 text-yellow-300" />
                              <span>PRO</span>
                            </>
                          ) : (
                            <span>FREE</span>
                          )}
                        </button>
                      </td>

                      <td className="py-3 px-3 font-mono text-[11px] text-neutral-500">
                        <span>{comp.copies} copies</span> • <span>{comp.upvotes} likes</span>
                      </td>

                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleEditComp(comp)}
                            className="p-1.5 rounded-lg text-neutral-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                            title={t.admin_comp_edit}
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(t.admin_comp_delete_confirm)) {
                                deleteComponent(comp.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-neutral-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                            title={t.admin_comp_delete}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: STRIPE & VISA SETTINGS */}
        {activeTab === 'stripe' && (
          <form onSubmit={handleSaveStripe} className="space-y-6">
            <div className="rounded-3xl bg-white dark:bg-[#0f0f13] border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <div>
                  <h3 className="text-base font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-500" />
                    <span>{t.admin_stripe_title}</span>
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {t.admin_stripe_desc}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-emerald-500">Gateway Online</span>
                </div>
              </div>

              {/* Stripe Environment Toggle */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
                  <label className="block text-xs font-bold text-neutral-900 dark:text-white mb-1.5">
                    {t.admin_stripe_mode}
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setStripeTestMode(true)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                        stripeTestMode
                          ? 'bg-amber-500 text-white shadow-md'
                          : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      {t.admin_stripe_test}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStripeTestMode(false)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                        !stripeTestMode
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      {t.admin_stripe_live}
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
                  <label className="block text-xs font-bold text-neutral-900 dark:text-white mb-1.5">
                    {t.admin_stripe_currency}
                  </label>
                  <select
                    value={stripeCurrency}
                    onChange={(e) => setStripeCurrency(e.target.value)}
                    className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-xs text-neutral-900 dark:text-white font-mono focus:outline-none focus:border-blue-500"
                  >
                    <option value="USD">USD ($) - US Dollar</option>
                    <option value="UZS">UZS (so'm) - O'zbekiston so'mi</option>
                    <option value="EUR">EUR (€) - Euro</option>
                  </select>
                </div>
              </div>

              {/* API Keys */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1 font-mono">
                    {t.admin_stripe_pk}
                  </label>
                  <div className="relative">
                    <Key className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={stripePk}
                      onChange={(e) => setStripePk(e.target.value)}
                      placeholder="pk_test_..."
                      className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-neutral-900 dark:text-white font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1 font-mono">
                    {t.admin_stripe_sk}
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={stripeSk}
                      onChange={(e) => setStripeSk(e.target.value)}
                      placeholder="sk_test_..."
                      className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-neutral-900 dark:text-white font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1 font-mono">
                    {t.admin_stripe_wh}
                  </label>
                  <input
                    type="password"
                    value={stripeWh}
                    onChange={(e) => setStripeWh(e.target.value)}
                    placeholder="whsec_..."
                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2.5 text-xs text-neutral-900 dark:text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Visa Toggles */}
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">
                      {t.admin_stripe_visa_toggle}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={stripeVisaEnabled}
                    onChange={(e) => setStripeVisaEnabled(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">
                      {t.admin_stripe_3ds}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={stripe3dsRequired}
                    onChange={(e) => setStripe3dsRequired(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                </div>
              </div>

              {/* Pricing Plans Config */}
              <div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-3">
                  {t.admin_stripe_plans_title}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {editedPlans.map((plan, idx) => (
                    <div key={plan.id} className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
                      <span className="text-xs font-bold text-blue-500 font-mono">
                        {plan.id}
                      </span>
                      <div>
                        <label className="text-[10px] text-neutral-400">Price ($ USD):</label>
                        <input
                          type="number"
                          value={plan.price}
                          onChange={(e) => {
                            const newP = [...editedPlans];
                            newP[idx].price = Number(e.target.value);
                            setEditedPlans(newP);
                          }}
                          className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-neutral-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400">Stripe Price ID:</label>
                        <input
                          type="text"
                          value={plan.stripePriceId}
                          onChange={(e) => {
                            const newP = [...editedPlans];
                            newP[idx].stripePriceId = e.target.value;
                            setEditedPlans(newP);
                          }}
                          className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg px-2.5 py-1 text-[11px] font-mono text-neutral-900 dark:text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{t.admin_stripe_save_btn}</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 4: CATEGORIES MANAGEMENT */}
        {activeTab === 'categories' && (
          <div className="rounded-3xl bg-white dark:bg-[#0f0f13] border border-neutral-200 dark:border-neutral-800 p-6 shadow-xl space-y-6">
            <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">
              Categories & Tags Management
            </h3>

            {/* Existing Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {categories.map((cat) => (
                <div key={cat.id} className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-neutral-900 dark:text-white">
                      {cat.name[language] || cat.name.en}
                    </div>
                    <div className="text-[10px] text-neutral-400 font-mono">
                      ID: {cat.id}
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/10 text-blue-500 font-bold">
                    {components.filter(c => c.category === cat.id).length} items
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SITE & BRANDING SETTINGS */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSiteSettings} className="rounded-3xl bg-white dark:bg-[#0f0f13] border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-xl space-y-6">
            <h3 className="text-base font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-500" />
              <span>{t.admin_tab_settings}</span>
            </h3>

            {/* Site Name */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                {t.admin_gen_site_name}
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2.5 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Taglines in 3 languages */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Tagline (UZ)
                </label>
                <input
                  type="text"
                  value={taglineUz}
                  onChange={(e) => setTaglineUz(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-xs text-neutral-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Tagline (EN)
                </label>
                <input
                  type="text"
                  value={taglineEn}
                  onChange={(e) => setTaglineEn(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-xs text-neutral-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Tagline (RU)
                </label>
                <input
                  type="text"
                  value={taglineRu}
                  onChange={(e) => setTaglineRu(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-xs text-neutral-900 dark:text-white"
                />
              </div>
            </div>

            {/* Announcement Banner */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 dark:text-white">
                  {t.admin_gen_banner_toggle}
                </span>
                <input
                  type="checkbox"
                  checked={bannerVisible}
                  onChange={(e) => setBannerVisible(e.target.checked)}
                  className="w-4 h-4 accent-blue-600 rounded"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="text-[10px] text-neutral-400">Banner UZ:</label>
                  <input
                    type="text"
                    value={bannerUz}
                    onChange={(e) => setBannerUz(e.target.value)}
                    className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-neutral-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-neutral-400">Banner EN:</label>
                  <input
                    type="text"
                    value={bannerEn}
                    onChange={(e) => setBannerEn(e.target.value)}
                    className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-neutral-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-neutral-400">Banner RU:</label>
                  <input
                    type="text"
                    value={bannerRu}
                    onChange={(e) => setBannerRu(e.target.value)}
                    className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-neutral-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                GitHub Repository URL
              </label>
              <input
                type="text"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-xs text-neutral-900 dark:text-white font-mono"
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{t.admin_gen_save}</span>
            </button>
          </form>
        )}

        {/* Add / Edit Component Form Modal */}
        {isCompFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
            <div 
              className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-y-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-4">
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  {editingComp ? t.admin_comp_edit : t.admin_comp_add}
                </h3>
                <button
                  onClick={() => setIsCompFormOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCompForm} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      {t.admin_comp_title}
                    </label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-neutral-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={formSlug}
                      onChange={(e) => setFormSlug(e.target.value)}
                      placeholder="e.g. shimmer-button"
                      className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-neutral-900 dark:text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      {t.admin_comp_category}
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-neutral-900 dark:text-white"
                    >
                      {categories.filter(c => c.id !== 'all').map((c) => (
                        <option key={c.id} value={c.id}>{c.name[language] || c.name.en}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Interactive Preview Type
                    </label>
                    <select
                      value={formPreviewType}
                      onChange={(e) => setFormPreviewType(e.target.value)}
                      className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-neutral-900 dark:text-white font-mono"
                    >
                      <option value="shimmer-button">shimmer-button</option>
                      <option value="glass-pricing">glass-pricing</option>
                      <option value="spotlight-input">spotlight-input</option>
                      <option value="floating-island">floating-island</option>
                      <option value="bento-grid">bento-grid</option>
                      <option value="magnetic-button">magnetic-button</option>
                      <option value="animated-gradient">animated-gradient</option>
                      <option value="retro-grid">retro-grid</option>
                      <option value="live-metrics">live-metrics</option>
                      <option value="otp-input">otp-input</option>
                      <option value="dark-toggle">dark-toggle</option>
                      <option value="confetti-modal">confetti-modal</option>
                      <option value="dynamic-toast">dynamic-toast</option>
                      <option value="sonar-badge">sonar-badge</option>
                      <option value="terminal-copy">terminal-copy</option>
                      <option value="radial-progress">radial-progress</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                  <input
                    type="checkbox"
                    id="proToggle"
                    checked={formIsPro}
                    onChange={(e) => setFormIsPro(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                  <label htmlFor="proToggle" className="font-bold text-neutral-900 dark:text-white cursor-pointer">
                    {t.admin_comp_is_pro} (Requires Visa / Stripe Pro Subscription)
                  </label>
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    {t.admin_comp_tags}
                  </label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-neutral-900 dark:text-white"
                  />
                </div>

                {/* Multilingual Description */}
                <div className="space-y-2">
                  <label className="block font-bold text-neutral-700 dark:text-neutral-300">
                    Description (UZ, EN, RU)
                  </label>
                  <input
                    type="text"
                    value={formDescUz}
                    onChange={(e) => setFormDescUz(e.target.value)}
                    placeholder="Description in Uzbek (UZ)"
                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-1.5 text-neutral-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={formDescEn}
                    onChange={(e) => setFormDescEn(e.target.value)}
                    placeholder="Description in English (EN)"
                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-1.5 text-neutral-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={formDescRu}
                    onChange={(e) => setFormDescRu(e.target.value)}
                    placeholder="Description in Russian (RU)"
                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-1.5 text-neutral-900 dark:text-white"
                  />
                </div>

                {/* TSX Code */}
                <div>
                  <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Component TSX Code
                  </label>
                  <textarea
                    rows={8}
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    className="w-full bg-neutral-950 text-neutral-200 border border-neutral-800 rounded-xl p-3 font-mono text-[11px] focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setIsCompFormOpen(false)}
                    className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold"
                  >
                    {t.common_cancel}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/20"
                  >
                    {t.common_save}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
