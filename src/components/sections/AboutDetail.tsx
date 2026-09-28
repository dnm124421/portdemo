import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { MapPin, Sparkles, GraduationCap, Code2, Compass } from 'lucide-react';

export const AboutDetail: React.FC = () => {
  const { personal } = portfolioData;

  return (
    <div className="space-y-10">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-brand-accent">Profile & Background</span>
          <h3 className="text-3xl md:text-5xl font-serif font-light text-white mt-1">
            {personal.name}
          </h3>
          <div className="flex items-center gap-4 mt-2 text-sm text-white/70">
            <span className="flex items-center gap-1.5 text-white/90">
              <MapPin className="w-4 h-4 text-brand-accent" />
              {personal.location}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span className="text-brand-accent font-medium">{personal.title}</span>
          </div>
        </div>

        {/* Quick Badges */}
        <div className="flex flex-wrap gap-2">
          {personal.stats.map((stat, idx) => (
            <div key={idx} className="glass-panel px-4 py-2 rounded-xl text-center">
              <div className="text-lg font-serif text-brand-accent">{stat.value}</div>
              <div className="text-[11px] font-mono text-white/60 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Bio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Story */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 md:p-8 rounded-2xl">
            <div className="flex items-center gap-2 text-brand-accent mb-4 font-mono text-xs uppercase tracking-widest">
              <Compass className="w-4 h-4" />
              <span>Analytical Philosophy</span>
            </div>
            <p className="text-white/90 text-base md:text-lg leading-relaxed font-light mb-4">
              {personal.bio}
            </p>
            <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
              I specialize in bridging the gap between raw unstructured data and strategic execution. Whether constructing computational search trees for chess engines or developing classification models for user telemetry, I emphasize mathematical rigor, clean modular architecture, and actionable clarity.
            </p>
          </div>

          {/* Current Academic / Learning Focus */}
          <div className="glass-panel p-6 md:p-8 rounded-2xl border-brand-accent/20 bg-brand-accent/[0.03]">
            <div className="flex items-center gap-2 text-brand-accent mb-3 font-mono text-xs uppercase tracking-widest">
              <GraduationCap className="w-4 h-4" />
              <span>Current Target & Deep Work</span>
            </div>
            <h4 className="text-xl font-serif text-white mb-2">GATE DA (Data Science & AI) Intensive</h4>
            <p className="text-white/80 text-sm leading-relaxed font-light">
              {personal.learningFocus}
            </p>
          </div>
        </div>

        {/* Right 1 Col: Highlights & Fun Facts */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center gap-2 text-brand-accent mb-4 font-mono text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Curiosity & Facts</span>
            </div>
            <ul className="space-y-3">
              {personal.funFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-white/80 font-light leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 flex-shrink-0" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center gap-2 text-brand-accent mb-3 font-mono text-xs uppercase tracking-widest">
              <Code2 className="w-4 h-4" />
              <span>Core Toolset</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Python', 'SQL', 'Pandas', 'Scikit-Learn', 'EDA', 'Power BI', 'React', 'Git', 'Statsmodels'].map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white/80 font-mono"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
