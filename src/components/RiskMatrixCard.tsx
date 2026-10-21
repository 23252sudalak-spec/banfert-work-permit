import React from 'react';
import {
  ShieldAlert,
  Flame,
  Box,
  TrendingUp,
  Zap,
  Truck,
  AlertTriangle,
  FileCheck2,
} from 'lucide-react';
import { RISK_CATEGORIES } from '../data/permitTemplate';
import { Language } from '../types/permit';
import { formatBilingualText } from '../data/translations';

interface RiskMatrixCardProps {
  currentLang: Language;
}

export const RiskMatrixCard: React.FC<RiskMatrixCardProps> = ({ currentLang }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'hot-work':
        return <Flame className="w-5 h-5 text-amber-500" />;
      case 'confined-space':
        return <Box className="w-5 h-5 text-rose-500" />;
      case 'heights':
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      case 'electrical':
        return <Zap className="w-5 h-5 text-yellow-500" />;
      case 'excavation-lifting':
        return <Truck className="w-5 h-5 text-emerald-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Overview header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full text-xs font-semibold w-fit mb-3">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
          <span>
            {formatBilingualText(
              'คู่มือมาตรฐาน จป.วิชาชีพ (Thai • 中文 • မြန်မာ)',
              '专业安全工程师标准手册 (中·泰·缅三语支持)',
              'လုံခြုံရေးအရာရှိ စံနှုန်းလမ်းညွှန် (ထိုင်း၊ တရုတ်၊ မြန်မာ)',
              currentLang
            )}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          {formatBilingualText(
            'มาตรฐานกฎหมายความปลอดภัย และเกณฑ์ประเมินความเสี่ยง (Permit to Work Standard)',
            '安全法规标准与作业风险评估准则 (PTW Standards)',
            'လုပ်ငန်းခွင်ဘေးအန္တရာယ်ကင်းရှင်းရေး ဥပဒေစံနှုန်းများနှင့် Risk Matrix',
            currentLang
          )}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          {formatBilingualText(
            'ระบบใบอนุญาตทำงานเสี่ยง (PTW) รองรับการบริหารจัดการ 3 ภาษา ช่วยลดอุปสรรคทางภาษาสำหรับคนงานและผู้รับเหมา เพิ่มความปลอดภัย 100%',
            '危险作业许可管理系统全面支持泰、中、缅三语协同，消除跨国界工程语言沟通障碍，筑牢现场零事故防线。',
            'PTW စနစ်သည် ၃ ဘာသာဖြင့် ပံ့ပိုးထားသောကြောင့် ဘာသာစကားအခက်အခဲမရှိဘဲ လုပ်ငန်းခွင်အတွင်း အန္တရာယ်ကင်းရှင်းစွာ လုပ်ကိုင်နိုင်ပါသည်',
            currentLang
          )}
        </p>
      </div>

      {/* 5x5 Risk Assessment Matrix Visual */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              {formatBilingualText(
                'ตารางเมทริกซ์ประเมินความเสี่ยง 5x5 (Risk Matrix 5x5)',
                '5×5 安全风险评估矩阵 (Risk Matrix 5x5)',
                '၅x၅ အန္တရာယ်အဆင့်သတ်မှတ်ချက်ဇယား (Risk Matrix 5x5)',
                currentLang
              )}
            </h3>
            <p className="text-xs text-slate-500">
              Risk Score = Likelihood (1-5) × Severity (1-5)
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">Low (1-4)</span>
            <span className="px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 border border-yellow-300">Med (5-9)</span>
            <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-800 border border-orange-300">High (10-15)</span>
            <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300">Extreme (16-25)</span>
          </div>
        </div>

        {/* Matrix Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[500px] text-xs">
            <div className="grid grid-cols-6 gap-1 font-semibold text-center pb-2 text-slate-600">
              <div className="p-2 text-left text-slate-400">Severity \ Likelihood</div>
              <div className="p-2 bg-slate-100 rounded">1. Rare (น้อยมาก)</div>
              <div className="p-2 bg-slate-100 rounded">2. Unlikely (น้อย)</div>
              <div className="p-2 bg-slate-100 rounded">3. Possible (ปานกลาง)</div>
              <div className="p-2 bg-slate-100 rounded">4. Likely (สูง)</div>
              <div className="p-2 bg-slate-100 rounded">5. Frequent (บ่อย)</div>
            </div>

            {[
              { level: 5, name: '5. Catastrophic (เสียชีวิต/หายนะ)', scores: [5, 10, 15, 20, 25] },
              { level: 4, name: '4. Major (สาหัส/พิการ)', scores: [4, 8, 12, 16, 20] },
              { level: 3, name: '3. Moderate (หยุดงาน)', scores: [3, 6, 9, 12, 15] },
              { level: 2, name: '2. Minor (ปฐมพยาบาล)', scores: [2, 4, 6, 8, 10] },
              { level: 1, name: '1. Negligible (เล็กน้อย)', scores: [1, 2, 3, 4, 5] },
            ].map((row, rIdx) => (
              <div key={rIdx} className="grid grid-cols-6 gap-1 py-0.5 text-center font-bold">
                <div className="p-2 bg-slate-50 text-slate-700 font-semibold rounded text-left text-xs flex items-center leading-snug">
                  {row.name}
                </div>
                {row.scores.map((score, sIdx) => {
                  let color = 'bg-emerald-50 text-emerald-800 border border-emerald-200';
                  if (score >= 16) color = 'bg-rose-100 text-rose-900 border border-rose-300';
                  else if (score >= 10) color = 'bg-orange-100 text-orange-900 border border-orange-300';
                  else if (score >= 5) color = 'bg-yellow-100 text-yellow-900 border border-yellow-300';
                  return (
                    <div
                      key={sIdx}
                      className={`p-2.5 rounded-lg flex items-center justify-center text-xs ${color}`}
                    >
                      {score}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6 High-Risk Work Standard Detail Cards */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          {formatBilingualText(
            'ข้อกำหนดมาตรฐานเฉพาะทางสำหรับงานเสี่ยง 6 ประเภทหลัก (Multilingual Standards)',
            '六大高危作业专项安全控制标准 (中·泰·缅)',
            'အန္တရာယ်ရှိသော အလုပ် ၆ မျိုးအတွက် သတ်မှတ်ချက်စံနှုန်းများ',
            currentLang
          )}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RISK_CATEGORIES.map((cat) => {
            const catName = formatBilingualText(cat.nameTh, cat.nameZh, cat.nameMy, currentLang);
            const checks =
              currentLang === 'zh'
                ? cat.mandatoryChecksZh || cat.mandatoryChecks
                : currentLang === 'my'
                ? cat.mandatoryChecksMy || cat.mandatoryChecks
                : cat.mandatoryChecks;

            const ppeList =
              currentLang === 'zh'
                ? cat.essentialPPEZh || cat.essentialPPE
                : currentLang === 'my'
                ? cat.essentialPPEMy || cat.essentialPPE
                : cat.essentialPPE;

            return (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      {getIcon(cat.id)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-snug">{catName}</h4>
                      <p className="text-[11px] text-slate-400">{cat.nameEn}</p>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                  <span className="font-semibold text-slate-700">⚖️ Standard: </span>
                  {cat.standard}
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-slate-700 block">
                    {formatBilingualText('มาตรการบังคับ:', '强制管控措施:', 'မဖြစ်မနေ လိုက်နာရန် -', currentLang)}
                  </span>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    {checks.map((check, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {check}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-700 block mb-1">
                    PPE:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {ppeList.map((ppe, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-medium"
                      >
                        {ppe}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
