
import React from 'react';
import { Shield, FileText, Scale } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="pt-10 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-6">
            <Scale className="w-8 h-8 text-neon-cyan" />
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">Terms & Conditions</h1>
          <p className="text-slate-400">Last Updated: 1st Dec 2025</p>
        </div>

        {/* Content Container */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 prose prose-invert max-w-none">
          
          <div className="mb-10 text-lg text-slate-300 leading-relaxed border-b border-white/5 pb-8">
            <p>
              Welcome to <strong>TechSpace Labs</strong>. These Terms & Conditions govern your use of all TechSpace Labs services, products, websites, mobile apps, APIs, referral systems, and any digital solutions (“Services”). By using our Services, you agree to these Terms in full.
            </p>
          </div>

          <section className="space-y-8">
            
            {/* 1. Definitions */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-neon-cyan">1.</span> Definitions
              </h2>
              <ul className="space-y-3 text-slate-400 list-disc pl-5">
                <li><strong className="text-slate-200">“Company”, “We”, “Us”, “Our”</strong> refers to <strong>TechSpace Labs</strong>.</li>
                <li><strong className="text-slate-200">“User”, “Client”, “You”</strong> refers to any individual or business purchasing or using our Services.</li>
                <li><strong className="text-slate-200">“Digital Products”</strong> includes websites, apps, software, dashboards, AI tools, APIs, creative assets, and digital systems.</li>
                <li><strong className="text-slate-200">“Data”</strong> refers to user information collected through websites, apps, forms, analytics tools, and integrations.</li>
              </ul>
            </div>

            {/* 2. Acceptance */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-neon-cyan">2.</span> Acceptance of Terms
              </h2>
              <p className="text-slate-400">
                By accessing or using any TechSpace Labs product or service, you agree to comply with these Terms. If you disagree, do not use our Services.
              </p>
            </div>

            {/* 3. Services Provided */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-neon-cyan">3.</span> Services Provided
              </h2>
              <p className="text-slate-400 mb-4">TechSpace Labs provides:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-400">
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-neon-purple rounded-full"></span> Website & mobile app development</div>
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-neon-purple rounded-full"></span> AI integration & automation tools</div>
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-neon-purple rounded-full"></span> Branding & graphic design</div>
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-neon-purple rounded-full"></span> Digital marketing solutions</div>
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-neon-purple rounded-full"></span> Software products & SaaS systems</div>
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-neon-purple rounded-full"></span> Referral & commission systems</div>
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-neon-purple rounded-full"></span> API integrations</div>
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-neon-purple rounded-full"></span> Cloud-hosted solutions</div>
              </div>
              <p className="text-slate-500 mt-4 text-sm italic">We reserve the right to update or modify services at any time.</p>
            </div>

            {/* 4. Project Terms */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-neon-cyan">4.</span> Project Terms
              </h2>
              <div className="space-y-4 text-slate-400">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">4.1 Work Process</h3>
                  <p>Projects begin only after:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>A signed agreement</li>
                    <li>Payment of the agreed deposit</li>
                    <li>Submission of required materials (images, content, branding assets, etc.)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">4.2 Delivery Timelines</h3>
                  <p>Delivery timelines are estimates. Delays caused by missing content, user changes, or external factors do not constitute breach of contract.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">4.3 Revisions</h3>
                  <p>Projects include a fixed number of revisions as agreed. Additional revisions may incur extra fees.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">4.4 Ownership & Licensing</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>For custom work, ownership transfers upon full payment.</li>
                    <li>For subscription-based systems (e.g., referral systems, SaaS tools), TechSpace Labs retains full intellectual property rights.</li>
                    <li>You receive a license to use the product but not to resell, copy, or redistribute it without permission.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 5. Payments */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-neon-cyan">5.</span> Payments & Refunds
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h3 className="text-white font-bold mb-2">5.1 Payment Terms</h3>
                  <ul className="text-slate-400 text-sm space-y-2 list-disc pl-4">
                    <li>Deposits are non-refundable.</li>
                    <li>Final balance is due upon completion or before deployment.</li>
                    <li>Monthly/annual subscriptions auto-renew unless canceled.</li>
                  </ul>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h3 className="text-white font-bold mb-2">5.2 Refunds</h3>
                  <p className="text-slate-400 text-sm mb-2">We do not offer refunds on:</p>
                  <ul className="text-slate-400 text-sm space-y-1 list-disc pl-4">
                    <li>Completed work</li>
                    <li>Digital products</li>
                    <li>Subscriptions already used</li>
                    <li>Software licenses</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 6. Referral */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-neon-cyan">6.</span> Referral & Commission Systems
              </h2>
              <p className="text-slate-400 mb-2">If you participate in TechSpace Labs referral programs:</p>
              <ul className="list-disc pl-5 text-slate-400 space-y-2">
                <li>You must comply with our commission rules.</li>
                <li>Fraudulent referrals or fake sales result in immediate account termination.</li>
                <li>We reserve the right to adjust percentages and thresholds.</li>
              </ul>
            </div>

            {/* 7. Data Privacy */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-neon-cyan">7.</span> Data Collection & Privacy
              </h2>
              <div className="space-y-4 text-slate-400">
                <p><strong>7.1 Data We Collect:</strong> Personal details, usage data, device info, analytics, and business info shared during onboarding.</p>
                <p><strong>7.2 Why We Collect Data:</strong> To improve services, personalize experiences, support, security, analytics, and AI training.</p>
                <p><strong>7.3 Data Sharing:</strong> We <strong>do not sell user data</strong>. We may share with payment processors, hosting providers, and analytics platforms.</p>
                <p><strong>7.4 Data Storage:</strong> Secure cloud servers, encrypted local storage, and integrated platforms using industry-standard security.</p>
                <p><strong>7.5 User Consent:</strong> By using our services, you consent to data collection, tracking, cookies, and marketing communications (opt-out available).</p>
              </div>
            </div>

            {/* 8. User Responsibilities */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-neon-cyan">8.</span> User Responsibilities
              </h2>
              <p className="text-slate-400 mb-2">Users agree NOT to:</p>
              <ul className="list-disc pl-5 text-slate-400 space-y-2">
                <li>Use TechSpace Labs products for illegal activities</li>
                <li>Reverse-engineer or copy proprietary systems</li>
                <li>Share access credentials</li>
                <li>Upload harmful or malicious content</li>
                <li>Violate intellectual property of others</li>
              </ul>
            </div>

            {/* 9. Warranties */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-neon-cyan">9.</span> Warranties & Liability
              </h2>
              <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/20">
                <h3 className="text-white font-bold mb-2">Limitation of Liability</h3>
                <p className="text-slate-300 text-sm mb-4">
                  TechSpace Labs is not liable for data loss, downtime, damages caused by misuse, or third-party failures. Maximum liability is limited to the amount paid for the service.
                </p>
                <p className="text-slate-400 text-sm">
                  We do not guarantee specific revenue increases, sales performance, or SEO rankings.
                </p>
              </div>
            </div>

            {/* 10-13 Misc */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">10. Termination</h3>
                <p className="text-slate-400 text-sm">We may suspend services for overdue payments, fraud, or T&C violations.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">11. Updates</h3>
                <p className="text-slate-400 text-sm">We may update these terms at any time. Continued use equals acceptance.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">12. Dispute Resolution</h3>
                <p className="text-slate-400 text-sm">Resolved via direct communication, mediation, or legal action under <strong>Kenyan law</strong>.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">13. Contact</h3>
                <p className="text-slate-400 text-sm">
                  Email: <a href="mailto:support@techspacelabs.cloud" className="text-neon-cyan hover:underline">support@techspacelabs.cloud</a><br/>
                  Phone: <a href="tel:+254729407573" className="text-neon-cyan hover:underline">+2547 29 407 573</a>
                </p>
              </div>
            </div>

          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
