export type AppView = "landing" | "onboarding" | "app";
export type AppTab = "drop" | "chats" | "pro" | "privacy";

export interface DemoAccount {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: string;
  company: string;
  companyDomain: string;
  city: string;
  age: number;
  gradYear: number;
  college: string;
  elitmusId: string;
}

export interface DPDPConsent {
  matchingProfile: boolean;
  verifiedAlumniBadge: boolean;
  zeroAdsNoJobCrossover: boolean;
  updatedAt: string;
}

export interface ConsentLogEntry {
  id: string;
  timestamp: string;
  action: string;
  detail: string;
}

export interface CompatibilityDimension {
  label: string;
  score: number; // 0-100
  note: string;
}

export interface PromptPair {
  q1: string;
  q1Answer: string;
  q2: string;
  q2Answer: string;
}

export interface MatchProfile {
  id: string;
  name: string;
  age: number;
  role: string;
  company: string;
  companyDomain: string;
  city: string;
  gradYear: 2020 | 2021 | 2022 | 2023;
  college: string;
  relocation: string;
  photoUrl: string;
  compatibilityScore: number;
  compatibilitySummary: string;
  compatibilityBreakdown: CompatibilityDimension[];
  about: string;
  lookingFor: string;
  prompts: PromptPair;
  sampleReplies: string[];
}

export interface ChatMessage {
  id: string;
  sender: "me" | "match" | "system";
  text: string;
  timestamp: string;
}

export interface ChatThread {
  id: string;
  matchId: string;
  matchName: string;
  matchRole: string;
  matchCity: string;
  matchGradYear: number;
  matchPhotoUrl: string;
  status: "active" | "closed";
  closedReason?: string;
  closedAt?: string;
  unlockedAt: string;
  sharedPrompts: {
    q1: string;
    myA1: string;
    theirA1: string;
    q2: string;
    myA2: string;
    theirA2: string;
  };
  messages: ChatMessage[];
}

export interface MixerEvent {
  id: string;
  city: string;
  neighborhood: string;
  title: string;
  dateLabel: string;
  seatsTotal: number;
  seatsRemaining: number;
  priceInr: number;
  cohorts: string;
}

export interface KoraState {
  view: AppView;
  activeTab: AppTab;
  account: DemoAccount | null;
  onboardingStep: 1 | 2 | 3;
  verifiedElitmus: boolean;
  verifiedAt: string | null;
  dpdpConsent: DPDPConsent;
  consentLog: ConsentLogEntry[];
  shieldedDomains: string[];
  shieldedColleges: string[];
  dropBatchOffset: number;
  passedMatchIds: string[];
  unlockedMatchIds: string[];
  threads: ChatThread[];
  selectedThreadId: string | null;
  isPro: boolean;
  rsvpedMixerIds: string[];
  erasedBanner: boolean;
}
