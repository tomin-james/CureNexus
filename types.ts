export interface Researcher {
  id: string;
  name: string;
  title: string;
  institution: string;
  institutionLogoUrl?: string; // New: For credibility
  avatarUrl: string;
  verified: boolean;
}

export interface BudgetItem {
  category: string;
  amount: number;
}

export interface Project {
  id: string;
  title: string;
  brief: string;
  // New fields for Family Mode
  simpleTitle: string;
  simpleBrief: string;
  
  // New field for AI Generation
  imagePrompt: string;

  category: 'Gene Therapy' | 'Drug Repurposing' | 'Basic Science' | 'Clinical Trial' | 'Disease Modeling';
  imageUrl: string;
  researcher: Researcher;
  fundingGoal: number;
  fundingRaised: number;
  backersCount: number;
  // Replaced daysLeft with milestone progress metrics
  milestonesCompleted: number;
  totalMilestones: number; 
  milestones: string[];
  // New fields for the detail view
  impactStatement?: string; 
  budgetBreakdown?: BudgetItem[];
}

export interface Stat {
  label: string;
  value: string;
  subtext: string;
}