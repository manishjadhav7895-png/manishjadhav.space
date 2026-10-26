(() => {
  /* ==========================================================================
     1. FRAME ANIMATION ENGINE & PRELOADER
     ========================================================================== */
  const TOTAL_FRAMES = 120;
  const FOLDER_PATH = 'ezgif-620d523b38ab4ba0-png-split';

  const animCanvas = document.getElementById('animation-canvas');
  const animCtx = animCanvas.getContext('2d', { alpha: false, desynchronized: true });
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loader-bar');
  const heroContent = document.getElementById('hero-content');
  const heroScrollCue = document.getElementById('hero-scroll-cue');
  const heroTrack = document.getElementById('hero-track');

  const images = new Array(TOTAL_FRAMES);
  const isLoaded = new Array(TOTAL_FRAMES).fill(false);
  let loadedCount = 0;
  let lastRenderedIndex = -1;

  let heroProgress = 0;
  let targetHeroProgress = 0;

  function getFrameUrl(index) {
    const frameNum = String(index + 1).padStart(3, '0');
    return `${FOLDER_PATH}/ezgif-frame-${frameNum}.png`;
  }

  function resizeAnimCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    animCanvas.width = Math.round(width * dpr);
    animCanvas.height = Math.round(height * dpr);

    if (lastRenderedIndex >= 0) {
      renderFrame(lastRenderedIndex);
    }
  }

  function drawCover(img) {
    if (!img || !img.naturalWidth) return;
    const cw = animCanvas.width;
    const ch = animCanvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const imgRatio = iw / ih;
    const canvasRatio = cw / ch;

    let dw, dh, dx, dy;
    if (canvasRatio > imgRatio) {
      dw = cw;
      dh = Math.round(cw / imgRatio);
      dx = 0;
      dy = Math.round((ch - dh) / 2);
    } else {
      dh = ch;
      dw = Math.round(ch * imgRatio);
      dx = Math.round((cw - dw) / 2);
      dy = 0;
    }

    animCtx.fillStyle = '#000000';
    animCtx.fillRect(0, 0, cw, ch);
    animCtx.drawImage(img, dx, dy, dw, dh);
  }

  function getBestFrame(index) {
    if (isLoaded[index] && images[index]) return images[index];
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = index - offset;
      if (prev >= 0 && isLoaded[prev] && images[prev]) return images[prev];
      const next = index + offset;
      if (next < TOTAL_FRAMES && isLoaded[next] && images[next]) return images[next];
    }
    return null;
  }

  function renderFrame(index) {
    const img = getBestFrame(index);
    if (img) {
      drawCover(img);
    }
  }

  function preloadAllFrames() {
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);

    const onFirstLoad = () => {
      images[0] = firstImg;
      isLoaded[0] = true;
      loadedCount++;
      renderFrame(0);
      lastRenderedIndex = 0;
      loadRemainingFrames();
    };

    if (firstImg.complete && firstImg.naturalWidth > 0) {
      onFirstLoad();
    } else {
      firstImg.onload = onFirstLoad;
      firstImg.onerror = loadRemainingFrames;
    }
  }

  function loadRemainingFrames() {
    const queue = [];
    for (let i = 1; i < TOTAL_FRAMES; i++) queue.push(i);

    const CONCURRENCY = 8;
    let active = 0;

    function next() {
      if (queue.length === 0 && active === 0) {
        if (loaderBar) loaderBar.style.width = '100%';
        setTimeout(() => { if (loader) loader.classList.add('hidden'); }, 300);
        return;
      }

      while (active < CONCURRENCY && queue.length > 0) {
        const index = queue.shift();
        active++;

        const img = new Image();
        img.src = getFrameUrl(index);

        const handleLoad = () => {
          images[index] = img;
          isLoaded[index] = true;
          loadedCount++;
          active--;

          if (loaderBar) {
            const percent = Math.round((loadedCount / TOTAL_FRAMES) * 100);
            loaderBar.style.width = `${percent}%`;
          }

          const targetIdx = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.round(heroProgress * (TOTAL_FRAMES - 1)))
          );
          if (targetIdx === index) {
            renderFrame(index);
            lastRenderedIndex = index;
          }

          if (loadedCount >= TOTAL_FRAMES * 0.95 && loader && !loader.classList.contains('hidden')) {
            setTimeout(() => { if (loader) loader.classList.add('hidden'); }, 200);
          }

          next();
        };

        img.onload = handleLoad;
        img.onerror = () => { active--; next(); };
      }
    }

    next();
  }

  /* ==========================================================================
     2. CONTINUOUS LIQUID OVERLAY CANVAS (Smoked Fluid Membrane)
     ========================================================================== */
  const liquidCanvas = document.getElementById('liquid-canvas');
  if (liquidCanvas) {
    const lCtx = liquidCanvas.getContext('2d');
    let lTime = 0;

    const resizeLiquid = () => {
      liquidCanvas.width = window.innerWidth;
      liquidCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeLiquid);
    resizeLiquid();

    const renderLiquid = () => {
      lTime += 0.0035;
      const w = liquidCanvas.width;
      const h = liquidCanvas.height;

      lCtx.clearRect(0, 0, w, h);

      // Layer 1: Dark smoked tint
      lCtx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      lCtx.fillRect(0, 0, w, h);

      // Layer 2: Organic caustic gradient 1
      const grad1 = lCtx.createRadialGradient(
        w * (0.35 + Math.sin(lTime * 0.8) * 0.15),
        h * (0.4 + Math.cos(lTime * 0.6) * 0.15),
        w * 0.1,
        w * (0.4 + Math.sin(lTime * 0.8) * 0.15),
        h * (0.4 + Math.cos(lTime * 0.6) * 0.15),
        w * 0.75
      );
      grad1.addColorStop(0, 'rgba(255, 255, 255, 0.035)');
      grad1.addColorStop(0.35, 'rgba(20, 20, 24, 0.04)');
      grad1.addColorStop(0.7, 'rgba(5, 5, 7, 0.08)');
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      lCtx.fillStyle = grad1;
      lCtx.fillRect(0, 0, w, h);

      // Layer 3: Crimson counter refraction
      const grad2 = lCtx.createRadialGradient(
        w * (0.7 + Math.cos(lTime * 0.7) * 0.18),
        h * (0.65 + Math.sin(lTime * 0.9) * 0.14),
        w * 0.08,
        w * (0.7 + Math.cos(lTime * 0.7) * 0.18),
        h * (0.65 + Math.sin(lTime * 0.9) * 0.14),
        w * 0.65
      );
      grad2.addColorStop(0, 'rgba(230, 18, 29, 0.035)');
      grad2.addColorStop(0.4, 'rgba(255, 255, 255, 0.02)');
      grad2.addColorStop(0.8, 'rgba(5, 5, 5, 0.06)');
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      lCtx.fillStyle = grad2;
      lCtx.fillRect(0, 0, w, h);

      requestAnimationFrame(renderLiquid);
    };
    requestAnimationFrame(renderLiquid);
  }

  /* ==========================================================================
     3. LENIS SMOOTH SCROLL ENGINE & HERO SYNCHRONIZATION
     ========================================================================== */
  let lenis = null;
  let tickLongform = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });
  }

  function updateHeroScroll() {
    if (!heroTrack) return;
    const rect = heroTrack.getBoundingClientRect();
    const scrollTravel = heroTrack.offsetHeight - window.innerHeight;

    if (scrollTravel > 0) {
      const currentScroll = -rect.top;
      targetHeroProgress = Math.max(0, Math.min(1, currentScroll / scrollTravel));
    }
  }

  window.addEventListener('scroll', updateHeroScroll, { passive: true });
  if (lenis) {
    lenis.on('scroll', updateHeroScroll);
  }
  updateHeroScroll();

  // Animation Loop with Smooth Responsive Tracking
  function mainLoop(time) {
    if (lenis) lenis.raf(time);

    // Responsive follow with Lenis smooth scroll
    const diff = targetHeroProgress - heroProgress;
    if (Math.abs(diff) > 0.0001) {
      heroProgress += diff * 0.28;
    } else {
      heroProgress = targetHeroProgress;
    }

    // Render Canvas Frame
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.round(heroProgress * (TOTAL_FRAMES - 1)))
    );

    if (frameIndex !== lastRenderedIndex) {
      renderFrame(frameIndex);
      lastRenderedIndex = frameIndex;
    }

    // Unified Matched In-Point Hero Animation (0.38 -> 0.68 entrance, 0.68 -> 0.92 locked, >0.92 exit)
    if (heroContent) {
      const heroStaggerItems = heroContent.querySelectorAll('.hero-stagger-item');
      if (heroProgress < 0.38) {
        heroContent.style.opacity = '0';
        heroContent.style.pointerEvents = 'none';
        heroStaggerItems.forEach((item) => {
          item.style.opacity = '0';
          item.style.transform = 'translate3d(0, 30px, 0)';
        });
      } else if (heroProgress <= 0.92) {
        // Matched starting in-point (all items start at 0.38, smooth coordinated cascade into place)
        const contNorm = Math.min(1, (heroProgress - 0.38) / 0.12);
        heroContent.style.opacity = contNorm.toString();
        heroContent.style.transform = 'translate3d(0, 0, 0)';
        heroContent.style.pointerEvents = heroProgress > 0.58 ? 'auto' : 'none';

        heroStaggerItems.forEach((item) => {
          const order = parseFloat(item.getAttribute('style')?.match(/--stagger-order:\s*(\d+)/)?.[1] || '1');
          const startP = 0.38 + (order - 1) * 0.024;
          const endP = startP + 0.18;

          let t = 0;
          if (heroProgress >= endP) {
            t = 1;
          } else if (heroProgress > startP) {
            t = (heroProgress - startP) / (endP - startP);
          }
          const easeT = 1 - Math.pow(1 - t, 2.5);
          const y = (1 - easeT) * 30;

          item.style.opacity = easeT.toFixed(3);
          item.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
        });
      } else {
        // Continuous smooth exit past 0.92 into Showreel
        const exitT = Math.min(1, (heroProgress - 0.92) / 0.08);
        const y = -exitT * 28;
        const op = Math.max(0, 1 - exitT * 0.85);

        heroContent.style.opacity = op.toFixed(3);
        heroContent.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
        heroContent.style.pointerEvents = op < 0.2 ? 'none' : 'auto';
      }
    }

    // Hide Hero Scroll Cue
    if (heroScrollCue) {
      heroScrollCue.style.opacity = heroProgress > 0.06 ? '0' : '1';
    }

    // Subtle Multi-Plane Cinematic Parallax (Background very slow, cues moderate)
    const vh = window.innerHeight;
    const vCenter = vh / 2;

    const rGlow = document.querySelector('.reels-ambient-glow');
    if (rGlow && reelsTrack) {
      const rRect = reelsTrack.getBoundingClientRect();
      const rCenter = rRect.top + rRect.height / 2;
      const rOffset = Math.max(-1, Math.min(1, (vCenter - rCenter) / vh));
      rGlow.style.transform = `translate(-50%, calc(-50% + ${(rOffset * 24).toFixed(1)}px))`;
    }

    if (tickLongform) {
      tickLongform(vCenter, vh);
    }

    requestAnimationFrame(mainLoop);
  }

  window.addEventListener('resize', () => {
    resizeAnimCanvas();
    updateHeroScroll();
  });
  resizeAnimCanvas();
  requestAnimationFrame(mainLoop);
  preloadAllFrames();

  /* ==========================================================================
     4. SMOOTH SCROLL NAVIGATION LINKS
     ========================================================================== */
  function smoothScrollTo(targetSelector) {
    const el = document.querySelector(targetSelector);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: 0, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        smoothScrollTo(href);
      }
    });
  });

  const btnViewWork = document.getElementById('btn-view-work');
  if (btnViewWork) btnViewWork.addEventListener('click', () => smoothScrollTo('#page-3-showreel-section'));

  const btnSelectedWork = document.getElementById('btn-selected-work');
  if (btnSelectedWork) btnSelectedWork.addEventListener('click', () => smoothScrollTo('#page-3-showreel-section'));

  const btnViewAll = document.getElementById('btn-view-all');
  if (btnViewAll) btnViewAll.addEventListener('click', () => smoothScrollTo('#page-5-longform-showcase'));

  const btnBackToTop = document.getElementById('btn-back-to-top');
  if (btnBackToTop) {
    btnBackToTop.addEventListener('click', () => {
      if (lenis) lenis.scrollTo(0, { duration: 1.5 });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     5. SHOWREEL SECTION (16:9 YOUTUBE EMBED)
     ========================================================================== */
  const showreelContainer = document.getElementById('showreel-container');
  const showreelIframe = document.getElementById('showreel-iframe');

  /* ==========================================================================
     6. SHORT-FORM VIDEOS SHOWCASE (3D DEPTH OVERLAPPING CAROUSEL)
     ========================================================================== */
  const VERTICAL_REELS = [
    {
      id: "reel-1",
      youtubeId: "WqMHVvtjEZ4",
      embedUrl: "https://www.youtube.com/embed/WqMHVvtjEZ4",
      title: "Daniel",
      posterSrc: "https://i.ytimg.com/vi/WqMHVvtjEZ4/maxresdefault.jpg",
    },
    {
      id: "reel-2",
      youtubeId: "05a2FzIsVlM",
      embedUrl: "https://www.youtube.com/embed/05a2FzIsVlM",
      title: "Daniel v2",
      posterSrc: "https://i.ytimg.com/vi/05a2FzIsVlM/maxresdefault.jpg",
    },
    {
      id: "reel-3",
      youtubeId: "ABkJ85q9AXA",
      embedUrl: "https://www.youtube.com/embed/ABkJ85q9AXA",
      title: "Nairita - Relationship coatch",
      posterSrc: "https://i.ytimg.com/vi/ABkJ85q9AXA/maxresdefault.jpg",
    },
    {
      id: "reel-4",
      youtubeId: "M1SyjBBt3lA",
      embedUrl: "https://www.youtube.com/embed/M1SyjBBt3lA",
      title: "Pallavi",
      posterSrc: "https://i.ytimg.com/vi/M1SyjBBt3lA/maxresdefault.jpg",
    },
    {
      id: "reel-5",
      youtubeId: "jqHis8Ct68o",
      embedUrl: "https://www.youtube.com/embed/jqHis8Ct68o",
      title: "Nairita",
      posterSrc: "https://i.ytimg.com/vi/jqHis8Ct68o/maxresdefault.jpg",
    },
    {
      id: "reel-6",
      youtubeId: "RED834nAqBE",
      embedUrl: "https://www.youtube.com/embed/RED834nAqBE",
      title: "Emmanual - Business coach",
      posterSrc: "https://i.ytimg.com/vi/RED834nAqBE/maxresdefault.jpg",
    },
    {
      id: "reel-7",
      youtubeId: "dVElpf0I6hc",
      embedUrl: "https://www.youtube.com/embed/dVElpf0I6hc",
      title: "Shubh Jain",
      posterSrc: "https://i.ytimg.com/vi/dVElpf0I6hc/maxresdefault.jpg",
    },
  ];

  let currentReelIndex = 0;
  let reelsSoundMuted = true;
  let isCenterReelPlaying = true;
  let isReelTransitioning = false;
  let touchStartX = null;

  function updateSoundButtonUI(btn, textEl, isMuted) {
    if (!btn) return;
    const svg = btn.querySelector('svg');
    if (svg) {
      if (isMuted) {
        svg.innerHTML = '<path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="2"/><line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" stroke-width="2"/>';
      } else {
        svg.innerHTML = '<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" stroke-width="2"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" stroke-width="2"/>';
      }
    }
    if (textEl) {
      textEl.textContent = isMuted ? 'SOUND OFF' : 'SOUND ON';
    }
    btn.setAttribute('aria-label', isMuted ? 'Unmute Audio' : 'Mute Audio');
    btn.setAttribute('title', isMuted ? 'Unmute Audio' : 'Mute Audio');
  }

  const reelsTrack = document.getElementById('reels-track');
  const reelsDots = document.getElementById('reels-dots');
  const btnReelPrev = document.getElementById('btn-reel-prev');
  const btnReelNext = document.getElementById('btn-reel-next');
  const btnReelsSoundToggle = document.getElementById('btn-reels-sound-toggle');
  const reelsSoundText = document.getElementById('reels-sound-text');
  const reelCardElements = [];

  function getDepthTransform(offset) {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;

    let x1 = 235;
    let x2 = 440;
    let x3 = 600;

    if (isMobile) {
      x1 = 140;
      x2 = 240;
      x3 = 340;
    } else if (isTablet) {
      x1 = 190;
      x2 = 360;
      x3 = 480;
    }

    if (offset === 0) {
      // CENTER ACTIVE CARD (Dominant, sharp, largest, in front, centered)
      return {
        transform: `translate3d(-50%, -50%, 80px) scale(1.08) rotateY(0deg)`,
        zIndex: 40,
        opacity: 1,
        brightness: 1.05,
        isCenter: true,
        pointerEvents: 'auto',
      };
    } else if (Math.abs(offset) === 1) {
      // IMMEDIATE SIDE VIDEOS (Secondary, overlapping behind center, turned inward)
      const sign = offset > 0 ? 1 : -1;
      return {
        transform: `translate3d(calc(-50% + ${sign * x1}px), -50%, -40px) scale(0.82) rotateY(${sign * -14}deg)`,
        zIndex: 25,
        opacity: 0.72,
        brightness: 0.72,
        isCenter: false,
        pointerEvents: 'auto',
      };
    } else if (Math.abs(offset) === 2) {
      // OUTER SIDE / BACKGROUND VIDEOS (Far, dark, scaled down)
      const sign = offset > 0 ? 1 : -1;
      return {
        transform: `translate3d(calc(-50% + ${sign * x2}px), -50%, -130px) scale(0.66) rotateY(${sign * -24}deg)`,
        zIndex: 10,
        opacity: 0.42,
        brightness: 0.52,
        isCenter: false,
        pointerEvents: 'auto',
      };
    } else {
      // HIDDEN / OFFSTAGE
      const sign = offset > 0 ? 1 : -1;
      return {
        transform: `translate3d(calc(-50% + ${sign * x3}px), -50%, -220px) scale(0.5) rotateY(${sign * -32}deg)`,
        zIndex: 2,
        opacity: 0,
        brightness: 0.3,
        isCenter: false,
        pointerEvents: 'none',
      };
    }
  }

  function loadReelIframe(card, reel) {
    const container = card.querySelector('.reel-video-container');
    if (!container) return;
    let iframe = container.querySelector('iframe');
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.className = 'reel-iframe';
      const originParam = window.location.origin && window.location.origin !== 'null' ? `&origin=${encodeURIComponent(window.location.origin)}` : '';
      iframe.src = `https://www.youtube.com/embed/${reel.youtubeId}?enablejsapi=1&autoplay=1&mute=${reelsSoundMuted ? 1 : 0}&playsinline=1&rel=0&controls=0&loop=1&playlist=${reel.youtubeId}${originParam}`;
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.setAttribute('loading', 'lazy');
      iframe.setAttribute('title', reel.title);
      container.appendChild(iframe);
    } else if (iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage('{"event":"command","func":"seekTo","args":[0, true]}', '*');
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        const cmd = reelsSoundMuted ? 'mute' : 'unMute';
        iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: cmd, args: '' }), '*');
        if (!reelsSoundMuted) {
          iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*');
        }
      } catch (err) {}
    }
  }

  function pauseReelIframe(card) {
    const container = card.querySelector('.reel-video-container');
    if (!container) return;
    const iframe = container.querySelector('iframe');
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      } catch (err) {}
    }
  }

  function cleanupInactiveReels(activeIdx) {
    reelCardElements.forEach((c, idx) => {
      if (idx !== activeIdx) {
        const container = c.querySelector('.reel-video-container');
        if (container && container.firstElementChild) {
          container.innerHTML = '';
        }
        c.classList.remove('playing');
      }
    });
  }

  function renderReels() {
    if (!reelsTrack) return;
    reelsTrack.innerHTML = '';
    reelCardElements.length = 0;

    VERTICAL_REELS.forEach((reel, idx) => {
      const card = document.createElement('div');
      card.className = 'reel-card';

      card.innerHTML = `
        <div class="reel-video-container"></div>
        <img class="reel-poster" src="${reel.posterSrc}" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${reel.youtubeId}/hqdefault.jpg';" alt="${reel.title}" loading="lazy" />
        
        <div class="reel-play-indicator hidden" aria-label="Play Video">
          <div class="reel-play-circle">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>

        <div class="reel-overlay-bottom">
          <h3 class="reel-title">${reel.title}</h3>
        </div>

        <div class="reel-progress-line">
          <div class="reel-progress-fill"></div>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (idx !== currentReelIndex) {
          if (isReelTransitioning) return;
          isReelTransitioning = true;
          setTimeout(() => { isReelTransitioning = false; }, 450);

          currentReelIndex = idx;
          isCenterReelPlaying = true;
          updateReelsPositions();
        } else {
          const playIndicator = card.querySelector('.reel-play-indicator');
          if (isCenterReelPlaying) {
            isCenterReelPlaying = false;
            pauseReelIframe(card);
            card.classList.remove('playing');
            if (playIndicator) playIndicator.classList.remove('hidden');
          } else {
            isCenterReelPlaying = true;
            loadReelIframe(card, VERTICAL_REELS[idx]);
            card.classList.add('playing');
            if (playIndicator) playIndicator.classList.add('hidden');
          }
        }
      });

      reelsTrack.appendChild(card);
      reelCardElements.push(card);
    });

    renderReelsDots();
    updateReelsPositions();
  }

  function renderReelsDots() {
    if (!reelsDots) return;
    reelsDots.innerHTML = '';
    VERTICAL_REELS.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `dot-btn ${idx === currentReelIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Reel ${idx + 1}`);
      dot.addEventListener('click', () => {
        if (isReelTransitioning || idx === currentReelIndex) return;
        isReelTransitioning = true;
        setTimeout(() => { isReelTransitioning = false; }, 450);
        currentReelIndex = idx;
        isCenterReelPlaying = true;
        updateReelsPositions();
      });
      reelsDots.appendChild(dot);
    });
  }

  function updateReelsPositions() {
    const total = VERTICAL_REELS.length;

    reelCardElements.forEach((card, idx) => {
      let offset = idx - currentReelIndex;
      if (offset < -Math.floor(total / 2)) offset += total;
      if (offset > Math.floor(total / 2)) offset -= total;

      const state = getDepthTransform(offset);
      card.style.transform = state.transform;
      card.style.zIndex = state.zIndex;
      card.style.opacity = state.opacity;
      card.style.filter = `brightness(${state.brightness})`;
      card.style.pointerEvents = state.pointerEvents;

      const playIndicator = card.querySelector('.reel-play-indicator');

      if (state.isCenter) {
        card.classList.add('center');
        if (isCenterReelPlaying) {
          loadReelIframe(card, VERTICAL_REELS[idx]);
          card.classList.add('playing');
          if (playIndicator) playIndicator.classList.add('hidden');
        } else {
          pauseReelIframe(card);
          card.classList.remove('playing');
          if (playIndicator) playIndicator.classList.remove('hidden');
        }
      } else {
        card.classList.remove('center');
        card.classList.remove('playing');
        if (playIndicator) playIndicator.classList.add('hidden');
        pauseReelIframe(card);
      }
    });

    cleanupInactiveReels(currentReelIndex);

    if (reelsDots) {
      const dots = reelsDots.querySelectorAll('.dot-btn');
      dots.forEach((dot, dIdx) => {
        if (dIdx === currentReelIndex) dot.classList.add('active');
        else dot.classList.remove('active');
      });
    }
  }

  function activateCenterReel() {
    const activeCard = reelCardElements[currentReelIndex];
    if (!activeCard) return;
    const playIndicator = activeCard.querySelector('.reel-play-indicator');
    if (isCenterReelPlaying) {
      loadReelIframe(activeCard, VERTICAL_REELS[currentReelIndex]);
      activeCard.classList.add('playing');
      if (playIndicator) playIndicator.classList.add('hidden');
    }
  }

  function pauseAllReels() {
    reelCardElements.forEach((card) => {
      pauseReelIframe(card);
      card.classList.remove('playing');
    });
  }

  function advanceReel(step = 1, loop = false) {
    if (step > 0) {
      if (currentReelIndex < VERTICAL_REELS.length - 1) {
        currentReelIndex++;
        isCenterReelPlaying = true;
        updateReelsPositions();
        return true;
      } else if (loop) {
        currentReelIndex = 0;
        isCenterReelPlaying = true;
        updateReelsPositions();
        return true;
      }
      return false;
    } else {
      if (currentReelIndex > 0) {
        currentReelIndex--;
        isCenterReelPlaying = true;
        updateReelsPositions();
        return true;
      } else if (loop) {
        currentReelIndex = VERTICAL_REELS.length - 1;
        isCenterReelPlaying = true;
        updateReelsPositions();
        return true;
      }
      return false;
    }
  }

  function setReelsAudioState(muted) {
    reelsSoundMuted = muted;
    updateSoundButtonUI(btnReelsSoundToggle, reelsSoundText, reelsSoundMuted);
    const activeCard = reelCardElements[currentReelIndex];
    if (activeCard) {
      const iframe = activeCard.querySelector('iframe');
      if (iframe && iframe.contentWindow) {
        try {
          const cmd = reelsSoundMuted ? 'mute' : 'unMute';
          iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: cmd, args: '' }), '*');
          if (!reelsSoundMuted) {
            iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*');
          }
        } catch (e) {}
      }
    }
  }

  if (btnReelPrev) {
    btnReelPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isReelTransitioning) return;
      isReelTransitioning = true;
      setTimeout(() => { isReelTransitioning = false; }, 450);
      advanceReel(-1, true);
    });
  }

  if (btnReelNext) {
    btnReelNext.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isReelTransitioning) return;
      isReelTransitioning = true;
      setTimeout(() => { isReelTransitioning = false; }, 450);
      advanceReel(1, true);
    });
  }

  if (btnReelsSoundToggle) {
    btnReelsSoundToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      setReelsAudioState(!reelsSoundMuted);
    });
  }

  const carouselWrapper = document.querySelector('.reels-carousel-wrapper');
  if (carouselWrapper) {
    carouselWrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    carouselWrapper.addEventListener('touchend', (e) => {
      if (touchStartX === null) return;
      const touchEndX = e.changedTouches[0].clientX;
      const diffX = touchStartX - touchEndX;
      if (Math.abs(diffX) > 40) {
        if (!isReelTransitioning) {
          isReelTransitioning = true;
          setTimeout(() => { isReelTransitioning = false; }, 450);
          advanceReel(diffX > 0 ? 1 : -1, false);
        }
      }
      touchStartX = null;
    }, { passive: true });
  }

  // Mouse wheel and trackpad scroll navigation are intentionally disabled for the carousel
  // so that normal page scrolling scrolls past the section smoothly without changing videos.
  // Selection of videos is performed by clicking the side cards or navigation controls.

  window.addEventListener('resize', () => {
    updateReelsPositions();
  });

  renderReels();

  /* ==========================================================================
     7. LONG-FORM VIDEOS SHOWCASE (SCROLL-DRIVEN 3D EXPANDING CAROUSEL)
     ========================================================================== */
  const LONG_FORM_ITEMS = [
    {
      id: "lf-1",
      youtubeId: "5pBMUQWaFjM",
      embedUrl: "https://www.youtube.com/embed/5pBMUQWaFjM",
      title: "AI AGENT // CINEMATIC CUT",
      category: "Narrative Cut · Motion Graphics",
      client: "AI Agent",
      runtime: "01:15",
      posterSrc: "https://i.ytimg.com/vi/5pBMUQWaFjM/maxresdefault.jpg",
      tag: "Narrative Short",
      description: "High-contrast cinematic short cut with hyper-stylized neon grading, rhythmic action matching, and immersive cyberpunk sound scape.",
    },
    {
      id: "lf-2",
      youtubeId: "TEthDcEBw24",
      embedUrl: "https://www.youtube.com/embed/TEthDcEBw24",
      title: "DHARAVI // BIGGEST SLUM OF ASIA",
      category: "Documentary Film · Storytelling",
      client: "Documentary Series",
      runtime: "01:45",
      posterSrc: "https://i.ytimg.com/vi/TEthDcEBw24/maxresdefault.jpg",
      tag: "Docu-Series",
      description: "Atmospheric pacing, authentic street textures, deep sound design, and human-centric documentary storytelling.",
    },
    {
      id: "lf-3",
      youtubeId: "bRbNpZuEQsw",
      embedUrl: "https://www.youtube.com/embed/bRbNpZuEQsw",
      title: "FLUID MARKETING // COMMERCIAL CUT",
      category: "Brand Commercial · Pacing",
      client: "Fluid Marketing",
      runtime: "00:58",
      posterSrc: "https://i.ytimg.com/vi/bRbNpZuEQsw/maxresdefault.jpg",
      tag: "Brand Film",
      description: "Dynamic vehicular pacing, precision motor audio design, and custom optical flares designed for global launch screening.",
    },
    {
      id: "lf-4",
      youtubeId: "wpxZLMEPyis",
      embedUrl: "https://www.youtube.com/embed/wpxZLMEPyis",
      title: "FLUID SAAS // PRODUCT FILM",
      category: "SaaS Product Film · 3D VFX",
      client: "Fluid SaaS",
      runtime: "01:10",
      posterSrc: "https://i.ytimg.com/vi/wpxZLMEPyis/maxresdefault.jpg",
      tag: "Tech Showcase",
      description: "Clean UI animations, sleek transitions, precision kinetic typography, and synchronized sound design.",
    },
    {
      id: "lf-5",
      youtubeId: "xYd77XuHko8",
      embedUrl: "https://www.youtube.com/embed/xYd77XuHko8",
      title: "GOA INNER CIRCLE // CINEMATIC FILM",
      category: "Cinematic Travel · Color Science",
      client: "Inner Circle",
      runtime: "01:24",
      posterSrc: "https://i.ytimg.com/vi/xYd77XuHko8/maxresdefault.jpg",
      tag: "Brand Anthem",
      description: "Warm cinematic film grading, fluid drone pacing, ambient soundscapes, and lifestyle storytelling.",
    },
  ];

  const lfTrack = document.getElementById('page-5-longform-showcase');
  const lfStage = document.getElementById('longform-stage');
  const lfDots = document.getElementById('longform-dots');
  const btnLfPrev = document.getElementById('btn-longform-prev');
  const btnLfNext = document.getElementById('btn-longform-next');

  let lfCardElements = [];
  let targetLfProgress = 0;
  let currentLfProgress = 0;
  let targetLfFloat = 0;
  let currentLfFloat = 0;
  let activeLfIndex = -1;
  let isLfInView = false;
  let longformSoundMuted = true;

  const btnLongformSoundToggle = document.getElementById('btn-longform-sound-toggle');
  const longformSoundText = document.getElementById('longform-sound-text');

  function setLongformAudioState(muted) {
    longformSoundMuted = muted;
    updateSoundButtonUI(btnLongformSoundToggle, longformSoundText, longformSoundMuted);

    lfCardElements.forEach((c) => {
      const cardSoundBtn = c.querySelector('.lf-card-sound-pill');
      const cardSoundText = c.querySelector('.lf-card-sound-text');
      if (cardSoundBtn) {
        updateSoundButtonUI(cardSoundBtn, cardSoundText, longformSoundMuted);
      }
    });

    if (activeLfIndex >= 0 && activeLfIndex < lfCardElements.length) {
      const activeCard = lfCardElements[activeLfIndex];
      if (activeCard) {
        const iframe = activeCard.querySelector('iframe');
        if (iframe && iframe.contentWindow) {
          try {
            const cmd = longformSoundMuted ? 'mute' : 'unMute';
            iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: cmd, args: '' }), '*');
            if (!longformSoundMuted) {
              iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*');
            }
          } catch (e) {}
        }
      }
    }
  }

  function toggleLongformAudio() {
    setLongformAudioState(!longformSoundMuted);
  }

  function loadLongformIframe(card, item) {
    const container = card.querySelector('.lf-video-container');
    if (!container) return;
    let iframe = container.querySelector('iframe');
    const originParam = window.location.origin && window.location.origin !== 'null' ? `&origin=${encodeURIComponent(window.location.origin)}` : '';
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.className = 'lf-iframe';
      iframe.src = `https://www.youtube.com/embed/${item.youtubeId}?enablejsapi=1&autoplay=1&mute=${longformSoundMuted ? 1 : 0}&playsinline=1&rel=0&controls=0&loop=1&playlist=${item.youtubeId}${originParam}`;
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.setAttribute('loading', 'lazy');
      iframe.setAttribute('title', item.title);
      container.appendChild(iframe);
    } else if (iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage('{"event":"command","func":"seekTo","args":[0, true]}', '*');
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        const cmd = longformSoundMuted ? 'mute' : 'unMute';
        iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: cmd, args: '' }), '*');
        if (!longformSoundMuted) {
          iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*');
        }
      } catch (err) {}
    }
  }

  function pauseLongformIframe(card) {
    const container = card.querySelector('.lf-video-container');
    if (!container) return;
    const iframe = container.querySelector('iframe');
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      } catch (err) {}
    }
  }

  function cleanupInactiveLongform(activeIdx) {
    lfCardElements.forEach((c, idx) => {
      if (idx !== activeIdx) {
        const container = c.querySelector('.lf-video-container');
        if (container && container.firstElementChild) {
          container.innerHTML = '';
        }
        c.classList.remove('playing');
      }
    });
  }

  // Build the 5 expanding cards inside #longform-stage matching reference composition
  function renderLongformCards() {
    if (!lfStage) return;
    lfStage.innerHTML = '';
    lfCardElements = [];

    LONG_FORM_ITEMS.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'lf-card';
      card.dataset.index = idx.toString();
      card.setAttribute('role', 'group');
      card.setAttribute('aria-label', `${item.title} (${item.tag})`);

      card.innerHTML = `
        <div class="lf-card-inner">
          <div class="lf-video-container"></div>
          <img class="lf-poster" src="${item.posterSrc}" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg';" alt="${item.title}" loading="lazy" />
          <div class="lf-overlay-gradient"></div>
          <div class="lf-card-content">
            <div class="lf-card-meta">
              <span class="lf-card-tag">${item.tag}</span>
              <span style="color: rgba(255,255,255,0.3)">·</span>
              <span class="lf-card-client">${item.client}</span>
            </div>
            <h3 class="lf-card-title">${item.title}</h3>
            <div class="lf-card-bottom-row">
              <div class="lf-card-runtime">
                <svg class="icon-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>RUNTIME: ${item.runtime}</span>
              </div>
              <button type="button" class="btn-sound-pill lf-card-sound-pill" aria-label="Toggle Long-Form Audio" title="Unmute Audio">
                <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="2"/><line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" stroke-width="2"/></svg>
                <span class="lf-card-sound-text">SOUND OFF</span>
              </button>
            </div>
          </div>
        </div>
      `;

      const cardSoundBtn = card.querySelector('.lf-card-sound-pill');
      if (cardSoundBtn) {
        cardSoundBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleLongformAudio();
        });
      }

      // Clicking any visible card smoothly scrolls directly to it
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        scrollToLongformIndex(idx);
      });

      lfStage.appendChild(card);
      lfCardElements.push(card);
    });

    renderLongformDots();
    updateLongformPositions(0, 1.0);
  }

  function renderLongformDots() {
    if (!lfDots) return;
    lfDots.innerHTML = '';
    LONG_FORM_ITEMS.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `lf-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Navigate to Video ${idx + 1}`);
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        scrollToLongformIndex(idx);
      });
      lfDots.appendChild(dot);
    });
  }

  function updateLongformDots(activeIndex) {
    if (!lfDots) return;
    const dots = lfDots.querySelectorAll('.lf-dot');
    dots.forEach((dot, idx) => {
      if (idx === activeIndex) dot.classList.add('active');
      else dot.classList.remove('active');
    });
  }

  // Smooth scroll helper to travel to video `targetIndex`
  function scrollToLongformIndex(targetIndex) {
    if (!lfTrack) return;
    const clampedIdx = Math.max(0, Math.min(LONG_FORM_ITEMS.length - 1, targetIndex));
    const rect = lfTrack.getBoundingClientRect();
    const scrollTravel = lfTrack.offsetHeight - window.innerHeight;
    if (scrollTravel <= 0) return;

    const pStart = 0.06;
    const pEnd = 0.94;
    const targetP = pStart + (clampedIdx / (LONG_FORM_ITEMS.length - 1)) * (pEnd - pStart);
    const docTrackTop = rect.top + window.scrollY;
    const targetScrollY = docTrackTop + targetP * scrollTravel;

    if (lenis) {
      lenis.scrollTo(targetScrollY, { duration: 1.15 });
    } else {
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  }

  // Continuous Card Math based on float index and initial expansion
  function updateLongformPositions(floatIndex, expansionFactor = 1.0) {
    if (!lfCardElements.length || !lfStage) return;

    const stageWidth = lfStage.offsetWidth || window.innerWidth;
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024 && !isMobile;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Base responsive widths
    let maxCenterWidth = 720;
    let baseNearWidth = 205;
    let baseFarWidth = 135;
    let overlap1 = 18;
    let overlap2 = 12;

    if (isTablet) {
      maxCenterWidth = Math.min(560, stageWidth * 0.62);
      baseNearWidth = 160;
      baseFarWidth = 100;
      overlap1 = 14;
      overlap2 = 10;
    } else if (isMobile) {
      maxCenterWidth = Math.min(340, stageWidth * 0.82);
      baseNearWidth = 68;
      baseFarWidth = 36;
      overlap1 = 10;
      overlap2 = 6;
    } else {
      maxCenterWidth = Math.min(720, stageWidth * 0.55);
    }

    // Expansion effect on center width as section settles
    const wCenter = maxCenterWidth * (0.84 + 0.16 * expansionFactor);
    const wNear = baseNearWidth;
    const wFar = baseFarWidth;

    const dist1 = (wCenter + wNear) / 2 - overlap1;
    const dist2 = dist1 + (wNear + wFar) / 2 - overlap2;
    const dist3 = dist2 + wFar + 20;

    lfCardElements.forEach((card, idx) => {
      const d = idx - floatIndex;
      const s = Math.sign(d) || 0;
      const a = Math.abs(d);

      // Width interpolation
      let cardWidth;
      if (a <= 1.0) {
        const ease = Math.pow(a, 1.25);
        cardWidth = wCenter - ease * (wCenter - wNear);
      } else if (a <= 2.0) {
        const ease = a - 1.0;
        cardWidth = wNear - ease * (wNear - wFar);
      } else {
        cardWidth = Math.max(30, wFar - (a - 2.0) * 22);
      }

      // X position
      let x;
      if (a <= 1.0) {
        x = s * (dist1 * a);
      } else if (a <= 2.0) {
        x = s * (dist1 + (dist2 - dist1) * (a - 1.0));
      } else {
        x = s * (dist2 + (dist3 - dist2) * Math.min(2.0, a - 2.0));
      }

      // 3D Depth, rotation, scale, brightness, opacity
      let z = Math.max(-120, -a * 44);
      let scale = Math.max(0.86, 1.0 - a * 0.05);
      let rotY = 0;
      if (!prefersReducedMotion) {
        rotY = isMobile ? -s * Math.min(5, a * 3.5) : -s * Math.min(13, a * 8.5);
      }
      let opacity = Math.max(0, 1.0 - a * 0.27);
      let brightness = Math.max(0.38, 1.0 - a * 0.32);
      let zIndex = Math.round(100 - a * 15);

      // Apply transforms
      card.style.width = `${cardWidth.toFixed(1)}px`;
      card.style.transform = `translate3d(${x.toFixed(1)}px, 0, ${z.toFixed(1)}px) scale(${scale.toFixed(3)}) rotateY(${rotY.toFixed(2)}deg)`;
      card.style.zIndex = zIndex;
      card.style.opacity = opacity.toFixed(3);
      card.style.filter = `brightness(${brightness.toFixed(2)})`;
      card.style.pointerEvents = a > 2.5 ? 'none' : 'auto';

      // Visual active center distinction
      if (a < 0.45) {
        card.classList.add('is-active-center');
      } else {
        card.classList.remove('is-active-center');
      }

      // Content fade: active center displays title & metadata; side cards remain clean visual strips
      const contentEl = card.querySelector('.lf-card-content');
      if (contentEl) {
        if (a < 0.45) {
          const contentAlpha = 1.0 - (a / 0.45);
          contentEl.style.opacity = contentAlpha.toFixed(3);
          contentEl.style.transform = `translate3d(0, ${(a * 14).toFixed(1)}px, 0)`;
        } else {
          contentEl.style.opacity = '0';
        }
      }
    });
  }

  // Strictly controlled Video Playback Engine
  function setActiveLongformVideo(newIndex) {
    if (newIndex < 0 || newIndex >= LONG_FORM_ITEMS.length) return;
    if (newIndex === activeLfIndex && isLfInView) return;

    // Reset previous video
    if (activeLfIndex >= 0 && activeLfIndex < lfCardElements.length) {
      const prevCard = lfCardElements[activeLfIndex];
      if (prevCard) {
        pauseLongformIframe(prevCard);
        prevCard.classList.remove('playing');
      }
    }

    activeLfIndex = newIndex;

    // Activate the incoming center card
    const activeCard = lfCardElements[activeLfIndex];
    if (activeCard && isLfInView) {
      loadLongformIframe(activeCard, LONG_FORM_ITEMS[activeLfIndex]);
      activeCard.classList.add('playing');
    }

    cleanupInactiveLongform(activeLfIndex);
    updateLongformDots(activeLfIndex);
  }

  function activateLongformVideo() {
    isLfInView = true;
    const targetIdx = activeLfIndex >= 0 ? activeLfIndex : Math.round(currentLfFloat);
    setActiveLongformVideo(targetIdx);
  }

  function pauseLongformVideo() {
    isLfInView = false;
    lfCardElements.forEach((card) => {
      pauseLongformIframe(card);
      card.classList.remove('playing');
    });
  }

  // Scroll Progress Calculation for Long-Form Track
  function updateLongformScroll() {
    if (!lfTrack) return;
    const rect = lfTrack.getBoundingClientRect();
    const scrollTravel = lfTrack.offsetHeight - window.innerHeight;

    if (scrollTravel > 0) {
      const progress = Math.max(0, Math.min(1, -rect.top / scrollTravel));
      targetLfProgress = progress;

      // Phase 1 (0 to 0.06): entrance & settling/expansion of first card
      // Phase 2 (0.06 to 0.94): continuous transitions across all 6 cards
      // Phase 3 (0.94 to 1.0): final card locked before releasing into Contact
      const pStart = 0.06;
      const pEnd = 0.94;
      if (progress < pStart) {
        targetLfFloat = 0;
      } else if (progress > pEnd) {
        targetLfFloat = LONG_FORM_ITEMS.length - 1;
      } else {
        const normP = (progress - pStart) / (pEnd - pStart);
        targetLfFloat = normP * (LONG_FORM_ITEMS.length - 1);
      }

      // Check section in-view status
      const inView = rect.top < window.innerHeight * 0.95 && rect.bottom > window.innerHeight * 0.05;
      if (inView && !isLfInView) {
        isLfInView = true;
        activateLongformVideo();
      } else if (!inView && isLfInView) {
        isLfInView = false;
        pauseLongformVideo();
      }
    }
  }

  // Hook called from mainLoop on every frame
  tickLongform = function(vCenter, vh) {
    if (!lfTrack) return;

    // Smooth Follow for Long-Form Floating Progress
    const lfFloatDiff = targetLfFloat - currentLfFloat;
    if (Math.abs(lfFloatDiff) > 0.0001) {
      currentLfFloat += lfFloatDiff * 0.22;
    } else {
      currentLfFloat = targetLfFloat;
    }

    const lfProgDiff = targetLfProgress - currentLfProgress;
    if (Math.abs(lfProgDiff) > 0.0001) {
      currentLfProgress += lfProgDiff * 0.22;
    } else {
      currentLfProgress = targetLfProgress;
    }

    const expandFactor = Math.min(1.0, currentLfProgress / 0.06);
    updateLongformPositions(currentLfFloat, expandFactor);

    if (isLfInView) {
      const nearestLf = Math.max(0, Math.min(LONG_FORM_ITEMS.length - 1, Math.round(currentLfFloat)));
      if (nearestLf !== activeLfIndex) {
        setActiveLongformVideo(nearestLf);
      }
    }

    // Parallax update on ambient glow
    const lfGlow = document.querySelector('.longform-ambient-glow');
    if (lfGlow && lfTrack) {
      const lfRect = lfTrack.getBoundingClientRect();
      const lfCenter = lfRect.top + lfRect.height / 2;
      const lfOffset = Math.max(-1, Math.min(1, (vCenter - lfCenter) / vh));
      lfGlow.style.transform = `translate(-50%, calc(-50% + ${(lfOffset * 28).toFixed(1)}px))`;
    }
  };

  // Connect Prev and Next buttons
  if (btnLfPrev) {
    btnLfPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      const nextIdx = Math.max(0, (activeLfIndex >= 0 ? activeLfIndex : Math.round(currentLfFloat)) - 1);
      scrollToLongformIndex(nextIdx);
    });
  }

  if (btnLfNext) {
    btnLfNext.addEventListener('click', (e) => {
      e.stopPropagation();
      const nextIdx = Math.min(LONG_FORM_ITEMS.length - 1, (activeLfIndex >= 0 ? activeLfIndex : Math.round(currentLfFloat)) + 1);
      scrollToLongformIndex(nextIdx);
    });
  }

  if (btnLongformSoundToggle) {
    btnLongformSoundToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleLongformAudio();
    });
  }

  window.addEventListener('scroll', updateLongformScroll, { passive: true });
  if (lenis) {
    lenis.on('scroll', updateLongformScroll);
  }

  window.addEventListener('resize', () => {
    updateLongformPositions(currentLfFloat, Math.min(1, targetLfProgress / 0.06));
  });

  renderLongformCards();
  updateLongformScroll();

  /* ==========================================================================
     8. CONTACT EMAIL CLIPBOARD COPY
     ========================================================================== */
  const btnCopyEmail = document.getElementById('btn-copy-email');
  const iconCopy = document.getElementById('icon-copy');
  const iconCheck = document.getElementById('icon-check');
  const copyTooltip = document.getElementById('copy-tooltip');

  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', () => {
      navigator.clipboard.writeText('manishjadhav7895@gmail.com').then(() => {
        if (iconCopy) iconCopy.classList.add('hidden');
        if (iconCheck) iconCheck.classList.remove('hidden');
        if (copyTooltip) copyTooltip.textContent = 'Copied!';

        setTimeout(() => {
          if (iconCopy) iconCopy.classList.remove('hidden');
          if (iconCheck) iconCheck.classList.add('hidden');
          if (copyTooltip) copyTooltip.textContent = 'Copy';
        }, 2200);
      }).catch(() => {});
    });
  }

  /* ==========================================================================
     9. RESUME MODAL HANDLER
     ========================================================================== */
  const resumeModal = document.getElementById('resume-modal');
  const btnDownloadResume = document.getElementById('btn-download-resume');
  const btnOpenResumeFooter = document.getElementById('btn-open-resume-footer');
  const btnModalClose = document.getElementById('btn-modal-close');
  const btnModalDl = document.getElementById('btn-modal-download');
  const btnModalDlFooter = document.getElementById('btn-modal-download-footer');
  const dlText = document.getElementById('dl-text');

  function openResume() {
    if (resumeModal) {
      resumeModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResume() {
    if (resumeModal) {
      resumeModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (btnDownloadResume) btnDownloadResume.addEventListener('click', openResume);
  if (btnOpenResumeFooter) btnOpenResumeFooter.addEventListener('click', openResume);
  if (btnModalClose) btnModalClose.addEventListener('click', closeResume);

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResume();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeResume();
  });

  function triggerDownload() {
    const resumeContent = `MANISH JADHAV — VIDEO EDITOR & MOTION DESIGNER
Email: manishjadhav7895@gmail.com
Status: Available for Full-time & Freelance

SUMMARY:
Story-driven video editor and motion designer with 02+ years of high-impact production experience.
Specialized in narrative cuts, kinetic typography, dynamic speed ramps, and immersive audio synchronization.

PORTFOLIO HIGHLIGHTS:
- 250+ Completed Video Projects
- 30+ Global Clients Worked With
- Multi-million Organic Views on Social Media & Commercial Campaigns

CORE SOFTWARE TOOLKIT:
- Adobe Premiere Pro (Master / Pacing & Narrative)
- Adobe After Effects (Advanced / Motion Graphics & VFX)
- DaVinci Resolve (Color Science & Grading)
- Adobe Photoshop & Illustrator (Asset Preparation & Vector Design)
- Adobe Audition (Sound Design & Foley Sync)

EXPERIENCE:
- Lead Video Editor & Motion Designer (2023 — Present)
- Commercial Motion Graphic Designer (2022 — 2023)

© 2025/2026 Manish Jadhav. All Rights Reserved.`;

    const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MANISH_JADHAV_RESUME_2025.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (dlText) dlText.textContent = 'Downloaded!';
    setTimeout(() => { if (dlText) dlText.textContent = 'Download CV'; }, 2500);
  }

  if (btnModalDl) btnModalDl.addEventListener('click', triggerDownload);
  if (btnModalDlFooter) btnModalDlFooter.addEventListener('click', triggerDownload);

  /* ==========================================================================
     10. 3D SCROLL MOTION SYSTEM & SECTION VIDEO LIFECYCLE CONTROLLERS
     ========================================================================== */
  const revealElements = document.querySelectorAll('.motion-reveal, .motion-stage-reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in-view');
      } else {
        const rect = entry.boundingClientRect;
        // Only reset if completely scrolled out by a safe margin, never while reading
        if (rect.top > window.innerHeight + 150 || rect.bottom < -150) {
          entry.target.classList.remove('is-in-view');
        }
      }
    });
  }, {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.08,
  });

  revealElements.forEach((el) => revealObserver.observe(el));

  // Section Video Playback Synchronization:
  // Starts center video strictly from 0, muted, when entering viewport;
  // Pauses and resets to 0, muted, when leaving viewport.
  const videoSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      if (id === 'page-4-story-reels-section') {
        if (entry.isIntersecting) {
          activateCenterReel();
        } else {
          pauseAllReels();
        }
      } else if (id === 'page-5-longform-showcase') {
        if (entry.isIntersecting) {
          activateLongformVideo();
        } else {
          pauseLongformVideo();
        }
      } else if (id === 'page-3-showreel-section') {
        if (!entry.isIntersecting) {
          const showreelIframe = document.getElementById('showreel-iframe');
          if (showreelIframe && showreelIframe.contentWindow) {
            try {
              showreelIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            } catch (err) {}
          }
        }
      }
    });
  }, {
    threshold: 0.18,
  });

  const sectionShowreel = document.getElementById('page-3-showreel-section');
  const sectionReels = document.getElementById('page-4-story-reels-section');
  const sectionLongform = document.getElementById('page-5-longform-showcase');

  if (sectionShowreel) videoSectionObserver.observe(sectionShowreel);
  if (sectionReels) videoSectionObserver.observe(sectionReels);
  if (sectionLongform) videoSectionObserver.observe(sectionLongform);
})();

