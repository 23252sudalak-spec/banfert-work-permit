import { Language } from '../types/permit';

export const UI_TRANSLATIONS: Record<
  string,
  { th: string; zh: string; my: string }
> = {
  appTitle: {
    th: 'ระบบออกแบบและสร้าง Google Form ใบอนุญาตทำงานเสี่ยง (PTW)',
    zh: '危险作业许可 (PTW) Google 表单设计与生成系统',
    my: 'အန္တရာယ်ရှိသောအလုပ်လုပ်ကိုင်ခွင့် (PTW) Google Form စနစ်',
  },
  appSubtitle: {
    th: 'ตามมาตรฐาน จป.วิชาชีพ & พ.ร.บ.ความปลอดภัยฯ 2554',
    zh: '符合专业安全主任标准与泰国安全生产法 2554',
    my: 'လုံခြုံရေးအရာရှိ (จป.วิชาชีพ) စံနှုန်းနှင့် ၂၀၁၁ ခုနှစ် လုပ်ငန်းခွင်ဘေးအန္တရာယ်ကင်းရှင်းရေးဥပဒေအရ',
  },
  tabPermits: {
    th: '📑 รายการใบอนุญาต (Dashboard)',
    zh: '📑 许可证清单与档案',
    my: '📑 ခွင့်ပြုချက်စာရင်း (Dashboard)',
  },
  tabEditor: {
    th: '➕ กรอก/แก้ไขใบอนุญาต',
    zh: '➕ 填报/编辑许可',
    my: '➕ အသစ်ဖြည့်/ပြင်ဆင်ရန်',
  },
  tabSpecs: {
    th: '📋 โครงสร้าง 4 หมวด',
    zh: '📋 表单四大模块结构',
    my: '📋 အပိုင်း ၄ ခု ဖွဲ့စည်းပုံ',
  },
  tabSimulator: {
    th: '🧪 ทดลองกรอกฟอร์ม (Simulator)',
    zh: '🧪 模拟填报系统 (Simulator)',
    my: '🧪 စမ်းသပ်ဖြည့်သွင်းခြင်း (Simulator)',
  },
  tabMatrix: {
    th: '⚖️ Risk Matrix & กฎหมาย',
    zh: '⚖️ 风险矩阵与法规',
    my: '⚖️ Risk Matrix နှင့် ဥပဒေများ',
  },
  tabExport: {
    th: '📤 ส่งออก / Apps Script',
    zh: '📤 导出 / Apps Script 脚本',
    my: '📤 ထုတ်ယူခြင်း / Apps Script',
  },
  createGoogleFormBtn: {
    th: 'สร้างลง Google Forms ทันที',
    zh: '一键生成 Google 表单',
    my: 'Google Forms သို့ချက်ချင်းဖန်တီးပါ',
  },
  copyAllBtn: {
    th: 'คัดลอกโครงสร้างทั้งหมด',
    zh: '复制全部表单结构',
    my: 'ဖွဲ့စည်းပုံအားလုံးကို ကူးယူပါ',
  },
  copiedAllBtn: {
    th: 'คัดลอกทั้งหมดแล้ว!',
    zh: '已复制全部内容！',
    my: 'အားလုံးကိုကူးယူပြီးပါပြီ။',
  },
  signInGoogle: {
    th: 'เข้าสู่ระบบด้วย Google',
    zh: '使用 Google 账号登录',
    my: 'Google ဖြင့် အကောင့်ဝင်ပါ',
  },
  signOut: {
    th: 'ออกจากระบบ',
    zh: '退出登录',
    my: 'အကောင့်ထွက်ပါ',
  },
  searchPlaceholder: {
    th: 'ค้นหาคำถาม เช่น PPE, LOTO, ไฟฟ้า, ก๊าซ...',
    zh: '搜索问题，例如 PPE、LOTO、电气、气体...',
    my: 'မေးခွန်းများကိုရှာပါ ဥပမာ PPE, LOTO, လျှပ်စစ်, ဓာတ်ငွေ့...',
  },
  filterAll: {
    th: 'ทั้งหมด (4 หมวด)',
    zh: '全部模块 (4 部分)',
    my: 'အားလုံး (၄ ပိုင်း)',
  },
  requiredBadge: {
    th: 'จำเป็นต้องตอบ (Required)',
    zh: '必填项 (Required)',
    my: 'မဖြစ်မနေဖြေရမည် (Required)',
  },
  optionalBadge: {
    th: 'ไม่จำเป็น (Optional)',
    zh: '选填项 (Optional)',
    my: 'ရွေးချယ်နိုင်သည် (Optional)',
  },
  copyThisQuestion: {
    th: 'คัดลอกข้อนี้',
    zh: '复制此题',
    my: 'ဤမေးခွန်းကိုကူးယူပါ',
  },
  copied: {
    th: 'คัดลอกแล้ว',
    zh: '已复制',
    my: 'ကူးယူပြီးပါပြီ',
  },
  safetyOfficerTipHeader: {
    th: 'คำแนะนำ จป.วิชาชีพ:',
    zh: '安全工程师指导建议:',
    my: 'လုံခြုံရေးအရာရှိ၏ အကြံပြုချက် -',
  },
  legalReferenceHeader: {
    th: 'กฎหมาย/มาตรฐาน:',
    zh: '法规与标准依据:',
    my: 'ဥပဒေ/စံနှုန်းများ -',
  },
  optionsHeader: {
    th: 'ตัวเลือกใน Google Form:',
    zh: '表单可选项:',
    my: 'Google Form ရွေးချယ်စရာများ -',
  },
  langSelectorLabel: {
    th: 'ภาษาของแบบฟอร์ม:',
    zh: '表单语言:',
    my: 'ဖောင်ဘာသာစကား -',
  },
  langThai: {
    th: '🇹🇭 ภาษาไทย (Thai)',
    zh: '🇹🇭 泰语 (Thai)',
    my: '🇹🇭 ထိုင်းဘာသာ (Thai)',
  },
  langChinese: {
    th: '🇨🇳 ภาษาจีน (中文)',
    zh: '🇨🇳 简体中文 (Chinese)',
    my: '🇨🇳 တရုတ်ဘာသာ (Chinese)',
  },
  langBurmese: {
    th: '🇲🇲 ภาษาพม่า (မြန်မာ)',
    zh: '🇲🇲 缅甸语 (Burmese)',
    my: '🇲🇲 မြန်မာဘာသာ (Burmese)',
  },
  langBilingualThMy: {
    th: '🇹🇭🇲🇲 ไทย + พม่า (TH-MY)',
    zh: '🇹🇭🇲🇲 泰语 + 缅语 (TH-MY)',
    my: '🇹🇭🇲🇲 ထိုင်း + မြန်မာ (TH-MY)',
  },
  langBilingualThZh: {
    th: '🇹🇭🇨🇳 ไทย + จีน (TH-ZH)',
    zh: '🇹🇭🇨🇳 泰语 + 中文 (TH-ZH)',
    my: '🇹🇭🇨🇳 ထိုင်း + တရုတ် (TH-ZH)',
  },
  langTrilingual: {
    th: '🌐 3 ภาษา (ไทย-จีน-พม่า)',
    zh: '🌐 三语对照 (泰-中-缅)',
    my: '🌐 ၃ ဘာသာ (ထိုင်း-တရုတ်-မြန်မာ)',
  },
};

export function getUIText(key: string, lang: Language): string {
  const item = UI_TRANSLATIONS[key];
  if (!item) return key;

  if (lang === 'zh') return item.zh;
  if (lang === 'my') return item.my;
  if (lang === 'bilingual_th_my') return `${item.th} / ${item.my}`;
  if (lang === 'bilingual_th_zh') return `${item.th} / ${item.zh}`;
  if (lang === 'trilingual') return `${item.th} | ${item.zh} | ${item.my}`;
  return item.th;
}

export function formatBilingualText(
  thText: string,
  zhText: string | undefined,
  myText: string | undefined,
  lang: Language
): string {
  if (lang === 'zh') {
    return zhText || thText;
  }
  if (lang === 'my') {
    return myText || thText;
  }
  if (lang === 'bilingual_th_my') {
    if (!myText) return thText;
    return `${thText} / ${myText}`;
  }
  if (lang === 'bilingual_th_zh') {
    if (!zhText) return thText;
    return `${thText} / ${zhText}`;
  }
  if (lang === 'trilingual') {
    const parts = [thText];
    if (zhText) parts.push(zhText);
    if (myText) parts.push(myText);
    return parts.join(' | ');
  }
  return thText;
}
