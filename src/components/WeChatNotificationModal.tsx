import React, { useState } from 'react';
import {
  X,
  MessageCircle,
  Copy,
  Check,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Sparkles,
  RefreshCw,
  Send,
  Building,
  User,
  MapPin,
} from 'lucide-react';
import { WeChatNotification, TARGET_SAFETY_OFFICER_WXID } from '../types/wechat';
import {
  copyWeChatMessage,
  markWeChatNotificationAsRead,
  markAllWeChatNotificationsAsRead,
  sendWeChatApprovalNotification,
} from '../services/wechatNotificationService';
import { PermitRecord, Language, PermitStatus } from '../types/permit';
import { getUIText } from '../data/translations';

interface WeChatNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: WeChatNotification[];
  onApprovePermit?: (permitId: string) => void;
  onViewPermit?: (permitId: string) => void;
  onRefreshNotifications: () => void;
  currentLang: Language;
}

export const WeChatNotificationModal: React.FC<WeChatNotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onApprovePermit,
  onViewPermit,
  onRefreshNotifications,
  currentLang,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'approved'>('all');
  const [justDispatchedTest, setJustDispatchedTest] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopy = async (notif: WeChatNotification) => {
    const ok = await copyWeChatMessage(notif);
    if (ok) {
      setCopiedId(notif.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleMarkRead = (id: string) => {
    markWeChatNotificationAsRead(id);
    onRefreshNotifications();
  };

  const handleMarkAllRead = () => {
    markAllWeChatNotificationsAsRead();
    onRefreshNotifications();
  };

  const handleTestSendNew = () => {
    const dummyPermit: PermitRecord = {
      id: `PTW-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      permitNumber: `PTW-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'pending_approval',
      applicantName: 'เกรียงศักดิ์ วงศ์สวัสดิ์ (Site Supervisor)',
      applicantRole: 'ผู้ควบคุมงานระบบไฟฟ้าแรงดันสูง',
      company: 'บจก. ไทย-ไชน่า พาวเวอร์ เอ็นจิเนียริ่ง (TCE Co., Ltd.)',
      phone: '089-812-3490',
      location: 'สถานีย่อยหม้อแปลงไฟฟ้า 115kV อาคาร B',
      workDate: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '17:30',
      workerCount: 5,
      riskTypes: [
        'งานเกี่ยวกับระบบไฟฟ้าแรงดันสูง (Electrical Work / 电气作业)',
        'งานบนที่สูงเกิน 2 เมตร (Working at Heights / 高处作业)',
      ],
      jobDescription: 'งานติดตั้งหม้อแปลงไฟฟ้าแรงสูงและเดินท่อร้อยสายเคเบิลบนโครงสร้างเหล็กสูง 4 เมตร',
      workerRoster: '1. เกรียงศักดิ์ 2. พงษ์ศักดิ์ 3. สมเกียรติ 4. อภิสิทธิ์ 5. เมียนมา-จอจอ',
      selectedPPE: ['หมวกนิรภัย', 'ถุงมือกันไฟฟ้าแรงสูง', 'เข็มขัดนิรภัย Full Body Harness'],
      safetyControls: ['ตัดวงจรไฟฟ้า Lockout/Tagout', 'ตรวจวัดแรงดันด้วยโวลต์มิเตอร์', 'ติดตั้งตาข่ายกันตก'],
      complianceAgreed: true,
      applicantSignature: 'เกรียงศักดิ์ ว.',
      safetyOfficerName: '周安华 (Senior Safety Officer)',
      approvalDecision: 'pending',
      riskMatrix: {
        probability: 4,
        severity: 4,
        score: 16,
        level: 'high',
      },
    };

    sendWeChatApprovalNotification(dummyPermit);
    setJustDispatchedTest(true);
    onRefreshNotifications();
    setTimeout(() => setJustDispatchedTest(false), 2500);
  };

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return n.status === 'unread';
    if (filter === 'approved') return n.status === 'approved';
    return true;
  });

  const unreadCount = notifications.filter((n) => n.status === 'unread').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-[#07C160] to-emerald-700 text-white p-5 sm:p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#07C160] flex items-center justify-center shadow-lg shadow-black/10 shrink-0">
              <MessageCircle className="w-7 h-7 fill-[#07C160]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold">
                  {getUIText('wechatNotifyBellTitle', currentLang)}
                </h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                    {unreadCount} ใหม่
                  </span>
                )}
              </div>
              <p className="text-xs text-emerald-100 mt-0.5">
                ส่งการแจ้งเตือนขออนุมัติอัตโนมัติเข้า WeChat ของ จป.วิชาชีพ
              </p>
            </div>
          </div>

          {/* Dedicated Recipient Banner */}
          <div className="mt-3.5 bg-black/20 backdrop-blur-sm rounded-xl p-2.5 border border-white/20 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              <span className="text-emerald-100">ผู้รับข้อความแจ้งเตือน (จป.วิชาชีพ):</span>
              <span className="font-mono font-bold text-amber-300 bg-black/30 px-2 py-0.5 rounded">
                {TARGET_SAFETY_OFFICER_WXID}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleTestSendNew}
                className="px-2.5 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="ทดสอบส่งแจ้งเตือนจำลอง"
              >
                <Send className="w-3.5 h-3.5" />
                <span>ส่งแจ้งเตือนทดสอบ</span>
              </button>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="px-2.5 py-1 bg-white text-[#07C160] hover:bg-emerald-50 rounded-lg text-xs font-bold transition-colors"
                >
                  อ่านทั้งหมด
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs shrink-0">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                filter === 'all'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              ทั้งหมด ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                filter === 'unread'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              ยังไม่อนุมัติ/ใหม่ ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                filter === 'approved'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              อนุมัติแล้ว ({notifications.filter((n) => n.status === 'approved').length})
            </button>
          </div>

          {justDispatchedTest && (
            <span className="text-[11px] font-bold text-emerald-600 animate-pulse flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              ส่งเข้า wxid_fsgmwe1ebk7l12 สำเร็จ!
            </span>
          )}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-100/60">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-3">
              <div className="w-14 h-14 bg-slate-200/80 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
                <MessageCircle className="w-7 h-7" />
              </div>
              <p className="text-xs font-medium">
                {getUIText('wechatNoNotif', currentLang)}
              </p>
              <button
                onClick={handleTestSendNew}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#07C160] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-emerald-600 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{getUIText('wechatSendTestNotif', currentLang)}</span>
              </button>
            </div>
          ) : (
            filtered.map((notif) => {
              const isCopied = copiedId === notif.id;
              const isUnread = notif.status === 'unread';
              const isApproved = notif.status === 'approved';

              return (
                <div
                  key={notif.id}
                  className={`bg-white rounded-2xl border transition-all shadow-sm overflow-hidden ${
                    isUnread
                      ? 'border-emerald-300 ring-2 ring-emerald-400/20 shadow-md'
                      : 'border-slate-200 opacity-95'
                  }`}
                >
                  {/* WeChat Template Card Header */}
                  <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#07C160] text-white flex items-center justify-center">
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      </div>
                      <span className="font-bold text-slate-800">
                        微信服务通知 · PTW 待审批
                      </span>
                      {isUnread && (
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {new Date(notif.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-bold text-slate-900">
                            {notif.permitNumber}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              notif.riskLevel === 'extreme' || notif.riskScore >= 16
                                ? 'bg-rose-100 text-rose-700 border border-rose-300'
                                : notif.riskLevel === 'high' || notif.riskScore >= 12
                                ? 'bg-orange-100 text-orange-700 border border-orange-300'
                                : 'bg-amber-100 text-amber-700 border border-amber-300'
                            }`}
                          >
                            เสี่ยง: {notif.riskLevel.toUpperCase()} ({notif.riskScore}/25)
                          </span>
                          {isApproved && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              ✓ อนุมัติแล้ว
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2">
                          {notif.jobDescription}
                        </p>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-1.5 border border-slate-100">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>ผู้ยื่นขอ:</span>
                        </span>
                        <span className="font-semibold text-slate-800">
                          {notif.applicantName}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-slate-400" />
                          <span>บริษัท:</span>
                        </span>
                        <span className="font-medium text-slate-800 truncate max-w-[200px]">
                          {notif.company}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>สถานที่:</span>
                        </span>
                        <span className="font-medium text-slate-800 truncate max-w-[200px]">
                          {notif.location}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>วัน-เวลา:</span>
                        </span>
                        <span className="font-mono text-slate-700">
                          {notif.workDate} ({notif.workTimeRange})
                        </span>
                      </div>
                      <div className="flex items-start justify-between text-slate-600 pt-1 border-t border-slate-200/60">
                        <span className="flex items-center gap-1.5 shrink-0">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                          <span>งานเสี่ยง:</span>
                        </span>
                        <span className="text-[11px] text-right font-medium text-slate-800 ml-2">
                          {notif.riskTypes.slice(0, 2).join(', ')}
                          {notif.riskTypes.length > 2 && ` +อีก ${notif.riskTypes.length - 2} งาน`}
                        </span>
                      </div>
                    </div>

                    {/* Recipient Notice */}
                    <div className="text-[11px] text-emerald-800 bg-emerald-50/90 rounded-lg px-2.5 py-1.5 border border-emerald-200/70 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>แจ้งเตือนถึง จป.วิชาชีพ ID: </span>
                        <span className="font-mono font-bold">{notif.recipientWxid}</span>
                      </span>
                      <span className="text-[10px] text-emerald-600">
                        {isUnread ? 'รอ จป. อนุมัติ' : 'ตรวจสอบแล้ว'}
                      </span>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(notif)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                            isCopied
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>{getUIText('wechatCopySuccess', currentLang)}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>{getUIText('wechatBtnCopy', currentLang)}</span>
                            </>
                          )}
                        </button>

                        <a
                          href={`weixin://dl/chat?username=${TARGET_SAFETY_OFFICER_WXID}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#07C160] rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                          title="เปิดแอป WeChat"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>{getUIText('wechatBtnOpen', currentLang)}</span>
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        {onViewPermit && (
                          <button
                            onClick={() => {
                              handleMarkRead(notif.id);
                              onViewPermit(notif.permitId);
                              onClose();
                            }}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                          >
                            ดูใบอนุญาต
                          </button>
                        )}

                        {onApprovePermit && !isApproved && (
                          <button
                            onClick={() => {
                              onApprovePermit(notif.permitId);
                              handleMarkRead(notif.id);
                            }}
                            className="px-3.5 py-1.5 bg-[#07C160] hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{getUIText('wechatBtnApprove', currentLang)}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-mono text-[11px]">
              WeChat Push Webhook: Active (Recipient: {TARGET_SAFETY_OFFICER_WXID})
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl transition-colors"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};
