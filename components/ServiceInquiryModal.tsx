import React, { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import { Service } from '../types';

interface ServiceInquiryModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceInquiryModal: React.FC<ServiceInquiryModalProps> = ({ service, isOpen, onClose }) => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    details: ''
  });

  if (!isOpen || !service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      // Reset after success message is shown for a bit, or let user close
    }, 1500);
  };

  const handleClose = () => {
    if (formState === 'success') {
      setFormState('idle');
      setFormData({ name: '', email: '', phone: '', details: '' });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={handleClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-lg glass-panel border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(139,92,246,0.3)] animate-fade-in-up">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          {formState === 'success' ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
              <p className="text-slate-400 mb-8">
                We'll be in touch regarding <strong>{service.title}</strong> shortly.
              </p>
              <button 
                onClick={handleClose}
                className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-display font-bold text-white mb-2">
                Inquire about <span className="text-neon-cyan">{service.title}</span>
              </h2>
              <p className="text-slate-400 text-sm mb-6">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Name</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-cyan transition-colors"
                    placeholder="Your Name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Email</label>
                    <input 
                      required 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-cyan transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Phone Number</label>
                    <input 
                      required 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-cyan transition-colors"
                      placeholder="+254..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Project Details</label>
                  <textarea 
                    required 
                    rows={4}
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-cyan transition-colors"
                    placeholder="Tell us a bit about what you need..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={formState === 'submitting'}
                  className="w-full py-4 mt-2 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-lg text-white font-bold shadow-lg hover:shadow-neon-cyan/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {formState === 'submitting' ? 'Sending...' : (
                    <>Send Inquiry <Send size={18} /></>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceInquiryModal;