import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const ExperienceDetail: React.FC = () => {
  const { experience } = portfolioData;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono tracking-[0.3em] uppercase text-brand-accent">Career Progression</span>
        <h3 className="text-3xl md:text-4xl font-serif font-light text-white mt-1">
          Experience & Client Deliverables
        </h3>
      </div>

      {/* Timeline */}
      <div className="relative border-l border-white/15 ml-4 md:ml-6 space-y-10 py-2">
        {experience.map((item) => (
          <div key={item.id} className="relative pl-8 md:pl-10 group">
            {/* Timeline Diamond Node */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-[#060b0e] border-2 border-brand-accent rotate-45 group-hover:scale-125 group-hover:bg-brand-accent transition-all duration-300 shadow-[0_0_10px_rgba(123,227,180,0.5)]" />

            <div className="glass-panel p-6 md:p-8 rounded-2xl glass-panel-hover">
              {/* Role & Company */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <div>
                  <h4 className="text-xl md:text-2xl font-serif text-white font-light group-hover:text-brand-accent transition-colors">
                    {item.role}
                  </h4>
                  <div className="text-sm font-medium text-brand-accent/90 flex items-center gap-2 mt-0.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{item.company}</span>
                    <span className="text-white/40">•</span>
                    <span className="text-xs font-mono text-white/60">{item.type}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-white/60">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-brand-accent" />
                    {item.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                    {item.location}
                  </span>
                </div>
              </div>

              {/* Responsibilities */}
              <ul className="space-y-2.5 mb-6">
                {item.description.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-white/80 font-light leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent mt-0.5 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {item.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-white/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
