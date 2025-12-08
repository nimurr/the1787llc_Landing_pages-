
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  ANALYSIS = 'ANALYSIS',
  VOICE_AGENT = 'VOICE_AGENT',
  LETTERS = 'LETTERS',
  BUSINESS_BLUEPRINT = 'BUSINESS_BLUEPRINT',
  CFPB_GUIDE = 'CFPB_GUIDE',
  FTC_GUIDE = 'FTC_GUIDE',
  RESOURCES = 'RESOURCES',
}

export interface CreditReportData {
  score: number;
  negativeItems: NegativeItem[];
  totalDebt: number;
  utilization: number;
  inquiries: number;
  ageOfHistory: string;
}

export interface NegativeItem {
  id: string;
  creditor: string;
  type: string; // 'Late Payment', 'Collection', 'Charge-off'
  amount?: number;
  dateReported: string;
  status: string;
}

export interface FundabilityScore {
  numeric: number;
  tierLabel: string; // 'Highly Fundable', 'Fundable with Adjustments', etc.
  summary: string;
}

export interface DisputeTemplate {
  id: string;
  name: string;
  content: string; // Template with placeholders like {{NAME}}, {{ACCOUNT}}
  purpose?: string; // Description of when to use this letter
  legalBasis?: string; // e.g. "15 U.S.C. § 1681"
}

export interface GeneratedLetter {
  id: string;
  templateName: string;
  content: string;
  generatedAt: string;
}

export interface BreachAnalysis {
  isEquifaxVictimLikely: boolean;
  isExperianVictimLikely: boolean;
  identifiedBreaches: string[]; // List of any companies/bureaus involved
  reasoning: string;
  recommendedActions: string[];
}

// Gemini Types for JSON Schema
export interface AnalysisResponseSchema {
  executiveSummary: string; // New: Headline summary
  fundabilityScore: FundabilityScore; // New: Object with score/tier
  riskGrade: string; // New: 'A', 'B', 'C', 'D', 'F'
  estimatedFundingCapacity: string; // New: e.g. "$50k - $80k"
  startupFundingCapacity: string; // New: Business funding with PG
  strengths: string[]; // New: What underwriters like
  weaknesses: string[]; // New: What underwriters dislike
  
  // Legacy/Shared fields
  recommendations: string[];
  cleanUpStrategy: string;
  auStrategy: string;
  creditBuilderStrategy?: string; 
  sequencing: string[];
  breachAnalysis: BreachAnalysis;
  extractedCreditData: {
    score: number;
    totalDebt: number;
    utilization: number;
    inquiries: number;
    ageOfHistory: string;
    negativeItems: {
        creditor: string;
        type: string;
        amount: number;
        dateReported: string;
        status: string;
    }[];
  };
}
