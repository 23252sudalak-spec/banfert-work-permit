import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Printer,
  Send,
  Activity,
  Check,
} from 'lucide-react';
import { PermitRecord, Language, PermitStatus } from '../types/permit';
import { calculateRiskLevel } from '../services/permitStorage';
import {
  getUIText,
  PPE_ITEMS_MULTILINGUAL,
  SAFETY_CONTROLS_MULTILINGUAL,
  HIGH_RISK_TYPES_MULTILINGUAL,
} from '../data/translations';

interface PermitFormEditorProps {
  initialPermit: PermitRecord;
  onSave: (savedPermit: PermitRecord) => void;
  onCancel: () => void;
  currentLang: Language;
}

export const PermitFormEditor: React.FC<PermitFormEditorProps> = ({
  initialPermit,
  onSave,
  onCancel,
  currentLang,
}) => {
  const [formData, setFormData] = useState<PermitRecord>(initialPermit);
  const [activeSection, setActiveSection] = useState<number>(1);
  const [isSavedSuccess, setIsSavedSuccess] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    setFormData(initialPermit);
  }, [initialPermit]);

  const updateField = <K extends keyof PermitRecord>(field: K, value: PermitRecord[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleRiskType = (riskText: string) => {
    const current = formData.riskTypes || [];
    if (current.includes(riskText)) {
      updateField(
        'riskTypes',
        current.filter((r) => r !== riskText)
      );
    } else {
      updateField('riskTypes', [...current, riskText]);
    }
  };

  const togglePPE = (ppeItem: string) => {
    const current = formData.selectedPPE || [];
    if (current.includes(ppeItem)) {
      updateField(
        'selectedPPE',
        current.filter((p) => p !== ppeItem)
      );
    } else {
      updateField('selectedPPE', [...current, ppeItem]);
    }
  };

  const toggleSafetyControl = (ctrl: string) => {
    const current = formData.safetyControls || [];
    if (current.includes(ctrl)) {
      updateField(
        'safetyControls',
        current.filter((c) => c !== ctrl)
      );
    } else {
      updateField('safetyControls', [...current, ctrl]);
    }
  };

  const updateGasReading = (key: 'o2' | 'lel' | 'co' | 'h2s', value: string) => {
    setFormData((prev) => ({
      ...prev,
      gasReadings: {
        ...(prev.gasReadings || { o2: '20.9', lel: '0', co: '0', h2s: '0' }),
        [key]: value,
      },
    }));
  };

  const updateRiskMatrix = (prob: number, sev: number) => {
    const score = prob * sev;
    const level = calculateRiskLevel(score);
    updateField('riskMatrix', {
      probability: prob,
      severity: sev,
      score,
      level,
    });
  };

  const handleValidateAndSave = (overrideStatus?: PermitStatus) => {
    // Basic validation with multilingual error messages
    if (!formData.applicantName.trim()) {
      setValidationError(
        currentLang === 'zh'
          ? '请填写申请人/现场负责人姓名'
          : currentLang === 'my'
          ? 'လျှောက်ထားသူ အမည် ထည့်သွင်းပါ'
          : 'กรุณาระบุชื่อ-นามสกุล ผู้ขออนุญาต'
      );
      setActiveSection(1);
      return;
    }
    if (!formData.company.trim()) {
      setValidationError(
        currentLang === 'zh'
          ? '请填写施工单位/承包商名称'
          : currentLang === 'my'
          ? 'ကုမ္ပဏီ / ကန်ထရိုက်တာ အမည် ထည့်သွင်းပါ'
          : 'กรุณาระบุชื่อบริษัท / หน่วยงาน'
      );
      setActiveSection(1);
      return;
    }
    if (!formData.phone.trim()) {
      setValidationError(
        currentLang === 'zh'
          ? '请填写现场应急联络电话'
          : currentLang === 'my'
          ? 'အရေးပေါ် ဖုန်းနံပါတ် ထည့်သွင်းပါ'
          : 'กรุณาระบุเบอร์โทรศัพท์ฉุกเฉิน'
      );
      setActiveSection(1);
      return;
    }
    if (!formData.location.trim()) {
      setValidationError(
        currentLang === 'zh'
          ? '请填写施工作业位置'
          : currentLang === 'my'
          ? 'လုပ်ငန်းခွင်နေရာ ထည့်သွင်းပါ'
          : 'กรุณาระบุสถานที่ปฏิบัติงาน'
      );
      setActiveSection(1);
      return;
    }
    if (formData.riskTypes.length === 0) {
      setValidationError(
        currentLang === 'zh'
          ? '请在第 2 部分至少选择 1 项高危作业类别'
          : currentLang === 'my'
          ? 'အပိုင်း ၂ တွင် အနည်းဆုံး အန္တရာယ်ရှိသောအလုပ် ၁ ခု ရွေးပါ'
          : 'กรุณาเลือกประเภทของงานเสี่ยงอย่างน้อย 1 ประเภทในส่วนที่ 2'
      );
      setActiveSection(2);
      return;
    }
    if (!formData.jobDescription.trim()) {
      setValidationError(
        currentLang === 'zh'
          ? '请在第 3 部分填写工作内容描述与步骤'
          : currentLang === 'my'
          ? 'အပိုင်း ၃ တွင် အလုပ်အကြောင်းအရာ ဖော်ပြပါ'
          : 'กรุณากรอกคำอธิบายรายละเอียดงานในส่วนที่ 3'
      );
      setActiveSection(3);
      return;
    }

    setValidationError(null);

    const permitToSave: PermitRecord = {
      ...formData,
      status: overrideStatus || formData.status,
    };

    onSave(permitToSave);
    setIsSavedSuccess(true);
    setTimeout(() => {
      setIsSavedSuccess(false);
    }, 2500);
  };

  const isConfinedSpace = formData.riskTypes.some(
    (r) => r.includes('อับอากาศ') || r.includes('Confined') || r.includes('有限空间') || r.includes('ကျဉ်းကျပ်')
  );

  const o2Val = parseFloat(formData.gasReadings?.o2 || '0');
  const lelVal = parseFloat(formData.gasReadings?.lel || '0');
  const coVal = parseFloat(formData.gasReadings?.co || '0');
  const h2sVal = parseFloat(formData.gasReadings?.h2s || '0');

  const isGasSafe =
    o2Val >= 19.5 && o2Val <= 23.5 && lelVal < 10 && coVal < 25 && h2sVal < 10;

  return (
    <div className="space-y-6">
      {/* Top Header & Action Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors border border-slate-200"
            title={getUIText('backToList', currentLang)}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {formData.permitNumber}
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                  formData.status === 'approved'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : formData.status === 'pending_approval'
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : formData.status === 'closed'
                    ? 'bg-slate-100 text-slate-700 border-slate-300'
                    : 'bg-blue-100 text-blue-800 border-blue-300'
                }`}
              >
                {formData.status.toUpperCase()}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
              {getUIText('permitFormHeader', currentLang)}
            </h2>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto shrink-0">
          <button
            onClick={() => handleValidateAndSave('draft')}
            className="flex-1 md:flex-none h-10 inline-flex items-center justify-center gap-1.5 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all border border-slate-200 whitespace-nowrap leading-none"
          >
            <span>{getUIText('btnSaveDraft', currentLang)}</span>
          </button>

          <button
            onClick={() => handleValidateAndSave('pending_approval')}
            className="flex-1 md:flex-none h-10 inline-flex items-center justify-center gap-1.5 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-bold rounded-xl shadow-sm transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap leading-none"
          >
            <Send className="w-3.5 h-3.5 shrink-0" />
            <span>{getUIText('btnSubmitReview', currentLang)}</span>
          </button>

          <button
            onClick={() => handleValidateAndSave('approved')}
            className="flex-1 md:flex-none h-10 inline-flex items-center justify-center gap-1.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-sm transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap leading-none"
          >
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{getUIText('btnApprovePermit', currentLang)}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="h-10 w-10 inline-flex items-center justify-center bg-slate-900 text-white hover:bg-slate-800 rounded-xl transition-colors shrink-0"
            title={getUIText('btnPrintPermit', currentLang)}
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {isSavedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl flex items-center gap-2.5 text-xs font-bold shadow animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{getUIText('saveSuccessAlert', currentLang)}</span>
        </div>
      )}

      {/* Validation Error Alert */}
      {validationError && (
        <div className="p-3.5 bg-rose-50 border border-rose-300 text-rose-900 rounded-2xl flex items-center gap-2 text-xs font-semibold animate-shake">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Section Jump Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar bg-white p-2 rounded-2xl border border-slate-200 text-xs">
        {[
          { num: 1, key: 'secTab1' },
          { num: 2, key: 'secTab2' },
          { num: 3, key: 'secTab3' },
          { num: 4, key: 'secTab4' },
        ].map((tab) => (
          <button
            key={tab.num}
            onClick={() => setActiveSection(tab.num)}
            className={`h-10 px-3.5 rounded-xl font-bold whitespace-nowrap transition-all inline-flex items-center gap-2 shrink-0 leading-none ${
              activeSection === tab.num
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold shrink-0 ${
                activeSection === tab.num
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {tab.num}
            </span>
            <span className="text-xs">{getUIText(tab.key, currentLang)}</span>
          </button>
        ))}
      </div>

      {/* Section 1: General Info */}
      {activeSection === 1 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5 animate-fadeIn">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs flex items-center justify-center font-bold">
                1
              </span>
              {getUIText('sec1Title', currentLang)}
            </h3>
            <span className="text-xs text-rose-500 font-bold">
              {getUIText('requiredNote', currentLang)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* 1.1 Applicant Name */}
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                {getUIText('labelApplicantName', currentLang)}
              </label>
              <input
                type="text"
                value={formData.applicantName}
                onChange={(e) => updateField('applicantName', e.target.value)}
                placeholder={getUIText('placeholderApplicantName', currentLang)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* 1.2 Role */}
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                {getUIText('labelApplicantRole', currentLang)}
              </label>
              <select
                value={formData.applicantRole}
                onChange={(e) => updateField('applicantRole', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500"
              >
                <option value={getUIText('roleEngineer', currentLang)}>
                  {getUIText('roleEngineer', currentLang)}
                </option>
                <option value={getUIText('roleForeman', currentLang)}>
                  {getUIText('roleForeman', currentLang)}
                </option>
                <option value={getUIText('roleSafety', currentLang)}>
                  {getUIText('roleSafety', currentLang)}
                </option>
                <option value={getUIText('roleMaintenance', currentLang)}>
                  {getUIText('roleMaintenance', currentLang)}
                </option>
                <option value={getUIText('roleOther', currentLang)}>
                  {getUIText('roleOther', currentLang)}
                </option>
              </select>
            </div>

            {/* 1.3 Company */}
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                {getUIText('labelCompany', currentLang)}
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => updateField('company', e.target.value)}
                placeholder={getUIText('placeholderCompany', currentLang)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* 1.4 Phone */}
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                {getUIText('labelPhone', currentLang)}
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder={getUIText('placeholderPhone', currentLang)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* 1.5 Location */}
            <div className="md:col-span-2">
              <label className="font-bold text-slate-800 block mb-1">
                {getUIText('labelLocation', currentLang)}
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder={getUIText('placeholderLocation', currentLang)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* 1.6 Date */}
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                {getUIText('labelWorkDate', currentLang)}
              </label>
              <input
                type="date"
                value={formData.workDate}
                onChange={(e) => updateField('workDate', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Times */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  {getUIText('labelStartTime', currentLang)}
                </label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => updateField('startTime', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  {getUIText('labelEndTime', currentLang)}
                </label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => updateField('endTime', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* 1.7 Worker count */}
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                {getUIText('labelWorkerCount', currentLang)}
              </label>
              <input
                type="number"
                min="1"
                value={formData.workerCount}
                onChange={(e) => updateField('workerCount', parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              onClick={() => setActiveSection(2)}
              className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800"
            >
              {getUIText('btnNextToSec2', currentLang)}
            </button>
          </div>
        </div>
      )}

      {/* Section 2: High Risk Selection */}
      {activeSection === 2 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5 animate-fadeIn">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 text-xs flex items-center justify-center font-bold">
                2
              </span>
              {getUIText('sec2Title', currentLang)}
            </h3>
            <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2.5 py-1 rounded-lg">
              {getUIText('selectedCountBadge', currentLang).replace(
                '{count}',
                formData.riskTypes.length.toString()
              )}
            </span>
          </div>

          <p className="text-xs text-slate-500">{getUIText('sec2Subtitle', currentLang)}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {HIGH_RISK_TYPES_MULTILINGUAL.map((risk) => {
              const localizedTitle =
                currentLang === 'zh'
                  ? risk.titleZh
                  : currentLang === 'my'
                  ? risk.titleMy
                  : risk.titleTh;
              const localizedDesc =
                currentLang === 'zh'
                  ? risk.descZh
                  : currentLang === 'my'
                  ? risk.descMy
                  : risk.descTh;

              const isSelected =
                formData.riskTypes.includes(risk.titleTh) ||
                formData.riskTypes.includes(risk.titleZh) ||
                formData.riskTypes.includes(risk.titleMy) ||
                formData.riskTypes.includes(localizedTitle);

              return (
                <div
                  key={risk.id}
                  onClick={() => toggleRiskType(localizedTitle)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-amber-50/80 border-amber-400 text-slate-900 shadow-sm ring-1 ring-amber-400/40'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}}
                    className="mt-1 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <span>{risk.icon}</span>
                      <span>{localizedTitle}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{localizedDesc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <label className="font-bold text-slate-800 text-xs block mb-1">
              {getUIText('otherRiskLabel', currentLang)}
            </label>
            <input
              type="text"
              value={formData.otherRiskDetails || ''}
              onChange={(e) => updateField('otherRiskDetails', e.target.value)}
              placeholder={getUIText('otherRiskPlaceholder', currentLang)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white"
            />
          </div>

          <div className="flex justify-between pt-3">
            <button
              onClick={() => setActiveSection(1)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 text-xs font-bold rounded-xl"
            >
              {getUIText('btnBack', currentLang)}
            </button>
            <button
              onClick={() => setActiveSection(3)}
              className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800"
            >
              {getUIText('btnNextToSec3', currentLang)}
            </button>
          </div>
        </div>
      )}

      {/* Section 3: Job Details, PPE, Controls */}
      {activeSection === 3 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6 animate-fadeIn">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">
                3
              </span>
              {getUIText('sec3Title', currentLang)}
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            {/* 3.1 Job description */}
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                {getUIText('labelJobDesc', currentLang)}
              </label>
              <textarea
                rows={3}
                value={formData.jobDescription}
                onChange={(e) => updateField('jobDescription', e.target.value)}
                placeholder={getUIText('placeholderJobDesc', currentLang)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>

            {/* 3.2 Worker Roster */}
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                {getUIText('labelWorkerRoster', currentLang)}
              </label>
              <textarea
                rows={3}
                value={formData.workerRoster}
                onChange={(e) => updateField('workerRoster', e.target.value)}
                placeholder={getUIText('placeholderWorkerRoster', currentLang)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-mono text-[11px]"
              />
            </div>

            {/* Confined Space Gas Readings (Dynamic) */}
            {isConfinedSpace && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-rose-900">
                    <Activity className="w-4 h-4 text-rose-600" />
                    <span>{getUIText('gasMeasurementHeader', currentLang)}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      isGasSafe
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-rose-200 text-rose-900 border border-rose-400'
                    }`}
                  >
                    {isGasSafe
                      ? getUIText('gasSafeBadge', currentLang)
                      : getUIText('gasUnsafeBadge', currentLang)}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="bg-white p-2 rounded-lg border border-rose-200">
                    <span className="block text-[11px] text-slate-500">Oxygen (O2)</span>
                    <span className="text-[10px] text-slate-400">19.5 - 23.5%</span>
                    <input
                      type="text"
                      value={formData.gasReadings?.o2 || '20.9'}
                      onChange={(e) => updateGasReading('o2', e.target.value)}
                      className="w-full mt-1 px-2 py-1 bg-slate-50 border rounded font-bold"
                    />
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-rose-200">
                    <span className="block text-[11px] text-slate-500">Flammable (LEL)</span>
                    <span className="text-[10px] text-slate-400">&lt; 10% LEL</span>
                    <input
                      type="text"
                      value={formData.gasReadings?.lel || '0'}
                      onChange={(e) => updateGasReading('lel', e.target.value)}
                      className="w-full mt-1 px-2 py-1 bg-slate-50 border rounded font-bold"
                    />
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-rose-200">
                    <span className="block text-[11px] text-slate-500">Carbon Monoxide (CO)</span>
                    <span className="text-[10px] text-slate-400">&lt; 25 ppm</span>
                    <input
                      type="text"
                      value={formData.gasReadings?.co || '0'}
                      onChange={(e) => updateGasReading('co', e.target.value)}
                      className="w-full mt-1 px-2 py-1 bg-slate-50 border rounded font-bold"
                    />
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-rose-200">
                    <span className="block text-[11px] text-slate-500">Hydrogen Sulfide (H2S)</span>
                    <span className="text-[10px] text-slate-400">&lt; 10 ppm</span>
                    <input
                      type="text"
                      value={formData.gasReadings?.h2s || '0'}
                      onChange={(e) => updateGasReading('h2s', e.target.value)}
                      className="w-full mt-1 px-2 py-1 bg-slate-50 border rounded font-bold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* PPE Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="font-bold text-slate-800 block">
                {getUIText('labelPPESection', currentLang)}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PPE_ITEMS_MULTILINGUAL.map((item) => {
                  const localizedLabel =
                    currentLang === 'zh'
                      ? item.zh
                      : currentLang === 'my'
                      ? item.my
                      : item.th;
                  const isChecked =
                    formData.selectedPPE.includes(item.th) ||
                    formData.selectedPPE.includes(item.zh) ||
                    formData.selectedPPE.includes(item.my) ||
                    formData.selectedPPE.includes(localizedLabel);

                  return (
                    <label
                      key={item.id}
                      className="flex items-start gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => togglePPE(localizedLabel)}
                        className="mt-0.5 rounded text-emerald-600"
                      />
                      <span className="text-[11px] font-medium text-slate-800">
                        {localizedLabel}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Safety Controls Checklist */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="font-bold text-slate-800 block">
                {getUIText('labelControlsSection', currentLang)}
              </label>
              <div className="space-y-1.5">
                {SAFETY_CONTROLS_MULTILINGUAL.map((ctrl) => {
                  const localizedLabel =
                    currentLang === 'zh'
                      ? ctrl.zh
                      : currentLang === 'my'
                      ? ctrl.my
                      : ctrl.th;
                  const isChecked =
                    formData.safetyControls.includes(ctrl.th) ||
                    formData.safetyControls.includes(ctrl.zh) ||
                    formData.safetyControls.includes(ctrl.my) ||
                    formData.safetyControls.includes(localizedLabel);

                  return (
                    <label
                      key={ctrl.id}
                      className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSafetyControl(localizedLabel)}
                        className="mt-0.5 rounded text-emerald-600"
                      />
                      <span className="text-[11px] font-medium text-slate-800">
                        {localizedLabel}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 5x5 Risk Matrix Assessment */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <span className="font-bold text-slate-900 block text-xs">
                {getUIText('riskMatrixTitle', currentLang)}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    {getUIText('labelProbability', currentLang)} ({formData.riskMatrix?.probability || 2}/5)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={formData.riskMatrix?.probability || 2}
                    onChange={(e) =>
                      updateRiskMatrix(
                        parseInt(e.target.value),
                        formData.riskMatrix?.severity || 3
                      )
                    }
                    className="w-full accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>1: แทบไม่เกิด</span>
                    <span>3: ปานกลาง</span>
                    <span>5: เกิดบ่อยมาก</span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    {getUIText('labelSeverity', currentLang)} ({formData.riskMatrix?.severity || 3}/5)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={formData.riskMatrix?.severity || 3}
                    onChange={(e) =>
                      updateRiskMatrix(
                        formData.riskMatrix?.probability || 2,
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>1: ปฐมพยาบาล</span>
                    <span>3: หยุดงาน</span>
                    <span>5: เสียชีวิต/ทุพพลภาพ</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 text-xs">
                <span className="font-semibold text-slate-700">
                  Risk Score: <strong>{formData.riskMatrix?.score || 6} / 25</strong>
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                    formData.riskMatrix?.level === 'extreme'
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : formData.riskMatrix?.level === 'high'
                      ? 'bg-orange-100 text-orange-800 border border-orange-300'
                      : formData.riskMatrix?.level === 'medium'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}
                >
                  {formData.riskMatrix?.level === 'extreme'
                    ? getUIText('riskLevelExtreme', currentLang)
                    : formData.riskMatrix?.level === 'high'
                    ? getUIText('riskLevelHigh', currentLang)
                    : formData.riskMatrix?.level === 'medium'
                    ? getUIText('riskLevelMed', currentLang)
                    : getUIText('riskLevelLow', currentLang)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-3">
            <button
              onClick={() => setActiveSection(2)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 text-xs font-bold rounded-xl"
            >
              {getUIText('btnBack', currentLang)}
            </button>
            <button
              onClick={() => setActiveSection(4)}
              className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800"
            >
              {getUIText('btnNextToSec4', currentLang)}
            </button>
          </div>
        </div>
      )}

      {/* Section 4: Approvals & Sign-off */}
      {activeSection === 4 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6 animate-fadeIn">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs flex items-center justify-center font-bold">
                4
              </span>
              {getUIText('sec4Title', currentLang)}
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            {/* Legal Statement */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.complianceAgreed}
                  onChange={(e) => updateField('complianceAgreed', e.target.checked)}
                  className="mt-1 rounded text-amber-600 focus:ring-amber-500"
                />
                <span className="font-semibold text-slate-800 text-xs leading-relaxed">
                  {getUIText('complianceStatement', currentLang)}
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 4.2 Applicant signature */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  {getUIText('labelApplicantSig', currentLang)}
                </label>
                <input
                  type="text"
                  value={formData.applicantSignature}
                  onChange={(e) => updateField('applicantSignature', e.target.value)}
                  placeholder={getUIText('placeholderApplicantSig', currentLang)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              {/* 4.3 Safety officer name */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  {getUIText('labelSafetyOfficerName', currentLang)}
                </label>
                <input
                  type="text"
                  value={formData.safetyOfficerName}
                  onChange={(e) => updateField('safetyOfficerName', e.target.value)}
                  placeholder={getUIText('placeholderSafetyOfficerName', currentLang)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              {/* 4.4 Decision */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  {getUIText('labelPermitDecision', currentLang)}
                </label>
                <select
                  value={formData.approvalDecision}
                  onChange={(e) => {
                    const val = e.target.value as any;
                    updateField('approvalDecision', val);
                    if (val === 'approved') updateField('status', 'approved');
                    if (val === 'conditional') updateField('status', 'conditional');
                    if (val === 'rejected') updateField('status', 'rejected');
                    if (val === 'pending') updateField('status', 'pending_approval');
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                >
                  <option value="pending">{getUIText('decisionPending', currentLang)}</option>
                  <option value="approved">{getUIText('decisionApproved', currentLang)}</option>
                  <option value="conditional">{getUIText('decisionConditional', currentLang)}</option>
                  <option value="rejected">{getUIText('decisionRejected', currentLang)}</option>
                </select>
              </div>

              {/* 4.6 File link */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  {getUIText('labelAttachmentLink', currentLang)}
                </label>
                <input
                  type="url"
                  value={formData.attachmentLinks || ''}
                  onChange={(e) => updateField('attachmentLinks', e.target.value)}
                  placeholder={getUIText('placeholderAttachmentLink', currentLang)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              {/* 4.5 Remarks */}
              <div className="sm:col-span-2">
                <label className="font-bold text-slate-800 block mb-1">
                  {getUIText('labelRemarks', currentLang)}
                </label>
                <textarea
                  rows={2}
                  value={formData.safetyOfficerRemarks || ''}
                  onChange={(e) => updateField('safetyOfficerRemarks', e.target.value)}
                  placeholder={getUIText('placeholderRemarks', currentLang)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <button
              onClick={() => setActiveSection(3)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 text-xs font-bold rounded-xl"
            >
              {getUIText('btnBack', currentLang)}
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleValidateAndSave('draft')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl"
              >
                {getUIText('btnSaveDraft', currentLang)}
              </button>
              <button
                onClick={() => handleValidateAndSave('pending_approval')}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
              >
                {getUIText('btnSubmitReview', currentLang)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
