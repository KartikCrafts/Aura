import React, { useState } from 'react';
import { MATERIALS_DATA } from '../data/materialsData';
import { MaterialSpec } from '../types';
import { ShieldCheck, Leaf, Volume2, Sparkles, Sliders, ArrowRight } from 'lucide-react';
import FolderFloat from './reactbits/FolderFloat';
import DriftWall, { DriftWallItem } from './reactbits/DriftWall';
import FoldText from './reactbits/FoldText';
import ScrollReveal from './reactbits/ScrollReveal';

const DRIFT_MATERIALS: DriftWallItem[] = [
  {
    image: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=700&q=80',
    title: 'Roman Travertine'
  },
  {
    image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=700&q=80',
    title: 'Shou Sugi Ban Timber'
  },
  {
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=700&q=80',
    title: 'Calacatta Oro Marble'
  },
  {
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80',
    title: 'Architectural Board-Form Concrete'
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80',
    title: 'Low-Iron Acoustic Glazing'
  },
  {
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=700&q=80',
    title: 'Basaltina Volcanic Stone'
  },
  {
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=700&q=80',
    title: 'Hand-Patinated Architectural Bronze'
  },
  {
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=700&q=80',
    title: 'Honed Swiss Quartzite'
  },
  {
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=80',
    title: 'Hinoki Cypress Joinery'
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80',
    title: 'Linen Acoustic Wall Panels'
  },
  {
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=700&q=80',
    title: 'Corten Weathering Steel'
  },
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=700&q=80',
    title: 'Brushed Titanium Zinc'
  },
  {
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80',
    title: 'Nero Marquina Black Marble'
  },
  {
    image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=700&q=80',
    title: 'Rammed Earth Monolith'
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80',
    title: 'Fluted Acoustic Cast Glass'
  }
];

