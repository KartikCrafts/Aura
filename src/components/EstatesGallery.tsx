import React, { useState } from 'react';
import { ESTATES_DATA } from '../data/estatesData';
import { Estate } from '../types';
import { Search, ArrowUpRight, MapPin, Layers, X, Sparkles, Compass } from 'lucide-react';
import CardSwap from './reactbits/CardSwap';
import AccordionGallery from './reactbits/AccordionGallery';
import FoldText from './reactbits/FoldText';
import ScrollReveal from './reactbits/ScrollReveal';

interface EstatesGalleryProps {
  onOpen3DTour?: (estateId: string) => void;
  onOpenBudget?: (estate: Estate) => void;
  onConsult?: (estateName: string) => void;
}

export const EstatesGallery: React.FC<EstatesGalleryProps> = ({
  onOpen3DTour,
  onOpenBudget,
  onConsult
}) => {
  const [selectedStyle, setSelectedStyle] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEstate, setSelectedEstate] = useState<Estate | null>(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState<number>(0);

  const styles = ['All', 'Modernist', 'Japanese', 'Brutalist', 'Mediterranean', 'Scandinavian', 'Biophilic'];

  const filteredEstates = ESTATES_DATA.filter(estate => {
    const matchesStyle = selectedStyle === 'All' || estate.style.toLowerCase().includes(selectedStyle.toLowerCase());
    const matchesSearch =
      estate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      estate.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      estate.style.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStyle && matchesSearch;
  });

  const handleOpenDetail = (estate: Estate) => {
    setSelectedEstate(estate);
    setActiveGalleryImage(0);
  };

  const accordionItems = ESTATES_DATA.slice(0, 5).map(estate => ({
    image: estate.heroImage,
    label: estate.name,
    sublabel: `${estate.location} · ${estate.sqFt.toLocaleString()} sq ft`,
    price: `$${(estate.price / 1000000).toFixed(1)}M USD`,
    tag: estate.style,
    data: estate
  }));

  return (
    <div className="space-y-16">
      {/* Interactive Spotlight: ReactBits CardSwap Feature Banner */}
      <ScrollReveal animation="fade-up" delay={0.05} className="rounded-3xl border-2 border-[#d9ccb6] bg-[#f4f6ef] p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 text-xs font-technical uppercase tracking-widest text-[#556345] font-semibold">
            <Sparkles className="w-4 h-4 text-[#556345]" />
            <span>ReactBits · Interactive Card Swap Spotlight</span>
          </div>
          <h3 className="font-editorial text-3xl sm:text-4xl font-light text-[#1a2317]">
            <FoldText text="Curated Sovereign Architectural Editions" splitBy="word" trigger="scroll" />
          </h3>
          <p className="text-sm text-[#4a5740] leading-relaxed">
            Watch masterworks automatically swap in 3D perspective or hover to pause. Click any card to inspect its full structural blueprint and spatial parameters.
          </p>
          <div className="pt-2 flex items-center gap-4 text-xs font-technical text-[#5e6c52]">
            <span>Automatic Transition: 3.5s</span>
            <span>·</span>
            <span>Hover to Pause</span>
            <span>·</span>
            <span>3D Perspective Skew</span>
          </div>
        </div>

        {/* CardSwap Component */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <CardSwap
            width={310}
            height={390}
            cardDistance={40}
            verticalDistance={16}
            delay={3200}
            skewAmount={3}
            pauseOnHover={true}
            onCardClick={(idx) => {
              const estate = ESTATES_DATA[idx % ESTATES_DATA.length];
              if (estate) handleOpenDetail(estate);
            }}
          >
            {ESTATES_DATA.map((estate) => (
              <div
                key={estate.id}
                className="w-full h-full rounded-2xl overflow-hidden bg-[#ffffff] flex flex-col justify-between"
              >
                <div className="relative h-48 w-full overflow-hidden border-b-2 border-[#d9ccb6]">
                  <img
                    src={estate.heroImage}
                    alt={estate.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#1e261b]/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#d9ccb6] text-[10px] uppercase tracking-wider text-[#ede8df] font-semibold">
                    {estate.style}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#556345] text-white px-2.5 py-1 rounded-lg text-xs font-technical font-semibold border border-[#d9ccb6]">
                    ${(estate.price / 1000000).toFixed(1)}M USD
                  </div>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-editorial text-lg font-bold text-[#1e261b]">
                      {estate.name}
                    </h4>
                    <div className="flex items-center gap-1 text-[11px] text-[#556345] mt-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{estate.location}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#d9ccb6]/60 flex items-center justify-between text-xs font-technical text-[#48553f]">
                    <span>{estate.sqFt.toLocaleString()} sq ft</span>
                    <span className="text-[#556345] font-semibold flex items-center gap-1">
                      View Specs <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardSwap>
        </div>
      </ScrollReveal>

      {/* ReactBits Accordion Gallery: Between Curated Sovereign Editions & Architectural Masterworks */}
      <ScrollReveal animation="scale-up" delay={0.06} className="space-y-6 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-[#d9ccb6] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-technical uppercase tracking-widest text-[#556345] font-semibold mb-1">
              <Compass className="w-3.5 h-3.5 text-[#556345]" />
              <span>ReactBits · Spatial Horizon Accordion Gallery</span>
            </div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-light text-[#1a2317]">
              <FoldText text="Horizontal Elevation & Panoramic Accordion" splitBy="word" trigger="scroll" />
            </h3>
            <p className="text-xs text-[#48553f] mt-1">
              Hover or tap across panels to expand architectural elevations with 3D tilt, perspective parallax, and full-resolution panoramic vistas. Click any panel to view details.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-technical text-[#556345] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#556345] animate-pulse"></span>
            <span>3D Interactive Parallax & Tilt</span>
          </div>
        </div>

        <AccordionGallery
          items={accordionItems}
          defaultIndex={1}
          height={480}
          gap={12}
          radius={20}
          expandRatio={0.54}
          accentColor="#556345"
          overlayColor="#111810"
          showLabels={true}
          grayscale={false}
          onItemSelect={(item) => {
            if (item.data) handleOpenDetail(item.data);
          }}
        />
      </ScrollReveal>

      {/* Section Header & Filters */}
      <ScrollReveal animation="fade-up" delay={0.06} className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-[#d9ccb6] pb-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-technical tracking-widest text-[#556345] uppercase mb-1 font-semibold">
            <span>The Permanent Collection</span>
            <span>·</span>
            <span>Bespoke Residential Assets</span>
          </div>
          <h2 className="font-editorial text-4xl md:text-5xl font-light text-[#1a2317] tracking-tight">
            <FoldText text="Architectural Masterworks" splitBy="word" trigger="scroll" />
          </h2>
          <p className="mt-2 text-sm text-[#48553f] leading-relaxed">
            A curated portfolio of radical structural cantilevers, biophilic sanctuaries, and passive monoliths designed for multi-generational wealth preservation.
          </p>
        </div>

        {/* Search & Style Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#647154]" />
            <input
              type="text"
              placeholder="Search by enclave, style, or asset..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-[#f4f6ef] border-2 border-[#d9ccb6] rounded-xl pl-10 pr-4 py-2 text-xs text-[#1e261b] placeholder-[#768564] focus:border-[#556345] outline-none w-full sm:w-64 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-1 bg-[#f4f6ef] p-1 rounded-xl border-2 border-[#d9ccb6] overflow-x-auto shadow-sm">
            {styles.map(st => (
              <button
                key={st}
                onClick={() => setSelectedStyle(st)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs transition-all ${selectedStyle === st ? 'bg-[#556345] text-white font-semibold shadow-sm' : 'text-[#48553f] hover:text-[#1e261b] hover:bg-[#e4e9db]'}`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Estates Cards Grid */}
      <ScrollReveal animation="fade-up" delay={0.08} stagger={0.06} selector=".estate-card" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEstates.map(estate => (
          <div
            key={estate.id}
            className="estate-card group rounded-3xl overflow-hidden border-2 border-[#d9ccb6] bg-[#f4f6ef] hover:border-[#556345] transition-all duration-500 flex flex-col justify-between shadow-md hover:shadow-xl"
          >
            {/* Image Banner */}
            <div className="relative h-72 w-full overflow-hidden cursor-pointer border-b-2 border-[#d9ccb6]" onClick={() => handleOpenDetail(estate)}>
              <img
                src={estate.heroImage}
                alt={estate.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="bg-[#1e261b]/80 backdrop-blur-md px-3 py-1 rounded-lg border border-[#d9ccb6] text-[10px] uppercase tracking-wider text-[#ede8df] font-semibold">
                  {estate.style}
                </span>
                <span className="bg-[#556345] text-white px-3 py-1 rounded-lg border border-[#d9ccb6] text-xs font-technical font-semibold shadow-sm">
                  ${(estate.price / 1000000).toFixed(1)}M USD
                </span>
              </div>

              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs text-white backdrop-blur-md bg-black/60 px-2.5 py-1 rounded-md border border-[#d9ccb6]">
                <MapPin className="w-3.5 h-3.5 text-[#d9ccb6]" />
                <span>{estate.location}</span>
              </div>
            </div>

            {/* Estate Body Content */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3
                  onClick={() => handleOpenDetail(estate)}
                  className="font-editorial text-2xl text-[#1a2317] font-bold group-hover:text-[#556345] transition-colors cursor-pointer"
                >
                  {estate.name}
                </h3>
                <p className="text-xs text-[#4a5740] mt-1 line-clamp-2 leading-relaxed">
                  {estate.architecturalPhilosophy}
                </p>
              </div>

              {/* Program Metrics Row */}
              <div className="grid grid-cols-4 gap-2 py-3 border-y-2 border-[#d9ccb6]/60 text-center font-technical text-xs">
                <div>
                  <span className="text-[10px] text-[#5e6c52] block font-medium">Area</span>
                  <span className="text-[#1a2317] font-semibold">{estate.sqFt.toLocaleString()} sf</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#5e6c52] block font-medium">Beds</span>
                  <span className="text-[#1a2317] font-semibold">{estate.bedrooms}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#5e6c52] block font-medium">Baths</span>
                  <span className="text-[#1a2317] font-semibold">{estate.bathrooms}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#5e6c52] block font-medium">Lot</span>
                  <span className="text-[#1a2317] font-semibold">{estate.lotAcres} ac</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => handleOpenDetail(estate)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-[#e9ede2] text-[#1e261b] text-xs font-semibold border-2 border-[#d9ccb6] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <span>Dossier & Blueprint</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#556345]" />
                </button>
                {onOpen3DTour && (
                  <button
                    onClick={() => onOpen3DTour(estate.id)}
                    className="py-2.5 px-3 rounded-xl bg-[#556345] hover:bg-[#434f36] text-white border-2 border-[#d9ccb6] text-xs font-medium flex items-center justify-center gap-1 transition-all cursor-pointer shadow-sm"
                    title="Launch 3D Spatial Walkthrough"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>3D Twin</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </ScrollReveal>

      {/* Full Architectural Dossier Modal / Drawer */}
      {selectedEstate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#f4f6ef] border-2 border-[#d9ccb6] rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button
              onClick={() => setSelectedEstate(null)}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/90 border-2 border-[#d9ccb6] text-[#1e261b] flex items-center justify-center hover:bg-white transition-all cursor-pointer shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Carousel Header */}
            <div className="relative h-96 w-full bg-black border-b-2 border-[#d9ccb6]">
              <img
                src={selectedEstate.gallery[activeGalleryImage] || selectedEstate.heroImage}
                alt={selectedEstate.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#f4f6ef] via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-2 overflow-x-auto pb-1">
                {[selectedEstate.heroImage, ...selectedEstate.gallery].map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveGalleryImage(idx)}
                    className={`h-14 w-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activeGalleryImage === idx ? 'border-[#556345] scale-105 shadow-md' : 'border-[#d9ccb6] opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-[#d9ccb6] pb-6">
                <div>
                  <span className="text-xs font-technical uppercase tracking-widest text-[#556345] font-semibold">
                    {selectedEstate.style} · Built {selectedEstate.yearBuilt}
                  </span>
                  <h3 className="font-editorial text-3xl md:text-4xl text-[#1a2317] font-medium mt-1">
                    {selectedEstate.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#556345] mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{selectedEstate.location}</span>
                  </div>
                </div>

                <div className="text-left md:text-right">
                  <span className="text-xs text-[#5e6c52] block font-medium">Offering Value</span>
                  <span className="font-technical text-3xl text-[#1a2317] font-semibold">
                    ${(selectedEstate.price / 1000000).toFixed(1)}M USD
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-editorial text-xl text-[#1a2317] font-medium mb-2">Architectural Philosophy</h4>
                <p className="text-sm text-[#4a5740] leading-relaxed">{selectedEstate.architecturalPhilosophy}</p>
              </div>

              <div>
                <h4 className="font-editorial text-xl text-[#1a2317] font-medium mb-3">Structural & Environmental Specifications</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.entries(selectedEstate.specs).map(([key, value]) => (
                    <div key={key} className="bg-white border-2 border-[#d9ccb6] rounded-xl p-3.5 space-y-1 shadow-sm">
                      <span className="text-[10px] uppercase font-technical text-[#5e6c52] block font-medium">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className="text-xs text-[#1a2317] font-semibold block">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-editorial text-xl text-[#1a2317] font-medium mb-3">Primary Geological & Surface Materials</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEstate.primaryMaterials.map((mat, idx) => (
                    <span key={idx} className="bg-white text-[#48553f] border-2 border-[#d9ccb6] px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t-2 border-[#d9ccb6]">
                <button
                  onClick={() => {
                    setSelectedEstate(null);
                    if (onConsult) onConsult(selectedEstate.name);
                  }}
                  className="w-full sm:flex-1 py-3.5 rounded-xl bg-[#556345] text-white font-semibold text-xs tracking-wider uppercase border-2 border-[#d9ccb6] shadow-md hover:bg-[#434f36] transition-all cursor-pointer text-center"
                >
                  Schedule Private Architectural Review
                </button>
                {onOpen3DTour && (
                  <button
                    onClick={() => {
                      const id = selectedEstate.id;
                      setSelectedEstate(null);
                      onOpen3DTour(id);
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-[#e9ede2] text-[#1e261b] font-semibold text-xs border-2 border-[#d9ccb6] transition-all cursor-pointer shadow-sm"
                  >
                    Open 3D Spatial Walkthrough
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
