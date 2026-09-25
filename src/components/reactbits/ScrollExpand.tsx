import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Maximize2, Unlock, Lock, ArrowDown, CheckCircle2, RotateCcw } from 'lucide-react';

const clamp = (v: number, a: number, b: number): number => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

export interface ScrollExpandProps {
  src?: string;
  mediaType?: 'image' | 'video';
  poster?: string;
  alt?: string;
  title?: string;
  scrollHint?: string;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  containerHeight?: number;
  overlayScrim?: number;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

const ScrollExpand: React.FC<ScrollExpandProps> = ({
  src = '',
  mediaType = 'image',
  poster = '',
  alt = '',
  title = '',
  scrollHint = 'Scroll to expand to max width',
  startWidth = 48,
  startHeight = 65,
  startRadius = 24,
  endRadius = 6,
  mediaZoom = 1.3,
  containerHeight = 460,
  overlayScrim = 0.5,
  children,
  className = '',
  style,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLImageElement & HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);

  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const touchStartYRef = useRef(0);

  const applyProgress = useCallback(
    (p: number) => {
      progressRef.current = p;
      setProgress(p);

      const frame = frameRef.current;
      const media = mediaRef.current;
      if (!frame || !media) return;

      const e = smoothstep(0, 1, p);
      const w = startWidth + (100 - startWidth) * e;
      const h = startHeight + (100 - startHeight) * e;
      const ix = Math.max(0, (100 - w) / 2);
      const iy = Math.max(0, (100 - h) / 2);
      const r = startRadius + (endRadius - startRadius) * e;

      frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;
      media.style.transform = `scale(${mediaZoom + (1 - mediaZoom) * e})`;

      if (scrimRef.current) {
        scrimRef.current.style.opacity = `${overlayScrim * e}`;
      }

      if (titleRef.current) {
        const out = smoothstep(0.3, 0.85, p);
        titleRef.current.style.opacity = `${1 - out}`;
        titleRef.current.style.transform = `translate3d(0, ${-25 * out}px, 0) scale(${1 + 0.05 * out})`;
      }

      if (hintRef.current) {
        const gone = smoothstep(0, 0.15, p);
        hintRef.current.style.opacity = `${1 - gone}`;
        hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`;
      }

      if (overlayRef.current) {
        const inn = smoothstep(0.65, 1, p);
        overlayRef.current.style.opacity = `${inn}`;
        overlayRef.current.style.transform = `translate3d(0, ${16 * (1 - inn)}px, 0)`;
        overlayRef.current.style.pointerEvents = inn > 0.8 ? 'auto' : 'none';
      }
    },
    [startWidth, startHeight, startRadius, endRadius, mediaZoom, overlayScrim]
  );

  // Wheel interceptor: Prevent page scroll until image reaches 100% max width!
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15;
      if (!inView) return;

      // Scrolling DOWN
      if (e.deltaY > 0) {
        if (progressRef.current < 0.99) {
          // LOCK: Prevent website from scrolling down!
          e.preventDefault();
          e.stopPropagation();

          const step = Math.min(1, progressRef.current + Math.min(0.12, Math.abs(e.deltaY) * 0.0018));
          applyProgress(step);
          return;
        }
        // If progress >= 0.99, image has covered max width -> allow page to scroll down normally!
      } else if (e.deltaY < 0) {
        // Scrolling UP
        // If user is over this element and it's expanded, contract it back before allowing scroll up
        if (rect.top >= -50 && rect.top <= window.innerHeight * 0.5) {
          if (progressRef.current > 0.01) {
            e.preventDefault();
            e.stopPropagation();

            const step = Math.max(0, progressRef.current - Math.min(0.12, Math.abs(e.deltaY) * 0.0018));
            applyProgress(step);
            return;
          }
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - currentY;
      touchStartYRef.current = currentY;

      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15;
      if (!inView) return;

      if (deltaY > 0 && progressRef.current < 0.99) {
        // Swiping up to scroll down: Lock page scroll until max width!
        e.preventDefault();
        const step = Math.min(1, progressRef.current + Math.abs(deltaY) * 0.0035);
        applyProgress(step);
      } else if (deltaY < 0 && progressRef.current > 0.01 && rect.top >= -20) {
        e.preventDefault();
        const step = Math.max(0, progressRef.current - Math.abs(deltaY) * 0.0035);
        applyProgress(step);
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, [applyProgress]);

  // Initial state setup
  useEffect(() => {
    applyProgress(0);
  }, [applyProgress]);

  const handleExpandMax = () => {
    let p = progressRef.current;
    const interval = setInterval(() => {
      p += 0.08;
      if (p >= 1) {
        applyProgress(1);
        clearInterval(interval);
      } else {
        applyProgress(p);
      }
    }, 16);
  };

  const handleReset = () => {
    let p = progressRef.current;
    const interval = setInterval(() => {
      p -= 0.08;
      if (p <= 0) {
        applyProgress(0);
        clearInterval(interval);
      } else {
        applyProgress(p);
      }
    }, 16);
  };

  const isLocked = progress < 0.98;
  const percent = Math.round(progress * 100);

  const media =
    mediaType === 'video' ? (
      <video
        ref={mediaRef}
        className="absolute inset-0 w-full h-full object-cover origin-center select-none"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      <img
        ref={mediaRef}
        className="absolute inset-0 w-full h-full object-cover origin-center select-none"
        src={src}
        alt={alt}
        draggable={false}
      />
    );

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Scroll Lock State Bar & Width Progress Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-[#edf0e5] border-2 border-[#d9ccb6] text-xs font-technical">
        <div className="flex items-center gap-2.5">
          {isLocked ? (
            <span className="flex items-center gap-1.5 text-[#8b4513] font-bold bg-[#fff8e7] px-2.5 py-1 rounded-lg border border-[#d9ccb6]">
              <Lock className="w-3.5 h-3.5" />
              <span>Page Scroll Locked · Expand to 100% Max Width</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-[#2d5a27] font-bold bg-[#edf5eb] px-2.5 py-1 rounded-lg border border-[#a3c99c]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Max Width Covered (100%) · Website Scroll Unlocked!</span>
            </span>
          )}

          <div className="hidden sm:flex items-center gap-2">
            <div className="w-24 bg-[#d9ccb6]/60 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#556345] h-full transition-all duration-150"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-[#556345] font-bold">{percent}%</span>
          </div>
        </div>

        {/* Quick controls */}
        <div className="flex items-center gap-2">
          {isLocked ? (
            <button
              onClick={handleExpandMax}
              className="px-3 py-1 rounded-xl bg-[#556345] hover:bg-[#434e36] text-white text-[11px] font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Expand to Max Width</span>
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="px-3 py-1 rounded-xl bg-white hover:bg-[#f4f6ef] text-[#556345] border border-[#d9ccb6] text-[11px] font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Expansion</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Image Fitted Compact Container */}
      <div
        ref={containerRef}
        className="relative w-full rounded-3xl border-2 border-[#d9ccb6] bg-[#1a2317] overflow-hidden shadow-xl"
        style={{
          height: `${containerHeight}px`,
          maxHeight: `${containerHeight}px`,
          ...style
        }}
        {...rest}
      >
        <div className="relative w-full h-full">
          {/* Animated Clip Frame */}
          <div
            ref={frameRef}
            className="absolute inset-0 border-2 border-[#d9ccb6] overflow-hidden transition-all duration-75 ease-out"
          >
            {media}

            {/* Gradient Scrim */}
            <div
              ref={scrimRef}
              className="absolute inset-0 opacity-0 pointer-events-none bg-[linear-gradient(to_top,rgba(0,0,0,0.85),rgba(0,0,0,0.25)_45%,rgba(0,0,0,0.4))]"
            />

            {/* Overlay content shown when expanded */}
            {children ? (
              <div
                ref={overlayRef}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 opacity-0"
              >
                {children}
              </div>
            ) : null}
          </div>

          {/* Headline over frame at rest */}
          {title ? (
            <div
              ref={titleRef}
              className="absolute inset-0 flex items-center justify-center m-0 px-6 text-center font-editorial font-light tracking-wide text-white text-2xl sm:text-4xl pointer-events-none drop-shadow-md"
            >
              {title}
            </div>
          ) : null}

          {/* Scroll Cue Hint at bottom */}
          {scrollHint ? (
            <div
              ref={hintRef}
              className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-1.5 text-center text-xs tracking-widest uppercase font-technical text-white/90 pointer-events-none drop-shadow"
            >
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              <span>{isLocked ? scrollHint : 'Scroll down to continue'}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ScrollExpand;
