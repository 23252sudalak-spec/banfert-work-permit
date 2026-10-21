import { QQUser, PRESET_QQ_USERS, QQUserRole } from '../types/qqUser';

const STORAGE_KEY = 'ptw_qq_user_session';
const OTP_STORAGE_KEY = 'ptw_qq_otp_record';

export const getSavedQQUser = (): QQUser | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse saved QQ user', e);
    return null;
  }
};

export const saveQQUserSession = (user: QQUser): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save QQ user session', e);
  }
};

export const clearQQUserSession = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear QQ user session', e);
  }
};

export const sanitizeQQEmail = (input: string): string => {
  const clean = input.trim().toLowerCase();
  if (!clean) return '';
  if (/^\d+$/.test(clean)) {
    return `${clean}@qq.com`;
  }
  return clean;
};

export const sendQQMailVerificationCode = (email: string): { code: string; expiresAt: number } => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes validity
  try {
    localStorage.setItem(
      OTP_STORAGE_KEY,
      JSON.stringify({ email: email.toLowerCase(), code, expiresAt })
    );
  } catch (e) {
    console.error('Failed to store OTP', e);
  }
  return { code, expiresAt };
};

export const verifyQQMailCode = (email: string, code: string): boolean => {
  try {
    const raw = localStorage.getItem(OTP_STORAGE_KEY);
    if (!raw) return true; // fallback allow demo
    const record = JSON.parse(raw);
    if (record.email === email.toLowerCase() && record.code === code.trim()) {
      if (Date.now() <= record.expiresAt) {
        return true;
      }
    }
  } catch (e) {
    console.error('OTP check error', e);
  }
  // Allow test master code 888888 or 123456 as well
  return code.trim() === '888888' || code.trim() === '123456';
};

export const createOrLoginQQUser = (
  emailInput: string,
  method: 'password' | 'verification_code' | 'qq_qrcode',
  customRole: QQUserRole = 'safety_officer',
  customName?: string
): QQUser => {
  const fullEmail = sanitizeQQEmail(emailInput);
  const qqNumber = fullEmail.split('@')[0];

  // Check preset first
  const existing = PRESET_QQ_USERS.find(
    (u) => u.email.toLowerCase() === fullEmail.toLowerCase() || u.qqNumber === qqNumber
  );

  if (existing) {
    const userSession: QQUser = {
      ...existing,
      loginMethod: method,
      loginAt: new Date().toISOString(),
    };
    saveQQUserSession(userSession);
    return userSession;
  }

  // Generate dynamic QQ user based on role
  const roleTitles: Record<QQUserRole, { th: string; zh: string; my: string }> = {
    safety_officer: {
      th: 'จป.วิชาชีพ (Safety Officer)',
      zh: '注册安全官 (Safety Officer)',
      my: 'လုံခြုံရေးအရာရှိ (Safety Officer)',
    },
    contractor: {
      th: 'ผู้รับเหมา/วิศวกรสนาม (Contractor)',
      zh: '承包商工程技术员 (Contractor)',
      my: 'ကန်ထရိုက်တာ / အင်ဂျင်နီယာ',
    },
    supervisor: {
      th: 'หัวหน้างานโครงการ (Supervisor)',
      zh: '现场工程主管 (Supervisor)',
      my: 'လုပ်ငန်းခွင် ကြီးကြပ်ရေးမှူး',
    },
    inspector: {
      th: 'ผู้ตรวจสอบความปลอดภัย (Inspector)',
      zh: '现场专职安全督查 (Inspector)',
      my: 'လုံခြုံရေးစစ်ဆေးရေးမှူး',
    },
  };

  const nickname = customName?.trim() || `QQ用户_${qqNumber.slice(-4)}`;

  const newUser: QQUser = {
    id: `qq_${Date.now()}`,
    qqNumber,
    email: fullEmail,
    nickname,
    role: customRole,
    roleTitle: roleTitles[customRole] || roleTitles.safety_officer,
    company: '中泰联合工程建设有限公司 (Sino-Thai Engineering Project)',
    phone: '082-100-8899',
    isVerified: true,
    loginMethod: method,
    loginAt: new Date().toISOString(),
  };

  saveQQUserSession(newUser);
  return newUser;
};
