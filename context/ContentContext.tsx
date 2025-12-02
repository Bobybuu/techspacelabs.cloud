import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteContent, ContentContextType } from '../types';
import { DEFAULT_CONTENT } from '../constants';

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load from local storage on mount with smart merging
  useEffect(() => {
    const savedContent = localStorage.getItem('techspace_content');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        
        // Merge parsed content with default content to ensure new fields (like tools) 
        // exist even if the saved data is from an older version.
        setContent(prev => ({
          ...prev,
          ...parsed,
          general: { ...prev.general, ...(parsed.general || {}) },
          pages: { ...prev.pages, ...(parsed.pages || {}) },
          // Ensure arrays exist; fall back to default if missing in saved data
          tools: parsed.tools || prev.tools,
          services: parsed.services || prev.services,
          team: parsed.team || prev.team,
          testimonials: parsed.testimonials || prev.testimonials,
          blog: parsed.blog || prev.blog
        }));
      } catch (e) {
        console.error("Failed to parse saved content", e);
        // Fallback to default content if parse fails
        setContent(DEFAULT_CONTENT);
      }
    }
    
    const savedAdminState = localStorage.getItem('techspace_admin_auth');
    if (savedAdminState === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
    localStorage.setItem('techspace_content', JSON.stringify(newContent));
  };

  const resetContent = () => {
    if (window.confirm("Are you sure you want to reset all content to default? This cannot be undone.")) {
      setContent(DEFAULT_CONTENT);
      localStorage.setItem('techspace_content', JSON.stringify(DEFAULT_CONTENT));
    }
  };

  const toggleAdmin = () => {
    const newState = !isAdmin;
    setIsAdmin(newState);
    localStorage.setItem('techspace_admin_auth', String(newState));
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent, isAdmin, toggleAdmin }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};