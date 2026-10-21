export type QQUserRole = 'safety_officer' | 'contractor' | 'supervisor' | 'inspector';

export interface QQUser {
  id: string;
  qqNumber: string; // e.g. "238914829"
  email: string; // e.g. "238914829@qq.com"
  nickname: string; // e.g. "王建国 (Wang Jianguo)"
  avatar?: string;
  role: QQUserRole;
  roleTitle: {
    th: string;
    zh: string;
    my: string;
  };
  company: string; // e.g. "中建中铁建设工程 (China Construction Engineering)"
  phone: string;
  isVerified: boolean;
  loginMethod: 'password' | 'verification_code' | 'qq_qrcode';
  loginAt: string;
}

export const PRESET_QQ_USERS: QQUser[] = [
  {
    id: 'qq_user_1',
    qqNumber: '238914829',
    email: '238914829@qq.com',
    nickname: '王建国 (Wang Jianguo)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'safety_officer',
    roleTitle: {
      th: 'จป.วิชาชีพ (Senior Safety Officer)',
      zh: '注册资深安全工程师 (จป.วิชาชีพ)',
      my: 'အကြီးတန်းလုံခြုံရေးအရာရှိ (Safety Officer)',
    },
    company: '中建七局工程技术 (CSCEC Engineering Thailand)',
    phone: '081-992-3841',
    isVerified: true,
    loginMethod: 'password',
    loginAt: new Date().toISOString(),
  },
  {
    id: 'qq_user_2',
    qqNumber: '874910283',
    email: '874910283@qq.com',
    nickname: '张明 (Zhang Ming)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'contractor',
    roleTitle: {
      th: 'หัวหน้าผู้รับเหมางานความร้อน (Hot Work Contractor)',
      zh: '特种作业施工现场负责人 (承包商)',
      my: 'အထူးလုပ်ငန်း ကန်ထရိုက်တာခေါင်းဆောင်',
    },
    company: '中铁二局机电安装工程 (CREC Mechanical & Electrical)',
    phone: '089-771-4209',
    isVerified: true,
    loginMethod: 'verification_code',
    loginAt: new Date().toISOString(),
  },
  {
    id: 'qq_user_3',
    qqNumber: '109283741',
    email: '109283741@qq.com',
    nickname: '陈立 (Chen Li)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'supervisor',
    roleTitle: {
      th: 'ผู้จัดการไซต์งานโครงการ (Site Project Director)',
      zh: '现场工程项目总监 (Site Director)',
      my: 'စီမံကိန်းဆိုက်ဒါရိုက်တာ (Project Director)',
    },
    company: '中水对外集团工程 (CWE Power & Infra Co., Ltd.)',
    phone: '092-445-8120',
    isVerified: true,
    loginMethod: 'qq_qrcode',
    loginAt: new Date().toISOString(),
  },
];
