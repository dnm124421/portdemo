import React, { useState } from 'react';
import { portfolioData, Project } from '../../data/portfolioData';
import { Github, ExternalLink, Activity, Sparkles, Layers } from 'lucide-react';

export const ProjectsDetail: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { projects } = portfolioData;

  const categories = ['All', 'Machine Learning', 'Data Analytics', 'Systems & AI', 'Web Development'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Header & Category Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-brand-accent">Engineered Works</span>
          <h3 className="text-3xl md:text-4xl font-serif font-light text-white mt-1">
            Featured Projects & Models
          </h3>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl glass-panel border-white/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-brand-accent text-black font-semibold shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project: Project) => (
          <div
            key={project.id}
            className="glass-panel glass-panel-hover p-6 md:p-8 rounded-2xl flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-2xl group-hover:bg-brand-accent/15 transition-all duration-500 pointer-events-none" />

            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-brand-accent">
                  <Layers className="w-3 h-3" />
                  {project.category}
                </span>

                {project.featured && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-300/90 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <h4 className="text-xl md:text-2xl font-serif text-white font-light group-hover:text-brand-accent transition-colors duration-300">
                {project.title}
              </h4>
              <p className="text-xs font-mono text-white/50 tracking-wide mt-1 mb-3">
                {project.subtitle}
              </p>

              {/* Description */}
              <p className="text-sm text-white/75 font-light leading-relaxed mb-5">
                {project.description}
              </p>

              {/* Metrics Badge */}
              {project.metrics && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brand-accent/10 border border-brand-accent/20 text-xs font-mono text-brand-accent mb-5">
                  <Activity className="w-3.5 h-3.5" />
                  <span>{project.metrics}</span>
                </div>
              )}
            </div>

            <div>
              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10 mb-5">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-white/[0.04] text-[11px] font-mono text-white/70"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-white/80 hover:text-brand-accent transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-accent hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
