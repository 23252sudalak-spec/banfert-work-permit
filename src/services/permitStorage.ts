import { PermitRecord, PermitStatus, RiskMatrixScore } from '../types/permit';

const STORAGE_KEY = 'safety_permit_records_v1';

export function calculateRiskLevel(score: number): 'low' | 'medium' | 'high' | 'extreme' {
  if (score <= 4) return 'low';
  if (score <= 9) return 'medium';
  if (score <= 15) return 'high';
  return 'extreme';
}

export const INITIAL_SAMPLE_PERMITS: PermitRecord[] = [
  {
    id: 'ptw-2026-001',
    permitNumber: 'PTW-2026-001',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    status: 'approved',
    applicantName: 'นายสมชาย ปลอดภัยดี',
    applicantRole: 'หัวหน้างาน / โฟร์แมนผู้รับเหมา (Site Supervisor / Foreman)',
    company: 'บริษัท สยามเซฟตี้ คอนสตรัคชั่น จำกัด',
    phone: '081-999-8888',
    location: 'อาคารผลิตที่ 2 ชั้น 3 บริเวณแนวท่อส่งไอน้ำ (Boiler Line)',
    workDate: '2026-10-21',
    startTime: '08:30',
    endTime: '17:00',
    workerCount: 4,
    riskTypes: [
      'งานที่ทำให้เกิดความร้อนหรือประกายไฟ (Hot Work)',
      'งานบนที่สูง (Working at Heights - สูงเกิน 2 เมตรขึ้นไป)',
    ],
    otherRiskDetails: '',
    jobDescription:
      'ดำเนินการตัดเชื่อมโครงสร้างเหล็กรองรับแนวท่อน้ำร้อนแรงดันสูง และติดตั้งสลิงยึดโยงบนโครงสร้างชั้น 3 ความสูง 4.5 เมตร',
    workerRoster:
      '1. นายสมชาย ปลอดภัยดี (หัวหน้างาน - เซอร์โฟร์แมน)\n2. นายวิชัย ช่างเชื่อม (ช่างเชื่อม 6G ใบเซอร์สถาบันพัฒนาฝีมือแรงงาน)\n3. นายมานพ ช่วยงาน (ช่างติดตั้ง)\n4. นายอำนาจ เฝ้าระวังไฟ (อบรม Fire Watcher)',
    selectedPPE: [
      'หมวกนิรภัยมาตรฐาน มอก. พร้อมสายรัดคาง (Safety Helmet with Chin Strap)',
      'รองเท้านิรภัยหัวเหล็ก / พื้นเหล็กกันทะลุ (Safety Shoes S1P / S3)',
      'แว่นตานิรภัยป้องกันเศษสะเก็ดและรังสี (Safety Glasses / Spectacles ANSI Z87.1)',
      'ถุงมือนิรภัย (ถุงมือหนังสำหรับงานเชื่อม / ถุงมือกันบาด / ถุงมือยางกันสารเคมี)',
      'เข็มขัดนิรภัยเต็มตัวพร้อมสายช่วยชีวิตคู่และกระเปาะซับแรง (Full Body Harness + Double Lanyard)',
      'หน้ากากเชื่อมไฟฟ้า / แว่นตัดแก๊สปรับแสงอัตโนมัติ (Welding Helmet / Cutting Goggles)',
    ],
    safetyControls: [
      '[Fire Protection] จัดตั้งถังดับเพลิงเคมีแห้งหรือ CO2 ขนาดไม่ต่ำกว่า 15 ปอนด์ ประจำจุดเสี่ยงไม่เกิน 5-10 เมตร',
      '[Fire Watcher] จัดให้มีผู้เฝ้าระวังไฟสวมปลอกแขนประจำจุดตลอดเวลา และตรวจพื้นที่ซ้ำ 30 นาทีหลังงานเชื่อมเสร็จ',
      '[Combustibles] เคลียร์วัสดุติดไฟในรัศมี 11 เมตร หรือคลุมด้วยผ้ากันไฟ (Fire Blanket) อย่างมิดชิด',
      '[Scaffolding] นั่งร้านติดตั้งได้ดิ่ง ได้ระดับ แข็งแรง มีบันไดขึ้นลง และติดป้าย Scaffolding Tag สีเขียว',
      '[Fall Protection] มีจุดยึดเกาะ Lifeline หรือ Anchor Point ที่แข็งแรงรับแรง 5,000 ปอนด์ และติดตั้งแผ่น Toe Board',
      '[Barricade] กั้นขอบเขตพื้นที่ทำงานด้วยเทปเตือนภัยขาว-แดง หรือกรวยยาง พร้อมป้ายเตือน "งานเสี่ยงอันตราย ห้ามเข้า"',
    ],
    preWorkMeasurements: 'ตรวจเคลียร์พื้นที่ด้านล่าง กั้นเขตขาว-แดงรัศมี 10 เมตร และขึงตาข่ายกันตกเรียบร้อย',
    complianceAgreed: true,
    applicantSignature: 'นายสมชาย ปลอดภัยดี',
    safetyOfficerName: 'นางสาวสุดาลักษ์ พิมพ์พันธ์ (จป.วิชาชีพ เลขที่ ว.4582)',
    approvalDecision: 'approved',
    safetyOfficerRemarks:
      'อนุมัติให้เข้าทำงานได้ โดยให้ผู้เฝ้าระวังไฟตรวจวัดความร้อนสะสมหลังหยุดเชื่อม และตรวจซ้ำ 60 นาทีก่อนออกจากพื้นที่',
    attachmentLinks: 'https://drive.google.com/drive/folders/jsa-hotwork-oct2026',
    riskMatrix: {
      probability: 2,
      severity: 3,
      score: 6,
      level: 'medium',
    },
  },
  {
    id: 'ptw-2026-002',
    permitNumber: 'PTW-2026-002',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    status: 'pending_approval',
    applicantName: 'นายประสิทธิ์ สุขเจริญ',
    applicantRole: 'วิศวกรผู้ควบคุมงาน (Site Engineer / Project Engineer)',
    company: 'บริษัท เอ็นไวรอน เซอร์วิสเซส จำกัด',
    phone: '089-123-4567',
    location: 'ถังไซโลบำบัดน้ำเสีย TK-102 โซนระบบบำบัดน้ำทิ้งส่วนกลาง',
    workDate: '2026-10-22',
    startTime: '09:00',
    endTime: '15:30',
    workerCount: 5,
    riskTypes: [
      'งานในที่อับอากาศ (Confined Space Work)',
      'งานสารเคมีอันตราย / วัตถุไวไฟ (Hazardous Chemical Work)',
    ],
    otherRiskDetails: '',
    jobDescription:
      'ตรวจสอบตะกอนและซ่อมแซมใบพัดกวนก้นถังไซโล TK-102 จำเป็นต้องลงสู่ก้นบ่อความลึก 6 เมตร ผ่านช่องทางเข้าด้านบน',
    workerRoster:
      '1. นายประสิทธิ์ สุขเจริญ (ผู้อนุญาต/วิศวกร)\n2. นายเกียรติศักดิ์ มั่นคง (ผู้ควบคุมงานที่อับอากาศ)\n3. นายธีระ ช่วยเหลือ (ผู้ช่วยเหลือ/เฝ้าปากบ่อ)\n4. นายสมคิด และ นายเดชา (ผู้ปฏิบัติงานในที่อับอากาศ - ผ่านตรวจสุขภาพปอด/หัวใจ)',
    selectedPPE: [
      'หมวกนิรภัยมาตรฐาน มอก. พร้อมสายรัดคาง (Safety Helmet with Chin Strap)',
      'รองเท้านิรภัยหัวเหล็ก / พื้นเหล็กกันทะลุ (Safety Shoes S1P / S3)',
      'เข็มขัดนิรภัยเต็มตัวพร้อมสายช่วยชีวิตคู่และกระเปาะซับแรง (Full Body Harness + Double Lanyard)',
      'ชุดคลุมป้องกันสารเคมี / เสื้อกันไฟลาม (Chemical Protective Suit / Fire Retardant Coverall)',
      'หน้ากากกรองอนุภาค N95 หรือหน้ากากกรองไอระเหยสารเคมี Half Mask Respirator',
    ],
    safetyControls: [
      '[LOTO] ดำเนินการตัดแยกพลังงานทุกระบบ (ไฟฟ้า, แรงดันลม, ไฮดรอลิก, วาล์วของเหลว) พร้อมแขวนป้ายเตือนและล็อกกุญแจ',
      '[Zero Energy] ตรวจสอบพลังงานตกค้างเป็นศูนย์ (Zero Energy Verification) ก่อนลงมือซ่อมบำรุง',
      '[Gas Test] ตรวจวัดบรรยากาศอันตราย 4 ก๊าซในที่อับอากาศครบทุกระดับความลึกและผ่านเกณฑ์ความปลอดภัย',
      '[Ventilation] ติดตั้งพัดลมเป่าระบายอากาศแบบแรงดันบวก (Continuous Mechanical Ventilation) ตลอดเวลาทำงาน',
      '[Emergency] ซักซ้อมเส้นทางหนีภัย จุดรวมพล และระบบสื่อสารฉุกเฉินให้ผู้ปฏิบัติงานทุกคนรับทราบก่อนเริ่มงาน',
    ],
    gasReadings: {
      o2: '20.9',
      lel: '0',
      co: '0',
      h2s: '0',
      testedAt: '2026-10-21 07:45',
      testerName: 'นายเกียรติศักดิ์ มั่นคง (ผู้ตรวจวัดก๊าซ)',
      meterModel: 'BW GasAlertMax XT II (Calibrated: 15/10/2026)',
    },
    preWorkMeasurements: 'O2 = 20.9%, LEL = 0%, CO = 0 ppm, H2S = 0 ppm (ผ่านเกณฑ์ทุกพารามิเตอร์)',
    complianceAgreed: true,
    applicantSignature: 'นายประสิทธิ์ สุขเจริญ',
    safetyOfficerName: 'นางสาวสุดาลักษ์ พิมพ์พันธ์ (จป.วิชาชีพ)',
    approvalDecision: 'pending',
    safetyOfficerRemarks:
      'รอ จป.วิชาชีพ ร่วมตรวจสอบการติดตั้งชุดสามขากู้ภัย (Tripod) และพัดลม Blower หน้างานก่อนลงนามขั้นสุดท้าย',
    attachmentLinks: 'https://drive.google.com/drive/folders/confined-space-tk102',
    riskMatrix: {
      probability: 2,
      severity: 5,
      score: 10,
      level: 'high',
    },
  },
  {
    id: 'ptw-2026-003',
    permitNumber: 'PTW-2026-003',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: 'closed',
    applicantName: 'นายธวัชชัย ไฟฟ้าดี',
    applicantRole: 'พนักงานประจำ / ช่างซ่อมบำรุงภายในบริษัท (In-house Maintenance)',
    company: 'แผนกซ่อมบำรุงวิศวกรรมไฟฟ้า (In-House Maintenance Team)',
    phone: '086-555-7777',
    location: 'ห้องควบคุมไฟฟ้าหลัก (Main Substation MDB-1)',
    workDate: '2026-10-19',
    startTime: '13:00',
    endTime: '16:00',
    workerCount: 3,
    riskTypes: ['งานเกี่ยวกับระบบไฟฟ้าแรงสูง/อุปกรณ์ไฟฟ้า (Electrical Work)'],
    otherRiskDetails: '',
    jobDescription:
      'ขันแน่นขั้วต่อสายเมนเบรกเกอร์ ACB 3200A และทำความสะอาดบัสบาร์ในตู้ MDB หลังหยุดระบบประจำสัปดาห์',
    workerRoster:
      '1. นายธวัชชัย ไฟฟ้าดี (วิศวกรไฟฟ้า มีใบ กว.)\n2. นายสุรศักดิ์ ช่างเทคนิค (มีหนังสือรับรองความรู้ความสามารถช่างไฟฟ้า)\n3. นายวิชิต ผู้ช่วยช่าง',
    selectedPPE: [
      'หมวกนิรภัยมาตรฐาน มอก. พร้อมสายรัดคาง (Safety Helmet with Chin Strap)',
      'รองเท้านิรภัยหัวเหล็ก / พื้นเหล็กกันทะลุ (Safety Shoes S1P / S3)',
      'แว่นตานิรภัยป้องกันเศษสะเก็ดและรังสี (Safety Glasses / Spectacles ANSI Z87.1)',
      'กระบังหน้าป้องกันความร้อน/สะเก็ด/สารเคมี (Face Shield)',
      'ถุงมือนิรภัย (ถุงมือหนังสำหรับงานเชื่อม / ถุงมือกันบาด / ถุงมือยางกันสารเคมี)',
    ],
    safetyControls: [
      '[LOTO] ดำเนินการตัดแยกพลังงานทุกระบบ (ไฟฟ้า, แรงดันลม, ไฮดรอลิก, วาล์วของเหลว) พร้อมแขวนป้ายเตือนและล็อกกุญแจ',
      '[Zero Energy] ตรวจสอบพลังงานตกค้างเป็นศูนย์ (Zero Energy Verification) ก่อนลงมือซ่อมบำรุง',
      '[Electrical] ตรวจสอบเครื่องมือไฟฟ้า สายไฟ ปลั๊กพ่วง มีสายดิน และต่อผ่านเครื่องตัดไฟรั่ว ELCB/RCD 30mA',
      '[Barricade] กั้นขอบเขตพื้นที่ทำงานด้วยเทปเตือนภัยขาว-แดง หรือกรวยยาง พร้อมป้ายเตือน "งานเสี่ยงอันตราย ห้ามเข้า"',
    ],
    preWorkMeasurements: 'ตรวจวัดแรงดันตกค้าง = 0.0V ทั้ง 3 เฟส ปลดวงจรและแขวนป้าย LOTO 3 จุด',
    complianceAgreed: true,
    applicantSignature: 'นายธวัชชัย ไฟฟ้าดี',
    safetyOfficerName: 'นางสาวสุดาลักษ์ พิมพ์พันธ์ (จป.วิชาชีพ)',
    approvalDecision: 'approved',
    safetyOfficerRemarks: 'งานเสร็จสิ้นตามเวลา ทดสอบระบบปกติ ปลดกุญแจ LOTO และปิดใบอนุญาตเรียบร้อย',
    attachmentLinks: 'https://drive.google.com/drive/folders/mdb-maintenance',
    riskMatrix: {
      probability: 1,
      severity: 4,
      score: 4,
      level: 'low',
    },
  },
];

