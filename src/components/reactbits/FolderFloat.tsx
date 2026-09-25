import React, { useState, useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { Folder, FolderOpen, Sparkles } from 'lucide-react';

export interface FolderFloatProps {
  width?: number;
  height?: number;
  radius?: number;
  folderColor?: string;
  frontColor?: string;
  paperColor?: string;
  itemColor?: string;
  itemTextColor?: string;
  labelColor?: string;
  items?: string[];
  openDuration?: number;
  stagger?: number;
  bounce?: number;
  drift?: number;
  className?: string;
  onItemClick?: (item: string, index: number) => void;
}

export default function FolderFloat({
  width = 320,
  height = 240,
  radius = 20,
  folderColor = '#505a46',
  frontColor = '#3f4837',
  paperColor = '#f5f2eb',
  itemColor = '#d9ccb6',
  itemTextColor = '#263020',
  labelColor = '#ffffff',
  items = [
    'Cantilever Specs',
    'Passive Solar',
    'Acoustic STC 62',
    'Travertine Classico',
    'Biophilic Atrium',
    'Geothermal Heat'
  ],
  openDuration = 0.4,
  stagger = 0.08,
  bounce = 0.8,
  drift = 1.2,
  className = '',
  onItemClick
}: FolderFloatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const bodiesRef = useRef<Matter.Body[]>([]);

  useEffect(() => {
    if (!isOpen || !canvasRef.current) {
      if (engineRef.current && runnerRef.current) {
        Matter.Runner.stop(runnerRef.current);
        Matter.Engine.clear(engineRef.current);
      }
      return;
    }

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;

    const engine = Engine.create({
      gravity: { x: 0, y: -0.05 * drift, scale: 0.001 } // zero gravity / gentle float
    });
    engineRef.current = engine;

    const canvas = canvasRef.current;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: canvasWidth,
        height: canvasHeight,
        wireframes: false,
        background: 'transparent'
      }
    });
    renderRef.current = render;

    // Boundaries
    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Bodies.rectangle(canvasWidth / 2, canvasHeight + 20, canvasWidth * 2, 40, wallOptions);
    const ceiling = Bodies.rectangle(canvasWidth / 2, -20, canvasWidth * 2, 40, wallOptions);
    const leftWall = Bodies.rectangle(-20, canvasHeight / 2, 40, canvasHeight * 2, wallOptions);
    const rightWall = Bodies.rectangle(canvasWidth + 20, canvasHeight / 2, 40, canvasHeight * 2, wallOptions);

    Composite.add(engine.world, [ground, ceiling, leftWall, rightWall]);

    // Create floating pill bodies
    const pillBodies: Matter.Body[] = items.map((item, idx) => {
      const x = canvasWidth / 2 + (Math.random() - 0.5) * 80;
      const y = canvasHeight - 60 - idx * 25;
      const pillWidth = Math.max(90, item.length * 9.5);
      const pillHeight = 34;

      const body = Bodies.rectangle(x, y, pillWidth, pillHeight, {
        chamfer: { radius: 16 },
        restitution: bounce,
        friction: 0.1,
        frictionAir: 0.03,
        render: {
          fillStyle: itemColor,
          strokeStyle: '#cbbfa8',
          lineWidth: 2
        }
      });

      // Custom property for text rendering
      (body as any).pillText = item;
      (body as any).pillTextColor = itemTextColor;
      (body as any).pillIndex = idx;

      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 4 * drift,
        y: -Math.random() * 5 * drift
      });

      return body;
    });

    bodiesRef.current = pillBodies;
    Composite.add(engine.world, pillBodies);

    // Mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Custom rendering of text labels onto pills
    Matter.Events.on(render, 'afterRender', () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      pillBodies.forEach(body => {
        const text = (body as any).pillText;
        const textColor = (body as any).pillTextColor || '#263020';
        if (!text) return;

        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);
        ctx.font = '600 11px "Space Grotesk", monospace, sans-serif';
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 0, 0);
        ctx.restore();
      });
    });

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
    Render.run(render);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [isOpen, items, itemColor, itemTextColor, bounce, drift]);

  return (
    <div
      className={`relative inline-block select-none cursor-pointer ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Floating Canvas World */}
      {isOpen && (
        <div className="absolute -top-64 -left-12 -right-12 h-64 pointer-events-auto z-40">
          <div className="text-center text-[10px] font-technical uppercase text-[#5a684c] tracking-widest mb-1 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-[#7d8b68]" />
            <span>Zero-Gravity Physics · Drag & Throw Pills</span>
          </div>
          <canvas
            ref={canvasRef}
            width={width + 96}
            height={240}
            className="w-full h-full"
          />
        </div>
      )}

      {/* Main Folder Container */}
      <div
        className="w-full h-full rounded-2xl relative shadow-xl overflow-hidden border-2 border-[#d9ccb6] transition-all duration-500 hover:shadow-2xl"
        style={{
          borderRadius: `${radius}px`,
          backgroundColor: folderColor
        }}
      >
        {/* Back Flap Tab */}
        <div
          className="absolute top-0 left-6 w-32 h-6 rounded-t-xl"
          style={{ backgroundColor: folderColor }}
        >
          <span
            className="text-[10px] font-technical tracking-wider uppercase px-2 py-0.5 block truncate"
            style={{ color: labelColor }}
          >
            AURA ARCHIVE
          </span>
        </div>

        {/* Paper Sheets Inserted */}
        <div
          className={`absolute left-4 right-4 bg-white rounded-xl shadow-md transition-transform duration-500 border border-[#d9ccb6] p-4 flex flex-col justify-between ${isOpen ? '-translate-y-8 h-44' : 'top-3 h-36'}`}
          style={{
            backgroundColor: paperColor,
            transitionDuration: `${openDuration}s`
          }}
        >
          <div className="flex items-center justify-between border-b border-[#d9ccb6]/60 pb-2">
            <span className="font-editorial text-sm font-semibold text-[#283223]">
              Architectural Dossiers
            </span>
            <span className="text-[9px] font-technical text-[#6b775f]">
              {items.length} SPECS
            </span>
          </div>
          <p className="text-[11px] text-[#4d5942] leading-relaxed line-clamp-2">
            Click folder to release interactive zero-gravity floating specification pills into space.
          </p>
          <div className="flex items-center gap-1 text-[10px] font-technical text-[#768564]">
            {isOpen ? <FolderOpen className="w-3.5 h-3.5" /> : <Folder className="w-3.5 h-3.5" />}
            <span>{isOpen ? 'Close Archive' : 'Click to Open & Float'}</span>
          </div>
        </div>

        {/* Front Flap */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 rounded-b-2xl shadow-inner border-t-2 border-[#d9ccb6] flex items-end p-4 transition-transform duration-500"
          style={{
            backgroundColor: frontColor,
            borderRadius: `0 0 ${radius}px ${radius}px`,
            transform: isOpen ? 'rotateX(-25deg) translateY(6px)' : 'none',
            transformOrigin: 'bottom'
          }}
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-technical uppercase tracking-widest text-[#ede8df]">
              Confidential Blueprints
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#d9ccb6] animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