/* ==========================================================================
   11. ULTRA-SMOOTH CINEMATIC CUSTOM CURSOR (DOT + INERTIAL RED RING)
   ========================================================================== */
(function initCinematicCursor() {
  // Only activate on desktop devices with fine pointer (mouse / trackpad)
  const pointerMedia = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!pointerMedia.matches) return;

  const cursorContainer = document.getElementById('cinematic-cursor');
  if (!cursorContainer) return;

  const dotEl = cursorContainer.querySelector('.cursor-dot');
  const ringEl = cursorContainer.querySelector('.cursor-ring');
  if (!dotEl || !ringEl) return;

  const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
  let prefersReducedMotion = motionMedia.matches;
  motionMedia.addEventListener('change', (e) => {
    prefersReducedMotion = e.matches;
  });

  // Mark body for CSS cursor hiding on desktop
  document.body.classList.add('has-cinematic-cursor');

  // Mutable pointer coordinates and physics state
  let pointerX = -100;
  let pointerY = -100;
  let dotX = -100;
  let dotY = -100;
  let ringX = -100;
  let ringY = -100;

  let isPointerInWindow = false;
  let isCursorVisible = false;
  let isTabActive = !document.hidden;

  // Hover and magnetic element tracking
  let lastTarget = null;
  let currentHoverClass = '';
  let magneticTarget = null;
  let magCenterX = 0;
  let magCenterY = 0;
  let hasMagneticCenter = false;

  // Single rAF loop controller
  let rafId = null;
  let lastTime = 0;

  // Recalculate magnetic target center only on demand (target switch, scroll, resize)
  // to eliminate synchronous layout reads and forced reflows inside the animation loop
  function updateMagneticCenter() {
    if (!magneticTarget) {
      hasMagneticCenter = false;
      return;
    }
    const rect = magneticTarget.getBoundingClientRect();
    magCenterX = rect.left + rect.width * 0.5;
    magCenterY = rect.top + rect.height * 0.5;
    hasMagneticCenter = true;
  }

  // Evaluate interactive hover target without redundant tree-traversals on every mouse movement
  function evaluateHover(target) {
    if (!target || target === lastTarget) return;
    lastTarget = target;

    // Detect target hierarchy in priority order
    const playEl = target.closest('.reel-play-circle, .btn-play-pill, #btn-showreel-play, #showreel-play-overlay');
    const arrowEl = !playEl && target.closest('.carousel-arrow, .lf-nav-btn');
    const btnEl = !playEl && !arrowEl && target.closest('button, a, .btn, .dot-btn, .lf-dot, #btn-copy-email, #btn-reels-sound-toggle, #btn-longform-sound-toggle, .btn-sound-pill, [role="button"], .cue-link, .brand-badge');
    const videoEl = !playEl && !arrowEl && !btnEl && target.closest('.reel-card, .lf-card, .showreel-container');

    let newHoverClass = '';
    let newMagneticTarget = null;

    if (playEl) {
      newHoverClass = 'is-hover-play';
      newMagneticTarget = playEl;
    } else if (arrowEl) {
      newHoverClass = 'is-hover-arrow';
      newMagneticTarget = arrowEl;
    } else if (btnEl) {
      newHoverClass = 'is-hover-button';
      newMagneticTarget = btnEl;
    } else if (videoEl) {
      newHoverClass = 'is-hover-video';
      newMagneticTarget = null;
    }

    if (newHoverClass !== currentHoverClass) {
      if (currentHoverClass) cursorContainer.classList.remove(currentHoverClass);
      if (newHoverClass) cursorContainer.classList.add(newHoverClass);
      currentHoverClass = newHoverClass;
    }

    if (newMagneticTarget !== magneticTarget) {
      magneticTarget = newMagneticTarget;
      updateMagneticCenter();
    }
  }

  // Pointer event listeners (strictly updates mutable coordinates, zero DOM writes)
  function onPointerMove(e) {
    if (e.pointerType === 'touch') return;

    pointerX = e.clientX;
    pointerY = e.clientY;

    if (!isPointerInWindow) {
      isPointerInWindow = true;
      if (!isCursorVisible) {
        isCursorVisible = true;
        dotX = pointerX;
        dotY = pointerY;
        ringX = pointerX;
        ringY = pointerY;
        cursorContainer.classList.add('is-visible');
      }
    }

    evaluateHover(e.target);
  }

  function onPointerEnter(e) {
    if (e.pointerType === 'touch') return;
    pointerX = e.clientX;
    pointerY = e.clientY;
    isPointerInWindow = true;
    if (!isCursorVisible) {
      isCursorVisible = true;
      dotX = pointerX;
      dotY = pointerY;
      ringX = pointerX;
      ringY = pointerY;
      cursorContainer.classList.add('is-visible');
    }
    evaluateHover(e.target);
  }

  function onPointerLeave() {
    isPointerInWindow = false;
    isCursorVisible = false;
    lastTarget = null;
    magneticTarget = null;
    hasMagneticCenter = false;
    cursorContainer.classList.remove('is-visible');
    if (currentHoverClass) {
      cursorContainer.classList.remove(currentHoverClass);
      currentHoverClass = '';
    }
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  document.documentElement.addEventListener('pointerenter', onPointerEnter, { passive: true });
  document.documentElement.addEventListener('pointerleave', onPointerLeave, { passive: true });
  window.addEventListener('blur', onPointerLeave, { passive: true });

  // Update magnetic center on scroll or resize so it stays accurate without forced reflows in rAF
  window.addEventListener('scroll', () => {
    if (magneticTarget) updateMagneticCenter();
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (magneticTarget) updateMagneticCenter();
  }, { passive: true });

  // Pause rendering when tab is hidden to conserve CPU/GPU
  document.addEventListener('visibilitychange', () => {
    isTabActive = !document.hidden;
    if (isTabActive) {
      lastTime = performance.now();
      if (!rafId) rafId = requestAnimationFrame(renderCursor);
    }
  });

  // Single unified requestAnimationFrame loop
  function renderCursor(currentTime) {
    rafId = requestAnimationFrame(renderCursor);

    if (!isTabActive || !isPointerInWindow) return;

    if (!lastTime) {
      lastTime = currentTime;
      return;
    }

    const dtSeconds = Math.min((currentTime - lastTime) / 1000, 0.05);
    lastTime = currentTime;

    // 1. Center Dot: Instant 1:1 synchronization with pointer
    dotX = pointerX;
    dotY = pointerY;
    dotEl.style.transform = `translate3d(${dotX.toFixed(1)}px, ${dotY.toFixed(1)}px, 0) translate3d(-50%, -50%, 0)`;

    // 2. Outer Ring Target Calculation (incorporating gentle magnetic attraction when hovering interactive elements)
    let destX = pointerX;
    let destY = pointerY;

    if (magneticTarget && hasMagneticCenter) {
      // Subtle 28% magnetic pull towards element center
      const pullFactor = 0.28;
      destX = pointerX + (magCenterX - pointerX) * pullFactor;
      destY = pointerY + (magCenterY - pointerY) * pullFactor;
    }

    if (prefersReducedMotion) {
      ringX = destX;
      ringY = destY;
      ringEl.style.transform = `translate3d(${ringX.toFixed(1)}px, ${ringY.toFixed(1)}px, 0) translate3d(-50%, -50%, 0)`;
      return;
    }

    // 3. Frame-Rate-Independent Exponential Smoothing (lambda = 18.5)
    // Formula: 1 - exp(-lambda * dtSeconds)
    // Ensures mathematically identical follow motion at 60Hz, 120Hz ProMotion, 144Hz, 240Hz, etc.
    const smoothingFactor = 1 - Math.exp(-18.5 * dtSeconds);
    ringX += (destX - ringX) * smoothingFactor;
    ringY += (destY - ringY) * smoothingFactor;

    // Settle threshold: eliminate subpixel micro-oscillations when resting
    if (Math.abs(destX - ringX) < 0.05 && Math.abs(destY - ringY) < 0.05) {
      ringX = destX;
      ringY = destY;
    }

    // 4. Apply Hardware-Accelerated 3D Transform
    ringEl.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) translate3d(-50%, -50%, 0)`;
  }

  // Start the animation loop
  lastTime = performance.now();
  rafId = requestAnimationFrame(renderCursor);
})();

