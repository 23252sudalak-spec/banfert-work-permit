/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SectionViewer } from './components/SectionViewer';
import { InteractiveSimulator } from './components/InteractiveSimulator';
import { RiskMatrixCard } from './components/RiskMatrixCard';
import { ExportModal } from './components/ExportModal';
import { GoogleFormSyncModal } from './components/GoogleFormSyncModal';
import { PERMIT_FORM_SECTIONS } from './data/permitTemplate';
import { getLocalizedSections } from './utils/permitLocalization';
import { Language } from './types/permit';
import {
  initAuth,
  googleSignIn,
  logout,
  type User,
} from './services/firebase';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'simulator' | 'matrix' | 'export'>('specs');
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>('th');

  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setAccessToken(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const localizedSections = getLocalizedSections(PERMIT_FORM_SECTIONS, currentLang);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Prompt','Noto_Sans_Myanmar','Noto_Sans_SC',sans-serif]">
      {/* Top Navigation */}
      <Navbar
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        isLoggingIn={isLoggingIn}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'specs' && (
          <SectionViewer
            sections={localizedSections}
            onOpenDeployModal={() => setIsDeployModalOpen(true)}
            onOpenAppsScriptTab={() => setActiveTab('export')}
            currentLang={currentLang}
            onLanguageChange={setCurrentLang}
          />
        )}

        {activeTab === 'simulator' && (
          <InteractiveSimulator currentLang={currentLang} />
        )}

        {activeTab === 'matrix' && (
          <RiskMatrixCard currentLang={currentLang} />
        )}

        {activeTab === 'export' && (
          <ExportModal
            sections={PERMIT_FORM_SECTIONS}
            onOpenDeployModal={() => setIsDeployModalOpen(true)}
            currentLang={currentLang}
            onLanguageChange={setCurrentLang}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-8 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-semibold text-slate-200">
              ระบบออกแบบและสร้าง Google Form ใบอนุญาตปฏิบัติงานที่มีความเสี่ยง (Permit to Work - PTW)
            </p>
            <p className="text-[11px] text-slate-400">
              รองรับ 3 ภาษา: ไทย (Thai) 🇹🇭 • จีน (中文) 🇨🇳 • พม่า (မြန်မာ) 🇲🇲 | ตามมาตรฐาน จป.วิชาชีพ และ ISO 45001
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Language: {currentLang.toUpperCase()}
            </span>
            <span>•</span>
            <span>Google Forms API v1</span>
          </div>
        </div>
      </footer>

      {/* Google Form 1-Click Deployment Modal */}
      <GoogleFormSyncModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        sections={PERMIT_FORM_SECTIONS}
        user={user}
        accessToken={accessToken}
        onLogin={handleLogin}
        currentLang={currentLang}
      />
    </div>
  );
}
