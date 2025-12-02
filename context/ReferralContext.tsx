
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ReferralUser, Sale, Commission, CommissionConfig, ReferralContextType } from '../types';

const ReferralContext = createContext<ReferralContextType | undefined>(undefined);

// Initial Configuration based on requirements
const DEFAULT_CONFIG: CommissionConfig = {
  direct: {
    tier1_limit: 20,
    tier1_rate: 0.10,
    tier2_limit: 100,
    tier2_rate: 0.15,
    tier3_rate: 0.20,
  },
  mentorship: {
    qualification_threshold: 100,
    tier1_limit: 20,
    tier1_rate: 0.07,
    tier2_rate: 0.035,
  }
};

// Mock Data Seeding
const MOCK_USERS: ReferralUser[] = [
  {
    id: 'u1',
    name: 'Top Leader (Admin)',
    email: 'admin@techspace.com',
    role: 'admin',
    mentorId: null,
    referralCode: 'TOP001',
    joinDate: '2023-01-01',
    totalSalesCount: 150,
    totalSalesVolume: 150000,
    totalCommissionEarned: 45000
  },
  {
    id: 'u2',
    name: 'Sarah Mentor',
    email: 'sarah@techspace.com',
    role: 'salesperson',
    mentorId: 'u1',
    referralCode: 'SARAH10',
    joinDate: '2023-06-01',
    totalSalesCount: 120, // Qualified for mentorship commissions
    totalSalesVolume: 120000,
    totalCommissionEarned: 22000
  },
  {
    id: 'u3',
    name: 'Mike Mentee',
    email: 'mike@techspace.com',
    role: 'mentee',
    mentorId: 'u2',
    referralCode: 'MIKE22',
    joinDate: '2024-01-15',
    totalSalesCount: 15, // Still in first tier
    totalSalesVolume: 15000,
    totalCommissionEarned: 1500
  },
  {
    id: 'u4',
    name: 'New Recruit',
    email: 'new@techspace.com',
    role: 'mentee',
    mentorId: 'u3', // Mentees of mentees test
    referralCode: 'NEW99',
    joinDate: '2024-10-01',
    totalSalesCount: 2,
    totalSalesVolume: 2000,
    totalCommissionEarned: 200
  }
];

