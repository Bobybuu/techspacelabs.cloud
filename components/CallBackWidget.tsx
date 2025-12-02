
import React, { useState } from 'react';
import { Phone, X, Headset, PhoneCall } from 'lucide-react';

const CallBackWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'dialing' | 'connected'>('idle');

  const triggerVapiCall = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    setStatus('dialing');

    // --- VAPI.AI INTEGRATION PLACEHOLDER ---
    // In a real application, you would call your backend to initiate the call
    // to keep your Vapi Private Key secure.
    //
    // Example Backend Code (Node.js):
    // await fetch('https://api.vapi.ai/call/phone', {
    //   method: 'POST',
    //   headers: { 
    //     'Authorization': `Bearer ${process.env.VAPI_PRIVATE_KEY}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     customer: { number: phone },
    //     assistantId: "YOUR_ASSISTANT_ID",
    //     phoneNumberId: "YOUR_PHONE_NUMBER_ID"
    //   })
    // });
    
    console.log(`Initiating call to ${phone}...`);
    
    // Simulate connection delay
    setTimeout(() => {
      setStatus('connected');
      // Auto-close after 5 seconds of "connected" message
      setTimeout(() => {
        setIsOpen(false);
        setStatus('idle');
        setPhone('');
      }, 5000);
    }, 2500);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-16 h-16 bg-neon-cyan text-black rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-110 hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all duration-300"
        >
            {/* Ripple Animation Effects */}
            <span className="absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75 animate-ripple"></span>
            <span className="absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75 animate-ripple delay-1000"></span>
            
            <Phone className="w-8 h-8 relative z-10 fill-current" />
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:justify-end sm:px-6 pointer-events-none">
          {/* Backdrop for mobile focus */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px] pointer-events-auto sm:bg-transparent sm:backdrop-blur-none"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="pointer-events-auto bg-dark-card border border-white/10 w-full sm:w-96 rounded-t-2xl sm:rounded-2xl shadow-2xl p-6 relative animate-fade-in-up sm:mb-24">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
               <div className="w-12 h-12 rounded-full bg-neon-cyan/20 flex items-center justify-center">
                 <Headset className="text-neon-cyan w-6 h-6" />
               </div>
               <div>
                 <h3 className="text-white font-bold text-lg">Request a Call Back</h3>
                 <p className="text-xs text-slate-400">Speak with our experts</p>
               </div>
            </div>

            {status === 'idle' ? (
              <form onSubmit={triggerVapiCall}>
                <p className="text-slate-300 text-sm mb-4">
                  Enter your number to receive a call from our team to answer your questions.
                </p>
                
                <div className="space-y-4">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+254 700 000 000"
                      className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-neon-cyan placeholder:text-slate-600"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-neon-cyan to-neon-purple text-white font-bold rounded-lg hover:shadow-lg hover:shadow-neon-cyan/25 transition-all flex items-center justify-center gap-2"
                  >
                    <PhoneCall size={18} /> Request Call Now
                  </button>
                </div>
              </form>
            ) : status === 'dialing' ? (
              <div className="text-center py-6">
                 <div className="relative w-20 h-20 mx-auto mb-4">
                    <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-neon-cyan rounded-full border-t-transparent animate-spin"></div>
                    <Phone className="absolute inset-0 m-auto text-white w-8 h-8" />
                 </div>
                 <h4 className="text-white font-bold text-lg animate-pulse">Dialing...</h4>
                 <p className="text-slate-400 text-sm mt-2">Please keep your phone nearby.</p>
              </div>
            ) : (
              <div className="text-center py-6">
                 <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <PhoneCall className="text-green-500 w-10 h-10" />
                 </div>
                 <h4 className="text-white font-bold text-lg">Call Initiated!</h4>
                 <p className="text-slate-400 text-sm mt-2">Connecting you now...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CallBackWidget;
