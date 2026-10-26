import React, { useState } from 'react';
import { BannerData, DEFAULT_BANNER_DATA } from './types/banner';
import { HeroBanner } from './components/HeroBanner';
import { ShowreelSection } from './components/ShowreelSection';
import { VideoShowcase } from './components/VideoShowcase';
import { LongFormSection } from './components/LongFormSection';
import { ContactSection } from './components/ContactSection';
import { LiquidOverlay } from './components/LiquidOverlay';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [bannerData] = useState<BannerData>(DEFAULT_BANNER_DATA);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="relative min-h-[500vh] bg-black text-white font-sans antialiased selection:bg-red-600 selection:text-white"
      style={{ backgroundColor: '#000000' }}
    >
      
      {/* Continuous Smoked-Black Transparent Liquid/Glass Membrane Layer */}
      <LiquidOverlay />

      {/* Permanently Fixed Top Navigation (Continuous throughout entire website) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/[0.04] transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-12 md:px-16 py-4 sm:py-5">
          
          {/* Top-Left: VIDEO EDITOR / MOTION DESIGNER (Continuous on top) */}
          <div className="flex flex-col space-y-0.5 tracking-[0.22em] uppercase font-sans select-none">
            <span className="text-red-600 text-xs sm:text-sm font-bold leading-tight drop-shadow-[0_0_8px_rgba(230,18,29,0.5)]">
              VIDEO EDITOR
            </span>
            <span className="text-neutral-200 text-xs sm:text-sm font-semibold leading-tight">
              MOTION DESIGNER
            </span>
          </div>

          {/* Top-Right: OPEN TO WORK (Continuous on top) */}
          <div className="flex items-center space-x-2.5 tracking-[0.2em] uppercase font-sans select-none">
            <div className="relative flex items-center justify-center w-2.5 h-2.5">
              <span className="absolute w-2.5 h-2.5 rounded-full bg-emerald-500 opacity-75 animate-ping" />
              <span className="relative w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </div>
            <span className="text-white text-xs sm:text-sm font-bold tracking-[0.18em]">
              OPEN TO WORK
            </span>
          </div>

        </div>
      </header>

      {/* =========================================================================
          PAGE 1 — FULL-SCREEN EMPTY VIEWPORT (EXACTLY 100vh)
          Solid black, clean empty space reserved for custom scrolling animation.
         ========================================================================= */}
      <section 
        id="page-1-empty-animation-space"
        className="w-full h-screen min-h-[100vh] relative select-none bg-black"
        style={{ backgroundColor: '#000000' }}
        aria-label="Empty scrolling animation viewport"
      >
        {/* Intentionally completely clean, empty space */}
      </section>

      {/* =========================================================================
          PAGE 2 — HERO SECTION (ON SOLID BLACK)
          Restored hero typography, copy, CTAs, quote, stats, and tools line.
         ========================================================================= */}
      <section 
        id="page-2-hero-section"
        className="w-full min-h-screen relative flex flex-col justify-center bg-black"
        style={{ backgroundColor: '#000000' }}
        aria-label="Hero section"
      >
        <HeroBanner
          data={bannerData}
          onViewWork={() => scrollToSection('page-3-showreel-section')}
          onViewAllProjects={() => scrollToSection('page-5-longform-showcase')}
          onDownloadResume={() => setIsResumeOpen(true)}
        />
      </section>

      {/* =========================================================================
          PAGE 3 — SHOWREEL SECTION (DEDICATED FULL-SCREEN 16:9 PLAYER)
          - Editorial Heading: SHOWREEL
          - Sub-label: VIDEO EDITOR · MOTION DESIGNER
          - Centered 16:9 widescreen cinematic video player (75-85% width)
          - Subtle red glow & outline, custom scrubber & audio controls.
         ========================================================================= */}
      <ShowreelSection onScrollToNext={() => scrollToSection('page-4-story-reels-section')} />

      {/* =========================================================================
          PAGE 4 — STORY & VERTICAL REELS SHOWCASE (9:16 VERTICAL CARDS)
          - Multiple stories: 01, 02, 03, 04, 05, 06
          - 3D overlapping layout, center focus, full mobile & commercial reel cuts.
         ========================================================================= */}
      <VideoShowcase onExploreLongForm={() => scrollToSection('page-5-longform-showcase')} />

      {/* =========================================================================
          PAGE 5: LONG-FORM VIDEOS SCROLLING SECTION (16:9 ACCORDION)
          - 16:9 widescreen YouTube format, accordion transformations from reference
          - Circular arrows, pagination dots, smooth navigation.
         ========================================================================= */}
      <LongFormSection onExploreContact={() => scrollToSection('page-6-contact-section')} />

      {/* =========================================================================
          PAGE 6 — FINAL CONTACT / ENDING PAGE
          - Pure solid black background (no liquid effect on this page)
          - Editorial headline: LET'S MAKE SOMETHING / WORTH WATCHING.
          - CTA button: START A PROJECT
          - Contact Identity: MANISH JADHAV · manishjadhav7895@gmail.com
          - Center-aligned links: VIEW RESUME · LINKEDIN · INSTAGRAM
          - Minimal Back to top and copyright footer.
         ========================================================================= */}
      <ContactSection onOpenResume={() => setIsResumeOpen(true)} />

      {/* Interactive Resume Modal for "DOWNLOAD RESUME ↓" */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

    </div>
  );
}
