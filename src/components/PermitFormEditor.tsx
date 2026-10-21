import React, { useState, useEffect } from 'react';
import {
  Save,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  FileCheck2,
  Printer,
  ShieldCheck,
  Flame,
  Box,
  TrendingUp,
  Zap,
  Truck,
  Activity,
  UserCheck,
  Send,
  HelpCircle,
} from 'lucide-react';
import { PermitRecord, Language, PermitStatus } from '../types/permit';
import { calculateRiskLevel } from '../services/permitStorage';
import { formatBilingualText } from '../data/translations';

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
    // Basic validation
    if (!formData.applicantName.trim()) {
      setValidationError('กรุณาระบุชื่อ-นามสกุล ผู้ขออนุญาต');
      setActiveSection(1);
      return;
    }
    if (!formData.company.trim()) {
      setValidationError('กรุณาระบุชื่อบริษัท / หน่วยงาน');
      setActiveSection(1);
      return;
    }
    if (!formData.phone.trim()) {
      setValidationError('กรุณาระบุเบอร์โทรศัพท์ฉุกเฉิน');
      setActiveSection(1);
      return;
    }
    if (!formData.location.trim()) {
      setValidationError('กรุณาระบุสถานที่ปฏิบัติงาน');
      setActiveSection(1);
      return;
    }
    if (formData.riskTypes.length === 0) {
      setValidationError('กรุณาเลือกประเภทของงานเสี่ยงอย่างน้อย 1 ประเภทในส่วนที่ 2');
      setActiveSection(2);
      return;
    }
    if (!formData.jobDescription.trim()) {
      setValidationError('กรุณากรอกคำอธิบายรายละเอียดงานในส่วนที่ 3');
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

  const isConfinedSpace = formData.riskTypes.some((r) => r.includes('อับอากาศ'));

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
            title="กลับไปหน้ารายการ"
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
                สถานะ: {formData.status.toUpperCase()}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
              แบบฟอร์มขออนุญาตเข้าปฏิบัติงานที่มีความเสี่ยง (Permit to Work)
            </h2>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => handleValidateAndSave('draft')}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all border border-slate-200"
          >
            <span>บันทึกฉบับร่าง</span>
          </button>

          <button
            onClick={() => handleValidateAndSave('pending_approval')}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-bold rounded-xl shadow transition-all hover:scale-[1.02] active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>ส่งขออนุมัติ จป.</span>
          </button>

          <button
            onClick={() => handleValidateAndSave('approved')}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow transition-all hover:scale-[1.02] active:scale-95"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>อนุมัติใบอนุญาต (จป.)</span>
          </button>

          <button
            onClick={() => window.print()}
            className="p-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl transition-colors"
            title="พิมพ์ใบอนุญาต"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {isSavedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl flex items-center gap-2.5 text-xs font-bold shadow animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>บันทึกข้อมูลใบอนุญาตเรียบร้อยแล้ว! ข้อมูลถูกอัปเดตลงระบบทันที</span>
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
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-white p-2 rounded-2xl border border-slate-200 text-xs">
        {[
          { num: 1, title: 'ส่วนที่ 1: ข้อมูลทั่วไป' },
          { num: 2, title: 'ส่วนที่ 2: ประเภทงานเสี่ยง' },
          { num: 3, title: 'ส่วนที่ 3: รายละเอียด & PPE' },
          { num: 4, title: 'ส่วนที่ 4: การอนุมัติ จป.' },
        ].map((tab) => (
          <button
            key={tab.num}
            onClick={() => setActiveSection(tab.num)}
            className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSection === tab.num
                ? 'bg-slate-900 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                activeSection === tab.num
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {tab.num}
            </span>
            <span>{tab.title}</span>
          </button>
        ))}
      </div>

      {/* Section 1: General Info */}
      {activeSection === 1 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5 animate-fadeIn">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs flex items-center justify-center font-bold">1</span>
              ส่วนที่ 1: ข้อมูลทั่วไปของการขออนุญาต (General Information)
            </h3>
            <span className="text-xs text-rose-500 font-bold">* จำเป็นต้องตอบ</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                1.1 ชื่อ-นามสกุล ผู้ขออนุญาต / ผู้ควบคุมงาน *
              </label>
              <input
                type="text"
                value={formData.applicantName}
                onChange={(e) => updateField('applicantName', e.target.value)}
                placeholder="เช่น นายสมชาย ปลอดภัยดี"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">
                1.2 ตำแหน่ง / บทบาทความรับผิดชอบ *
              </label>
              <select
                value={formData.applicantRole}
                onChange={(e) => updateField('applicantRole', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500"
              >
                <option value="วิศวกรผู้ควบคุมงาน (Site Engineer / Project Engineer)">
                  วิศวกรผู้ควบคุมงาน (Site Engineer / Project Engineer)
                </option>
                <option value="หัวหน้างาน / โฟร์แมนผู้รับเหมา (Site Supervisor / Foreman)">
                  หัวหน้างาน / โฟร์แมนผู้รับเหมา (Site Supervisor / Foreman)
                </option>
                <option value="เจ้าหน้าที่ความปลอดภัยในการทำงาน (Safety Officer)">
                  เจ้าหน้าที่ความปลอดภัยในการทำงาน (Safety Officer)
                </option>
                <option value="พนักงานประจำ / ช่างซ่อมบำรุงภายในบริษัท (In-house Maintenance)">
                  พนักงานประจำ / ช่างซ่อมบำรุงภายในบริษัท (In-house Maintenance)
                </option>
                <option value="อื่นๆ">อื่นๆ</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">
                1.3 ชื่อบริษัท / หน่วยงาน / ผู้รับเหมา *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => updateField('company', e.target.value)}
                placeholder="เช่น บริษัท สยามเซฟตี้ คอนสตรัคชั่น จำกัด"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">
                1.4 เบอร์โทรศัพท์ฉุกเฉิน (24 ชม.) *
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="เช่น 081-999-8888"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-bold text-slate-800 block mb-1">
                1.5 สถานที่ปฏิบัติงาน (ระบุพื้นที่ / อาคาร / ชั้น / หมายเลขเครื่องจักร) *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder="เช่น อาคารผลิต 2 ชั้น 3 บริเวณหม้อต้มไอน้ำ (Boiler Area)"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">
                1.6 วันที่ขอเข้าปฏิบัติงาน *
              </label>
              <input
                type="date"
                value={formData.workDate}
                onChange={(e) => updateField('workDate', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  เวลาเริ่ม *
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
                  เวลาสิ้นสุด *
                </label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => updateField('endTime', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">
                1.7 จำนวนผู้ปฏิบัติงานทั้งหมดในพื้นที่ (คน) *
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
              ถัดไป: เลือกประเภทงานเสี่ยง (ส่วนที่ 2) ➔
            </button>
          </div>
        </div>
      )}

      {/* Section 2: High Risk Selection */}
      {activeSection === 2 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5 animate-fadeIn">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 text-xs flex items-center justify-center font-bold">2</span>
              ส่วนที่ 2: ประเภทของงานเสี่ยง (Type of High-Risk Work)
            </h3>
            <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2.5 py-1 rounded-lg">
              เลือกแล้ว {formData.riskTypes.length} ประเภท
            </span>
          </div>

          <p className="text-xs text-slate-500">
            โปรดเลือกประเภทงานเสี่ยงที่เกี่ยวข้องกับการทำงานครั้งนี้ (สามารถเลือกได้มากกว่า 1 ข้อ)
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {[
              {
                id: 'hot',
                title: 'งานที่ทำให้เกิดความร้อนหรือประกายไฟ (Hot Work)',
                desc: 'งานเชื่อมไฟฟ้า, ตัดแก๊ส, เจียรโลหะ, ขัดพ่นทราย',
                icon: '🔥',
              },
              {
                id: 'confined',
                title: 'งานในที่อับอากาศ (Confined Space Work)',
                desc: 'ทำงานในถังไซโล, บ่อบำบัด, ท่อใต้ดิน, หลุมลึก, ถังปฏิกรณ์',
                icon: '📦',
              },
              {
                id: 'heights',
                title: 'งานบนที่สูง (Working at Heights - สูงเกิน 2 เมตรขึ้นไป)',
                desc: 'งานติดตั้งนั่งร้าน, หลังคา, โรยตัว, กระเช้าบูม',
                icon: '🧗',
              },
              {
                id: 'elec',
                title: 'งานเกี่ยวกับระบบไฟฟ้าแรงสูง/อุปกรณ์ไฟฟ้า (Electrical Work)',
                desc: 'ซ่อมตู้ MDB, เดินสายไฟแรงดัน, หม้อแปลงไฟฟ้า',
                icon: '⚡',
              },
              {
                id: 'excav',
                title: 'งานขุดเจาะหรือรอกยกของหนัก (Excavation & Lifting Work)',
                desc: 'งานขุดลึกเกิน 1.5 ม., รถเครนยกโครงสร้าง, ปั้นจั่น',
                icon: '🏗️',
              },
              {
                id: 'chem',
                title: 'งานสารเคมีอันตราย / วัตถุไวไฟ (Hazardous Chemical Work)',
                desc: 'ถ่ายเทสารเคมีไวไฟ, พ่นสีในโรงงาน, สารกัดกร่อน',
                icon: '☣️',
              },
            ].map((risk) => {
              const isSelected = formData.riskTypes.includes(risk.title);
              return (
                <div
                  key={risk.id}
                  onClick={() => toggleRiskType(risk.title)}
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
                      <span>{risk.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{risk.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <label className="font-bold text-slate-800 text-xs block mb-1">
              กรณีมีงานเสี่ยงอื่นเพิ่มเติม (ระบุ):
            </label>
            <input
              type="text"
              value={formData.otherRiskDetails || ''}
              onChange={(e) => updateField('otherRiskDetails', e.target.value)}
              placeholder="เช่น งานรังสี NDT, งานใต้น้ำ, งานในห้องเย็นจัด"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white"
            />
          </div>

          <div className="flex justify-between pt-3">
            <button
              onClick={() => setActiveSection(1)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 text-xs font-bold rounded-xl"
            >
              ⬅ ย้อนกลับ
            </button>
            <button
              onClick={() => setActiveSection(3)}
              className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800"
            >
              ถัดไป: เช็กลิสต์ PPE & มาตรการความปลอดภัย (ส่วนที่ 3) ➔
            </button>
          </div>
        </div>
      )}

      {/* Section 3: Job Details, PPE, Controls */}
      {activeSection === 3 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6 animate-fadeIn">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              ส่วนที่ 3: รายละเอียดงานและมาตรการควบคุมความปลอดภัย (Safety Controls)
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                3.1 คำอธิบายรายละเอียดงานโดยสรุป และขั้นตอนการทำงาน (JSA) *
              </label>
              <textarea
                rows={3}
                value={formData.jobDescription}
                onChange={(e) => updateField('jobDescription', e.target.value)}
                placeholder="ระบุว่าต้องทำอะไร ใช้เครื่องมืออะไรบ้าง และมีขั้นตอนการทำงานอย่างไร..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">
                3.2 รายชื่อผู้ปฏิบัติงานทั้งหมด และคุณสมบัติ/ใบอนุญาตเฉพาะทาง
              </label>
              <textarea
                rows={3}
                value={formData.workerRoster}
                onChange={(e) => updateField('workerRoster', e.target.value)}
                placeholder="1. ชื่อ-สกุล (ตำแหน่ง/ใบเซอร์)&#10;2. ชื่อ-สกุล (ตำแหน่ง/ใบเซอร์)"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-mono text-[11px]"
              />
            </div>

            {/* Confined Space Gas Readings (Dynamic) */}
            {isConfinedSpace && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-rose-900">
                    <Activity className="w-4 h-4 text-rose-600" />
                    <span>ผลการตรวจวัดก๊าซในที่อับอากาศ (กฎกระทรวง พ.ศ. 2562)</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      isGasSafe
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-rose-200 text-rose-900 border border-rose-400'
                    }`}
                  >
                    {isGasSafe ? '✅ บรรยากาศปลอดภัย' : '❌ อันตราย ห้ามเข้า!'}
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
                3.3 อุปกรณ์ป้องกันอันตรายส่วนบุคคล (PPE) ที่ต้องสวมใส่:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'หมวกนิรภัยมาตรฐาน มอก. พร้อมสายรัดคาง (Safety Helmet with Chin Strap)',
                  'รองเท้านิรภัยหัวเหล็ก / พื้นเหล็กกันทะลุ (Safety Shoes S1P / S3)',
                  'แว่นตานิรภัยป้องกันเศษสะเก็ดและรังสี (Safety Glasses / Spectacles ANSI Z87.1)',
                  'กระบังหน้าป้องกันความร้อน/สะเก็ด/สารเคมี (Face Shield)',
                  'ถุงมือนิรภัย (ถุงมือหนังสำหรับงานเชื่อม / ถุงมือกันบาด / ถุงมือยางกันสารเคมี)',
                  'เข็มขัดนิรภัยเต็มตัวพร้อมสายช่วยชีวิตคู่และกระเปาะซับแรง (Full Body Harness + Double Lanyard)',
                  'หน้ากากเชื่อมไฟฟ้า / แว่นตัดแก๊สปรับแสงอัตโนมัติ (Welding Helmet / Cutting Goggles)',
                  'หน้ากากกรองอนุภาค N95 หรือหน้ากากกรองไอระเหยสารเคมี Half Mask Respirator',
                  'ชุดคลุมป้องกันสารเคมี / เสื้อกันไฟลาม (Chemical Protective Suit / Fire Retardant Coverall)',
                  'อุปกรณ์ล็อกสายกันตก ชนิดดึงกลับอัตโนมัติ (Self-Retracting Lifeline - SRL)',
                ].map((item, idx) => (
                  <label
                    key={idx}
                    className="flex items-start gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.selectedPPE.includes(item)}
                      onChange={() => togglePPE(item)}
                      className="mt-0.5 rounded text-emerald-600"
                    />
                    <span className="text-[11px] font-medium text-slate-800">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Safety Controls Checklist */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="font-bold text-slate-800 block">
                3.4 มาตรการควบคุมความปลอดภัยหน้างาน (Engineering & Administrative Controls):
              </label>
              <div className="space-y-1.5">
                {[
                  '[LOTO] ดำเนินการตัดแยกพลังงานทุกระบบ (ไฟฟ้า, แรงดันลม, ไฮดรอลิก) พร้อมแขวนป้ายเตือนและล็อกกุญแจ',
                  '[Zero Energy] ตรวจสอบพลังงานตกค้างเป็นศูนย์ (Zero Energy Verification) ก่อนลงมือซ่อมบำรุง',
                  '[Gas Test] ตรวจวัดบรรยากาศอันตราย 4 ก๊าซในที่อับอากาศครบทุกระดับความลึกและผ่านเกณฑ์ความปลอดภัย',
                  '[Ventilation] ติดตั้งพัดลมเป่าระบายอากาศแบบแรงดันบวก (Continuous Mechanical Ventilation) ตลอดเวลาทำงาน',
                  '[Fire Protection] จัดตั้งถังดับเพลิงเคมีแห้งหรือ CO2 ขนาดไม่ต่ำกว่า 15 ปอนด์ ประจำจุดเสี่ยงไม่เกิน 5-10 เมตร',
                  '[Fire Watcher] จัดให้มีผู้เฝ้าระวังไฟสวมปลอกแขนประจำจุดตลอดเวลา และตรวจพื้นที่ซ้ำ 30 นาทีหลังงานเชื่อมเสร็จ',
                  '[Combustibles] เคลียร์วัสดุติดไฟในรัศมี 11 เมตร หรือคลุมด้วยผ้ากันไฟ (Fire Blanket) อย่างมิดชิด',
                  '[Scaffolding] นั่งร้านติดตั้งได้ดิ่ง ได้ระดับ แข็งแรง มีบันไดขึ้นลง และติดป้าย Scaffolding Tag สีเขียว',
                  '[Fall Protection] มีจุดยึดเกาะ Lifeline หรือ Anchor Point ที่แข็งแรงรับแรง 5,000 ปอนด์ และติดตั้งแผ่น Toe Board',
                  '[Electrical] ตรวจสอบเครื่องมือไฟฟ้า สายไฟ ปลั๊กพ่วง มีสายดิน และต่อผ่านเครื่องตัดไฟรั่ว ELCB/RCD 30mA',
                  '[Excavation] หลุมขุดติดตั้งระบบค้ำยันดิน Sloping/Shoring ป้องกันการพังทลาย และมีบันไดขึ้นลงห่างไม่เกิน 7.5 เมตร',
                  '[Barricade] กั้นขอบเขตพื้นที่ทำงานด้วยเทปเตือนภัยขาว-แดง หรือกรวยยาง พร้อมป้ายเตือน "งานเสี่ยงอันตราย ห้ามเข้า"',
                  '[Emergency] ซักซ้อมเส้นทางหนีภัย จุดรวมพล และระบบสื่อสารฉุกเฉินให้ผู้ปฏิบัติงานทุกคนรับทราบก่อนเริ่มงาน',
                ].map((ctrl, idx) => (
                  <label
                    key={idx}
                    className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.safetyControls.includes(ctrl)}
                      onChange={() => toggleSafetyControl(ctrl)}
                      className="mt-0.5 rounded text-emerald-600"
                    />
                    <span className="text-[11px] font-medium text-slate-800">{ctrl}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-3">
            <button
              onClick={() => setActiveSection(2)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 text-xs font-bold rounded-xl"
            >
              ⬅ ย้อนกลับ
            </button>
            <button
              onClick={() => setActiveSection(4)}
              className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800"
            >
              ถัดไป: การอนุมัติและลงนาม (ส่วนที่ 4) ➔
            </button>
          </div>
        </div>
      )}

      {/* Section 4: Approvals & Sign-off */}
      {activeSection === 4 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6 animate-fadeIn">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs flex items-center justify-center font-bold">4</span>
              ส่วนที่ 4: การอนุมัติและการรับรองความปลอดภัย (Approvals & Sign-off)
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
                  ข้าพเจ้ารับรองว่าข้อมูลทั้งหมดเป็นความจริง และได้จัดเตรียมมาตรการควบคุมความปลอดภัยครบถ้วนตามมาตรฐาน หากตรวจพบว่ามีการละเมิดหรือสภาพงานไม่ปลอดภัย ข้าพเจ้ายินยอมให้สั่งระงับงานทันทีโดยไม่มีข้อโต้แย้ง
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  4.2 ลายมือชื่ออิเล็กทรอนิกส์ผู้ขออนุญาต *
                </label>
                <input
                  type="text"
                  value={formData.applicantSignature}
                  onChange={(e) => updateField('applicantSignature', e.target.value)}
                  placeholder="พิมพ์ชื่อ-สกุลจริงเพื่อลงนาม"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  4.3 ชื่อ-สกุล จป.วิชาชีพ หรือ ผู้จัดการพื้นที่ผู้อนุมัติ
                </label>
                <input
                  type="text"
                  value={formData.safetyOfficerName}
                  onChange={(e) => updateField('safetyOfficerName', e.target.value)}
                  placeholder="เช่น นางสาวสุดาลักษ์ พิมพ์พันธ์ (จป.วิชาชีพ)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  4.4 ผลการพิจารณาอนุญาต (Permit Decision)
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
                  <option value="pending">⏳ อยู่ระหว่างรอพิจารณา (Pending Approval)</option>
                  <option value="approved">✅ อนุมัติให้ทำงานได้ (Approved)</option>
                  <option value="conditional">⚠️ อนุมัติตามเงื่อนไข (Conditional Approval)</option>
                  <option value="rejected">❌ ไม่อนุมัติ (Rejected)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  4.5 ลิงก์แนบเอกสาร (Google Drive / JSA / รูปถ่ายหน้างาน)
                </label>
                <input
                  type="text"
                  value={formData.attachmentLinks || ''}
                  onChange={(e) => updateField('attachmentLinks', e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-slate-800 block mb-1">
                  4.6 เงื่อนไขเพิ่มเติม / ข้อสังเกต หรือข้อสั่งการพิเศษจาก จป.วิชาชีพ (ถ้ามี)
                </label>
                <textarea
                  rows={2}
                  value={formData.safetyOfficerRemarks || ''}
                  onChange={(e) => updateField('safetyOfficerRemarks', e.target.value)}
                  placeholder="ระบุข้อกำหนดเพิ่มเติม เช่น ให้ตรวจวัดก๊าซซ้ำทุก 2 ชม., ให้เฝ้าระวังสะเก็ดไฟชั้นล่าง..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            {/* Risk Assessment Matrix Score Slider */}
            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3 mt-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-amber-400">
                  ประเมินคะแนนความเสี่ยง (Risk Assessment Matrix 5x5)
                </span>
                <span className="font-mono text-xs font-bold bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">
                  Score: {formData.riskMatrix.score}/25 ({formData.riskMatrix.level.toUpperCase()})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>โอกาสเกิด (Likelihood):</span>
                    <span className="font-bold text-white">{formData.riskMatrix.probability}/5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={formData.riskMatrix.probability}
                    onChange={(e) =>
                      updateRiskMatrix(parseInt(e.target.value), formData.riskMatrix.severity)
                    }
                    className="w-full accent-amber-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>ความรุนแรง (Severity):</span>
                    <span className="font-bold text-white">{formData.riskMatrix.severity}/5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={formData.riskMatrix.severity}
                    onChange={(e) =>
                      updateRiskMatrix(formData.riskMatrix.probability, parseInt(e.target.value))
                    }
                    className="w-full accent-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveSection(3)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 text-xs font-bold rounded-xl w-full sm:w-auto"
            >
              ⬅ ย้อนกลับ
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onCancel}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => handleValidateAndSave()}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <Save className="w-4 h-4 text-amber-400" />
                <span>บันทึกข้อมูลใบอนุญาต (Save Permit)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
