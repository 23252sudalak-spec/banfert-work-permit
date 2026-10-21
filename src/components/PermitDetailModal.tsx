import React from 'react';
import {
  X,
  Printer,
  Edit3,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  ShieldCheck,
  Building,
  User,
  Phone,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { PermitRecord } from '../types/permit';

interface PermitDetailModalProps {
  permit: PermitRecord | null;
  onClose: () => void;
  onEdit: (permit: PermitRecord) => void;
}

export const PermitDetailModal: React.FC<PermitDetailModalProps> = ({
  permit,
  onClose,
  onEdit,
}) => {
  if (!permit) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden text-slate-800">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  {permit.permitNumber}
                </span>
                <span className="text-xs text-slate-400">
                  {permit.workDate} ({permit.startTime} - {permit.endTime} น.)
                </span>
              </div>
              <h3 className="font-bold text-base text-white mt-0.5">
                ใบอนุญาตปฏิบัติงานที่มีความเสี่ยง (Permit to Work)
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onEdit(permit);
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>แก้ไข</span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold shadow transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>พิมพ์ (Print)</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs font-['Prompt',sans-serif]">
          {/* Printable Safety Permit Header Container */}
          <div className="border-2 border-slate-900 rounded-2xl p-5 space-y-5 bg-white">
            {/* Title Block */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-slate-900 pb-4 gap-2">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  PERMIT TO WORK SYSTEM (PTW) • มาตรฐาน จป.วิชาชีพ
                </span>
                <h1 className="text-lg font-black text-slate-900">
                  ใบอนุญาตปฏิบัติงานที่มีความเสี่ยงสูง
                </h1>
                <p className="text-[11px] text-slate-500">
                  危险作业许可证 • အန္တရာယ်ရှိသောအလုပ်လုပ်ကိုင်ခွင့်လက်မှတ်
                </p>
              </div>

              <div className="text-right self-start sm:self-auto border-t sm:border-t-0 sm:border-l-2 border-slate-900 pt-2 sm:pt-0 sm:pl-4">
                <span className="text-xs font-mono font-bold block">{permit.permitNumber}</span>
                <span
                  className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase ${
                    permit.status === 'approved'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : permit.status === 'pending_approval'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  สถานะ: {permit.status}
                </span>
              </div>
            </div>

            {/* Section 1: General Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-slate-200 pb-4">
              <div className="space-y-1">
                <span className="font-bold text-slate-900 block text-xs">
                  1. ข้อมูลผู้ขออนุญาต (Applicant Info):
                </span>
                <p><span className="text-slate-500">ชื่อ-สกุล:</span> <strong className="text-slate-900">{permit.applicantName}</strong></p>
                <p><span className="text-slate-500">ตำแหน่ง:</span> {permit.applicantRole}</p>
                <p><span className="text-slate-500">บริษัท/หน่วยงาน:</span> {permit.company}</p>
                <p><span className="text-slate-500">โทรศัพท์ฉุกเฉิน:</span> {permit.phone}</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-900 block text-xs">
                  2. วันเวลาและสถานที่ (Work Schedule & Area):
                </span>
                <p><span className="text-slate-500">สถานที่:</span> <strong className="text-slate-900">{permit.location}</strong></p>
                <p><span className="text-slate-500">วันที่ทำงาน:</span> {permit.workDate}</p>
                <p><span className="text-slate-500">ช่วงเวลา:</span> {permit.startTime} - {permit.endTime} น.</p>
                <p><span className="text-slate-500">จำนวนผู้ปฏิบัติงาน:</span> {permit.workerCount} คน</p>
              </div>
            </div>

            {/* Section 2: Risk Types */}
            <div className="border-b border-slate-200 pb-4 space-y-2">
              <span className="font-bold text-slate-900 block text-xs">
                3. ประเภทของงานเสี่ยง (High-Risk Activities):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {permit.riskTypes.map((risk, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 font-semibold text-[11px]"
                  >
                    ✓ {risk}
                  </span>
                ))}
                {permit.otherRiskDetails && (
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px]">
                    อื่นๆ: {permit.otherRiskDetails}
                  </span>
                )}
              </div>
            </div>

            {/* Section 3: Job Description & Worker Roster */}
            <div className="border-b border-slate-200 pb-4 space-y-2">
              <span className="font-bold text-slate-900 block text-xs">
                4. รายละเอียดงาน และรายชื่อผู้ปฏิบัติงาน (Job Description & Crew):
              </span>
              <p className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-700 leading-relaxed">
                {permit.jobDescription}
              </p>
              {permit.workerRoster && (
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-mono text-[11px] whitespace-pre-line text-slate-600">
                  {permit.workerRoster}
                </div>
              )}
            </div>

            {/* Gas Readings if any */}
            {permit.gasReadings && (
              <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1.5">
                <span className="font-bold text-rose-900 block">
                  ผลการตรวจวัดก๊าซในที่อับอากาศ (Gas Measurement Values):
                </span>
                <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                  <div className="bg-white p-1.5 rounded border border-rose-200">
                    <span className="text-slate-400 block text-[10px]">O2</span>
                    <strong>{permit.gasReadings.o2}%</strong>
                  </div>
                  <div className="bg-white p-1.5 rounded border border-rose-200">
                    <span className="text-slate-400 block text-[10px]">LEL</span>
                    <strong>{permit.gasReadings.lel}%</strong>
                  </div>
                  <div className="bg-white p-1.5 rounded border border-rose-200">
                    <span className="text-slate-400 block text-[10px]">CO</span>
                    <strong>{permit.gasReadings.co} ppm</strong>
                  </div>
                  <div className="bg-white p-1.5 rounded border border-rose-200">
                    <span className="text-slate-400 block text-[10px]">H2S</span>
                    <strong>{permit.gasReadings.h2s} ppm</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Section 3: PPE & Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-slate-200 pb-4">
              <div className="space-y-1">
                <span className="font-bold text-slate-900 block">
                  อุปกรณ์ PPE ที่ต้องสวมใส่ ({permit.selectedPPE?.length || 0}):
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-600">
                  {permit.selectedPPE?.map((ppe, idx) => (
                    <li key={idx} className="truncate">
                      {ppe}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-900 block">
                  มาตรการความปลอดภัยหน้างาน ({permit.safetyControls?.length || 0}):
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-600">
                  {permit.safetyControls?.map((ctrl, idx) => (
                    <li key={idx} className="truncate">
                      {ctrl}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 4: Sign-off & Stamps */}
            <div className="grid grid-cols-2 gap-6 pt-2 text-center">
              <div className="border border-slate-300 p-4 rounded-xl space-y-2">
                <span className="font-bold text-slate-900 block text-xs">
                  ผู้ขออนุญาต / ผู้ควบคุมงาน
                </span>
                <div className="h-12 flex items-center justify-center font-bold text-slate-800 italic">
                  {permit.applicantSignature || permit.applicantName}
                </div>
                <p className="text-[10px] text-slate-400">
                  วันที่บันทึก: {permit.createdAt ? new Date(permit.createdAt).toLocaleDateString('th-TH') : '-'}
                </p>
              </div>

              <div className="border border-slate-300 p-4 rounded-xl space-y-2 bg-slate-50/50">
                <span className="font-bold text-slate-900 block text-xs">
                  จป.วิชาชีพ / ผู้อนุมัติพื้นที่
                </span>
                <div className="h-12 flex items-center justify-center font-bold text-emerald-800">
                  {permit.safetyOfficerName ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4" />
                      {permit.safetyOfficerName}
                    </span>
                  ) : (
                    <span className="text-slate-400 italic font-normal">รอพิจารณาอนุมัติ</span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400">
                  สถานะการพิจารณา: {permit.approvalDecision.toUpperCase()}
                </p>
              </div>
            </div>

            {/* Safety Officer Remarks */}
            {permit.safetyOfficerRemarks && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                <strong>ข้อสั่งการพิเศษ จป.วิชาชีพ: </strong>
                <span>{permit.safetyOfficerRemarks}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs shrink-0">
          <span className="text-slate-400">
            อัปเดตล่าสุด: {new Date(permit.updatedAt).toLocaleString('th-TH')}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
