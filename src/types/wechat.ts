export type WeChatUserRole = 'safety_officer' | 'contractor' | 'supervisor' | 'inspector';

export interface WeChatUser {
  id: string;
  wxid: string; // WeChat ID, e.g. "wxid_fsgmwe1ebk7l12"
  wechatNumber?: string; // alias
  nickname: string;
  avatar?: string;
  role: WeChatUserRole;
  roleTitle: {
    th: string;
    zh: string;
    my: string;
  };
  company: string;
  phone: string;
  isVerified: boolean;
  loginMethod: 'wechat_qrcode' | 'wxid' | 'quick_login';
  loginAt: string;
}

export const TARGET_SAFETY_OFFICER_WXID = 'wxid_fsgmwe1ebk7l12';

export const PRESET_WECHAT_USERS: WeChatUser[] = [
  {
    id: 'wechat_user_so_1',
    wxid: 'wxid_fsgmwe1ebk7l12',
    wechatNumber: 'wxid_fsgmwe1ebk7l12',
    nickname: '周安华 จป.วิชาชีพ (Senior Safety Officer)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'safety_officer',
    roleTitle: {
      th: 'จป.วิชาชีพ (Senior Safety Officer)',
      zh: '注册资深安全工程师 (จป.วิชาชีพ)',
      my: 'အကြီးတန်းလုံခြုံရေးအရာရှိ (Safety Officer)',
    },
    company: 'ฝ่ายความปลอดภัย อาชีวอนามัย และสิ่งแวดล้อม (SHE Department)',
    phone: '081-992-3841',
    isVerified: true,
    loginMethod: 'quick_login',
    loginAt: new Date().toISOString(),
  },
  {
    id: 'wechat_user_contractor_2',
    wxid: 'wxid_crec99281',
    wechatNumber: 'wxid_crec99281',
    nickname: '张建 (Zhang Jian - Contractor)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'contractor',
    roleTitle: {
      th: 'หัวหน้าผู้รับเหมางานความร้อน (Hot Work Contractor)',
      zh: '特种作业现场施工负责人 (承包商)',
      my: 'အထူးလုပ်ငန်း ကန်ထရိုက်တာခေါင်းဆောင်',
    },
    company: '中铁二局机电安装工程 (CREC Mechanical & Electrical Co., Ltd.)',
    phone: '089-771-4209',
    isVerified: true,
    loginMethod: 'wechat_qrcode',
    loginAt: new Date().toISOString(),
  },
  {
    id: 'wechat_user_supervisor_3',
    wxid: 'wxid_insp7712',
    wechatNumber: 'wxid_insp7712',
    nickname: '陈主管 (Chen Supervisor)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'supervisor',
    roleTitle: {
      th: 'ผู้จัดการไซต์งานโครงการ (Site Project Director)',
      zh: '现场工程项目总监 (Site Director)',
      my: 'စီမံကိန်းဆိုက်ဒါရိုက်တာ (Project Director)',
    },
    company: '中泰联合工程建设 (Sino-Thai Engineering Project)',
    phone: '092-445-8120',
    isVerified: true,
    loginMethod: 'wxid',
    loginAt: new Date().toISOString(),
  },
];

export interface WeChatNotification {
  id: string;
  permitId: string;
  permitNumber: string;
  recipientWxid: string; // 'wxid_fsgmwe1ebk7l12'
  recipientName: string; // 'จป.วิชาชีพ (wxid_fsgmwe1ebk7l12)'
  title: string;
  applicantName: string;
  company: string;
  phone: string;
  location: string;
  riskTypes: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'extreme';
  riskScore: number;
  workDate: string;
  workTimeRange: string;
  jobDescription: string;
  status: 'unread' | 'read' | 'approved' | 'rejected';
  createdAt: string; // ISO
  formattedMessage: string;
}
