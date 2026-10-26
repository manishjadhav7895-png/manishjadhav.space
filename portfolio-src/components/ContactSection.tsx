import React, { useState } from 'react';
import { ArrowUp, Mail, Copy, Check, ExternalLink, FileText, Send, Sparkles } from 'lucide-react';

interface ContactSectionProps {
  onOpenResume?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const [copied, setCopied] = useState(false);
  const email = 'manishjadhav7895@gmail.com';

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="page-6-contact-section"
      className="relative w-full min-h-screen bg-black text-white flex flex-col justify-between px-6 sm:px-12 md:px-16 pt-24 sm:pt-28 pb-10 sm:pb-14 select-none overflow-hidden"
      style={{ backgroundColor: '#000000' }}
      aria-label="Contact Section"
    >
      {/* Subtle top separator line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-800/80 to-transparent pointer-events-none" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center items-center max-w-5xl mx-auto w-full text-center my-auto py-12 sm:py-16">
        
        {/* UPPER CENTER: Small Red Label */}
        <div className="inline-flex items-center space-x-2 tracking-[0.25em] text-red-600 font-mono text-xs sm:text-sm font-semibold uppercase mb-4 sm:mb-6 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
          <span>LET'S CONNECT</span>
        </div>

        {/* MAIN HEADLINE (Bold Condensed Editorial Display Font) */}
        <h2 className="font-display font-black uppercase tracking-tight leading-[0.92] text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-6 sm:mb-8 select-none">
          <span className="block text-white">
            LET'S MAKE SOMETHING
          </span>
          <span className="block text-red-600 drop-shadow-[0_0_24px_rgba(230,18,29,0.35)]">
            WORTH WATCHING.
          </span>
        </h2>

        {/* SUPPORTING TEXT */}
        <p className="font-body text-neutral-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10 sm:mb-14 font-normal">
          Looking for a video editor or motion designer?
          <br className="hidden sm:inline" />{' '}
          Let's talk about your next project.
        </p>

        {/* CALL TO ACTION BUTTON */}
        <div className="flex flex-col items-center justify-center mb-14 sm:mb-18">
          <a
            href={`mailto:${email}?subject=Project%20Inquiry%20%E2%80%94%20Video%20Editing%20%26%20Motion%20Design`}
            className="group relative inline-flex items-center space-x-3 px-8 sm:px-11 py-4 sm:py-4.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-sans font-bold text-sm sm:text-base tracking-[0.14em] uppercase transition-all duration-300 shadow-[0_0_30px_rgba(230,18,29,0.45)] hover:shadow-[0_0_45px_rgba(230,18,29,0.7)] hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
          >
            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
            <span>START A PROJECT</span>
          </a>
        </div>

        {/* =========================================================================
            CONTACT IDENTITY & EMAIL SECTION (Clean, Minimal, Non-Overlapping)
           ========================================================================= */}
        <div className="w-full flex flex-col items-center justify-center space-y-6 pt-4">
          
          {/* Contact Identity + Email Display */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
            <span className="font-sans font-bold uppercase tracking-[0.2em] text-white text-xs sm:text-sm">
              MANISH JADHAV
            </span>
            <span className="hidden sm:inline text-neutral-600 font-mono text-sm">
              ·
            </span>
            <div className="inline-flex items-center space-x-2">
              <a
                href={`mailto:${email}`}
                className="font-mono text-xs sm:text-sm text-neutral-300 hover:text-red-500 transition-colors tracking-wide underline underline-offset-4 decoration-neutral-700 hover:decoration-red-600"
              >
                {email}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                title="Copy email to clipboard"
                aria-label="Copy email address"
                className="p-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-all cursor-pointer"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            {copied && (
              <span className="text-[11px] font-mono text-emerald-400 tracking-wider animate-fade-in">
                COPIED!
              </span>
            )}
          </div>

          {/* Social and Navigation Links: SEPARATE LINE BELOW, PERFECTLY CENTER ALIGNED */}
          <div className="flex items-center justify-center flex-wrap gap-6 sm:gap-8 pt-1">
            <button
              type="button"
              onClick={onOpenResume}
              className="group inline-flex items-center space-x-1.5 text-xs sm:text-sm font-sans uppercase font-bold tracking-[0.18em] text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-neutral-500 group-hover:text-red-500 transition-colors" />
              <span>VIEW RESUME</span>
            </button>

            <span className="text-neutral-700 select-none">•</span>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center space-x-1.5 text-xs sm:text-sm font-sans uppercase font-bold tracking-[0.18em] text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              <span>LINKEDIN</span>
              <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-red-500 transition-colors" />
            </a>

            <span className="text-neutral-700 select-none">•</span>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center space-x-1.5 text-xs sm:text-sm font-sans uppercase font-bold tracking-[0.18em] text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              <span>INSTAGRAM</span>
              <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-red-500 transition-colors" />
            </a>
          </div>

        </div>

      </div>

      {/* =========================================================================
          PAGE BOTTOM / FOOTER AREA:
          - Back to top button
          - Clean copyright / credit line
         ========================================================================= */}
      <div className="w-full flex flex-col items-center justify-center pt-8 border-t border-neutral-900/80 space-y-4">
        <button
          type="button"
          onClick={scrollToTop}
          className="group flex items-center space-x-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Scroll back to top"
        >
          <div className="w-8 h-8 rounded-full border border-neutral-800 bg-neutral-950 flex items-center justify-center group-hover:border-red-600 group-hover:bg-neutral-900 transition-all shadow-md">
            <ArrowUp className="w-3.5 h-3.5 text-red-500 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <span className="font-mono text-[11px] sm:text-xs tracking-[0.22em] uppercase text-neutral-400 group-hover:text-red-500 transition-colors font-semibold">
            BACK TO TOP ↑
          </span>
        </button>

        <p className="font-sans text-[11px] text-neutral-600 tracking-[0.18em] uppercase text-center">
          © {new Date().getFullYear()} MANISH JADHAV · ALL RIGHTS RESERVED
        </p>
      </div>

    </footer>
  );
};
