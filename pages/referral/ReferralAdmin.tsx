
import React from 'react';
import { useReferral } from '../../context/ReferralContext';
import { Settings, Save, Users, TrendingUp, AlertCircle } from 'lucide-react';

const ReferralAdmin: React.FC = () => {
  const { config, updateConfig, users, commissions, sales } = useReferral();
  const [localConfig, setLocalConfig] = React.useState(config);

  const handleSave = () => {
    updateConfig(localConfig);
    alert('Commission structure updated successfully.');
  };

  // Stats
  const totalRevenue = sales.reduce((acc, s) => acc + s.amount, 0);
  const totalPayout = commissions.reduce((acc, c) => acc + c.amount, 0);
  const profitMargin = ((totalRevenue - totalPayout) / totalRevenue * 100).toFixed(1);

  return (
    <div className="pt-10 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Partner System Admin</h1>
          <p className="text-slate-400">Manage commission tiers and global settings.</p>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 bg-neon-cyan text-black font-bold rounded-lg hover:bg-white transition-colors">
          <Save size={18} /> Save Config
        </button>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass-panel p-6 rounded-2xl border border-white/5">
           <div className="flex items-center justify-between mb-2">
             <span className="text-slate-400 uppercase text-xs font-bold tracking-wider">Total Revenue</span>
             <TrendingUp className="text-green-500" size={20} />
           </div>
           <h3 className="text-3xl font-bold text-white">${totalRevenue.toLocaleString()}</h3>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-white/5">
           <div className="flex items-center justify-between mb-2">
             <span className="text-slate-400 uppercase text-xs font-bold tracking-wider">Total Commissions Paid</span>
             <Users className="text-neon-purple" size={20} />
           </div>
           <h3 className="text-3xl font-bold text-white">${totalPayout.toLocaleString()}</h3>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-white/5">
           <div className="flex items-center justify-between mb-2">
             <span className="text-slate-400 uppercase text-xs font-bold tracking-wider">Net Margin</span>
             <AlertCircle className="text-neon-cyan" size={20} />
           </div>
           <h3 className="text-3xl font-bold text-white">{isNaN(Number(profitMargin)) ? '100' : profitMargin}%</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Direct Commission Config */}
        <div className="glass-panel p-8 rounded-2xl border border-white/5">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Settings size={20} className="text-neon-cyan" /> Direct Sales Rules
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="flex justify-between text-sm text-slate-400 mb-2">
                <span>Tier 1 Rate (First {localConfig.direct.tier1_limit} Sales)</span>
                <span className="text-neon-cyan font-bold">{(localConfig.direct.tier1_rate * 100).toFixed(0)}%</span>
              </label>
              <input 
                type="range" min="0" max="0.5" step="0.01"
                value={localConfig.direct.tier1_rate}
                onChange={(e) => setLocalConfig({...localConfig, direct: {...localConfig.direct, tier1_rate: parseFloat(e.target.value)}})}
                className="w-full accent-neon-cyan"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm text-slate-400 mb-2">
                <span>Tier 2 Rate (Sales {localConfig.direct.tier1_limit + 1}-{localConfig.direct.tier2_limit})</span>
                <span className="text-neon-cyan font-bold">{(localConfig.direct.tier2_rate * 100).toFixed(0)}%</span>
              </label>
              <input 
                type="range" min="0" max="0.5" step="0.01"
                value={localConfig.direct.tier2_rate}
                onChange={(e) => setLocalConfig({...localConfig, direct: {...localConfig.direct, tier2_rate: parseFloat(e.target.value)}})}
                className="w-full accent-neon-cyan"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm text-slate-400 mb-2">
                <span>Tier 3 Rate (Sales {localConfig.direct.tier2_limit}+)</span>
                <span className="text-neon-cyan font-bold">{(localConfig.direct.tier3_rate * 100).toFixed(0)}%</span>
              </label>
              <input 
                type="range" min="0" max="0.5" step="0.01"
                value={localConfig.direct.tier3_rate}
                onChange={(e) => setLocalConfig({...localConfig, direct: {...localConfig.direct, tier3_rate: parseFloat(e.target.value)}})}
                className="w-full accent-neon-cyan"
              />
            </div>
          </div>
        </div>

        {/* Mentorship Config */}
        <div className="glass-panel p-8 rounded-2xl border border-white/5">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Users size={20} className="text-neon-purple" /> Mentorship Rules
          </h2>
          
          <div className="space-y-6">
            <div className="p-4 bg-white/5 rounded-lg border border-white/10 mb-4">
              <label className="block text-xs uppercase font-bold text-slate-500 mb-1">Qualification Threshold</label>
              <div className="flex items-center gap-2">
                <input 
                   type="number"
                   value={localConfig.mentorship.qualification_threshold}
                   onChange={(e) => setLocalConfig({...localConfig, mentorship: {...localConfig.mentorship, qualification_threshold: parseInt(e.target.value)}})}
                   className="bg-transparent border-b border-white/20 text-white font-bold w-16 focus:outline-none focus:border-neon-purple"
                />
                <span className="text-sm text-slate-400">Total Sales required to become a Mentor</span>
              </div>
            </div>

            <div>
              <label className="flex justify-between text-sm text-slate-400 mb-2">
                <span>Initial Override (First {localConfig.mentorship.tier1_limit} mentee sales)</span>
                <span className="text-neon-purple font-bold">{(localConfig.mentorship.tier1_rate * 100).toFixed(1)}%</span>
              </label>
              <input 
                type="range" min="0" max="0.2" step="0.005"
                value={localConfig.mentorship.tier1_rate}
                onChange={(e) => setLocalConfig({...localConfig, mentorship: {...localConfig.mentorship, tier1_rate: parseFloat(e.target.value)}})}
                className="w-full accent-neon-purple"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm text-slate-400 mb-2">
                <span>Standard Override (After {localConfig.mentorship.tier1_limit} mentee sales)</span>
                <span className="text-neon-purple font-bold">{(localConfig.mentorship.tier2_rate * 100).toFixed(1)}%</span>
              </label>
              <input 
                type="range" min="0" max="0.2" step="0.005"
                value={localConfig.mentorship.tier2_rate}
                onChange={(e) => setLocalConfig({...localConfig, mentorship: {...localConfig.mentorship, tier2_rate: parseFloat(e.target.value)}})}
                className="w-full accent-neon-purple"
              />
            </div>
          </div>
        </div>

      </div>

      {/* User Table */}
      <div className="mt-10 glass-panel rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5">
           <h3 className="text-lg font-bold text-white">All Active Partners</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-xs uppercase font-bold text-slate-400">
              <tr>
                <th className="p-4">Partner</th>
                <th className="p-4">Role</th>
                <th className="p-4">Mentor</th>
                <th className="p-4 text-right">Total Sales</th>
                <th className="p-4 text-right">Total Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-white">{user.name}</div>
                    <div className="text-xs text-slate-500">{user.email}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      user.role === 'admin' ? 'bg-red-500/20 text-red-400' : 
                      user.role === 'salesperson' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-700 text-gray-300'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 text-sm">
                    {users.find(u => u.id === user.mentorId)?.name || '-'}
                  </td>
                  <td className="p-4 text-right text-white font-mono">
                    {user.totalSalesCount}
                  </td>
                  <td className="p-4 text-right text-neon-cyan font-bold">
                    ${user.totalCommissionEarned.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReferralAdmin;
