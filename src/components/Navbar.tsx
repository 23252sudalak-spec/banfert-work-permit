import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Plus,
} from 'lucide-react';
import { Language } from '../types/permit';
import { getUIText } from '../data/translations';

export type AppTab = 'permits' | 'editor' | 'specs' | 'matrix' | 'export';

interface NavbarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  onNewPermit: () => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onNewPermit,
  currentLang,
  onLanguageChange,
}) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const mainLangs: { id: Language; label: string; flag: string }[] = [
    { id: 'th', label: 'ไทย', flag: '🇹🇭' },
    { id: 'zh', label: '中文', flag: '🇨🇳' },
    { id: 'my', label: 'မြန်မာ', flag: '🇲🇲' },
  ];

  const allLangOptions: { id: Language; label: string; flag: string }[] = [
    { id: 'th', label: 'ภาษาไทย (Thai)', flag: '🇹🇭' },
    { id: 'zh', label: '中文 (Chinese)', flag: '🇨🇳' },
    { id: 'my', label: 'မြန်မာ (Burmese)', flag: '🇲🇲' },
    { id: 'bilingual_th_my', label: 'ไทย + พม่า (TH-MY)', flag: '🇹🇭🇲🇲' },
    { id: 'bilingual_th_zh', label: 'ไทย + จีน (TH-ZH)', flag: '🇹🇭🇨🇳' },
    { id: 'trilingual', label: '3 ภาษา (ไทย-จีน-พม่า)', flag: '🌐' },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & System Brand */}
          <div
            onClick={() => setActiveTab('permits')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 flex items-center justify-center shadow-md shadow-orange-500/20 ring-2 ring-amber-400/30 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white">
                  Permit to Work
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {getUIText('safetyOfficerBadge', currentLang)}
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {getUIText('brandDesc', currentLang)}
              </p>
            </div>
          </div>

          {/* Quick Action Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 text-xs">
            <button
              onClick={() => setActiveTab('permits')}
              className={`h-8 px-3 rounded-lg font-medium inline-flex items-center justify-center whitespace-nowrap transition-all ${
                activeTab === 'permits'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {getUIText('tabPermits', currentLang)}
            </button>
            <button
              onClick={() => setActiveTab('editor')}
              className={`h-8 px-3 rounded-lg font-medium inline-flex items-center justify-center whitespace-nowrap transition-all ${
                activeTab === 'editor'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {getUIText('tabEditor', currentLang)}
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`h-8 px-3 rounded-lg font-medium inline-flex items-center justify-center whitespace-nowrap transition-all ${
                activeTab === 'specs'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {getUIText('tabSpecs', currentLang)}
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`h-8 px-3 rounded-lg font-medium inline-flex items-center justify-center whitespace-nowrap transition-all ${
                activeTab === 'matrix'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {getUIText('tabMatrix', currentLang)}
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`h-8 px-3 rounded-lg font-medium inline-flex items-center justify-center whitespace-nowrap transition-all ${
                activeTab === 'export'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {getUIText('tabExport', currentLang)}
            </button>
          </nav>

          {/* Right Action: 3 Language Switcher Pills, Dropdown & Create Permit CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick 3 Language Switcher Pills (Thai, Chinese, Burmese) */}
            <div className="flex items-center bg-slate-800 p-0.5 rounded-xl border border-slate-700">
              {mainLangs.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => onLanguageChange(lang.id)}
                  className={`h-8 flex items-center justify-center gap-1.5 px-2.5 rounded-lg text-xs font-bold transition-all ${
                    currentLang === lang.id
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                  }`}
                  title={lang.label}
                >
                  <span className="text-sm leading-none">{lang.flag}</span>
                  <span className="text-xs leading-none hidden sm:inline">{lang.label}</span>
                </button>
              ))}

              {/* More Languages Dropdown (Bilingual/Trilingual) */}
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="px-1.5 py-1 text-slate-400 hover:text-white hover:bg-slate-700/60 rounded-lg transition-colors"
                  title="ตัวเลือกภาษาเพิ่มเติม (Bilingual/Trilingual)"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {isLangMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setIsLangMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl py-2 z-40 text-xs text-slate-200">
                      <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-700/70 mb-1">
                        {getUIText('selectLanguage', currentLang)}
                      </div>
                      {allLangOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => {
                            onLanguageChange(opt.id);
                            setIsLangMenuOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 flex items-center justify-between hover:bg-slate-700/70 transition-colors ${
                            currentLang === opt.id
                              ? 'text-amber-400 font-bold bg-slate-700/40'
                              : 'text-slate-300'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-base">{opt.flag}</span>
                            <span>{opt.label}</span>
                          </span>
                          {currentLang === opt.id && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Direct New Permit CTA Button */}
            <button
              onClick={onNewPermit}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span className="hidden sm:inline">{getUIText('createNewPermitBtn', currentLang)}</span>
              <span className="sm:hidden">
                {currentLang === 'zh' ? '新建' : currentLang === 'my' ? 'အသစ်' : 'เพิ่มใบ'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden overflow-x-auto py-2.5 gap-2 border-t border-slate-800 text-xs no-scrollbar">
          <button
            onClick={() => setActiveTab('permits')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg ${
              activeTab === 'permits'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-300 bg-slate-800'
            }`}
          >
            {getUIText('tabPermits', currentLang)}
          </button>
          <button
            onClick={() => setActiveTab('editor')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg ${
              activeTab === 'editor'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-300 bg-slate-800'
            }`}
          >
            {getUIText('tabEditor', currentLang)}
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg ${
              activeTab === 'specs'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-300 bg-slate-800'
            }`}
          >
            {getUIText('tabSpecs', currentLang)}
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg ${
              activeTab === 'matrix'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-300 bg-slate-800'
            }`}
          >
            {getUIText('tabMatrix', currentLang)}
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg ${
              activeTab === 'export'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-300 bg-slate-800'
            }`}
          >
            {getUIText('tabExport', currentLang)}
          </button>
        </div>
      </div>
    </header>
  );
};
