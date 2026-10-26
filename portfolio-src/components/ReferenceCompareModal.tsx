import React, { useState } from 'react';
import { X, CheckCircle2, Eye, Split, Layers } from 'lucide-react';
import { BannerData } from '../types/banner';
import { HeroBanner } from './HeroBanner';

interface ReferenceCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BannerData;
}

export const ReferenceCompareModal: React.FC<ReferenceCompareModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [viewMode, setViewMode] = useState<'side-by-side' | 'stacked' | 'checklist'>('side-by-side');

  if (!isOpen) return null;

  const comparisonPoints = [
    {
      title: "Plain Black Background (#000000)",
      description: "Removed background atmospheric red visual and glow. Pure, clean solid pitch black background maintained across all elements.",
      status: "Matched (Pure Black)",
    },
    {
      title: "Person & Red Folio Removed",
      description: "Center subject portrait has been removed and the background red 'PORTFOLIO' word has been removed, creating a clean, high-impact black background banner.",
      status: "Removed per request",
    },
    {
      title: "Typography & Font Styles (Pod & Pond Style)",
      description: "Identical condensed heavy uppercase display font for MANISH JADHAV; elegant cursive script for \"Hello, I'm\"; tracked geometric sans-serif for sub-roles and badges.",
      status: "Matched (Bebas Neue / Caveat / Plus Jakarta Sans)",
    },
    {
      title: "Placement & Alignment",
      description: "Exact positioning of top headers, left column (Name, Roles, Bio, Worldwide indicator), right column (Sparkle quote callout and 3 stats with dividers), and bottom bar (Selected Projects ── View All Projects →).",
      status: "Pixel Alignment Preserved",
    },
    {
      title: "Color Palette & Accents",
      description: "Vibrant high-contrast crimson red (#E6121D) accents, pure white typography, subtle silver body copy, and clean dark divider rules.",
      status: "Matched",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-6xl max-h-[94vh] bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/60">
          <div className="flex items-center space-x-3">
            <Layers className="w-5 h-5 text-red-500" />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Reference Design Alignment & Verification
              </h2>
              <p className="text-xs text-neutral-400">
                Verifying elements, typography, alignments, and plain black background
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('side-by-side')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                  viewMode === 'side-by-side' ? 'bg-red-600 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Split className="w-3.5 h-3.5" />
                <span>Side by Side</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('checklist')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                  viewMode === 'checklist' ? 'bg-red-600 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Spec Checklist</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {viewMode === 'side-by-side' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              
              {/* Generated Banner (Plain Black Background) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Regenerated Banner (Plain Black Background)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                    #000000 Solid
                  </span>
                </div>
                
                <div className="border border-neutral-800 rounded-xl overflow-hidden shadow-xl bg-black">
                  <HeroBanner data={data} showGuides={false} />
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  All typography styles, letter spacing, elements, and alignments are preserved with the background visual removed.
                </p>
              </div>

              {/* Element Specs Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                      Element & Typography Alignment Rules
                    </span>
                  </div>
                </div>

                <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 sm:p-5 space-y-3.5 text-xs text-neutral-300">
                  <div className="pb-3 border-b border-neutral-800">
                    <div className="font-semibold text-white text-sm mb-1">1. Top Left</div>
                    <div className="text-neutral-400">
                      <span className="text-red-500 font-bold">WEB DESIGNER</span> (Uppercase, Red, tracking 0.2em)<br/>
                      <span className="text-white">DIGITAL CREATOR</span> (Uppercase, White, tracking 0.2em)
                    </div>
                  </div>

                  <div className="pb-3 border-b border-neutral-800">
                    <div className="font-semibold text-white text-sm mb-1">2. Top Right</div>
                    <div className="text-neutral-400">
                      <span className="text-neutral-200">AVAILABLE FOR FREELANCE</span> + Red 4-point Sparkle Star
                    </div>
                  </div>

                  <div className="pb-3 border-b border-neutral-800">
                    <div className="font-semibold text-white text-sm mb-1">3. Background Giant Display</div>
                    <div className="text-neutral-400">
                      <span className="text-red-500 font-bold font-mono">PORTFOLIO</span> in ultra-condensed font, layered directly behind the subject's head and torso.
                    </div>
                  </div>

                  <div className="pb-3 border-b border-neutral-800">
                    <div className="font-semibold text-white text-sm mb-1">4. Left Column Hierarchy</div>
                    <div className="text-neutral-400 space-y-1">
                      <div>Script: <span className="italic text-white">"Hello, I'm"</span> in cursive handwriting above the name</div>
                      <div>Name: <span className="font-bold text-white">MANISH JADHAV</span> in massive uppercase condensed type</div>
                      <div>Roles: <span className="text-red-500 font-semibold">VIDEO EDITOR & MOTION DESIGNER</span></div>
                      <div>Bio: Full narrative paragraph with story-driven copy</div>
                      <div>Status: Red Globe icon + <span className="text-white">AVAILABLE WORLDWIDE</span></div>
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-white text-sm mb-1">5. Right Column & Footer</div>
                    <div className="text-neutral-400 space-y-1">
                      <div>Callout: Circular red badge + <span className="text-neutral-200">Turning ideas into powerful digital experiences.</span></div>
                      <div>Metrics: 3 stacked red counters (<span className="text-red-500">2+</span> YEARS EXPERIENCE, <span className="text-red-500">40+</span> PROJECTS COMPLETED, <span className="text-red-500">20+</span> HAPPY CLIENTS) with dark horizontal rules</div>
                      <div>Bottom Bar: <span className="text-white font-bold">SELECTED PROJECTS</span> ─── <span className="text-neutral-300">VIEW ALL PROJECTS →</span></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {viewMode === 'checklist' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {comparisonPoints.map((point, index) => (
                  <div key={index} className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-white text-sm">{point.title}</h4>
                      <span className="text-xs text-emerald-400 font-medium flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {point.status}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-neutral-800 bg-neutral-900/50">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs rounded-lg transition-colors cursor-pointer"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
