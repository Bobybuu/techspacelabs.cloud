import React from 'react';
import { useContent } from '../context/ContentContext';

const About: React.FC = () => {
  const { content } = useContent();

  return (
    <div className="pt-10 pb-24">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-24">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-8">Who We Are</h1>
        <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
          {content.pages.about.story}
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-10 rounded-3xl bg-gradient-to-br from-dark-card to-dark-bg border border-white/5">
             <h2 className="text-2xl font-display font-bold text-neon-cyan mb-4">Our Mission</h2>
             <p className="text-slate-400 text-lg leading-relaxed">{content.pages.about.mission}</p>
          </div>
          <div className="p-10 rounded-3xl bg-gradient-to-br from-dark-card to-dark-bg border border-white/5">
             <h2 className="text-2xl font-display font-bold text-neon-purple mb-4">Our Vision</h2>
             <p className="text-slate-400 text-lg leading-relaxed">{content.pages.about.vision}</p>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-display font-bold mb-12 text-center">Meet The Minds</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.team.map((member) => (
            <div key={member.id} className="group relative rounded-2xl overflow-hidden">
               <img src={member.image} alt={member.name} className="w-full aspect-[3/4] object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                 <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                 <p className="text-neon-cyan font-medium">{member.role}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
