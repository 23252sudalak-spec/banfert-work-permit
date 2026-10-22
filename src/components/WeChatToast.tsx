import React, { useState, useEffect } from 'react';
import { MessageCircle, Check, X, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { WeChatNotification, TARGET_SAFETY_OFFICER_WXID } from '../types/wechat';
import { copyWeChatMessage } from '../services/wechatNotificationService';
import { Language } from '../types/permit';
import { getUIText } from '../data/translations';

interface WeChatToastProps {
  currentLang: Language;
  onOpenNotificationModal: () => void;
}

export const WeChatToast: React.FC<WeChatToastProps> = ({
  currentLang,
  onOpenNotificationModal,
}) => {
  const [activeNotif, setActiveNotif] = useState<WeChatNotification | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    const handleAlertDispatched = (e: Event) => {
      const customEvent = e as CustomEvent<WeChatNotification>;
      if (customEvent.detail) {
        setActiveNotif(customEvent.detail);
        setIsCopied(false);

        // Auto dismiss after 7 seconds
        const timer = setTimeout(() => {
          setActiveNotif((prev) => (prev?.id === customEvent.detail.id ? null : prev));
        }, 7000);
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('wechat-alert-dispatched', handleAlertDispatched);
    return () => {
      window.removeEventListener('wechat-alert-dispatched', handleAlertDispatched);
    };
  }, []);

  if (!activeNotif) return null;

  const handleCopy = async () => {
    if (!activeNotif) return;
    const ok = await copyWeChatMessage(activeNotif);
    if (ok) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm w-full animate-slideInRight">
      <div className="bg-slate-900 text-white rounded-2xl shadow-2xl border-2 border-emerald-500 overflow-hidden">
        {/* Top green bar */}
        <div className="bg-gradient-to-r from-emerald-600 to-[#07C160] px-3.5 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-bold">
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>ส่งแจ้งเตือน WeChat สำเร็จ!</span>
          </div>
          <button
            onClick={() => setActiveNotif(null)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3.5 space-y-2.5 text-xs">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-bold text-slate-100">{activeNotif.permitNumber}</p>
              <p className="text-[11px] text-slate-300">
                ผู้ยื่น: {activeNotif.applicantName} ({activeNotif.company})
              </p>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
              รอ จป. อนุมัติ
            </span>
          </div>

          <div className="bg-slate-800/80 rounded-xl p-2.5 border border-slate-700/80 text-[11px] space-y-1">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">ส่งตรงถึง WeChat จป.:</span>
              <span className="font-mono font-bold text-amber-300">
                {activeNotif.recipientWxid || TARGET_SAFETY_OFFICER_WXID}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">ระดับความเสี่ยง:</span>
              <span className="font-bold text-rose-400">
                {activeNotif.riskLevel.toUpperCase()} ({activeNotif.riskScore}/25)
              </span>
            </div>
          </div>

          {/* Quick buttons */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              onClick={handleCopy}
              className={`flex-1 py-1.5 px-2.5 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
                isCopied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {isCopied ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>คัดลอกแล้ว</span>
                </>
              ) : (
                <span>คัดลอกข้อความ</span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveNotif(null);
                onOpenNotificationModal();
              }}
              className="py-1.5 px-3 bg-[#07C160] hover:bg-emerald-600 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 transition-transform hover:scale-105 active:scale-95"
            >
              <span>เปิดดู</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
