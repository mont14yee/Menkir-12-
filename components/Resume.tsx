import React, { useState } from 'react';
import { User, Briefcase, Award, GraduationCap, Mail, MapPin, Phone, ChevronRight, Menu, X, ArrowLeft } from './ExtractedIcons';
import { View } from '../types';

interface ResumeProps {
  setView: (view: View) => void;
}

const Resume: React.FC<ResumeProps> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'expertise', label: 'Expertise', icon: Award },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      

      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setView('portfolio')}
                className="p-2 -ml-2 text-slate-400 hover:text-[#2b5c5e] hover:bg-teal-50 rounded-full transition-colors"
                aria-label="Back to Portfolio"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="text-xl font-bold text-[#2b5c5e]">Menkir Wolde</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#2b5c5e] text-white'
                        : 'text-slate-600 hover:bg-teal-50 hover:text-[#2b5c5e]'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 hover:text-[#2b5c5e] focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 absolute w-full shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center w-full px-3 py-3 rounded-xl text-base font-medium ${
                      activeTab === tab.id
                        ? 'bg-[#2b5c5e] text-white'
                        : 'text-slate-600 hover:bg-teal-50 hover:text-[#2b5c5e]'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Section */}
        {activeTab === 'profile' && (
          <div className="animate-fade-in-up space-y-8">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 text-center md:text-left flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0 border-4 border-white shadow-md">
                <span className="text-5xl md:text-7xl font-bold text-[#2b5c5e]">MW</span>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">Menkir Wolde</h1>
                <h2 className="text-xl md:text-2xl text-[#2b5c5e] font-medium mb-4">Senior Civil Engineer</h2>
                <p className="text-lg text-slate-600 font-light mb-6">Building Africa's Mega-Infrastructure</p>
                <p className="text-slate-600 leading-relaxed max-w-2xl">
                  Accomplished Civil Engineer with over 10 years of experience shaping modern infrastructure. Specializing in high-stakes mega-dam projects, structural inspections, and ensuring world-class safety standards.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-[#2b5c5e]">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Experience</p>
                  <p className="text-2xl font-bold text-slate-900">10+ Years</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-[#2b5c5e]">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Project Value</p>
                  <p className="text-2xl font-bold text-slate-900">$4.8B GERD</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Experience Section */}
        {activeTab === 'experience' && (
          <div className="animate-fade-in-up space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Professional Experience</h2>
            
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#2b5c5e]"></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Technical Auditor</h3>
                  <p className="text-[#2b5c5e] font-medium">Ethiopian Electric Power • Addis Ababa</p>
                </div>
                <span className="inline-block px-4 py-1.5 bg-teal-50 text-[#2b5c5e] rounded-full text-sm font-semibold mt-2 md:mt-0 w-fit">
                  Apr 2022 - Present
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                <strong>Focus:</strong> Comprehensive operational audits, safety protocols, and optimizing project performance.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-slate-300 group-hover:bg-[#2b5c5e] transition-colors"></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Generation Construction Civil Engineer</h3>
                  <p className="text-[#2b5c5e] font-medium">Koysha Hydroelectric Powerplant • Koysha</p>
                </div>
                <span className="inline-block px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm font-semibold mt-2 md:mt-0 w-fit">
                  Jun 2020 - Apr 2022
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                <strong>Focus:</strong> Structural inspections for 1,000m x 170m RCC structure. 2,160 MW capacity.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-slate-300 group-hover:bg-[#2b5c5e] transition-colors"></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Civil Engineer</h3>
                  <p className="text-[#2b5c5e] font-medium">Grand Ethiopian Renaissance Dam Project • Guba</p>
                </div>
                <span className="inline-block px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm font-semibold mt-2 md:mt-0 w-fit">
                  Aug 2013 - Jun 2020
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                <strong>Focus:</strong> Structural inspections for Africa's largest hydroelectric project (1,780m x 145m RCC complex).
              </p>
            </div>
          </div>
        )}

        {/* Expertise Section */}
        {activeTab === 'expertise' && (
          <div className="animate-fade-in-up space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Expertise & Skills</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-[#2b5c5e] mr-3">
                    <Award className="w-4 h-4" />
                  </div>
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['AutoCAD', 'Civil 3D', 'SAP 2000', 'ETABS'].map((skill) => (
                    <span key={skill} className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-sm font-medium">
                      {skill} <span className="text-[#2b5c5e] ml-1">(Advanced)</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-[#2b5c5e] mr-3">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  Project Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['BIM Methodology', 'MS Project', 'Primavera P6'].map((tool) => (
                    <span key={tool} className="px-4 py-2 bg-teal-50 text-[#2b5c5e] rounded-xl text-sm font-medium">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 md:col-span-2">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-[#2b5c5e] mr-3">
                    <User className="w-4 h-4" />
                  </div>
                  Soft Skills & Languages
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Core Strengths</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-sm font-medium">Critical Thinking</span>
                      <span className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-sm font-medium">Effective Communication</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {['English', 'Amharic', 'Oromo'].map((lang) => (
                        <span key={lang} className="px-4 py-2 bg-[#2b5c5e]/10 text-[#2b5c5e] rounded-xl text-sm font-medium">
                          {lang} (Fluent)
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Education Section */}
        {activeTab === 'education' && (
          <div className="animate-fade-in-up space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Education & Certifications</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6">
                <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center text-[#2b5c5e] flex-shrink-0">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">BSc in Civil Engineering (Geotechnical)</h3>
                  <p className="text-lg text-[#2b5c5e] font-medium mb-2">Adama Science & Technology University</p>
                  <p className="text-slate-500">2008 - 2013</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 flex-shrink-0">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Primary and Preparatory</h3>
                  <p className="text-lg text-slate-600 font-medium mb-2">DIDEA, Arsi Robe</p>
                  <p className="text-slate-500">1996 - 2008</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 pt-4 mb-4">Certifications</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                  <p className="text-sm text-slate-500 font-medium mb-2">May 2018</p>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Basic Design of Hydropower Civil Works</h4>
                  <p className="text-[#2b5c5e]">Addis Ababa Science & Tech Univ</p>
                </div>
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                  <p className="text-sm text-slate-500 font-medium mb-2">July 2023</p>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Developing High Performance Team</h4>
                  <p className="text-[#2b5c5e]">Frankfurt School of Finance</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Section */}
        {activeTab === 'contact' && (
          <div className="animate-fade-in-up max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-teal-50 flex items-center justify-center text-[#2b5c5e] mb-6">
                <Mail className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Get in Touch</h2>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Interested in discussing mega-infrastructure projects, structural audits, or potential collaborations? I'd love to hear from you.
              </p>

              <div className="space-y-6 text-left max-w-sm mx-auto mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Email</p>
                    <a href="mailto:mon14yee@gmail.com" className="text-lg font-semibold text-slate-900 hover:text-[#2b5c5e] transition-colors">
                      mon14yee@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Phone</p>
                    <a href="tel:+251962187320" className="text-lg font-semibold text-slate-900 hover:text-[#2b5c5e] transition-colors">
                      +251 962 187 320
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Location</p>
                    <p className="text-lg font-semibold text-slate-900">
                      Addis Ababa, Sheger City, Ethiopia
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="mailto:mon14yee@gmail.com"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-[#2b5c5e] rounded-full hover:bg-[#1f4244] transition-colors shadow-md hover:shadow-lg w-full sm:w-auto"
              >
                Send an Email
                <ChevronRight className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Resume;
