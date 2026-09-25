import React, { useState, useRef } from 'react';
import {
  MapPin,
  Maximize2,
  BedDouble,
  Bath,
  Car,
  Compass,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Layers,
  MousePointer,
  CheckCircle2,
  Sun,
  Sunset,
  Moon,
  Activity,
  Thermometer,
  Wind,
  Volume2,
  Box,
  RotateCw,
  Expand,
  Minimize2,
  Eye,
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import FoldText from './reactbits/FoldText';
import ScrollReveal from './reactbits/ScrollReveal';

export interface LuxuryEstate3DItem {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  location: string;
  tagline: string;
  sqFt: string;
  beds: number;
  baths: number;
  garage: number;
  yearBuilt: string;
  imageUrl: string;
  architecturalStyle: string;
  primaryMaterials: string[];
  features: string[];
  description: string;
  sketchfabId: string;
  sketchfabTitle: string;
  polyCount: string;
  floors: number;
}

export const LUXURY_ESTATES_3D: LuxuryEstate3DItem[] = [
  {
    id: 'estate-1',
    name: 'The Solstice Horizon Villa',
    subtitle: 'Cantilever Grand Edition',
    price: '$38,500,000',
    location: 'Bel Air Crest, Los Angeles, CA',
    tagline: 'A floating architectural cantilever dissolved into coastal sky and canyon horizon.',
    sqFt: '14,200 SQ FT',
    beds: 6,
    baths: 8,
    garage: 4,
    yearBuilt: '2026 Sovereign Commission',
    imageUrl: 'https://i.pinimg.com/1200x/38/53/ae/3853aef67c741d9cad002af5b9c094b3.jpg',
    architecturalStyle: 'Post-Tensioned Cantilever Modernism',
    primaryMaterials: ['Roman Classico Travertine', 'Honed Basalt', 'Low-Iron Structural Glass'],
    features: [
      '32ft gravity-defying cantilever living atrium',
      'Zero-edge black basalt reflection pool',
      '1,800-bottle subterranean temperature-vault',
      'Private biometric security elevator'
    ],
    description:
      'Engineered directly into the bedrock of Bel Air, the Solstice Horizon Villa balances razor-thin structural spans with heavy geological travertine masonry.',
    sketchfabId: 'c2070d21f4e749b9806adbbd68b637d7',
    sketchfabTitle: 'Modern luxury villa house building home - Cantilever Edition',
    polyCount: '1.4M Polygons',
    floors: 3
  },
  {
    id: 'estate-2',
    name: 'The Monolithic Glass Pavilion',
    subtitle: 'Pavilion Signature Edition',
    price: '$42,800,000',
    location: 'Montecito Foothills, Santa Barbara, CA',
    tagline: 'Quiet monumentalism nestled inside ancient California live oak groves.',
    sqFt: '16,800 SQ FT',
    beds: 7,
    baths: 10,
    garage: 6,
    yearBuilt: '2025 Sovereign Commission',
    imageUrl: 'https://i.pinimg.com/736x/9c/74/a7/9c74a7b2f67defd99535ce16ca773b6c.jpg',
    architecturalStyle: 'Organic Minimalist Monumentalism',
    primaryMaterials: ['Charred Shou Sugi Ban Cedar', 'Taj Mahal Quartzite', 'Architectural Bronze'],
    features: [
      '270° triple-insulated motorized glass façade',
      'Geothermal hydronic heated basalt terraces',
      'Olympic-length private lap pool with underwater audio',
      'Subterranean 6-car collector gallery'
    ],
    description:
      'A sanctuary designed for multi-generational permanence. Monolithic Japanese burnt cedar contrasts against warm brushed bronze and museum-grade glass walls.',
    sketchfabId: '4958b4ac23eb445aaa6115278676d5df',
    sketchfabTitle: 'Modern luxury villa house building home - Glass Pavilion Edition',
    polyCount: '1.8M Polygons',
    floors: 2
  },
  {
    id: 'estate-3',
    name: 'The Obsidian Horizon Residence',
    subtitle: 'Brutalist Panoramic Edition',
    price: '$49,000,000',
    location: 'Red Mountain, Aspen, Colorado',
    tagline: 'High-altitude sovereign fortress with panoramic Continental Divide vistas.',
    sqFt: '18,500 SQ FT',
    beds: 8,
    baths: 11,
    garage: 6,
    yearBuilt: '2026 Sovereign Commission',
    imageUrl: 'https://i.pinimg.com/736x/c7/95/91/c79591cc2b3d6f6ed74b2ffdc7cea475.jpg',
    architecturalStyle: 'High-Altitude Brutalist Luxe',
    primaryMaterials: ['Swiss Glacier Quartzite', 'Reclaimed Old-Growth Timber', 'Blackened Steel'],
    features: [
      'Direct ski-in / ski-out private heated funicular',
      'Oxygen-enriched primary sleep sanctuary suites',
      'Indoor-outdoor heated hydrotherapy grotto',
      'Dual commercial catering scullery kitchens'
    ],
    description:
      'Perched on the most coveted bluff of Red Mountain, this home marries rugged alpine durability with unmatched interior refinement.',
    sketchfabId: '94d8357737ec4334aaea2d8e489e7d4d',
    sketchfabTitle: 'Modern luxury villa house building - Horizon Residence',
    polyCount: '2.1M Polygons',
    floors: 3
  }
];

interface VirtualTour3DProps {
  onOpenConsultation?: (estateName: string) => void;
}

export const VirtualTour3D: React.FC<VirtualTour3DProps> = ({ onOpenConsultation }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isIframeLoaded, setIsIframeLoaded] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [lightingPreset, setLightingPreset] = useState<'noon' | 'golden' | 'night'>('noon');
  const [activeZone, setActiveZone] = useState<string>('atrium');
  const [interiorLightsOn, setInteriorLightsOn] = useState<boolean>(true);
  const [poolLightsOn, setPoolLightsOn] = useState<boolean>(true);
  const [facadeLightsOn, setFacadeLightsOn] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const activeEstate = LUXURY_ESTATES_3D[selectedIndex];

  const handleSelectEstate = (index: number) => {
    if (index === selectedIndex) return;
    setIsIframeLoaded(false);
    setSelectedIndex(index);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // 3D Canvas visual filters based on lighting preset
  const getCanvasFilter = () => {
    if (lightingPreset === 'noon') {
      return 'brightness(1.04) contrast(1.02) saturate(1.0)';
    }
    if (lightingPreset === 'golden') {
      return 'brightness(0.95) contrast(1.08) saturate(1.28) sepia(0.24)';
    }
    // Night preset
    return 'brightness(0.55) contrast(1.32) saturate(0.82) hue-rotate(188deg)';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header section with 3D FoldText Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#d9ccb6] pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-technical uppercase tracking-widest text-[#556345] font-bold">
            <Layers className="w-4 h-4 text-[#556345]" />
            <span>3D Digital Twin · Sovereign Spatial Engine</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl font-light text-[#1a2317] tracking-tight mt-1">
            <FoldText text="3D Twin Sovereign Residences" splitBy="word" trigger="scroll" />
          </h2>
          <p className="text-xs sm:text-sm text-[#48553f] max-w-2xl mt-1">
            Immersive 3D Spatial Digital Twin with dual real-time telemetry dashboards. Real-time solar lighting engine with authentic architectural night illumination.
          </p>
        </div>

        {/* Estate Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-[#f4f6ef] p-1.5 rounded-2xl border-2 border-[#d9ccb6] shadow-sm">
          {LUXURY_ESTATES_3D.map((estate, idx) => (
            <button
              key={estate.id}
              onClick={() => handleSelectEstate(idx)}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-technical uppercase font-bold transition-all cursor-pointer flex items-center gap-2 ${
                selectedIndex === idx
                  ? 'bg-[#134e4a] text-white shadow-sm'
                  : 'text-[#1a2317] hover:bg-[#e4e9db]'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Model {idx + 1}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ================= MAIN CONTAINER WITH TEAL BACKGROUND (Matching website theme) ================= */}
      <div
        ref={containerRef}
        className={`relative rounded-3xl border-2 border-[#a3c9c3] bg-[#dbeae7] p-4 sm:p-6 lg:p-7 shadow-sm transition-all duration-300 overflow-hidden ${
          isFullscreen ? 'fixed inset-4 z-50 p-6 overflow-y-auto' : ''
        }`}
      >
        {/* Subtle Architectural Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-25 bg-[linear-gradient(to_right,rgba(19,78,74,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(19,78,74,0.08)_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Top Control Bar with Model Switcher & Live Indicators */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#a3c9c3] mb-6 text-xs font-technical">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#c9e2de] border border-[#8ebcb4] text-[#134e4a] font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#134e4a]" />
              <span>BIM Twin Live Render</span>
            </span>
            <span className="text-[#1e4844] font-semibold hidden md:inline">
              Model ID: {activeEstate.sketchfabId.slice(0, 12)}...
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-[#f0f6f4] px-3 py-1 rounded-xl border border-[#a3c9c3] text-[#1a2317] text-[11px]">
              <MousePointer className="w-3.5 h-3.5 text-[#134e4a]" />
              <span>Orbit: Left Click · Pan: Right Click · Zoom: Wheel</span>
            </div>

            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-xl bg-[#f0f6f4] hover:bg-[#e2eeeb] text-[#134e4a] border border-[#a3c9c3] transition-all cursor-pointer shadow-sm"
              title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Expand className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* ================= 3-COLUMN SPATIAL LAYOUT ================= */}
        {/* Left Dashboard (Specification) · Center 3D Model · Right Dashboard (Telemetry) */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ================= 1. LEFT DASHBOARD: ARCHITECTURAL SPECIFICATION ================= */}
          <ScrollReveal animation="slide-left" delay={0.05} className="lg:col-span-3 space-y-4">
            <div className="p-5 rounded-2xl border-2 border-[#a3c9c3] bg-[#f0f6f4] shadow-sm text-[#1a2317] space-y-4">
              
              {/* Badge & Edition */}
              <div className="flex items-center justify-between gap-2 border-b border-[#c2ded9] pb-3">
                <span className="text-[10px] font-technical uppercase tracking-widest text-[#134e4a] font-bold bg-[#d5e8e4] px-2.5 py-0.5 rounded border border-[#8ebcb4]">
                  {activeEstate.subtitle}
                </span>
                <span className="text-[10px] font-technical text-[#3f5f5a] font-semibold">
                  {activeEstate.yearBuilt}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="font-editorial text-2xl text-[#1a2317] font-semibold leading-tight">
                  <FoldText key={activeEstate.id} text={activeEstate.name} splitBy="word" trigger="mount" />
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-[#134e4a] mt-1 font-technical font-semibold">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{activeEstate.location}</span>
                </div>
              </div>

              {/* Sovereign Price Tag in Crisp Black/Teal */}
              <div className="p-3.5 rounded-xl bg-white border-2 border-[#b5d6d1] shadow-sm">
                <div className="text-[9px] font-technical uppercase tracking-wider text-[#3f5f5a] font-bold">
                  Sovereign Acquisition Price
                </div>
                <div className="font-editorial text-2xl sm:text-3xl text-[#134e4a] font-bold tracking-tight mt-0.5">
                  {activeEstate.price}
                </div>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-[#1a2317] font-technical font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-[#134e4a]" />
                  <span>Certified Valuation Guarantee</span>
                </div>
              </div>

              {/* Architectural Dimensions Grid */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-technical">
                <div className="bg-white p-2.5 rounded-xl border border-[#b5d6d1] shadow-xs">
                  <Maximize2 className="w-3.5 h-3.5 text-[#134e4a] mx-auto mb-1" />
                  <div className="font-bold text-[#1a2317] text-[11px]">{activeEstate.sqFt}</div>
                  <div className="text-[9px] uppercase tracking-wider text-[#4d6b67] font-semibold">Area</div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-[#b5d6d1] shadow-xs">
                  <BedDouble className="w-3.5 h-3.5 text-[#134e4a] mx-auto mb-1" />
                  <div className="font-bold text-[#1a2317] text-[11px]">{activeEstate.beds} Suites</div>
                  <div className="text-[9px] uppercase tracking-wider text-[#4d6b67] font-semibold">Suites</div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-[#b5d6d1] shadow-xs">
                  <Bath className="w-3.5 h-3.5 text-[#134e4a] mx-auto mb-1" />
                  <div className="font-bold text-[#1a2317] text-[11px]">{activeEstate.baths} Baths</div>
                  <div className="text-[9px] uppercase tracking-wider text-[#4d6b67] font-semibold">Baths</div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-[#b5d6d1] shadow-xs">
                  <Car className="w-3.5 h-3.5 text-[#134e4a] mx-auto mb-1" />
                  <div className="font-bold text-[#1a2317] text-[11px]">{activeEstate.garage} Bays</div>
                  <div className="text-[9px] uppercase tracking-wider text-[#4d6b67] font-semibold">Gallery</div>
                </div>
              </div>

              {/* Material Craft Palette */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] uppercase font-technical text-[#1a2317] font-bold flex items-center justify-between">
                  <span>Monolithic Materials:</span>
                  <span className="text-[9px] text-[#134e4a] font-bold">BIM Grade</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {activeEstate.primaryMaterials.map((mat, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-white text-[#1a2317] px-2 py-0.5 rounded border border-[#b5d6d1] font-technical font-medium"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Architectural Description */}
              <p className="text-[11px] text-[#2c3d3a] leading-relaxed italic border-l-2 border-[#134e4a] pl-2.5">
                "{activeEstate.tagline}"
              </p>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => onOpenConsultation?.(activeEstate.name)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#134e4a] hover:bg-[#0c3633] text-white text-xs font-technical uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-98"
                >
                  <span>Request Full Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenConsultation?.(`${activeEstate.name} - 3D VIP Viewing`)}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-[#e4efe9] text-[#1a2317] border border-[#a3c9c3] text-xs font-technical uppercase font-bold tracking-wider transition-all cursor-pointer text-center shadow-xs"
                >
                  Schedule Private Tour
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* ================= 2. CENTER: REAL-TIME 3D SPATIAL MODEL CANVAS ================= */}
          <div className="lg:col-span-6 space-y-3">
            <div className="relative w-full h-[580px] sm:h-[620px] rounded-3xl border-2 border-[#8ebcb4] bg-[#0c1a18] overflow-hidden shadow-md group">
              
              {/* Live Loading Overlay */}
              {!isIframeLoaded && (
                <div className="absolute inset-0 z-30 bg-[#e2edea] flex flex-col items-center justify-center gap-3 text-[#1a2317]">
                  <div className="w-10 h-10 rounded-full border-3 border-[#134e4a] border-t-transparent animate-spin" />
                  <div className="text-xs font-technical uppercase tracking-widest text-[#134e4a] font-bold flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Streaming 3D Spatial Digital Twin...</span>
                  </div>
                  <div className="text-[10px] text-[#4d6b67] font-technical">
                    {activeEstate.sketchfabTitle}
                  </div>
                </div>
              )}

              {/* Embedded Official Sketchfab 3D Model Iframe with Lighting Filter */}
              <div
                className="w-full h-full transition-all duration-700 ease-out"
                style={{
                  filter: getCanvasFilter()
                }}
              >
                <iframe
                  key={activeEstate.sketchfabId}
                  title={activeEstate.sketchfabTitle}
                  allowFullScreen
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  src={`https://sketchfab.com/models/${activeEstate.sketchfabId}/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0`}
                  className="w-full h-full border-0 rounded-2xl"
                  onLoad={() => setIsIframeLoaded(true)}
                />
              </div>

              {/* ================= REAL HOME NOCTURNAL ARCHITECTURAL LIGHTING LAYER ================= */}
              {lightingPreset === 'night' && (
                <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden transition-opacity duration-700">
                  {/* Nocturnal Deep Navy Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020b12]/80 via-transparent to-[#030d17]/60" />
                  
                  {/* Warm Interior Architectural Cove Illumination spilling through windows */}
                  {interiorLightsOn && (
                    <>
                      <div className="absolute top-[28%] left-[20%] w-[38%] h-[24%] bg-gradient-to-b from-[#fcd34d]/25 via-[#fbbf24]/18 to-transparent rounded-2xl blur-md" />
                      <div className="absolute top-[35%] right-[22%] w-[30%] h-[22%] bg-gradient-to-b from-[#fef08a]/28 via-[#f59e0b]/15 to-transparent rounded-2xl blur-md" />
                      <div className="absolute top-[48%] left-[28%] w-[45%] h-[18%] bg-radial from-[#fef3c7]/20 via-[#fde68a]/10 to-transparent blur-lg" />
                    </>
                  )}

                  {/* Basalt Reflection Pool Underwater Cyan Luminescence */}
                  {poolLightsOn && (
                    <div className="absolute bottom-[16%] left-[22%] w-[48%] h-[16%] bg-gradient-to-t from-[#06b6d4]/35 via-[#0891b2]/20 to-transparent rounded-full blur-xl" />
                  )}

                  {/* Architectural Facade & Ground Uplights */}
                  {facadeLightsOn && (
                    <>
                      <div className="absolute bottom-[22%] left-[16%] w-10 h-32 bg-gradient-to-t from-[#fef08a]/35 via-[#fde047]/15 to-transparent blur-md -rotate-12" />
                      <div className="absolute bottom-[22%] right-[18%] w-10 h-32 bg-gradient-to-t from-[#fef08a]/35 via-[#fde047]/15 to-transparent blur-md rotate-12" />
                      <div className="absolute bottom-[20%] left-[48%] w-14 h-28 bg-gradient-to-t from-[#fed7aa]/30 to-transparent blur-md" />
                    </>
                  )}
                </div>
              )}

              {/* Golden Hour Sunset Warm Amber Atmosphere Layer */}
              {lightingPreset === 'golden' && (
                <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-[#78350f]/20 via-transparent to-[#f59e0b]/15 transition-opacity duration-700" />
              )}

              {/* Top Floating Model & Lighting Status Badge */}
              <div className="absolute top-3 left-3 z-20 pointer-events-none flex items-center gap-2">
                <span className="bg-[#f0f6f4]/95 backdrop-blur-md px-3 py-1 rounded-full border border-[#8ebcb4] text-[10px] font-technical text-[#1a2317] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  <span className={`w-2 h-2 rounded-full ${lightingPreset === 'night' ? 'bg-[#f59e0b]' : lightingPreset === 'golden' ? 'bg-[#d97706]' : 'bg-[#134e4a]'}`} />
                  <span>
                    {lightingPreset === 'night'
                      ? 'Night Mode · Real Home Lighting Active'
                      : lightingPreset === 'golden'
                      ? 'Golden Hour · Warm Dusk (3200K)'
                      : 'Noon Daylight · Solar Noon (5500K)'}
                  </span>
                </span>
                <span className="bg-[#f0f6f4]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#8ebcb4] text-[10px] font-technical text-[#1a2317] font-semibold">
                  {activeEstate.polyCount}
                </span>
              </div>

              {/* Night Lighting Controls Strip (when Night is active) */}
              {lightingPreset === 'night' && (
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-[#f0f6f4]/95 backdrop-blur-md p-1.5 rounded-2xl border border-[#8ebcb4] shadow-sm text-xs font-technical">
                  <span className="text-[10px] text-[#1a2317] font-bold px-1.5 hidden sm:inline">Lighting Circuits:</span>
                  
                  <button
                    onClick={() => setInteriorLightsOn(!interiorLightsOn)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer border ${
                      interiorLightsOn
                        ? 'bg-[#134e4a] text-white border-[#134e4a]'
                        : 'bg-white text-[#4d6b67] border-[#b5d6d1]'
                    }`}
                    title="Toggle Interior Warm Cove Lighting"
                  >
                    Interior
                  </button>

                  <button
                    onClick={() => setPoolLightsOn(!poolLightsOn)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer border ${
                      poolLightsOn
                        ? 'bg-[#0891b2] text-white border-[#0891b2]'
                        : 'bg-white text-[#4d6b67] border-[#b5d6d1]'
                    }`}
                    title="Toggle Pool Underwater Luminescence"
                  >
                    Pool
                  </button>

                  <button
                    onClick={() => setFacadeLightsOn(!facadeLightsOn)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer border ${
                      facadeLightsOn
                        ? 'bg-[#134e4a] text-white border-[#134e4a]'
                        : 'bg-white text-[#4d6b67] border-[#b5d6d1]'
                    }`}
                    title="Toggle Facade Uplighting"
                  >
                    Facade
                  </button>
                </div>
              )}

              {/* Bottom Quick Switch Bar */}
              <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between bg-[#f0f6f4]/95 backdrop-blur-md px-3 py-2 rounded-2xl border border-[#8ebcb4] text-xs font-technical text-[#1a2317] shadow-sm">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase text-[#4d6b67] font-bold hidden sm:inline">Active Villa:</span>
                  <span className="text-[11px] text-[#1a2317] font-bold">{activeEstate.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#134e4a] font-bold">360° Free Orbit Enabled</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#134e4a]" />
                </div>
              </div>
            </div>

            {/* Model Switcher Thumbnail Strip */}
            <div className="grid grid-cols-3 gap-3">
              {LUXURY_ESTATES_3D.map((estate, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <div
                    key={estate.id}
                    onClick={() => handleSelectEstate(idx)}
                    className={`group cursor-pointer rounded-2xl p-2.5 border-2 transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#f0f6f4] border-[#134e4a] shadow-sm'
                        : 'bg-[#f0f6f4]/70 border-[#b5d6d1] hover:border-[#134e4a]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#8ebcb4] flex-shrink-0">
                        <img
                          src={estate.imageUrl}
                          alt={estate.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9px] uppercase font-technical text-[#134e4a] font-bold">
                          Model {idx + 1}
                        </div>
                        <div className="text-[11px] font-technical font-bold text-[#1a2317] truncate">
                          {estate.name}
                        </div>
                        <div className="text-[10px] font-technical text-[#3f5f5a] font-semibold">
                          {estate.price}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= 3. RIGHT DASHBOARD: TELEMETRY & DIGITAL TWIN CONTROLS ================= */}
          <ScrollReveal animation="slide-right" delay={0.08} className="lg:col-span-3 space-y-4">
            <div className="p-5 rounded-2xl border-2 border-[#a3c9c3] bg-[#f0f6f4] shadow-sm text-[#1a2317] space-y-4">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#c2ded9] pb-3">
                <div className="flex items-center gap-2 text-xs font-technical uppercase font-bold text-[#134e4a]">
                  <Activity className="w-3.5 h-3.5 text-[#134e4a]" />
                  <span>Twin Telemetry</span>
                </div>
                <span className="text-[10px] font-technical text-[#134e4a] bg-[#d5e8e4] px-2 py-0.5 rounded border border-[#8ebcb4] font-bold">
                  Real-time
                </span>
              </div>

              {/* Lighting & Solar Simulation Control (Noon, Golden, Night) */}
              <div className="space-y-2">
                <div className="text-[10px] uppercase font-technical text-[#1a2317] font-bold flex items-center justify-between">
                  <span>Solar Path & Night Lighting</span>
                  <Sun className="w-3.5 h-3.5 text-[#134e4a]" />
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setLightingPreset('noon')}
                    className={`py-2 px-2 rounded-xl text-[10px] font-technical uppercase font-bold transition-all flex flex-col items-center gap-1 cursor-pointer border-2 ${
                      lightingPreset === 'noon'
                        ? 'bg-[#134e4a] text-white border-[#134e4a] shadow-sm'
                        : 'bg-white text-[#1a2317] border-[#b5d6d1] hover:border-[#134e4a]'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>Noon</span>
                  </button>

                  <button
                    onClick={() => setLightingPreset('golden')}
                    className={`py-2 px-2 rounded-xl text-[10px] font-technical uppercase font-bold transition-all flex flex-col items-center gap-1 cursor-pointer border-2 ${
                      lightingPreset === 'golden'
                        ? 'bg-[#b45309] text-white border-[#b45309] shadow-sm'
                        : 'bg-white text-[#1a2317] border-[#b5d6d1] hover:border-[#b45309]'
                    }`}
                  >
                    <Sunset className="w-3.5 h-3.5" />
                    <span>Golden</span>
                  </button>

                  <button
                    onClick={() => setLightingPreset('night')}
                    className={`py-2 px-2 rounded-xl text-[10px] font-technical uppercase font-bold transition-all flex flex-col items-center gap-1 cursor-pointer border-2 ${
                      lightingPreset === 'night'
                        ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-sm'
                        : 'bg-white text-[#1a2317] border-[#b5d6d1] hover:border-[#0f172a]'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>Night</span>
                  </button>
                </div>
                
                {/* Active Lighting Description Badge */}
                <div className="p-2 rounded-xl bg-white border border-[#b5d6d1] text-[10px] font-technical text-[#3f5f5a]">
                  {lightingPreset === 'noon' && '☀️ 12:00 PM: High noon sun with crisp daylight architectural contrast.'}
                  {lightingPreset === 'golden' && '🌅 06:45 PM: Low-angle warm 3200K amber rays across facade and terraces.'}
                  {lightingPreset === 'night' && '🌙 10:30 PM: Real estate illumination with 2700K interior cove & pool lighting.'}
                </div>
              </div>

              {/* Spatial Zones Inspector */}
              <div className="space-y-2">
                <div className="text-[10px] uppercase font-technical text-[#1a2317] font-bold flex items-center justify-between">
                  <span>Spatial Zone Inspector</span>
                  <Eye className="w-3.5 h-3.5 text-[#134e4a]" />
                </div>
                <div className="space-y-1 text-xs font-technical">
                  {[
                    { id: 'atrium', label: 'Grand Atrium', sqft: '3,200 SQ FT' },
                    { id: 'cantilever', label: 'Cantilever Living Suite', sqft: '2,800 SQ FT' },
                    { id: 'terrace', label: 'Zero-Edge Basalt Terrace', sqft: '4,500 SQ FT' },
                    { id: 'vault', label: 'Subterranean Vault', sqft: '1,800 SQ FT' }
                  ].map(zone => (
                    <button
                      key={zone.id}
                      onClick={() => setActiveZone(zone.id)}
                      className={`w-full px-3 py-2 rounded-xl text-left transition-all flex items-center justify-between cursor-pointer border ${
                        activeZone === zone.id
                          ? 'bg-[#134e4a] border-[#134e4a] text-white font-bold'
                          : 'bg-white border-[#b5d6d1] text-[#1a2317] hover:border-[#134e4a]'
                      }`}
                    >
                      <span className="font-semibold text-[11px]">{zone.label}</span>
                      <span className={`text-[9px] ${activeZone === zone.id ? 'text-[#a7f3d0]' : 'text-[#134e4a] font-bold'}`}>
                        {zone.sqft}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Structural Diagnostics Telemetry */}
              <div className="space-y-2 pt-1 border-t border-[#c2ded9]">
                <div className="text-[10px] uppercase font-technical text-[#1a2317] font-bold">
                  Engineering Sensors (IoT Twin)
                </div>

                <div className="space-y-2 text-xs font-technical">
                  <div className="bg-white p-2.5 rounded-xl border border-[#b5d6d1] shadow-xs">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#1a2317] font-medium flex items-center gap-1.5">
                        <Thermometer className="w-3.5 h-3.5 text-[#134e4a]" />
                        <span>Envelope Thermal</span>
                      </span>
                      <span className="text-[#134e4a] font-bold">R-62 Superinsulation</span>
                    </div>
                    <div className="w-full bg-[#dbeae7] h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-[#134e4a] h-full w-[94%]" />
                    </div>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-[#b5d6d1] shadow-xs">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#1a2317] font-medium flex items-center gap-1.5">
                        <Wind className="w-3.5 h-3.5 text-[#134e4a]" />
                        <span>HEPA Microfiltration</span>
                      </span>
                      <span className="text-[#134e4a] font-bold">99.98% Clean Air</span>
                    </div>
                    <div className="w-full bg-[#dbeae7] h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-[#134e4a] h-full w-[98%]" />
                    </div>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-[#b5d6d1] shadow-xs">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#1a2317] font-medium flex items-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5 text-[#134e4a]" />
                        <span>Acoustic Decibels</span>
                      </span>
                      <span className="text-[#134e4a] font-bold">18 dB (Silent)</span>
                    </div>
                    <div className="w-full bg-[#dbeae7] h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-[#134e4a] h-full w-[88%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Energy Grid Status */}
              <div className="p-3 rounded-xl bg-white border border-[#b5d6d1] flex items-center justify-between text-xs font-technical shadow-xs">
                <div>
                  <div className="text-[9px] uppercase text-[#4d6b67] font-bold">
                    {lightingPreset === 'night' ? 'Night Battery Draw' : 'Solar Microgrid'}
                  </div>
                  <div className="font-bold text-[#1a2317] text-[11px] mt-0.5">
                    {lightingPreset === 'night' ? '92% Reserve Available' : '108% Net Positive'}
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#d5e8e4] text-[#134e4a] text-[9px] font-bold border border-[#8ebcb4]">
                  Autonomous
                </span>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </div>
  );
};

export default VirtualTour3D;
