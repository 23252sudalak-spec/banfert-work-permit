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