export function loadPermits(): PermitRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed initial sample permits
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_PERMITS));
      return INITIAL_SAMPLE_PERMITS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_PERMITS));
      return INITIAL_SAMPLE_PERMITS;
    }
    return parsed;
  } catch (err) {
    console.error('Error loading permits from storage:', err);
    return INITIAL_SAMPLE_PERMITS;
  }
}

export function savePermit(permit: PermitRecord): PermitRecord {
  const current = loadPermits();
  const existingIndex = current.findIndex((p) => p.id === permit.id);

  const updatedPermit: PermitRecord = {
    ...permit,
    updatedAt: new Date().toISOString(),
  };

  let updatedList: PermitRecord[];
  if (existingIndex >= 0) {
    updatedList = [...current];
    updatedList[existingIndex] = updatedPermit;
  } else {
    updatedList = [updatedPermit, ...current];
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  } catch (err) {
    console.error('Error saving permit to localStorage:', err);
  }

  return updatedPermit;
}

export function deletePermit(id: string): boolean {
  try {
    const current = loadPermits();
    const filtered = current.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.error('Error deleting permit:', err);
    return false;
  }
}

export function updatePermitStatus(
  id: string,
  newStatus: PermitStatus,
  remarks?: string
): PermitRecord | null {
  const current = loadPermits();
  const index = current.findIndex((p) => p.id === id);
  if (index < 0) return null;

  const item = current[index];
  const updated: PermitRecord = {
    ...item,
    status: newStatus,
    updatedAt: new Date().toISOString(),
    approvalDecision:
      newStatus === 'approved'
        ? 'approved'
        : newStatus === 'conditional'
        ? 'conditional'
        : newStatus === 'rejected'
        ? 'rejected'
        : item.approvalDecision,
    safetyOfficerRemarks: remarks !== undefined ? remarks : item.safetyOfficerRemarks,
  };

  current[index] = updated;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (err) {
    console.error('Error updating permit status:', err);
  }

  return updated;
}

