import React, { forwardRef } from 'react';
import { ArrowRight, ArrowDown, ChevronDown } from 'lucide-react';
import { BannerData } from '../types/banner';
import { PortraitVisual } from './PortraitVisual';

interface HeroBannerProps {
  data: BannerData;
  showGuides?: boolean;
  onViewWork?: () => void;
  onDownloadResume?: () => void;
  onViewAllProjects?: () => void;
}

// 4-point Sparkle Star icon with subtle animation
const SparkleStar: React.FC<{ className?: string; glow?: boolean; animated?: boolean }> = ({ 
  className = "w-4 h-4 text-red-600", 
  glow = true,
  animated = false 
}) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`${className} ${animated ? 'animate-subtle-sparkle' : ''} ${glow ? 'filter drop-shadow-[0_0_8px_rgba(230,18,29,0.85)]' : ''}`}
  >
    <path d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z" />
  </svg>
);

export const HeroBanner = forwardRef<HTMLDivElement, HeroBannerProps>(({
  data,
  showGuides = false,
  onViewWork,
  onDownloadResume,
  onViewAllProjects,
}, ref) => {
  return (
    <div
      ref={ref}
      id="portfolio-hero-banner"
      className="relative w-full min-h-screen h-[100vh] min-h-[700px] flex flex-col justify-between overflow-hidden bg-black text-white select-none transition-all duration-300 cinematic-grain pt-28 sm:pt-32 pb-8 sm:pb-12 px-6 sm:px-12 md:px-16"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Cinematic Deep Red Ambient Light Glow (Only if background title enabled) */}
      {data.showBackgroundTitle && (
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at 50% 40%, rgba(200, 15, 25, 0.22) 0%, rgba(120, 8, 15, 0.1) 40%, transparent 72%)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Alignment Guides Overlay (Optional view for inspection) */}
      {showGuides && (
        <div className="absolute inset-0 pointer-events-none z-50 opacity-60">
          <div className="absolute inset-x-0 top-16 border-b border-red-500/40 border-dashed" />
          <div className="absolute inset-x-0 bottom-16 border-t border-red-500/40 border-dashed" />
          <div className="absolute inset-y-0 left-16 border-r border-red-500/40 border-dashed" />
          <div className="absolute inset-y-0 right-16 border-l border-red-500/40 border-dashed" />
          <div className="absolute inset-y-0 left-1/2 border-r border-cyan-400/40 border-dashed" />
          <div className="absolute inset-x-0 top-1/2 border-b border-cyan-400/40 border-dashed" />
        </div>
      )}

      {/* Layer 1: Giant Background Editorial Typography: "EDITOR" (Removed per user request) */}
      {data.showBackgroundTitle && data.backgroundTitleColorMode !== 'hidden' && (
        <div 
          className="absolute inset-x-0 top-[6%] sm:top-[8%] md:top-[9%] flex justify-center pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="stretched-editor-text font-display font-black uppercase leading-none whitespace-nowrap text-center opacity-85 select-none"
            style={{
              fontSize: 'clamp(110px, 22vw, 340px)',
            }}
          >
            {data.backgroundTitle || "EDITOR"}
          </span>
        </div>
      )}

      {/* Layer 2: Center Dramatic Portrait (Removed per user request) */}
      {data.showPerson && (
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-10 pb-0">
          <div className="w-[66%] sm:w-[56%] md:w-[50%] lg:w-[44%] xl:w-[40%] h-[90%] md:h-[95%] flex items-end justify-center relative">
            <PortraitVisual
              customPhotoUrl={data.customPhotoUrl}
              scale={data.portraitScale || 108}
              yOffset={data.portraitYOffset || 0}
              rimLightIntensity={data.rimLightIntensity || 90}
            />
          </div>
        </div>
      )}

      {/* Layer 3: Foreground Editorial Composition & Layout Grid */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between max-w-7xl mx-auto">
        
        {/* Middle Main Content Row */}
        <div className="w-full grid grid-cols-12 items-center my-auto pt-4 sm:pt-6 pb-2">
          
          {/* Left Column: Greeting, Name, Role, Supporting Copy, and CTAs */}
          <div className="col-span-12 sm:col-span-7 md:col-span-6 lg:col-span-5 flex flex-col items-start z-30 max-w-sm sm:max-w-md">
            
            {/* Script Greeting: "Hello, I'm" */}
            <div className="relative pl-1 -mb-1 sm:-mb-2 select-none">
              <span 
                className="font-script text-white text-3xl sm:text-4xl md:text-[44px] leading-none inline-block -rotate-6 transform origin-bottom-left drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]"
              >
                {data.greetingScript || "Hello, I'm"}
              </span>
            </div>

            {/* Giant Stacked Editorial Name: "MANISH JADHAV" */}
            <div className="flex flex-col select-none my-0">
              <h1 
                className="font-display font-black text-white uppercase tracking-tight leading-[0.88] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
                style={{ fontSize: 'clamp(56px, 8vw, 115px)' }}
              >
                {data.firstName || "MANISH"}
              </h1>
              <h1 
                className="font-display font-black text-white uppercase tracking-tight leading-[0.88] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
                style={{ fontSize: 'clamp(56px, 8vw, 115px)' }}
              >
                {data.lastName || "JADHAV"}
              </h1>
            </div>

            {/* Red Roles: "VIDEO EDITOR & MOTION DESIGNER" */}
            <div className="mt-3.5 sm:mt-4 flex flex-col font-sans uppercase font-bold text-red-600 tracking-[0.08em] leading-snug drop-shadow-[0_0_12px_rgba(230,18,29,0.4)]">
              <span className="text-sm sm:text-base md:text-lg lg:text-xl">
                {data.roleTitle || "VIDEO EDITOR & MOTION DESIGNER"}
              </span>
            </div>

            {/* Supporting Copy */}
            <p className="mt-3.5 sm:mt-4 text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-[340px] font-sans font-normal antialiased drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              {data.supportingCopy || "I create story-driven videos, motion graphics and visual experiences for brands, businesses and creators."}
            </p>

            {/* Subtle Premium CTA Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3 pt-1">
              {/* Primary CTA: VIEW MY WORK → */}
              <button
                type="button"
                onClick={onViewWork}
                className="group relative inline-flex items-center space-x-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-md text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 shadow-[0_0_20px_rgba(230,18,29,0.35)] hover:shadow-[0_0_25px_rgba(230,18,29,0.6)] cursor-pointer"
              >
                <span>VIEW MY WORK</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA: DOWNLOAD RESUME ↓ */}
              <button
                type="button"
                onClick={onDownloadResume}
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-md text-xs sm:text-sm font-semibold tracking-wider uppercase border border-neutral-800 hover:border-red-600/60 transition-all duration-200 cursor-pointer"
              >
                <span>DOWNLOAD RESUME</span>
                <ArrowDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-red-500 transition-colors" />
              </button>
            </div>

          </div>

          {/* Center Clearance for Portrait */}
          <div className="hidden sm:block sm:col-span-1 md:col-span-2 lg:col-span-3 pointer-events-none" />

          {/* Right Column: Quote with Animated Sparkle & 3 Clean Minimal Stats */}
          <div className="col-span-12 sm:col-span-4 md:col-span-4 lg:col-span-4 flex flex-col items-end sm:items-start md:items-end z-30 mt-6 sm:mt-0">
            
            {/* Right-Side Quote: "Turning ideas into visual stories." with Animated Sparkle */}
            <div className="flex items-center space-x-3 mb-8 sm:mb-10 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-red-600/70 bg-red-950/20 backdrop-blur-sm flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(230,18,29,0.3)]">
                <SparkleStar className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-red-500" animated={true} />
              </div>
              <div className="text-left font-sans text-xs sm:text-sm text-neutral-200 leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                <p className="font-medium text-white">{data.quoteLine1 || "Turning ideas into"}</p>
                <p className="font-medium text-white">{data.quoteLine2 || "visual stories."}</p>
              </div>
            </div>

            {/* Three Clean Minimal Statistics Stack */}
            <div className="flex flex-col w-full max-w-[220px] space-y-3 sm:space-y-4">
              
              {/* Stat 1: 02+ YEARS EXPERIENCE */}
              <div className="flex items-center justify-between space-x-4">
                <span className="font-display font-black text-red-600 text-4xl sm:text-5xl lg:text-6xl leading-none drop-shadow-[0_0_12px_rgba(230,18,29,0.4)]">
                  {data.stat1Value || "02+"}
                </span>
                <div className="flex flex-col text-left font-sans text-[10px] sm:text-[11px] font-semibold text-neutral-200 tracking-wider uppercase leading-tight">
                  <span>{data.stat1Line1 || "YEARS"}</span>
                  <span>{data.stat1Line2 || "EXPERIENCE"}</span>
                </div>
              </div>

              {/* Divider line */}
              <div className="w-full h-[1px] bg-neutral-900 border-b border-neutral-900" />

              {/* Stat 2: 30+ CLIENTS WORKED WITH */}
              <div className="flex items-center justify-between space-x-4">
                <span className="font-display font-black text-red-600 text-4xl sm:text-5xl lg:text-6xl leading-none drop-shadow-[0_0_12px_rgba(230,18,29,0.4)]">
                  {data.stat2Value || "30+"}
                </span>
                <div className="flex flex-col text-left font-sans text-[10px] sm:text-[11px] font-semibold text-neutral-200 tracking-wider uppercase leading-tight">
                  <span>{data.stat2Line1 || "CLIENTS"}</span>
                  <span>{data.stat2Line2 || "WORKED WITH"}</span>
                </div>
              </div>

              {/* Divider line */}
              <div className="w-full h-[1px] bg-neutral-900 border-b border-neutral-900" />

              {/* Stat 3: 250+ PROJECTS COMPLETED */}
              <div className="flex items-center justify-between space-x-4">
                <span className="font-display font-black text-red-600 text-4xl sm:text-5xl lg:text-6xl leading-none drop-shadow-[0_0_12px_rgba(230,18,29,0.4)]">
                  {data.stat3Value || "250+"}
                </span>
                <div className="flex flex-col text-left font-sans text-[10px] sm:text-[11px] font-semibold text-neutral-200 tracking-wider uppercase leading-tight">
                  <span>{data.stat3Line1 || "PROJECTS"}</span>
                  <span>{data.stat3Line2 || "COMPLETED"}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Small Tool Line near bottom of hero */}
        <div className="w-full text-center py-2 select-none">
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-neutral-500 uppercase">
            {data.toolsList || "PREMIERE PRO · AFTER EFFECTS · PHOTOSHOP · ILLUSTRATOR"}
          </span>
        </div>

        {/* Bottom Hero Bar: Scroll Cue + "SELECTED WORK ─── VIEW ALL →" */}
        <div className="w-full flex items-center justify-between pt-3 border-t border-neutral-900/80 select-none">
          {/* Left: "SELECTED WORK" */}
          <button
            type="button"
            onClick={onViewWork}
            className="shrink-0 flex items-center space-x-2 text-white hover:text-red-500 transition-colors cursor-pointer group"
          >
            <span className="font-sans font-bold text-xs sm:text-sm tracking-[0.2em] uppercase">
              {data.footerLeft || "SELECTED WORK"}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-red-500 group-hover:translate-y-0.5 transition-transform" />
          </button>

          {/* Middle: Horizontal Rule Connecting Left and Right */}
          <div className="flex-1 h-[1px] bg-neutral-900 mx-5 sm:mx-8 md:mx-12" />

          {/* Right: "VIEW ALL →" */}
          <button 
            type="button"
            onClick={onViewAllProjects}
            className="shrink-0 flex items-center space-x-2 text-neutral-400 hover:text-white transition-colors group cursor-pointer"
          >
            <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase">
              {data.footerRight || "VIEW ALL"}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-red-500 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
});

HeroBanner.displayName = "HeroBanner";
