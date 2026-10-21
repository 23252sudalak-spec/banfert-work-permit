import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Edit3,
  Eye,
  Trash2,
  Printer,
  ShieldCheck,
  Flame,
  Box,
  TrendingUp,
  Zap,
  Truck,
  RotateCcw,
  Check,
} from 'lucide-react';
import { PermitRecord, PermitStatus, Language } from '../types/permit';
import { formatBilingualText } from '../data/translations';

interface PermitListProps {
  permits: PermitRecord[];
  onSelectPermitForEdit: (permit: PermitRecord) => void;
  onSelectPermitForView: (permit: PermitRecord) => void;
  onCreateNewPermit: () => void;
  onDeletePermit: (id: string) => void;
  onUpdateStatus: (id: string, status: PermitStatus) => void;
  currentLang: Language;
}

export const PermitList: React.FC<PermitListProps> = ({
  permits,
  onSelectPermitForEdit,
  onSelectPermitForView,
  onCreateNewPermit,
  onDeletePermit,
  onUpdateStatus,
  currentLang,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Filter logic
  const filteredPermits = permits.filter((p) => {
    // Status filter
    if (statusFilter !== 'all' && p.status !== statusFilter) {
      return false;
    }

    // Risk type filter
    if (riskFilter !== 'all') {
      const hasRisk = p.riskTypes.some((r) => r.includes(riskFilter));
      if (!hasRisk) return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchNum = p.permitNumber?.toLowerCase().includes(q);
      const matchName = p.applicantName?.toLowerCase().includes(q);
      const matchCompany = p.company?.toLowerCase().includes(q);
      const matchLoc = p.location?.toLowerCase().includes(q);
      const matchDesc = p.jobDescription?.toLowerCase().includes(q);
      if (!matchNum && !matchName && !matchCompany && !matchLoc && !matchDesc) {
        return false;
      }
    }

    return true;
  });

  // Stats calculation
  const totalCount = permits.length;
  const pendingCount = permits.filter((p) => p.status === 'pending_approval').length;
  const approvedCount = permits.filter((p) => p.status === 'approved' || p.status === 'work_in_progress').length;
  const closedCount = permits.filter((p) => p.status === 'closed').length;

  const getStatusBadge = (status: PermitStatus) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            อนุมัติแล้ว (Approved)
          </span>
        );
      case 'pending_approval':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            รออนุมัติ (Pending)
          </span>
        );
      case 'conditional':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-300">
            <AlertCircle className="w-3.5 h-3.5 text-yellow-600" />
            อนุมัติตามเงื่อนไข
          </span>
        );
      case 'work_in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            กำลังปฏิบัติงาน (Active)
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300">
            <Check className="w-3.5 h-3.5 text-slate-500" />
            ปิดงานแล้ว (Closed)
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            ไม่อนุมัติ (Rejected)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
            ฉบับร่าง (Draft)
          </span>
        );
    }
  };

  const getRiskIcon = (r: string) => {
    if (r.includes('ความร้อน') || r.includes('Hot')) return '🔥';
    if (r.includes('อับอากาศ') || r.includes('Confined')) return '📦';
    if (r.includes('บนที่สูง') || r.includes('Heights')) return '🧗';
    if (r.includes('ไฟฟ้า') || r.includes('Electrical')) return '⚡';
    if (r.includes('ขุด') || r.includes('Lifting')) return '🏗️';
    if (r.includes('เคมี') || r.includes('Chemical')) return '☣️';
    return '⚠️';
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">ใบอนุญาตทั้งหมด</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">{totalCount}</span>
            <span className="text-[11px] text-slate-400">Total Permits</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-amber-600 block">รอการพิจารณาอนุมัติ</span>
            <span className="text-2xl font-black text-amber-600 mt-1 block">{pendingCount}</span>
            <span className="text-[11px] text-slate-400">Pending Review</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-emerald-600 block">อนุมัติแล้ว / ใช้งานอยู่</span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">{approvedCount}</span>
            <span className="text-[11px] text-slate-400">Approved & Active</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">ปิดใบอนุญาตแล้ว</span>
            <span className="text-2xl font-black text-slate-700 mt-1 block">{closedCount}</span>
            <span className="text-[11px] text-slate-400">Permit Closed</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center border border-slate-200">
            <Check className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Control Bar: Search, Filters, and New Permit CTA */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาตามเลขที่ PTW, ชื่อผู้ขอ, บริษัท, หรือสถานที่..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-none"
          >
            <option value="all">สถานะทั้งหมด</option>
            <option value="pending_approval">⏳ รออนุมัติ (Pending)</option>
            <option value="approved">✅ อนุมัติแล้ว (Approved)</option>
            <option value="work_in_progress">👷 กำลังปฏิบัติงาน (Active)</option>
            <option value="closed">🏁 ปิดงานแล้ว (Closed)</option>
            <option value="rejected">❌ ไม่อนุมัติ (Rejected)</option>
            <option value="draft">📝 ฉบับร่าง (Draft)</option>
          </select>

          {/* Risk Type Dropdown */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-none hidden sm:block"
          >
            <option value="all">ประเภทงานทั้งหมด</option>
            <option value="ความร้อน">🔥 งานประกายไฟ (Hot Work)</option>
            <option value="อับอากาศ">📦 งานที่อับอากาศ (Confined)</option>
            <option value="บนที่สูง">🧗 งานบนที่สูง (Heights)</option>
            <option value="ไฟฟ้า">⚡ งานระบบไฟฟ้า (Electrical)</option>
            <option value="ขุด">🏗️ งานขุดเจาะ/ยกของ</option>
            <option value="เคมี">☣️ งานสารเคมีอันตราย</option>
          </select>

          {/* New Permit Button */}
          <button
            onClick={onCreateNewPermit}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>กรอกใบขออนุญาตใหม่</span>
          </button>
        </div>
      </div>

      {/* Permits Table / Card List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredPermits.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-700 text-sm">ไม่พบข้อมูลใบอนุญาตทำงาน</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              ไม่พบรายการที่ตรงกับเงื่อนไขการค้นหา สามารถกดเพิ่มใบอนุญาตใหม่ได้ทันที
            </p>
            <button
              onClick={onCreateNewPermit}
              className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl shadow"
            >
              + กรอกใบอนุญาตฉบับใหม่
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/70 text-slate-600 border-b border-slate-200 font-bold">
                  <th className="p-3.5 pl-4">เลขที่ / วันที่</th>
                  <th className="p-3.5">ผู้ขออนุญาต & บริษัท</th>
                  <th className="p-3.5">สถานที่ & ลักษณะงาน</th>
                  <th className="p-3.5">ประเภทงานเสี่ยง</th>
                  <th className="p-3.5">สถานะ</th>
                  <th className="p-3.5 pr-4 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPermits.map((permit) => (
                  <tr
                    key={permit.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Permit No & Date */}
                    <td className="p-3.5 pl-4 align-top">
                      <span className="font-mono font-bold text-slate-900 block">
                        {permit.permitNumber}
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        📅 {permit.workDate}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        ⏰ {permit.startTime} - {permit.endTime} น.
                      </span>
                    </td>

                    {/* Applicant & Company */}
                    <td className="p-3.5 align-top">
                      <span className="font-bold text-slate-900 block truncate max-w-[160px]">
                        {permit.applicantName}
                      </span>
                      <span className="text-[11px] text-slate-500 block truncate max-w-[160px]">
                        {permit.company}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        📞 {permit.phone} ({permit.workerCount} คน)
                      </span>
                    </td>

                    {/* Location & Summary */}
                    <td className="p-3.5 align-top max-w-[200px]">
                      <span className="font-semibold text-slate-800 block truncate">
                        📍 {permit.location}
                      </span>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                        {permit.jobDescription}
                      </p>
                    </td>

                    {/* Risk Badges */}
                    <td className="p-3.5 align-top">
                      <div className="flex flex-wrap gap-1 max-w-[160px]">
                        {permit.riskTypes.slice(0, 2).map((r, rIdx) => (
                          <span
                            key={rIdx}
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold border border-slate-200"
                          >
                            <span>{getRiskIcon(r)}</span>
                            <span className="truncate max-w-[100px]">{r.split(' ')[0]}</span>
                          </span>
                        ))}
                        {permit.riskTypes.length > 2 && (
                          <span className="text-[10px] font-bold text-slate-400 self-center">
                            +{permit.riskTypes.length - 2}
                          </span>
                        )}
                      </div>
                      <div className="mt-1">
                        <span className="text-[10px] text-slate-400 font-mono">
                          Risk: {permit.riskMatrix?.score || 6}/25 ({permit.riskMatrix?.level || 'med'})
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-3.5 align-top">
                      {getStatusBadge(permit.status)}
                      {permit.safetyOfficerName && (
                        <span className="block text-[10px] text-slate-400 mt-1 truncate max-w-[140px]">
                          ผู้อนุมัติ: {permit.safetyOfficerName.split(' ')[0]}
                        </span>
                      )}
                    </td>

                    {/* Action buttons */}
                    <td className="p-3.5 pr-4 align-top text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        {/* View & Print Details */}
                        <button
                          onClick={() => onSelectPermitForView(permit)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                          title="ดูรายละเอียดและพิมพ์ใบอนุญาต"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Edit Form */}
                        <button
                          onClick={() => onSelectPermitForEdit(permit)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                          title="แก้ไขข้อมูลใบอนุญาต"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {/* Quick Approve / Close Dropdown Menu */}
                        {permit.status === 'pending_approval' && (
                          <button
                            onClick={() => onUpdateStatus(permit.id, 'approved')}
                            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors font-bold text-[11px]"
                            title="อนุมัติใบอนุญาตทันที"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}

                        {permit.status === 'approved' && (
                          <button
                            onClick={() => onUpdateStatus(permit.id, 'closed')}
                            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors font-bold text-[11px]"
                            title="ปิดใบอนุญาตเมื่อเสร็จงาน"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}

                        {/* Delete button */}
                        {deleteConfirmId === permit.id ? (
                          <div className="flex items-center gap-1 bg-rose-50 p-1 rounded-lg border border-rose-200">
                            <button
                              onClick={() => {
                                onDeletePermit(permit.id);
                                setDeleteConfirmId(null);
                              }}
                              className="text-[10px] font-bold text-rose-700 px-1.5 py-0.5 bg-rose-200 rounded"
                            >
                              ลบจริง
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="text-[10px] text-slate-500 px-1"
                            >
                              ไม่
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(permit.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="ลบใบอนุญาตนี้"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
