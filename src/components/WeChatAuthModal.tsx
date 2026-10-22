import React, { useState } from 'react';
import {
  X,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Smartphone,
  MessageCircle,
  Building,
  UserCheck,
  ArrowRight,
  Send,
} from 'lucide-react';
import { WeChatUser, PRESET_WECHAT_USERS, TARGET_SAFETY_OFFICER_WXID, WeChatUserRole } from '../types/wechat';
import {
  createOrLoginWeChatUser,
  getSafetyOfficerPreset,
} from '../services/wechatAuthService';
import { Language } from '../types/permit';
import { getUIText } from '../data/translations';

interface WeChatAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: WeChatUser) => void;
  onSwitchToQQ?: () => void;
  currentLang: Language;
}

export const WeChatAuthModal: React.FC<WeChatAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onSwitchToQQ,
  currentLang,
}) => {
  const [authTab, setAuthTab] = useState<'qrcode' | 'wxid'>('qrcode');
  const [wxidInput, setWxidInput] = useState<string>(TARGET_SAFETY_OFFICER_WXID);
  const [customRole, setCustomRole] = useState<WeChatUserRole>('safety_officer');
  const [customName, setCustomName] = useState<string>('周安华 (Senior Safety Officer)');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectPreset = (preset: WeChatUser) => {
    setWxidInput(preset.wxid);
    setCustomRole(preset.role);
    setCustomName(preset.nickname);
    setErrorMsg(null);
  };

  const handleFastLoginSafetyOfficer = () => {
    const soPreset = getSafetyOfficerPreset();
    const user = createOrLoginWeChatUser(
      TARGET_SAFETY_OFFICER_WXID,
      'quick_login',
      'safety_officer',
      soPreset.nickname
    );
    setSuccessMsg(
      currentLang === 'zh'
        ? `欢迎安全主任！已使用微信 ${user.wxid} 登录`
        : currentLang === 'my'
        ? `ကြိုဆိုပါသည် လုံခြုံရေးအရာရှိ! WeChat ${user.wxid} ဖြင့် ဝင်ရောက်ပြီးပါပြီ`
        : `ยินดีต้อนรับ จป.วิชาชีพ! เข้าสู่ระบบด้วย WeChat ${user.wxid} สำเร็จ`
    );
    setTimeout(() => {
      onLoginSuccess(user);
      onClose();
    }, 400);
  };

  const handleSimulateQrScan = (targetUser?: WeChatUser) => {
    setIsScanning(true);
    setErrorMsg(null);
    setTimeout(() => {
      setIsScanning(false);
      const chosen = targetUser || PRESET_WECHAT_USERS[0];
      const user = createOrLoginWeChatUser(
        chosen.wxid,
        'wechat_qrcode',
        chosen.role,
        chosen.nickname
      );
      setSuccessMsg(
        currentLang === 'zh'
          ? `微信扫码成功！已登录微信号：${user.wxid}`
          : currentLang === 'my'
          ? `WeChat စကင်န် အောင်မြင်ပါသည်! WeChat ID: ${user.wxid}`
          : `สแกน WeChat สำเร็จ! เข้าสู่ระบบด้วย WeChat ID: ${user.wxid}`
      );
      setTimeout(() => {
        onLoginSuccess(user);
        onClose();
      }, 500);
    }, 800);
  };

  const handleWxidLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = wxidInput.trim();
    if (!clean) {
      setErrorMsg(
        currentLang === 'zh'
          ? '请输入有效的微信号或手机号'
          : currentLang === 'my'
          ? 'ကျေးဇူးပြု၍ WeChat ID သို့မဟုတ် ဖုန်းနံပါတ် ထည့်ပါ'
          : 'กรุณากรอก WeChat ID หรือหมายเลขโทรศัพท์'
      );
      return;
    }

    const user = createOrLoginWeChatUser(clean, 'wxid', customRole, customName);
    setSuccessMsg(
      currentLang === 'zh'
        ? `微信登录成功！当前微信号：${user.wxid}`
        : currentLang === 'my'
        ? `WeChat ဖြင့် အကောင့်ဝင်ပြီးပါပြီ - ${user.wxid}`
        : `เข้าสู่ระบบ WeChat สำเร็จ! บัญชี: ${user.wxid}`
    );
    setTimeout(() => {
      onLoginSuccess(user);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200">
        {/* Header with WeChat Brand Colors */}
        <div className="bg-gradient-to-r from-emerald-600 via-[#07C160] to-emerald-700 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#07C160] flex items-center justify-center shadow-lg shadow-black/10">
              <MessageCircle className="w-7 h-7 fill-[#07C160]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                  {getUIText('wechatModalTitle', currentLang)}
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                  WeChat
                </span>
              </div>
              <p className="text-xs text-emerald-100 mt-0.5">
                {getUIText('wechatModalDesc', currentLang)}
              </p>
            </div>
          </div>

          {/* Dedicated Safety Officer WeChat Alert Banner */}
          <div className="mt-3 bg-white/15 backdrop-blur-sm rounded-xl p-2.5 border border-white/20 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-300 shrink-0 animate-ping" />
              <div className="text-[11px] leading-tight truncate">
                <span className="font-bold text-amber-200">จป.วิชาชีพ ID: </span>
                <span className="font-mono font-bold text-white tracking-wider underline">
                  {TARGET_SAFETY_OFFICER_WXID}
                </span>
                <span className="text-emerald-100 hidden sm:inline ml-1">
                  (รับการแจ้งเตือนขออนุมัติอัตโนมัติ)
                </span>
              </div>
            </div>
            <button
              onClick={handleFastLoginSafetyOfficer}
              className="px-2.5 py-1 bg-white text-[#07C160] hover:bg-emerald-50 rounded-lg text-xs font-bold shrink-0 transition-transform hover:scale-105 active:scale-95 shadow-sm"
            >
              1-Click เข้าสู่ระบบ
            </button>
          </div>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 p-1.5 gap-2 text-xs">
          <button
            onClick={() => {
              setAuthTab('qrcode');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              authTab === 'qrcode'
                ? 'bg-white text-emerald-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <QrCode className="w-4 h-4 text-[#07C160]" />
            <span>{getUIText('tabWeChatQr', currentLang)}</span>
          </button>
          <button
            onClick={() => {
              setAuthTab('wxid');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              authTab === 'wxid'
                ? 'bg-white text-emerald-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4 text-[#07C160]" />
            <span>{getUIText('tabWeChatId', currentLang)}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{successMsg}</span>
            </div>
          )}

          {/* TAB 1: QR Code Scan */}
          {authTab === 'qrcode' && (
            <div className="text-center py-2 space-y-4">
              <p className="text-xs text-slate-600">
                {currentLang === 'zh'
                  ? '请使用手机微信扫描下方安全二维码，或点击模拟扫码以 จป.วิชาชีพ'
                  : currentLang === 'my'
                  ? 'အောက်ပါ QR Code ကို WeChat ဖြင့် စကင်န်ဖတ်ပါ သို့မဟုတ် လုံခြုံရေးအရာရှိအဖြစ် စမ်းသပ်ဝင်ပါ'
                  : 'เปิดแอป WeChat บนมือถือแล้วสแกน QR Code นี้ หรือคลิกจำลองเพื่อเข้าใช้งานทันที'}
              </p>

              {/* QR Code Container */}
              <div className="relative inline-block p-4 bg-white rounded-3xl border-2 border-emerald-500/40 shadow-xl shadow-emerald-500/10">
                <div className="w-48 h-48 bg-slate-900 rounded-2xl flex flex-col items-center justify-center p-3 relative overflow-hidden group">
                  {/* Decorative QR Pattern */}
                  <div className="grid grid-cols-6 gap-1.5 w-full h-full opacity-90">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-sm transition-all duration-500 ${
                          i % 5 === 0 || i % 7 === 0 || i < 6 || i > 29 || i % 6 === 0 || i % 6 === 5
                            ? 'bg-emerald-400'
                            : (i * 3) % 4 === 0
                            ? 'bg-emerald-500'
                            : 'bg-emerald-200/40'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Center WeChat Logo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center border-2 border-[#07C160]">
                      <MessageCircle className="w-8 h-8 fill-[#07C160] text-[#07C160]" />
                    </div>
                  </div>

                  {/* Scanning active overlay */}
                  {isScanning && (
                    <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                      <div className="w-8 h-8 border-3 border-emerald-400 border-t-transparent rounded-full animate-spin mb-2" />
                      <span className="text-xs font-bold text-emerald-300">
                        กำลังตรวจสอบสิทธิ์ WeChat...
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-2 text-[11px] font-mono text-emerald-700 font-bold">
                  WeChat ID: {TARGET_SAFETY_OFFICER_WXID}
                </div>
              </div>

              {/* Action Buttons for QR */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  disabled={isScanning}
                  onClick={() => handleSimulateQrScan(PRESET_WECHAT_USERS[0])}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#07C160] hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>จำลองสแกนเป็น จป.วิชาชีพ ({TARGET_SAFETY_OFFICER_WXID})</span>
                </button>
                <button
                  type="button"
                  disabled={isScanning}
                  onClick={() => handleSimulateQrScan(PRESET_WECHAT_USERS[1])}
                  className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>สแกนเป็นผู้รับเหมา</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: WeChat ID Input Form */}
          {authTab === 'wxid' && (
            <form onSubmit={handleWxidLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {getUIText('labelWeChatId', currentLang)}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-600">
                    <MessageCircle className="w-4 h-4 fill-emerald-100" />
                  </div>
                  <input
                    type="text"
                    value={wxidInput}
                    onChange={(e) => setWxidInput(e.target.value)}
                    placeholder={getUIText('placeholderWeChatId', currentLang)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    บทบาทหน้าที่ (Role):
                  </label>
                  <select
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value as WeChatUserRole)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="safety_officer">จป.วิชาชีพ (Safety Officer)</option>
                    <option value="contractor">ผู้รับเหมา/วิศวกร (Contractor)</option>
                    <option value="supervisor">หัวหน้างานโครงการ (Supervisor)</option>
                    <option value="inspector">ผู้ตรวจสอบ (Inspector)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ชื่อ-นามสกุล (Name):
                  </label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="เช่น 周安华 หรือ สมเกียรติ"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#07C160] hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2"
              >
                <span>{getUIText('btnLoginWeChat', currentLang)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Quick Preset Selector */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                บัญชี WeChat แนะนำสำหรับโครงการ:
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {PRESET_WECHAT_USERS.map((preset) => {
                const isTarget = preset.wxid === TARGET_SAFETY_OFFICER_WXID;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`p-2 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                      wxidInput === preset.wxid
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20'
                        : 'bg-slate-50/80 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-mono font-bold text-[11px] text-emerald-700 truncate">
                          {preset.wxid}
                        </span>
                        {isTarget && (
                          <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 text-[9px] font-bold rounded">
                            จป.เป้าหมาย
                          </span>
                        )}
                      </div>
                      <p className="font-semibold text-[11px] truncate">{preset.nickname}</p>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1">
                      {preset.roleTitle[currentLang === 'zh' ? 'zh' : currentLang === 'my' ? 'my' : 'th']}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Switch to QQ Mail Footer */}
          {onSwitchToQQ && (
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>ต้องการเข้าสู่ระบบด้วย QQ Mail แทน?</span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSwitchToQQ();
                }}
                className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 hover:underline"
              >
                <span>เข้าสู่ระบบด้วย QQ Mail</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
