import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { ArrowRight, Code2, Cpu, Globe, Rocket, Terminal } from 'lucide-react';
import * as Icons from 'lucide-react';
import ServiceInquiryModal from '../components/ServiceInquiryModal';
import { Service } from '../types';

const Home: React.FC = () => {
  const { content } = useContent();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const getIcon = (iconName: string) => {
    // @ts-ignore
    const Icon = Icons[iconName] || Icons.Cpu;
    return <Icon className="w-8 h-8 text-neon-cyan" />;
  };

  const techStack = [
    "REACT", "TYPESCRIPT", "NEXT.JS", "NODE", "PYTHON", "OPENAI", "AWS", "DOCKER", "KUBERNETES", "TAILWIND"
  ];

  return (
    <div className="flex flex-col">
      <ServiceInquiryModal 
        service={selectedService} 
        isOpen={!!selectedService} 
        onClose={() => setSelectedService(null)} 
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-dark-bg">
            {/* Abstract Background Shapes */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[128px] animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[128px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neon-cyan text-sm font-medium mb-6 animate-fade-in-up">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
            </span>
            Accepting new projects for Q4
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6 tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-400">
               {content.pages.home.heroTitle}
             </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}>
            {content.pages.home.heroSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}>
            <Link to="/contact" className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-neon-cyan transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] flex items-center gap-2 group">
              {content.pages.home.heroCta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/portfolio" className="px-8 py-4 glass-panel text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/10">
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-dark-bg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Our Expertise</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto rounded-full"></div>
            <p className="mt-4 text-slate-400">Click on any service to inquire instantly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.services.map((service) => (
              <button 
                key={service.id} 
                onClick={() => setSelectedService(service)}
                className="text-left p-8 rounded-2xl glass-panel border border-white/5 hover:border-neon-purple/50 transition-all duration-300 group hover:-translate-y-2 cursor-pointer w-full"
              >
                <div className="mb-6 p-3 rounded-lg bg-white/5 inline-block group-hover:bg-neon-purple/20 transition-colors">
                  {getIcon(service.icon)}
                </div>
                <h3 className="text-xl font-bold font-display mb-3 text-white group-hover:text-neon-cyan transition-colors">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <div className="py-12 bg-black border-y border-white/5 overflow-hidden">
         <div className="flex w-full">
            <div className="flex animate-marquee whitespace-nowrap">
              {/* First Copy */}
              <div className="flex items-center gap-16 mx-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {techStack.map((tech, index) => (
                  <span key={`1-${index}`} className="text-2xl font-bold text-slate-500">{tech}</span>
                ))}
              </div>
              {/* Second Copy (for loop) */}
              <div className="flex items-center gap-16 mx-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {techStack.map((tech, index) => (
                  <span key={`2-${index}`} className="text-2xl font-bold text-slate-500">{tech}</span>
                ))}
              </div>
              {/* Third Copy (for safety on wide screens) */}
              <div className="flex items-center gap-16 mx-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {techStack.map((tech, index) => (
                  <span key={`3-${index}`} className="text-2xl font-bold text-slate-500">{tech}</span>
                ))}
              </div>
               {/* Fourth Copy (for extra safety) */}
               <div className="flex items-center gap-16 mx-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {techStack.map((tech, index) => (
                  <span key={`4-${index}`} className="text-2xl font-bold text-slate-500">{tech}</span>
                ))}
              </div>
            </div>
         </div>
      </div>

      {/* Testimonials */}
      <section className="py-24 bg-dark-card relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Client Stories</h2>
              <p className="text-slate-400">Trusted by innovative companies worldwide.</p>
            </div>
            <Link to="/about" className="text-neon-cyan hover:text-white transition-colors flex items-center gap-2 mt-4 md:mt-0">
              Read more reviews <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.testimonials.map((t) => (
              <div key={t.id} className="p-8 rounded-2xl bg-dark-bg border border-white/5 relative">
                 <div className="text-neon-cyan text-6xl font-serif absolute top-4 left-4 opacity-20">"</div>
                 <p className="text-lg text-slate-300 italic mb-6 relative z-10">{t.text}</p>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 to-gray-600"></div>
                    <div>
                      <h4 className="font-bold text-white">{t.name}</h4>
                      <p className="text-sm text-slate-500">{t.role} @ {t.company}</p>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg to-neon-purple/10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
           <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to Disrupt the Market?</h2>
           <p className="text-xl text-slate-400 mb-10">Let's build technology that sets your brand apart from the noise.</p>
           <Link to="/contact" className="inline-block px-10 py-5 bg-neon-cyan text-black font-bold rounded-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]">
             Start Your Transformation
           </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;