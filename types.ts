
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
  category: string;
  buttonText: string;
}

export interface SiteContent {
  general: {
    brandName: string;
    tagline: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    logoUrl: string;
    socialLinks: {
      instagram: string;
      linkedin: string;
      twitter: string;
      facebook: string;
    };
  };
  pages: {
    home: {
      heroTitle: string;
      heroSubtitle: string;
      heroCta: string;
      heroImage: string;
    };
    about: {
      story: string;
      mission: string;
      vision: string;
    };
  };
  services: Service[];
  team: TeamMember[];
  testimonials: Testimonial[];
  blog: BlogPost[];
  tools: Tool[];
}

export interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => void;
  resetContent: () => void;
  isAdmin: boolean;
  toggleAdmin: () => void;
}

// --- REFERRAL SYSTEM TYPES ---

export type UserRole = 'admin' | 'salesperson' | 'mentee';

export interface ReferralUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  mentorId: string | null; // ID of the person who referred them
  referralCode: string;
  joinDate: string;
  totalSalesCount: number;
  totalSalesVolume: number;
  totalCommissionEarned: number;
}

export interface Sale {
  id: string;
  userId: string; // Who made the sale
  amount: number;
  date: string;
  productName: string;
}

export interface Commission {
  id: string;
  userId: string; // Who gets the money
  sourceSaleId: string; // Which sale generated this
  sourceUserId: string; // Who made the sale (could be self or mentee)
  amount: number;
  type: 'direct' | 'mentorship_tier_1' | 'mentorship_tier_2';
  percentageUsed: number;
  date: string;
}

export interface CommissionConfig {
  direct: {
    tier1_limit: number; // 20 sales
    tier1_rate: number;  // 10%
    tier2_limit: number; // 100 sales
    tier2_rate: number;  // 15%
    tier3_rate: number;  // 20%
  };
  mentorship: {
    qualification_threshold: number; // Mentor needs 100 sales
    tier1_limit: number; // First 20 sales of mentee
    tier1_rate: number;  // 7%
    tier2_rate: number;  // 3.5%
  };
}

export interface ReferralContextType {
  currentUser: ReferralUser | null;
  users: ReferralUser[];
  sales: Sale[];
  commissions: Commission[];
  config: CommissionConfig;
  login: (email: string) => void;
  registerUser: (name: string, email: string, referralCode?: string) => void;
  registerSale: (userId: string, amount: number, product: string) => void;
  updateConfig: (newConfig: CommissionConfig) => void;
  getDownline: (userId: string) => ReferralUser[];
}