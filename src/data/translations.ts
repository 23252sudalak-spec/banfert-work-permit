import { Language } from '../types/permit';

export interface TranslationItem {
  th: string;
  zh: string;
  my: string;
}

export const UI_TRANSLATIONS: Record<string, TranslationItem> = {
  // Brand & Header
  appTitle: {
    th: 'ระบบจัดการใบอนุญาตทำงานเสี่ยง (PTW)',
    zh: '高危作业安全许可证管理系统 (PTW)',
    my: 'အန္တရာယ်ရှိသောအလုပ်လုပ်ကိုင်ခွင့် စီမံခန့်ခွဲမှုစနစ် (PTW)',
  },
  appSubtitle: {
    th: 'ตามมาตรฐาน จป.วิชาชีพ & พ.ร.บ.ความปลอดภัย อาชีวอนามัยฯ 2554',
    zh: '符合专业安全主任标准与泰国安全生产法 2554',
    my: 'လုံခြုံရေးအရာရှိ (จป.วิชาชีพ) စံနှုန်းနှင့် ၂၀၁၁ ခုနှစ် လုပ်ငန်းခွင်ဘေးအန္တရာယ်ကင်းရှင်းရေးဥပဒေအရ',
  },
  safetyOfficerBadge: {
    th: 'จป.วิชาชีพ',
    zh: '专业安全官',
    my: 'လုံခြုံရေးအရာရှိ',
  },
  brandDesc: {
    th: 'ระบบจัดการและบันทึกใบอนุญาตทำงานเสี่ยง (PTW Management System)',
    zh: '高风险作业安全许可证管理与填报系统 (PTW)',
    my: 'အန္တရာယ်ရှိသောအလုပ်လုပ်ကိုင်ခွင့် လက်မှတ်စီမံခန့်ခွဲမှုစနစ် (PTW)',
  },

  // Tabs
  tabPermits: {
    th: '📑 รายการใบอนุญาต',
    zh: '📑 许可证列表',
    my: '📑 ခွင့်ပြုချက်စာရင်း',
  },
  tabEditor: {
    th: '➕ กรอก/แก้ไขใบอนุญาต',
    zh: '➕ 填报/编辑许可',
    my: '➕ ဖြည့်/ပြင်ဆင်ရန်',
  },
  tabSpecs: {
    th: '📋 มาตรฐาน 4 หมวด PTW',
    zh: '📋 4大高危规范',
    my: '📋 အန္တရာယ်လုပ်ငန်း ၄ မျိုး',
  },
  tabMatrix: {
    th: '⚖️ Risk Matrix',
    zh: '⚖️ 风险评估矩阵',
    my: '⚖️ Risk Matrix စနစ်',
  },
  tabExport: {
    th: '📤 ส่งออก & พิมพ์',
    zh: '📤 导出与打印',
    my: '📤 ထုတ်ယူ/ပုံနှိပ်',
  },

  // WeChat & QQ Auth & User Profile
  signInWeChat: {
    th: 'เข้าสู่ระบบด้วย WeChat (微信)',
    zh: '微信登录',
    my: 'WeChat ဖြင့် အကောင့်ဝင်ပါ',
  },
  signInWeChatShort: {
    th: 'WeChat',
    zh: '微信登录',
    my: 'WeChat',
  },
  wechatModalTitle: {
    th: 'เข้าใช้งานผ่าน WeChat (微信登录)',
    zh: '微信快捷安全认证登录',
    my: 'WeChat ဖြင့် အကောင့်ဝင်ခြင်း',
  },
  wechatModalDesc: {
    th: 'รองรับการเข้าสู่ระบบด้วย WeChat ID หรือสแกน QR Code สำหรับ จป.วิชาชีพ และผู้รับเหมาในโครงการ',
    zh: '支持微信号与手机微信扫码一键登录，连接安全主任微信',
    my: 'ဆိုက်လုံခြုံရေးအရာရှိနှင့် ကန်ထရိုက်တာများအတွက် WeChat ID သို့မဟုတ် QR စကင်န်ဖြင့် အကောင့်ဝင်ပါ',
  },
  tabWeChatQr: {
    th: '📱 สแกน QR Code ด้วย WeChat',
    zh: '📱 微信扫码登录',
    my: '📱 WeChat QR Code စကင်န်',
  },
  tabWeChatId: {
    th: '💬 เข้าสู่ระบบด้วย WeChat ID',
    zh: '💬 微信号快捷登录',
    my: '💬 WeChat ID ဖြင့် အကောင့်ဝင်ပါ',
  },
  labelWeChatId: {
    th: 'หมายเลข WeChat ID (微信号):',
    zh: '微信号 / 手机号 (WeChat ID):',
    my: 'WeChat ID နံပါတ် -',
  },
  placeholderWeChatId: {
    th: 'เช่น wxid_fsgmwe1ebk7l12 หรือเบอร์โทร',
    zh: '如 wxid_fsgmwe1ebk7l12 或微信号',
    my: 'ဥပမာ wxid_fsgmwe1ebk7l12',
  },
  btnLoginWeChat: {
    th: 'ยืนยันเข้าสู่ระบบ WeChat',
    zh: '立即微信登录',
    my: 'WeChat ဖြင့် အကောင့်ဝင်ပါ',
  },
  wechatFastLoginSafetyOfficer: {
    th: '⚡ เข้าสู่ระบบทันที: จป.วิชาชีพ (wxid_fsgmwe1ebk7l12)',
    zh: '⚡ 快捷一键登录：安全官 (wxid_fsgmwe1ebk7l12)',
    my: '⚡ လုံခြုံရေးအရာရှိအဖြစ် ချက်ချင်းဝင်ပါ (wxid_fsgmwe1ebk7l12)',
  },
  wechatNotifyBellTitle: {
    th: 'แจ้งเตือน WeChat จป. (wxid_fsgmwe1ebk7l12)',
    zh: '微信待审批通知 (wxid_fsgmwe1ebk7l12)',
    my: 'WeChat အသိပေးချက် (wxid_fsgmwe1ebk7l12)',
  },
  wechatNotifyCardHeader: {
    th: '📢 ข้อความแจ้งเตือนขออนุมัติ จป. (WeChat Service Message)',
    zh: '📢 微信待审批服务通知 (模板消息)',
    my: '📢 လုံခြုံရေးအရာရှိထံ အသိပေးချက် (WeChat Service Message)',
  },
  wechatRecipientBadge: {
    th: 'ส่งถึง WeChat จป.วิชาชีพ: wxid_fsgmwe1ebk7l12',
    zh: '接收人安全官微信: wxid_fsgmwe1ebk7l12',
    my: 'လက်ခံသူ လုံခြုံရေးအရာရှိ WeChat: wxid_fsgmwe1ebk7l12',
  },
  wechatCopySuccess: {
    th: 'คัดลอกข้อความ WeChat เรียบร้อยแล้ว!',
    zh: '已成功复制微信卡片消息内容！',
    my: 'WeChat မက်ဆေ့ခ်ျ ကူးယူပြီးပါပြီ!',
  },
  wechatBtnCopy: {
    th: '📋 คัดลอกส่งเข้าแชท WeChat',
    zh: '📋 复制微信通知卡片',
    my: '📋 WeChat တွင် ပို့ရန် ကူးယူပါ',
  },
  wechatBtnOpen: {
    th: '💬 เปิดใน WeChat',
    zh: '💬 打开微信客户端',
    my: '💬 WeChat ဖွင့်ပါ',
  },
  wechatBtnApprove: {
    th: '✅ อนุมัติผ่าน WeChat โดย จป.',
    zh: '✅ 安全主任微信端一键批准',
    my: '✅ လုံခြုံရေးအရာရှိမှ အတည်ပြုပါ',
  },
  wechatToastSent: {
    th: 'ส่งการแจ้งเตือนขออนุมัติไปยัง WeChat ID: wxid_fsgmwe1ebk7l12 แล้ว!',
    zh: '已向安全官微信 (ID: wxid_fsgmwe1ebk7l12) 发送待审批通知！',
    my: 'လုံခြုံရေးအရာရှိ WeChat (ID: wxid_fsgmwe1ebk7l12) သို့ အသိပေးချက် ပေးပို့ပြီးပါပြီ!',
  },
  wechatNoNotif: {
    th: 'ยังไม่มีข้อความแจ้งเตือนใหม่สำหรับ จป. ID: wxid_fsgmwe1ebk7l12',
    zh: '暂无发送给安全官微信 (wxid_fsgmwe1ebk7l12) 的新待审批通知',
    my: 'လုံခြုံရေးအရာရှိ (wxid_fsgmwe1ebk7l12) အတွက် အသိပေးချက်အသစ် မရှိသေးပါ',
  },
  wechatSendTestNotif: {
    th: '🔔 ทดสอบส่งการแจ้งเตือนเข้า wxid_fsgmwe1ebk7l12',
    zh: '🔔 模拟发送审批通知至 wxid_fsgmwe1ebk7l12',
    my: '🔔 wxid_fsgmwe1ebk7l12 သို့ စမ်းသပ်အသိပေးချက် ပေးပို့ပါ',
  },
  signInQQMail: {
    th: 'เข้าสู่ระบบด้วย QQ Mail (จีน)',
    zh: 'QQ 邮箱登录',
    my: 'QQ Mail ဖြင့် အကောင့်ဝင်ပါ',
  },
  signInQQShort: {
    th: 'QQ Mail',
    zh: 'QQ 登录',
    my: 'QQ Mail',
  },
  signOut: {
    th: 'ออกจากระบบ',
    zh: '退出登录',
    my: 'အကောင့်ထွက်ပါ',
  },
  connectedAccount: {
    th: 'บัญชี QQ Mail ที่เข้าสู่ระบบ:',
    zh: '当前登录 QQ 邮箱账号:',
    my: 'လောလောဆယ်ဝင်ထားသော QQ Mail -',
  },
  qqMailModalTitle: {
    th: 'เข้าใช้งานผ่าน QQ Mail ของจีน (Tencent QQ 邮箱)',
    zh: '腾讯 QQ 邮箱安全认证登录',
    my: 'တရုတ်နိုင်ငံ Tencent QQ Mail ဖြင့် အကောင့်ဝင်ခြင်း',
  },
  qqMailModalDesc: {
    th: 'รองรับการเข้าใช้งานด้วยอีเมล @qq.com และ @foxmail.com สำหรับวิศวกรจีนและ จป.วิชาชีพในไซต์งาน',
    zh: '支持 @qq.com 与 @foxmail.com 账号认证，专为中泰工程项目现场工程师与安全官设计',
    my: 'ဆိုက်အင်ဂျင်နီယာနှင့် လုံခြုံရေးအရာရှိများအတွက် @qq.com နှင့် @foxmail.com အကောင့်များ အသုံးပြုနိုင်သည်',
  },
  tabQQPassword: {
    th: '🔑 รหัสผ่าน QQ Mail',
    zh: '🔑 账号密码登录',
    my: '🔑 အကောင့်နှင့် စကားဝှက်',
  },
  tabQQCode: {
    th: '✉️ รหัสยืนยัน OTP (QQ Mail)',
    zh: '✉️ 邮箱验证码登录',
    my: '✉️ အီးမေးလ် OTP ကုဒ်',
  },
  tabQQQrCode: {
    th: '📱 สแกน QR Code (QQ 扫码)',
    zh: '📱 手机 QQ 扫码登录',
    my: '📱 QQ QR Code စကင်န်ဖတ်ခြင်း',
  },
  labelQQEmail: {
    th: 'หมายเลข QQ หรืออีเมล QQ Mail:',
    zh: 'QQ 账号 / 邮箱地址:',
    my: 'QQ နံပါတ် / အီးမေးလ်လိပ်စာ -',
  },
  placeholderQQEmail: {
    th: 'เช่น 238914829 หรือ user@qq.com',
    zh: '请输入 QQ 号或 @qq.com / @foxmail.com',
    my: 'ဥပမာ 238914829 သို့မဟုတ် user@qq.com',
  },
  labelQQPassword: {
    th: 'รหัสผ่าน QQ Mail / รหัสยืนยันตัวตน (授权码):',
    zh: 'QQ 邮箱密码 / 独立授权码:',
    my: 'QQ Mail စကားဝှက် သို့မဟုတ် လုံခြုံရေးကုဒ် -',
  },
  placeholderQQPassword: {
    th: 'กรอกรหัสผ่าน QQ Mail หรือรหัสผ่านอิสระ',
    zh: '请输入 QQ 密码或邮箱授权码',
    my: 'QQ စကားဝှက် ရိုက်ထည့်ပါ',
  },
  labelQQCode: {
    th: 'รหัสยืนยัน 6 หลักที่ส่งไปที่ QQ Mail:',
    zh: '邮箱收到的 6 位数字验证码:',
    my: 'QQ Mail သို့ ပေးပို့သော ဂဏန်း ၆ လုံးကုဒ် -',
  },
  placeholderQQCode: {
    th: 'กรอกรหัส 6 หลัก (เช่น 888888)',
    zh: '请输入 6 位验证码 (如 888888)',
    my: 'ဂဏန်း ၆ လုံးကုဒ် ထည့်ပါ (ဥပမာ 888888)',
  },
  btnGetCode: {
    th: 'ส่งรหัสยืนยัน',
    zh: '获取验证码',
    my: 'ကုဒ်ရယူပါ',
  },
  btnResendCode: {
    th: 'ส่งรหัสใหม่ใน',
    zh: '重新发送',
    my: 'ပြန်လည်ပို့ရန်',
  },
  btnLoginQQ: {
    th: 'ยืนยันเข้าสู่ระบบ QQ Mail',
    zh: '立即登录 QQ 邮箱',
    my: 'QQ Mail ဖြင့် အကောင့်ဝင်ရန် အတည်ပြုပါ',
  },
  quickDemoAccounts: {
    th: 'บัญชีทดสอบด่วนของวิศวกร / จป. (1-Click Demo Accounts):',
    zh: '工程项目与安全官快捷登录账号体验:',
    my: 'စမ်းသပ်အသုံးပြုနိုင်သော အကောင့်များ (1-Click Demo) -',
  },
  scanQrInstruction: {
    th: 'เปิดแอป QQ หรือ Weixin/WeChat บนมือถือแล้วสแกน QR Code นี้เพื่อเข้าใช้งานทันที',
    zh: '请使用手机 QQ 或企业微信扫描下方二维码以安全授权登录',
    my: 'လုံခြုံစွာ အကောင့်ဝင်ရန် ဖုန်း QQ သို့မဟုတ် WeChat ဖြင့် စကင်န်ဖတ်ပါ',
  },
  scanQrSimulateBtn: {
    th: 'จำลองการสแกนผ่านมือถือสำเร็จ',
    zh: '模拟手机端已确认授权',
    my: 'ဖုန်းဖြင့် စကင်န်ဖတ်ပြီး အတည်ပြုသည်ဟု စမ်းသပ်ပါ',
  },
  userProfileHeading: {
    th: 'ข้อมูลโปรไฟล์ผู้ใช้งาน QQ Mail',
    zh: 'QQ 邮箱用户安全认证信息',
    my: 'QQ Mail အသုံးပြုသူ လုံခြုံရေးအချက်အလက်',
  },
  prefillFromQQ: {
    th: 'ดึงข้อมูลจากบัญชี QQ Mail อัตโนมัติ',
    zh: '自动导入当前 QQ 账号信息',
    my: 'လက်ရှိ QQ အကောင့်မှ အချက်အလက်များ ဖြည့်ပါ',
  },
  readyToCreate: {
    th: 'พร้อมสร้าง',
    zh: '就绪',
    my: 'အဆင်သင့်ဖြစ်ပါပြီ',
  },
  selectLanguage: {
    th: 'เลือกภาษา (Language):',
    zh: '选择语言 (Language):',
    my: 'ဘာသာစကားရွေးပါ (Language) -',
  },

  // Dashboard Stats
  totalPermitsStat: {
    th: 'ใบอนุญาตทั้งหมด',
    zh: '全部许可证总数',
    my: 'ခွင့်ပြုချက်အားလုံးပေါင်း',
  },
  totalPermitsSub: {
    th: 'Total Permits',
    zh: '总许可记录',
    my: 'စုစုပေါင်းမှတ်တမ်း',
  },
  pendingReviewStat: {
    th: 'รอการพิจารณาอนุมัติ',
    zh: '待安全主任审批',
    my: 'စစ်ဆေးအတည်ပြုရန် စောင့်ဆိုင်းဆဲ',
  },
  pendingReviewSub: {
    th: 'Pending Review',
    zh: '待审批',
    my: 'စောင့်ဆိုင်းဆဲ',
  },
  approvedActiveStat: {
    th: 'อนุมัติแล้ว / ใช้งานอยู่',
    zh: '已批准 / 作业进行中',
    my: 'ခွင့်ပြုပြီး / လုပ်ငန်းလုပ်ဆောင်ဆဲ',
  },
  approvedActiveSub: {
    th: 'Approved & Active',
    zh: '有效作业中',
    my: 'လက်ရှိလုပ်ကိုင်နေသည်',
  },
  closedPermitStat: {
    th: 'ปิดใบอนุญาตแล้ว',
    zh: '作业已完工验收关闭',
    my: 'လုပ်ငန်းပြီးစီး ပိတ်သိမ်းပြီး',
  },
  closedPermitSub: {
    th: 'Permit Closed',
    zh: '已完工关单',
    my: 'ပိတ်သိမ်းပြီး',
  },

  // Search & Filter Bar
  searchPermitPlaceholder: {
    th: 'ค้นหาตามเลขที่ PTW, ชื่อผู้ขอ, บริษัท, หรือสถานที่...',
    zh: '按许可证编号、申请人姓名、公司或工作地点搜索...',
    my: 'PTW နံပါတ်၊ လျှောက်ထားသူ၊ ကုမ္ပဏီ သို့မဟုတ် နေရာဖြင့် ရှာဖွေပါ...',
  },
  allStatuses: {
    th: 'สถานะทั้งหมด',
    zh: '全部状态',
    my: 'အခြေအနေအားလုံး',
  },
  allRiskTypes: {
    th: 'ประเภทงานทั้งหมด',
    zh: '全部作业类型',
    my: 'အလုပ်အမျိုးအစားအားလုံး',
  },
  createNewPermitBtn: {
    th: 'กรอกใบขออนุญาตใหม่',
    zh: '填报新作业许可',
    my: 'ခွင့်ပြုချက်အသစ်ဖြည့်ပါ',
  },
  viewModeTable: {
    th: 'ตาราง',
    zh: '表格',
    my: 'ဇယား',
  },
  viewModeGrid: {
    th: 'การ์ด',
    zh: '卡片',
    my: 'ကတ်များ',
  },
  mainHeroTag: {
    th: 'มาตรฐาน จป.วิชาชีพ & พ.ร.บ.ความปลอดภัย 2554',
    zh: '泰国安全法 2554 · 注册安全工程师标准',
    my: '၂၀၁၁ ခုနှစ် လုပ်ငန်းခွင်ဘေးအန္တရာယ်ကင်းရှင်းရေးဥပဒေ',
  },
  mainHeroTitle: {
    th: 'ศูนย์ควบคุมใบอนุญาตทำงานเสี่ยง (PTW)',
    zh: '高危作业安全许可证管理控制台',
    my: 'လုပ်ငန်းခွင် အန္တရာယ်ခွင့်ပြုချက် ထိန်းချုပ်ရေးစနစ်',
  },
  mainHeroDesc: {
    th: 'กำกับดูแลและอนุมัติงานเสี่ยงตามกฎหมาย พร้อมระบบแจ้งเตือน จป.วิชาชีพ ผ่าน WeChat อัตโนมัติ',
    zh: '合规跟踪、审查与审批高危作业许可，实时连接安全官微信待审批通知',
    my: 'အန္တရာယ်ရှိသောအလုပ်များကို စောင့်ကြည့်စစ်ဆေးအတည်ပြုပြီး WeChat သို့ အသိပေးချက် ပေးပို့ပါ',
  },
  filteredResultsCount: {
    th: 'แสดง',
    zh: '显示',
    my: 'ပြသမှု',
  },
  itemsUnit: {
    th: 'รายการ',
    zh: '条',
    my: 'ခု',
  },
  clearFilters: {
    th: 'ล้างตัวกรอง',
    zh: '重置筛选',
    my: 'စစ်ထုတ်မှုရှင်းပါ',
  },

  // Status Badges
  statusApproved: {
    th: 'อนุมัติแล้ว (Approved)',
    zh: '已批准 (Approved)',
    my: 'အတည်ပြုပြီး (Approved)',
  },
  statusPending: {
    th: 'รออนุมัติ (Pending)',
    zh: '待审批 (Pending)',
    my: 'စောင့်ဆိုင်းဆဲ (Pending)',
  },
  statusConditional: {
    th: 'อนุมัติตามเงื่อนไข',
    zh: '附条件批准 (Conditional)',
    my: 'သတ်မှတ်ချက်ဖြင့် ခွင့်ပြုသည်',
  },
  statusActive: {
    th: 'กำลังปฏิบัติงาน (Active)',
    zh: '作业进行中 (Active)',
    my: 'လုပ်ကိုင်နေဆဲ (Active)',
  },
  statusClosed: {
    th: 'ปิดงานแล้ว (Closed)',
    zh: '已闭环关单 (Closed)',
    my: 'ပိတ်သိမ်းပြီး (Closed)',
  },
  statusRejected: {
    th: 'ไม่อนุมัติ (Rejected)',
    zh: '已驳回 (Rejected)',
    my: 'ငြင်းပယ်သည် (Rejected)',
  },
  statusDraft: {
    th: 'ฉบับร่าง (Draft)',
    zh: '草稿 (Draft)',
    my: 'မူကြမ်း (Draft)',
  },

  // Table Columns
  colPermitNoDate: {
    th: 'เลขที่ / วันที่',
    zh: '编号 / 日期',
    my: 'နံပါတ် / နေ့စွဲ',
  },
  colApplicantCompany: {
    th: 'ผู้ขออนุญาต & บริษัท',
    zh: '申请人 & 施工单位',
    my: 'လျှောက်ထားသူ & ကုမ္ပဏီ',
  },
  colLocationWork: {
    th: 'สถานที่ & ลักษณะงาน',
    zh: '作业地点 & 工作内容',
    my: 'နေရာ & အလုပ်အကြောင်းအရာ',
  },
  colRiskTypes: {
    th: 'ประเภทงานเสี่ยง',
    zh: '高风险作业类型',
    my: 'အန္တရာယ်ရှိသော အလုပ်အမျိုးအစား',
  },
  colStatus: {
    th: 'สถานะ',
    zh: '审批状态',
    my: 'အခြေအနေ',
  },
  colActions: {
    th: 'การจัดการ',
    zh: '操作',
    my: 'စီမံခန့်ခွဲမှု',
  },
  approverLabel: {
    th: 'ผู้อนุมัติ:',
    zh: '审批人:',
    my: 'အတည်ပြုသူ -',
  },
  personsCount: {
    th: 'คน',
    zh: '人',
    my: 'ဦး',
  },

  // Table Actions
  actionViewPrint: {
    th: 'ดูรายละเอียดและพิมพ์ใบอนุญาต',
    zh: '查看详情并打印许可',
    my: 'အသေးစိတ်ကြည့်ရှုပြီး ပရင့်ထုတ်ပါ',
  },
  actionEdit: {
    th: 'แก้ไขข้อมูลใบอนุญาต',
    zh: '编辑许可证信息',
    my: 'အချက်အလက်များကို ပြင်ဆင်ပါ',
  },
  actionQuickApprove: {
    th: 'อนุมัติใบอนุญาตทันที',
    zh: '一键批准此许可',
    my: 'ချက်ချင်း အတည်ပြုပါ',
  },
  actionQuickClose: {
    th: 'ปิดใบอนุญาตเมื่อเสร็จงาน',
    zh: '完工闭环关单',
    my: 'လုပ်ငန်းပြီးဆုံး၍ ပိတ်သိမ်းပါ',
  },
  actionDelete: {
    th: 'ลบใบอนุญาตนี้',
    zh: '删除此许可证',
    my: 'ဤခွင့်ပြုချက်ကို ဖျက်ပါ',
  },
  confirmDelete: {
    th: 'ลบจริง',
    zh: '确认删除',
    my: 'ဖျက်မည်',
  },
  cancelDelete: {
    th: 'ไม่',
    zh: '取消',
    my: 'မဖျက်ပါ',
  },

  // Empty state
  emptyPermitsTitle: {
    th: 'ไม่พบข้อมูลใบอนุญาตทำงาน',
    zh: '未找到作业许可证记录',
    my: 'လုပ်ငန်းခွင့်ပြုချက် မှတ်တမ်းမရှိပါ',
  },
  emptyPermitsDesc: {
    th: 'ไม่พบรายการที่ตรงกับเงื่อนไขการค้นหา สามารถกดเพิ่มใบอนุญาตใหม่ได้ทันที',
    zh: '没有符合条件的记录，您可以立即点击下方按钮创建新的作业许可证。',
    my: 'ရှာဖွေမှုနှင့် ကိုက်ညီသော မှတ်တမ်းမရှိပါ။ အသစ်ဖန်တီးနိုင်ပါသည်။',
  },
  emptyPermitsCreateBtn: {
    th: '+ กรอกใบอนุญาตฉบับใหม่',
    zh: '+ 立即填报新许可证',
    my: '+ အသစ်တစ်ခု ဖြည့်သွင်းပါ',
  },

  // Editor Header & Controls
  backToList: {
    th: 'กลับไปหน้ารายการ',
    zh: '返回许可证列表',
    my: 'စာရင်းသို့ ပြန်သွားရန်',
  },
  permitFormHeader: {
    th: 'แบบฟอร์มขออนุญาตเข้าปฏิบัติงานที่มีความเสี่ยง (Permit to Work)',
    zh: '危险作业安全许可申请与审批表 (Permit to Work)',
    my: 'အန္တရာယ်ရှိသောအလုပ်လုပ်ကိုင်ခွင့် လျှောက်လွှာဖောင် (Permit to Work)',
  },
  btnSaveDraft: {
    th: 'บันทึกฉบับร่าง',
    zh: '保存草稿',
    my: 'မူကြမ်းသိမ်းပါ',
  },
  btnSubmitReview: {
    th: 'ส่งขออนุมัติ จป.',
    zh: '提交安全主任审批',
    my: 'လုံခြုံရေးအရာရှိထံ တင်ပြပါ',
  },
  btnApprovePermit: {
    th: 'อนุมัติใบอนุญาต (จป.)',
    zh: '安全主任批准签署',
    my: 'ခွင့်ပြုချက် အတည်ပြုပါ',
  },
  btnPrintPermit: {
    th: 'พิมพ์ใบอนุญาต',
    zh: '打印许可证',
    my: 'ပရင့်ထုတ်ပါ',
  },
  saveSuccessAlert: {
    th: 'บันทึกข้อมูลใบอนุญาตเรียบร้อยแล้ว! ข้อมูลถูกอัปเดตลงระบบทันที',
    zh: '作业许可证已成功保存！数据已即时更新至本地数据库。',
    my: 'ခွင့်ပြုချက်အချက်အလက်များကို အောင်မြင်စွာ သိမ်းဆည်းပြီးပါပြီ။',
  },

  // Editor Section Tabs
  secTab1: {
    th: 'ส่วนที่ 1: ข้อมูลทั่วไป',
    zh: '第 1 部分：通用基本信息',
    my: 'အပိုင်း ၁ - အထွေထွေအချက်အလက်',
  },
  secTab2: {
    th: 'ส่วนที่ 2: ประเภทงานเสี่ยง',
    zh: '第 2 部分：高危作业类别',
    my: 'အပိုင်း ၂ - အန္တရာယ်ရှိသောအလုပ်အမျိုးအစား',
  },
  secTab3: {
    th: 'ส่วนที่ 3: รายละเอียด & PPE',
    zh: '第 3 部分：作业详情与防护',
    my: 'အပိုင်း ၃ - အသေးစိတ် & PPE',
  },
  secTab4: {
    th: 'ส่วนที่ 4: การอนุมัติ จป.',
    zh: '第 4 部分：安全审批与签署',
    my: 'အပိုင်း ၄ - လုံခြုံရေးအရာရှိ အတည်ပြုချက်',
  },

  // Section 1 Labels & Placeholders
  sec1Title: {
    th: 'ส่วนที่ 1: ข้อมูลทั่วไปของการขออนุญาต (General Information)',
    zh: '第 1 部分：申请通用基本信息 (General Information)',
    my: 'အပိုင်း ၁ - အထွေထွေလျှောက်ထားမှုအချက်အလက် (General Information)',
  },
  requiredNote: {
    th: '* จำเป็นต้องตอบ',
    zh: '* 必填项目',
    my: '* မဖြစ်မနေဖြည့်ရမည်',
  },
  labelApplicantName: {
    th: '1.1 ชื่อ-นามสกุล ผู้ขออนุญาต / ผู้ควบคุมงาน *',
    zh: '1.1 申请人 / 现场施工负责人姓名 *',
    my: '၁.၁ လျှောက်ထားသူ / တာဝန်ခံ အမည် *',
  },
  placeholderApplicantName: {
    th: 'เช่น นายสมชาย ปลอดภัยดี',
    zh: '例如：张伟（现场负责人）',
    my: 'ဥပမာ - ဦးမောင်မောင် (လုပ်ငန်းခွင်တာဝန်ခံ)',
  },
  labelApplicantRole: {
    th: '1.2 ตำแหน่ง / บทบาทความรับผิดชอบ *',
    zh: '1.2 职务 / 岗位职责角色 *',
    my: '၁.၂ ရာထူး / တာဝန် *',
  },
  roleEngineer: {
    th: 'วิศวกรผู้ควบคุมงาน (Site Engineer / Project Engineer)',
    zh: '现场/项目工程师 (Site Engineer / Project Engineer)',
    my: 'လုပ်ငန်းခွင်အင်ဂျင်နီယာ (Site Engineer)',
  },
  roleForeman: {
    th: 'หัวหน้างาน / โฟร์แมนผู้รับเหมา (Site Supervisor / Foreman)',
    zh: '施工主管 / 工长工段长 (Site Supervisor / Foreman)',
    my: 'လုပ်ငန်းခွင်ကြီးကြပ်သူ / ဖိုမင် (Foreman)',
  },
  roleSafety: {
    th: 'เจ้าหน้าที่ความปลอดภัยในการทำงาน (Safety Officer)',
    zh: '现场专职安全员 (Safety Officer)',
    my: 'လုံခြုံရေးအရာရှိ (Safety Officer)',
  },
  roleMaintenance: {
    th: 'พนักงานประจำ / ช่างซ่อมบำรุงภายในบริษัท (In-house Maintenance)',
    zh: '内部机修/维保检修人员 (In-house Maintenance)',
    my: 'ကုမ္ပဏီတွင်း ပြုပြင်ထိန်းသိမ်းရေးဝန်ထမ်း (Maintenance)',
  },
  roleOther: {
    th: 'อื่นๆ',
    zh: '其他职务',
    my: 'အခြား',
  },
  labelCompany: {
    th: '1.3 ชื่อบริษัท / หน่วยงาน / ผู้รับเหมา *',
    zh: '1.3 公司名称 / 施工承包商名称 *',
    my: '၁.၃ ကုမ္ပဏီ / ကန်ထရိုက်တာ အမည် *',
  },
  placeholderCompany: {
    th: 'เช่น บริษัท สยามเซฟตี้ คอนสตรัคชั่น จำกัด',
    zh: '例如：中泰建设工程承包有限公司',
    my: 'ဥပမာ - မြန်မာဆောက်လုပ်ရေးကုမ္ပဏီ လီမိတက်',
  },
  labelPhone: {
    th: '1.4 เบอร์โทรศัพท์ฉุกเฉิน (24 ชม.) *',
    zh: '1.4 现场 24 小时应急联络电话 *',
    my: '၁.၄ အရေးပေါ်ဆက်သွယ်ရန် ဖုန်းနံပါတ် (၂၄ နာရီ) *',
  },
  placeholderPhone: {
    th: 'เช่น 081-999-8888',
    zh: '例如：081-999-8888',
    my: 'ဥပမာ - 081-999-8888',
  },
  labelLocation: {
    th: '1.5 สถานที่ปฏิบัติงาน (ระบุพื้นที่ / อาคาร / ชั้น / หมายเลขเครื่องจักร) *',
    zh: '1.5 施工具体位置（区域/建筑楼宇/楼层/设备编号）*',
    my: '၁.၅ လုပ်ငန်းခွင်နေရာ (ဧရိယာ / အဆောက်အဦ / အထပ် / စက်နံပါတ်) *',
  },
  placeholderLocation: {
    th: 'เช่น อาคารผลิต 2 ชั้น 3 บริเวณหม้อต้มไอน้ำ (Boiler Area)',
    zh: '例如：2号厂房3层 锅炉与蒸汽管道区',
    my: 'ဥပမာ - အမှတ် ၂ စက်ရုံ၊ ၃ ထပ်၊ ဘွိုင်လာဧရိယာ',
  },
  labelWorkDate: {
    th: '1.6 วันที่ขอเข้าปฏิบัติงาน *',
    zh: '1.6 申请作业日期 *',
    my: '၁.၆ အလုပ်လုပ်ကိုင်မည့် နေ့စွဲ *',
  },
  labelStartTime: {
    th: 'เวลาเริ่ม *',
    zh: '开始时间 *',
    my: 'စတင်ချိန် *',
  },
  labelEndTime: {
    th: 'เวลาสิ้นสุด *',
    zh: '结束时间 *',
    my: 'ပြီးဆုံးချိန် *',
  },
  labelWorkerCount: {
    th: '1.7 จำนวนผู้ปฏิบัติงานทั้งหมดในพื้นที่ (คน) *',
    zh: '1.7 现场作业总人数 (人) *',
    my: '၁.၇ စုစုပေါင်း လုပ်သားဦးရေ (ဦး) *',
  },
  btnNextToSec2: {
    th: 'ถัดไป: เลือกประเภทงานเสี่ยง (ส่วนที่ 2) ➔',
    zh: '下一步：选择高危作业类别 (第 2 部分) ➔',
    my: 'နောက်တစ်ခု - အန္တရာယ်ရှိသောအလုပ် ရွေးချယ်ပါ (အပိုင်း ၂) ➔',
  },

  // Section 2: High Risk
  sec2Title: {
    th: 'ส่วนที่ 2: ประเภทของงานเสี่ยง (Type of High-Risk Work)',
    zh: '第 2 部分：高危险性作业类别 (Type of High-Risk Work)',
    my: 'အပိုင်း ၂ - အန္တရာယ်ရှိသောအလုပ်အမျိုးအစား (Type of High-Risk Work)',
  },
  sec2Subtitle: {
    th: 'โปรดเลือกประเภทงานเสี่ยงที่เกี่ยวข้องกับการทำงานครั้งนี้ (สามารถเลือกได้มากกว่า 1 ข้อ)',
    zh: '请勾选本次作业涉及的所有高危作业类别（可多选）',
    my: 'ဤလုပ်ငန်းတွင် ပါဝင်သော အန္တရာယ်ရှိသောအလုပ်များကို ရွေးချယ်ပါ (တစ်ခုထက်ပို၍ ရွေးနိုင်သည်)',
  },
  selectedCountBadge: {
    th: 'เลือกแล้ว {count} ประเภท',
    zh: '已选择 {count} 个类别',
    my: '{count} မျိုး ရွေးချယ်ပြီး',
  },
  otherRiskLabel: {
    th: 'กรณีมีงานเสี่ยงอื่นเพิ่มเติม (ระบุ):',
    zh: '其他补充的高危作业情况（如有请注明）：',
    my: 'အခြားအန္တရာယ်ရှိသောအလုပ်များ (ဖော်ပြပါ) -',
  },
  otherRiskPlaceholder: {
    th: 'เช่น งานรังสี NDT, งานใต้น้ำ, งานในห้องเย็นจัด',
    zh: '例如：无损探伤辐射作业、水下作业、超低温作业',
    my: 'ဥပမာ - ဓာတ်ရောင်ခြည်စစ်ဆေးခြင်း၊ ရေအောက်အလုပ်၊ အအေးခန်းအလုပ်',
  },
  btnBack: {
    th: '⬅ ย้อนกลับ',
    zh: '⬅ 返回上一步',
    my: '⬅ နောက်သို့',
  },
  btnNextToSec3: {
    th: 'ถัดไป: เช็กลิสต์ PPE & มาตรการความปลอดภัย (ส่วนที่ 3) ➔',
    zh: '下一步：个人防护 PPE 与安全控制措施 (第 3 部分) ➔',
    my: 'နောက်တစ်ခု - PPE နှင့် လုံခြုံရေးစစ်ဆေးချက် (အပိုင်း ၃) ➔',
  },

  // Section 3: Job Details, PPE & Safety Controls
  sec3Title: {
    th: 'ส่วนที่ 3: รายละเอียดงานและมาตรการควบคุมความปลอดภัย (Safety Controls)',
    zh: '第 3 部分：作业详情、个人防护 (PPE) 与工程控制措施',
    my: 'အပိုင်း ၃ - အလုပ်အသေးစိတ်နှင့် လုံခြုံရေးထိန်းချုပ်မှုများ (Safety Controls)',
  },
  labelJobDesc: {
    th: '3.1 คำอธิบายรายละเอียดงานโดยสรุป และขั้นตอนการทำงาน (JSA) *',
    zh: '3.1 作业步骤概述与安全工作危害分析 (JSA) *',
    my: '၃.၁ အလုပ်အကျဉ်းချုပ်နှင့် ဘေးအန္တရာယ်ခွဲခြမ်းစိတ်ဖြာမှု အဆင့်များ (JSA) *',
  },
  placeholderJobDesc: {
    th: 'ระบุว่าต้องทำอะไร ใช้เครื่องมืออะไรบ้าง และมีขั้นตอนการทำงานอย่างไร...',
    zh: '简述施工内容、使用何种施工机械工器具及关键安全工序...',
    my: 'မည်သည့်အလုပ်လုပ်မည်၊ မည်သည့်ကိရိယာများသုံးမည်နှင့် အဆင့်များကို ဖော်ပြပါ...',
  },
  labelWorkerRoster: {
    th: '3.2 รายชื่อผู้ปฏิบัติงานทั้งหมด และคุณสมบัติ/ใบอนุญาตเฉพาะทาง',
    zh: '3.2 作业人员名单及特种作业操作证信息',
    my: '၃.၂ လုပ်သားများစာရင်းနှင့် အထူးလိုင်စင်/လက်မှတ်များ',
  },
  placeholderWorkerRoster: {
    th: '1. ชื่อ-สกุล (ตำแหน่ง/ใบเซอร์)\n2. ชื่อ-สกุล (ตำแหน่ง/ใบเซอร์)',
    zh: '1. 姓名 (特种焊工证号/高处证)\n2. 姓名 (监护员证/电工证)',
    my: '၁။ အမည် (ရာထူး/လက်မှတ်)\n၂။ အမည် (ရာထူး/လက်မှတ်)',
  },
  gasMeasurementHeader: {
    th: 'ผลการตรวจวัดก๊าซในที่อับอากาศ (กฎกระทรวง พ.ศ. 2562)',
    zh: '有限空间气体检测读数 (泰国 2562 年受限空间安全法规)',
    my: 'ကျဉ်းကျပ်သောနေရာ ဓာတ်ငွေ့တိုင်းတာမှုရလဒ် (၂၀၁၉ ဥပဒေအရ)',
  },
  gasSafeBadge: {
    th: '✅ บรรยากาศปลอดภัย อนุญาตเข้าทำงานได้',
    zh: '✅ 气体检测合格，准许进入作业',
    my: '✅ လေထုဘေးကင်းပါသည်၊ ဝင်ရောက်လုပ်ကိုင်နိုင်သည်',
  },
  gasUnsafeBadge: {
    th: '❌ บรรยากาศอันตราย ห้ามเข้าเด็ดขาด!',
    zh: '❌ 气体超标极其危险，严禁进入！',
    my: '❌ အန္တရာယ်ရှိသောလေထု! လုံးဝမဝင်ရ!',
  },
  labelPPESection: {
    th: '3.3 อุปกรณ์ป้องกันอันตรายส่วนบุคคล (PPE) ที่ต้องสวมใส่:',
    zh: '3.3 现场必须佩戴穿戴的个人防护装备 (PPE)：',
    my: '၃.၃ မဖြစ်မနေ ဝတ်ဆင်ရမည့် တစ်ကိုယ်ရည်ကာကွယ်ရေးပစ္စည်းများ (PPE) -',
  },
  labelControlsSection: {
    th: '3.4 มาตรการควบคุมความปลอดภัยหน้างาน (Engineering & Administrative Controls):',
    zh: '3.4 现场工程与管理安全控制措施清单 (Checklist)：',
    my: '၃.၄ လုပ်ငန်းခွင် လုံခြုံရေးထိန်းချုပ်မှု အစီအမံများ (Checklist) -',
  },
  btnNextToSec4: {
    th: 'ถัดไป: การอนุมัติและลงนาม (ส่วนที่ 4) ➔',
    zh: '下一步：安全承诺签署与批准 (第 4 部分) ➔',
    my: 'နောက်တစ်ခု - အတည်ပြုလက်မှတ်ရေးထိုးခြင်း (အပိုင်း ၄) ➔',
  },

  // Section 4: Approvals & Sign-off
  sec4Title: {
    th: 'ส่วนที่ 4: การอนุมัติและการรับรองความปลอดภัย (Approvals & Sign-off)',
    zh: '第 4 部分：安全合规签署与批准签发 (Approvals & Sign-off)',
    my: 'အပိုင်း ၄ - လုံခြုံရေးအတည်ပြုချက်နှင့် လက်မှတ်ရေးထိုးခြင်း',
  },
  complianceStatement: {
    th: 'ข้าพเจ้ารับรองว่าข้อมูลทั้งหมดเป็นความจริง และได้จัดเตรียมมาตรการควบคุมความปลอดภัยครบถ้วนตามมาตรฐาน หากตรวจพบว่ามีการละเมิดหรือสภาพงานไม่ปลอดภัย ข้าพเจ้ายินยอมให้สั่งระงับงานทันทีโดยไม่มีข้อโต้แย้ง',
    zh: '本人郑重承诺所填报信息全部真实无误，已在现场严格落实各项安全技术交底与防护措施。如发现违反安全规程或存在隐患，本人完全同意立即停工整改，并承担相应责任。',
    my: 'ဖော်ပြပါအချက်အလက်များအားလုံး မှန်ကန်ကြောင်းနှင့် ဘေးအန္တရာယ်ကင်းရှင်းရေး အစီအမံများကို ပြည့်စုံစွာ ပြင်ဆင်ထားကြောင်း အာမခံပါသည်။ စည်းကမ်းဖောက်ဖျက်ပါက ချက်ချင်း လုပ်ငန်းရပ်ဆိုင်းခြင်းကို သဘောတူပါသည်။',
  },
  labelApplicantSig: {
    th: '4.2 ลายมือชื่ออิเล็กทรอนิกส์ผู้ขออนุญาต *',
    zh: '4.2 申请人 / 施工负责人电子签名 *',
    my: '၄.၂ လျှောက်ထားသူ၏ အီလက်ထရောနစ်လက်မှတ် *',
  },
  placeholderApplicantSig: {
    th: 'พิมพ์ชื่อ-สกุลจริงเพื่อลงนาม',
    zh: '在此输入实名完成电子签署',
    my: 'လက်မှတ်ရေးထိုးရန် အမည်အပြည့်အစုံ ရိုက်ထည့်ပါ',
  },
  labelSafetyOfficerName: {
    th: '4.3 ชื่อ-สกุล จป.วิชาชีพ หรือ ผู้จัดการพื้นที่ผู้อนุมัติ',
    zh: '4.3 审批专职安全主任 / 属地主管姓名',
    my: '၄.၃ လုံခြုံရေးအရာရှိ သို့မဟုတ် ဧရိယာမန်နေဂျာ အမည်',
  },
  placeholderSafetyOfficerName: {
    th: 'เช่น นายวิชาญ มั่นคง (จป.วิชาชีพ)',
    zh: '例如：李明（注册安全工程师）',
    my: 'ဥပမာ - ဦးအောင်မင်း (လုံခြုံရေးအရာရှိ)',
  },
  labelPermitDecision: {
    th: '4.4 ผลการพิจารณาอนุญาต (Permit Decision)',
    zh: '4.4 审核批准决定 (Permit Decision)',
    my: '၄.၄ ခွင့်ပြုချက် ဆုံးဖြတ်ချက် (Permit Decision)',
  },
  decisionPending: {
    th: '⏳ อยู่ระหว่างรอพิจารณา (Pending Approval)',
    zh: '⏳ 待审核评估中 (Pending Approval)',
    my: '⏳ စစ်ဆေးရန် စောင့်ဆိုင်းဆဲ (Pending)',
  },
  decisionApproved: {
    th: '✅ อนุมัติให้ทำงานได้ (Approved)',
    zh: '✅ 批准作业许可 (Approved)',
    my: '✅ အလုပ်လုပ်ရန် အတည်ပြုသည် (Approved)',
  },
  decisionConditional: {
    th: '⚠️ อนุมัติตามเงื่อนไข (Conditional Approval)',
    zh: '⚠️ 附条件有限批准 (Conditional Approval)',
    my: '⚠️ သတ်မှတ်ချက်ဖြင့် ခွင့်ပြုသည် (Conditional)',
  },
  decisionRejected: {
    th: '❌ ไม่อนุมัติ / สั่งแก้ไข (Rejected)',
    zh: '❌ 驳回并责令整改 (Rejected)',
    my: '❌ ခွင့်မပြုပါ / ပြန်လည်ပြင်ဆင်ရန် (Rejected)',
  },
  labelRemarks: {
    th: '4.5 ข้อสั่งการพิเศษ / เงื่อนไขความปลอดภัยเพิ่มเติมของ จป.วิชาชีพ',
    zh: '4.5 安全主任批示意见 / 现场附加控制要求',
    my: '၄.၅ လုံခြုံရေးအရာရှိ၏ အထူးညွှန်ကြားချက်များနှင့် သတ်မှတ်ချက်များ',
  },
  placeholderRemarks: {
    th: 'ระบุเงื่อนไข เช่น ต้องหยุดงานหากมีฝนตก, ต้องวัดก๊าซซ้ำทุก 2 ชั่วโมง...',
    zh: '例如：如遇降雨严禁室外高处作业；受限空间必须每2小时复测气体一次...',
    my: 'ဥပမာ - မိုးရွာပါက အမြင့်တွင် အလုပ်မလုပ်ရ၊ ၂ နာရီတစ်ကြိမ် ဓာတ်ငွေ့ပြန်တိုင်းရမည်...',
  },
  labelAttachmentLink: {
    th: '4.6 ลิงก์เอกสารแนบ (แผนงาน JSA / ใบเซอร์นั่งร้าน / ภาพถ่ายหน้างาน)',
    zh: '4.6 附件网盘链接 (JSA分析表/登高证/特种作业检定单)',
    my: '၄.၆ ပူးတွဲဖိုင်လင့်ခ် (JSA အစီအစဉ် / လက်မှတ်များ / ဓာတ်ပုံများ)',
  },
  placeholderAttachmentLink: {
    th: 'วาง Google Drive URL หรือลิงก์แฟ้มเอกสาร...',
    zh: '粘贴 Google Drive 或在线网盘共享链接...',
    my: 'Google Drive လင့်ခ် ထည့်သွင်းပါ...',
  },

  // Risk Matrix Assessment Card inside Editor
  riskMatrixTitle: {
    th: 'การประเมินระดับความเสี่ยง (5x5 Risk Matrix Score):',
    zh: '作业风险评级 (5×5 风险矩阵评估)：',
    my: 'အန္တရာယ်အဆင့် သတ်မှတ်ချက် (5x5 Risk Matrix) -',
  },
  labelProbability: {
    th: 'โอกาสเกิด (Probability):',
    zh: '发生可能性 (Probability):',
    my: 'ဖြစ်နိုင်ခြေ (Probability) -',
  },
  labelSeverity: {
    th: 'ความรุนแรง (Severity):',
    zh: '后果严重度 (Severity):',
    my: 'ဆိုးရွားမှု (Severity) -',
  },
  riskLevelLow: {
    th: 'ความเสี่ยงต่ำ (Low Risk)',
    zh: '低风险 (Low Risk)',
    my: 'အန္တရာယ်နည်း (Low)',
  },
  riskLevelMed: {
    th: 'ความเสี่ยงปานกลาง (Medium Risk)',
    zh: '中度风险 (Medium Risk)',
    my: 'အလယ်အလတ်အန္တရာယ် (Medium)',
  },
  riskLevelHigh: {
    th: 'ความเสี่ยงสูง (High Risk)',
    zh: '高度风险 (High Risk)',
    my: 'အန္တရာယ်များ (High)',
  },
  riskLevelExtreme: {
    th: 'ความเสี่ยงขั้นวิกฤต (Extreme Risk)',
    zh: '重大/极高风险 (Extreme Risk)',
    my: 'အထူးအန္တရာယ်များ (Extreme)',
  },

  // Printable Document Modal Labels
  printModalTitle: {
    th: 'ใบอนุญาตปฏิบัติงานที่มีความเสี่ยง (Permit to Work)',
    zh: '危险作业许可证 (Permit to Work)',
    my: 'အန္တရာယ်ရှိသောအလုပ်လုပ်ကိုင်ခွင့် (Permit to Work)',
  },
  printDocHeading: {
    th: 'ใบอนุญาตปฏิบัติงานที่มีความเสี่ยงสูง',
    zh: '高危险性作业安全许可证 (PTW)',
    my: 'အန္တရာယ်ရှိသောအလုပ်လုပ်ကိုင်ခွင့် လက်မှတ်',
  },
  docApplicantInfo: {
    th: '1. ข้อมูลผู้ขออนุญาต (Applicant Info):',
    zh: '1. 申请人与施工队伍信息 (Applicant Info):',
    my: '၁။ လျှောက်ထားသူနှင့် ကုမ္ပဏီအချက်အလက် -',
  },
  docScheduleLocation: {
    th: '2. วันเวลาและสถานที่ (Work Schedule & Area):',
    zh: '2. 作业时间与区域 (Schedule & Area):',
    my: '၂။ အချိန်နှင့် လုပ်ငန်းခွင်နေရာ -',
  },
  docHighRiskActivities: {
    th: '3. ประเภทของงานเสี่ยง (High-Risk Activities):',
    zh: '3. 涉及高危作业项目 (High-Risk Activities):',
    my: '၃။ အန္တရာယ်ရှိသောအလုပ်များ -',
  },
  docJobDetailsRoster: {
    th: '4. รายละเอียดงาน และรายชื่อผู้ปฏิบัติงาน (Job Description & Crew):',
    zh: '4. 作业简述与施工作业人员名单 (Job & Crew):',
    my: '၄။ အလုပ်အသေးစိတ်နှင့် လုပ်သားစာရင်း -',
  },
  docGasReadings: {
    th: 'ผลการตรวจวัดก๊าซในที่อับอากาศ (Gas Measurement Values):',
    zh: '受限空间气体实测数据 (Gas Measurements):',
    my: 'ဓာတ်ငွေ့တိုင်းတာမှု ရလဒ်များ -',
  },
  docPPEChecked: {
    th: 'อุปกรณ์ PPE ที่ต้องสวมใส่',
    zh: '必须佩戴的个人防护用品 (PPE)',
    my: 'ဝတ်ဆင်ရမည့် PPE ပစ္စည်းများ',
  },
  docControlsChecked: {
    th: 'มาตรการความปลอดภัยหน้างาน',
    zh: '现场落实的安全防范措施',
    my: 'လုပ်ငန်းခွင် လုံခြုံရေးအစီအမံများ',
  },
  docSignApplicant: {
    th: 'ผู้ขออนุญาต / ผู้ควบคุมงาน',
    zh: '申请人 / 现场负责人签署',
    my: 'လျှောက်ထားသူ / တာဝန်ခံ လက်မှတ်',
  },
  docSignSafety: {
    th: 'จป.วิชาชีพ / ผู้อนุมัติพื้นที่',
    zh: '专职安全官 / 批准人签署',
    my: 'လုံခြုံရေးအရာရှိ / အတည်ပြုသူ လက်မှတ်',
  },
  docRecordedDate: {
    th: 'วันที่บันทึก:',
    zh: '登记签署时间:',
    my: 'မှတ်တမ်းတင်သည့်နေ့ -',
  },
  docDecisionStatus: {
    th: 'สถานะการพิจารณา:',
    zh: '许可审核决定:',
    my: 'ခွင့်ပြုချက် အခြေအနေ -',
  },
  docSpecialRemarks: {
    th: 'ข้อสั่งการพิเศษ จป.วิชาชีพ:',
    zh: '安全主任特批防范要求:',
    my: 'လုံခြုံရေးအရာရှိ၏ အထူးညွှန်ကြားချက် -',
  },
  docLastUpdated: {
    th: 'อัปเดตล่าสุด:',
    zh: '最近更新时间:',
    my: 'နောက်ဆုံးပြင်ဆင်ချိန် -',
  },
  closeModalBtn: {
    th: 'ปิดหน้าต่าง',
    zh: '关闭窗口',
    my: 'ပိတ်ပါ',
  },

  // 4-Section Specs Viewer
  specsHeaderTitle: {
    th: 'โครงสร้างแบบฟอร์ม Google Form ใบอนุญาตทำงานเสี่ยง (4 Sections & 20 Questions)',
    zh: 'Google 表单危险作业许可完整架构 (4 个部分 & 20 个标准问题)',
    my: 'Google Form ခွင့်ပြုချက်ဖွဲ့စည်းပုံ (အပိုင်း ၄ ခု နှင့် မေးခွန်း ၂၀ ခု)',
  },
  specsHeaderSubtitle: {
    th: 'โครงสร้างละเอียดสำหรับสร้างใน Google Form ทันที หรือกดเชื่อมต่อระบบสร้างอัตโนมัติ',
    zh: '专为安全主任设计的标准表单题型，可直接复制或一键同步至 Google 云端表单。',
    my: 'Google Form တွင် အလွယ်တကူ ထည့်သွင်းနိုင်သော သို့မဟုတ် အလိုအလျောက် ဖန်တီးနိုင်သော ပုံစံ။',
  },
  btnCopyAllQuestions: {
    th: 'คัดลอกโครงสร้างทั้งหมด (Copy All)',
    zh: '复制全部表单题型 (Copy All)',
    my: 'ဖွဲ့စည်းပုံအားလုံးကို ကူးယူပါ (Copy All)',
  },
  copiedAllToast: {
    th: 'คัดลอกทั้งหมดแล้ว!',
    zh: '已复制全部表单内容！',
    my: 'အားလုံးကို ကူးယူပြီးပါပြီ။',
  },
  btnCopyOneQuestion: {
    th: 'คัดลอกข้อนี้',
    zh: '复制此题',
    my: 'ဤမေးခွန်းကို ကူးပါ',
  },
  copiedOneToast: {
    th: 'คัดลอกแล้ว',
    zh: '已复制',
    my: 'ကူးယူပြီးပါပြီ',
  },
  questionBadgeRequired: {
    th: 'จำเป็นต้องตอบ (Required)',
    zh: '必填项 (Required)',
    my: 'မဖြစ်မနေ ဖြေရမည် (Required)',
  },
  questionBadgeOptional: {
    th: 'ไม่บังคับ (Optional)',
    zh: '选填 (Optional)',
    my: 'ရွေးချယ်နိုင်သည် (Optional)',
  },
  googleFormTypeLabel: {
    th: 'ประเภทใน Google Form:',
    zh: 'Google 表单题型:',
    my: 'Google Form အမျိုးအစား -',
  },
  safetyOfficerTipLabel: {
    th: '💡 ข้อแนะนำจาก จป.วิชาชีพ:',
    zh: '💡 安全主任专业把关要点:',
    my: '💡 လုံခြုံရေးအရာရှိ၏ အကြံပြုချက် -',
  },
  legalReferenceLabel: {
    th: '⚖️ กฎหมาย/มาตรฐานอ้างอิง:',
    zh: '⚖️ 法规标准依据:',
    my: '⚖️ ဥပဒေ/စံနှုန်းများ -',
  },
  optionsListLabel: {
    th: 'ตัวเลือกใน Google Form:',
    zh: '表单可选答案列表:',
    my: 'ရွေးချယ်စရာများ စာရင်း -',
  },

  // Footer
  footerTitle: {
    th: 'ระบบบริหารจัดการใบอนุญาตปฏิบัติงานที่มีความเสี่ยง (Permit to Work System - PTW)',
    zh: '高风险作业安全许可证管理系统 (Permit to Work System - PTW)',
    my: 'အန္တရာယ်ရှိသောအလုပ်လုပ်ကိုင်ခွင့် စီမံခန့်ခွဲမှုစနစ် (Permit to Work System - PTW)',
  },
  footerDesc: {
    th: 'รองรับการกรอก บันทึก แก้ไข ติดตามสถานะ อนุมัติ และพิมพ์เอกสารตามมาตรฐาน จป.วิชาชีพ ใน 3 ภาษา (ไทย • 中文 • မြန်မာ)',
    zh: '支持泰、中、缅三语切换，涵盖在线填报、修改、状态流转、安全审核及合规打印全流程。',
    my: 'ထိုင်း၊ တရုတ်၊ မြန်မာ ၃ ဘာသာဖြင့် ဖောင်ဖြည့်ခြင်း၊ ပြင်ဆင်ခြင်း၊ အတည်ပြုခြင်းနှင့် ပရင့်ထုတ်ခြင်းကို ဆောင်ရွက်နိုင်ပါသည်။',
  },
  footerActiveCount: {
    th: 'ใบอนุญาตในระบบ:',
    zh: '活跃许可证数:',
    my: 'လက်ရှိခွင့်ပြုချက်များ -',
  },
  footerStandard: {
    th: 'มาตรฐาน พ.ร.บ.ความปลอดภัยฯ 2554 & ISO 45001',
    zh: '符合泰国安全法 2554 & ISO 45001',
    my: 'ထိုင်းလုံခြုံရေးဥပဒေ ၂၀၁၁ & ISO 45001 စံနှုန်း',
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

/**
 * Multilingual PPE definitions for Form & Printable document
 */
export const PPE_ITEMS_MULTILINGUAL = [
  {
    id: 'helmet',
    th: 'หมวกนิรภัยมาตรฐาน มอก. พร้อมสายรัดคาง (Safety Helmet with Chin Strap)',
    zh: '合规安全帽带下颚带 (Safety Helmet with Chin Strap)',
    my: 'မေးသိုင်းကြိုးပါဝင်သော ဘေးကင်းရေးဦးထုပ် (Safety Helmet with Chin Strap)',
  },
  {
    id: 'shoes',
    th: 'รองเท้านิรภัยหัวเหล็ก / พื้นเหล็กกันทะลุ (Safety Shoes S1P / S3)',
    zh: '钢头防刺穿安全劳保鞋 (Safety Shoes S1P / S3)',
    my: 'သံထိပ်ပါ လုံခြုံရေးဖိနပ် (Safety Shoes S1P / S3)',
  },
  {
    id: 'glasses',
    th: 'แว่นตานิรภัยป้องกันเศษสะเก็ดและรังสี (Safety Glasses ANSI Z87.1)',
    zh: '防冲击防辐射安全护目镜 (Safety Glasses ANSI Z87.1)',
    my: 'ဘေးကင်းရေးမျက်မှန် (Safety Glasses ANSI Z87.1)',
  },
  {
    id: 'faceshield',
    th: 'กระบังหน้าป้องกันความร้อน/สะเก็ด/สารเคมี (Face Shield)',
    zh: '防飞溅防热面罩 (Face Shield)',
    my: 'မျက်နှာကာအကာအကွယ် (Face Shield)',
  },
  {
    id: 'gloves',
    th: 'ถุงมือนิรภัย (ถุงมือหนังงานเชื่อม / กันบาด / ถุงมือยางเคมี)',
    zh: '特种防护手套 (焊工皮手套/防割手套/耐酸碱手套)',
    my: 'ဘေးကင်းရေးလက်အိတ် (သားရေလက်အိတ် / ဓာတုဒဏ်ခံလက်အိတ်)',
  },
  {
    id: 'harness',
    th: 'เข็มขัดนิรภัยเต็มตัวพร้อมสายช่วยชีวิตคู่และกระเปาะซับแรง (Full Body Harness + Double Lanyard)',
    zh: '五点式双挂钩带缓冲包全身安全带 (Full Body Harness + Double Lanyard)',
    my: 'တစ်ကိုယ်လုံးဝတ် ဘေးကင်းရေးကြိုး (Full Body Harness + Double Lanyard)',
  },
  {
    id: 'welding_mask',
    th: 'หน้ากากเชื่อมไฟฟ้า / แว่นตัดแก๊สปรับแสงอัตโนมัติ (Welding Helmet / Cutting Goggles)',
    zh: '自动变光电焊面罩 / 气割护目镜 (Welding Mask / Goggles)',
    my: 'ဂဟေဆော်မျက်နှာဖုံး / မျက်မှန် (Welding Mask)',
  },
  {
    id: 'respirator',
    th: 'หน้ากากกรองอนุภาค N95 หรือหน้ากากกรองไอระเหยสารเคมี Half Mask Respirator',
    zh: 'N95 防尘口罩 / 双滤盒防毒防蒸汽半面罩 (Half Mask Respirator)',
    my: 'N95 နှာခေါင်းစည်း / အဆိပ်ငွေ့ကာ နှာခေါင်းစည်း (Respirator)',
  },
  {
    id: 'chemical_suit',
    th: 'ชุดคลุมป้องกันสารเคมี / เสื้อกันไฟลาม (Chemical Protective Suit / Fire Retardant Coverall)',
    zh: '防化服 / 阻燃防静电连体工作服 (Chemical Suit / FR Coverall)',
    my: 'ဓာတုကာကွယ်ရေးဝတ်စုံ / မီးခံဝတ်စုံ (Chemical Suit)',
  },
  {
    id: 'srl',
    th: 'อุปกรณ์ล็อกสายกันตก ชนิดดึงกลับอัตโนมัติ (Self-Retracting Lifeline - SRL)',
    zh: '速差式防坠器 / 自动收缩生命线 (Self-Retracting Lifeline - SRL)',
    my: 'အလိုအလျောက် ပြန်ဆွဲသော အမြင့်ပြုတ်ကျကာကွယ်ရေးပစ္စည်း (SRL)',
  },
];

/**
 * Multilingual Safety Control Checklist
 */
export const SAFETY_CONTROLS_MULTILINGUAL = [
  {
    id: 'loto',
    th: '[LOTO] ดำเนินการตัดแยกพลังงานทุกระบบ (ไฟฟ้า, แรงดันลม, ไฮดรอลิก) พร้อมแขวนป้ายเตือนและล็อกกุญแจ',
    zh: '[LOTO] 上锁挂牌：彻底切断动力源（电、气、液压）并上锁挂警示牌',
    my: '[LOTO] စွမ်းအင်အားလုံး (လျှပ်စစ်၊ လေဖိအား၊ ဟိုက်ဒရောလစ်) ကို ပိတ်ပြီး သော့ခတ်သတိပေးဆိုင်းဘုတ် ချိတ်ဆွဲပါ',
  },
  {
    id: 'zero_energy',
    th: '[Zero Energy] ตรวจสอบพลังงานตกค้างเป็นศูนย์ (Zero Energy Verification) ก่อนลงมือซ่อมบำรุง',
    zh: '[Zero Energy] 零能量验证：作业前释放并验证管线设备残余压力与电荷为零',
    my: '[Zero Energy] မပြုပြင်မီ ကျန်ရှိသော စွမ်းအင်သုညဖြစ်ကြောင်း စစ်ဆေးအတည်ပြုပါ',
  },
  {
    id: 'gas_test',
    th: '[Gas Test] ตรวจวัดบรรยากาศอันตราย 4 ก๊าซในที่อับอากาศครบทุกระดับความลึกและผ่านเกณฑ์ความปลอดภัย',
    zh: '[Gas Test] 气体检测：有限空间上中下全深度4种气体检测且均在安全阈值内',
    my: '[Gas Test] ကျဉ်းကျပ်သောနေရာတွင် အန္တရာယ်ရှိသော ဓာတ်ငွေ့ ၄ မျိုးကို တိုင်းတာစစ်ဆေးပါ',
  },
  {
    id: 'ventilation',
    th: '[Ventilation] ติดตั้งพัดลมเป่าระบายอากาศแบบแรงดันบวก (Continuous Mechanical Ventilation) ตลอดเวลาทำงาน',
    zh: '[Ventilation] 强制机械通风：全作业周期内保持防爆风机正压不间断送风',
    my: '[Ventilation] အလုပ်လုပ်နေစဉ် တစ်လျှောက်လုံး လေဝင်လေထွက် ပန်ကာတပ်ဆင်ထားပါ',
  },
  {
    id: 'fire_protection',
    th: '[Fire Protection] จัดตั้งถังดับเพลิงเคมีแห้งหรือ CO2 ขนาดไม่ต่ำกว่า 15 ปอนด์ ประจำจุดเสี่ยงไม่เกิน 5-10 เมตร',
    zh: '[Fire Protection] 消防器材：作业点 5-10 米内就近配备至少 15 磅干粉或 CO2 灭火器',
    my: '[Fire Protection] အလုပ်လုပ်သည့်နေရာမှ ၅-၁၀ မီတာအတွင်း အနည်းဆုံး ၁၅ ပေါင် မီးသတ်ဆေးဘူးထားပါ',
  },
  {
    id: 'fire_watcher',
    th: '[Fire Watcher] จัดให้มีผู้เฝ้าระวังไฟสวมปลอกแขนประจำจุดตลอดเวลา และตรวจพื้นที่ซ้ำ 30 นาทีหลังงานเชื่อมเสร็จ',
    zh: '[Fire Watcher] 动火监护人：佩戴袖标专人全程监护，动火完毕后现场复查至少30分钟',
    my: '[Fire Watcher] မီးစောင့်ကြည့်သူ အမြဲရှိနေရမည်ဖြစ်ပြီး အလုပ်ပြီးနောက် မိနစ် ၃၀ ကြာ ထပ်မံစစ်ဆေးပါ',
  },
  {
    id: 'combustibles',
    th: '[Combustibles] เคลียร์วัสดุติดไฟในรัศมี 11 เมตร หรือคลุมด้วยผ้ากันไฟ (Fire Blanket) อย่างมิดชิด',
    zh: '[Combustibles] 清理可燃物：作业点周围 11 米内可燃易燃物全部清空或加盖防火毯',
    my: '[Combustibles] ၁၁ မီတာအတွင်း မီးလောင်လွယ်သော ပစ္စည်းများကို ရှင်းထုတ်ပါ သို့မဟုတ် မီးခံစောင်ဖြင့် ဖုံးအုပ်ပါ',
  },
  {
    id: 'scaffolding',
    th: '[Scaffolding] นั่งร้านติดตั้งได้ดิ่ง ได้ระดับ แข็งแรง มีบันไดขึ้นลง และติดป้าย Scaffolding Tag สีเขียว',
    zh: '[Scaffolding] 脚手架验收：立杆垂直搭设稳固、步道平整设护栏并悬挂绿色合格验收标牌 (Green Tag)',
    my: '[Scaffolding] ငြမ်းကို ခိုင်ခံ့စွာ တပ်ဆင်ထားပြီး စိမ်းရောင် ခွင့်ပြုကတ်ပြား ချိတ်ဆွဲထားပါ',
  },
  {
    id: 'fall_protection',
    th: '[Fall Protection] มีจุดยึดเกาะ Lifeline หรือ Anchor Point ที่แข็งแรงรับแรง 5,000 ปอนด์ และติดตั้งแผ่น Toe Board',
    zh: '[Fall Protection] 防坠系统：牢固锚固点承受力≥5000磅、生命线拉设规范且安装防坠踢脚板',
    my: '[Fall Protection] ပေါင် ၅၀၀၀ ခံနိုင်သော အကာအကွယ်ကြိုးနှင့် ကာရံဘုတ်များ တပ်ဆင်ပါ',
  },
  {
    id: 'electrical',
    th: '[Electrical] ตรวจสอบเครื่องมือไฟฟ้า สายไฟ ปลั๊กพ่วง มีสายดิน และต่อผ่านเครื่องตัดไฟรั่ว ELCB/RCD 30mA',
    zh: '[Electrical] 临时用电：电动机具电缆绝缘良好、具备地线并经 30mA 漏电保护器 (RCD/ELCB)',
    my: '[Electrical] လျှပ်စစ်ပစ္စည်းများနှင့် ဝါယာကြိုးများတွင် မြေစိုက်ကြိုးနှင့် 30mA ဓာတ်လိုက်ကာကွယ်မှု ပါရှိပါ',
  },
  {
    id: 'excavation',
    th: '[Excavation] หลุมขุดติดตั้งระบบค้ำยันดิน Sloping/Shoring ป้องกันการพังทลาย และมีบันไดขึ้นลงห่างไม่เกิน 7.5 เมตร',
    zh: '[Excavation] 动土基坑开挖：设置放坡或钢板桩支护防塌方，安全逃生梯间距≤7.5米',
    my: '[Excavation] မြေတူးရာတွင် မြေပြိုမှုကာကွယ်ရန် ထောက်ကန်ထားပြီး ၇.၅ မီတာအတွင်း လှေကားရှိရမည်',
  },
  {
    id: 'barricade',
    th: '[Barricade] กั้นขอบเขตพื้นที่ทำงานด้วยเทปเตือนภัยขาว-แดง หรือกรวยยาง พร้อมป้ายเตือน "งานเสี่ยงอันตราย ห้ามเข้า"',
    zh: '[Barricade] 现场警戒隔离：设立警示警戒线、反光锥并挂设“危险作业 闲人免进”严禁进入标志',
    my: '[Barricade] အန္တရာယ်ရှိသော ဧရိယာကို သတိပေးတိပ် သို့မဟုတ် ဘောလုံးများဖြင့် ကာရံထားပါ',
  },
  {
    id: 'emergency',
    th: '[Emergency] ซักซ้อมเส้นทางหนีภัย จุดรวมพล และระบบสื่อสารฉุกเฉินให้ผู้ปฏิบัติงานทุกคนรับทราบก่อนเริ่มงาน',
    zh: '[Emergency] 应急准备：班前交底讲解疏散逃生路线、紧急集合点及现场应急呼叫联络机制',
    my: '[Emergency] အရေးပေါ်ထွက်ပေါက်၊ စုရပ်နှင့် အရေးပေါ်ဆက်သွယ်ရန် နည်းလမ်းများကို ရှင်းပြပါ',
  },
];

/**
 * Multilingual High-Risk Types definitions
 */
export const HIGH_RISK_TYPES_MULTILINGUAL = [
  {
    id: 'hot',
    titleTh: 'งานที่ทำให้เกิดความร้อนหรือประกายไฟ (Hot Work)',
    titleZh: '动火与产生火花热工作业 (Hot Work)',
    titleMy: 'မီးပွား သို့မဟုတ် အပူထွက်သောအလုပ် (Hot Work)',
    descTh: 'งานเชื่อมไฟฟ้า, ตัดแก๊ส, เจียรโลหะ, ขัดพ่นทราย',
    descZh: '电焊作业、气割气焊、角磨砂轮打磨切割、喷砂除锈等',
    descMy: 'ဂဟေဆော်ခြင်း၊ ဓာတ်ငွေ့ဖြင့်ဖြတ်ခြင်း၊ သံပွတ်စက်တိုက်ခြင်း၊ သဲမှုတ်ခြင်း',
    icon: '🔥',
  },
  {
    id: 'confined',
    titleTh: 'งานในที่อับอากาศ (Confined Space Work)',
    titleZh: '受限空间/有限空间进入作业 (Confined Space Work)',
    titleMy: 'ကျဉ်းကျပ်သောနေရာတွင် အလုပ်လုပ်ခြင်း (Confined Space Work)',
    descTh: 'ทำงานในถังไซโล, บ่อบำบัด, ท่อใต้ดิน, หลุมลึก, ถังปฏิกรณ์',
    descZh: '料仓储罐、污水沉淀池、地下管廊雨污水井、深基坑、反应釜等',
    descMy: 'ဆီလိုကန်၊ ရေဆိုးကန်၊ မြေအောက်ပိုက်လိုင်း၊ တွင်းနက်၊ ဓာတုကန်',
    icon: '📦',
  },
  {
    id: 'heights',
    titleTh: 'งานบนที่สูง (Working at Heights - สูงเกิน 2 เมตรขึ้นไป)',
    titleZh: '高处坠落危险作业 (高空作业 2米以上 Working at Heights)',
    titleMy: 'အမြင့်တွင် အလုပ်လုပ်ခြင်း (၂ မီတာအထက် Working at Heights)',
    descTh: 'งานติดตั้งนั่งร้าน, หลังคา, โรยตัว, กระเช้าบูม',
    descZh: '搭拆脚手架、屋面彩钢瓦施工、高空悬吊绳索作业、高空作业车',
    descMy: 'ငြမ်းဆင်ခြင်း၊ အမိုးမိုးခြင်း၊ ကြိုးဖြင့်ဆင်းခြင်း၊ ဘွန်းကားဖြင့်လုပ်ခြင်း',
    icon: '🧗',
  },
  {
    id: 'elec',
    titleTh: 'งานเกี่ยวกับระบบไฟฟ้าแรงสูง/อุปกรณ์ไฟฟ้า (Electrical Work)',
    titleZh: '电气设备与高压停送电作业 (Electrical Work)',
    titleMy: 'လျှပ်စစ်နှင့် ဗို့အားမြင့်စနစ် အလုပ်များ (Electrical Work)',
    descTh: 'ซ่อมตู้ MDB, เดินสายไฟแรงดัน, หม้อแปลงไฟฟ้า',
    descZh: '配电柜MDB检修、高压电缆敷设试验、变压器停送电作业',
    descMy: 'MDB မီးပုံးပြုပြင်ခြင်း၊ ဗို့အားမြင့်ကြိုးသွယ်တန်းခြင်း၊ ထရန်စဖော်မာ',
    icon: '⚡',
  },
  {
    id: 'excav',
    titleTh: 'งานขุดเจาะหรือรอกยกของหนัก (Excavation & Lifting Work)',
    titleZh: '动土基坑开挖与起重吊装作业 (Excavation & Lifting Work)',
    titleMy: 'မြေတူးခြင်းနှင့် အလေးအပင်မခြင်း (Excavation & Lifting Work)',
    descTh: 'งานขุดลึกเกิน 1.5 ม., รถเครนยกโครงสร้าง, ปั้นจั่น',
    descZh: '挖掘深度超1.5米动土坑、汽车吊起重吊装、门式塔式起重机',
    descMy: '၁.၅ မီတာထက်နက်သော မြေတူးခြင်း၊ ကရိန်းဖြင့်မခြင်း၊ ကရိန်းကား',
    icon: '🏗️',
  },
  {
    id: 'chem',
    titleTh: 'งานสารเคมีอันตราย / วัตถุไวไฟ (Hazardous Chemical Work)',
    titleZh: '危险化学品与易燃易爆品作业 (Hazardous Chemical Work)',
    titleMy: 'အန္တရာယ်ရှိသော ဓာတုပစ္စည်း/မီးလောင်လွယ်ပစ္စည်း (Chemical Work)',
    descTh: 'ถ่ายเทสารเคมีไวไฟ, พ่นสีในโรงงาน, สารกัดกร่อน',
    descZh: '易燃挥发溶剂装卸倒运、车间密闭喷涂作业、强腐蚀性酸碱介质',
    descMy: 'မီးလောင်လွယ်သော ဓာတုပစ္စည်းလွှဲပြောင်းခြင်း၊ ဆေးမှုတ်ခြင်း၊ အက်ဆစ်',
    icon: '☣️',
  },
];
