import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, ChevronDown } from 'lucide-react';

interface ShowreelSectionProps {
  onScrollToNext?: () => void;
}

export const ShowreelSection: React.FC<ShowreelSectionProps> = ({ onScrollToNext }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('01:45');
  const [showControls, setShowControls] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimer = useRef<NodeJS.Timeout | null>(null);

  // High quality 1080p cinematic reel video
  const showreelVideoSrc = "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4";
  const showreelPosterSrc = "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=85";

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 105;
    setProgress((current / total) * 100);
    setCurrentTime(formatTime(current));
    if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
      setDuration(formatTime(videoRef.current.duration));
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const seekTime = pos * (videoRef.current.duration || 105);
    videoRef.current.currentTime = seekTime;
    setProgress(pos * 100);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    if (isPlaying) {
      hideControlsTimer.current = setTimeout(() => {
        if (!isHovering) {
          setShowControls(false);
        }
      }, 2800);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleScrollDown = () => {
    if (onScrollToNext) {
      onScrollToNext();
      return;
    }
    const nextEl = document.getElementById('page-4-story-reels-section') || document.getElementById('video-showcase-section');
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="page-3-showreel-section"
      className="relative w-full min-h-screen py-20 sm:py-24 md:py-28 px-4 sm:px-6 md:px-12 bg-black flex flex-col items-center justify-center select-none overflow-hidden"
      style={{ backgroundColor: '#000000' }}
      aria-label="Dedicated Showreel Section"
      onMouseMove={handleMouseMove}
    >
      {/* Subtle Red Ambient Lighting around the Showreel */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[1100px] h-[65vh] max-h-[640px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(230, 18, 29, 0.18) 0%, rgba(180, 10, 20, 0.05) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* =========================================================================
          PAGE 3 HEADER: EDITORIAL SHOWREEL TYPOGRAPHY
          - Heading: SHOWREEL (bold condensed editorial typography)
          - Sub-label: VIDEO EDITOR · MOTION DESIGNER
         ========================================================================= */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-6 sm:mb-8 md:mb-10">
        <h2 
          className="font-display font-black text-white uppercase tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none"
          style={{ letterSpacing: '0.04em' }}
        >
          SHOWREEL
        </h2>
        
        <p className="mt-2 sm:mt-3 text-[11px] sm:text-xs md:text-sm font-mono tracking-[0.25em] text-neutral-400 uppercase">
          VIDEO EDITOR <span className="text-red-600 font-bold">·</span> MOTION DESIGNER
        </p>
      </div>

      {/* =========================================================================
          CINEMATIC SHOWREEL VIDEO PLAYER (TRUE 16:9 WIDESCREEN)
          Occupies approximately 75–85% of available desktop width.
          Main visual focus of Page 3. Subtle red outline and ambient glow.
         ========================================================================= */}
      <div className="relative z-10 w-full max-w-5xl lg:max-w-6xl mx-auto flex flex-col items-center">
        <div
          ref={containerRef}
          className="relative w-full aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-950 border border-red-600/40 shadow-[0_20px_70px_rgba(230,18,29,0.28)] group transition-all duration-300"
          style={{
            boxShadow: isPlaying 
              ? '0 25px 80px -10px rgba(230, 18, 29, 0.35), 0 0 35px 2px rgba(230, 18, 29, 0.15)' 
              : '0 20px 60px -15px rgba(230, 18, 29, 0.25)',
          }}
          onClick={togglePlay}
        >
          {/* Fallback Poster Image */}
          <img
            src={showreelPosterSrc}
            alt="Manish Jadhav Showreel Poster"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 pointer-events-none select-none ${
              isPlaying ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* HTML5 16:9 Video Element */}
          <video
            ref={videoRef}
            src={showreelVideoSrc}
            poster={showreelPosterSrc}
            playsInline
            loop={false}
            muted={isMuted}
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
            className="relative w-full h-full object-cover"
          />

          {/* Top Subtle Status Badges */}
          <div className="absolute top-3 sm:top-5 inset-x-4 sm:inset-x-6 z-20 flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-widest pointer-events-none select-none">
            <div className="flex items-center space-x-2 bg-black/75 px-3 py-1 rounded-md backdrop-blur-md border border-white/10 text-white/90">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span className="uppercase">SHOWREEL 2025/2026</span>
            </div>
            <div className="bg-black/75 px-3 py-1 rounded-md backdrop-blur-md border border-white/10 text-neutral-300 uppercase">
              1080P MASTER <span className="text-red-500 font-bold">·</span> 16:9
            </div>
          </div>

          {/* Large Center Play Button Overlay (Visible when paused) */}
          {!isPlaying && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/35 backdrop-blur-[2px] transition-all">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-[0_0_35px_rgba(230,18,29,0.7)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border border-white/20"
                aria-label="Play Showreel"
              >
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white translate-x-0.5" />
              </button>
            </div>
          )}

          {/* Bottom Gradient Fade for Controls */}
          <div 
            className={`absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
            }`} 
          />

          {/* Custom Interactive Player Control Bar */}
          <div
            className={`absolute inset-x-0 bottom-0 z-30 p-3 sm:p-5 flex flex-col space-y-2 sm:space-y-3 transition-opacity duration-300 ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Timeline Progress Scrubber */}
            <div
              className="relative w-full h-2 bg-white/20 hover:h-2.5 rounded-full cursor-pointer transition-all overflow-hidden"
              onClick={handleSeek}
            >
              <div
                className="absolute left-0 top-0 bottom-0 bg-red-600 rounded-full shadow-[0_0_10px_rgba(230,18,29,0.9)] transition-[width] duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Bottom Controls Row: Play/Pause, Mute, Time, Fullscreen */}
            <div className="flex items-center justify-between text-xs font-mono text-neutral-300">
              <div className="flex items-center space-x-3 sm:space-x-4">
                {/* Play / Pause Toggle */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className="hover:text-white transition-colors cursor-pointer p-1"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  ) : (
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
                  )}
                </button>

                {/* Sound Mute / Unmute Toggle */}
                <button
                  type="button"
                  onClick={toggleMute}
                  className="flex items-center space-x-1.5 hover:text-white transition-colors cursor-pointer p-1"
                  aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                      <span className="text-[10px] sm:text-[11px] text-neutral-400 uppercase hidden sm:inline">MUTED</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      <span className="text-[10px] sm:text-[11px] text-neutral-400 uppercase hidden sm:inline">SOUND ON</span>
                    </>
                  )}
                </button>

                {/* Current Time / Duration Counter */}
                <span className="text-[11px] sm:text-xs text-neutral-400 tracking-wider">
                  {currentTime} / {duration}
                </span>
              </div>

              {/* Right Side: Replay & Fullscreen */}
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                      setProgress(0);
                    }
                  }}
                  className="hover:text-white transition-colors cursor-pointer p-1 text-neutral-400"
                  title="Restart video"
                  aria-label="Restart video"
                >
                  <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="hover:text-white transition-colors cursor-pointer p-1 text-neutral-400 hover:text-white"
                  title="Toggle Fullscreen"
                  aria-label="Toggle Fullscreen"
                >
                  <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Downward Scroll Cue to Page 4: STORY & VERTICAL REELS */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center select-none">
          <button
            type="button"
            onClick={handleScrollDown}
            className="group flex flex-col items-center space-y-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-neutral-400 group-hover:text-red-500 transition-colors">
              EXPLORE VERTICAL REELS & STORIES ↓
            </span>
            <ChevronDown className="w-4 h-4 text-red-500 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
