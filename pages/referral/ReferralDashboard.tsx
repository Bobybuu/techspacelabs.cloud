
import React, { useState } from 'react';
import { useReferral } from '../../context/ReferralContext';
import { 
  Users, DollarSign, TrendingUp, Copy, Share2, 
  Award, Briefcase, ChevronRight, Activity 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';

const ReferralDashboard: React.FC = () => {
  const { currentUser, registerSale, getDownline, commissions, sales, config } = useReferral();
  const [saleAmount, setSaleAmount] = useState(1000);
  const [activeTab, setActiveTab] = useState<'overview' | 'network' | 'sales'>('overview');

  if (!currentUser) return <div className="p-10 text-center text-white">Please login.</div>;

  const myCommissions = commissions.filter(c => c.userId === currentUser.id);
  const mySales = sales.filter(s => s.userId === currentUser.id);
  const downline = getDownline(currentUser.id);

  // Prepare Chart Data
  const chartData = myCommissions.slice(0, 7).reverse().map((c, i) => ({
    name: `Sale ${i+1}`,
    amount: c.amount,
    type: c.type
  }));

  const copyLink = () => {
    navigator.clipboard.writeText(`https://techspace.com/ref/${currentUser.referralCode}`);
    alert('Referral Link Copied!');
  };

  const simulateSale = () => {
    registerSale(currentUser.id, saleAmount, "Enterprise Software License");
    alert(`Sale of $${saleAmount} registered! Commission calculated.`);
  };

  // Calculate Next Milestone
  const salesCount = currentUser.totalSalesCount;
  let nextTierText = "Max Tier Reached!";
  let progress = 100;
  
  if (salesCount < config.direct.tier1_limit) {
    nextTierText = `${config.direct.tier1_limit - salesCount} sales to Tier 2 (15%)`;
    progress = (salesCount / config.direct.tier1_limit) * 100;
  } else if (salesCount < config.direct.tier2_limit) {
    nextTierText = `${config.direct.tier2_limit - salesCount} sales to Top Tier (20%)`;
    progress = ((salesCount - config.direct.tier1_limit) / (config.direct.tier2_limit - config.direct.tier1_limit)) * 100;
  }

  const isMentorQualified = currentUser.totalSalesCount >= config.mentorship.qualification_threshold;

  return (
    <div className="pt-10 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
           <div className="flex items-center gap-2 mb-2">
             <span className="px-3 py-1 bg-neon-cyan text-black font-bold text-xs rounded-full uppercase tracking-wider">
               {currentUser.role}
             </span>
             {!isMentorQualified && (
               <span className="px-3 py-1 bg-gray-700 text-slate-300 font-bold text-xs rounded-full uppercase tracking-wider">
                 Mentorship Locked
               </span>
             )}
              {isMentorQualified && (
               <span className="px-3 py-1 bg-neon-purple text-white font-bold text-xs rounded-full uppercase tracking-wider">
                 Mentor Qualified
               </span>
             )}
           </div>
           <h1 className="text-3xl font-display font-bold text-white">Partner Dashboard</h1>
           <p className="text-slate-400">Welcome back, {currentUser.name}</p>
        </div>
        
        <div className="flex gap-3">
           <button onClick={copyLink} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-slate-300">
             <Copy size={16} /> <span className="hidden sm:inline">Copy Link</span>
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-neon-purple text-white rounded-lg hover:bg-neon-purple/80 transition-colors shadow-lg shadow-neon-purple/20">
             <Share2 size={16} /> Invite
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
           <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
             <DollarSign size={64} className="text-neon-cyan" />
           </div>
           <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Total Earnings</p>
           <h3 className="text-3xl font-bold text-white mt-2">${currentUser.totalCommissionEarned.toLocaleString()}</h3>
           <div className="mt-4 flex items-center text-xs text-green-400">
             <TrendingUp size={14} className="mr-1" /> +12% this month
           </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
           <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
             <Briefcase size={64} className="text-neon-purple" />
           </div>
           <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Total Sales</p>
           <h3 className="text-3xl font-bold text-white mt-2">{currentUser.totalSalesCount}</h3>
           <p className="text-xs text-slate-500 mt-2">Vol: ${currentUser.totalSalesVolume.toLocaleString()}</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
           <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
             <Activity size={64} className="text-pink-500" />
           </div>
           <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Current Tier</p>
           <h3 className="text-3xl font-bold text-white mt-2">
             {currentUser.totalSalesCount > config.direct.tier2_limit ? '20%' : currentUser.totalSalesCount > config.direct.tier1_limit ? '15%' : '10%'}
           </h3>
           <div className="w-full bg-white/10 h-1.5 mt-4 rounded-full overflow-hidden">
             <div className="bg-gradient-to-r from-neon-cyan to-neon-purple h-full rounded-full" style={{ width: `${progress}%` }}></div>
           </div>
           <p className="text-xs text-slate-400 mt-2">{nextTierText}</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
           <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
             <Users size={64} className="text-yellow-400" />
           </div>
           <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Mentee Network</p>
           <h3 className="text-3xl font-bold text-white mt-2">{downline.length}</h3>
           <p className="text-xs text-slate-500 mt-2">Active Mentees</p>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="flex gap-6 border-b border-white/5 mb-8">
         <button onClick={() => setActiveTab('overview')} className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'overview' ? 'text-neon-cyan border-b-2 border-neon-cyan' : 'text-slate-400 hover:text-white'}`}>Overview</button>
         <button onClick={() => setActiveTab('network')} className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'network' ? 'text-neon-cyan border-b-2 border-neon-cyan' : 'text-slate-400 hover:text-white'}`}>My Network</button>
         <button onClick={() => setActiveTab('sales')} className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'sales' ? 'text-neon-cyan border-b-2 border-neon-cyan' : 'text-slate-400 hover:text-white'}`}>Sales History</button>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Chart Section */}
          <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-6">Commission History</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b'}} />
                  <YAxis stroke="#64748b" tick={{fill: '#64748b'}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }}
                    itemStyle={{ color: '#06b6d4' }}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#06b6d4" fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Simulator */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent">
            <h3 className="text-lg font-bold text-white mb-2">Simulate New Sale</h3>
            <p className="text-sm text-slate-400 mb-6">Test the commission engine instantly.</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase font-bold text-slate-500">Sale Amount ($)</label>
                <input 
                  type="number" 
                  value={saleAmount}
                  onChange={(e) => setSaleAmount(Number(e.target.value))}
                  className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-cyan"
                />
              </div>
              <button 
                onClick={simulateSale}
                className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                <Award size={18} /> Record Sale
              </button>
              <div className="text-xs text-slate-500 text-center mt-2">
                *This adds a real record to the mock database.
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'network' && (
         <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
           {downline.length > 0 ? (
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead className="bg-white/5 text-xs uppercase font-bold text-slate-400">
                   <tr>
                     <th className="p-4">Mentee Name</th>
                     <th className="p-4">Join Date</th>
                     <th className="p-4">Sales Count</th>
                     <th className="p-4">Volume</th>
                     <th className="p-4">Commission for You</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                   {downline.map(d => (
                     <tr key={d.id} className="hover:bg-white/5 transition-colors">
                       <td className="p-4 font-medium text-white flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-neon-purple/20 flex items-center justify-center text-neon-purple text-xs">
                           {d.name.charAt(0)}
                         </div>
                         {d.name}
                       </td>
                       <td className="p-4 text-slate-400 text-sm">{d.joinDate}</td>
                       <td className="p-4 text-white font-mono">{d.totalSalesCount}</td>
                       <td className="p-4 text-slate-400 text-sm">${d.totalSalesVolume.toLocaleString()}</td>
                       <td className="p-4 text-neon-cyan font-bold">
                         {/* Estimate earnings from this mentee (simplified logic for UI) */}
                         ${(d.totalSalesVolume * (d.totalSalesCount <= 20 ? 0.07 : 0.035)).toLocaleString(undefined, {maximumFractionDigits: 0})}
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           ) : (
             <div className="p-12 text-center">
               <Users size={48} className="mx-auto text-slate-600 mb-4" />
               <h3 className="text-xl font-bold text-white">No Mentees Yet</h3>
               <p className="text-slate-400 mt-2">Share your referral link to start building your team.</p>
             </div>
           )}
         </div>
      )}

      {activeTab === 'sales' && (
        <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead className="bg-white/5 text-xs uppercase font-bold text-slate-400">
                 <tr>
                   <th className="p-4">Date</th>
                   <th className="p-4">Product</th>
                   <th className="p-4 text-right">Amount</th>
                   <th className="p-4 text-right">Commission</th>
                   <th className="p-4 text-right">Type</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {myCommissions.map(comm => (
                   <tr key={comm.id} className="hover:bg-white/5 transition-colors">
                     <td className="p-4 text-slate-400 text-sm">{comm.date}</td>
                     <td className="p-4 text-white font-medium">Software License #{comm.sourceSaleId.slice(-4)}</td>
                     <td className="p-4 text-right text-slate-300">${(comm.amount / comm.percentageUsed).toLocaleString()}</td>
                     <td className="p-4 text-right text-neon-cyan font-bold">+${comm.amount.toLocaleString()}</td>
                     <td className="p-4 text-right">
                       <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                         comm.type === 'direct' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'
                       }`}>
                         {comm.type === 'direct' ? 'Direct Sale' : 'Mentorship'}
                       </span>
                     </td>
                   </tr>
                 ))}
                 {myCommissions.length === 0 && (
                   <tr>
                     <td colSpan={5} className="p-8 text-center text-slate-500">No sales records found.</td>
                   </tr>
                 )}
               </tbody>
             </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default ReferralDashboard;
