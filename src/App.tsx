/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, AppTab } from './components/Navbar';
import { PermitList } from './components/PermitList';
import { PermitFormEditor } from './components/PermitFormEditor';
import { PermitDetailModal } from './components/PermitDetailModal';
import { SectionViewer } from './components/SectionViewer';
import { RiskMatrixCard } from './components/RiskMatrixCard';
import { ExportModal } from './components/ExportModal';
import { GoogleFormSyncModal } from './components/GoogleFormSyncModal';
import { PERMIT_FORM_SECTIONS } from './data/permitTemplate';
import { getLocalizedSections } from './utils/permitLocalization';
import { getUIText } from './data/translations';
import { Language, PermitRecord, PermitStatus } from './types/permit';
import {
  loadPermits,
  savePermit as storageSavePermit,
  deletePermit as storageDeletePermit,
  updatePermitStatus as storageUpdateStatus,
  createBlankPermit,
} from './services/permitStorage';
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
  const [activeTab, setActiveTab] = useState<AppTab>('permits');
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>('th');

  // Permits state
  const [permits, setPermits] = useState<PermitRecord[]>([]);
  const [editingPermit, setEditingPermit] = useState<PermitRecord>(createBlankPermit());
  const [viewingPermit, setViewingPermit] = useState<PermitRecord | null>(null);

  // Load permits on app start
  useEffect(() => {
    const loaded = loadPermits();
    setPermits(loaded);
  }, []);

  // Listen to Auth state
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

  // Permit Actions
  const handleCreateNew = () => {
    const blank = createBlankPermit();
    setEditingPermit(blank);
    setActiveTab('editor');
  };

  const handleSelectForEdit = (permit: PermitRecord) => {
    setEditingPermit(permit);
    setActiveTab('editor');
  };

  const handleSavePermit = (saved: PermitRecord) => {
    const updated = storageSavePermit(saved);
    const refreshed = loadPermits();
    setPermits(refreshed);
    setEditingPermit(updated);
  };

  const handleDeletePermit = (id: string) => {
    storageDeletePermit(id);
    const refreshed = loadPermits();
    setPermits(refreshed);
  };

  const handleUpdateStatus = (id: string, status: PermitStatus) => {
    storageUpdateStatus(id, status);
    const refreshed = loadPermits();
    setPermits(refreshed);
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
        {activeTab === 'permits' && (
          <PermitList
            permits={permits}
            onSelectPermitForEdit={handleSelectForEdit}
            onSelectPermitForView={(p) => setViewingPermit(p)}
            onCreateNewPermit={handleCreateNew}
            onDeletePermit={handleDeletePermit}
            onUpdateStatus={handleUpdateStatus}
            currentLang={currentLang}
          />
        )}

        {activeTab === 'editor' && (
          <PermitFormEditor
            initialPermit={editingPermit}
            onSave={handleSavePermit}
            onCancel={() => setActiveTab('permits')}
            currentLang={currentLang}
          />
        )}

        {activeTab === 'specs' && (
          <SectionViewer
            sections={localizedSections}
            onOpenDeployModal={() => setIsDeployModalOpen(true)}
            onOpenAppsScriptTab={() => setActiveTab('export')}
            currentLang={currentLang}
            onLanguageChange={setCurrentLang}
          />
        )}

        {activeTab === 'matrix' && <RiskMatrixCard currentLang={currentLang} />}

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
              {getUIText('footerTitle', currentLang)}
            </p>
            <p className="text-[11px] text-slate-400">
              {getUIText('footerDesc', currentLang)}
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {getUIText('footerActiveCount', currentLang)} {permits.length}
            </span>
            <span>•</span>
            <span>{getUIText('footerStandard', currentLang)}</span>
          </div>
        </div>
      </footer>

      {/* Viewing & Printable Permit Modal */}
      <PermitDetailModal
        permit={viewingPermit}
        onClose={() => setViewingPermit(null)}
        onEdit={(p) => {
          setEditingPermit(p);
          setActiveTab('editor');
        }}
        currentLang={currentLang}
      />

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
