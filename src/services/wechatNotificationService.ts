import { WeChatNotification, TARGET_SAFETY_OFFICER_WXID } from '../types/wechat';
import { PermitRecord } from '../types/permit';

const NOTIFICATIONS_STORAGE_KEY = 'ptw_wechat_notifications';

export const formatWeChatMessage = (permit: PermitRecord, targetWxid = TARGET_SAFETY_OFFICER_WXID): string => {
  const riskList = permit.riskTypes && permit.riskTypes.length > 0
    ? permit.riskTypes.join(', ')
    : 'งานทั่วไปตามมาตรฐาน';

  const riskLevelThai = {
    low: 'ต่ำ (Low)',
    medium: 'ปานกลาง (Medium)',
    high: 'สูง (High)',
    extreme: 'สูงมาก/วิกฤต (Extreme)',
  }[permit.riskMatrix?.level || 'medium'];

  return `【微信服务通知 · PTW 安全许可待审批】
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 เลขที่ใบอนุญาต: ${permit.permitNumber || permit.id}
👤 ผู้ยื่นขอ: ${permit.applicantName || 'ไม่ระบุ'} (${permit.applicantRole || 'ผู้ขออนุญาต'})
🏢 สังกัด/บริษัท: ${permit.company || 'ไม่ระบุ'}
📞 เบอร์ติดต่อฉุกเฉิน: ${permit.phone || '-'}
📍 สถานที่ปฏิบัติงาน: ${permit.location || '-'}
⚠️ ประเภทงานเสี่ยง: ${riskList}
⚖️ ระดับความเสี่ยง: ${riskLevelThai} (${permit.riskMatrix?.score || 0}/25)
⏱️ กำหนดเวลา: ${permit.workDate || '-'} (${permit.startTime || '--:--'} - ${permit.endTime || '--:--'})
📝 งานที่ทำ: ${permit.jobDescription ? permit.jobDescription.slice(0, 100) + '...' : '-'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👉 เรียน จป.วิชาชีพ ID: ${targetWxid}
กรุณาเปิดระบบ PTW เพื่อตรวจสอบมาตรการความปลอดภัยและลงนามอนุมัติ (จป.วิชาชีพ)
สถานะปัจจุบัน: ⏳ รอการตรวจสอบและอนุมัติ (Pending Safety Officer Review)`;
};

export const getWeChatNotifications = (): WeChatNotification[] => {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    if (!raw) {
      // Seed default initial notification for demo
      const initial: WeChatNotification = {
        id: `wx_notif_seed_1`,
        permitId: 'PTW-2026-001',
        permitNumber: 'PTW-2026-001',
        recipientWxid: TARGET_SAFETY_OFFICER_WXID,
        recipientName: 'จป.วิชาชีพ (Senior Safety Officer)',
        title: '【PTW 待审批】มีคำขออนุมัติใบอนุญาตทำงานความร้อนใหม่',
        applicantName: 'สมชาย รักปลอดภัย (Somchai Rakplodpai)',
        company: 'บริษัท สยาม ซีวิล คอนสตรัคชั่น จำกัด',
        phone: '081-456-7890',
        location: 'อาคารผลิตหลัก ชั้น 3 โซนเตาหลอม A',
        riskTypes: ['งานที่เกิดความร้อนหรือประกายไฟ (Hot Work / 动火作业)'],
        riskLevel: 'high',
        riskScore: 16,
        workDate: '2026-03-30',
        workTimeRange: '08:00 - 17:00',
        jobDescription: 'งานตัดต่อท่อแก๊สและเชื่อมโครงสร้างเหล็กใกล้แนวท่อแรงดันสูง',
        status: 'unread',
        createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        formattedMessage: `【微信服务通知 · PTW 安全许可待审批】
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 เลขที่ใบอนุญาต: PTW-2026-001
👤 ผู้ยื่นขอ: สมชาย รักปลอดภัย (วิศวกรผู้ควบคุมงาน)
🏢 สังกัด/บริษัท: บริษัท สยาม ซีวิล คอนสตรัคชั่น จำกัด
📞 เบอร์ติดต่อฉุกเฉิน: 081-456-7890
📍 สถานที่ปฏิบัติงาน: อาคารผลิตหลัก ชั้น 3 โซนเตาหลอม A
⚠️ ประเภทงานเสี่ยง: งานที่เกิดความร้อนหรือประกายไฟ (Hot Work)
⚖️ ระดับความเสี่ยง: สูง (High - 16/25)
⏱️ กำหนดเวลา: 2026-03-30 (08:00 - 17:00)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👉 ส่งตรงถึง WeChat ID: ${TARGET_SAFETY_OFFICER_WXID} (จป.วิชาชีพ)`,
      };
      saveWeChatNotifications([initial]);
      return [initial];
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to get WeChat notifications', e);
    return [];
  }
};

