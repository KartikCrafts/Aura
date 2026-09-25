import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'scale-up' | 'slide-left' | 'slide-right' | 'flip-in' | 'pop-in';
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
  selector?: string; // target specific children to animate
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  duration = 0.7,
  delay = 0,
  stagger = 0,
  ease = 'power3.out',
  className = '',
  style = {},
  selector
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === 'undefined') return;

    const targets = selector
      ? Array.from(container.querySelectorAll(selector))
      : [container];

    if (!targets.length) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const activeDuration = reducedMotion ? 0.2 : duration;

    // Get initial animation props
    const getFromVars = (): gsap.TweenVars => {
      switch (animation) {
        case 'fade-up':
          return { opacity: 0, y: reducedMotion ? 0 : 36, scale: 0.98 };
        case 'scale-up':
          return { opacity: 0, scale: 0.88, y: reducedMotion ? 0 : 20 };
        case 'slide-left':
          return { opacity: 0, x: reducedMotion ? 0 : -45 };
        case 'slide-right':
          return { opacity: 0, x: reducedMotion ? 0 : 45 };
        case 'flip-in':
          return { opacity: 0, rotateX: 25, y: 30, transformOrigin: 'top center' };
        case 'pop-in':
          return { opacity: 0, scale: 0.8, y: 25 };
        default:
          return { opacity: 0, y: 30 };
      }
    };

    const getToVars = (): gsap.TweenVars => {
      return {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: activeDuration,
        delay,
        ease: animation === 'pop-in' ? 'back.out(1.5)' : ease,
        stagger: stagger > 0 ? stagger : undefined,
        clearProps: 'willChange'
      };
    };

    const fromVars = getFromVars();
    const toVars = getToVars();

    // Set initial hidden state
    gsap.set(targets, fromVars);

    const animateIn = () => {
      tweenRef.current?.kill();
      if (targets.length > 1 && stagger > 0) {
        tweenRef.current = gsap.to(targets, toVars);
      } else {
        tweenRef.current = gsap.to(targets, toVars);
      }
    };

    const resetOut = () => {
      tweenRef.current?.kill();
      gsap.set(targets, fromVars);
    };

    // Bidirectional trigger: fires on scroll down (onEnter) AND scroll up (onEnterBack)!
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 92%',
      end: 'bottom 8%',
      onEnter: () => animateIn(),
      onEnterBack: () => animateIn(),
      onLeave: () => resetOut(),
      onLeaveBack: () => resetOut()
    });

    return () => {
      trigger.kill();
      tweenRef.current?.kill();
    };
  }, [animation, duration, delay, stagger, ease, selector]);

  return (
    <div ref={containerRef} className={className} style={style}>
      {children}
    </div>
  );
};

export default ScrollReveal;
