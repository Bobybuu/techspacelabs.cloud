import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import * as Icons from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import ServiceInquiryModal from '../components/ServiceInquiryModal';
import { Service } from '../types';

const Services: React.FC = () => {
  const { content } = useContent();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const getIcon = (iconName: string) => {
    // @ts-ignore
    const Icon = Icons[iconName] || Icons.Cpu;
    return <Icon className="w-12 h-12 text-neon-cyan" />;
  };

  return (
    <div className="pt-10 pb-24">
      <ServiceInquiryModal 
        service={selectedService} 
        isOpen={!!selectedService} 
        onClose={() => setSelectedService(null)} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Our Services</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Comprehensive digital solutions engineered for growth, scalability, and impact.
          </p>
          <p className="text-sm text-neon-cyan mt-4 font-semibold uppercase tracking-wider">
            Select a service to get a quote
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {content.services.map((service, index) => (
            <button 
              key={service.id} 
              onClick={() => setSelectedService(service)}
              className={`flex flex-col md:flex-row gap-8 items-center text-left w-full group ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
               <div className="flex-1 p-8 rounded-3xl glass-panel border border-white/5 w-full transition-all duration-300 hover:border-neon-cyan/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                  <div className="mb-6 p-4 rounded-xl bg-white/5 inline-block border border-white/10 group-hover:bg-neon-cyan/10 transition-colors">
                    {getIcon(service.icon)}
                  </div>
                  <h2 className="text-3xl font-display font-bold mb-4 text-white group-hover:text-neon-cyan transition-colors">{service.title}</h2>
                  <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <li key={i} className="flex items-center gap-3 text-slate-300">
                        <CheckCircle2 className="text-neon-purple w-5 h-5" />
                        <span>Advanced feature implementation</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center text-neon-cyan font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Click to Inquire
                  </div>
               </div>
               <div className="flex-1 w-full h-64 md:h-96 rounded-3xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 group-hover:opacity-0 transition-opacity duration-500 z-10 pointer-events-none"></div>
                  <img 
                    src={`https://picsum.photos/seed/${service.id}/800/600`} 
                    alt={service.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
               </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;