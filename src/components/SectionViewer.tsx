import React, { useState } from 'react';
import {
  Copy,
  Check,
  Shield,
  Search,
  ExternalLink,
  HelpCircle,
  BookmarkCheck,
  Languages,
} from 'lucide-react';
import { FormSection, FormQuestion, Language } from '../types/permit';
import { getUIText } from '../data/translations';

interface SectionViewerProps {
  sections: FormSection[];
  onOpenDeployModal: () => void;
  onOpenAppsScriptTab: () => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const SectionViewer: React.FC<SectionViewerProps> = ({
  sections,
  onOpenDeployModal,
  onOpenAppsScriptTab,
  currentLang,
  onLanguageChange,
}) => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedQuestionId, setCopiedQuestionId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);

  const filteredSections = sections
    .map((sec) => {
      if (selectedSectionId !== 'all' && sec.id !== selectedSectionId) {
        return null;
      }

      if (!searchQuery.trim()) {
        return sec;
      }

      const q = searchQuery.toLowerCase();
      const matchedQuestions = sec.questions.filter(
        (question) =>
          question.title.toLowerCase().includes(q) ||
          (question.titleZh && question.titleZh.toLowerCase().includes(q)) ||
          (question.titleMy && question.titleMy.toLowerCase().includes(q)) ||
          (question.description && question.description.toLowerCase().includes(q)) ||
          (question.options && question.options.some((opt) => opt.toLowerCase().includes(q)))
      );

      if (matchedQuestions.length === 0 && !sec.title.toLowerCase().includes(q)) {
        return null;
      }

      return {
        ...sec,
        questions: matchedQuestions.length > 0 ? matchedQuestions : sec.questions,
      };
    })
    .filter(Boolean) as FormSection[];

  const totalQuestions = sections.reduce((acc, sec) => acc + sec.questions.length, 0);

  const handleCopyQuestion = (question: FormQuestion) => {
    let text = `[Question Title]: ${question.title}\n`;
    text += `[Google Form Type]: ${question.googleFormEquivalent}\n`;
    text += `[Required]: ${question.required ? 'Yes (Required)' : 'No (Optional)'}\n`;
    if (question.description) {
      text += `[Description]: ${question.description}\n`;
    }
    if (question.options && question.options.length > 0) {
      text += `[Options]:\n`;
      question.options.forEach((opt, idx) => {
        text += `  ${idx + 1}. ${opt}\n`;
      });
    }
    if (question.safetyOfficerTip) {
      text += `[Safety Officer Note]: ${question.safetyOfficerTip}\n`;
    }

    navigator.clipboard.writeText(text);
    setCopiedQuestionId(question.id);
    setTimeout(() => setCopiedQuestionId(null), 2000);
  };

  const handleCopyAllStructure = () => {
    let fullText = `# Permit to Work Google Form Structure (จป.วิชาชีพ)\n\n`;

    sections.forEach((sec) => {
      fullText += `====================================================\n`;
      fullText += `${sec.title}\n`;
      fullText += `${sec.description}\n`;
      fullText += `====================================================\n\n`;

      sec.questions.forEach((q, idx) => {
        fullText += `${sec.sectionNumber}.${idx + 1}: ${q.title}\n`;
        fullText += `- Type: ${q.googleFormEquivalent}\n`;
        fullText += `- Required: ${q.required ? 'Required' : 'Optional'}\n`;
        if (q.description) fullText += `- Description: ${q.description}\n`;
        if (q.options && q.options.length > 0) {
          fullText += `- Options:\n`;
          q.options.forEach((opt) => {
            fullText += `    • ${opt}\n`;
          });
        }
        if (q.safetyOfficerTip) fullText += `- Safety Tip: ${q.safetyOfficerTip}\n`;
        if (q.legalReference) fullText += `- Reference: ${q.legalReference}\n`;
        fullText += `\n`;
      });
    });

    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const getTypeBadge = (type: string, equivalent: string) => {
    switch (type) {
      case 'CHECKBOXES':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            ☑️ {equivalent}
          </span>
        );
      case 'MULTIPLE_CHOICE':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            🔘 {equivalent}
          </span>
        );
      case 'SHORT_ANSWER':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            ✏️ {equivalent}
          </span>
        );
      case 'PARAGRAPH':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            📝 {equivalent}
          </span>
        );
      case 'DATE':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            📅 {equivalent}
          </span>
        );
      case 'TIME':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200">
            ⏰ {equivalent}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            📎 {equivalent}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 text-xs font-semibold border border-amber-400/20">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                จป.วิชาชีพ • ISO 45001 • OSHA 1910
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">
                <Languages className="w-3.5 h-3.5 text-sky-400" />
                <span>รองรับ: ไทย 🇹🇭 • 中文 🇨🇳 • မြန်မာ 🇲🇲</span>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-tight">
              โครงสร้าง Google Form ใบอนุญาตทำงานเสี่ยง (PTW)
              <span className="text-amber-400 block text-base sm:text-lg font-medium mt-1">
                危险作业许可申请表 • အန္တရာယ်ရှိသောအလုပ်လုပ်ကိုင်ခွင့်
              </span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              รองรับ 3 ภาษา (ไทย, จีน, พม่า) ครบทั้ง 4 หมวดหมู่ 20 ข้อคำถาม สามารถสลับภาษาเพื่อสร้างฟอร์มภาษาเดียวหรือสองภาษาคู่ขนานได้ทันที
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full lg:w-auto">
            <button
              onClick={handleCopyAllStructure}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium text-xs sm:text-sm rounded-xl border border-slate-700 shadow transition-all active:scale-95"
            >
              {copiedAll ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">{getUIText('copiedAllBtn', currentLang)}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span>{getUIText('copyAllBtn', currentLang)}</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenDeployModal}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-95"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{getUIText('createGoogleFormBtn', currentLang)}</span>
            </button>
          </div>
        </div>

        {/* Quick Language Switcher Bar on Top of Content */}
        <div className="flex flex-wrap items-center gap-2 pt-5 mt-5 border-t border-slate-800/80 text-xs">
          <span className="text-slate-400 font-semibold flex items-center gap-1.5">
            <Languages className="w-3.5 h-3.5 text-amber-400" />
            โหมดภาษาแสดงผลและสร้างแบบฟอร์ม:
          </span>
          {[
            { id: 'th', label: '🇹🇭 ภาษาไทย' },
            { id: 'zh', label: '🇨🇳 中文 (จีน)' },
            { id: 'my', label: '🇲🇲 မြန်မာ (พม่า)' },
            { id: 'bilingual_th_my', label: '🇹🇭🇲🇲 ไทย-พม่า (TH-MY)' },
            { id: 'bilingual_th_zh', label: '🇹🇭🇨🇳 ไทย-จีน (TH-ZH)' },
            { id: 'trilingual', label: '🌐 3 ภาษา (TH-ZH-MY)' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onLanguageChange(item.id as Language)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                currentLang === item.id
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        {/* Section Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          <button
            onClick={() => setSelectedSectionId('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedSectionId === 'all'
                ? 'bg-slate-900 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {getUIText('filterAll', currentLang)}
          </button>
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setSelectedSectionId(sec.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSectionId === sec.id
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Section {sec.sectionNumber} ({sec.questions.length})
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={getUIText('searchPlaceholder', currentLang)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Sections & Questions List */}
      <div className="space-y-8">
        {filteredSections.map((sec) => (
          <section
            key={sec.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:border-slate-300"
          >
            {/* Section Header */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wide">
                    Section {sec.sectionNumber}
                  </span>
                  <span className="text-xs text-slate-400">
                    ({sec.questions.length} Questions)
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {sec.title}
                </h2>
                <p className="text-xs text-slate-300">{sec.description}</p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="text-xs text-slate-400">
                  Google Form: <span className="text-amber-300">Page {sec.sectionNumber}</span>
                </span>
              </div>
            </div>

            {/* Questions under this section */}
            <div className="divide-y divide-slate-100 p-3 sm:p-5 space-y-4 sm:space-y-6">
              {sec.questions.map((q, qIndex) => (
                <div
                  key={q.id}
                  className="pt-4 first:pt-0 group hover:bg-slate-50/50 p-3 sm:p-4 rounded-xl transition-colors border border-transparent hover:border-slate-200"
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                    {/* Left: Question title & details */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {sec.sectionNumber}.{qIndex + 1}
                        </span>

                        {getTypeBadge(q.type, q.googleFormEquivalent)}

                        {q.required ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            <span className="text-rose-600">*</span> {getUIText('requiredBadge', currentLang)}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600">
                            {getUIText('optionalBadge', currentLang)}
                          </span>
                        )}

                        {q.categoryTag && (
                          <span className="text-[11px] text-slate-400 px-1.5 py-0.5 bg-slate-100 rounded">
                            {q.categoryTag}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-slate-900 pt-1 leading-snug">
                        {q.title}
                      </h3>

                      {q.description && (
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {q.description}
                        </p>
                      )}

                      {/* Options rendering */}
                      {q.options && q.options.length > 0 && (
                        <div className="pt-2">
                          <div className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                            <BookmarkCheck className="w-3.5 h-3.5 text-amber-500" />
                            <span>{getUIText('optionsHeader', currentLang)} ({q.options.length}):</span>
                          </div>
                          <div className="grid grid-cols-1 gap-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                            {q.options.map((opt, optIdx) => (
                              <div
                                key={optIdx}
                                className="flex items-start gap-2 text-xs text-slate-700 py-0.5"
                              >
                                {q.type === 'CHECKBOXES' ? (
                                  <div className="w-3.5 h-3.5 mt-0.5 rounded border border-purple-400 bg-white flex items-center justify-center shrink-0">
                                    <Check className="w-2.5 h-2.5 text-purple-600" />
                                  </div>
                                ) : (
                                  <div className="w-3.5 h-3.5 mt-0.5 rounded-full border border-blue-400 bg-white flex items-center justify-center shrink-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                  </div>
                                )}
                                <span className="font-medium text-slate-800 leading-relaxed">{opt}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Safety Officer Expert Box */}
                      {q.safetyOfficerTip && (
                        <div className="mt-3 p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-2 text-xs text-amber-900">
                          <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-amber-950">
                              {getUIText('safetyOfficerTipHeader', currentLang)}{' '}
                            </span>
                            {q.safetyOfficerTip}
                          </div>
                        </div>
                      )}

                      {/* Legal Reference citation */}
                      {q.legalReference && (
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 pt-1">
                          <span className="font-semibold text-slate-600">
                            {getUIText('legalReferenceHeader', currentLang)}
                          </span>
                          <span>{q.legalReference}</span>
                        </div>
                      )}
                    </div>

                    {/* Right: Copy Question Details Button */}
                    <div className="shrink-0 self-end sm:self-start">
                      <button
                        onClick={() => handleCopyQuestion(q)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          copiedQuestionId === q.id
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900 shadow-sm'
                        }`}
                        title="Copy this question"
                      >
                        {copiedQuestionId === q.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{getUIText('copied', currentLang)}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500" />
                            <span>{getUIText('copyThisQuestion', currentLang)}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Bottom Action Footer for Google Forms Deployment */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-6 text-slate-950 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-lg font-bold">
            สร้าง Google Form ในภาษาที่เลือก ({currentLang.toUpperCase()}) ลงใน Google Drive ทันที
          </h3>
          <p className="text-xs sm:text-sm text-slate-900/80">
            ระบบจะสร้างตามภาษาที่คุณเลือก (ไทย, จีน, พม่า หรือแบบ 2-3 ภาษาคู่ขนาน) เพื่อให้ผู้รับเหมาและคนงานทุกคนเข้าใจตรงกัน
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAppsScriptTab}
            className="px-4 py-2.5 bg-slate-900 text-white hover:bg-slate-800 text-xs sm:text-sm font-semibold rounded-xl shadow transition-all"
          >
            ดู Google Apps Script
          </button>
          <button
            onClick={onOpenDeployModal}
            className="px-5 py-2.5 bg-white text-slate-950 hover:bg-amber-50 text-xs sm:text-sm font-bold rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            🚀 {getUIText('createGoogleFormBtn', currentLang)}
          </button>
        </div>
      </div>
    </div>
  );
};
