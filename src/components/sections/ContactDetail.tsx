import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Mail, Linkedin, Github, Send, CheckCircle2, MapPin } from 'lucide-react';

export const ContactDetail: React.FC = () => {
  const { personal } = portfolioData;
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate sending message
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 800);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono tracking-[0.3em] uppercase text-brand-accent">Get In Touch</span>
        <h3 className="text-3xl md:text-4xl font-serif font-light text-white mt-1">
          Let's Build Something Meaningful
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 1 Col: Connect Channels */}
        <div className="space-y-4">
          <div className="glass-panel p-6 rounded-2xl">
            <h4 className="text-base font-serif text-white mb-4">Direct Channels</h4>
            <div className="space-y-3">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 hover:text-brand-accent transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono truncate">
                  <div className="text-white/40 text-[10px] uppercase">Email</div>
                  <div>{personal.email}</div>
                </div>
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 hover:text-brand-accent transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono">
                  <div className="text-white/40 text-[10px] uppercase">LinkedIn</div>
                  <div>dhruv-mahadik-51</div>
                </div>
              </a>

              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 hover:text-brand-accent transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <Github className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono">
                  <div className="text-white/40 text-[10px] uppercase">GitHub</div>
                  <div>dnm124421</div>
                </div>
              </a>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-white/60">
              <MapPin className="w-3.5 h-3.5 text-brand-accent" />
              <span>{personal.location}</span>
            </div>
          </div>
        </div>

        {/* Right 2 Cols: Message Form */}
        <div className="lg:col-span-2">
          <div className="glass-panel p-6 md:p-8 rounded-2xl relative">
            <h4 className="text-xl font-serif text-white font-light mb-2">Send a Direct Message</h4>
            <p className="text-xs md:text-sm text-white/60 font-light mb-6">
              Have a data question, role opportunity, or project collaboration? Drop a note below.
            </p>

            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-brand-accent/20 border border-brand-accent flex items-center justify-center text-brand-accent mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h5 className="font-serif text-2xl text-white mb-1">Message Sent!</h5>
                <p className="text-xs md:text-sm text-white/70 font-light max-w-sm">
                  Thank you for reaching out! I'll review your note and respond back shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-brand-accent focus:bg-white/10 text-white text-sm outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-brand-accent focus:bg-white/10 text-white text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Data Analytics / Project Inquiry"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-brand-accent focus:bg-white/10 text-white text-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your dataset, project scope, or ideas..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-brand-accent focus:bg-white/10 text-white text-sm outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-black font-semibold text-sm font-mono flex items-center justify-center gap-2 cursor-pointer transition-all duration-200"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSending ? 'Transmitting...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
