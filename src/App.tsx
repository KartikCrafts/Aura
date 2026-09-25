import React, { useState, useRef } from 'react';
import { PageView } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EstatesGallery } from './components/EstatesGallery';
import { VirtualTour3D } from './components/VirtualTour3D';
import { MaterialCraftStudio } from './components/MaterialCraftStudio';
import { BudgetCalculator } from './components/BudgetCalculator';
import { FloorPlanGenerator } from './components/FloorPlanGenerator';
import { MarketValuationTool } from './components/MarketValuationTool';
import { CinematicVideoShowcase } from './components/CinematicVideoShowcase';
import { ConsultationModal } from './components/ConsultationModal';
import { ScrollToTop } from './components/ScrollToTop';
import { Footer } from './components/Footer';
import Masonry, { MasonryItem } from './components/reactbits/Masonry';
import ScrollExpand from './components/reactbits/ScrollExpand';
import InfiniteSpiral from './components/reactbits/InfiniteSpiral';
import FoldText from './components/reactbits/FoldText';
import { Layers, Sparkles, Hammer, Calculator, TrendingUp, Film, ArrowRight, Compass } from 'lucide-react';

const SPIRAL_ESTATE_ITEMS = [
  {
    id: 's1',
    src: 'https://i.pinimg.com/1200x/38/53/ae/3853aef67c741d9cad002af5b9c094b3.jpg',
    label: 'Pacific Horizon Cantilever',
    price: '$28.5M',
    location: 'Big Sur, CA'
  },
  {
    id: 's2',
    src: 'https://i.pinimg.com/736x/9c/74/a7/9c74a7b2f67defd99535ce16ca773b6c.jpg',
    label: 'Engawa Moss Sanctuary',
    price: '$19.2M',
    location: 'Kyoto, Japan'
  },
  {
    id: 's3',
    src: 'https://i.pinimg.com/736x/c7/95/91/c79591cc2b3d6f6ed74b2ffdc7cea475.jpg',
    label: 'Obsidian Basalt Penthouse',
    price: '$34.0M',
    location: 'Aspen Highlands'
  },
  {
    id: 's4',
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80',
    label: 'Villa Mare Sereno',
    price: '$22.8M',
    location: 'Costa Smeralda'
  },
  {
    id: 's5',
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
    label: 'The Monolith Pavilion',
    price: '$16.9M',
    location: 'Zurich Goldcoast'
  },
  {
    id: 's6',
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
    label: 'The Solstice Cantilever',
    price: '$29.4M',
    location: 'Bel Air, CA'
  },
  {
    id: 's7',
    src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80',
    label: 'Komorebi Rain Forest',
    price: '$26.4M',
    location: 'Ubud, Bali'
  },
  {
    id: 's8',
    src: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&q=80',
    label: 'Skyline Terrace Horizon',
    price: '$31.0M',
    location: 'Monaco Harbor'
  }
];

