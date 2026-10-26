import React, { useState } from 'react';
import { Play, Pause, Maximize2, Clock, Eye, Film, Sparkles, Volume2, VolumeX, ArrowRight, X } from 'lucide-react';
import { ProjectItem, FEATURED_PROJECTS } from '../types/banner';

interface FeaturedProjectsProps {
  onViewAllProjects?: () => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onViewAllProjects }) => {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackProgress, setPlaybackProgress] = useState<number>(35);

  const handleOpenPlayer = (project: ProjectItem) => {
    setActiveProject(project);
    setIsPlaying(true);
    setPlaybackProgress(25);
  };

  const handleClosePlayer = () => {
    setActiveProject(null);
  };

  return (
    <section id="selected-work" className="w-full py-16 sm:py-24 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-neutral-900">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-red-500 font-sans">
              Portfolio Showcase
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tight">
            SELECTED WORK
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-md">
            Commercial campaigns, story-driven documentary edits and kinetic motion identities.
          </p>
        </div>

        <button
          type="button"
          onClick={onViewAllProjects}
          className="flex items-center space-x-2 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-neutral-300 hover:text-white group transition-colors cursor-pointer self-start sm:self-end pb-1"
        >
          <span>VIEW ALL (250+)</span>
          <ArrowRight className="w-4 h-4 text-red-500 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>

      {/* 3 Featured Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mt-10">
        {FEATURED_PROJECTS.map((project, idx) => (
          <div
            key={project.id}
            className="group relative flex flex-col bg-[#0A0A0C] border border-neutral-900 hover:border-neutral-700 transition-all duration-300 rounded-xl overflow-hidden shadow-2xl"
          >
            {/* Project Cinematic Visual Header / Video Card */}
            <div 
              onClick={() => handleOpenPlayer(project)}
              className="relative aspect-video w-full bg-neutral-950 overflow-hidden cursor-pointer"
            >
              {/* Background Atmospheric Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.thumbnailGradient} transition-transform duration-700 group-hover:scale-105`} />
              
              {/* Editorial Graphic Gridlines inside thumbnail */}
              <div className="absolute inset-0 opacity-20 pointer-events-none border border-neutral-800" />
              <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                CAM_0{idx + 1} · {project.duration}
              </div>

              <div className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 border border-neutral-800 text-neutral-300">
                {project.viewsOrMetric}
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-red-600/90 group-hover:bg-red-600 text-white flex items-center justify-center shadow-[0_0_25px_rgba(230,18,29,0.6)] transform group-hover:scale-110 transition-all duration-300">
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </div>
              </div>

              {/* Lower Overlay Badge */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-neutral-300">
                <span className="font-mono bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm border border-neutral-800/80">
                  {project.client}
                </span>
                <span className="font-mono text-red-400">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
                  <span className="text-red-500 font-semibold tracking-wider uppercase font-mono text-[11px]">
                    {project.role}
                  </span>
                  <span className="font-mono">{project.duration}</span>
                </div>

                <h3 
                  onClick={() => handleOpenPlayer(project)}
                  className="text-lg sm:text-xl font-display font-black text-white uppercase tracking-wide group-hover:text-red-500 transition-colors cursor-pointer"
                >
                  {project.title}
                </h3>

                <p className="text-xs text-neutral-400 mt-2.5 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Tools list */}
              <div className="pt-3 border-t border-neutral-900/80 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {project.software.map((sw, sIdx) => (
                    <span 
                      key={sIdx}
                      className="text-[10px] font-mono px-2 py-0.5 bg-neutral-900 text-neutral-400 rounded border border-neutral-800/60"
                    >
                      {sw}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenPlayer(project)}
                  className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1 group/btn cursor-pointer"
                >
                  <span className="uppercase text-[11px] tracking-wider">Play</span>
                  <ArrowRight className="w-3.5 h-3.5 text-red-500 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Interactive Cinematic Video Player Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-[#08080A] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            
            {/* Player Top Bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-800 bg-[#0C0C0E] text-xs">
              <div className="flex items-center space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                <span className="font-mono text-neutral-400">PROJECT REEL // {activeProject.client}</span>
                <span className="text-neutral-600">·</span>
                <span className="font-bold text-white uppercase">{activeProject.title}</span>
              </div>
              <button
                type="button"
                onClick={handleClosePlayer}
                className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Viewport Stage */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
              {/* Dynamic Film Background Pattern */}
              <div className={`absolute inset-0 bg-gradient-to-br ${activeProject.thumbnailGradient} opacity-80`} />
              
              {/* Telemetry HUD Overlays */}
              <div className="absolute top-4 left-4 font-mono text-[11px] text-red-400 tracking-wider">
                REC ● 4K DCI · 23.976 FPS · PRORES 4444
              </div>
              <div className="absolute top-4 right-4 font-mono text-[11px] text-neutral-400">
                TIMECODE: 00:00:{playbackProgress < 10 ? `0${playbackProgress}` : playbackProgress}:14
              </div>

              {/* Center Play Simulation */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-[0_0_30px_rgba(230,18,29,0.7)] cursor-pointer transform hover:scale-105 transition-all"
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 fill-current" />
                  ) : (
                    <Play className="w-7 h-7 ml-1 fill-current" />
                  )}
                </div>
                <div className="text-neutral-200 text-xs font-mono">
                  {isPlaying ? 'PLAYING MASTER CUT' : 'PAUSED'}
                </div>
              </div>

              {/* Simulated Audio Waveform Bar */}
              <div className="absolute bottom-16 inset-x-8 h-6 flex items-end justify-between gap-1 opacity-40 pointer-events-none">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-red-500 rounded-t-sm transition-all duration-150"
                    style={{
                      height: isPlaying ? `${Math.sin(i * 0.4 + playbackProgress) * 40 + 50}%` : '20%',
                    }}
                  />
                ))}
              </div>

              {/* Scrub Timeline & Bottom Player Controls */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex flex-col space-y-2">
                {/* Timeline Progress Bar */}
                <div 
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setPlaybackProgress(Math.round((clickX / rect.width) * 100));
                  }}
                  className="w-full h-1.5 bg-neutral-800 rounded-full cursor-pointer relative overflow-hidden group"
                >
                  <div 
                    className="h-full bg-red-600 rounded-full relative"
                    style={{ width: `${playbackProgress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-300 pt-1">
                  <div className="flex items-center space-x-3">
                    <button 
                      type="button" 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="hover:text-white cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setIsMuted(!isMuted)}
                      className="hover:text-white cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span className="font-mono text-[11px] text-neutral-400">
                      00:00:{playbackProgress < 10 ? `0${playbackProgress}` : playbackProgress} / {activeProject.duration}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] text-red-500 font-mono font-semibold uppercase">
                      {activeProject.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Production Meta Drawer */}
            <div className="p-5 sm:p-6 bg-[#0B0B0E] border-t border-neutral-800 text-xs text-neutral-300 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <h4 className="font-bold text-white text-sm uppercase">{activeProject.title}</h4>
                <p className="text-neutral-400 leading-relaxed text-xs">
                  {activeProject.description}
                </p>
              </div>
              <div className="space-y-2 border-t md:border-t-0 md:border-l border-neutral-800 md:pl-4">
                <div className="font-semibold text-white">Post-Production Stack:</div>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.software.map((sw, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-neutral-900 text-neutral-300 rounded border border-neutral-800">
                      {sw}
                    </span>
                  ))}
                </div>
                <div className="text-[11px] text-neutral-400 pt-1 font-mono">
                  Client: {activeProject.client} · Deliverable: 4K Master
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
