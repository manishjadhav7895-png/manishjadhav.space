import React, { useState } from 'react';
import { X, Download, Printer, Mail, ExternalLink, Check, Briefcase, Award, Sparkles, Layers } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    // Generate clean text-based / printable resume file
    const resumeContent = `MANISH JADHAV
Video Editor & Motion Designer
Email: manishjadhav7895@gmail.com
Status: Open to Full-Time & Freelance Opportunities
Portfolio: https://manishjadhav.design

============================================================
EXECUTIVE SUMMARY
============================================================
Creative Video Editor and Motion Designer with 2+ years of professional experience crafting story-driven videos, dynamic commercial edits, and high-impact kinetic motion graphics. Proven track record across 30+ satisfied global clients and 250+ completed productions spanning brand films, founder documentaries, social campaigns, and 3D visual identities.

============================================================
CORE TECHNICAL EXPERTISE
============================================================
• Post-Production Editing: Adobe Premiere Pro, DaVinci Resolve Studio
• Motion Design & Animation: Adobe After Effects, Cinema 4D
• Graphic & Editorial Design: Adobe Photoshop, Adobe Illustrator
• Audio & Sound Design: Adobe Audition, Sound Foley, Audio Mastering
• Color Science: DaVinci Resolve, Color Grading, Rec.709 / ACES color pipelines
• Motion Systems: Kinetic Typography, Speed Ramping, Glitch & HUD Telemetry, Visual Effects (VFX)

============================================================
KEY ACHIEVEMENTS & METRICS
============================================================
• 02+ Years of high-tempo production experience
• 30+ International clients collaborated with across US, EU & Asia
• 250+ Commercial and narrative projects completed
• Millions of views across client campaigns with sustained retention rates

============================================================
SELECTED PROJECT HIGHLIGHTS
============================================================
1. NEO-RUNNER: KINETIC ANTHEM (Volt Athletics)
   - Lead Video Editor & Motion Designer
   - 2.4M+ Impressions commercial campaign featuring dynamic typography and speed ramping.

2. SILICON ROOTS: FOUNDER CHRONICLES (Aura Capital)
   - Narrative Documentary Editor
   - Emotionally paced 14-minute founder mini-documentary with custom archival color grade.

3. CYBERPULSE: TITLE SEQUENCE (Hyperion Digital)
   - 3D Motion Graphic Designer
   - Awarded Motion Excellence for futuristic telemetry HUD graphics and kinetic typography.

============================================================
AVAILABILITY
============================================================
Available immediately for remote full-time positions and select freelance commissions.
`;

    const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Manish_Jadhav_Video_Editor_Resume.txt';
    link.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-[#0A0A0C] border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#0F0F12]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Manish Jadhav — Curriculum Vitae
              </h2>
              <p className="text-xs text-neutral-400">
                Video Editor & Motion Designer · Open to Work
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold tracking-wide uppercase transition-colors cursor-pointer"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Downloaded</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CV</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 font-sans">
          
          {/* Top Header Card */}
          <div className="border-b border-neutral-800/80 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-xs font-bold text-red-500 tracking-[0.2em] uppercase">
                Video Editor & Motion Designer
              </span>
              <h1 className="text-3xl font-display font-black text-white tracking-tight uppercase mt-1">
                MANISH JADHAV
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-lg leading-relaxed">
                Specializing in story-driven narrative editing, dynamic commercial rhythm, kinetic typography, and immersive audio design for global brands and creators.
              </p>
            </div>

            <div className="text-xs text-neutral-400 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-400 font-semibold">Available for Full-time & Freelance</span>
              </div>
              <div>Worldwide Remote / Hybrid</div>
              <div className="text-neutral-300">manishjadhav7895@gmail.com</div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 bg-neutral-900/60 rounded-xl border border-neutral-800">
              <span className="text-2xl font-display font-black text-red-500">02+</span>
              <div className="text-[11px] font-semibold text-neutral-300 tracking-wider uppercase mt-0.5">
                Years Experience
              </div>
            </div>
            <div className="p-3.5 bg-neutral-900/60 rounded-xl border border-neutral-800">
              <span className="text-2xl font-display font-black text-red-500">30+</span>
              <div className="text-[11px] font-semibold text-neutral-300 tracking-wider uppercase mt-0.5">
                Clients Worked With
              </div>
            </div>
            <div className="p-3.5 bg-neutral-900/60 rounded-xl border border-neutral-800">
              <span className="text-2xl font-display font-black text-red-500">250+</span>
              <div className="text-[11px] font-semibold text-neutral-300 tracking-wider uppercase mt-0.5">
                Projects Completed
              </div>
            </div>
          </div>

          {/* Core Technical Toolkit */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-red-500" />
              Software & Post-Production Toolkit
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { name: "Premiere Pro", level: "Expert · Editing & Pacing" },
                { name: "After Effects", level: "Advanced · Motion & VFX" },
                { name: "Photoshop", level: "Advanced · Assets & Prep" },
                { name: "Illustrator", level: "Proficient · Vector Art" },
                { name: "DaVinci Resolve", level: "Color Grading & Curves" },
                { name: "Audition", level: "Audio & Foley Design" },
                { name: "Kinetic Typography", level: "Custom Animation" },
                { name: "Sound Design", level: "Rhythm & Sync" },
              ].map((tool, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-neutral-900/40 border border-neutral-800/80">
                  <div className="text-xs font-bold text-white">{tool.name}</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">{tool.level}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Experience Timeline */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-red-500" />
              Professional Experience & Projects
            </h3>
            
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Lead Video Editor & Motion Designer</span>
                  <span className="text-[11px] text-neutral-400">2023 — Present</span>
                </div>
                <div className="text-xs text-red-400 font-medium">Independent Practice & Studio Collaborations</div>
                <p className="text-xs text-neutral-400 leading-relaxed pt-1">
                  Edited and created 250+ story-driven video campaigns for brands, executive coaches, and tech businesses. Engineered high-retention cuts that amassed multi-million organic views.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Commercial Motion Graphic Designer</span>
                  <span className="text-[11px] text-neutral-400">2022 — 2023</span>
                </div>
                <div className="text-xs text-neutral-300 font-medium">Brand Identity & Digital Content</div>
                <p className="text-xs text-neutral-400 leading-relaxed pt-1">
                  Developed customized kinetic typography packages, glitch HUD sequences, and promotional launch videos in After Effects and Premiere Pro.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-800 bg-[#0F0F12]">
          <a
            href="mailto:manishjadhav7895@gmail.com"
            className="text-xs text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-red-500" />
            <span>manishjadhav7895@gmail.com</span>
          </a>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDownload}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors cursor-pointer"
            >
              Download Full Resume ↓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
