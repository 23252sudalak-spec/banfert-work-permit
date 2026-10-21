import React, { useState } from 'react';
import {
  ShieldCheck,
  LogOut,
  CheckCircle2,
  CloudLightning,
  Globe,
  ChevronDown,
} from 'lucide-react';
import { type User } from '../services/firebase';
import { Language } from '../types/permit';
import { getUIText } from '../data/translations';

export type AppTab = 'permits' | 'editor' | 'specs' | 'matrix' | 'export';

interface NavbarProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  isLoggingIn: boolean;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  onOpenDeployModal: () => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onLogin,
  onLogout,
  isLoggingIn,
  activeTab,
  setActiveTab,
  onOpenDeployModal,
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
          <div className="hidden lg:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 text-xs sm:text-sm">
            <button
              onClick={() => setActiveTab('permits')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'permits'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {getUIText('tabPermits', currentLang)}
            </button>
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'editor'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {getUIText('tabEditor', currentLang)}
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'specs'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {getUIText('tabSpecs', currentLang)}
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'matrix'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {getUIText('tabMatrix', currentLang)}
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'export'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {getUIText('tabExport', currentLang)}
            </button>
          </div>

          {/* Right Action: 3 Language Switcher Pills, Dropdown & Google Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick 3 Language Switcher Pills (Thai, Chinese, Burmese) */}
            <div className="flex items-center bg-slate-800 p-0.5 rounded-xl border border-slate-700">
              {mainLangs.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => onLanguageChange(lang.id)}
                  className={`flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1 rounded-lg text-xs font-bold transition-all ${
                    currentLang === lang.id
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                  }`}
                  title={lang.label}
                >
                  <span>{lang.flag}</span>
                  <span className="text-[11px] hidden sm:inline">{lang.label}</span>
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

            {/* Create Google Form Button */}
            <button
              onClick={onOpenDeployModal}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-900/30 transition-all border border-emerald-400/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <CloudLightning className="w-4 h-4 text-emerald-200 animate-pulse" />
              <span className="hidden sm:inline">{getUIText('createGoogleFormBtn', currentLang)}</span>
              <span className="sm:hidden">{getUIText('createFormShort', currentLang)}</span>
            </button>

            {/* Google Auth Status / Login */}
            {user ? (
              <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-xl px-2.5 py-1.5">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-6 h-6 rounded-full ring-1 ring-amber-400"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                    {user.email ? user.email[0].toUpperCase() : 'U'}
                  </div>
                )}
                <span className="text-xs text-slate-200 hidden xl:inline max-w-[100px] truncate">
                  {user.displayName || user.email}
                </span>
                <button
                  onClick={onLogout}
                  title={getUIText('signOut', currentLang)}
                  className="text-slate-400 hover:text-rose-400 transition-colors p-1"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                disabled={isLoggingIn}
                className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-white text-slate-700 hover:bg-slate-100 font-medium text-xs sm:text-sm rounded-xl shadow transition-all border border-slate-200 disabled:opacity-60"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="hidden sm:inline">
                  {isLoggingIn ? '...' : getUIText('signInGoogle', currentLang)}
                </span>
                <span className="sm:hidden">Google</span>
              </button>
            )}
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