export const MaterialCraftStudio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeMaterial, setActiveMaterial] = useState<MaterialSpec>(MATERIALS_DATA[0]);
  const [simulatorArea, setSimulatorArea] = useState<number>(1200);
  const [wallTurn, setWallTurn] = useState<number>(-20);
  const [wallTilt, setWallTilt] = useState<number>(16);
  const [wallSpeed, setWallSpeed] = useState<number>(42);
  const [wallColumns, setWallColumns] = useState<number>(5);

  const categories = ['All', 'Stone', 'Timber', 'Metal', 'Glass', 'Mineral'];

  const filteredMaterials = selectedCategory === 'All'
    ? MATERIALS_DATA
    : MATERIALS_DATA.filter(m => m.category === selectedCategory);

  // Arithmetic computations
  const totalMaterialCost = activeMaterial.costPerSqFt * simulatorArea;
  const installationFactor = 1.35; // 35% architectural artisanal labor
  const totalInstalledCost = Math.round(totalMaterialCost * installationFactor);
  const costPerYear50 = Math.round(totalInstalledCost / Math.min(activeMaterial.durabilityYears, 50));

  return (
    <div className="space-y-16">
      {/* Header & Concept */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-[#d9ccb6] pb-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-technical tracking-widest text-[#556345] uppercase mb-1 font-semibold">
            <span>Materiality & Engineering</span>
            <span>·</span>
            <span>Sustainable Permanence</span>
          </div>
          <h2 className="font-editorial text-4xl md:text-5xl font-light text-[#1a2317] tracking-tight">
            <FoldText text="The Anatomy of Rare Substance" splitBy="word" trigger="scroll" />
          </h2>
          <p className="mt-2 text-sm text-[#48553f] leading-relaxed">
            Every millimeter of an AURA estate is specified from geological permanence, acoustic equilibrium, and carbon sequestration. Explore authentic raw specimens quarried across four continents.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-1 bg-[#f4f6ef] p-1.5 rounded-xl border-2 border-[#d9ccb6] shadow-sm">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs transition-all ${selectedCategory === cat ? 'bg-[#556345] text-white font-semibold shadow-sm' : 'text-[#48553f] hover:text-[#1a2317] hover:bg-[#e4e9db]'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ReactBits Folder Float Feature Spotlight */}
      <ScrollReveal animation="scale-up" delay={0.05} className="rounded-3xl border-2 border-[#d9ccb6] bg-[#f4f6ef] p-6 sm:p-8 shadow-lg grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-7 space-y-3">
          <div className="flex items-center gap-2 text-xs font-technical uppercase tracking-widest text-[#556345] font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>ReactBits · Physics Material Library</span>
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl text-[#1a2317] font-bold">
            <FoldText text="Interactive Tactile Specimen Dossier" splitBy="word" trigger="scroll" />
          </h3>
          <p className="text-xs sm:text-sm text-[#48553f] leading-relaxed">
            Hover over the floating dossier below to trigger Matter.js gravity physics. Individual quarried specimens disperse dynamically, allowing tactile visual inspection.
          </p>
        </div>

        <div className="md:col-span-5 flex justify-center">
          <FolderFloat />
        </div>
      </ScrollReveal>

      {/* Main Material Selection & Arithmetic Laboratory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Material Grid Cards */}
        <ScrollReveal animation="slide-left" delay={0.08} className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-xs uppercase tracking-wider text-[#556345] font-bold">
              Quarried & Fabricated Specimens ({filteredMaterials.length})
            </h3>
            <span className="text-xs text-[#5e6c52] font-technical">Click to inspect technical dossier</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredMaterials.map(mat => {
              const isSelected = activeMaterial.id === mat.id;
              return (
                <div
                  key={mat.id}
                  onClick={() => setActiveMaterial(mat)}
                  className={`cursor-pointer rounded-2xl p-4 border-2 transition-all duration-200 text-left relative overflow-hidden group shadow-sm ${isSelected ? 'bg-white border-[#556345] shadow-md ring-2 ring-[#556345]/20' : 'bg-[#f4f6ef] border-[#d9ccb6] hover:border-[#556345]/50 hover:bg-white'}`}
                >
                  <div className="h-36 w-full rounded-xl overflow-hidden mb-3 border-2 border-[#d9ccb6] relative">
                    <img
                      src={mat.textureImage}
                      alt={mat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-[#1a2317]/80 backdrop-blur-md text-[10px] text-white font-technical border border-[#d9ccb6]/40">
                      ${mat.costPerSqFt} / SF
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-technical text-[#556345] font-semibold">{mat.category} · {mat.origin.split(',')[1] || mat.origin}</span>
                      <span className="text-[10px] text-[#5e6c52] font-technical font-medium">{mat.durabilityYears}+ Yrs</span>
                    </div>
                    <h4 className="font-editorial text-lg text-[#1a2317] font-bold group-hover:text-[#556345] transition-colors">
                      {mat.name}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Right Column: Specimen Dossier & Surface Arithmetic Simulator */}
        <ScrollReveal animation="slide-right" delay={0.1} className="lg:col-span-5 space-y-6">
          {/* Active Material Technical Specification Dossier */}
          <div className="rounded-3xl border-2 border-[#d9ccb6] bg-white p-6 shadow-md space-y-5">
            <div className="border-b-2 border-[#d9ccb6] pb-4">
              <span className="text-[10px] font-technical uppercase tracking-widest text-[#556345] font-semibold">
                Quarry Dossier · {activeMaterial.origin}
              </span>
              <h3 className="font-editorial text-2xl text-[#1a2317] font-bold mt-1">
                {activeMaterial.name}
              </h3>
              <p className="text-xs text-[#48553f] leading-relaxed mt-2 font-technical">
                {activeMaterial.description}
              </p>
            </div>

            {/* Performance Matrices */}
            <div className="grid grid-cols-2 gap-3 font-technical text-xs">
              <div className="bg-[#f4f6ef] p-3 rounded-xl border-2 border-[#d9ccb6]">
                <div className="flex items-center gap-1.5 text-[#556345] mb-1 font-semibold">
                  <Leaf className="w-3.5 h-3.5" />
                  <span>Embodied Carbon</span>
                </div>
                <span className="text-[11px] text-[#1a2317] font-medium leading-tight block">
                  {activeMaterial.carbonFootprint}
                </span>
              </div>

              <div className="bg-[#f4f6ef] p-3 rounded-xl border-2 border-[#d9ccb6]">
                <div className="flex items-center gap-1.5 text-[#556345] mb-1 font-semibold">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Acoustic Rating</span>
                </div>
                <span className="text-[11px] text-[#1a2317] font-bold block">
                  STC {activeMaterial.acousticRatingSTC} Decibels
                </span>
              </div>

              <div className="bg-[#f4f6ef] p-3 rounded-xl border-2 border-[#d9ccb6]">
                <div className="flex items-center gap-1.5 text-[#556345] mb-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Geologic Lifespan</span>
                </div>
                <span className="text-[11px] text-[#1a2317] font-bold block">
                  {activeMaterial.durabilityYears} Years Minimum
                </span>
              </div>

              <div className="bg-[#f4f6ef] p-3 rounded-xl border-2 border-[#d9ccb6]">
                <div className="flex items-center gap-1.5 text-[#556345] mb-1 font-semibold">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Thermal Mass</span>
                </div>
                <span className="text-[11px] text-[#1a2317] font-bold block">
                  {activeMaterial.thermalMass} Retention
                </span>
              </div>
            </div>

            {/* Recommended Applications */}
            <div>
              <span className="text-[10px] uppercase font-technical text-[#5e6c52] block mb-2 font-semibold">
                Approved Architectural Envelopes
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeMaterial.applications.map((app, i) => (
                  <span
                    key={i}
                    className="text-xs bg-[#f4f6ef] text-[#3d4834] px-2.5 py-1 rounded-lg border-2 border-[#d9ccb6] font-technical font-medium"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Surface Arithmetic Cost Simulator Card */}
          <div className="rounded-3xl border-2 border-[#d9ccb6] bg-[#f4f6ef] p-6 shadow-md space-y-5">
            <div className="flex items-center justify-between">
              <h4 className="font-editorial text-xl text-[#1a2317] font-bold">
                Surface Arithmetic Pro-Forma
              </h4>
              <span className="text-[10px] font-technical uppercase text-[#556345] font-semibold">Real-Time Estimator</span>
            </div>

            {/* Slider */}
            <div>
              <div className="flex justify-between text-xs text-[#48553f] mb-1 font-technical">
                <span>Coverage Area</span>
                <span className="text-[#1a2317] font-bold">{simulatorArea.toLocaleString()} SQ FT</span>
              </div>
              <input
                type="range"
                min="200"
                max="8000"
                step="100"
                value={simulatorArea}
                onChange={e => setSimulatorArea(parseInt(e.target.value, 10))}
                className="w-full accent-[#556345] h-2 bg-[#d9ccb6] rounded-lg cursor-pointer"
              />
            </div>

            {/* Computation Breakout */}
            <div className="space-y-2 pt-2 border-t-2 border-[#d9ccb6]/60 font-technical text-xs">
              <div className="flex justify-between text-[#48553f]">
                <span>Raw Quaried Material</span>
                <span className="font-medium text-[#1a2317]">${totalMaterialCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#48553f]">
                <span>Artisanal Installation (35%)</span>
                <span className="font-medium text-[#1a2317]">${(totalInstalledCost - totalMaterialCost).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#1a2317] pt-2 border-t-2 border-[#d9ccb6] font-bold text-sm">
                <span>Total Installed Surface</span>
                <span className="text-[#556345]">${totalInstalledCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#5e6c52] text-[11px] pt-1 font-semibold">
                <span>50-Yr Amortized Annualized Cost</span>
                <span>${costPerYear50.toLocaleString()} / year</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ReactBits Drift Wall: In Materiality, directly above footer */}
      <ScrollReveal animation="fade-up" delay={0.05} className="pt-12 border-t-2 border-[#d9ccb6] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-technical uppercase tracking-widest text-[#556345] font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>ReactBits · Spatial Drift Wall (3D Perspective)</span>
            </div>
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#1a2317] font-light mt-1">
              <FoldText text="Endless Perspective Quarry & Materiality Drift" splitBy="word" trigger="scroll" />
            </h3>
            <p className="text-xs sm:text-sm text-[#48553f] max-w-xl mt-1">
              True 3D perspective wall: boxes angle Left, Center, and Right in continuous alternating drift. Hover to lift tiles and tilt the spatial plane.
            </p>
          </div>

          {/* Perspective View Angle Controls (Left / Center / Right) */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#f4f6ef] p-1.5 rounded-2xl border-2 border-[#d9ccb6] text-xs font-technical">
            <span className="text-[10px] uppercase font-bold text-[#556345] px-2">3D Angle:</span>
            <button
              onClick={() => { setWallTurn(-24); setWallTilt(16); }}
              className={`px-3 py-1 rounded-xl text-xs transition-all ${wallTurn === -24 ? 'bg-[#556345] text-white font-bold shadow-sm' : 'text-[#48553f] hover:bg-[#e4e9db]'}`}
            >
              Left Bias (-24°)
            </button>
            <button
              onClick={() => { setWallTurn(0); setWallTilt(18); }}
              className={`px-3 py-1 rounded-xl text-xs transition-all ${wallTurn === 0 ? 'bg-[#556345] text-white font-bold shadow-sm' : 'text-[#48553f] hover:bg-[#e4e9db]'}`}
            >
              Center Front (0°)
            </button>
            <button
              onClick={() => { setWallTurn(24); setWallTilt(16); }}
              className={`px-3 py-1 rounded-xl text-xs transition-all ${wallTurn === 24 ? 'bg-[#556345] text-white font-bold shadow-sm' : 'text-[#48553f] hover:bg-[#e4e9db]'}`}
            >
              Right Bias (+24°)
            </button>
          </div>
        </div>

        <div className="w-full h-[560px] rounded-3xl border-2 border-[#d9ccb6] bg-[#1a2317] overflow-hidden shadow-2xl relative">
          <DriftWall
            items={DRIFT_MATERIALS}
            columns={wallColumns}
            tileWidth={220}
            tileHeight={145}
            gap={18}
            radius={16}
            tilt={wallTilt}
            turn={wallTurn}
            roll={0}
            perspective={1100}
            depth={120}
            speed={wallSpeed}
            variance={0.55}
            parallax={0.8}
            pauseOnHover={false}
            lift={75}
            fade={0.65}
            dim={0.7}
            overlayColor="#0f170e"
          />
        </div>
      </ScrollReveal>
    </div>
  );
};
