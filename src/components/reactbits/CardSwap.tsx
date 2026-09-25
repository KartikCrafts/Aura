import React, { useState, useEffect, useRef, Children } from 'react';

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  skewAmount?: number;
  pauseOnHover?: boolean;
  easing?: string;
  onCardClick?: (index: number) => void;
  children?: React.ReactNode;
  className?: string;
}

export default function CardSwap({
  width = 340,
  height = 440,
  cardDistance = 45,
  verticalDistance = 18,
  delay = 3200,
  skewAmount = 2,
  pauseOnHover = true,
  easing = 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  onCardClick,
  children,
  className = ''
}: CardSwapProps) {
  const cards = Children.toArray(children);
  const [order, setOrder] = useState<number[]>(() => cards.map((_, i) => i));
  const [isSwapping, setIsSwapping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const swapCard = () => {
    if (cards.length <= 1 || isSwapping) return;
    setIsSwapping(true);

    setTimeout(() => {
      setOrder(prev => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
      setIsSwapping(false);
    }, 600);
  };

  useEffect(() => {
    if (isPaused || delay <= 0 || cards.length <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      swapCard();
    }, delay);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, delay, cards.length, isSwapping]);

  return (
    <div
      className={`relative select-none ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        perspective: '1200px'
      }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {order.map((cardIndex, stackPosition) => {
        const isTop = stackPosition === 0;
        const total = cards.length;
        const depth = stackPosition;

        const xOffset = depth * cardDistance;
        const yOffset = -depth * verticalDistance;
        const scale = 1 - depth * 0.05;
        const rotate = depth * skewAmount;
        const zIndex = total - depth;

        let transform = `translate3d(${xOffset}px, ${yOffset}px, ${-depth * 50}px) scale(${scale}) rotate(${rotate}deg)`;

        if (isTop && isSwapping) {
          transform = `translate3d(${xOffset - 180}px, ${yOffset - 40}px, 120px) scale(1.08) rotate(-14deg)`;
        }

        return (
          <div
            key={cardIndex}
            onClick={() => onCardClick && onCardClick(cardIndex)}
            className="absolute inset-0 rounded-2xl cursor-pointer transition-all border-2 border-[#d9ccb6] shadow-xl overflow-hidden"
            style={{
              transform,
              zIndex: isTop && isSwapping ? 50 : zIndex,
              opacity: isTop && isSwapping ? 0.85 : 1 - depth * 0.12,
              transition: `transform 0.65s ${easing}, opacity 0.65s ease`
            }}
          >
            {cards[cardIndex]}
          </div>
        );
      })}
    </div>
  );
}