export const saveWeChatNotifications = (notifs: WeChatNotification[]): void => {
  try {
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifs));
    // Dispatch custom browser event
    window.dispatchEvent(new CustomEvent('wechat-notifications-updated'));
  } catch (e) {
    console.error('Failed to save WeChat notifications', e);
  }
};

export const getUnreadWeChatCount = (): number => {
  const all = getWeChatNotifications();
  return all.filter((n) => n.status === 'unread').length;
};

export const markWeChatNotificationAsRead = (id: string): void => {
  const all = getWeChatNotifications();
  const updated = all.map((n) => (n.id === id ? { ...n, status: 'read' as const } : n));
  saveWeChatNotifications(updated);
};

export const markAllWeChatNotificationsAsRead = (): void => {
  const all = getWeChatNotifications();
  const updated = all.map((n) => ({ ...n, status: 'read' as const }));
  saveWeChatNotifications(updated);
};

export const updateWeChatNotificationStatus = (
  permitId: string,
  newStatus: 'approved' | 'rejected' | 'read'
): void => {
  const all = getWeChatNotifications();
  const updated = all.map((n) => {
    if (n.permitId === permitId || n.permitNumber === permitId) {
      return { ...n, status: newStatus };
    }
    return n;
  });
  saveWeChatNotifications(updated);
};

export const sendWeChatApprovalNotification = (permit: PermitRecord): WeChatNotification => {
  const formatted = formatWeChatMessage(permit, TARGET_SAFETY_OFFICER_WXID);

  const newNotif: WeChatNotification = {
    id: `wx_notif_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    permitId: permit.id,
    permitNumber: permit.permitNumber || permit.id,
    recipientWxid: TARGET_SAFETY_OFFICER_WXID,
    recipientName: 'จป.วิชาชีพประจำโครงการ',
    title: `【PTW 待审批】ใบอนุญาต ${permit.permitNumber || permit.id} รอการอนุมัติ จป.`,
    applicantName: permit.applicantName || 'ผู้ขออนุญาต',
    company: permit.company || 'หน่วยงานผู้รับเหมา',
    phone: permit.phone || '-',
    location: permit.location || 'สถานที่ปฏิบัติงาน',
    riskTypes: permit.riskTypes || [],
    riskLevel: permit.riskMatrix?.level || 'medium',
    riskScore: permit.riskMatrix?.score || 1,
    workDate: permit.workDate || new Date().toISOString().split('T')[0],
    workTimeRange: `${permit.startTime || '08:00'} - ${permit.endTime || '17:00'}`,
    jobDescription: permit.jobDescription || '-',
    status: 'unread',
    createdAt: new Date().toISOString(),
    formattedMessage: formatted,
  };

  const existing = getWeChatNotifications();
  // Filter duplicate pending notifications for same permit if recently created
  const withoutDuplicate = existing.filter(
    (n) => n.permitId !== permit.id || n.status !== 'unread'
  );
  saveWeChatNotifications([newNotif, ...withoutDuplicate]);

  // Dispatch toast event
  window.dispatchEvent(
    new CustomEvent('wechat-alert-dispatched', {
      detail: newNotif,
    })
  );

  return newNotif;
};

export const copyWeChatMessage = async (notif: WeChatNotification): Promise<boolean> => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(notif.formattedMessage);
      return true;
    }
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = notif.formattedMessage;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  } catch (e) {
    console.error('Failed to copy WeChat message', e);
    return false;
  }
};
