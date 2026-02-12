
export type AppView = 'home' | 'names' | 'logo' | 'content' | 'sentiment' | 'design' | 'consultant';

export interface BrandInfo {
  keywords: string;
  industry: string;
  tone: string;
  targetAudience: string;
}

export interface DesignSystem {
  palette: string[];
  fonts: {
    heading: string;
    body: string;
  };
  description: string;
}

export interface SentimentResult {
  tone: string;
  score: number;
  suggestions: string[];
  rewrites: string[];
}
