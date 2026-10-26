import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Volume2, VolumeX, Play, Pause, ChevronDown } from 'lucide-react';
import { VERTICAL_SHOWCASE_VIDEOS, VerticalVideoItem } from '../types/banner';

interface VideoShowcaseProps {
  onExploreLongForm?: () => void;
}

export const VideoShowcase: React.FC<VideoShowcaseProps> = ({ onExploreLongForm }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');

  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const touchStartXRef = useRef<number | null>(null);

  const totalVideos = VERTICAL_SHOWCASE_VIDEOS.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalVideos);
    setProgress(0);
  }, [totalVideos]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalVideos) % totalVideos);
    setProgress(0);
  }, [totalVideos]);

  const triggerManualNavigation = useCallback((action: 'next' | 'prev' | number) => {
    setIsAutoPlayPaused(true);
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    if (action === 'next') handleNext();
    else if (action === 'prev') handlePrev();
    else if (typeof action === 'number') {
      setActiveIndex(action);
      setProgress(0);
    }

    pauseTimeoutRef.current = setTimeout(() => {
      setIsAutoPlayPaused(false);
    }, 8000);
  }, [handleNext, handlePrev]);

  // Gentle automatic cycle every 6.5s if not paused
  useEffect(() => {
    if (isAutoPlayPaused || !isPlaying) return;

    const interval = setInterval(() => {
      handleNext();
    }, 6500);

    return () => clearInterval(interval);
  }, [isAutoPlayPaused, isPlaying, handleNext]);

  // Manage all video playback so all displayed stories show lively motion
  useEffect(() => {
    videoRefs.current.forEach((videoEl, idx) => {
      if (!videoEl) return;

      if (idx === activeIndex) {
        videoEl.muted = isMuted;
        if (isPlaying) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      } else {
        videoEl.muted = true;
        videoEl.play().catch(() => {});
      }
    });
  }, [activeIndex, isMuted, isPlaying]);

  const handleTimeUpdate = (idx: number) => {
    if (idx !== activeIndex) return;
    const el = videoRefs.current[idx];
    if (!el) return;
    const cur = el.currentTime;
    const dur = el.duration || 45;
    setProgress((cur / dur) * 100);
    const mins = Math.floor(cur / 60);
    const secs = Math.floor(cur % 60);
    setCurrentTime(`${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartXRef.current - touchEndX;

    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        triggerManualNavigation('next');
      } else {
        triggerManualNavigation('prev');
      }
    }
    touchStartXRef.current = null;
  };

  const toggleCenterPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying((prev) => !prev);
  };

  const handleScrollToNext = () => {
    if (onExploreLongForm) {
      onExploreLongForm();
      return;
    }
    const el = document.getElementById('page-5-longform-showcase') || document.getElementById('page-4-longform-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="page-4-story-reels-section"
      className="relative w-full py-24 sm:py-32 md:py-36 px-4 sm:px-8 bg-black overflow-hidden select-none"
      style={{ backgroundColor: '#000000' }}
      aria-label="Story and Vertical Reels Showcase"
    >
      {/* Anchor for compatibility */}
      <span id="video-showcase-section" className="absolute top-0 pointer-events-none" />

      {/* Subtle Red Ambient Glow behind the center stage */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(230, 18, 29, 0.16) 0%, rgba(180, 10, 20, 0.05) 45%, transparent 72%)',
        }}
      />

      {/* Section Header */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-10 sm:mb-14">
        <h2 
          className="font-display font-black text-white uppercase tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none"
          style={{ letterSpacing: '0.04em' }}
        >
          SHORT-FORM VIDEOS
        </h2>
      </div>

      {/* 3D Overlapping Vertical Video Carousel Stage */}
      <div 
        className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-center min-h-[520px] sm:min-h-[580px] md:min-h-[640px] px-2"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full flex items-center justify-center">
          {VERTICAL_SHOWCASE_VIDEOS.map((item: VerticalVideoItem, index: number) => {
            let offset = index - activeIndex;
            if (offset < -Math.floor(totalVideos / 2)) offset += totalVideos;
            if (offset > Math.floor(totalVideos / 2)) offset -= totalVideos;

            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            let translateX = 0;
            let rotateY = 0;
            let scale = 1;
            let zIndex = 30;
            let opacity = 1;
            let brightness = 1;

            if (isCenter) {
              translateX = 0;
              rotateY = 0;
              scale = 1;
              zIndex = 30;
              opacity = 1;
              brightness = 1.05;
            } else if (Math.abs(offset) === 1) {
              const sign = offset > 0 ? 1 : -1;
              translateX = sign * 220;
              rotateY = sign * -14;
              scale = 0.82;
              zIndex = 20;
              opacity = 0.8;
              brightness = 0.85;
            } else if (Math.abs(offset) === 2) {
              const sign = offset > 0 ? 1 : -1;
              translateX = sign * 400;
              rotateY = sign * -24;
              scale = 0.66;
              zIndex = 10;
              opacity = 0.5;
              brightness = 0.65;
            }

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!isCenter) {
                    triggerManualNavigation(index);
                  }
                }}
                className={`absolute transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer will-change-transform ${
                  isCenter ? 'group' : 'hover:opacity-95'
                }`}
                style={{
                  transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                  zIndex,
                  opacity,
                  filter: `brightness(${brightness})`,
                  transformOrigin: 'center center',
                }}
              >
                {/* 9:16 Vertical Card Container */}
                <div 
                  className={`relative w-[240px] sm:w-[280px] md:w-[320px] aspect-[9/16] rounded-2xl overflow-hidden bg-neutral-950 border transition-all duration-300 ${
                    isCenter 
                      ? 'border-red-600/70 shadow-[0_20px_60px_rgba(230,18,29,0.32)] hover:scale-[1.02]' 
                      : 'border-neutral-800/80 shadow-2xl'
                  }`}
                >
                  {/* Poster Image Fallback */}
                  {item.posterSrc && (
                    <img
                      src={item.posterSrc}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0"
                    />
                  )}

                  {/* Video Element (9:16 Vertical Loop) */}
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={item.videoSrc}
                    poster={item.posterSrc}
                    playsInline
                    loop
                    muted={isCenter ? isMuted : true}
                    preload="auto"
                    onTimeUpdate={() => handleTimeUpdate(index)}
                    className="relative z-10 w-full h-full object-cover select-none pointer-events-none"
                  />

                  {/* Center Card Play/Pause Overlay Toggle */}
                  {isCenter && (
                    <div 
                      onClick={toggleCenterPlay}
                      className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer group-hover:opacity-100 transition-opacity"
                    >
                      {!isPlaying && (
                        <div className="w-14 h-14 rounded-full bg-black/80 border border-red-600/80 text-white flex items-center justify-center shadow-[0_0_20px_rgba(230,18,29,0.5)] transform scale-100 hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-red-500 fill-red-500 translate-x-0.5" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Center Card Mute / Unmute Floating Toggle */}
                  {isCenter && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted(!isMuted);
                      }}
                      className="absolute bottom-4 right-4 z-30 w-8 h-8 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer shadow-lg"
                      title={isMuted ? "Click to unmute" : "Click to mute"}
                    >
                      {isMuted ? (
                        <VolumeX className="w-3.5 h-3.5 text-neutral-300" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 text-red-500" />
                      )}
                    </button>
                  )}

                  {/* Center Card Progress Line */}
                  {isCenter && (
                    <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20 z-30 pointer-events-none">
                      <div 
                        className="h-full bg-red-600 transition-[width] duration-150"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}

                  {/* Bottom Vignette Overlay */}
                  <div className="absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Carousel Navigation Controls (Arrow Buttons + Dots) */}
      <div className="relative z-20 flex flex-col items-center space-y-4 mt-8 sm:mt-10 select-none">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => triggerManualNavigation('prev')}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-800 bg-neutral-950/80 hover:border-red-600/70 hover:bg-neutral-900 text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.8)] hover:shadow-[0_0_20px_rgba(230,18,29,0.35)] active:scale-95 cursor-pointer"
            aria-label="Previous Video"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => triggerManualNavigation('next')}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-800 bg-neutral-950/80 hover:border-red-600/70 hover:bg-neutral-900 text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.8)] hover:shadow-[0_0_20px_rgba(230,18,29,0.35)] active:scale-95 cursor-pointer"
            aria-label="Next Video"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Circular Indicators for Slide Position */}
        <div className="flex items-center space-x-2">
          {VERTICAL_SHOWCASE_VIDEOS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => triggerManualNavigation(i)}
              className={`transition-all duration-300 cursor-pointer ${
                i === activeIndex 
                  ? 'w-6 h-1.5 rounded-full bg-red-600 shadow-[0_0_10px_rgba(230,18,29,0.8)]' 
                  : 'w-1.5 h-1.5 rounded-full bg-neutral-800 hover:bg-neutral-600'
              }`}
              title={`Go to video ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Downward Scroll Cue to Long-Form Videos Section */}
      <div className="relative z-20 mt-10 sm:mt-12 flex flex-col items-center select-none">
        <button
          type="button"
          onClick={handleScrollToNext}
          className="group flex flex-col items-center space-y-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-neutral-400 group-hover:text-red-500 transition-colors">
            EXPLORE LONG-FORM VIDEOS ↓
          </span>
          <ChevronDown className="w-4 h-4 text-red-500 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

    </section>
  );
};
