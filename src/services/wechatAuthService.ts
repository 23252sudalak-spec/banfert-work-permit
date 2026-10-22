import { WeChatUser, PRESET_WECHAT_USERS, TARGET_SAFETY_OFFICER_WXID, WeChatUserRole } from '../types/wechat';

const STORAGE_KEY = 'ptw_wechat_user_session';

export const getSavedWeChatUser = (): WeChatUser | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse saved WeChat user', e);
    return null;
  }
};

export const saveWeChatUserSession = (user: WeChatUser): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    window.dispatchEvent(new CustomEvent('wechat-auth-changed', { detail: user }));
  } catch (e) {
    console.error('Failed to save WeChat user session', e);
  }
};

export const clearWeChatUserSession = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('wechat-auth-changed', { detail: null }));
  } catch (e) {
    console.error('Failed to clear WeChat user session', e);
  }
};

export const createOrLoginWeChatUser = (
  wxidInput: string,
  method: 'wechat_qrcode' | 'wxid' | 'quick_login',
  customRole: WeChatUserRole = 'safety_officer',
  customName?: string
): WeChatUser => {
  const cleanWxid = wxidInput.trim();

  // Check preset first
  const existing = PRESET_WECHAT_USERS.find(
    (u) => u.wxid.toLowerCase() === cleanWxid.toLowerCase()
  );

  if (existing) {
    const session: WeChatUser = {
      ...existing,
      loginMethod: method,
      loginAt: new Date().toISOString(),
    };
    saveWeChatUserSession(session);
    return session;
  }

  // Dynamic WeChat user
  const roleTitles: Record<WeChatUserRole, { th: string; zh: string; my: string }> = {
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

  const nickname = customName?.trim() || `微信用户_${cleanWxid.slice(-4) || '8888'}`;

  const newUser: WeChatUser = {
    id: `wechat_${Date.now()}`,
    wxid: cleanWxid || TARGET_SAFETY_OFFICER_WXID,
    wechatNumber: cleanWxid || TARGET_SAFETY_OFFICER_WXID,
    nickname,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: customRole,
    roleTitle: roleTitles[customRole] || roleTitles.safety_officer,
    company: 'ฝ่ายบริหารงานก่อสร้างและความปลอดภัย (Project SHE Team)',
    phone: '081-992-3841',
    isVerified: true,
    loginMethod: method,
    loginAt: new Date().toISOString(),
  };

  saveWeChatUserSession(newUser);
  return newUser;
};

export const getSafetyOfficerPreset = (): WeChatUser => {
  return PRESET_WECHAT_USERS[0]; // wxid_fsgmwe1ebk7l12
};
