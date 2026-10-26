import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, ArrowLeft, ArrowRight, ArrowUp, ChevronDown } from 'lucide-react';
import { WIDESCREEN_SHOWCASE_ITEMS, WidescreenShowcaseItem } from '../types/banner';

interface LongFormSectionProps {
  onExploreContact?: () => void;
}

export const LongFormSection: React.FC<LongFormSectionProps> = ({ onExploreContact }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [duration, setDuration] = useState('00:01:45');
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const totalItems = WIDESCREEN_SHOWCASE_ITEMS.length;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return '00:00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const frames = Math.floor((seconds % 1) * 24);
    return `00:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}:${frames < 10 ? '0' : ''}${frames}`;
  };

  const handleNext = useCallback(() => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  const triggerNavigation = useCallback((action: 'next' | 'prev' | number) => {
    setIsAutoScrollPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);

    if (action === 'next') handleNext();
    else if (action === 'prev') handlePrev();
    else if (typeof action === 'number') {
      setIsPlaying(false);
      setProgress(0);
      setCurrentIndex(action);
    }

    pauseTimerRef.current = setTimeout(() => {
      setIsAutoScrollPaused(false);
    }, 7000);
  }, [handleNext, handlePrev]);

  // Smooth automatic looping movement
  useEffect(() => {
    if (isAutoScrollPaused || isHovered || isPlaying) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoScrollPaused, isHovered, isPlaying, handleNext]);

  const activeNormalizedIndex = ((currentIndex % totalItems) + totalItems) % totalItems;

  useEffect(() => {
    videoRefs.current.forEach((el, index) => {
      if (!el) return;
      if (index === activeNormalizedIndex) {
        el.muted = isMuted;
        if (isPlaying) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      } else {
        el.pause();
        el.muted = true;
      }
    });
  }, [activeNormalizedIndex, isPlaying, isMuted]);

  const handleTogglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlaying((prev) => !prev);
  };

  const handleToggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  const handleTimeUpdate = (index: number) => {
    if (index !== activeNormalizedIndex) return;
    const el = videoRefs.current[index];
    if (!el) return;
    const cur = el.currentTime;
    const dur = el.duration || 105;
    setProgress((cur / dur) * 100);
    setCurrentTime(formatTime(cur));
    if (el.duration && !isNaN(el.duration)) {
      setDuration(formatTime(el.duration));
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const el = videoRefs.current[activeNormalizedIndex];
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPos = (e.clientX - rect.left) / rect.width;
    const seekTime = clickPos * (el.duration || 105);
    el.currentTime = seekTime;
    setProgress(clickPos * 100);
  };

  const handleToggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = videoRefs.current[activeNormalizedIndex];
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      triggerNavigation(diff > 0 ? 'next' : 'prev');
    }
    touchStartXRef.current = null;
  };

  const isDesktop = windowWidth >= 1024;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const centerWidth = isDesktop ? 680 : isTablet ? 500 : 310;
  const centerHeight = Math.round((centerWidth * 9) / 16);
  const nearWidth = isDesktop ? 190 : isTablet ? 130 : 80;
  const outerWidth = isDesktop ? 120 : isTablet ? 80 : 50;
  const bufferWidth = 60;
  const gap = isDesktop ? 20 : isTablet ? 14 : 9;

  const x1 = centerWidth / 2 + gap + nearWidth / 2;
  const x2 = x1 + nearWidth / 2 + gap + outerWidth / 2;
  const x3 = x2 + outerWidth / 2 + gap + bufferWidth / 2;

  const getSlotConfig = (offset: number) => {
    if (offset === 0) {
      return {
        x: 0,
        width: centerWidth,
        height: centerHeight,
        scale: 1.0,
        opacity: 1.0,
        brightness: 1.05,
        zIndex: 30,
        hasGlow: true,
      };
    }

    const sign = Math.sign(offset);
    const absOffset = Math.abs(offset);

    if (absOffset === 1) {
      return {
        x: sign * x1,
        width: nearWidth,
        height: centerHeight,
        scale: isDesktop ? 0.78 : 0.82,
        opacity: 0.85,
        brightness: 0.78,
        zIndex: 20,
        hasGlow: false,
      };
    }

    if (absOffset === 2) {
      return {
        x: sign * x2,
        width: outerWidth,
        height: centerHeight,
        scale: isDesktop ? 0.58 : 0.65,
        opacity: 0.65,
        brightness: 0.58,
        zIndex: 10,
        hasGlow: false,
      };
    }

    return {
      x: sign * x3,
      width: bufferWidth,
      height: centerHeight,
      scale: 0.45,
      opacity: 0,
      brightness: 0.4,
      zIndex: 0,
      hasGlow: false,
    };
  };

  return (
    <section
      ref={sectionRef}
      id="page-5-longform-showcase"
      className="relative w-full min-h-screen py-24 sm:py-32 md:py-36 px-2 sm:px-6 md:px-8 bg-black flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ backgroundColor: '#000000' }}
      aria-label="Last Page: Long-Form Videos Scrolling Showcase"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Anchor compatibility */}
      <span id="page-4-longform-showcase" className="absolute top-0 pointer-events-none" />

      {/* Ambient Red Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[950px] h-[55vh] max-h-[580px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(230, 18, 29, 0.16) 0%, rgba(180, 10, 20, 0.04) 45%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* Section Header */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-10 sm:mb-14">
        <h2 
          className="font-display font-black text-white uppercase tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none"
          style={{ letterSpacing: '0.04em' }}
        >
          LONG-FORM VIDEOS
        </h2>
      </div>

      {/* Accordion Carousel Stage */}
      <div 
        className="relative z-10 w-full max-w-[1520px] mx-auto flex items-center justify-center overflow-hidden px-2"
        style={{
          height: `${centerHeight + 40}px`,
          perspective: '1200px',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {WIDESCREEN_SHOWCASE_ITEMS.map((item: WidescreenShowcaseItem, index: number) => {
            let rawOffset = (index - (currentIndex % totalItems) + totalItems) % totalItems;
            if (rawOffset > Math.floor(totalItems / 2)) {
              rawOffset -= totalItems;
            }
            const offset = rawOffset;
            const slotConfig = getSlotConfig(offset);
            const isCenter = offset === 0;

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (offset !== 0) {
                    triggerNavigation(offset > 0 ? 'next' : 'prev');
                  }
                }}
                className="absolute flex items-center justify-center will-change-transform"
                style={{
                  transform: `translateX(${slotConfig.x}px)`,
                  transition: 'transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  zIndex: slotConfig.zIndex,
                  cursor: isCenter ? 'default' : 'pointer',
                  pointerEvents: Math.abs(offset) > 2 ? 'none' : 'auto',
                }}
              >
                <div
                  className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-950 will-change-[transform,width,opacity,box-shadow]"
                  style={{
                    width: `${slotConfig.width}px`,
                    height: `${slotConfig.height}px`,
                    transition: 'width 1.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.6s ease, border-color 0.6s ease',
                    boxShadow: slotConfig.hasGlow 
                      ? '0 25px 70px -10px rgba(230, 18, 29, 0.36), 0 0 35px 2px rgba(230, 18, 29, 0.22)' 
                      : '0 15px 35px -10px rgba(0, 0, 0, 0.8)',
                    border: isCenter 
                      ? '1px solid rgba(230, 18, 29, 0.65)' 
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    opacity: slotConfig.opacity,
                    filter: `brightness(${slotConfig.brightness})`,
                  }}
                >
                  <div
                    className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                    style={{
                      width: `${centerWidth}px`,
                      height: `${centerHeight}px`,
                    }}
                  >
                    {item.posterSrc && (
                      <img
                        src={item.posterSrc}
                        alt={item.title}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 select-none ${
                          isCenter && isPlaying ? 'opacity-0' : 'opacity-100'
                        }`}
                      />
                    )}

                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el;
                      }}
                      src={item.videoSrc}
                      poster={item.posterSrc}
                      playsInline
                      loop
                      muted={isMuted}
                      preload="metadata"
                      onTimeUpdate={() => handleTimeUpdate(index)}
                      className="absolute inset-0 w-full h-full object-cover select-none"
                    />
                  </div>

                  {/* CENTER ACTIVE CARD OVERLAYS */}
                  {isCenter && (
                    <>
                      {!isPlaying && (
                        <div 
                          onClick={handleTogglePlay}
                          className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer bg-black/25 backdrop-blur-[1px] transition-all"
                        >
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-[0_0_30px_rgba(230,18,29,0.7)] transform scale-100 hover:scale-110 active:scale-95 transition-all">
                            <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white translate-x-0.5" />
                          </div>
                        </div>
                      )}

                      <div className="absolute inset-x-0 bottom-0 z-30 p-2.5 sm:p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col space-y-1.5 sm:space-y-2 pointer-events-auto">
                        <div
                          className="relative w-full h-1.5 sm:h-2 bg-white/20 hover:h-2.5 rounded-full cursor-pointer transition-all overflow-hidden"
                          onClick={handleSeek}
                        >
                          <div
                            className="absolute left-0 top-0 bottom-0 bg-red-600 rounded-full shadow-[0_0_10px_rgba(230,18,29,0.9)]"
                            style={{ width: `${progress}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-xs font-mono text-neutral-300 pt-0.5">
                          <div className="flex items-center space-x-3 sm:space-x-4">
                            <button
                              type="button"
                              onClick={handleTogglePlay}
                              className="hover:text-white transition-colors cursor-pointer p-1"
                              aria-label={isPlaying ? "Pause" : "Play"}
                            >
                              {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />}
                            </button>

                            <button
                              type="button"
                              onClick={handleToggleMute}
                              className="flex items-center space-x-1.5 hover:text-white transition-colors cursor-pointer p-1"
                              title={isMuted ? "Unmute Audio" : "Mute Audio"}
                            >
                              {isMuted ? (
                                <>
                                  <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
                                  <span className="text-[10px] text-neutral-400 uppercase hidden sm:inline">MUTED</span>
                                </>
                              ) : (
                                <>
                                  <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                                  <span className="text-[10px] text-neutral-400 uppercase hidden sm:inline">SOUND ON</span>
                                </>
                              )}
                            </button>

                            <span className="text-[10px] sm:text-[11px] text-neutral-400 tracking-wider">
                              {currentTime} / {duration}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={handleToggleFullscreen}
                              className="hover:text-white transition-colors cursor-pointer p-1"
                              title="Toggle Fullscreen"
                              aria-label="Toggle Fullscreen"
                            >
                              <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </div>

                      </div>
                    </>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls: Circular Arrows + Pagination Dots */}
      <div className="relative z-10 mt-8 sm:mt-10 flex flex-col items-center space-y-4 select-none">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => triggerNavigation('prev')}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-800 bg-neutral-950/80 hover:border-red-600/70 hover:bg-neutral-900 text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.8)] hover:shadow-[0_0_20px_rgba(230,18,29,0.35)] active:scale-95 cursor-pointer"
            aria-label="Previous Showcase"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => triggerNavigation('next')}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-800 bg-neutral-950/80 hover:border-red-600/70 hover:bg-neutral-900 text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.8)] hover:shadow-[0_0_20px_rgba(230,18,29,0.35)] active:scale-95 cursor-pointer"
            aria-label="Next Showcase"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {WIDESCREEN_SHOWCASE_ITEMS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => {
                const stepDiff = dotIdx - activeNormalizedIndex;
                triggerNavigation(currentIndex + stepDiff);
              }}
              className={`transition-all duration-300 cursor-pointer ${
                dotIdx === activeNormalizedIndex
                  ? 'w-6 h-1.5 rounded-full bg-red-600 shadow-[0_0_10px_rgba(230,18,29,0.8)]'
                  : 'w-1.5 h-1.5 rounded-full bg-neutral-700 hover:bg-neutral-500'
              }`}
              aria-label={`Go to showcase ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* =========================================================================
          CONTINUE TO CONTACT / LET'S CONNECT SECTION
         ========================================================================= */}
      <div className="relative z-10 mt-12 sm:mt-16 flex flex-col items-center select-none pb-2">
        <button
          type="button"
          onClick={onExploreContact}
          className="group flex flex-col items-center space-y-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-neutral-400 group-hover:text-red-500 transition-colors">
            LET'S CONNECT ↓
          </span>
          <ChevronDown className="w-4 h-4 text-red-500 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

    </section>
  );
};
