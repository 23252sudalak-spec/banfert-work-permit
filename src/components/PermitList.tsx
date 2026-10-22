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
  MessageCircle,
  LayoutGrid,
  Table as TableIcon,
  X,
  ShieldCheck,
  Filter,
  Calendar,
  MapPin,
  Phone,
  User,
  Building,
  Flame,
  Box,
  Zap,
  HardHat,
  ArrowUpRight,
  FlaskConical,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { PermitRecord, PermitStatus, Language } from '../types/permit';
import { TARGET_SAFETY_OFFICER_WXID } from '../types/wechat';
import { sendWeChatApprovalNotification } from '../services/wechatNotificationService';
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
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [sentWechatId, setSentWechatId] = useState<string | null>(null);

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

  const handleSendWeChatNotif = (permit: PermitRecord) => {
    sendWeChatApprovalNotification(permit);
    setSentWechatId(permit.id);
    setTimeout(() => {
      setSentWechatId(null);
    }, 3000);
  };

  const getStatusBadge = (status: PermitStatus) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 leading-none whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>{getUIText('statusApproved', currentLang)}</span>
          </span>
        );
      case 'pending_approval':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300 leading-none whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 animate-ping" />
            <span>{getUIText('statusPending', currentLang)}</span>
          </span>
        );
      case 'conditional':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-yellow-50 text-yellow-800 border border-yellow-300 leading-none whitespace-nowrap">
            <AlertCircle className="w-3.5 h-3.5 text-yellow-600 shrink-0" />
            <span>{getUIText('statusConditional', currentLang)}</span>
          </span>
        );
      case 'work_in_progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 leading-none whitespace-nowrap">
            <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>{getUIText('statusActive', currentLang)}</span>
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 leading-none whitespace-nowrap">
            <Check className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>{getUIText('statusClosed', currentLang)}</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 leading-none whitespace-nowrap">
            <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span>{getUIText('statusRejected', currentLang)}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 leading-none whitespace-nowrap">
            <span>{getUIText('statusDraft', currentLang)}</span>
          </span>
        );
    }
  };

  const getRiskIcon = (r: string) => {
    if (r.includes('ความร้อน') || r.includes('Hot') || r.includes('动火') || r.includes('မီးပွား')) {
      return <Flame className="w-3.5 h-3.5 text-amber-600 shrink-0" />;
    }
    if (r.includes('อับอากาศ') || r.includes('Confined') || r.includes('有限空间') || r.includes('ကျဉ်းကျပ်')) {
      return <Box className="w-3.5 h-3.5 text-indigo-600 shrink-0" />;
    }
    if (r.includes('บนที่สูง') || r.includes('Heights') || r.includes('高处') || r.includes('အမြင့်')) {
      return <ArrowUpRight className="w-3.5 h-3.5 text-sky-600 shrink-0" />;
    }
    if (r.includes('ไฟฟ้า') || r.includes('Electrical') || r.includes('电') || r.includes('လျှပ်စစ်')) {
      return <Zap className="w-3.5 h-3.5 text-yellow-600 shrink-0" />;
    }
    if (r.includes('ขุด') || r.includes('Lifting') || r.includes('吊装') || r.includes('မြေတူး')) {
      return <HardHat className="w-3.5 h-3.5 text-emerald-600 shrink-0" />;
    }
    if (r.includes('เคมี') || r.includes('Chemical') || r.includes('化') || r.includes('ဓာတု')) {
      return <FlaskConical className="w-3.5 h-3.5 text-rose-600 shrink-0" />;
    }
    return <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
  };

  // Status Filter Tabs
  const statusTabItems: { value: string; label: string; count: number }[] = [
    { value: 'all', label: getUIText('allStatuses', currentLang), count: totalCount },
    { value: 'pending_approval', label: getUIText('statusPending', currentLang), count: pendingCount },
    { value: 'approved', label: getUIText('statusApproved', currentLang), count: approvedCount },
    { value: 'closed', label: getUIText('statusClosed', currentLang), count: closedCount },
  ];

  // Risk Filter Options
  const riskOptions = [
    { value: 'all', label: getUIText('allRiskTypes', currentLang) },
    {
      value: 'ความร้อน',
      label: currentLang === 'zh' ? '🔥 动火作业 (Hot Work)' : currentLang === 'my' ? '🔥 မီးပွား/အပူထွက်သောအလုပ် (Hot Work)' : '🔥 งานประกายไฟ (Hot Work)',
    },
    {
      value: 'อับอากาศ',
      label: currentLang === 'zh' ? '📦 有限空间 (Confined Space)' : currentLang === 'my' ? '📦 ကျဉ်းကျပ်သောနေရာ (Confined Space)' : '📦 งานที่อับอากาศ (Confined Space)',
    },
    {
      value: 'บนที่สูง',
      label: currentLang === 'zh' ? '🧗 高处作业 (Heights)' : currentLang === 'my' ? '🧗 အမြင့်တွင်အလုပ်လုပ်ခြင်း (Heights)' : '🧗 งานบนที่สูง (Heights)',
    },
    {
      value: 'ไฟฟ้า',
      label: currentLang === 'zh' ? '⚡ 电气作业 (Electrical)' : currentLang === 'my' ? '⚡ လျှပ်စစ်လုပ်ငန်းများ (Electrical)' : '⚡ งานระบบไฟฟ้า (Electrical)',
    },
    {
      value: 'ขุด',
      label: currentLang === 'zh' ? '🏗️ 动土起重 (Excavation/Lifting)' : currentLang === 'my' ? '🏗️ မြေတူး/အလေးမခြင်း (Excavation/Lifting)' : '🏗️ งานขุดเจาะ/ยกของ (Excavation/Lifting)',
    },
    {
      value: 'เคมี',
      label: currentLang === 'zh' ? '☣️ 危险化学品 (Chemicals)' : currentLang === 'my' ? '☣️ ဓာတုပစ္စည်းလုပ်ငန်း (Chemicals)' : '☣️ งานสารเคมีอันตราย (Chemicals)',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Modern Industrial Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-xl relative overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-md">
                {getUIText('mainHeroTag', currentLang)}
              </span>
              <span className="text-slate-500 text-xs hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>WeChat จป.วิชาชีพ: </span>
                <span className="font-mono font-bold text-white">{TARGET_SAFETY_OFFICER_WXID}</span>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
              {getUIText('mainHeroTitle', currentLang)}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {getUIText('mainHeroDesc', currentLang)}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onCreateNewPermit}
              className="h-11 px-5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
              <span>{getUIText('createNewPermitBtn', currentLang)}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Overview Cards (Industrial Clean Typographic Style) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Total */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between min-h-[110px] group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              {getUIText('totalPermitsStat', currentLang)}
            </span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              {totalCount}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5 truncate">
              {getUIText('totalPermitsSub', currentLang)}
            </span>
          </div>
        </div>

        {/* Card 2: Pending Approval (Highlight) */}
        <div
          onClick={() => setStatusFilter(statusFilter === 'pending_approval' ? 'all' : 'pending_approval')}
          className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[110px] group ${
            statusFilter === 'pending_approval'
              ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20'
              : 'bg-white border-amber-200/90 hover:border-amber-400 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>{getUIText('pendingReviewStat', currentLang)}</span>
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-600 tracking-tight tabular-nums">
              {pendingCount}
            </span>
            <span className="text-[11px] text-amber-700/80 block mt-0.5 font-medium truncate">
              {getUIText('pendingReviewSub', currentLang)} · แจ้งเตือน WeChat
            </span>
          </div>
        </div>

        {/* Card 3: Approved / Active */}
        <div
          onClick={() => setStatusFilter(statusFilter === 'approved' ? 'all' : 'approved')}
          className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[110px] group ${
            statusFilter === 'approved'
              ? 'bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-500/20'
              : 'bg-white border-emerald-200/80 hover:border-emerald-400 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700">
              {getUIText('approvedActiveStat', currentLang)}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-emerald-600 tracking-tight tabular-nums">
              {approvedCount}
            </span>
            <span className="text-[11px] text-emerald-700/80 block mt-0.5 font-medium truncate">
              {getUIText('approvedActiveSub', currentLang)}
            </span>
          </div>
        </div>

        {/* Card 4: Closed */}
        <div
          onClick={() => setStatusFilter(statusFilter === 'closed' ? 'all' : 'closed')}
          className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[110px] group ${
            statusFilter === 'closed'
              ? 'bg-slate-200/80 border-slate-400 ring-2 ring-slate-400/20'
              : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">
              {getUIText('closedPermitStat', currentLang)}
            </span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-700 tracking-tight tabular-nums">
              {closedCount}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5 truncate">
              {getUIText('closedPermitSub', currentLang)}
            </span>
          </div>
        </div>
      </div>

      {/* Control Bar: Modern Segmented Filter, Search, and View Mode */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Segmented Status Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
            {statusTabItems.map((tab) => {
              const isActive = statusFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setStatusFilter(tab.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Controls: Search, Risk Dropdown, and View Mode Toggle */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={getUIText('searchPermitPlaceholder', currentLang)}
                className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-all font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-200 text-slate-400"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Risk Type Dropdown */}
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/40 shrink-0"
            >
              {riskOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* View Mode Toggle (Table / Grid) */}
            <div className="hidden sm:flex items-center p-0.5 bg-slate-100 rounded-xl border border-slate-200/80 shrink-0">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'table'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title={getUIText('viewModeTable', currentLang)}
              >
                <TableIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title={getUIText('viewModeGrid', currentLang)}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Summary & Active State indicator */}
        {(searchQuery || statusFilter !== 'all' || riskFilter !== 'all') && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {getUIText('filteredResultsCount', currentLang)}: <strong className="text-slate-900">{filteredPermits.length}</strong> {getUIText('itemsUnit', currentLang)} (จากทั้งหมด {totalCount})
              </span>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setRiskFilter('all');
              }}
              className="text-amber-700 hover:text-amber-800 font-semibold text-xs flex items-center gap-1 hover:underline"
            >
              <X className="w-3.5 h-3.5" />
              <span>{getUIText('clearFilters', currentLang)}</span>
            </button>
          </div>
        )}
      </div>

      {/* Permits Content (Table View or Card Grid View) */}
      {filteredPermits.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm sm:text-base">
              {getUIText('emptyPermitsTitle', currentLang)}
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 leading-relaxed">
              {getUIText('emptyPermitsDesc', currentLang)}
            </p>
          </div>
          <button
            onClick={onCreateNewPermit}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>{getUIText('emptyPermitsCreateBtn', currentLang)}</span>
          </button>
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/90 text-slate-600 border-b border-slate-200 text-xs font-bold tracking-tight">
                  <th className="py-3.5 px-4 w-[180px] whitespace-nowrap">
                    {getUIText('colPermitNoDate', currentLang)}
                  </th>
                  <th className="py-3.5 px-4 w-[220px] whitespace-nowrap">
                    {getUIText('colApplicantCompany', currentLang)}
                  </th>
                  <th className="py-3.5 px-4 min-w-[220px]">
                    {getUIText('colLocationWork', currentLang)}
                  </th>
                  <th className="py-3.5 px-4 w-[190px] whitespace-nowrap">
                    {getUIText('colRiskTypes', currentLang)}
                  </th>
                  <th className="py-3.5 px-4 w-[150px] whitespace-nowrap">
                    {getUIText('colStatus', currentLang)}
                  </th>
                  <th className="py-3.5 pr-4 pl-2 w-[140px] text-right whitespace-nowrap">
                    {getUIText('colActions', currentLang)}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPermits.map((permit) => {
                  const isSentRecently = sentWechatId === permit.id;
                  const isHighRisk = permit.riskMatrix?.level === 'extreme' || (permit.riskMatrix?.score || 0) >= 16;

                  return (
                    <tr
                      key={permit.id}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      {/* Column 1: Permit Number & Schedule */}
                      <td className="p-4 align-top w-[180px]">
                        <div
                          onClick={() => onSelectPermitForView(permit)}
                          className="font-mono font-bold text-slate-900 text-xs cursor-pointer group-hover:text-amber-600 transition-colors flex items-center gap-1.5"
                        >
                          <span>{permit.permitNumber}</span>
                          <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                        <div className="flex items-center gap-1 text-slate-500 text-[11px] mt-1 font-mono">
                          <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{permit.workDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-400 text-[11px] mt-0.5 font-mono">
                          <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{permit.startTime} - {permit.endTime}</span>
                        </div>
                      </td>

                      {/* Column 2: Applicant & Organization */}
                      <td className="p-4 align-top w-[220px]">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900 text-xs truncate max-w-[190px]">
                            {permit.applicantName}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600 text-[11px] mt-1 truncate max-w-[200px]">
                          <Building className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{permit.company}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mt-0.5">
                          <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{permit.phone}</span>
                          <span className="text-slate-400">({permit.workerCount} คน)</span>
                        </div>
                        {permit.createdByEmail && (
                          <div className="mt-1 flex items-center gap-1">
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 text-[10px] font-mono border border-blue-200">
                              <span>QQ:</span>
                              <span className="truncate max-w-[120px]">{permit.createdByEmail}</span>
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Column 3: Location & Task Description */}
                      <td className="p-4 align-top min-w-[220px]">
                        <div className="flex items-center gap-1.5 font-semibold text-slate-800 text-xs truncate">
                          <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="truncate">{permit.location}</span>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                          {permit.jobDescription}
                        </p>
                      </td>

                      {/* Column 4: Risk Types & Score */}
                      <td className="p-4 align-top w-[190px]">
                        <div className="flex flex-wrap gap-1 max-w-[180px]">
                          {permit.riskTypes.slice(0, 2).map((r, rIdx) => (
                            <span
                              key={rIdx}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-100/90 text-slate-700 text-[11px] font-medium border border-slate-200"
                            >
                              {getRiskIcon(r)}
                              <span className="truncate max-w-[90px]">{r.split(' ')[0]}</span>
                            </span>
                          ))}
                          {permit.riskTypes.length > 2 && (
                            <span className="text-[10px] font-bold text-slate-400 self-center px-1">
                              +{permit.riskTypes.length - 2}
                            </span>
                          )}
                        </div>
                        <div className="mt-1.5 flex items-center gap-1 text-[11px] font-mono">
                          <span className="text-slate-400">ระดับความเสี่ยง:</span>
                          <span
                            className={`font-bold ${
                              isHighRisk ? 'text-rose-600' : 'text-amber-600'
                            }`}
                          >
                            {permit.riskMatrix?.score || 6}/25
                          </span>
                        </div>
                      </td>

                      {/* Column 5: Status */}
                      <td className="p-4 align-top w-[150px]">
                        {getStatusBadge(permit.status)}
                        {permit.safetyOfficerName && (
                          <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1 truncate max-w-[140px]">
                            <ShieldCheck className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate">{permit.safetyOfficerName.split(' ')[0]}</span>
                          </div>
                        )}
                      </td>

                      {/* Column 6: Actions */}
                      <td className="p-4 pr-4 align-top text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          {/* View */}
                          <button
                            onClick={() => onSelectPermitForView(permit)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            title={getUIText('actionViewPrint', currentLang)}
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => onSelectPermitForEdit(permit)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                            title={getUIText('actionEdit', currentLang)}
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* WeChat Notify Dispatch Button */}
                          <button
                            onClick={() => handleSendWeChatNotif(permit)}
                            className={`p-1.5 rounded-lg transition-all ${
                              isSentRecently
                                ? 'bg-emerald-600 text-white'
                                : 'text-[#07C160] hover:bg-emerald-50'
                            }`}
                            title={`ส่งแจ้งเตือนเข้า WeChat จป. (${TARGET_SAFETY_OFFICER_WXID})`}
                          >
                            {isSentRecently ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <MessageCircle className="w-4 h-4 fill-[#07C160]" />
                            )}
                          </button>

                          {/* Quick Approve / Close */}
                          {permit.status === 'pending_approval' && (
                            <button
                              onClick={() => onUpdateStatus(permit.id, 'approved')}
                              className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                              title={getUIText('actionQuickApprove', currentLang)}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          )}

                          {permit.status === 'approved' && (
                            <button
                              onClick={() => onUpdateStatus(permit.id, 'closed')}
                              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                              title={getUIText('actionQuickClose', currentLang)}
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}

                          {/* Delete */}
                          {deleteConfirmId === permit.id ? (
                            <div className="flex items-center gap-1 bg-rose-50 p-1 rounded-lg border border-rose-200">
                              <button
                                onClick={() => {
                                  onDeletePermit(permit.id);
                                  setDeleteConfirmId(null);
                                }}
                                className="text-[10px] font-bold text-rose-700 px-1.5 py-0.5 bg-rose-200 rounded"
                              >
                                ลบ
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="text-[10px] text-slate-500 px-1"
                              >
                                ยกเลิก
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* CARD / GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPermits.map((permit) => {
            const isSentRecently = sentWechatId === permit.id;
            const isHighRisk = permit.riskMatrix?.level === 'extreme' || (permit.riskMatrix?.score || 0) >= 16;

            return (
              <div
                key={permit.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all p-5 flex flex-col justify-between space-y-4 group"
              >
                <div>
                  {/* Card Top Row: Permit No & Status */}
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span
                        onClick={() => onSelectPermitForView(permit)}
                        className="font-mono font-bold text-sm text-slate-900 group-hover:text-amber-600 cursor-pointer transition-colors block"
                      >
                        {permit.permitNumber}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono mt-0.5">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{permit.workDate} ({permit.startTime}-{permit.endTime})</span>
                      </div>
                    </div>
                    <div>{getStatusBadge(permit.status)}</div>
                  </div>

                  {/* Task Location & Description */}
                  <div className="py-3 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="truncate">{permit.location}</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {permit.jobDescription}
                    </p>
                  </div>

                  {/* Risk Tags & Score */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {permit.riskTypes.slice(0, 3).map((r, rIdx) => (
                        <span
                          key={rIdx}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium"
                        >
                          {getRiskIcon(r)}
                          <span className="truncate max-w-[100px]">{r.split(' ')[0]}</span>
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-50 p-2 rounded-xl">
                      <span className="text-[11px]">คะแนนความเสี่ยง:</span>
                      <span
                        className={`font-mono font-bold text-xs ${
                          isHighRisk ? 'text-rose-600' : 'text-amber-600'
                        }`}
                      >
                        {permit.riskMatrix?.score || 6}/25 ({permit.riskMatrix?.level || 'medium'})
                      </span>
                    </div>
                  </div>

                  {/* Applicant Details */}
                  <div className="pt-2 text-xs space-y-1 text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-slate-400">
                        <User className="w-3 h-3" />
                        <span>ผู้ขอ:</span>
                      </span>
                      <span className="font-semibold text-slate-800 truncate max-w-[160px]">
                        {permit.applicantName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-slate-400">
                        <Building className="w-3 h-3" />
                        <span>บริษัท:</span>
                      </span>
                      <span className="text-slate-700 truncate max-w-[160px]">
                        {permit.company}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Bar */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleSendWeChatNotif(permit)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                        isSentRecently
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-50 text-[#07C160] hover:bg-emerald-100'
                      }`}
                      title={`ส่งแจ้งเตือน WeChat (${TARGET_SAFETY_OFFICER_WXID})`}
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span className="hidden sm:inline">WeChat</span>
                    </button>

                    {permit.status === 'pending_approval' && (
                      <button
                        onClick={() => onUpdateStatus(permit.id, 'approved')}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors flex items-center gap-1"
                        title="อนุมัติโดย จป."
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>อนุมัติ</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onSelectPermitForView(permit)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                      title={getUIText('actionViewPrint', currentLang)}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onSelectPermitForEdit(permit)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                      title={getUIText('actionEdit', currentLang)}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeletePermit(permit.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title={getUIText('actionDelete', currentLang)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