const MASONRY_ESTATE_ITEMS: MasonryItem[] = [
  {
    id: 'm1',
    title: 'The Solstice Cantilever · Bel Air',
    location: 'Bel Air, California',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80',
    url: '#',
    height: 520
  },
  {
    id: 'm2',
    title: 'Montecito Stone Sanctuary',
    location: 'Montecito, California',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
    url: '#',
    height: 400
  },
  {
    id: 'm3',
    title: 'Alpine Monolith Chalet',
    location: 'Aspen, Colorado',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
    url: '#',
    height: 620
  },
  {
    id: 'm4',
    title: 'Hinoki Courtyard Pavilion',
    location: 'Kyoto, Japan',
    img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80',
    url: '#',
    height: 460
  },
  {
    id: 'm5',
    title: 'Cala Deia Cliff Villa',
    location: 'Mallorca, Spain',
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&q=80',
    url: '#',
    height: 540
  },
  {
    id: 'm6',
    title: 'Lac Leman Water Atrium',
    location: 'Geneva, Switzerland',
    img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80',
    url: '#',
    height: 430
  },
  {
    id: 'm7',
    title: 'Cap d’Antibes Maritime Villa',
    location: 'French Riviera, France',
    img: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=900&q=80',
    url: '#',
    height: 580
  },
  {
    id: 'm8',
    title: 'Engadin Timber Retreat',
    location: 'St. Moritz, Switzerland',
    img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80',
    url: '#',
    height: 470
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('portfolio');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationEstate, setConsultationEstate] = useState<string>('');
  const galleryRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (view: PageView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreScroll = () => {
    if (currentView !== 'portfolio') {
      setCurrentView('portfolio');
    }
    setTimeout(() => {
      galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleOpenConsultation = (estateName?: string) => {
    setConsultationEstate(estateName || '');
    setIsConsultationOpen(true);
  };

  const handleLaunch3DFromGallery = (_estateId: string) => {
    setCurrentView('3d-tours');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#e8ece0] text-[#1a2317] flex flex-col justify-between selection:bg-[#d9ccb6] selection:text-[#1a2317]">
      {/* Top Architectural Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 w-full">
        {/* VIEW 1: HOME & PORTFOLIO */}
        {currentView === 'portfolio' && (
          <div className="space-y-24">
            {/* Grand Hero Section */}
            <HeroSection
              onNavigate={handleNavigate}
              onExploreScroll={handleExploreScroll}
            />

            {/* Estates Masterworks Collection */}
            <div ref={galleryRef}>
              <EstatesGallery
                onOpen3DTour={handleLaunch3DFromGallery}
                onConsult={handleOpenConsultation}
              />
            </div>

            {/* ReactBits Infinite Spiral: Directly above Engineered for Discerning Capital */}
            <div className="pt-12 border-t-2 border-[#d9ccb6] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-technical uppercase tracking-widest text-[#556345] font-semibold mb-1">
                    <Compass className="w-4 h-4 text-[#556345]" />
                    <span>ReactBits · 3D Infinite Spiral Helical Carousel</span>
                  </div>
                  <h3 className="font-editorial text-3xl sm:text-4xl text-[#1a2317] font-light">
                    <FoldText text="The Continuous Spatial Spiral Vortex" splitBy="word" trigger="scroll" />
                  </h3>
                  <p className="text-xs sm:text-sm text-[#48553f] mt-1 max-w-2xl">
                    An infinite mathematical 3D helix orbit of sovereign residential acquisitions. Drag vertically with your mouse or finger, scroll through the depth field, or hover to pause.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs font-technical text-[#556345] font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#556345] animate-ping" />
                  <span>3D Cylindrical Orbit (Drag & Scroll)</span>
                </div>
              </div>

              {/* Spiral Container */}
              <div className="relative w-full h-[520px] rounded-3xl border-2 border-[#d9ccb6] bg-[#f4f6ef] overflow-hidden shadow-lg">
                <InfiniteSpiral
                  items={SPIRAL_ESTATE_ITEMS}
                  animationMode="all"
                  speed={0.65}
                  direction="up"
                  radius={210}
                  cardWidth={165}
                  cardHeight={195}
                  cardRadius={18}
                  verticalSpacing={75}
                  perspective={1200}
                  cardsPerTurn={7}
                  centerScale={1.28}
                  edgeFade={0.28}
                  edgeBlur={4}
                  pauseOnHover={true}
                  onCardClick={(item) => handleOpenConsultation(item.label)}
                />
                {/* Floating instruction helper */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none bg-[#1e261b]/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#d9ccb6] text-[11px] font-technical text-[#ede8df] flex items-center gap-2 shadow-md">
                  <span>Hover to pause rotation</span>
                  <span>·</span>
                  <span>Drag or click card to inspect</span>
                </div>
              </div>
            </div>

            {/* Feature Suite Highlights Banner Cards */}
            <div className="pt-12 border-t-2 border-[#d9ccb6] space-y-8">
              <div className="max-w-xl">
                <span className="text-[10px] font-technical uppercase tracking-widest text-[#556345] font-bold">
                  Spatial Architecture Ecosystem
                </span>
                <h3 className="font-editorial text-3xl sm:text-4xl text-[#1a2317] font-light mt-1">
                  <FoldText text="Engineered for Discerning Capital" splitBy="word" trigger="scroll" />
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 3D Tours Preview Card */}
                <div
                  onClick={() => handleNavigate('3d-tours')}
                  className="group cursor-pointer rounded-3xl p-6 bg-[#f4f6ef] border-2 border-[#d9ccb6] hover:border-[#556345] transition-all duration-300 space-y-3 relative overflow-hidden shadow-sm hover:shadow-lg"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#d9ccb6] flex items-center justify-center text-[#556345] group-hover:scale-110 transition-transform shadow-sm">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h4 className="font-editorial text-xl text-[#1a2317] font-bold group-hover:text-[#556345] transition-colors">
                    Interactive 3D Virtual Tours
                  </h4>
                  <p className="text-xs text-[#5e6c52] leading-relaxed">
                    WebGL orbit controls, vertical floor level slicing, golden hour to twilight lighting modes, and clickable room hotspots.
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs text-[#556345] font-bold">
                    <span>Enter 3D Model</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* AI Floor Plan Card */}
                <div
                  onClick={() => handleNavigate('floor-plan')}
                  className="group cursor-pointer rounded-3xl p-6 bg-[#f4f6ef] border-2 border-[#d9ccb6] hover:border-[#556345] transition-all duration-300 space-y-3 relative overflow-hidden shadow-sm hover:shadow-lg"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#d9ccb6] flex items-center justify-center text-[#556345] group-hover:scale-110 transition-transform shadow-sm">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-editorial text-xl text-[#1a2317] font-bold group-hover:text-[#556345] transition-colors">
                    AI Floor Plan Generator
                  </h4>
                  <p className="text-xs text-[#5e6c52] leading-relaxed">
                    Personalized spatial matrix synthesis: configure lot dimensions, acoustic buffers, and solar paths for a 2D CAD blueprint & 3D isometric view.
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs text-[#556345] font-bold">
                    <span>Synthesize Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Arithmetic Budget Card */}
                <div
                  onClick={() => handleNavigate('calculator')}
                  className="group cursor-pointer rounded-3xl p-6 bg-[#f4f6ef] border-2 border-[#d9ccb6] hover:border-[#556345] transition-all duration-300 space-y-3 relative overflow-hidden shadow-sm hover:shadow-lg"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#d9ccb6] flex items-center justify-center text-[#556345] group-hover:scale-110 transition-transform shadow-sm">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <h4 className="font-editorial text-xl text-[#1a2317] font-bold group-hover:text-[#556345] transition-colors">
                    Budget Arithmetic & Financing
                  </h4>
                  <p className="text-xs text-[#5e6c52] leading-relaxed">
                    Transparent line-item calculations for foundation, curtain wall glazing, MEP automation, location multipliers, and 30-year amortized debt service.
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs text-[#556345] font-bold">
                    <span>Calculate Pro-Forma</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Making Home Material Card */}
                <div
                  onClick={() => handleNavigate('materials')}
                  className="group cursor-pointer rounded-3xl p-6 bg-[#f4f6ef] border-2 border-[#d9ccb6] hover:border-[#556345] transition-all duration-300 space-y-3 relative overflow-hidden shadow-sm hover:shadow-lg"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#d9ccb6] flex items-center justify-center text-[#556345] group-hover:scale-110 transition-transform shadow-sm">
                    <Hammer className="w-5 h-5" />
                  </div>
                  <h4 className="font-editorial text-xl text-[#1a2317] font-bold group-hover:text-[#556345] transition-colors">
                    Making Home Materiality
                  </h4>
                  <p className="text-xs text-[#5e6c52] leading-relaxed">
                    Explore rare Roman Travertine, Shou Sugi Ban charred wood, Calacatta Oro, and low-iron acoustic glass with carbon footprint & durability indices.
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs text-[#556345] font-bold">
                    <span>Material Laboratory</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Real-time Market Value Card */}
                <div
                  onClick={() => handleNavigate('market-value')}
                  className="group cursor-pointer rounded-3xl p-6 bg-[#f4f6ef] border-2 border-[#d9ccb6] hover:border-[#556345] transition-all duration-300 space-y-3 relative overflow-hidden shadow-sm hover:shadow-lg"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#d9ccb6] flex items-center justify-center text-[#556345] group-hover:scale-110 transition-transform shadow-sm">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h4 className="font-editorial text-xl text-[#1a2317] font-bold group-hover:text-[#556345] transition-colors">
                    Market Valuation Engine
                  </h4>
                  <p className="text-xs text-[#5e6c52] leading-relaxed">
                    Predictive valuation model factoring global prime enclaves, architectural premiums, recent comparable transactions, and 5-year equity compounding.
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs text-[#556345] font-bold">
                    <span>Appraise Asset</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Cinematic Videos Card */}
                <div
                  onClick={() => handleNavigate('cinema')}
                  className="group cursor-pointer rounded-3xl p-6 bg-[#f4f6ef] border-2 border-[#d9ccb6] hover:border-[#556345] transition-all duration-300 space-y-3 relative overflow-hidden shadow-sm hover:shadow-lg"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#d9ccb6] flex items-center justify-center text-[#556345] group-hover:scale-110 transition-transform shadow-sm">
                    <Film className="w-5 h-5" />
                  </div>
                  <h4 className="font-editorial text-xl text-[#1a2317] font-bold group-hover:text-[#556345] transition-colors">
                    Architectural Cinema Films
                  </h4>
                  <p className="text-xs text-[#5e6c52] leading-relaxed">
                    4K drone flyovers, diurnal light modulation reels, and immersive chapters exploring the sensory atmosphere of our private residences.
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs text-[#556345] font-bold">
                    <span>Watch Films</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* ReactBits Masonry - Curated Sovereign Residences Reflow (Estates Page Above Footer) */}
            <div className="pt-12 border-t-2 border-[#d9ccb6] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-technical uppercase tracking-widest text-[#556345] font-semibold">
                    <Sparkles className="w-4 h-4" />
                    <span>Creative UI Showcase · Dynamic Reflow Grid</span>
                  </div>
                  <h3 className="font-editorial text-3xl sm:text-4xl text-[#1a2317] font-light mt-1">
                    <FoldText text="Sovereign Estate Architectural Reflow" splitBy="word" trigger="scroll" />
                  </h3>
                  <p className="text-xs sm:text-sm text-[#48553f] max-w-xl mt-1">
                    Inspired by modern creative UI design. Multi-column masonry with GSAP center physics radiation, floating glass badges, and smooth bidirectional scroll triggers.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-technical uppercase tracking-widest text-[#556345] border-2 border-[#d9ccb6] bg-white px-3.5 py-1.5 rounded-full font-bold shadow-sm">
                    Center Physics Default
                  </span>
                </div>
              </div>

              {/* High-End Dribbble/Pinterest Style Architectural Frame */}
              <div className="p-4 sm:p-7 rounded-[32px] border-2 border-[#d9ccb6] bg-gradient-to-b from-[#f8faf5] to-[#edf1e6] shadow-xl relative overflow-hidden">
                {/* Subtle blueprint grid overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#556345_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  <Masonry
                    items={MASONRY_ESTATE_ITEMS}
                    animateFrom="center"
                    scaleOnHover={true}
                    hoverScale={0.97}
                    blurToFocus={true}
                    colorShiftOnHover={false}
                    onItemClick={() => handleNavigate('3d-tours')}
                  />
                </div>
              </div>
            </div>

            {/* ReactBits Scroll Expand (Estates Page: Below Masonry, Above Footer) */}
            <div className="pt-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-technical uppercase tracking-widest text-[#556345] font-semibold">
                    <Sparkles className="w-4 h-4" />
                    <span>ReactBits · Scroll Expand Horizon</span>
                  </div>
                  <h3 className="font-editorial text-3xl sm:text-4xl text-[#1a2317] font-light mt-1">
                    <FoldText text="The Infinite Horizon of Sovereign Architecture" splitBy="word" trigger="scroll" />
                  </h3>
                  <p className="text-xs sm:text-sm text-[#48553f] max-w-xl mt-1">
                    Scroll down into the viewport frame below. As you scroll, the architectural envelope expands to full panoramic bleed.
                  </p>
                </div>
                <span className="text-[10px] font-technical uppercase tracking-widest text-[#556345] border-2 border-[#d9ccb6] bg-white px-3.5 py-1.5 rounded-full font-bold shadow-sm">
                  Scroll Driven Expansion
                </span>
              </div>

              <ScrollExpand
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=85"
                mediaType="image"
                alt="AURA Panoramic Sovereign Estate"
                title="AURA · PACIFIC HORIZON"
                scrollHint="Scroll to expand to 100% max width"
                startWidth={48}
                startHeight={64}
                startRadius={24}
                endRadius={6}
                mediaZoom={1.25}
                containerHeight={460}
              >
                <div className="max-w-xl text-center space-y-4 px-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-technical tracking-widest uppercase">
                    Commission 2026-2028
                  </div>
                  <h4 className="font-editorial text-3xl sm:text-5xl text-white font-light leading-tight">
                    Where Architecture Dissolves into the Landscape
                  </h4>
                  <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto font-light leading-relaxed">
                    Custom post-tensioned cantilevers, geothermal mass regulation, and acoustic isolation crafted for multi-generational legacy.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => handleOpenConsultation('AURA Pacific Horizon')}
                      className="px-6 py-3 rounded-xl bg-[#e8ece0] hover:bg-white text-[#1a2317] text-xs font-semibold tracking-wider uppercase border-2 border-[#d9ccb6] transition-all cursor-pointer shadow-lg inline-flex items-center gap-2"
                    >
                      <span>Request Commission Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </ScrollExpand>
            </div>
          </div>
        )}

        {/* VIEW 2: 3D VIRTUAL TOURS & SPATIAL ROTATIONAL WHEEL */}
        {currentView === '3d-tours' && (
          <div className="animate-in fade-in duration-300">
            <VirtualTour3D onOpenConsultation={handleOpenConsultation} />
          </div>
        )}

        {/* VIEW 3: MATERIALITY & CRAFT LAB */}
        {currentView === 'materials' && (
          <div className="animate-in fade-in duration-300">
            <MaterialCraftStudio />
          </div>
        )}

        {/* VIEW 4: BUDGET CALCULATOR & ARITHMETIC */}
        {currentView === 'calculator' && (
          <div className="animate-in fade-in duration-300">
            <BudgetCalculator />
          </div>
        )}

        {/* VIEW 5: AI FLOOR PLAN BLUEPRINT GENERATOR */}
        {currentView === 'floor-plan' && (
          <div className="animate-in fade-in duration-300">
            <FloorPlanGenerator />
          </div>
        )}

        {/* VIEW 6: REAL-TIME MARKET VALUATION ENGINE */}
        {currentView === 'market-value' && (
          <div className="animate-in fade-in duration-300">
            <MarketValuationTool />
          </div>
        )}

        {/* VIEW 7: CINEMATIC VIDEO SHOWCASE */}
        {currentView === 'cinema' && (
          <div className="animate-in fade-in duration-300">
            <CinematicVideoShowcase />
          </div>
        )}
      </main>

      {/* Circular Progress Scroll-To-Top Button */}
      <ScrollToTop />

      {/* Private Consultation Dialog */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        preselectedEstate={consultationEstate}
      />

      {/* Atelier Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
