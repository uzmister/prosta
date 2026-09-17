import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PaymentPlan } from '../types';
import confetti from 'canvas-confetti';
import { 
  X, 
  Lock, 
  CreditCard, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Loader2, 
  AlertCircle,
  HelpCircle,
  Building,
  CheckCircle2
} from 'lucide-react';

interface StripeCheckoutModalProps {
  plan: PaymentPlan;
  onClose: () => void;
}

export const StripeCheckoutModal: React.FC<StripeCheckoutModalProps> = ({ plan, onClose }) => {
  const { 
    t, 
    language, 
    siteSettings, 
    processPayment, 
    showToast 
  } = useApp();

  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardHolder, setCardHolder] = useState('John Doe');
  const [zipCode, setZipCode] = useState('10001');

  const [isProcessing, setIsProcessing] = useState(false);
  const [stepMessage, setStepMessage] = useState('');
  const [successTxId, setSuccessTxId] = useState<string | null>(null);

  // Format Card Number (adds spaces every 4 digits)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 16) val = val.slice(0, 16);
    const formatted = val.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  // Format Expiry (MM/YY)
  const handleExpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 4) val = val.slice(0, 4);
    if (val.length >= 3) {
      setCardExp(`${val.slice(0, 2)}/${val.slice(2)}`);
    } else {
      setCardExp(val);
    }
  };

  // Format CVC
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 4) val = val.slice(0, 4);
    setCardCvc(val);
  };

  // Fill Test Visa Card
  const fillTestCard = () => {
    setCardNumber('4242 4242 4242 4242');
    setCardExp('12/28');
    setCardCvc('888');
    setCardHolder('Sarah Connor');
    setZipCode('10001');
    showToast(language === 'uz' ? "Stripe Test Visa kartasi to'ldirildi!" : "Stripe Test Visa card loaded!", 'info');
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cardNumber || cardNumber.replace(/\s+/g, '').length < 16) {
      showToast(language === 'uz' ? "Iltimos, to'liq 16 xonali Visa karta raqamini kiriting" : "Please enter a valid 16-digit Visa card number", 'error');
      return;
    }
    if (!cardExp || cardExp.length < 5) {
      showToast(language === 'uz' ? "Karta amal qilish muddatini kiriting (OO/YY)" : "Please enter card expiry date (MM/YY)", 'error');
      return;
    }
    if (!cardCvc || cardCvc.length < 3) {
      showToast(language === 'uz' ? "Karta CVC kodini kiriting" : "Please enter card CVC", 'error');
      return;
    }

    setIsProcessing(true);
    setStepMessage(language === 'uz' ? 'Stripe shlyuziga ulanmoqda...' : 'Connecting to Stripe Gateway...');

    setTimeout(() => {
      setStepMessage(language === 'uz' ? 'Visa 3D-Secure tekshirilmoqda...' : 'Authorizing Visa with 3D Secure...');
    }, 800);

    const result = await processPayment(plan, { cardNumber, cardHolder });
    setIsProcessing(false);

    if (result.success) {
      setSuccessTxId(result.transactionId);
      // Confetti celebration
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#2563eb', '#3b82f6', '#60a5fa', '#ffffff', '#10b981'],
      });
      showToast(t.checkout_success_title, 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-neutral-900 dark:text-white">
                {t.checkout_title}
              </h3>
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{siteSettings.testMode ? 'Stripe Sandbox (Test Mode)' : 'Stripe Live'}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {successTxId ? (
          /* Payment Success View */
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto mb-2 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-extrabold text-neutral-900 dark:text-white">
              {t.checkout_success_title}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-sm mx-auto leading-relaxed">
              {t.checkout_success_desc}
            </p>

            {/* Receipt Box */}
            <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-left text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">{t.checkout_receipt_id}:</span>
                <span className="text-blue-500 font-bold">{successTxId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Plan:</span>
                <span className="text-neutral-900 dark:text-white">{plan.name[language] || plan.name.en}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Payment Method:</span>
                <span className="text-neutral-900 dark:text-white flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-blue-500" />
                  Visa •••• {cardNumber.slice(-4) || '4242'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Amount Charged:</span>
                <span className="text-emerald-500 font-bold">${plan.price}.00 {siteSettings.stripeCurrency}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all mt-4"
            >
              {t.checkout_close_btn} &rarr;
            </button>
          </div>
        ) : (
          /* Payment Form View */
          <form onSubmit={handlePay} className="p-5 sm:p-6 space-y-4">
            {/* Plan Summary Bar */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400 font-mono">
                  {plan.name[language] || plan.name.en}
                </span>
                <div className="text-xs text-neutral-600 dark:text-neutral-300">
                  Instant activation with Visa
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-neutral-900 dark:text-white font-mono">
                  ${plan.price}
                </div>
                <div className="text-[10px] text-neutral-500">
                  {plan.interval === 'one-time' ? 'Lifetime' : `Per ${plan.interval}`}
                </div>
              </div>
            </div>

            {/* Test Helper Button */}
            <button
              type="button"
              onClick={fillTestCard}
              className="w-full py-1.5 px-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-[11px] font-mono text-blue-600 dark:text-blue-400 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.checkout_test_fill}</span>
            </button>

            {/* Card Inputs */}
            <div className="space-y-3">
              {/* Card Number */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  {t.checkout_card_number}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="4242 4242 4242 4242"
                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl pl-10 pr-20 py-2.5 text-xs text-neutral-900 dark:text-white font-mono placeholder:text-neutral-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                  <CreditCard className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  
                  {/* Visa Badge */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-600 text-white text-[10px] font-black italic tracking-tighter">
                    VISA
                  </div>
                </div>
              </div>

              {/* Exp and CVC */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    {t.checkout_card_exp}
                  </label>
                  <input
                    type="text"
                    value={cardExp}
                    onChange={handleExpChange}
                    placeholder="MM/YY"
                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2.5 text-xs text-neutral-900 dark:text-white font-mono placeholder:text-neutral-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    {t.checkout_card_cvc}
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvc}
                      onChange={handleCvcChange}
                      placeholder="•••"
                      className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2.5 text-xs text-neutral-900 dark:text-white font-mono placeholder:text-neutral-400 focus:outline-none focus:border-blue-500"
                    />
                    <Lock className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Cardholder Name */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  {t.checkout_card_name}
                </label>
                <input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2.5 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Country & Zip */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Country
                  </label>
                  <select
                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2.5 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="UZ">Uzbekistan (O'zbekiston)</option>
                    <option value="US">United States</option>
                    <option value="RU">Russian Federation</option>
                    <option value="KZ">Kazakhstan</option>
                    <option value="DE">Germany</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Postal / ZIP Code
                  </label>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="100000"
                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2.5 text-xs text-neutral-900 dark:text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Submit Pay Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>{stepMessage}</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>
                      ${plan.price}.00 {t.checkout_pay_btn}
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Security disclaimer */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>{t.checkout_secure_badge}</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
