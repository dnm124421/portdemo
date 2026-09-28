import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Download, FileText, CheckCircle, ExternalLink } from 'lucide-react';

export const ResumeDetail: React.FC = () => {
  const { resume, personal } = portfolioData;

  return (
    <div className="space-y-8">
      {/* Header & Download Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-brand-accent">Official Document</span>
          <h3 className="text-3xl md:text-4xl font-serif font-light text-white mt-1">
            Curriculum Vitae
          </h3>
        </div>

        <a
          href={resume.filePath}
          download={resume.fileName}
          className="glass-pill group flex items-center gap-3 px-6 py-3 rounded-full text-white font-medium text-sm cursor-pointer hover:bg-brand-accent hover:text-black transition-all duration-300"
        >
          <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          <span>Download PDF</span>
        </a>
      </div>

      {/* Resume Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Summary & Highlights */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 md:p-8 rounded-2xl">
            <div className="flex items-center gap-2 text-brand-accent mb-4 font-mono text-xs uppercase tracking-widest">
              <FileText className="w-4 h-4" />
              <span>Executive Summary</span>
            </div>
            <p className="text-white/85 text-sm md:text-base leading-relaxed font-light mb-6">
              {resume.summary}
            </p>

            <div className="space-y-6">
              {resume.sections.map((section, idx) => (
                <div key={idx} className="pt-4 border-t border-white/10">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-brand-accent mb-3">
                    {section.heading}
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-white/80 font-light">
                        <CheckCircle className="w-3.5 h-3.5 text-brand-accent mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Quick Card & Contact Quick Access */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-brand-accent">
              <FileText className="w-8 h-8" />
            </div>
            <div className="font-serif text-xl text-white font-light mb-1">{personal.name}</div>
            <div className="font-mono text-xs text-brand-accent mb-4">{personal.title}</div>
            <div className="font-mono text-[11px] text-white/50 mb-6">{resume.fileName}</div>

            <a
              href={resume.filePath}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono text-white flex items-center justify-center gap-2 transition-colors mb-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View in Browser</span>
            </a>

            <a
              href={resume.filePath}
              download={resume.fileName}
              className="w-full py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-black font-semibold text-xs font-mono flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Direct Download</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
