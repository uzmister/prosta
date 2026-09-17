import React, { useState } from 'react';
import { ComponentItem } from '../types';
import { useApp } from '../context/AppContext';
import { renderInteractivePreview } from './interactive/InteractiveComponents';
import { 
  X, 
  Code, 
  Eye, 
  Terminal, 
  Copy, 
  Check, 
  RotateCw, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Sparkles, 
  Lock, 
  CreditCard,
  ShieldCheck,
  Heart,
  Package
} from 'lucide-react';

interface ComponentModalProps {
  component: ComponentItem;
  onClose: () => void;
}

export const ComponentModal: React.FC<ComponentModalProps> = ({ component, onClose }) => {
  const { 
    t, 
    language, 
    currentUser, 
    recordCopy, 
    upvoteComponent, 
    showToast,
    setCheckoutModalPlan,
    plans
  } = useApp();

  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'cli'>('preview');
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewBg, setPreviewBg] = useState<'dark' | 'light' | 'grid'>('grid');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const [rerunKey, setRerunKey] = useState(0);

  const handleCopyCode = () => {
    if (component.isPro && !currentUser.isPro) {
      showToast(t.modal_pro_lock_desc, 'info');
      return;
    }
    navigator.clipboard.writeText(component.code);
    setCopiedCode(true);
    recordCopy(component.id);
    showToast(t.modal_copied, 'success');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyCli = () => {
    navigator.clipboard.writeText(component.cliCommand);
    setCopiedCli(true);
    recordCopy(component.id);
    showToast(t.card_copied, 'success');
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const handleUnlockPro = () => {
    const proPlan = plans.find(p => p.id === 'plan-pro') || plans[1] || plans[0];
    setCheckoutModalPlan(proPlan);
  };

  // Determine viewport width style
  const getViewportWidth = () => {
    switch (deviceView) {
      case 'mobile':
        return 'max-w-[375px]';
      case 'tablet':
        return 'max-w-[720px]';
      default:
        return 'w-full';
    }
  };

  // Determine preview stage background
  const getStageBg = () => {
    switch (previewBg) {
      case 'dark':
        return 'bg-[#09090b] text-white';
      case 'light':
        return 'bg-white text-neutral-900';
      default:
        return 'bg-grid-pattern';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/50">
          {/* Author and Component Title */}
          <div className="flex items-center gap-3">
            <img
              src={component.author.avatar}
              alt={component.author.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-neutral-200 dark:ring-neutral-700"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-extrabold text-neutral-900 dark:text-white">
                  {component.title}
                </h2>
                {component.isPro ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm">
                    <Sparkles className="w-2.5 h-2.5 text-yellow-300" />
                    PRO
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                    FREE
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                {component.author.name} • {component.author.handle}
              </p>
            </div>
          </div>

          {/* Action Tabs & Close */}
          <div className="flex items-center gap-2">
            {/* Nav Tabs */}
            <div className="flex items-center bg-neutral-200/70 dark:bg-neutral-800/80 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{t.modal_preview}</span>
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeTab === 'code'
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>{t.modal_code}</span>
              </button>
              <button
                onClick={() => setActiveTab('cli')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeTab === 'cli'
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>{t.modal_cli}</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'preview' && (
            <div className="flex flex-col h-full">
              {/* Preview Stage Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-b border-neutral-200 dark:border-neutral-800/80 bg-neutral-100/50 dark:bg-neutral-900/30 text-xs">
                {/* Responsive Viewport Buttons */}
                <div className="flex items-center gap-1 bg-white dark:bg-neutral-800 p-0.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
                  <button
                    onClick={() => setDeviceView('desktop')}
                    className={`p-1.5 rounded-md ${deviceView === 'desktop' ? 'bg-blue-600 text-white' : 'text-neutral-500'}`}
                    title={t.modal_view_desktop}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeviceView('tablet')}
                    className={`p-1.5 rounded-md ${deviceView === 'tablet' ? 'bg-blue-600 text-white' : 'text-neutral-500'}`}
                    title={t.modal_view_tablet}
                  >
                    <Tablet className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeviceView('mobile')}
                    className={`p-1.5 rounded-md ${deviceView === 'mobile' ? 'bg-blue-600 text-white' : 'text-neutral-500'}`}
                    title={t.modal_view_mobile}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Background color switcher */}
                <div className="flex items-center gap-1 bg-white dark:bg-neutral-800 p-0.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
                  <button
                    onClick={() => setPreviewBg('grid')}
                    className={`px-2 py-1 rounded text-[11px] font-mono ${previewBg === 'grid' ? 'bg-blue-600 text-white' : 'text-neutral-500'}`}
                  >
                    {t.modal_bg_grid}
                  </button>
                  <button
                    onClick={() => setPreviewBg('dark')}
                    className={`px-2 py-1 rounded text-[11px] font-mono ${previewBg === 'dark' ? 'bg-blue-600 text-white' : 'text-neutral-500'}`}
                  >
                    {t.modal_bg_dark}
                  </button>
                  <button
                    onClick={() => setPreviewBg('light')}
                    className={`px-2 py-1 rounded text-[11px] font-mono ${previewBg === 'light' ? 'bg-blue-600 text-white' : 'text-neutral-500'}`}
                  >
                    {t.modal_bg_light}
                  </button>
                </div>

                {/* Rerun Animation button */}
                <button
                  onClick={() => setRerunKey(prev => prev + 1)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-blue-500 text-[11px] font-medium"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>{t.modal_rerun}</span>
                </button>
              </div>

              {/* Main Interactive Stage Container */}
              <div className={`flex-1 min-h-[380px] p-8 flex items-center justify-center transition-all ${getStageBg()}`}>
                <div
                  key={rerunKey}
                  className={`w-full transition-all duration-300 flex items-center justify-center ${getViewportWidth()}`}
                >
                  {renderInteractivePreview(component.previewType)}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="relative p-4 sm:p-6 bg-neutral-950 font-mono text-xs">
              {/* Pro Lock Overlay if user not subscribed */}
              {component.isPro && !currentUser.isPro && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-neutral-950/90 backdrop-blur-md text-center">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-4">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {t.modal_pro_lock_title}
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-md mb-6 leading-relaxed">
                    {t.modal_pro_lock_desc}
                  </p>
                  <button
                    onClick={handleUnlockPro}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-blue-500/30 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>{t.modal_unlock_with_visa}</span>
                  </button>
                </div>
              )}

              {/* Code Action Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800 text-neutral-400">
                <span className="font-mono text-[11px] text-blue-400">
                  {component.slug}.tsx
                </span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white transition-all text-xs"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t.modal_copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.modal_copy_code}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code display */}
              <pre className="overflow-x-auto text-neutral-200 leading-relaxed max-h-[460px] scrollbar-thin">
                <code>{component.code}</code>
              </pre>

              {/* Dependencies footer */}
              {component.dependencies && component.dependencies.length > 0 && (
                <div className="mt-6 pt-4 border-t border-neutral-800 flex flex-wrap items-center gap-2">
                  <span className="text-neutral-500 text-[11px] flex items-center gap-1">
                    <Package className="w-3.5 h-3.5" />
                    {t.modal_dependencies}:
                  </span>
                  {component.dependencies.map((dep) => (
                    <span
                      key={dep}
                      className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 text-[11px] font-mono"
                    >
                      {dep}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'cli' && (
            <div className="p-6 bg-neutral-950 font-mono text-xs space-y-6">
              <div>
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-500" />
                  <span>One-click CLI Installation</span>
                </h4>
                <p className="text-neutral-400 mb-4 text-xs font-sans">
                  Automatically download and configure this component in your Next.js, Vite, or React project.
                </p>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900 border border-neutral-800">
                  <span className="text-blue-400 font-mono">
                    <span className="text-neutral-500 mr-2">$</span>
                    {component.cliCommand}
                  </span>
                  <button
                    onClick={handleCopyCli}
                    className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
                  >
                    {copiedCli ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 text-neutral-400 space-y-2 font-sans">
                <h5 className="text-xs font-bold text-neutral-200">Prerequisites</h5>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Tailwind CSS configured in your project</li>
                  <li>Lucide React icons installed (`npm i lucide-react`)</li>
                  <li>React 18 or 19 with TypeScript</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-3.5 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-neutral-500 dark:text-neutral-400">
              {component.category.toUpperCase()}
            </span>
            <span className="text-neutral-400">•</span>
            <span className="text-neutral-500 dark:text-neutral-400">
              Added: {component.dateAdded}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => upvoteComponent(component.id)}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:text-red-500 flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>{component.upvotes}</span>
            </button>

            <button
              onClick={handleCopyCode}
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1.5 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{t.modal_copy_code}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
