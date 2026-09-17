import React, { useState } from 'react';
import { ComponentItem } from '../types';
import { useApp } from '../context/AppContext';
import { renderInteractivePreview } from './interactive/InteractiveComponents';
import { 
  Heart, 
  Terminal, 
  Check, 
  ExternalLink, 
  Code, 
  Sparkles, 
  ShieldCheck, 
  Eye, 
  Copy
} from 'lucide-react';

interface ComponentCardProps {
  component: ComponentItem;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({ component }) => {
  const { 
    t, 
    language, 
    upvoteComponent, 
    recordCopy, 
    setSelectedComponentModal, 
    showToast,
    currentUser,
    setIsPricingModalOpen
  } = useApp();

  const [hasCopiedCli, setHasCopiedCli] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  const handleCopyCli = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(component.cliCommand);
    setHasCopiedCli(true);
    recordCopy(component.id);
    showToast(t.card_copied, 'success');
    setTimeout(() => setHasCopiedCli(false), 2000);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasLiked) {
      upvoteComponent(component.id);
      setHasLiked(true);
    }
  };

  return (
    <div 
      onClick={() => setSelectedComponentModal(component)}
      className="group relative flex flex-col rounded-2xl bg-white dark:bg-[#121215] border border-neutral-200 dark:border-neutral-800/80 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between p-3.5 border-b border-neutral-100 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-900/40">
        {/* Author info */}
        <div className="flex items-center gap-2">
          <img
            src={component.author.avatar}
            alt={component.author.name}
            className="w-6 h-6 rounded-full object-cover ring-1 ring-neutral-300 dark:ring-neutral-700"
          />
          <div className="text-left">
            <div className="flex items-center gap-1 text-xs font-semibold text-neutral-900 dark:text-neutral-200">
              <span>{component.author.name}</span>
              {component.author.verified && (
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
              )}
            </div>
            <span className="text-[10px] text-neutral-400 font-mono">
              {component.author.handle}
            </span>
          </div>
        </div>

        {/* Pro / Free Badge */}
        <div className="flex items-center gap-1.5">
          {component.isPro ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/30">
              <Sparkles className="w-2.5 h-2.5 text-yellow-300" />
              {t.card_pro}
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
              {t.card_free}
            </span>
          )}
        </div>
      </div>

      {/* Interactive Component Preview Stage */}
      <div 
        className="relative min-h-[220px] flex items-center justify-center p-6 bg-grid-pattern overflow-hidden group-hover:bg-neutral-50/80 dark:group-hover:bg-neutral-900/50 transition-colors"
        onClick={(e) => {
          // Allow interactive clicking on inner elements, or modal on stage
        }}
      >
        {/* Ambient subtle glow */}
        <div className="absolute inset-0 bg-radial-glow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Live Component Renderer */}
        <div className="w-full flex items-center justify-center transform transition-transform group-hover:scale-[1.02]">
          {renderInteractivePreview(component.previewType)}
        </div>

        {/* Hover quick action overlay (desktop) */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedComponentModal(component);
            }}
            className="px-2.5 py-1 rounded-lg bg-neutral-900/90 dark:bg-white/90 text-white dark:text-neutral-900 text-[11px] font-semibold backdrop-blur-md shadow-md flex items-center gap-1 hover:scale-105 transition-transform"
          >
            <Code className="w-3 h-3 text-blue-400 dark:text-blue-600" />
            <span>{t.card_view_code}</span>
          </button>
        </div>
      </div>

      {/* Card Info & Actions Footer */}
      <div className="p-3.5 border-t border-neutral-100 dark:border-neutral-800/80 bg-white dark:bg-[#121215] flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
              {component.title}
            </h3>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1">
              {component.description[language] || component.description.en}
            </p>
          </div>
        </div>

        {/* Action bar: CLI copy, Likes, Views */}
        <div className="flex items-center justify-between pt-1 text-xs">
          {/* CLI quick copy button */}
          <button
            onClick={handleCopyCli}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all ${
              hasCopiedCli
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                : 'bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800'
            }`}
            title={component.cliCommand}
          >
            {hasCopiedCli ? (
              <>
                <Check className="w-3 h-3 text-emerald-500" />
                <span>{t.card_copied}</span>
              </>
            ) : (
              <>
                <Terminal className="w-3 h-3 text-blue-500" />
                <span className="hidden sm:inline">CLI</span>
                <Copy className="w-2.5 h-2.5 opacity-60" />
              </>
            )}
          </button>

          {/* Upvotes & stats */}
          <div className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400 text-xs">
            <span className="flex items-center gap-1 font-mono text-[11px]" title="Views">
              <Eye className="w-3 h-3" />
              <span>{component.views}</span>
            </span>

            <button
              onClick={handleLike}
              className={`flex items-center gap-1 font-mono text-[11px] transition-colors p-1 rounded-md ${
                hasLiked
                  ? 'text-red-500 font-bold'
                  : 'hover:text-red-500'
              }`}
              title="Like"
            >
              <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{component.upvotes}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
