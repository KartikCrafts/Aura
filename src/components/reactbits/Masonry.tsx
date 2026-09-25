import React, { useEffect, useLayoutEffect, useMemo, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RotateCw, Compass, MapPin, ArrowRight, Eye, Sparkles } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => {
    if (typeof window === 'undefined') return defaultValue;
    return values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  };
  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

export interface MasonryItem {
  id: string;
  img: string;
  url: string;
  height: number;
  title?: string;
  location?: string;
  price?: string;
  style?: string;
  sqFt?: string;
}

interface GridItem extends MasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  className?: string;
  showControls?: boolean;
  onItemClick?: (item: MasonryItem) => void;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.75,
  stagger = 0.05,
  animateFrom: initialAnimateFrom = 'center',
  scaleOnHover: initialScaleOnHover = true,
  hoverScale = 0.97,
  blurToFocus: initialBlurToFocus = true,
  colorShiftOnHover: initialColorShift = false,
  className = '',
  showControls = true,
  onItemClick
}) => {
  const [animateFrom, setAnimateFrom] = useState<'bottom' | 'top' | 'left' | 'right' | 'center' | 'random'>(initialAnimateFrom);
  const [scaleOnHover, setScaleOnHover] = useState(initialScaleOnHover);
  const [blurToFocus, setBlurToFocus] = useState(initialBlurToFocus);
  const [colorShiftOnHover, setColorShiftOnHover] = useState(initialColorShift);
  const [animating, setAnimating] = useState(false);

  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:640px)', '(min-width:440px)'],
    [4, 3, 2, 2],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);
  const isInViewRef = useRef(false);

  const getInitialPosition = useCallback((item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    const containerW = containerRect?.width || width || 800;
    const containerH = containerRect?.height || 600;

    let direction = animateFrom;
    if (animateFrom === 'random') {
      const dirs = ['top', 'bottom', 'left', 'right', 'center'];
      direction = dirs[Math.floor(Math.random() * dirs.length)] as typeof animateFrom;
    }

    switch (direction) {
      case 'center':
        return {
          x: containerW / 2 - item.w / 2,
          y: containerH / 2 - item.h / 2,
          scale: 0.15,
          rotation: (Math.random() - 0.5) * 12
        };
      case 'top':
        return { x: item.x, y: -250, scale: 0.85, rotation: 0 };
      case 'bottom':
        return { x: item.x, y: containerH + 300, scale: 0.85, rotation: 0 };
      case 'left':
        return { x: -300, y: item.y, scale: 0.85, rotation: 0 };
      case 'right':
        return { x: containerW + 300, y: item.y, scale: 0.85, rotation: 0 };
      default:
        return { x: item.x, y: item.y + 200, scale: 0.85, rotation: 0 };
    }
  }, [animateFrom, containerRef, width]);

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = Math.max(child.height / 2, 240);
      const y = colHeights[col];
      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const containerTotalHeight = useMemo(() => {
    if (!grid.length) return 500;
    return Math.max(...grid.map(item => item.y + item.h)) + 24;
  }, [grid]);

  // Exact ReactBits GSAP entrance & reflow animation execution
  const triggerReflowAnimation = useCallback(() => {
    if (!imagesReady || !grid.length) return;
    setAnimating(true);

    const containerRect = containerRef.current?.getBoundingClientRect();
    const containerCenterX = (containerRect?.width || width || 800) / 2;
    const containerCenterY = (containerRect?.height || 600) / 2;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const el = containerRef.current?.querySelector(selector) as HTMLElement;
      if (!el) return;

      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };
      const start = getInitialPosition(item);

      // Distance from center for radial stagger effect in center mode
      const itemCenterX = item.x + item.w / 2;
      const itemCenterY = item.y + item.h / 2;
      const distFromCenter = Math.hypot(itemCenterX - containerCenterX, itemCenterY - containerCenterY);
      const centerDelay = (distFromCenter / 900) * 0.25;
      const activeDelay = animateFrom === 'center' ? centerDelay : index * stagger;

      gsap.killTweensOf(el);
      gsap.fromTo(
        el,
        {
          opacity: 0,
          x: start.x,
          y: start.y,
          scale: start.scale,
          rotation: start.rotation || 0,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: 'blur(16px)' })
        },
        {
          opacity: 1,
          ...animProps,
          scale: 1,
          rotation: 0,
          ...(blurToFocus && { filter: 'blur(0px)' }),
          duration: animateFrom === 'center' ? 0.85 : duration,
          ease: animateFrom === 'center' ? 'power3.out' : ease,
          delay: activeDelay,
          onComplete: () => {
            if (index === grid.length - 1) {
              setAnimating(false);
            }
          }
        }
      );
    });
  }, [imagesReady, grid, getInitialPosition, blurToFocus, duration, ease, stagger, animateFrom, width, containerRef]);

  // GSAP ScrollTrigger to ensure user sees the animation EVERY TIME on scroll down and scroll up!
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !imagesReady || typeof window === 'undefined') return;

    isInViewRef.current = true;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      end: 'bottom 12%',
      onEnter: () => triggerReflowAnimation(),
      onEnterBack: () => triggerReflowAnimation(),
      onLeave: () => {
        // Reset positions when scrolled past
        grid.forEach(item => {
          const cardEl = el.querySelector(`[data-key="${item.id}"]`) as HTMLElement;
          if (cardEl) gsap.set(cardEl, { opacity: 0 });
        });
      },
      onLeaveBack: () => {
        // Reset positions when scrolled back above
        grid.forEach(item => {
          const cardEl = el.querySelector(`[data-key="${item.id}"]`) as HTMLElement;
          if (cardEl) gsap.set(cardEl, { opacity: 0 });
        });
      }
    });

    return () => trigger.kill();
  }, [imagesReady, triggerReflowAnimation, grid, containerRef]);

  // Layout update reflow
  useLayoutEffect(() => {
    if (!imagesReady || !isInViewRef.current) return;
    grid.forEach(item => {
      const selector = `[data-key="${item.id}"]`;
      const el = containerRef.current?.querySelector(selector) as HTMLElement;
      if (!el) return;
      gsap.to(el, {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
        duration: 0.45,
        ease,
        overwrite: 'auto'
      });
    });
  }, [grid, imagesReady, ease, containerRef]);

  const handleMouseEnter = (item: GridItem, _element: HTMLElement) => {
    const selector = `[data-key="${item.id}"]`;
    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = (item: GridItem, _element: HTMLElement) => {
    const selector = `[data-key="${item.id}"]`;
    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Modern Pinterest/Dribbble Architectural Segmented Control Bar */}
      {showControls && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border-2 border-[#d9ccb6] shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => triggerReflowAnimation()}
              disabled={animating}
              className="px-4 py-2 rounded-xl bg-[#1a2317] hover:bg-[#556345] text-white text-xs font-technical uppercase font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95 disabled:opacity-50"
            >
              <RotateCw className={`w-3.5 h-3.5 ${animating ? 'animate-spin' : ''}`} />
              <span>Physics Dispersal (Center Default)</span>
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#556345] font-technical font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Center Radiate GSAP Physics</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-technical">
            <div className="flex items-center gap-1 bg-[#f4f6ef] p-1 rounded-xl border border-[#d9ccb6]">
              <span className="text-[10px] uppercase text-[#768564] font-bold px-1.5">Physics Origin:</span>
              {(['center', 'bottom', 'top', 'left', 'right', 'random'] as const).map(dir => (
                <button
                  key={dir}
                  onClick={() => {
                    setAnimateFrom(dir);
                    setTimeout(() => triggerReflowAnimation(), 50);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] uppercase font-bold transition-all ${
                    animateFrom === dir ? 'bg-[#556345] text-white shadow-sm' : 'text-[#48553f] hover:bg-[#e8ece0]'
                  }`}
                >
                  {dir}
                </button>
              ))}
            </div>

            <button
              onClick={() => setBlurToFocus(!blurToFocus)}
              className={`px-3 py-1.5 rounded-xl border text-[10px] uppercase font-bold transition-all ${
                blurToFocus ? 'bg-[#556345] text-white border-[#556345]' : 'bg-white border-[#d9ccb6] text-[#768564]'
              }`}
            >
              Blur: {blurToFocus ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      )}

      {/* Masonry Canvas with High-End Pinterest/Dribbble Card Design */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ height: `${containerTotalHeight}px`, minHeight: '480px' }}
      >
        {grid.map(item => (
          <div
            key={item.id}
            data-key={item.id}
            className="absolute top-0 left-0 p-2 box-border cursor-pointer group"
            style={{
              width: `${item.w}px`,
              height: `${item.h}px`,
              willChange: 'transform, width, height, opacity, filter'
            }}
            onClick={() => {
              if (onItemClick) {
                onItemClick(item);
              } else if (item.url && item.url !== '#') {
                window.open(item.url, '_blank', 'noopener');
              }
            }}
            onMouseEnter={e => handleMouseEnter(item, e.currentTarget)}
            onMouseLeave={e => handleMouseLeave(item, e.currentTarget)}
          >
            {/* Pinterest/Dribbble Luxury UI Card Frame */}
            <div className="relative w-full h-full rounded-3xl border-2 border-[#d9ccb6] hover:border-[#556345] shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden bg-[#1a2317] flex flex-col justify-between">
              {/* Background Image */}
              <img
                src={item.img}
                alt={item.title || 'Architectural Masterwork'}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />

              {/* Gradient scrim for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 pointer-events-none" />

              {/* Top Floating Glass Badges */}
              <div className="relative z-10 p-3.5 flex items-center justify-between">
                <span className="bg-[#1a2317]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] uppercase tracking-wider text-[#ede8df] font-semibold flex items-center gap-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5eead4] animate-pulse" />
                  <span>{item.location?.split(',')[0] || 'Sovereign Estate'}</span>
                </span>

                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-white/90 hover:bg-[#556345] text-[#1a2317] hover:text-white backdrop-blur-md flex items-center justify-center shadow-lg transition-all transform group-hover:rotate-45"
                  title="Inspect Masterwork"
                >
                  <Compass className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Architectural Info Dock */}
              <div className="relative z-10 p-4 space-y-2">
                <div>
                  <h4 className="font-editorial text-lg sm:text-xl font-bold text-white leading-tight drop-shadow-md group-hover:text-[#d9ccb6] transition-colors">
                    {item.title || `Sovereign Villa ${item.id}`}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-[#d9ccb6] mt-1 font-technical">
                    <MapPin className="w-3.5 h-3.5 text-[#5eead4]" />
                    <span>{item.location || 'California Enclave'}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/15 flex items-center justify-between">
                  <span className="text-xs font-technical font-bold text-white tracking-wide">
                    $28.5M – $49.0M USD
                  </span>

                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#1a2317] text-[10px] font-technical uppercase font-bold tracking-wider backdrop-blur-md border border-white/30 transition-all">
                    <span>Explore 3D</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Masonry;

