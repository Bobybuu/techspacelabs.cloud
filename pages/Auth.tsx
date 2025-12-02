
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useReferral } from '../context/ReferralContext';
import { User, Briefcase, Mail, Lock, ArrowRight, CheckSquare } from 'lucide-react';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, registerUser } = useReferral();

  // "login" or "register" based on URL path
  const isRegister = location.pathname === '/register';
  
  // "client" or "partner"
  const [userType, setUserType] = useState<'client' | 'partner'>('client');
  
  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Just for visual, logic uses email mainly for partner mock
  const [name, setName] = useState('');
  
  // Checkboxes
  const [termsAgreed, setTermsAgreed] = useState(true);
  const [newsletterAgreed, setNewsletterAgreed] = useState(true);
  
  // UI State
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!termsAgreed) {
      alert("You must agree to the Terms and Conditions.");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      if (userType === 'client') {
        // Client Logic
        if (isRegister) {
          // Simulate Client Registration
          alert(`Welcome ${name}! Your client account has been created.`);
        } else {
          // Simulate Client Login
          alert("Welcome back! Redirecting to home.");
        }
        // Client always goes to Home
        navigate('/');
      } else {
        // Partner Logic
        if (isRegister) {
          // Partner Registration
          registerUser(name, email);
          alert("Partner account created! Accessing dashboard.");
          navigate('/partners');
        } else {
          // Partner Login
          // In this mock system, we just check email validity in context
          login(email);
          // If login function doesn't throw, we assume success or handled by context alert
          // Check if login actually set a user? For now just redirect to dashboard 
          // where dashboard will show login state or error
          navigate('/partners');
        }
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md glass-panel border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
        
        {/* Header Tabs */}
        <div className="flex border-b border-white/10">
          <button 
            onClick={() => setUserType('client')}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${userType === 'client' ? 'bg-neon-cyan/10 text-neon-cyan border-b-2 border-neon-cyan' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <User size={16} /> Customer
          </button>
          <button 
            onClick={() => setUserType('partner')}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${userType === 'partner' ? 'bg-neon-purple/10 text-neon-purple border-b-2 border-neon-purple' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Briefcase size={16} /> Partner
          </button>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-white mb-2">
              {isRegister ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-slate-400 text-sm">
              {isRegister 
                ? (userType === 'client' ? 'Join us to manage your projects.' : 'Join the partner network and earn.')
                : (userType === 'client' ? 'Login to access your dashboard.' : 'Access your sales dashboard.')
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {isRegister && (
               <div className="space-y-1">
                 <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                 <div className="relative">
                   <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                   <input 
                     required
                     type="text" 
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-neon-cyan transition-colors"
                     placeholder="John Doe"
                   />
                 </div>
               </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-neon-cyan transition-colors"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password field (Mock) - Always show for realism */}
             <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-neon-cyan transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${termsAgreed ? 'bg-neon-cyan border-neon-cyan' : 'border-slate-500 group-hover:border-white'}`}>
                  {termsAgreed && <CheckSquare size={12} className="text-black" />}
                </div>
                <input type="checkbox" className="hidden" checked={termsAgreed} onChange={(e) => setTermsAgreed(e.target.checked)} />
                <span className="text-xs text-slate-400 group-hover:text-white transition-colors">Agree to Terms & Conditions</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${newsletterAgreed ? 'bg-neon-cyan border-neon-cyan' : 'border-slate-500 group-hover:border-white'}`}>
                  {newsletterAgreed && <CheckSquare size={12} className="text-black" />}
                </div>
                <input type="checkbox" className="hidden" checked={newsletterAgreed} onChange={(e) => setNewsletterAgreed(e.target.checked)} />
                <span className="text-xs text-slate-400 group-hover:text-white transition-colors">Join Email List</span>
              </label>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all ${
                userType === 'client' 
                  ? 'bg-neon-cyan text-black hover:bg-white hover:shadow-neon-cyan/30' 
                  : 'bg-neon-purple text-white hover:bg-purple-400 hover:shadow-neon-purple/30'
              } ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
            >
              {isLoading ? 'Processing...' : (
                <>
                  {isRegister ? 'Create Account' : 'Login Now'} 
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
              <button 
                onClick={() => navigate(isRegister ? '/login' : '/register')}
                className={`font-bold hover:underline ${userType === 'client' ? 'text-neon-cyan' : 'text-neon-purple'}`}
              >
                {isRegister ? "Login" : "Register"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
