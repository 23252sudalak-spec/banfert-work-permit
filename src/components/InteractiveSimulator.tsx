import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Printer,
  Activity,
  UserCheck,
  Languages,
} from 'lucide-react';
import { Language } from '../types/permit';
import { formatBilingualText, getUIText } from '../data/translations';

interface InteractiveSimulatorProps {
  currentLang: Language;
}

export const InteractiveSimulator: React.FC<InteractiveSimulatorProps> = ({
  currentLang,
}) => {
  // Form State
  const [applicantName, setApplicantName] = useState('นายสมชาย ปลอดภัยดี / U Aung Min / 张明');
  const [role, setRole] = useState('หัวหน้างาน / โฟร์แมนผู้รับเหมา (Site Supervisor / Foreman)');
  const [company, setCompany] = useState('บริษัท สยามเซฟตี้เอนจิเนียริ่ง จำกัด / Sino-Thai Engineering');
  const [phone, setPhone] = useState('081-999-8888');
  const [location, setLocation] = useState('อาคารผลิตที่ 2 ชั้น 3 (Building 2, 3F, Boiler Area / 锅炉区)');
  const [workDate, setWorkDate] = useState('2026-10-21');
  const [startTime, setStartTime] = useState('08:30');
  const [endTime, setEndTime] = useState('17:00');
  const [workerCount, setWorkerCount] = useState('4');

  // Risk types
  const [selectedRisks, setSelectedRisks] = useState<string[]>([
    'งานที่ทำให้เกิดความร้อนหรือประกายไฟ (Hot Work) - 动火作业 - အပူ/မီးပွားထွက်သောအလုပ်',
    'งานบนที่สูง (Working at Heights - สูงเกิน 2 เมตรขึ้นไป) - 高处作业 - အမြင့်တွင်လုပ်သောအလုပ်',
  ]);

  // PPE Checks
  const [selectedPPE, setSelectedPPE] = useState<string[]>([
    'หมวกนิรภัย (Safety Helmet / 安全帽 / လုံခြုံရေးဦးထုပ်)',
    'รองเท้านิรภัยหัวเหล็ก (Safety Shoes / 钢头安全鞋 / သံထိပ်ပါဖိနပ်)',
    'แว่นตานิรภัย (Safety Glasses / 护目镜 / လုံခြုံရေးမျက်မှန်)',
    'ถุงมือนิรภัย (Gloves / 防护手套 / လက်အိတ်)',
    'เข็มขัดนิรภัยเต็มตัว (Full Body Harness / 全身式安全带 / ခါးပတ်)',
  ]);

  // Safety Controls
  const [selectedControls, setSelectedControls] = useState<string[]>([
    '[Fire Protection] จัดตั้งถังดับเพลิง 15 ปอนด์ / 配备灭火器 / မီးသတ်ဆေးဘူး အသင့်ထားရှိသည်',
    '[Fire Watcher] จัดให้มีผู้เฝ้าระวังไฟ / 配备动火监护人 / မီးစောင့်ကြည့်သူ တာဝန်ချထားသည်',
    '[Combustibles] เคลียร์สารไวไฟในรัศมี 11 ม. / 清理可燃物 / မီးလောင်လွယ်ပစ္စည်း ရှင်းလင်းထားသည်',
    '[Fall Protection] มีจุดยึด Lifeline รับแรง 5,000 ปอนด์ / 生命线锚固 / ကြိုးချည်တိုင် ခိုင်ခံ့မှုရှိသည်',
  ]);

  // Gas readings
  const [gasO2, setGasO2] = useState('20.9');
  const [gasLEL, setGasLEL] = useState('0');
  const [gasCO, setGasCO] = useState('0');
  const [gasH2S, setGasH2S] = useState('0');

  // Risk Matrix
  const [probability, setProbability] = useState<number>(2);
  const [severity, setSeverity] = useState<number>(3);

  // Approval
  const [safetyOfficerName, setSafetyOfficerName] = useState('นางสาวสุดาลักษ์ พิมพ์พันธ์ (จป.วิชาชีพ เลขที่ ว.4582)');
  const [approvalStatus, setApprovalStatus] = useState<string>(
    '✅ อนุมัติให้เข้าปฏิบัติงานได้ตามมาตรการที่กำหนด (Approved / 准予开工 / အတည်ပြုသည်)'
  );

  const riskScore = probability * severity;
  const getRiskLevel = (score: number) => {
    if (score <= 4)
      return {
        label: formatBilingualText(
          'ความเสี่ยงต่ำ (Low Risk)',
          '低风险 (Low Risk)',
          'အန္တရာယ်အဆင့် နိမ့် (Low Risk)',
          currentLang
        ),
        color: 'text-emerald-700 bg-emerald-100 border-emerald-300',
      };
    if (score <= 9)
      return {
        label: formatBilingualText(
          'ความเสี่ยงปานกลาง (Medium Risk)',
          '中度风险 (Medium Risk)',
          'အန္တရာယ်အဆင့် အလယ်အလတ် (Medium)',
          currentLang
        ),
        color: 'text-yellow-700 bg-yellow-100 border-yellow-300',
      };
    if (score <= 15)
      return {
        label: formatBilingualText(
          'ความเสี่ยงสูง (High Risk)',
          '高度风险 (High Risk)',
          'အန္တရာယ်အဆင့် မြင့် (High Risk)',
          currentLang
        ),
        color: 'text-orange-700 bg-orange-100 border-orange-300',
      };
    return {
      label: formatBilingualText(
        'ความเสี่ยงสูงมาก / วิกฤต (Extreme Risk - ห้ามทำงานหากไร้มาตรการ)',
        '极高危险/重大风险 (Extreme Risk - 严禁冒险作业)',
        'အလွန်အန္တရာယ်ကြီးမားသောအဆင့် (Extreme Risk - လုံးဝခွင့်မပြုပါ)',
        currentLang
      ),
      color: 'text-rose-700 bg-rose-100 border-rose-300',
    };
  };

  const isConfinedSpace = selectedRisks.some(
    (r) => r.includes('อับอากาศ') || r.includes('受限空间') || r.includes('ကျဉ်းမြောင်း')
  );

  const toggleRisk = (riskText: string) => {
    if (selectedRisks.includes(riskText)) {
      setSelectedRisks(selectedRisks.filter((r) => r !== riskText));
    } else {
      setSelectedRisks([...selectedRisks, riskText]);
    }
  };

  const togglePPE = (item: string) => {
    if (selectedPPE.includes(item)) {
      setSelectedPPE(selectedPPE.filter((i) => i !== item));
    } else {
      setSelectedPPE([...selectedPPE, item]);
    }
  };

  const toggleControl = (ctrl: string) => {
    if (selectedControls.includes(ctrl)) {
      setSelectedControls(selectedControls.filter((c) => c !== ctrl));
    } else {
      setSelectedControls([...selectedControls, ctrl]);
    }
  };

  const o2Val = parseFloat(gasO2);
  const lelVal = parseFloat(gasLEL);
  const coVal = parseFloat(gasCO);
  const h2sVal = parseFloat(gasH2S);

  const isGasSafe =
    o2Val >= 19.5 && o2Val <= 23.5 &&
    lelVal < 10 &&
    coVal < 25 &&
    h2sVal < 10;

  return (
    <div className="space-y-6">
      {/* Simulator Intro Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              {formatBilingualText(
                'โหมดจำลองกรอกฟอร์มจริง (Permit Simulation)',
                '真实填报模拟模式 (Permit Simulation)',
                'လက်တွေ့စမ်းသပ်မှုစနစ် (Permit Simulation)',
                currentLang
              )}
            </span>
            <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded font-mono">
              LANG: {currentLang.toUpperCase()}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {formatBilingualText(
              'ระบบทดสอบกรอกใบขออนุญาตทำงานเสี่ยง & ประเมินผลความปลอดภัย',
              '危险作业许可证填报测试与实时安全评估',
              'အန္တရာယ်ရှိသော အလုပ်လုပ်ကိုင်ခွင့် လျှောက်လွှာ စမ်းသပ်စနစ်',
              currentLang
            )}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {formatBilingualText(
              'จำลองการกรอกข้อมูล 3 ภาษา (ไทย, จีน, พม่า) รองรับการใช้งานในโรงงานที่มีผู้รับเหมาหลากหลายสัญชาติ',
              '支持泰语、中文、缅甸语多语言施工人员协同填报，满足多语种合规要求',
              'ထိုင်း၊ တရုတ်၊ မြန်မာ ၃ ဘာသာဖြင့် အလုပ်လုပ်နိုင်ပြီး စက်ရုံတိုင်းတွင် အသုံးပြုနိုင်ပါသည်',
              currentLang
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>พิมพ์ใบอนุญาต (Print PTW)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Form Simulation (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: General Info */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs flex items-center justify-center font-bold">1</span>
                <span>
                  {formatBilingualText(
                    'ส่วนที่ 1: ข้อมูลทั่วไปของการขออนุญาต',
                    '第一部分：申请基本信息',
                    'အပိုင်း ၁ - လျှောက်ထားခြင်းဆိုင်ရာ အထွေထွေအချက်အလက်များ',
                    currentLang
                  )}
                </span>
              </h3>
              <span className="text-xs text-rose-500 font-semibold">* Required</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  1.1 {formatBilingualText('ชื่อ-นามสกุล ผู้ขออนุญาต / ผู้รับเหมา', '申请人姓名', 'လျှောက်ထားသူ အမည်', currentLang)} *
                </label>
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  1.2 {formatBilingualText('บริษัท / หน่วยงานต้นสังกัด', '所属单位/公司名称', 'ကုမ္ပဏီ / ဌာနအမည်', currentLang)} *
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  1.3 {formatBilingualText('เบอร์โทรศัพท์ฉุกเฉิน 24 ชม.', '24小时应急联络电话', '၂၄ နာရီ အရေးပေါ်ဖုန်း', currentLang)} *
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  1.4 {formatBilingualText('จำนวนผู้ปฏิบัติงาน (คน)', '作业总人数 (人)', 'လုပ်သားဦးရေ (ဦး)', currentLang)} *
                </label>
                <input
                  type="number"
                  value={workerCount}
                  onChange={(e) => setWorkerCount(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">
                  1.5 {formatBilingualText('สถานที่ปฏิบัติงาน (อาคาร/ชั้น/โซน)', '作业具体地点 (区域/楼层)', 'လုပ်ငန်းခွင်နေရာ (အဆောက်အအုံ/အထပ်)', currentLang)} *
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  1.6 {formatBilingualText('วันที่ขอปฏิบัติงาน', '申请作业日期', 'လုပ်ကိုင်မည့်ရက်စွဲ', currentLang)} *
                </label>
                <input
                  type="date"
                  value={workDate}
                  onChange={(e) => setWorkDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {formatBilingualText('เวลาเริ่ม', '开始时间', 'စတင်ချိန်', currentLang)} *
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {formatBilingualText('เวลาสิ้นสุด', '结束时间', 'ပြီးဆုံးချိန်', currentLang)} *
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: High Risk Selection */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 text-xs flex items-center justify-center font-bold">2</span>
                <span>
                  {formatBilingualText(
                    'ส่วนที่ 2: ประเภทของงานเสี่ยง (เลือกได้มากกว่า 1 ข้อ)',
                    '第二部分：危险作业类型 (可多选)',
                    'အပိုင်း ၂ - အန္တရာယ်ရှိသော အလုပ်အမျိုးအစားများ (တစ်ခုထက်ပို၍ ရွေးနိုင်သည်)',
                    currentLang
                  )}
                </span>
              </h3>
              <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded">
                Selected: {selectedRisks.length}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                {
                  th: 'งานที่ทำให้เกิดความร้อนหรือประกายไฟ (Hot Work)',
                  zh: '动火作业 (Hot Work: 焊接、切割)',
                  my: 'အပူ/မီးပွားထွက်သောအလုပ် (Hot Work)',
                  icon: '🔥',
                },
                {
                  th: 'งานในที่อับอากาศ (Confined Space Work)',
                  zh: '受限空间作业 (Confined Space)',
                  my: 'ကျဉ်းမြောင်းပိတ်လှောင်သောနေရာ (Confined Space)',
                  icon: '📦',
                },
                {
                  th: 'งานบนที่สูง (Working at Heights - สูงเกิน 2 เมตร)',
                  zh: '高处作业 (Working at Heights: 2米以上)',
                  my: 'အမြင့်တွင်လုပ်ကိုင်သောအလုပ် (Heights)',
                  icon: '🧗',
                },
                {
                  th: 'งานเกี่ยวกับระบบไฟฟ้าแรงสูง/อุปกรณ์ไฟฟ้า (Electrical)',
                  zh: '电气与配电柜检修作业 (Electrical)',
                  my: 'လျှပ်စစ်ဆိုင်ရာ အလုပ်များ (Electrical)',
                  icon: '⚡',
                },
                {
                  th: 'งานขุดเจาะหรือรอกยกของหนัก (Excavation & Lifting)',
                  zh: '动土开挖与重型起重吊装 (Excavation & Lifting)',
                  my: 'မြေကျင်းတူးခြင်းနှင့် အလေးမခြင်း (Excavation & Lifting)',
                  icon: '🏗️',
                },
                {
                  th: 'งานสารเคมีอันตราย / วัตถุไวไฟ (Hazardous Chemical)',
                  zh: '危险化学品与易燃物作业 (Hazardous Chemical)',
                  my: 'အန္တရာယ်ရှိသော ဓာတုပစ္စည်း (Hazardous Chemical)',
                  icon: '☣️',
                },
              ].map((item, idx) => {
                const label = formatBilingualText(item.th, item.zh, item.my, currentLang);
                const isChecked = selectedRisks.some(
                  (r) => r.includes(item.th) || r.includes(item.zh) || r.includes(item.my)
                );
                return (
                  <div
                    key={idx}
                    onClick={() => toggleRisk(label)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                      isChecked
                        ? 'bg-amber-50/70 border-amber-400 text-slate-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <div className="font-semibold flex items-center gap-1.5 text-xs text-slate-900">
                        <span>{item.icon}</span>
                        <span>{label}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Confined Space Gas Detector Test Panel */}
            {isConfinedSpace && (
              <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-300 text-xs space-y-3 mt-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-rose-900">
                    <Activity className="w-4 h-4 text-rose-600" />
                    <span>
                      {formatBilingualText(
                        'การตรวจวัดก๊าซในที่อับอากาศ (กฎกระทรวง 2562)',
                        '受限空间四合一气体实测监控 (Gas Monitoring)',
                        'ကျဉ်းမြောင်းပိတ်လှောင်နေရာ ဓာတ်ငွေ့တိုင်းတာချက်',
                        currentLang
                      )}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      isGasSafe
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-rose-200 text-rose-900 border border-rose-400'
                    }`}
                  >
                    {isGasSafe ? '✅ Safe (ปลอดภัย / 安全 / လုံခြုံ)' : '❌ Danger (อันตราย / 严禁入内 / အန္တရာယ်)'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="bg-white p-2.5 rounded-lg border border-rose-200">
                    <span className="block text-[11px] text-slate-500">Oxygen (O2)</span>
                    <span className="text-[10px] text-slate-400">เกณฑ์: 19.5 - 23.5%</span>
                    <input
                      type="text"
                      value={gasO2}
                      onChange={(e) => setGasO2(e.target.value)}
                      className="w-full mt-1 px-2 py-1 bg-slate-50 border rounded text-xs font-bold"
                    />
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-rose-200">
                    <span className="block text-[11px] text-slate-500">Flammable (LEL)</span>
                    <span className="text-[10px] text-slate-400">เกณฑ์: &lt; 10% LEL</span>
                    <input
                      type="text"
                      value={gasLEL}
                      onChange={(e) => setGasLEL(e.target.value)}
                      className="w-full mt-1 px-2 py-1 bg-slate-50 border rounded text-xs font-bold"
                    />
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-rose-200">
                    <span className="block text-[11px] text-slate-500">Carbon Monoxide (CO)</span>
                    <span className="text-[10px] text-slate-400">เกณฑ์: &lt; 25 ppm</span>
                    <input
                      type="text"
                      value={gasCO}
                      onChange={(e) => setGasCO(e.target.value)}
                      className="w-full mt-1 px-2 py-1 bg-slate-50 border rounded text-xs font-bold"
                    />
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-rose-200">
                    <span className="block text-[11px] text-slate-500">Hydrogen Sulfide (H2S)</span>
                    <span className="text-[10px] text-slate-400">เกณฑ์: &lt; 10 ppm</span>
                    <input
                      type="text"
                      value={gasH2S}
                      onChange={(e) => setGasH2S(e.target.value)}
                      className="w-full mt-1 px-2 py-1 bg-slate-50 border rounded text-xs font-bold"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: PPE & Controls */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                <span>
                  {formatBilingualText(
                    'ส่วนที่ 3: มาตรการควบคุมความปลอดภัย & อุปกรณ์ PPE',
                    '第三部分：现场安全防范措施与个人防护用品 (PPE)',
                    'အပိုင်း ၃ - ဘေးအန္တရာယ်ထိန်းချုပ်ရေးနှင့် PPE ပစ္စည်းများ',
                    currentLang
                  )}
                </span>
              </h3>
            </div>

            <div className="space-y-3">
              <label className="font-semibold text-slate-800 text-xs block">
                3.1 {formatBilingualText('อุปกรณ์ PPE ที่ต้องสวมใส่:', '个人防护用品 (PPE) 检查:', 'PPE ပစ္စည်းများ စစ်ဆေးချက် -', currentLang)}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { th: 'หมวกนิรภัย (Safety Helmet)', zh: '安全帽 (Safety Helmet)', my: 'လုံခြုံရေးဦးထုပ် (Safety Helmet)' },
                  { th: 'รองเท้านิรภัยหัวเหล็ก (Safety Shoes)', zh: '钢头安全鞋 (Safety Shoes)', my: 'သံထိပ်ပါဖိနပ် (Safety Shoes)' },
                  { th: 'แว่นตานิรภัย (Safety Glasses)', zh: '护目镜 (Safety Glasses)', my: 'လုံခြုံရေးမျက်မှန် (Safety Glasses)' },
                  { th: 'ถุงมือนิรภัย (Safety Gloves)', zh: '防护手套 (Safety Gloves)', my: 'လုံခြုံရေးလက်အိတ် (Safety Gloves)' },
                  { th: 'เข็มขัดนิรภัยเต็มตัว (Full Body Harness)', zh: '全身式安全带 (Full Body Harness)', my: 'လုံခြုံရေးခါးပတ် (Full Body Harness)' },
                  { th: 'หน้ากากเชื่อม/แว่นตัดแก๊ส (Welding Mask)', zh: '电焊面罩 (Welding Mask)', my: 'ဂဟေဆော်မျက်နှာဖုံး (Welding Mask)' },
                ].map((ppe, idx) => {
                  const label = formatBilingualText(ppe.th, ppe.zh, ppe.my, currentLang);
                  return (
                    <label
                      key={idx}
                      className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 cursor-pointer text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPPE.some((p) => p.includes(ppe.th) || p.includes(ppe.zh))}
                        onChange={() => togglePPE(label)}
                        className="mt-0.5 rounded text-emerald-600"
                      />
                      <span className="text-[11px] font-medium">{label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100">
              <label className="font-semibold text-slate-800 text-xs block">
                3.2 {formatBilingualText('เช็กลิสต์มาตรการความปลอดภัยหน้างาน:', '现场技术与管理防范措施核查:', 'လုံခြုံရေးဆိုင်ရာ စစ်ဆေးချက်များ -', currentLang)}
              </label>
              <div className="space-y-1.5 text-xs">
                {[
                  { th: '[LOTO] ตัดแยกพลังงานและล็อกกุญแจแขวนป้ายเตือน', zh: '[LOTO] 能量隔离上锁挂牌确认完毕', my: '[LOTO] လျှပ်စစ်/စွမ်းအင်ဖြတ်တောက်ပြီး သော့ခတ်ဆိုင်းဘုတ်ချိတ်ဆွဲသည်' },
                  { th: '[Fire Protection] ติดตั้งถังดับเพลิงประจำจุดไม่เกิน 5-10 ม.', zh: '[Fire Protection] 5-10米内配备合格灭火器', my: '[Fire Protection] မီးသတ်ဆေးဘူး ၅-၁၀ မီတာအတွင်း အသင့်ထားရှိသည်' },
                  { th: '[Fire Watcher] จัดให้มีผู้เฝ้าระวังไฟประจำจุดตลอดเวลา', zh: '[Fire Watcher] 动火专职监护人全程在岗', my: '[Fire Watcher] မီးစောင့်ကြည့်သူ တာဝန်ချထားသည်' },
                  { th: '[Fall Protection] จุดยึด Lifeline รับแรง 5,000 ปอนด์', zh: '[Fall Protection] 高处生命线锚点稳固可靠', my: '[Fall Protection] လုံခြုံရေးကြိုးချည်တိုင် ခိုင်ခံ့မှုရှိသည်' },
                  { th: '[Barricade] กั้นเทปเตือนภัยและติดป้ายห้ามเข้า', zh: '[Barricade] 设立红白警戒线与危险警告标牌', my: '[Barricade] အနီ-အဖြူ တိပ်ကြိုးဖြင့် ဧရိယာတားမြစ်ထားသည်' },
                ].map((ctrl, idx) => {
                  const label = formatBilingualText(ctrl.th, ctrl.zh, ctrl.my, currentLang);
                  return (
                    <label
                      key={idx}
                      className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 cursor-pointer text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={selectedControls.some((c) => c.includes(ctrl.th) || c.includes(ctrl.zh))}
                        onChange={() => toggleControl(label)}
                        className="mt-0.5 rounded text-emerald-600"
                      />
                      <span className="text-[11px] font-medium">{label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Safety Officer Permit Card (1 col) */}
        <div className="space-y-6">
          {/* Risk Matrix Assessment Panel */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Risk Matrix 5x5</span>
              </h3>
              <span className="text-xs font-mono font-bold text-slate-700">
                Score: {riskScore}/25
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>{formatBilingualText('โอกาสเกิดเหตุ (Probability):', '发生概率 (Probability):', 'ဖြစ်နိုင်ခြေ (Probability) -', currentLang)}</span>
                  <span className="font-bold text-slate-900">{probability}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={probability}
                  onChange={(e) => setProbability(parseInt(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>{formatBilingualText('ความรุนแรง (Severity):', '后果严重性 (Severity):', 'ပြင်းထန်မှု (Severity) -', currentLang)}</span>
                  <span className="font-bold text-slate-900">{severity}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={severity}
                  onChange={(e) => setSeverity(parseInt(e.target.value))}
                  className="w-full accent-orange-500"
                />
              </div>

              <div className={`p-3 rounded-xl border text-center font-bold text-xs ${getRiskLevel(riskScore).color}`}>
                {getRiskLevel(riskScore).label}
              </div>
            </div>
          </div>

          {/* Section 4: Approval Status Box */}
          <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <UserCheck className="w-5 h-5 text-amber-400" />
              <div>
                <h4 className="font-bold text-sm text-white">
                  {formatBilingualText('ส่วนที่ 4: การอนุมัติของ จป.วิชาชีพ', '第四部分：安全工程师审批', 'အပိုင်း ၄ - လုံခြုံရေးအရာရှိ အတည်ပြုချက်', currentLang)}
                </h4>
                <p className="text-[11px] text-slate-400">Permit Approval Sign-off</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">
                  {formatBilingualText('จป.วิชาชีพ ผู้อนุมัติ:', '审核批准安全员:', 'အတည်ပြုသူ လုံခြုံရေးအရာရှိ -', currentLang)}
                </label>
                <input
                  type="text"
                  value={safetyOfficerName}
                  onChange={(e) => setSafetyOfficerName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-xs focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">
                  {formatBilingualText('ผลการพิจารณาอนุญาต:', '审批决定:', 'ဆုံးဖြတ်ချက် -', currentLang)}
                </label>
                <select
                  value={approvalStatus}
                  onChange={(e) => setApprovalStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-xs focus:ring-1 focus:ring-amber-400"
                >
                  <option value="✅ อนุมัติ (Approved / 准予开工 / အတည်ပြုသည်)">
                    ✅ อนุมัติ (Approved / 准予开工)
                  </option>
                  <option value="⚠️ อนุมัติตามเงื่อนไข (Conditional / 附带条件)">
                    ⚠️ อนุมัติตามเงื่อนไข (Conditional)
                  </option>
                  <option value="❌ ไม่อนุมัติ (Rejected / 不予批准)">
                    ❌ ไม่อนุมัติ (Rejected)
                  </option>
                </select>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 text-[11px] space-y-1 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">ผู้ขออนุญาต:</span>
                  <span className="font-semibold text-white truncate max-w-[130px]">{applicantName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">วันที่:</span>
                  <span className="font-semibold text-amber-300">{workDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">เวลา:</span>
                  <span className="font-semibold text-amber-300">{startTime} - {endTime} น.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">จำนวนคน:</span>
                  <span className="font-semibold text-white">{workerCount} คน</span>
                </div>
              </div>

              <div className="text-center pt-2">
                <span className="text-[11px] text-emerald-400 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  มาตรฐานสากล 3 ภาษา (TH/ZH/MY)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
