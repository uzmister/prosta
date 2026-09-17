import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PaymentPlan } from '../types';
import { X, Check, Sparkles, ShieldCheck, CreditCard, ArrowRight } from 'lucide-react';

interface PricingModalProps {
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ onClose }) => {
  const { 
    t, 
    language, 
    plans, 
    currentUser, 
    setCheckoutModalPlan 
  } = useApp();

  const [billingCycle, setBillingCycle] = useState<'month' | 'year'>('month');

  const handleSelectPlan = (plan: PaymentPlan) => {
    if (plan.price === 0) {
      onClose();
      return;
    }
    // Adjust plan if yearly
    const adjustedPlan = billingCycle === 'year' && plan.interval === 'month'
      ? { ...plan, price: Math.round(plan.price * 12 * 0.8), interval: 'year' as const }
      : plan;

    onClose();
    setCheckoutModalPlan(adjustedPlan);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center pt-8 pb-4 px-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Stripe & Visa Supported</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-3">
            {t.pricing_title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
            {t.pricing_subtitle}
          </p>

          {/* Billing Interval Toggle */}
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center p-1 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-semibold">
              <button
                onClick={() => setBillingCycle('month')}
                className={`px-4 py-1.5 rounded-lg transition-all ${
                  billingCycle === 'month'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {t.pricing_monthly}
              </button>
              <button
                onClick={() => setBillingCycle('year')}
                className={`px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  billingCycle === 'year'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <span>{t.pricing_yearly}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-400/20 text-blue-300 font-mono">
                  -20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isProPlan = plan.id === 'plan-pro';
            const price = billingCycle === 'year' && plan.interval === 'month'
              ? Math.round(plan.price * 12 * 0.8)
              : plan.price;
            
            const intervalLabel = plan.interval === 'one-time' 
              ? t.pricing_one_time 
              : billingCycle === 'year' && plan.interval === 'month' 
                ? t.pricing_billed_yearly 
                : t.pricing_billed_monthly;

            const isCurrent = currentUser.isPro && isProPlan;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 ${
                  isProPlan
                    ? 'bg-gradient-to-b from-blue-900/20 to-neutral-900 border-2 border-blue-500 shadow-2xl shadow-blue-500/10'
                    : 'bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                    {t.pricing_popular_badge}
                  </div>
                )}

                <div>
                  <h3 className="text-base font-extrabold text-neutral-900 dark:text-white mb-2">
                    {plan.name[language] || plan.name.en}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4 min-h-[36px]">
                    {plan.description[language] || plan.description.en}
                  </p>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white font-mono">
                      ${price}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {intervalLabel}
                    </span>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3 mb-6 text-xs">
                    {(plan.features[language] || plan.features.en || []).map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-neutral-700 dark:text-neutral-300">
                        <Check className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    disabled={isCurrent}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md ${
                      isCurrent
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default'
                        : isProPlan
                          ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/30 active:scale-95'
                          : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700'
                    }`}
                  >
                    {isCurrent ? (
                      <>
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>{t.pricing_current_plan}</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        <span>
                          {plan.price === 0 ? 'Start Free' : `${t.pricing_choose_plan} (Visa)`}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Guarantee */}
        <div className="p-4 bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-800 text-center text-xs text-neutral-500 dark:text-neutral-400">
          <ShieldCheck className="w-4 h-4 text-blue-500 inline-block mr-1.5" />
          <span>{t.pricing_guarantee}</span>
        </div>
      </div>
    </div>
  );
};