export const ReferralProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<ReferralUser[]>(MOCK_USERS);
  const [sales, setSales] = useState<Sale[]>([]);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [config, setConfig] = useState<CommissionConfig>(DEFAULT_CONFIG);
  const [currentUser, setCurrentUser] = useState<ReferralUser | null>(null);

  // Login simulation
  const login = (email: string) => {
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
    } else {
      // For demo purposes, if user not found but trying to login as partner, we can optionally warn or auto-create.
      // But adhering to strict requirements, login should fail if not found.
      // However, to make the demo smoother:
      alert("User not found. Please register.");
    }
  };

  const registerUser = (name: string, email: string, referralCode?: string) => {
    // Check if exists
    if (users.find(u => u.email === email)) {
      alert("Email already registered. Logging you in.");
      login(email);
      return;
    }

    // Find mentor by code
    let mentorId: string | null = null;
    if (referralCode) {
      const mentor = users.find(u => u.referralCode === referralCode);
      if (mentor) mentorId = mentor.id;
    }

    const newUser: ReferralUser = {
      id: `u-${Date.now()}`,
      name,
      email,
      role: 'mentee', // Default starting role
      mentorId,
      referralCode: name.substring(0, 3).toUpperCase() + Math.floor(Math.random() * 1000),
      joinDate: new Date().toISOString().split('T')[0],
      totalSalesCount: 0,
      totalSalesVolume: 0,
      totalCommissionEarned: 0
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
  };

  const getDownline = (userId: string) => {
    return users.filter(u => u.mentorId === userId);
  };

  // CORE LOGIC: Register a sale and trigger commission waterfall
  const registerSale = (userId: string, amount: number, product: string) => {
    const seller = users.find(u => u.id === userId);
    if (!seller) return;

    // 1. Create Sale Record
    const newSale: Sale = {
      id: `s-${Date.now()}`,
      userId,
      amount,
      date: new Date().toISOString().split('T')[0],
      productName: product
    };
    setSales(prev => [newSale, ...prev]);

    // 2. Calculate Direct Commission
    let directRate = config.direct.tier1_rate;
    if (seller.totalSalesCount >= config.direct.tier2_limit) {
      directRate = config.direct.tier3_rate;
    } else if (seller.totalSalesCount >= config.direct.tier1_limit) {
      directRate = config.direct.tier2_rate;
    }

    const directCommissionAmount = amount * directRate;
    const directComm: Commission = {
      id: `c-${Date.now()}-d`,
      userId: seller.id,
      sourceSaleId: newSale.id,
      sourceUserId: seller.id,
      amount: directCommissionAmount,
      type: 'direct',
      percentageUsed: directRate,
      date: new Date().toISOString().split('T')[0]
    };
    
    // Update Seller Stats
    const updatedSeller = { 
      ...seller, 
      totalSalesCount: seller.totalSalesCount + 1,
      totalSalesVolume: seller.totalSalesVolume + amount,
      totalCommissionEarned: seller.totalCommissionEarned + directCommissionAmount
    };

    // 3. Calculate Mentorship (Upstream) Commissions
    const newCommissions = [directComm];
    let currentMentee = updatedSeller;
    let mentor = users.find(u => u.id === currentMentee.mentorId);
    let level = 1;

    // Recursive walk up the tree
    while (mentor && level <= 3) { // Cap recursion depth for safety
      
      // Rule: Mentor must have > 100 sales (qualification_threshold) to earn overrides
      if (mentor.totalSalesCount >= config.mentorship.qualification_threshold) {
        
        let mentorRate = config.mentorship.tier2_rate; // Default 3.5%
        // Rule: If mentee (the one who made sale) has <= 20 sales, mentor gets 7%
        if (updatedSeller.totalSalesCount <= config.mentorship.tier1_limit) {
          mentorRate = config.mentorship.tier1_rate;
        }

        const mentorCommAmount = amount * mentorRate;
        
        newCommissions.push({
          id: `c-${Date.now()}-m${level}`,
          userId: mentor.id,
          sourceSaleId: newSale.id,
          sourceUserId: seller.id,
          amount: mentorCommAmount,
          type: level === 1 ? 'mentorship_tier_1' : 'mentorship_tier_2',
          percentageUsed: mentorRate,
          date: new Date().toISOString().split('T')[0]
        });

        // Update Mentor Stats in state (we'll batch update users at the end)
        // Note: For simplicity in this mock, we just add the money, not sales count
        // In a real app, we'd update the specific mentor object in the users array
      }

      // Move up
      currentMentee = mentor;
      mentor = users.find(u => u.id === currentMentee.mentorId);
      level++;
    }

    setCommissions(prev => [...newCommissions, ...prev]);

    // Batch update users stats
    setUsers(prevUsers => prevUsers.map(u => {
      if (u.id === seller.id) return updatedSeller;
      
      // Find if this user got a commission
      const comm = newCommissions.find(c => c.userId === u.id && c.type !== 'direct');
      if (comm) {
        return {
          ...u,
          totalCommissionEarned: u.totalCommissionEarned + comm.amount
        };
      }
      return u;
    }));
  };

  const updateConfig = (newConfig: CommissionConfig) => {
    setConfig(newConfig);
  };

  return (
    <ReferralContext.Provider value={{ 
      currentUser, 
      users, 
      sales, 
      commissions, 
      config, 
      login, 
      registerUser,
      registerSale,
      updateConfig,
      getDownline
    }}>
      {children}
    </ReferralContext.Provider>
  );
};

export const useReferral = () => {
  const context = useContext(ReferralContext);
  if (context === undefined) {
    throw new Error('useReferral must be used within a ReferralProvider');
  }
  return context;
};