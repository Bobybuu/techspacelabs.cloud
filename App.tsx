
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
import { ReferralProvider } from './context/ReferralContext';
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Tools from './pages/Tools';
import AdminDashboard from './pages/admin/AdminDashboard';
import ReferralDashboard from './pages/referral/ReferralDashboard';
import ReferralAdmin from './pages/referral/ReferralAdmin';
import Auth from './pages/Auth';
import Terms from './pages/Terms';

const App: React.FC = () => {
  return (
    <ContentProvider>
      <ReferralProvider>
        <HashRouter>
          <Routes>
            {/* Admin Route - Separate Layout */}
            <Route path="/admin" element={<AdminDashboard />} />
            
            {/* Main Admin includes Referral Admin access */}
            <Route path="/admin/partners" element={<Layout><ReferralAdmin /></Layout>} />

            {/* Public Routes - Wrapped in Main Layout */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/services" element={<Layout><Services /></Layout>} />
            <Route path="/tools" element={<Layout><Tools /></Layout>} />
            <Route path="/blog" element={<Layout><Blog /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/terms" element={<Layout><Terms /></Layout>} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Layout><Auth /></Layout>} />
            <Route path="/register" element={<Layout><Auth /></Layout>} />
            
            {/* Partner / Referral Routes */}
            <Route path="/partners" element={<Layout><ReferralDashboard /></Layout>} />
            
            {/* Fallback routes for placeholder pages */}
            <Route path="/portfolio" element={<Navigate to="/" replace />} />
            <Route path="/careers" element={<Navigate to="/about" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      </ReferralProvider>
    </ContentProvider>
  );
};

export default App;