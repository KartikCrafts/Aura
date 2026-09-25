import React from 'react';
import { Compass, ArrowDown, ChevronRight, Layers, Sparkles, Play } from 'lucide-react';
import { PageView } from '../types';
import BounceCards from './reactbits/BounceCards';
import FoldText from './reactbits/FoldText';

interface HeroSectionProps {
  onNavigate: (view: PageView) => void;
  onExploreScroll: () => void;
}

const BOUNCE_IMAGES = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onExploreScroll }) => {
  return (
    <div className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-[#d9ccb6] bg-[#f4f6ee] p-6 sm:p-10 lg:p-14 shadow-xl mb-16">
      {/* Background Architectural Blueprint Pattern */}
      <div className="absolute inset-0 bg-blueprint pointer-events-none opacity-80" />

      {/* Top Coordinate Kicker */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#d9ccb6] pb-5 text-xs font-technical">
        <div className="flex items-center gap-2 text-[#556345]">
          <Compass className="w-4 h-4 animate-spin-slow" />
          <span className="tracking-widest uppercase font-semibold">Global Architectural Assets & Spatial Design</span>
        </div>
        <div className="text-[#647154] tracking-wider hidden sm:block">
          <span>LAT 36.2704° N · LON 121.8081° W · PACIFIC RESIDENTIAL ARCHIVE</span>
        </div>
      </div>

      {/* Main Hero Grid: Left Statement, Right ReactBits Bounce Cards */}
      <div className="relative z-10 my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Editorial Content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8ece0] border-2 border-[#d9ccb6] text-[#3d4834] text-xs tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#556345] animate-ping" />
            <span className="uppercase font-technical text-[10px] text-[#48553f] font-semibold">
              <FoldText text="2026 Sovereign Residences Collection" splitBy="word" trigger="mount" />
            </span>
          </div>

          <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl font-light text-[#1a2317] tracking-tight leading-[1.05]">
            <FoldText text="Where Structural Purity Meets Sovereign Living" splitBy="word" trigger="mount" />
          </h1>

          <p className="text-base sm:text-lg text-[#4a5740] max-w-2xl font-light leading-relaxed">
            Award-winning residential architecture crafted with post-tensioned cantilevers, biophilic Engawa verandas, and geological permanence. Engineered for sovereign capital and multi-generational legacy.
          </p>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={() => onNavigate('3d-tours')}
              className="flex items-center gap-2 px-7 py-4 rounded-xl bg-[#556345] text-white font-semibold text-xs tracking-wider uppercase border-2 border-[#d9ccb6] shadow-md hover:bg-[#434f36] transition-all cursor-pointer group"
            >
              <Layers className="w-4 h-4" />
              <span>Enter 3D Spatial Twin</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('floor-plan')}
              className="flex items-center gap-2 px-6 py-4 rounded-xl bg-[#f4f6ef] hover:bg-[#e9ede2] text-[#2c3624] text-xs font-semibold tracking-wider uppercase border-2 border-[#d9ccb6] transition-all cursor-pointer shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#556345]" />
              <span>AI Floor Plan Studio</span>
            </button>

            <button
              onClick={() => onNavigate('cinema')}
              className="flex items-center gap-2 px-5 py-4 rounded-xl text-[#4a5740] hover:text-[#1a2317] text-xs tracking-wider uppercase transition-all cursor-pointer font-medium"
            >
              <Play className="w-4 h-4 text-[#556345]" />
              <span>Cinematic Film</span>
            </button>
          </div>
        </div>

        {/* Right: ReactBits Bounce Cards Feature */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="relative p-3 rounded-3xl border-2 border-[#d9ccb6] bg-[#edf0e5] shadow-lg">
            <div className="text-center mb-2">
              <span className="text-[10px] font-technical uppercase tracking-widest text-[#5e6c52] block font-semibold">
                ReactBits · Interactive Bounce Cards
              </span>
              <span className="text-xs text-[#48553e] font-editorial italic">
                Hover to disperse and explore estate portfolios
              </span>
            </div>
            <BounceCards
              images={BOUNCE_IMAGES}
              containerWidth={420}
              containerHeight={350}
              animationDelay={0.3}
              animationStagger={0.08}
              easeType="elastic.out(1, 0.75)"
              enableHover={true}
              transformStyles={[
                'rotate(-12deg) translate(-130px)',
                'rotate(-6deg) translate(-65px)',
                'rotate(0deg) translate(0px)',
                'rotate(6deg) translate(65px)',
                'rotate(12deg) translate(130px)'
              ]}
            />
          </div>
        </div>
      </div>

      {/* Bottom Metrics Bar & Scroll Down Cue */}
      <div className="relative z-10 pt-5 border-t-2 border-[#d9ccb6] flex flex-col md:flex-row md:items-end justify-between gap-6">
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 font-technical">
          <div className="bg-[#edf0e5] p-3 rounded-xl border-2 border-[#d9ccb6]">
            <span className="text-2xl font-bold text-[#1a2317] tracking-tight block">$91.6M</span>
            <span className="text-[10px] text-[#5e6c52] uppercase block mt-0.5 font-medium">Active Portfolio</span>
          </div>
          <div className="bg-[#edf0e5] p-3 rounded-xl border-2 border-[#d9ccb6]">
            <span className="text-2xl font-bold text-[#1a2317] tracking-tight block">100%</span>
            <span className="text-[10px] text-[#5e6c52] uppercase block mt-0.5 font-medium">Net Zero Carbon Ready</span>
          </div>
          <div className="bg-[#edf0e5] p-3 rounded-xl border-2 border-[#d9ccb6]">
            <span className="text-2xl font-bold text-[#1a2317] tracking-tight block">STC 62</span>
            <span className="text-[10px] text-[#5e6c52] uppercase block mt-0.5 font-medium">Acoustic Isolation</span>
          </div>
          <div className="bg-[#edf0e5] p-3 rounded-xl border-2 border-[#d9ccb6]">
            <span className="text-2xl font-bold text-[#556345] tracking-tight block">07 AIA</span>
            <span className="text-[10px] text-[#5e6c52] uppercase block mt-0.5 font-medium">Honor Design Awards</span>
          </div>
        </div>

        {/* Animated Scroll Down Indicator */}
        <button
          onClick={onExploreScroll}
          className="flex items-center gap-3 text-[#4a5740] hover:text-[#1a2317] transition-colors cursor-pointer group self-start md:self-auto bg-[#edf0e5] px-4 py-2.5 rounded-xl border-2 border-[#d9ccb6] shadow-sm"
        >
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-technical uppercase tracking-widest text-[#556345] font-semibold">
              Explore Estates
            </span>
            <ArrowDown className="w-4 h-4 mt-0.5 text-[#556345] group-hover:translate-y-1.5 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  );
};
