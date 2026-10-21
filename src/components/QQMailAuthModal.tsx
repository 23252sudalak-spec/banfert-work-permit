import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  Lock,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Copy,
  Sparkles,
  Smartphone,
  Send,
  Building,
  UserCheck,
} from 'lucide-react';
import { QQUser, PRESET_QQ_USERS, QQUserRole } from '../types/qqUser';
import {
  createOrLoginQQUser,
  sendQQMailVerificationCode,
  verifyQQMailCode,
  sanitizeQQEmail,
} from '../services/qqAuthService';
import { Language } from '../types/permit';
import { getUIText } from '../data/translations';

interface QQMailAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: QQUser) => void;
  currentLang: Language;
}

export const QQMailAuthModal: React.FC<QQMailAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentLang,
}) => {
  const [authTab, setAuthTab] = useState<'password' | 'code' | 'qrcode'>('password');
  const [emailInput, setEmailInput] = useState<string>('238914829@qq.com');
  const [passwordInput, setPasswordInput] = useState<string>('••••••••••••');
  const [codeInput, setCodeInput] = useState<string>('');
  const [customRole, setCustomRole] = useState<QQUserRole>('safety_officer');
  const [customName, setCustomName] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(0);
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  if (!isOpen) return null;

  const handleSelectPreset = (preset: QQUser) => {
    setEmailInput(preset.email);
    setPasswordInput('qq123456');
    setCustomRole(preset.role);
    setCustomName(preset.nickname);
    setErrorMsg(null);
  };

  const handleSendCode = () => {
    const clean = sanitizeQQEmail(emailInput);
    if (!clean || (!clean.includes('@qq.com') && !clean.includes('@foxmail.com') && !/^\d+$/.test(clean))) {
      setErrorMsg(
        currentLang === 'zh'
          ? '请输入有效的 QQ 邮箱 (如 123456@qq.com)'
          : currentLang === 'my'
          ? 'ကျေးဇူးပြု၍ မှန်ကန်သော QQ Mail ထည့်ပါ (ဥပမာ 123456@qq.com)'
          : 'กรุณากรอกอีเมล QQ Mail ที่ถูกต้อง (เช่น 123456@qq.com)'
      );
      return;
    }

    const { code } = sendQQMailVerificationCode(clean);
    setGeneratedOtp(code);
    setCodeInput(code); // autofill for convenient demo
    setCountdown(60);
    setErrorMsg(null);
    setSuccessMsg(
      currentLang === 'zh'
        ? `验证码已发送至 ${clean}，测试验证码为：${code}`
        : currentLang === 'my'
        ? `${clean} သို့ စမ်းသပ်ကုဒ် ${code} ပေးပို့ပြီးပါပြီ`
        : `ส่งรหัสยืนยันไปยัง ${clean} แล้ว (รหัสทดสอบ: ${code})`
    );
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = sanitizeQQEmail(emailInput);
    if (!clean) {
      setErrorMsg(
        currentLang === 'zh'
          ? '请输入 QQ 号码或 QQ 邮箱'
          : 'กรุณากรอกหมายเลข QQ หรืออีเมล QQ Mail'
      );
      return;
    }

    if (!passwordInput.trim()) {
      setErrorMsg(
        currentLang === 'zh'
          ? '请输入 QQ 邮箱密码或独立授权码'
          : 'กรุณากรอกรหัสผ่าน QQ Mail'
      );
      return;
    }

    const user = createOrLoginQQUser(clean, 'password', customRole, customName);
    onLoginSuccess(user);
    onClose();
  };

  const handleCodeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = sanitizeQQEmail(emailInput);
    if (!clean) {
      setErrorMsg(
        currentLang === 'zh'
          ? '请输入 QQ 邮箱'
          : 'กรุณากรอกอีเมล QQ Mail'
      );
      return;
    }

    if (!codeInput.trim()) {
      setErrorMsg(
        currentLang === 'zh'
          ? '请输入 6 位数字验证码'
          : 'กรุณากรอกรหัสยืนยัน 6 หลัก'
      );
      return;
    }

    const isValid = verifyQQMailCode(clean, codeInput);
    if (!isValid) {
      setErrorMsg(
        currentLang === 'zh'
          ? '验证码不正确或已过期'
          : 'รหัสยืนยันไม่ถูกต้องหรือหมดอายุ'
      );
      return;
    }

    const user = createOrLoginQQUser(clean, 'verification_code', customRole, customName);
    onLoginSuccess(user);
    onClose();
  };

  const handleScanQrLogin = () => {
    const user = createOrLoginQQUser(
      emailInput || '238914829@qq.com',
      'qq_qrcode',
      customRole,
      customName || '王建国 (Wang Jianguo)'
    );
    onLoginSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden text-slate-800 flex flex-col">
        {/* Tencent QQ Mail Branding Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white p-5 flex items-center justify-between shrink-0 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center gap-3 relative z-10">
            {/* Iconic Tencent QQ Mail Penguin / Mail Emblem */}
            <div className="w-11 h-11 rounded-2xl bg-white text-blue-600 flex items-center justify-center shadow-md shadow-blue-900/30 font-black text-xl">
              <span className="font-sans tracking-tighter text-[#1E6FFF] flex items-center">
                QQ
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-white">
                  {getUIText('qqMailModalTitle', currentLang)}
                </h3>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-400/25 text-blue-100 border border-blue-300/30">
                  Tencent
                </span>
              </div>
              <p className="text-xs text-blue-100 line-clamp-1 mt-0.5">
                {getUIText('qqMailModalDesc', currentLang)}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 transition-colors relative z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Quick Demo Safety Profiles */}
        <div className="bg-blue-50/70 border-b border-blue-100 p-3 text-xs space-y-1.5">
          <span className="font-bold text-blue-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            {getUIText('quickDemoAccounts', currentLang)}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {PRESET_QQ_USERS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`p-2 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  emailInput === preset.email
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white hover:bg-blue-50 text-slate-800 border-blue-200/80'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">
                    {preset.role === 'safety_officer' ? '🛡️' : preset.role === 'contractor' ? '👷' : '📋'}
                  </span>
                  <span className="font-bold truncate text-[11px]">{preset.nickname.split(' ')[0]}</span>
                </div>
                <span className={`text-[10px] truncate mt-1 ${emailInput === preset.email ? 'text-blue-100' : 'text-slate-500'}`}>
                  {preset.qqNumber}@qq.com
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 bg-slate-50 p-1.5 gap-1 text-xs">
          <button
            type="button"
            onClick={() => {
              setAuthTab('password');
              setErrorMsg(null);
            }}
            className={`flex-1 h-9 rounded-xl font-bold inline-flex items-center justify-center gap-1.5 transition-all ${
              authTab === 'password'
                ? 'bg-white text-blue-600 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>{getUIText('tabQQPassword', currentLang)}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthTab('code');
              setErrorMsg(null);
            }}
            className={`flex-1 h-9 rounded-xl font-bold inline-flex items-center justify-center gap-1.5 transition-all ${
              authTab === 'code'
                ? 'bg-white text-blue-600 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>{getUIText('tabQQCode', currentLang)}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthTab('qrcode');
              setErrorMsg(null);
            }}
            className={`flex-1 h-9 rounded-xl font-bold inline-flex items-center justify-center gap-1.5 transition-all ${
              authTab === 'qrcode'
                ? 'bg-white text-blue-600 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>{getUIText('tabQQQrCode', currentLang)}</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Notifications */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{successMsg}</span>
              </div>
              {generatedOtp && (
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedOtp);
                    setCopiedCode(true);
                    setTimeout(() => setCopiedCode(false), 2000);
                  }}
                  className="px-2 py-1 bg-emerald-200 hover:bg-emerald-300 text-emerald-900 rounded font-mono font-bold shrink-0 flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedCode ? '✓' : generatedOtp}</span>
                </button>
              )}
            </div>
          )}

          {/* Mode 1: Password Login */}
          {authTab === 'password' && (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {getUIText('labelQQEmail', currentLang)}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder={getUIText('placeholderQQEmail', currentLang)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 text-xs font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {getUIText('labelQQPassword', currentLang)}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder={getUIText('placeholderQQPassword', currentLang)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 text-xs font-mono"
                    required
                  />
                </div>
              </div>

              {/* Role & Name Selection */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    บทบาท / 职务身份:
                  </label>
                  <select
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value as QQUserRole)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                  >
                    <option value="safety_officer">จป.วิชาชีพ / 安全工程师</option>
                    <option value="contractor">ผู้รับเหมา / 施工承包商</option>
                    <option value="supervisor">หัวหน้างาน / 现场主管</option>
                    <option value="inspector">ผู้ตรวจงาน / 安全巡查员</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    ชื่อ-นามสกุล / 姓名:
                  </label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="เช่น 王建国 (Wang)"
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>{getUIText('btnLoginQQ', currentLang)}</span>
              </button>
            </form>
          )}

          {/* Mode 2: Verification Code (OTP) Login */}
          {authTab === 'code' && (
            <form onSubmit={handleCodeLogin} className="space-y-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {getUIText('labelQQEmail', currentLang)}
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder={getUIText('placeholderQQEmail', currentLang)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 text-xs font-medium"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSendCode}
                    disabled={countdown > 0}
                    className={`px-3 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                      countdown > 0
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {countdown > 0
                        ? `${getUIText('btnResendCode', currentLang)} (${countdown}s)`
                        : getUIText('btnGetCode', currentLang)}
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {getUIText('labelQQCode', currentLang)}
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  placeholder={getUIText('placeholderQQCode', currentLang)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 text-sm font-mono tracking-widest text-center font-bold"
                  required
                />
              </div>

              {/* Role Selection */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  บทบาท / 职务身份:
                </label>
                <select
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value as QQUserRole)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                >
                  <option value="safety_officer">จป.วิชาชีพ / 安全工程师</option>
                  <option value="contractor">ผู้รับเหมา / 施工承包商</option>
                  <option value="supervisor">หัวหน้างาน / 现场主管</option>
                  <option value="inspector">ผู้ตรวจงาน / 安全巡查员</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{getUIText('btnLoginQQ', currentLang)}</span>
              </button>
            </form>
          )}

          {/* Mode 3: QR Code Scan */}
          {authTab === 'qrcode' && (
            <div className="text-center py-2 space-y-4">
              <div className="w-48 h-48 mx-auto p-3 bg-white border-2 border-dashed border-blue-300 rounded-2xl flex flex-col items-center justify-center shadow-inner relative group">
                {/* Simulated Tencent QQ QR Code graphic */}
                <div className="grid grid-cols-6 gap-1 p-2 bg-slate-50 rounded-xl border border-slate-200">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-sm ${
                        (i % 2 === 0 || i % 5 === 0 || i < 7 || i > 28)
                          ? 'bg-slate-900'
                          : 'bg-blue-600/40'
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow ring-2 ring-white">
                    QQ
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-slate-800 text-xs">
                  {getUIText('scanQrInstruction', currentLang)}
                </p>
                <p className="text-[11px] text-slate-500">
                  支持手机 QQ • 企业微信 • 微信安全扫码验证
                </p>
              </div>

              <button
                type="button"
                onClick={handleScanQrLogin}
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Smartphone className="w-4 h-4" />
                <span>{getUIText('scanQrSimulateBtn', currentLang)}</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer info note */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 text-[11px] text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1 text-slate-400">
            <Building className="w-3.5 h-3.5" />
            Tencent QQ Mail Integration
          </span>
          <span className="text-blue-600 font-medium">SSL Encrypted 256-bit</span>
        </div>
      </div>
    </div>
  );
};