export function getPermitById(id: string): PermitRecord | null {
  const permits = loadPermits();
  return permits.find((p) => p.id === id) || null;
}

export function generateNextPermitNumber(): string {
  const permits = loadPermits();
  const year = new Date().getFullYear();
  const prefix = `PTW-${year}-`;
  
  let maxNum = 0;
  permits.forEach((p) => {
    if (p.permitNumber?.startsWith(prefix)) {
      const numPart = parseInt(p.permitNumber.replace(prefix, ''), 10);
      if (!isNaN(numPart) && numPart > maxNum) {
        maxNum = numPart;
      }
    }
  });

  const nextNum = maxNum + 1;
  return `${prefix}${String(nextNum).padStart(3, '0')}`;
}

export function createBlankPermit(): PermitRecord {
  const nextNum = generateNextPermitNumber();
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  return {
    id: `ptw-${Date.now()}`,
    permitNumber: nextNum,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    status: 'draft',
    applicantName: '',
    applicantRole: 'หัวหน้างาน / โฟร์แมนผู้รับเหมา (Site Supervisor / Foreman)',
    company: '',
    phone: '',
    location: '',
    workDate: todayStr,
    startTime: '08:30',
    endTime: '17:00',
    workerCount: 1,
    riskTypes: [],
    otherRiskDetails: '',
    jobDescription: '',
    workerRoster: '',
    selectedPPE: [
      'หมวกนิรภัยมาตรฐาน มอก. พร้อมสายรัดคาง (Safety Helmet with Chin Strap)',
      'รองเท้านิรภัยหัวเหล็ก / พื้นเหล็กกันทะลุ (Safety Shoes S1P / S3)',
    ],
    safetyControls: [
      '[Barricade] กั้นขอบเขตพื้นที่ทำงานด้วยเทปเตือนภัยขาว-แดง หรือกรวยยาง พร้อมป้ายเตือน "งานเสี่ยงอันตราย ห้ามเข้า"',
      '[Emergency] ซักซ้อมเส้นทางหนีภัย จุดรวมพล และระบบสื่อสารฉุกเฉินให้ผู้ปฏิบัติงานทุกคนรับทราบก่อนเริ่มงาน',
    ],
    gasReadings: {
      o2: '20.9',
      lel: '0',
      co: '0',
      h2s: '0',
    },
    preWorkMeasurements: '',
    complianceAgreed: false,
    applicantSignature: '',
    safetyOfficerName: '',
    approvalDecision: 'pending',
    safetyOfficerRemarks: '',
    attachmentLinks: '',
    riskMatrix: {
      probability: 2,
      severity: 3,
      score: 6,
      level: 'medium',
    },
  };
}
