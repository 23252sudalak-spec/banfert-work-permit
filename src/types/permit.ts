export type QuestionType =
  | 'SHORT_ANSWER'
  | 'PARAGRAPH'
  | 'MULTIPLE_CHOICE'
  | 'CHECKBOXES'
  | 'DROPDOWN'
  | 'DATE'
  | 'TIME'
  | 'FILE_UPLOAD';

export type Language = 'th' | 'zh' | 'my' | 'bilingual_th_my' | 'bilingual_th_zh' | 'trilingual';

export type PermitStatus =
  | 'draft'
  | 'pending_approval'
  | 'approved'
  | 'conditional'
  | 'rejected'
  | 'work_in_progress'
  | 'closed';

export interface GasMeasurement {
  o2: string;    // e.g. "20.9" (Standard 19.5 - 23.5%)
  lel: string;   // e.g. "0" (Standard < 10%)
  co: string;    // e.g. "0" (Standard < 25 ppm)
  h2s: string;   // e.g. "0" (Standard < 10 ppm)
  testedAt?: string;
  testerName?: string;
  meterModel?: string;
}

export interface RiskMatrixScore {
  probability: number; // 1-5
  severity: number;    // 1-5
  score: number;       // 1-25
  level: 'low' | 'medium' | 'high' | 'extreme';
}

export interface PermitRecord {
  id: string; // e.g. "PTW-2026-001"
  permitNumber: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  status: PermitStatus;

  // Section 1: General Info
  applicantName: string;
  applicantRole: string;
  company: string;
  phone: string;
  location: string;
  workDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  workerCount: number;

  // Section 2: Risk Types
  riskTypes: string[];
  otherRiskDetails?: string;

  // Section 3: Job Details & Safety Checklist
  jobDescription: string;
  workerRoster: string;
  selectedPPE: string[];
  safetyControls: string[];
  gasReadings?: GasMeasurement;
  preWorkMeasurements?: string;

  // Section 4: Approvals & Sign-off
  complianceAgreed: boolean;
  applicantSignature: string;
  safetyOfficerName: string;
  approvalDecision: 'approved' | 'conditional' | 'rejected' | 'pending';
  safetyOfficerRemarks?: string;
  attachmentLinks?: string;

  // Risk Score
  riskMatrix: RiskMatrixScore;

  // Metadata
  createdByEmail?: string;
}

export interface MultilingualText {
  th: string;
  zh: string;
  my: string;
}

export interface FormOption {
  id: string;
  label: string;
  labelZh?: string;
  labelMy?: string;
  description?: string;
}

export interface FormQuestion {
  id: string;
  title: string;
  titleZh?: string;
  titleMy?: string;
  description?: string;
  descriptionZh?: string;
  descriptionMy?: string;
  type: QuestionType;
  required: boolean;
  options?: string[];
  optionsZh?: string[];
  optionsMy?: string[];
  safetyOfficerTip?: string;
  safetyOfficerTipZh?: string;
  safetyOfficerTipMy?: string;
  legalReference?: string;
  categoryTag?: string;
  googleFormEquivalent: string;
  googleFormEquivalentZh?: string;
  googleFormEquivalentMy?: string;
}

export interface FormSection {
  id: string;
  sectionNumber: number;
  title: string;
  titleZh?: string;
  titleMy?: string;
  description: string;
  descriptionZh?: string;
  descriptionMy?: string;
  questions: FormQuestion[];
}

export interface RiskCategoryConfig {
  id: string;
  nameTh: string;
  nameEn: string;
  nameZh: string;
  nameMy: string;
  icon: string;
  badgeColor: string;
  standard: string;
  essentialPPE: string[];
  essentialPPEZh?: string[];
  essentialPPEMy?: string[];
  mandatoryChecks: string[];
  mandatoryChecksZh?: string[];
  mandatoryChecksMy?: string[];
}
