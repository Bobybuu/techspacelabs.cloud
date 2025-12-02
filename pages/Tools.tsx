import React from 'react';
import { useContent } from '../context/ContentContext';
import * as Icons from 'lucide-react';
import { ExternalLink, Zap } from 'lucide-react';

const Tools: React.FC = () => {
  const { content } = useContent();

  const getIcon = (iconName: string) => {
    // @ts-ignore
    const Icon = Icons[iconName] || Icons.Cpu;
    return <Icon className="w-8 h-8 text-neon-cyan" />;
  };

  return (
    <div className="pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neon-purple text-sm font-medium mb-6">
            <Zap size={14} className="fill-neon-purple" />
            <span>Developer Resources</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Apps & Tools</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            A collection of utilities, experiments, and productivity boosters we've built for the community. Open source and free to use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.tools.map((tool) => (
            <div key={tool.id} className="group relative bg-dark-card border border-white/5 rounded-2xl p-8 hover:border-neon-cyan/50 transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/5 rounded-xl text-neon-cyan group-hover:bg-neon-cyan/20 transition-colors">
                    {getIcon(tool.icon)}
                  </div>
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white/5 rounded-full text-slate-400 group-hover:text-white transition-colors">
                    {tool.category}
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-display text-white mb-3">{tool.title}</h3>
                <p className="text-slate-400 mb-8 h-20 overflow-hidden text-ellipsis leading-relaxed">
                  {tool.description}
                </p>

                <a 
                  href={tool.link} 
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-white/5 hover:bg-neon-cyan text-white hover:text-black font-semibold rounded-lg transition-all border border-white/10 hover:border-transparent"
                >
                  {tool.buttonText} <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;