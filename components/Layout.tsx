
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { Menu, X, Cpu, ChevronRight, Github, Linkedin, Twitter, Instagram, ShieldCheck, Users, LogIn, UserPlus } from 'lucide-react';
import CallBackWidget from './CallBackWidget';

// Custom Logo Component matching the brand identity
const BrandLogo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`flex items-center gap-3 select-none ${className}`}>
    {/* Text Group */}
    <div className="flex flex-col items-end leading-none">
      <div className="flex text-2xl font-bold font-serif tracking-tighter">
        <span className="text-[#ea580c]">Tech</span>
        <span className="text-[#1e3a8a]">Space</span>
      </div>
      <span className="text-[#1e3a8a] font-bold font-serif text-sm tracking-widest uppercase -mt-0.5 mr-0.5">Labs</span>
    </div>
    
    {/* Icon Group */}
    <div className="relative w-10 h-10 bg-[#1e3a8a] rounded-full flex items-center justify-center shadow-lg border-2 border-white/20">
      <svg viewBox="0 0 24 24" className="w-3/5 h-3/5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="7" r="2" fill="currentColor" stroke="none"/>
        <circle cx="7" cy="12" r="2" fill="currentColor" stroke="none"/>
        <circle cx="7" cy="17" r="2" fill="currentColor" stroke="none"/>
        <path d="M9 7h8" />
        <path d="M9 12h6" />
        <path d="M9 17h4" />
      </svg>
    </div>
  </div>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { content, isAdmin, toggleAdmin } = useContent();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Tools', path: '/tools' },
    { name: 'Partners', path: '/partners' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg text-slate-100 font-sans selection:bg-neon-cyan selection:text-black">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group hover:opacity-90 transition-opacity">
              <BrandLogo />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      location.pathname === link.path
                        ? 'text-neon-cyan bg-white/5'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Button & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 border-r border-white/10 pr-4 mr-2">
                <Link to="/login" className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  <LogIn size={16} /> Login
                </Link>
                <Link to="/register" className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  <UserPlus size={16} /> Join
                </Link>
              </div>
              
              <Link to="/contact" className="hidden sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-neon-cyan transition-colors duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                Get Started
              </Link>
              <div className="-mr-2 flex lg:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
                >
                  {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden glass-panel border-b border-white/5">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-white/10 pt-4 mt-2 grid grid-cols-2 gap-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 px-3 py-2 bg-white/5 rounded-md text-center">Login</Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 px-3 py-2 bg-neon-cyan/20 text-neon-cyan rounded-md text-center">Join</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20 relative">
        {/* Background Grid Decoration */}
        <div className="fixed inset-0 z-[-1] opacity-20 pointer-events-none" 
             style={{ 
               backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`, 
               backgroundSize: '40px 40px' 
             }}>
        </div>
        <div className="fixed top-0 left-0 right-0 h-[500px] z-[-1] bg-gradient-to-b from-neon-purple/10 to-transparent pointer-events-none"></div>

        {children}
      </main>

      {/* Global Call Button */}
      <CallBackWidget />

      {/* Footer */}
      <footer className="bg-dark-card border-t border-white/5 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            
            {/* Brand Column */}
            <div className="col-span-1 md:col-span-1">
              <div className="mb-6">
                <BrandLogo className="scale-90 origin-left" />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {content.general.tagline}
              </p>
              <div className="flex space-x-4">
                <a href={content.general.socialLinks.twitter} className="text-slate-400 hover:text-neon-cyan transition-colors"><Twitter size={20} /></a>
                <a href={content.general.socialLinks.linkedin} className="text-slate-400 hover:text-neon-cyan transition-colors"><Linkedin size={20} /></a>
                <a href={content.general.socialLinks.instagram} className="text-slate-400 hover:text-neon-pink transition-colors"><Instagram size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github size={20} /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-display font-semibold mb-4">Company</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link to="/about" className="hover:text-neon-cyan transition-colors">About Us</Link></li>
                <li><Link to="/portfolio" className="hover:text-neon-cyan transition-colors">Portfolio</Link></li>
                <li><Link to="/tools" className="hover:text-neon-cyan transition-colors">Free Tools</Link></li>
                <li><Link to="/careers" className="hover:text-neon-cyan transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-neon-cyan transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-display font-semibold mb-4">Services</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                {content.services.slice(0, 4).map(s => (
                   <li key={s.id}><Link to="/services" className="hover:text-neon-cyan transition-colors">{s.title}</Link></li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-display font-semibold mb-4">Contact</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="block">{content.general.address}</span>
                </li>
                <li><a href={`mailto:${content.general.contactEmail}`} className="hover:text-white transition-colors">{content.general.contactEmail}</a></li>
                <li><a href={`tel:${content.general.contactPhone}`} className="hover:text-white transition-colors">{content.general.contactPhone}</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© {new Date().getFullYear()} {content.general.brandName}. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <Link to="/admin" className={`flex items-center gap-1 hover:text-white ${isAdmin ? 'text-neon-cyan' : ''}`}>
                <ShieldCheck size={14} /> Admin
              </Link>
              {isAdmin && (
                <Link to="/admin/partners" className="flex items-center gap-1 hover:text-white text-neon-cyan">
                  <Users size={14} /> Partner Admin
                </Link>
              )}
              <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
              <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
