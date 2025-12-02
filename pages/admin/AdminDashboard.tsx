import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { Save, RefreshCw, LayoutDashboard, Type, Settings, Image as ImageIcon, Briefcase, Users, FileText, Lock, Box, User, Key, Plus, Trash2 } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { content, updateContent, resetContent, isAdmin, toggleAdmin } = useContent();
  const [activeTab, setActiveTab] = useState<'general' | 'home' | 'about' | 'services' | 'blog' | 'tools'>('general');
  const [localContent, setLocalContent] = useState(content);
  
  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Sync local state when global content changes
  React.useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      toggleAdmin();
      setLoginError('');
      setUsername('');
      setPassword('');
    } else {
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[100px] animate-pulse-slow"></div>

        <div className="relative z-10 w-full max-w-md p-8 glass-panel rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
              <Lock className="w-8 h-8 text-neon-cyan" />
            </div>
            <h1 className="text-3xl font-bold font-display text-white mb-2">Admin Access</h1>
            <p className="text-slate-400">Secure area. Please authenticate.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-neon-cyan transition-colors"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Password</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-neon-cyan transition-colors"
                  placeholder="Enter password"
                />
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {loginError}
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-neon-cyan to-neon-purple text-white font-bold rounded-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"
            >
              Login to Dashboard
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-600">Default: admin / admin</p>
          </div>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    updateContent(localContent);
    alert('Changes saved successfully!');
  };

  const handleChange = (path: string, value: string) => {
    // Deep update helper
    const newContent = JSON.parse(JSON.stringify(localContent));
    const keys = path.split('.');
    let current = newContent;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {}; // Safety check
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setLocalContent(newContent);
  };

  const handleAddTool = () => {
    const newTool = {
      id: `tool-${Date.now()}`,
      title: 'New Tool',
      description: 'Describe the tool functionality here...',
      icon: 'Box',
      link: '#',
      category: 'Development',
      buttonText: 'Launch'
    };
    
    setLocalContent(prev => ({
      ...prev,
      tools: [...(prev.tools || []), newTool]
    }));
  };

  const handleDeleteTool = (index: number) => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
      setLocalContent(prev => ({
        ...prev,
        tools: (prev.tools || []).filter((_, i) => i !== index)
      }));
    }
  };

  // Helper render function to avoid focus loss (do not use as a Component inside render)
  const renderInput = (label: string, path: string, type = "text", rows = 1) => {
    const keys = path.split('.');
    let value: any = localContent;
    for (const key of keys) {
      value = value?.[key];
    }

    return (
      <div className="mb-4" key={path}>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{label}</label>
        {rows > 1 ? (
          <textarea
            value={value || ''}
            onChange={(e) => handleChange(path, e.target.value)}
            rows={rows}
            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-neon-cyan focus:outline-none"
          />
        ) : (
          <input
            type={type}
            value={value || ''}
            onChange={(e) => handleChange(path, e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-neon-cyan focus:outline-none"
          />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-dark-bg flex">
      {/* Sidebar */}
      <div className="w-64 glass-panel border-r border-white/5 flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <LayoutDashboard size={20} className="text-neon-cyan"/> CMS Panel
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('general')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'general' ? 'bg-neon-purple/20 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <Settings size={18} /> General
          </button>
          <button onClick={() => setActiveTab('home')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'home' ? 'bg-neon-purple/20 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <Type size={18} /> Home Page
          </button>
          <button onClick={() => setActiveTab('about')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'about' ? 'bg-neon-purple/20 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <Users size={18} /> About Page
          </button>
          <button onClick={() => setActiveTab('services')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'services' ? 'bg-neon-purple/20 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <Briefcase size={18} /> Services
          </button>
          <button onClick={() => setActiveTab('tools')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'tools' ? 'bg-neon-purple/20 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <Box size={18} /> Tools
          </button>
          <button onClick={() => setActiveTab('blog')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'blog' ? 'bg-neon-purple/20 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <FileText size={18} /> Blog
          </button>
        </nav>
        <div className="p-4 border-t border-white/5">
          <button onClick={toggleAdmin} className="text-sm text-red-400 hover:text-red-300 w-full text-left flex items-center gap-2">
            <Lock size={14} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white capitalize">{activeTab} Settings</h1>
            <p className="text-slate-400">Manage your website content in real-time.</p>
          </div>
          <div className="flex gap-4">
             <button onClick={resetContent} className="px-4 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 flex items-center gap-2">
              <RefreshCw size={16} /> Reset
            </button>
            <button onClick={handleSave} className="px-6 py-2 bg-neon-cyan text-black font-bold rounded-lg hover:bg-white transition-colors flex items-center gap-2">
              <Save size={16} /> Save Changes
            </button>
          </div>
        </header>

        <div className="bg-dark-card border border-white/5 rounded-2xl p-8 max-w-4xl">
          
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-2">Brand Identity</h3>
              <div className="grid grid-cols-2 gap-6">
                {renderInput("Brand Name", "general.brandName")}
                {renderInput("Tagline", "general.tagline")}
              </div>
              {renderInput("Logo URL", "general.logoUrl")}
              
              <h3 className="text-xl font-bold text-white mt-8 mb-4 border-b border-white/5 pb-2">Contact Info</h3>
              <div className="grid grid-cols-2 gap-6">
                {renderInput("Email", "general.contactEmail")}
                {renderInput("Phone", "general.contactPhone")}
              </div>
              {renderInput("Address", "general.address")}
            </div>
          )}

          {activeTab === 'home' && (
            <div className="space-y-6">
               <h3 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-2">Hero Section</h3>
               {renderInput("Hero Title", "pages.home.heroTitle")}
               {renderInput("Hero Subtitle", "pages.home.heroSubtitle", "text", 3)}
               <div className="grid grid-cols-2 gap-6">
                 {renderInput("CTA Button Text", "pages.home.heroCta")}
               </div>
            </div>
          )}

          {activeTab === 'about' && (
             <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-2">Company Story</h3>
              {renderInput("Story", "pages.about.story", "text", 5)}
              {renderInput("Mission", "pages.about.mission", "text", 3)}
              {renderInput("Vision", "pages.about.vision", "text", 3)}
            </div>
          )}

           {activeTab === 'services' && (
             <div className="space-y-6">
               <p className="text-sm text-slate-400 bg-blue-500/10 p-3 rounded border border-blue-500/20">
                 Manage all your service offerings.
               </p>
               {localContent.services && localContent.services.map((s, idx) => (
                 <div key={s.id || idx} className="p-4 border border-white/5 rounded-lg bg-black/20 mb-4">
                   <h4 className="font-bold text-neon-cyan mb-4">Service #{idx + 1} ({s.title})</h4>
                   {renderInput("Title", `services.${idx}.title`)}
                   {renderInput("Description", `services.${idx}.description`, "text", 2)}
                 </div>
               ))}
            </div>
          )}

          {activeTab === 'tools' && (
             <div className="space-y-6">
               <div className="flex justify-between items-center bg-blue-500/10 p-4 rounded border border-blue-500/20">
                 <p className="text-sm text-slate-400">
                   Manage your Apps & Tools page content.
                 </p>
                 <button onClick={handleAddTool} className="px-3 py-1.5 bg-neon-cyan text-black font-bold rounded hover:bg-white transition-colors flex items-center gap-2 text-sm">
                   <Plus size={14} /> Add Tool
                 </button>
               </div>

               {localContent.tools && localContent.tools.map((tool, idx) => (
                 <div key={tool.id || idx} className="p-4 border border-white/5 rounded-lg bg-black/20 mb-4 relative group">
                   <button 
                     onClick={() => handleDeleteTool(idx)}
                     className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors"
                     title="Delete Tool"
                   >
                     <Trash2 size={16} />
                   </button>

                   <div className="flex justify-between items-center mb-4 pr-8">
                      <h4 className="font-bold text-neon-cyan">Tool: {tool.title}</h4>
                      <span className="text-xs text-slate-500 uppercase">{tool.category}</span>
                   </div>
                   <div className="grid grid-cols-2 gap-4 mb-4">
                      {renderInput("Title", `tools.${idx}.title`)}
                      {renderInput("Category", `tools.${idx}.category`)}
                   </div>
                   {renderInput("Description", `tools.${idx}.description`, "text", 2)}
                   <div className="grid grid-cols-2 gap-4 mt-4">
                      {renderInput("Button Text", `tools.${idx}.buttonText`)}
                      {renderInput("Link URL", `tools.${idx}.link`)}
                   </div>
                 </div>
               ))}
               {(!localContent.tools || localContent.tools.length === 0) && (
                 <div className="text-center py-8 text-slate-500">
                   No tools added yet. Click "Add Tool" to begin.
                 </div>
               )}
            </div>
          )}

          {activeTab === 'blog' && localContent.blog && localContent.blog.length > 0 && (
             <div className="space-y-6">
              <p className="text-sm text-slate-400 bg-blue-500/10 p-3 rounded border border-blue-500/20">
                 Note: Currently editing the latest blog post.
               </p>
               <div className="p-4 border border-white/5 rounded-lg bg-black/20">
                   {renderInput("Post Title", `blog.0.title`)}
                   {renderInput("Category", `blog.0.category`)}
                   {renderInput("Excerpt", `blog.0.excerpt`, "text", 3)}
                   {renderInput("Image URL", `blog.0.image`)}
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;