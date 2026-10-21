import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Edit3,
  Eye,
  Trash2,
  Check,
} from 'lucide-react';
import { PermitRecord, PermitStatus, Language } from '../types/permit';
import { getUIText } from '../data/translations';

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
  const approvedCount = permits.filter(
    (p) => p.status === 'approved' || p.status === 'work_in_progress'
  ).length;
  const closedCount = permits.filter((p) => p.status === 'closed').length;

  const getStatusBadge = (status: PermitStatus) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            {getUIText('statusApproved', currentLang)}
          </span>
        );
      case 'pending_approval':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            {getUIText('statusPending', currentLang)}
          </span>
        );
      case 'conditional':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-300">
            <AlertCircle className="w-3.5 h-3.5 text-yellow-600" />
            {getUIText('statusConditional', currentLang)}
          </span>
        );
      case 'work_in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            {getUIText('statusActive', currentLang)}
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300">
            <Check className="w-3.5 h-3.5 text-slate-500" />
            {getUIText('statusClosed', currentLang)}
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            {getUIText('statusRejected', currentLang)}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
            {getUIText('statusDraft', currentLang)}
          </span>
        );
    }
  };

  const getRiskIcon = (r: string) => {
    if (r.includes('ความร้อน') || r.includes('Hot') || r.includes('动火') || r.includes('မီးပွား')) return '🔥';
    if (r.includes('อับอากาศ') || r.includes('Confined') || r.includes('有限空间') || r.includes('ကျဉ်းကျပ်')) return '📦';
    if (r.includes('บนที่สูง') || r.includes('Heights') || r.includes('高处') || r.includes('အမြင့်')) return '🧗';
    if (r.includes('ไฟฟ้า') || r.includes('Electrical') || r.includes('电') || r.includes('လျှပ်စစ်')) return '⚡';
    if (r.includes('ขุด') || r.includes('Lifting') || r.includes('吊装') || r.includes('မြေတူး')) return '🏗️';
    if (r.includes('เคมี') || r.includes('Chemical') || r.includes('化') || r.includes('ဓာတု')) return '☣️';
    return '⚠️';
  };

  // Status Filter Options
  const statusOptions = [
    { value: 'all', label: getUIText('allStatuses', currentLang) },
    { value: 'pending_approval', label: `⏳ ${getUIText('statusPending', currentLang)}` },
    { value: 'approved', label: `✅ ${getUIText('statusApproved', currentLang)}` },
    { value: 'work_in_progress', label: `👷 ${getUIText('statusActive', currentLang)}` },
    { value: 'closed', label: `🏁 ${getUIText('statusClosed', currentLang)}` },
    { value: 'rejected', label: `❌ ${getUIText('statusRejected', currentLang)}` },
    { value: 'draft', label: `📝 ${getUIText('statusDraft', currentLang)}` },
  ];

  // Risk Filter Options
  const riskOptions = [
    { value: 'all', label: getUIText('allRiskTypes', currentLang) },
    {
      value: 'ความร้อน',
      label: currentLang === 'zh' ? '🔥 动火与热工作业 (Hot Work)' : currentLang === 'my' ? '🔥 မီးပွား/အပူထွက်သောအလုပ် (Hot Work)' : '🔥 งานประกายไฟ (Hot Work)',
    },
    {
      value: 'อับอากาศ',
      label: currentLang === 'zh' ? '📦 有限空间作业 (Confined Space)' : currentLang === 'my' ? '📦 ကျဉ်းကျပ်သောနေရာ (Confined Space)' : '📦 งานที่อับอากาศ (Confined Space)',
    },
    {
      value: 'บนที่สูง',
      label: currentLang === 'zh' ? '🧗 高处坠落作业 (Heights)' : currentLang === 'my' ? '🧗 အမြင့်တွင်အလုပ်လုပ်ခြင်း (Heights)' : '🧗 งานบนที่สูง (Heights)',
    },
    {
      value: 'ไฟฟ้า',
      label: currentLang === 'zh' ? '⚡ 电气与高压作业 (Electrical)' : currentLang === 'my' ? '⚡ လျှပ်စစ်လုပ်ငန်းများ (Electrical)' : '⚡ งานระบบไฟฟ้า (Electrical)',
    },
    {
      value: 'ขุด',
      label: currentLang === 'zh' ? '🏗️ 动土开挖与起重 (Excavation/Lifting)' : currentLang === 'my' ? '🏗️ မြေတူး/အလေးမခြင်း (Excavation/Lifting)' : '🏗️ งานขุดเจาะ/ยกของ (Excavation/Lifting)',
    },
    {
      value: 'เคมี',
      label: currentLang === 'zh' ? '☣️ 危险化学品作业 (Chemicals)' : currentLang === 'my' ? '☣️ ဓာတုပစ္စည်းလုပ်ငန်း (Chemicals)' : '☣️ งานสารเคมีอันตราย (Chemicals)',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">
              {getUIText('totalPermitsStat', currentLang)}
            </span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">{totalCount}</span>
            <span className="text-[11px] text-slate-400">
              {getUIText('totalPermitsSub', currentLang)}
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-amber-600 block">
              {getUIText('pendingReviewStat', currentLang)}
            </span>
            <span className="text-2xl font-black text-amber-600 mt-1 block">{pendingCount}</span>
            <span className="text-[11px] text-slate-400">
              {getUIText('pendingReviewSub', currentLang)}
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-emerald-600 block">
              {getUIText('approvedActiveStat', currentLang)}
            </span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">{approvedCount}</span>
            <span className="text-[11px] text-slate-400">
              {getUIText('approvedActiveSub', currentLang)}
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">
              {getUIText('closedPermitStat', currentLang)}
            </span>
            <span className="text-2xl font-black text-slate-700 mt-1 block">{closedCount}</span>
            <span className="text-[11px] text-slate-400">
              {getUIText('closedPermitSub', currentLang)}
            </span>
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
            placeholder={getUIText('searchPermitPlaceholder', currentLang)}
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
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Risk Type Dropdown */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-none hidden sm:block"
          >
            {riskOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* New Permit Button */}
          <button
            onClick={onCreateNewPermit}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>{getUIText('createNewPermitBtn', currentLang)}</span>
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
            <h4 className="font-bold text-slate-700 text-sm">
              {getUIText('emptyPermitsTitle', currentLang)}
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {getUIText('emptyPermitsDesc', currentLang)}
            </p>
            <button
              onClick={onCreateNewPermit}
              className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl shadow"
            >
              {getUIText('emptyPermitsCreateBtn', currentLang)}
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/70 text-slate-600 border-b border-slate-200 font-bold">
                  <th className="p-3.5 pl-4">{getUIText('colPermitNoDate', currentLang)}</th>
                  <th className="p-3.5">{getUIText('colApplicantCompany', currentLang)}</th>
                  <th className="p-3.5">{getUIText('colLocationWork', currentLang)}</th>
                  <th className="p-3.5">{getUIText('colRiskTypes', currentLang)}</th>
                  <th className="p-3.5">{getUIText('colStatus', currentLang)}</th>
                  <th className="p-3.5 pr-4 text-right">{getUIText('colActions', currentLang)}</th>
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
                        ⏰ {permit.startTime} - {permit.endTime}
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
                        📞 {permit.phone} ({permit.workerCount} {getUIText('personsCount', currentLang)})
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
                          {getUIText('approverLabel', currentLang)} {permit.safetyOfficerName.split(' ')[0]}
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
                          title={getUIText('actionViewPrint', currentLang)}
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Edit Form */}
                        <button
                          onClick={() => onSelectPermitForEdit(permit)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                          title={getUIText('actionEdit', currentLang)}
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {/* Quick Approve / Close Dropdown Menu */}
                        {permit.status === 'pending_approval' && (
                          <button
                            onClick={() => onUpdateStatus(permit.id, 'approved')}
                            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors font-bold text-[11px]"
                            title={getUIText('actionQuickApprove', currentLang)}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}

                        {permit.status === 'approved' && (
                          <button
                            onClick={() => onUpdateStatus(permit.id, 'closed')}
                            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors font-bold text-[11px]"
                            title={getUIText('actionQuickClose', currentLang)}
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
                              {getUIText('confirmDelete', currentLang)}
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="text-[10px] text-slate-500 px-1"
                            >
                              {getUIText('cancelDelete', currentLang)}
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(permit.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title={getUIText('actionDelete', currentLang)}
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
