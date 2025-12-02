import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const { content } = useContent();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      // Reset after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Info Side */}
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Let's Build The Future.</h1>
            <p className="text-slate-400 text-lg mb-12">
              Ready to start your project? Have a question about our services? Reach out and our team will get back to you within 24 hours.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-white/5 text-neon-cyan">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Email Us</h3>
                  <p className="text-slate-400">{content.general.contactEmail}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-white/5 text-neon-purple">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Call Us</h3>
                  <p className="text-slate-400">{content.general.contactPhone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-white/5 text-neon-pink">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Visit HQ</h3>
                  <p className="text-slate-400 max-w-xs">{content.general.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="glass-panel p-8 rounded-3xl border border-white/5">
            <h2 className="text-2xl font-display font-bold mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">First Name</label>
                  <input required type="text" className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-cyan transition-colors" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Last Name</label>
                  <input required type="text" className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-cyan transition-colors" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Email Address</label>
                <input required type="email" className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-cyan transition-colors" placeholder="john@company.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Message</label>
                <textarea required rows={4} className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-cyan transition-colors" placeholder="Tell us about your project..."></textarea>
              </div>

              <button 
                type="submit" 
                disabled={formStatus !== 'idle'}
                className="w-full py-4 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-lg text-white font-bold shadow-lg hover:shadow-neon-cyan/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {formStatus === 'idle' ? (
                  <>Send Message <Send size={18} /></>
                ) : formStatus === 'submitting' ? (
                  'Sending...'
                ) : (
                  'Message Sent!'
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
