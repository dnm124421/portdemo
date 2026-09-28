import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Code2, BrainCircuit, BarChart3, Globe, Sparkles } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-5 h-5 text-brand-accent" />,
  BrainCircuit: <BrainCircuit className="w-5 h-5 text-brand-accent" />,
  BarChart3: <BarChart3 className="w-5 h-5 text-brand-accent" />,
  Globe: <Globe className="w-5 h-5 text-brand-accent" />,
};

export const SkillsDetail: React.FC = () => {
  const { skillsData } = portfolioData;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono tracking-[0.3em] uppercase text-brand-accent">Technical Matrix</span>
        <h3 className="text-3xl md:text-4xl font-serif font-light text-white mt-1">
          Skills, Frameworks & Tooling
        </h3>
      </div>

      {/* Skills Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillsData.map((category, idx) => (
          <div key={idx} className="glass-panel p-6 md:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {iconMap[category.iconName] || <Code2 className="w-5 h-5 text-brand-accent" />}
                </div>
                <h4 className="text-xl font-serif text-white font-light">
                  {category.title}
                </h4>
              </div>

              {/* Skills List with Progress Bars */}
              <div className="space-y-4">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-white/90 flex items-center gap-1.5">
                        {skill.name}
                        {skill.highlight && (
                          <Sparkles className="w-3 h-3 text-brand-accent inline" />
                        )}
                      </span>
                      <span className="font-mono text-brand-accent/80">{skill.level}%</span>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-accent/70 to-brand-accent rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Tag List */}
            <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-white/10">
              {category.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-2 py-0.5 rounded bg-white/[0.03] text-[11px] font-mono text-white/60"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
