import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { GraduationCap, Award, Calendar, BookOpen } from 'lucide-react';

export const EducationDetail: React.FC = () => {
  const { education } = portfolioData;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono tracking-[0.3em] uppercase text-brand-accent">Academic Foundations</span>
        <h3 className="text-3xl md:text-4xl font-serif font-light text-white mt-1">
          Education & Certifications
        </h3>
      </div>

      {/* Education Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((item) => (
          <div
            key={item.id}
            className={`glass-panel p-6 md:p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden ${
              item.highlight ? 'border-brand-accent/40 bg-brand-accent/[0.04]' : ''
            }`}
          >
            {item.highlight && (
              <div className="absolute top-0 right-0 px-4 py-1 rounded-bl-xl bg-brand-accent text-black font-mono text-[10px] font-bold uppercase tracking-wider">
                Current Focus
              </div>
            )}

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                    <Calendar className="w-3 h-3 text-brand-accent" />
                    <span>{item.period}</span>
                  </div>
                  <h4 className="text-lg md:text-xl font-serif text-white font-light mt-0.5">
                    {item.degree}
                  </h4>
                </div>
              </div>

              <div className="text-sm font-medium text-white/80 mb-3 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-brand-accent" />
                <span>{item.institution}</span>
              </div>

              <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed mb-4">
                {item.details}
              </p>
            </div>

            {item.score && (
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-white/50">Grade / Status:</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-xs font-mono text-brand-accent">
                  <Award className="w-3 h-3" />
                  {item.score}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
