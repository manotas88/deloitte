export type View = 'dashboard' | 'strategy' | 'academy' | 'presales' | 'blog';

export type UserRole = 'external' | 'employee';

export interface User {
  username: string;
  role: UserRole;
}

export interface PolicyAlert {
  id: string;
  title: string;
  expirationDate: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  source: string;
  url?: string;
}

export interface TrainingModule {
  id: string;
  category: 'efficiency' | 'digital' | 'transparency';
  title: string;
  duration: string;
  level: 'Basic' | 'Advanced';
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  type: string;
  readTime: string;
  imageUrl: string;
}

export interface SimilarTender {
  title: string;
  budget: number;
  year: number;
  winner: string;
}

export interface TenderAnalysisResult {
  title: string;
  budget: number;
  deadline: string;
  durationMonths: number;
  requiredTechnologies: string[];
  riskSummary: string;
  similarTenders: SimilarTender[];
}

export interface Tender {
  id: string;
  code: string;
  title: string;
  budget: number;
  deadline: string;
  status: 'Open' | 'Closed' | 'Evaluation';
  goNoGoScore?: number;
}

export interface GoNoGoCriteria {
  id: string;
  question: string;
  weight: number; // 1-5
  score: number; // 0-10
  autoExplanation?: string;
}

export interface ProjectMetric {
  name: string;
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
}