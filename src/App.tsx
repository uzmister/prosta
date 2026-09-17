import React, { useMemo } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/Hero';
import { ComponentCard } from './components/ComponentCard';
import { ComponentModal } from './components/ComponentModal';
import { PricingModal } from './components/PricingModal';
import { StripeCheckoutModal } from './components/StripeCheckoutModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AddQuickModal } from './components/AddQuickModal';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/layout/Footer';
import { Sparkles, CreditCard, RotateCcw, ArrowRight, ShieldCheck } from 'lucide-react';

export const AppContent: React.FC = () => {
  const { 
    t, 
    components, 
    searchQuery, 
    selectedCategory, 
    selectedTag, 
    sortBy, 
    setSearchQuery, 
    setSelectedCategory, 
    setSelectedTag,
    selectedComponentModal,
    setSelectedComponentModal,
    isPricingModalOpen,
    setIsPricingModalOpen,
    checkoutModalPlan,
    setCheckoutModalPlan,
    isAdminOpen,
    currentUser
  } = useApp();

  // Filter & sort components
  const displayComponents = useMemo(() => {
    let result = [...components];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(c => 
        c.title.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(c => c.category === selectedCategory);
    }

    // Tag filter
    if (selectedTag) {
      result = result.filter(c => c.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase()));
    }

    // Sort order
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
      case 'most_copied':
        result.sort((a, b) => b.copies - a.copies);
        break;
      case 'free':
        result = result.filter(c => !c.isPro);
        break;
      case 'pro':
        result = result.filter(c => c.isPro);
        break;
      case 'trending':
      default:
        result.sort((a, b) => (b.upvotes * 2 + b.views) - (a.upvotes * 2 + a.views));
        break;
    }

    return result;
  }, [components, searchQuery, selectedCategory, selectedTag, sortBy]);

  // If Admin Dashboard is active, show the admin dashboard screen
  if (isAdminOpen) {
    return (
      <div className="min-h-screen bg-neutral-100 dark:bg-[#09090b] text-neutral-900 dark:text-neutral-100 font-sans">
        <AdminDashboard />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#09090b] text-neutral-900 dark:text-neutral-100 font-sans flex flex-col selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Main Component Grid Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4">
        {displayComponents.length === 0 ? (
          /* Empty search state */
          <div className="text-center py-20 px-4 rounded-3xl bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
              {t.filter_no_results}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">
              Try adjusting your search query, selecting "All Categories", or removing the tag filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedTag('');
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Gallery Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {displayComponents.map((component) => (
              <ComponentCard key={component.id} component={component} />
            ))}
          </div>
        )}

        {/* Pro Banner CTA before Footer */}
        {!currentUser.isPro && (
          <section className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900/30 via-neutral-900 to-indigo-950/40 border border-blue-500/30 relative overflow-hidden shadow-2xl">
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.2),transparent_70%)] pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold font-mono mb-4 border border-blue-500/30">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>21st.dev PRO MEMBERSHIP</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
                Unlock 100+ Production React & Tailwind Components
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                Pay securely with Visa using Stripe. Get instant full source code, unlimited commercial license, weekly component drops, and priority support.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsPricingModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/30 active:scale-95 transition-all flex items-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Get PRO with Visa & Stripe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>256-Bit SSL • Instant Access</span>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      {selectedComponentModal && (
        <ComponentModal
          component={selectedComponentModal}
          onClose={() => setSelectedComponentModal(null)}
        />
      )}

      {isPricingModalOpen && (
        <PricingModal onClose={() => setIsPricingModalOpen(false)} />
      )}

      {checkoutModalPlan && (
        <StripeCheckoutModal
          plan={checkoutModalPlan}
          onClose={() => setCheckoutModalPlan(null)}
        />
      )}

      <AddQuickModal />
      <ToastContainer />
    </div>
  );
};
