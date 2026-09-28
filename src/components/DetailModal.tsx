import React, { useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { AboutDetail } from './sections/AboutDetail';
import { ProjectsDetail } from './sections/ProjectsDetail';
import { ExperienceDetail } from './sections/ExperienceDetail';
import { SkillsDetail } from './sections/SkillsDetail';
import { EducationDetail } from './sections/EducationDetail';
import { ResumeDetail } from './sections/ResumeDetail';
import { ContactDetail } from './sections/ContactDetail';

interface DetailModalProps {
  isOpen: boolean;
  activeSection: string | null;
  onClose: () => void;
  onSwitchSection: (sectionKey: string) => void;
}

const SECTION_TABS = [
  { key: 'about', label: 'About' },
  { key: 'projects', label: 'Projects' },
  { key: 'experience', label: 'Experience' },
  { key: 'skills', label: 'Skills' },
  { key: 'education', label: 'Education' },
  { key: 'resume', label: 'Resume' },
  { key: 'contact', label: 'Contact' },
];

export const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  activeSection,
  onClose,
  onSwitchSection,
}) => {
  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !activeSection) return null;

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'about':
        return <AboutDetail />;
      case 'projects':
        return <ProjectsDetail />;
      case 'experience':
        return <ExperienceDetail />;
      case 'skills':
        return <SkillsDetail />;
      case 'education':
        return <EducationDetail />;
      case 'resume':
        return <ResumeDetail />;
      case 'contact':
        return <ContactDetail />;
      default:
        return <AboutDetail />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 pointer-events-auto">
      {/* Dark Ambient Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#060b0e]/80 backdrop-blur-2xl transition-opacity duration-300 animate-fade-in"
      />

      {/* Main Glass Dialog Window */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#0c141a]/90 backdrop-blur-3xl border border-white/20 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] flex flex-col overflow-hidden z-10 animate-scale-up">
        {/* Top Dialog Bar with Section Switcher & Close */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          {/* Section Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
            {SECTION_TABS.map((tab) => {
              const isCurrent = activeSection === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => onSwitchSection(tab.key)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isCurrent
                      ? 'bg-white/20 text-brand-accent border border-brand-accent/40 font-bold shadow-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer ml-4 flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          {renderSectionContent()}
        </div>

        {/* Subtle Footer Bar */}
        <div className="px-6 py-3 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-[11px] font-mono text-white/40">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>Dhruv Mahadik Portfolio</span>
          </div>
          <div>Press ESC to close</div>
        </div>
      </div>
    </div>
  );
};
