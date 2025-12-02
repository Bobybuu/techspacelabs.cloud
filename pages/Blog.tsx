import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Calendar, User, Search } from 'lucide-react';

const Blog: React.FC = () => {
  const { content } = useContent();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = content.blog.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Insights & News</h1>
            <p className="text-slate-400">Thoughts on AI, Design, and the Future of Tech.</p>
          </div>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 bg-white/5 border border-white/10 rounded-full py-3 pl-10 pr-4 text-white focus:outline-none focus:border-neon-cyan transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article key={post.id} className="glass-panel rounded-2xl overflow-hidden border border-white/5 hover:border-neon-cyan/30 transition-all duration-300 group">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-black bg-neon-cyan rounded-full">
                    {post.category}
                  </span>
                </div>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><Calendar size={14}/> {post.date}</span>
                  <span className="flex items-center gap-1"><User size={14}/> Admin</span>
                </div>
                <h2 className="text-xl font-bold font-display text-white mb-3 group-hover:text-neon-cyan transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <button className="text-neon-purple hover:text-white text-sm font-semibold transition-colors">
                  Read Article →
                </button>
              </div>
            </article>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            No articles found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
