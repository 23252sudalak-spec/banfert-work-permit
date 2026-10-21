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
import { PERMIT_FORM_SECTIONS } from './data/permitTemplate';
import { getLocalizedSections } from './utils/permitLocalization';
import { getUIText } from './data/translations';
import { Language, PermitRecord, PermitStatus } from './types/permit';
import { QQUser } from './types/qqUser';
import { getSavedQQUser, clearQQUserSession } from './services/qqAuthService';
import { QQMailAuthModal } from './components/QQMailAuthModal';
import {
  loadPermits,
  savePermit as storageSavePermit,
  deletePermit as storageDeletePermit,
  updatePermitStatus as storageUpdateStatus,
  createBlankPermit,
} from './services/permitStorage';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('permits');
  const [currentLang, setCurrentLang] = useState<Language>('th');

  // QQ Mail Auth State
  const [qqUser, setQQUser] = useState<QQUser | null>(null);
  const [isQQModalOpen, setIsQQModalOpen] = useState<boolean>(false);

  // Permits state
  const [permits, setPermits] = useState<PermitRecord[]>([]);
  const [editingPermit, setEditingPermit] = useState<PermitRecord>(createBlankPermit());
  const [viewingPermit, setViewingPermit] = useState<PermitRecord | null>(null);

  // Load permits and QQ user on app start
  useEffect(() => {
    const loaded = loadPermits();
    setPermits(loaded);
    const savedUser = getSavedQQUser();
    if (savedUser) {
      setQQUser(savedUser);
    }
  }, []);

  const handleLogoutQQ = () => {
    clearQQUserSession();
    setQQUser(null);
  };

  // Permit Actions
  const handleCreateNew = () => {
    const blank = createBlankPermit();
    if (qqUser) {
      blank.createdByEmail = qqUser.email;
      if (qqUser.role === 'safety_officer') {
        blank.safetyOfficerName = qqUser.nickname;
      } else {
        blank.applicantName = qqUser.nickname;
        blank.company = qqUser.company;
        blank.phone = qqUser.phone;
      }
    }
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

  // Sync HTML lang and data-lang attributes whenever currentLang changes
  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.setAttribute('data-lang', currentLang);
  }, [currentLang]);

  const localizedSections = getLocalizedSections(PERMIT_FORM_SECTIONS, currentLang);

  return (
    <div
      data-lang={currentLang}
      className="min-h-screen bg-slate-50 text-slate-900 flex flex-col transition-colors duration-150"
    >
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewPermit={handleCreateNew}
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        qqUser={qqUser}
        onOpenQQLogin={() => setIsQQModalOpen(true)}
        onLogoutQQ={handleLogoutQQ}
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
            qqUser={qqUser}
          />
        )}

        {activeTab === 'specs' && (
          <SectionViewer
            sections={localizedSections}
            onOpenAppsScriptTab={() => setActiveTab('export')}
            currentLang={currentLang}
            onLanguageChange={setCurrentLang}
          />
        )}

        {activeTab === 'matrix' && <RiskMatrixCard currentLang={currentLang} />}

        {activeTab === 'export' && (
          <ExportModal
            sections={PERMIT_FORM_SECTIONS}
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

      {/* Tencent QQ Mail Auth Modal */}
      <QQMailAuthModal
        isOpen={isQQModalOpen}
        onClose={() => setIsQQModalOpen(false)}
        onLoginSuccess={(user) => {
          setQQUser(user);
        }}
        currentLang={currentLang}
      />
    </div>
  );
}
