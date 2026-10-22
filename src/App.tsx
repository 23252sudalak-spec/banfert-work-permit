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
import { WeChatUser, WeChatNotification, TARGET_SAFETY_OFFICER_WXID } from './types/wechat';
import { getSavedQQUser, clearQQUserSession } from './services/qqAuthService';
import { getSavedWeChatUser, clearWeChatUserSession } from './services/wechatAuthService';
import {
  getWeChatNotifications,
  getUnreadWeChatCount,
  updateWeChatNotificationStatus,
} from './services/wechatNotificationService';
import { QQMailAuthModal } from './components/QQMailAuthModal';
import { WeChatAuthModal } from './components/WeChatAuthModal';
import { WeChatNotificationModal } from './components/WeChatNotificationModal';
import { WeChatToast } from './components/WeChatToast';
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

  // WeChat Auth State
  const [wechatUser, setWechatUser] = useState<WeChatUser | null>(null);
  const [isWeChatModalOpen, setIsWeChatModalOpen] = useState<boolean>(false);

  // WeChat Notifications State (dedicated to wxid_fsgmwe1ebk7l12)
  const [wechatNotifications, setWechatNotifications] = useState<WeChatNotification[]>([]);
  const [unreadWeChatCount, setUnreadWeChatCount] = useState<number>(0);
  const [isWeChatNotificationModalOpen, setIsWeChatNotificationModalOpen] = useState<boolean>(false);

  // Permits state
  const [permits, setPermits] = useState<PermitRecord[]>([]);
  const [editingPermit, setEditingPermit] = useState<PermitRecord>(createBlankPermit());
  const [viewingPermit, setViewingPermit] = useState<PermitRecord | null>(null);

  const refreshWeChatNotifications = () => {
    const list = getWeChatNotifications();
    setWechatNotifications(list);
    setUnreadWeChatCount(getUnreadWeChatCount());
  };

  // Load permits, QQ user, WeChat user, and notifications on app start
  useEffect(() => {
    const loaded = loadPermits();
    setPermits(loaded);

    const savedQQ = getSavedQQUser();
    if (savedQQ) {
      setQQUser(savedQQ);
    }

    const savedWX = getSavedWeChatUser();
    if (savedWX) {
      setWechatUser(savedWX);
    }

    refreshWeChatNotifications();

    const handleNotifUpdate = () => {
      refreshWeChatNotifications();
    };

    window.addEventListener('wechat-notifications-updated', handleNotifUpdate);
    window.addEventListener('wechat-alert-dispatched', handleNotifUpdate);
    return () => {
      window.removeEventListener('wechat-notifications-updated', handleNotifUpdate);
      window.removeEventListener('wechat-alert-dispatched', handleNotifUpdate);
    };
  }, []);

  const handleLogoutQQ = () => {
    clearQQUserSession();
    setQQUser(null);
  };

  const handleLogoutWeChat = () => {
    clearWeChatUserSession();
    setWechatUser(null);
  };

  const handleApproveFromWeChat = (permitId: string) => {
    storageUpdateStatus(permitId, 'approved');
    updateWeChatNotificationStatus(permitId, 'approved');
    const refreshed = loadPermits();
    setPermits(refreshed);
    refreshWeChatNotifications();
  };

  const handleViewPermitFromWeChat = (permitId: string) => {
    const found = permits.find((p) => p.id === permitId || p.permitNumber === permitId);
    if (found) {
      setViewingPermit(found);
    }
  };

  // Permit Actions
  const handleCreateNew = () => {
    const blank = createBlankPermit();
    if (wechatUser) {
      if (wechatUser.role === 'safety_officer') {
        blank.safetyOfficerName = wechatUser.nickname;
      } else {
        blank.applicantName = wechatUser.nickname;
        blank.company = wechatUser.company;
        blank.phone = wechatUser.phone;
      }
    } else if (qqUser) {
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
        wechatUser={wechatUser}
        onOpenWeChatLogin={() => setIsWeChatModalOpen(true)}
        onLogoutWeChat={handleLogoutWeChat}
        unreadWeChatCount={unreadWeChatCount}
        onOpenWeChatNotifications={() => setIsWeChatNotificationModalOpen(true)}
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
            wechatUser={wechatUser}
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
            <span className="text-emerald-400 font-mono">
              WeChat จป. ID: {TARGET_SAFETY_OFFICER_WXID}
            </span>
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
        onSwitchToWeChat={() => setIsWeChatModalOpen(true)}
        currentLang={currentLang}
      />

      {/* WeChat Auth Modal */}
      <WeChatAuthModal
        isOpen={isWeChatModalOpen}
        onClose={() => setIsWeChatModalOpen(false)}
        onLoginSuccess={(user) => {
          setWechatUser(user);
        }}
        onSwitchToQQ={() => setIsQQModalOpen(true)}
        currentLang={currentLang}
      />

      {/* WeChat Notification Center Modal (wxid_fsgmwe1ebk7l12) */}
      <WeChatNotificationModal
        isOpen={isWeChatNotificationModalOpen}
        onClose={() => setIsWeChatNotificationModalOpen(false)}
        notifications={wechatNotifications}
        onApprovePermit={handleApproveFromWeChat}
        onViewPermit={handleViewPermitFromWeChat}
        onRefreshNotifications={refreshWeChatNotifications}
        currentLang={currentLang}
      />

      {/* Real-time WeChat notification toast */}
      <WeChatToast
        currentLang={currentLang}
        onOpenNotificationModal={() => setIsWeChatNotificationModalOpen(true)}
      />
    </div>
  );
}
