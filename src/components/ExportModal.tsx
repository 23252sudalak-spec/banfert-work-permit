import React, { useState } from 'react';
import {
  Copy,
  Check,
  Download,
  Code2,
  FileSpreadsheet,
  FileText,
  Printer,
  Globe,
} from 'lucide-react';
import { FormSection, Language } from '../types/permit';
import { generateGoogleAppsScript } from '../services/appsScriptGenerator';
import { getLocalizedSections } from '../utils/permitLocalization';
import { formatBilingualText } from '../data/translations';

interface ExportModalProps {
  sections: FormSection[];
  onOpenDeployModal: () => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  sections,
  onOpenDeployModal,
  currentLang,
  onLanguageChange,
}) => {
  const [activeExportTab, setActiveExportTab] = useState<'table' | 'appsscript' | 'markdown' | 'print'>(
    'table'
  );
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [copiedCSV, setCopiedCSV] = useState(false);

  const localizedSections = getLocalizedSections(sections, currentLang);
  const appsScriptCode = generateGoogleAppsScript(localizedSections);

  const generateMarkdown = () => {
    let md = `# Permit to Work System (PTW) - ${currentLang.toUpperCase()}\n`;
    md += `**Standard:** จป.วิชาชีพ / ISO 45001 / OSHA 1910\n\n`;

    localizedSections.forEach((sec) => {
      md += `## ${sec.title}\n`;
      md += `*${sec.description}*\n\n`;

      sec.questions.forEach((q, idx) => {
        md += `### ${sec.sectionNumber}.${idx + 1}: ${q.title}\n`;
        md += `- **Google Form Type:** \`${q.googleFormEquivalent}\`\n`;
        md += `- **Required:** ${q.required ? '✅ Required' : '⚪ Optional'}\n`;
        if (q.description) {
          md += `- **Description:** ${q.description}\n`;
        }
        if (q.options && q.options.length > 0) {
          md += `- **Options:**\n`;
          q.options.forEach((opt) => {
            md += `  - [ ] ${opt}\n`;
          });
        }
        if (q.safetyOfficerTip) {
          md += `- **Safety Note:** 💡 ${q.safetyOfficerTip}\n`;
        }
        md += `\n`;
      });
    });

    return md;
  };

  const generateCSV = () => {
    let csv = `"Section","Question No.","Question Title","Google Form Type","Required","Options","Safety Tip"\n`;
    localizedSections.forEach((sec) => {
      sec.questions.forEach((q, idx) => {
        const optionsStr = (q.options || []).join(' | ').replace(/"/g, '""');
        const titleStr = q.title.replace(/"/g, '""');
        const tipStr = (q.safetyOfficerTip || '').replace(/"/g, '""');
        csv += `"${sec.title}","${sec.sectionNumber}.${idx + 1}","${titleStr}","${q.googleFormEquivalent}","${q.required ? 'Yes' : 'No'}","${optionsStr}","${tipStr}"\n`;
      });
    });
    return csv;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(appsScriptCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  const handleDownloadCSV = () => {
    const csvData = generateCSV();
    const blob = new Blob(['\uFEFF' + csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `permit_to_work_${currentLang}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopiedCSV(true);
    setTimeout(() => setCopiedCSV(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher & Language Pill */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveExportTab('table')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeExportTab === 'table'
                ? 'bg-slate-900 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>ตารางโครงสร้างทุกข้อ</span>
          </button>

          <button
            onClick={() => setActiveExportTab('appsscript')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeExportTab === 'appsscript'
                ? 'bg-slate-900 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Code2 className="w-4 h-4 text-amber-400" />
            <span>Google Apps Script (.gs)</span>
          </button>

          <button
            onClick={() => setActiveExportTab('markdown')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeExportTab === 'markdown'
                ? 'bg-slate-900 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4 text-blue-400" />
            <span>Markdown / ข้อความสรุป</span>
          </button>

          <button
            onClick={() => setActiveExportTab('print')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeExportTab === 'print'
                ? 'bg-slate-900 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Printer className="w-4 h-4 text-purple-400" />
            <span>พรีวิวเอกสารพิมพ์ (Print)</span>
          </button>
        </div>

        {/* Language Selection within Export Tab */}
        <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs">
          <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
          {[
            { id: 'th', label: '🇹🇭 TH' },
            { id: 'zh', label: '🇨🇳 ZH' },
            { id: 'my', label: '🇲🇲 MY' },
            { id: 'bilingual_th_my', label: '🇹🇭🇲🇲 TH-MY' },
            { id: 'bilingual_th_zh', label: '🇹🇭🇨🇳 TH-ZH' },
            { id: 'trilingual', label: '🌐 3-LANG' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onLanguageChange(item.id as Language)}
              className={`px-2 py-1 rounded-lg font-medium transition-all ${
                currentLang === item.id
                  ? 'bg-slate-900 text-white font-bold'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Structured Table */}
      {activeExportTab === 'table' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                ตารางสรุปโครงสร้างคำถามในภาษา ({currentLang.toUpperCase()})
              </h3>
              <p className="text-xs text-slate-500">
                พร้อมชื่อคำถาม, ประเภทคำถาม, เงื่อนไขจำเป็น และตัวเลือกทั้งหมด
              </p>
            </div>
            <button
              onClick={handleDownloadCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-semibold shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ดาวน์โหลด Excel / CSV ({currentLang.toUpperCase()})</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200">
                  <th className="p-3 font-bold w-12 text-center">ข้อ</th>
                  <th className="p-3 font-bold w-1/4">ชื่อคำถาม (Question Title)</th>
                  <th className="p-3 font-bold w-36">ประเภท Google Form</th>
                  <th className="p-3 font-bold w-24 text-center">จำเป็น (Required)</th>
                  <th className="p-3 font-bold">ตัวเลือก (Options) / คำอธิบาย</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {localizedSections.map((sec) => (
                  <React.Fragment key={sec.id}>
                    <tr className="bg-slate-900 text-white font-bold text-xs">
                      <td colSpan={5} className="p-2.5 px-4">
                        {sec.title}
                      </td>
                    </tr>
                    {sec.questions.map((q, idx) => (
                      <tr key={q.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 text-center font-bold text-slate-500">
                          {sec.sectionNumber}.{idx + 1}
                        </td>
                        <td className="p-3 font-semibold text-slate-900 align-top">
                          {q.title}
                          {q.safetyOfficerTip && (
                            <span className="block text-[11px] font-normal text-amber-700 mt-0.5">
                              💡 {q.safetyOfficerTip}
                            </span>
                          )}
                        </td>
                        <td className="p-3 align-top">
                          <span className="px-2 py-0.5 rounded font-medium bg-slate-100 text-slate-800 border border-slate-200 text-[11px] block text-center">
                            {q.googleFormEquivalent}
                          </span>
                        </td>
                        <td className="p-3 text-center align-top">
                          {q.required ? (
                            <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                              ใช่
                            </span>
                          ) : (
                            <span className="text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                              ไม่ใช่
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-slate-600 align-top">
                          {q.options && q.options.length > 0 ? (
                            <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                              {q.options.map((opt, oIdx) => (
                                <li key={oIdx}>{opt}</li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-slate-400 italic text-[11px]">
                              {q.description || 'คำตอบอิสระ'}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Google Apps Script */}
      {activeExportTab === 'appsscript' && (
        <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-xl overflow-hidden p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-white">
                  Google Apps Script ({currentLang.toUpperCase()})
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                สร้าง Google Form ในภาษาที่เลือกโดยอัตโนมัติผ่าน Google Apps Script (script.google.com)
              </p>
            </div>

            <button
              onClick={handleCopyCode}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all"
            >
              {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? 'คัดลอกโค้ดแล้ว!' : 'คัดลอกโค้ดทั้งหมด'}</span>
            </button>
          </div>

          <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-300 overflow-x-auto max-h-[460px] leading-relaxed">
            <code>{appsScriptCode}</code>
          </pre>
        </div>
      )}

      {/* Tab 3: Markdown */}
      {activeExportTab === 'markdown' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                ข้อกำหนดฉบับ Markdown ({currentLang.toUpperCase()})
              </h3>
            </div>
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 shadow"
            >
              {copiedMarkdown ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedMarkdown ? 'คัดลอกแล้ว!' : 'คัดลอก Markdown'}</span>
            </button>
          </div>

          <textarea
            readOnly
            value={generateMarkdown()}
            className="w-full h-96 p-4 font-mono text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
          />
        </div>
      )}

      {/* Tab 4: Printable Permit Certificate (Tri-lingual Header) */}
      {activeExportTab === 'print' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 print:border-none print:shadow-none">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 print:hidden">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                ใบอนุญาตทำงานเสี่ยงฉบับ 3 ภาษา (PTW Certificate - TH/ZH/MY)
              </h3>
              <p className="text-xs text-slate-500">
                สั่งพิมพ์เอกสารเพื่อติดแสดงหน้างานเสี่ยงหรือเก็บในแฟ้มประวัติความปลอดภัย
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์เอกสารนี้ (Print)</span>
            </button>
          </div>

          {/* Printable Layout */}
          <div className="border-2 border-slate-900 p-6 rounded-xl space-y-6 text-slate-900 text-xs font-['Prompt','Noto_Sans_Myanmar','Noto_Sans_SC',sans-serif]">
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
              <div>
                <h1 className="text-base sm:text-lg font-black uppercase tracking-wider">
                  ใบอนุญาตปฏิบัติงานที่มีความเสี่ยง (PERMIT TO WORK - PTW)
                </h1>
                <p className="text-[12px] font-bold text-slate-700">
                  危险作业许可证 • အန္တရာယ်ရှိသောအလုပ်လုပ်ကိုင်ခွင့်လက်မှတ်
                </p>
                <p className="text-[10px] text-slate-500">
                  ตามมาตรฐานความปลอดภัย จป.วิชาชีพ และ พ.ร.บ.ความปลอดภัยฯ พ.ศ. 2554
                </p>
              </div>
              <div className="text-right border-l-2 border-slate-900 pl-4 shrink-0">
                <span className="block font-bold">PTW No: PTW-2026-001</span>
                <span className="text-[10px] text-slate-500">สถานะ: รออนุมัติ / 待审核</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b pb-4">
              <div>
                <span className="font-bold block">1. ข้อมูลผู้ขออนุญาต / 申请人信息:</span>
                <p>ชื่อผู้ควบคุม / 姓名: ................................................................</p>
                <p className="mt-1">บริษัท / 单位: ................................................................</p>
                <p className="mt-1">โทรศัพท์ / 电话: ................................................................</p>
              </div>
              <div>
                <span className="font-bold block">2. วันเวลาและสถานที่ / 作业时间与地点:</span>
                <p>สถานที่ / 地点: ................................................................</p>
                <p className="mt-1">วันที่ / 日期: ........................ เวลา: ............ ถึง ............ น.</p>
                <p className="mt-1">จำนวนคน / 人数: ............... คน</p>
              </div>
            </div>

            <div className="border-b pb-4">
              <span className="font-bold block mb-1">3. ประเภทงานเสี่ยง / 危险作业类别 / အလုပ်အမျိုးအစား:</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                <span>[ ] งานประกายไฟ (Hot Work / 动火作业)</span>
                <span>[ ] งานที่อับอากาศ (Confined Space / 受限空间)</span>
                <span>[ ] งานบนที่สูง (Heights / 高处作业)</span>
                <span>[ ] งานระบบไฟฟ้า (Electrical / 电气作业)</span>
                <span>[ ] งานขุดเจาะ/ยกของ (Excavation & Lifting)</span>
                <span>[ ] งานสารเคมี (Chemical / 危险化学品)</span>
              </div>
            </div>

            <div className="border-b pb-4">
              <span className="font-bold block mb-1">4. มาตรการควบคุมความปลอดภัยบังคับ / 强制安全管控措施:</span>
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                <span>[ ] LOTO ตัดแยกพลังงาน / 能量隔离上锁挂牌</span>
                <span>[ ] ตรวจวัดก๊าซ 4 ชนิดผ่านเกณฑ์ / 四合一气体检测合格</span>
                <span>[ ] ติดตั้งถังดับเพลิงประจำจุด / 配备灭火器</span>
                <span>[ ] จัดให้มีผู้เฝ้าระวังไฟ / 配备动火监护人</span>
                <span>[ ] สวมใส่อุปกรณ์ PPE ครบถ้วน / 佩戴合格防护用品</span>
                <span>[ ] กั้นเขตและติดป้ายเตือน / 设立警戒隔离区</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4 text-center">
              <div className="border border-slate-300 p-4 rounded-lg">
                <p className="font-bold mb-8">ลงชื่อผู้ขออนุญาต / 申请人签署</p>
                <p>(..................................................................)</p>
                <p className="text-[10px] text-slate-500 mt-1">วันที่: ...... / ...... / 2569</p>
              </div>
              <div className="border border-slate-300 p-4 rounded-lg">
                <p className="font-bold mb-8">ลงชื่อ จป.วิชาชีพ / 安全工程师审批签署</p>
                <p>(..................................................................)</p>
                <p className="text-[10px] text-slate-500 mt-1">วันที่: ...... / ...... / 2569</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
