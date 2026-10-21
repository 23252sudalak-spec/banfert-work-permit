import React, { useState } from 'react';
import {
  X,
  CloudLightning,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Globe,
} from 'lucide-react';
import { FormSection, Language } from '../types/permit';
import { createGoogleFormFromSections, CreateFormResult } from '../services/googleFormsApi';
import { getLocalizedSections } from '../utils/permitLocalization';
import { type User } from '../services/firebase';

interface GoogleFormSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  sections: FormSection[];
  user: User | null;
  accessToken: string | null;
  onLogin: () => void;
  currentLang: Language;
}

export const GoogleFormSyncModal: React.FC<GoogleFormSyncModalProps> = ({
  isOpen,
  onClose,
  sections,
  user,
  accessToken,
  onLogin,
  currentLang,
}) => {
  const [formLang, setFormLang] = useState<Language>(currentLang);
  const [formTitle, setFormTitle] = useState(
    'ใบอนุญาตปฏิบัติงานที่มีความเสี่ยง (Permit to Work - PTW) [จป.วิชาชีพ]'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progressStatus, setProgressStatus] = useState<string>('');
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [result, setResult] = useState<CreateFormResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const totalQuestions = sections.reduce((acc, sec) => acc + sec.questions.length, 0);

  const handleLangChange = (newLang: Language) => {
    setFormLang(newLang);
    if (newLang === 'zh') {
      setFormTitle('危险作业安全许可申请表 (Permit to Work - PTW)');
    } else if (newLang === 'my') {
      setFormTitle('အန္တရာယ်ရှိသောအလုပ်လုပ်ကိုင်ခွင့် (Permit to Work - PTW)');
    } else if (newLang === 'bilingual_th_my') {
      setFormTitle('ใบอนุญาตทำงานเสี่ยง / အန္တရာယ်ရှိသောအလုပ်လုပ်ကိုင်ခွင့် (PTW TH-MY)');
    } else if (newLang === 'bilingual_th_zh') {
      setFormTitle('ใบอนุญาตทำงานเสี่ยง / 危险作业许可申请表 (PTW TH-ZH)');
    } else if (newLang === 'trilingual') {
      setFormTitle('ใบอนุญาตทำงานเสี่ยง | 危险作业许可 | အလုပ်လုပ်ကိုင်ခွင့် (PTW)');
    } else {
      setFormTitle('ใบอนุญาตปฏิบัติงานที่มีความเสี่ยง (Permit to Work - PTW) [จป.วิชาชีพ]');
    }
  };

  const handleCreate = async () => {
    if (!accessToken) {
      onLogin();
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setProgressStatus('กำลังเตรียมข้อมูลในภาษาที่เลือก...');
    setProgressPercentage(5);

    try {
      const localized = getLocalizedSections(sections, formLang);

      const created = await createGoogleFormFromSections(
        localized,
        accessToken,
        formTitle,
        (status, pct) => {
          setProgressStatus(status);
          setProgressPercentage(pct);
        }
      );
      setResult(created);
    } catch (err: any) {
      console.error('Error creating Google Form:', err);
      setErrorMessage(
        err.message ||
          'เกิดข้อผิดพลาดในการสร้าง Google Form โปรดตรวจสอบการอนุญาตสิทธิ์และลองใหม่อีกครั้ง'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyLink = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.responderUri);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden text-slate-800">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center">
              <CloudLightning className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                สร้าง Google Form ในบัญชี Google Drive ของคุณ
              </h3>
              <p className="text-xs text-slate-400">
                รองรับภาษาไทย ภาษาจีน ภาษาพม่า และสองภาษาคู่ขนาน
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          {!result ? (
            <>
              {/* Language Selection for Form Generation */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-amber-600" />
                  <span>เลือกภาษาของแบบฟอร์มที่จะสร้าง (Form Language):</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
                  {[
                    { id: 'th', label: '🇹🇭 ภาษาไทย' },
                    { id: 'zh', label: '🇨🇳 中文 (จีน)' },
                    { id: 'my', label: '🇲🇲 မြန်မာ (พม่า)' },
                    { id: 'bilingual_th_my', label: '🇹🇭🇲🇲 ไทย + พม่า' },
                    { id: 'bilingual_th_zh', label: '🇹🇭🇨🇳 ไทย + จีน' },
                    { id: 'trilingual', label: '🌐 3 ภาษาคู่ขนาน' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleLangChange(item.id as Language)}
                      disabled={isSubmitting}
                      className={`px-2.5 py-1.5 rounded-xl border text-left font-medium transition-all ${
                        formLang === item.id
                          ? 'bg-amber-500 border-amber-600 text-slate-950 font-bold shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Title Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  ชื่อแบบฟอร์ม Google Form:
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white disabled:opacity-60"
                />
              </div>

              {/* Mandatory User Confirmation Notice */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-amber-950">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>การยืนยันดำเนินการ (User Confirmation)</span>
                </div>
                <p className="leading-relaxed text-[11px]">
                  ระบบจะสร้างแบบฟอร์ม <strong>4 ส่วน (Sections)</strong> และ <strong>{totalQuestions} ข้อคำถาม</strong> ในภาษา <strong>{formLang.toUpperCase()}</strong> ลงใน Google Drive ของคุณโดยตรง
                </p>
              </div>

              {/* Account State Notice */}
              {!user || !accessToken ? (
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-2.5 text-xs text-blue-900">
                  <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">เข้าสู่ระบบเพื่อดำเนินการ:</span>
                    <p className="text-blue-800 text-[11px] mt-0.5">
                      โปรดเข้าสู่ระบบด้วย Google เพื่อให้สามารถสร้างฟอร์มลงบัญชี Drive ของคุณได้
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between text-xs p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-slate-600">บัญชีที่เชื่อมต่อ:</span>
                    <span className="font-semibold text-slate-900">{user.email}</span>
                  </div>
                  <span className="text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                    พร้อมสร้าง
                  </span>
                </div>
              )}

              {/* Progress Bar (if submitting) */}
              {isSubmitting && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-xs text-slate-600 font-medium">
                    <span>{progressStatus}</span>
                    <span>{progressPercentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300 rounded-full"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Error Alert */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">เกิดข้อผิดพลาดในการสร้างผ่าน API: </span>
                      <span>{errorMessage}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 bg-white/70 p-2 rounded-lg border border-rose-100">
                    💡 <strong>ทางเลือกแนะนำ:</strong> ท่านสามารถใช้แท็บ <strong>"ส่งออก / Apps Script"</strong> เพื่อคัดลอกโค้ดไปวางใน <a href="https://script.google.com" target="_blank" rel="noreferrer" className="text-amber-700 underline font-semibold">script.google.com</a> เพื่อสร้างแบบฟอร์มได้ 100% พร้อมระบบแนบไฟล์
                  </p>
                </div>
              )}

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50"
                >
                  ยกเลิก (Cancel)
                </button>

                {!user || !accessToken ? (
                  <button
                    type="button"
                    onClick={onLogin}
                    className="px-5 py-2.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow transition-all flex items-center gap-2"
                  >
                    <span>เข้าสู่ระบบ Google เพื่อดำเนินการ</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleCreate}
                    disabled={isSubmitting}
                    className="px-5 py-2.5 text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 rounded-xl shadow-lg shadow-amber-500/20 transition-all disabled:opacity-60 flex items-center gap-2 hover:scale-[1.02] active:scale-95"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>กำลังสร้างแบบฟอร์ม...</span>
                      </>
                    ) : (
                      <>
                        <CloudLightning className="w-4 h-4" />
                        <span>ยืนยันสร้าง Google Form ทันที</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </>
          ) : (
            /* Success State */
            <div className="space-y-4 text-center py-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900">
                  สร้าง Google Form สำเร็จเรียบร้อยแล้ว! 🎉
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                  แบบฟอร์มในภาษา ({formLang.toUpperCase()}) พร้อม 4 หมวดหมู่และ 20 ข้อคำถาม บันทึกใน Google Drive ของคุณเรียบร้อยแล้ว
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-1.5 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">ชื่อแบบฟอร์ม:</span>
                  <span className="font-bold text-slate-900">{result.title}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Form ID:</span>
                  <span className="font-mono text-slate-600 text-[11px] select-all">
                    {result.formId}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                <a
                  href={result.editUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>เปิดแก้ไขใน Google Forms</span>
                </a>

                <a
                  href={result.responderUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>ดูหน้ากรอกฟอร์มจริง</span>
                </a>

                <button
                  onClick={handleCopyLink}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all border border-slate-200"
                  title="คัดลอกลิงก์ฟอร์ม"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">คัดลอกแล้ว</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>คัดลอกลิงก์</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setResult(null);
                    onClose();
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  ปิดหน้าต่างนี้
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
