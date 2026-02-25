export interface TutorialStep {
  id: string;
  sectionId: string;
  sectionTitle: string;
  title: string;
  optional?: boolean;
  order: number;
}

export interface TutorialSection {
  id: string;
  title: string;
  steps: TutorialStep[];
}

export interface UserProgress {
  userId: string;
  completedSteps: string[];
  updatedAt: Date;
}

export interface DemoPage {
  id: string;
  html: string;
  prompt: string;
  userId?: string;
  createdAt: Date;
  expiresAt: Date;
}
