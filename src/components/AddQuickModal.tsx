import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Plus, Sparkles, Code, Terminal, Check } from 'lucide-react';

export const AddQuickModal: React.FC = () => {
  const { 
    t, 
    language, 
    categories, 
    addComponent, 
    isAddCompModalOpen, 
    setIsAddCompModalOpen,
    currentUser 
  } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('buttons');
  const [isPro, setIsPro] = useState(false);
  const [tags, setTags] = useState('React, Tailwind');
  const [desc, setDesc] = useState('');
  const [code, setCode] = useState(`import React from 'react';\n\nexport const MyCustomComponent = () => {\n  return (\n    <div className="p-4 rounded-xl bg-blue-600 text-white font-semibold text-center">\n      New Interactive Component\n    </div>\n  );\n};`);

  if (!isAddCompModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const tagsArr = tags.split(',').map(t => t.trim()).filter(Boolean);

    addComponent({
      title,
      slug,
      category,
      isPro,
      tags: tagsArr,
      description: {
        uz: desc || title,
        en: desc || title,
        ru: desc || title,
      },
      code,
      cliCommand: `npx prosta@latest add ${slug}`,
      previewType: 'shimmer-button',
      author: {
        name: currentUser.name,
        handle: `@${currentUser.name.toLowerCase().replace(/\s+/g, '_')}`,
        avatar: currentUser.avatar,
        verified: true,
      },
      dependencies: ['lucide-react'],
    });

    setIsAddCompModalOpen(false);
    setTitle('');
    setDesc('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-xl max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Plus className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              {t.nav_add_component}
            </h3>
          </div>
          <button
            onClick={() => setIsAddCompModalOpen(false)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              {t.admin_comp_title}
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Glowing Neon Badge"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-neutral-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                {t.admin_comp_category}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-neutral-900 dark:text-white"
              >
                {categories.filter(c => c.id !== 'all').map((c) => (
                  <option key={c.id} value={c.id}>{c.name[language] || c.name.en}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="React, Tailwind, Glow"
                className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-neutral-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Description
            </label>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="A brief description of this component..."
              className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-neutral-900 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2 p-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
            <input
              type="checkbox"
              id="quickProToggle"
              checked={isPro}
              onChange={(e) => setIsPro(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded"
            />
            <label htmlFor="quickProToggle" className="font-bold text-neutral-900 dark:text-white cursor-pointer">
              Mark as PRO Component (Requires Visa / Stripe)
            </label>
          </div>

          <div>
            <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Component TSX Code
            </label>
            <textarea
              rows={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-neutral-950 text-neutral-200 border border-neutral-800 rounded-xl p-3 font-mono text-[11px] focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <button
              type="button"
              onClick={() => setIsAddCompModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold"
            >
              {t.common_cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
            >
              Publish to Registry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
