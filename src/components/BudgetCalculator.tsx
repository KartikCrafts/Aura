import React, { useState, useMemo } from 'react';
import { Calculator, Download, CheckCircle2, ChevronRight, Building2, Sparkles } from 'lucide-react';
import FoldText from './reactbits/FoldText';
import ScrollReveal from './reactbits/ScrollReveal';

interface LocationFactor {
  name: string;
  factor: number;
  avgPermitMonths: number;
}

const LOCATIONS: LocationFactor[] = [
  { name: 'Aspen Highlands, CO', factor: 1.35, avgPermitMonths: 14 },
  { name: 'Beverly Hills / Bel Air, CA', factor: 1.32, avgPermitMonths: 16 },
  { name: 'Hamptons / Montauk, NY', factor: 1.28, avgPermitMonths: 12 },
  { name: 'Lake Como, Italy', factor: 1.22, avgPermitMonths: 18 },
  { name: 'Zurich Goldcoast, Switzerland', factor: 1.40, avgPermitMonths: 15 },
  { name: 'Kyoto Sanctuary, Japan', factor: 1.18, avgPermitMonths: 10 },
  { name: 'Miami Star Island, FL', factor: 1.25, avgPermitMonths: 9 },
  { name: 'Austin Hills, TX', factor: 1.05, avgPermitMonths: 8 }
];

interface AddonFeature {
  id: string;
  name: string;
  cost: number;
  category: string;
  description: string;
}

const LUXURY_ADDONS: AddonFeature[] = [
  {
    id: 'pool',
    name: '75ft Cantilevered Infinity Edge Pool',
    cost: 385000,
    category: 'Aquatics',
    description: 'Solar thermal heated basalt basin with acrylic horizon window'
  },
  {
    id: 'geothermal',
    name: 'Geothermal Deep-Well Microgrid & Battery Core',
    cost: 240000,
    category: 'Energy',
    description: '4-borehole closed loop system with 60kWh buffer'
  },
  {
    id: 'wine',
    name: 'Subterranean 2,000-Bottle Granite Wine Vault',
    cost: 165000,
    category: 'Luxury',
    description: 'Vibration-isolated precision 55°F climate zone'
  },
  {
    id: 'spa',
    name: 'Private Onsen Bathhouse, Cryo & Cedar Sauna',
    cost: 195000,
    category: 'Wellness',
    description: 'Hinoki cypress dry sauna, cold plunge, and mist room'
  },
  {
    id: 'turntable',
    name: 'Automated 3-Vehicle Turntable Display Gallery',
    cost: 145000,
    category: 'Automotive',
    description: 'Recessed hydraulic revolving turntable with display lighting'
  },
  {
    id: 'cinema',
    name: 'Acoustically Isolated Dolby Atmos Screening Room',
    cost: 180000,
    category: 'Entertainment',
    description: 'Floating box-in-box construction with motorized microfiber recliners'
  }
];

export const BudgetCalculator: React.FC = () => {
  const [sqFt, setSqFt] = useState<number>(5500);
  const [selectedLocation, setSelectedLocation] = useState<LocationFactor>(LOCATIONS[0]);
  const [qualityTier, setQualityTier] = useState<'Prestige' | 'Haute' | 'Museum'>('Haute');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['pool', 'geothermal']);
  
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(6.25);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [showExportNotice, setShowExportNotice] = useState<boolean>(false);

  const baseCostPerSqFt = useMemo(() => {
    switch (qualityTier) {
      case 'Prestige': return 850;
      case 'Haute': return 1250;
      case 'Museum': return 1750;
    }
  }, [qualityTier]);

  const calculatedBreakdown = useMemo(() => {
    const adjustedSqFtRate = baseCostPerSqFt * selectedLocation.factor;
    const baseConstruction = sqFt * adjustedSqFtRate;

    const substructure = Math.round(baseConstruction * 0.12);
    const structuralCore = Math.round(baseConstruction * 0.22);
    const facadeEnvelope = Math.round(baseConstruction * 0.20);
    const interiorFinishes = Math.round(baseConstruction * 0.24);
    const mepAutomation = Math.round(baseConstruction * 0.14);
    const hardscapingLandscape = Math.round(baseConstruction * 0.08);

    const addonsTotal = selectedAddons.reduce((acc, addonId) => {
      const addon = LUXURY_ADDONS.find(a => a.id === addonId);
      return acc + (addon ? addon.cost : 0);
    }, 0);

    const subtotalDirect = substructure + structuralCore + facadeEnvelope + interiorFinishes + mepAutomation + hardscapingLandscape + addonsTotal;
    const architecturalFees = Math.round(subtotalDirect * 0.14);
    const contingencyReserve = Math.round(subtotalDirect * 0.08);

    const totalProjectBudget = subtotalDirect + architecturalFees + contingencyReserve;
    const totalEffectiveSqFtCost = Math.round(totalProjectBudget / sqFt);

    return {
      substructure,
      structuralCore,
      facadeEnvelope,
      interiorFinishes,
      mepAutomation,
      hardscapingLandscape,
      addonsTotal,
      subtotalDirect,
      architecturalFees,
      contingencyReserve,
      totalProjectBudget,
      totalEffectiveSqFtCost
    };
  }, [sqFt, baseCostPerSqFt, selectedLocation, selectedAddons]);

  const financingMetrics = useMemo(() => {
    const total = calculatedBreakdown.totalProjectBudget;
    const downPayment = total * (downPaymentPercent / 100);
    const principal = total - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanTermYears * 12;

    let monthlyPayment = 0;
    if (principal > 0 && monthlyRate > 0) {
      monthlyPayment = Math.round(
        (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      );
    }
    const lifetimeRepayment = monthlyPayment * totalMonths;
    const totalInterestPaid = Math.max(0, lifetimeRepayment - principal);

    return {
      downPayment: Math.round(downPayment),
      principal: Math.round(principal),
      monthlyPayment,
      totalInterestPaid: Math.round(totalInterestPaid)
    };
  }, [calculatedBreakdown.totalProjectBudget, downPaymentPercent, interestRate, loanTermYears]);

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(item => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handlePrintSummary = () => {
    setShowExportNotice(true);
    setTimeout(() => {
      window.print();
      setShowExportNotice(false);
    }, 400);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-[#d9ccb6] pb-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-technical tracking-widest text-[#556345] uppercase mb-1 font-semibold">
            <span>Precision Engineering Arithmetic</span>
            <span>·</span>
            <span>AIA Capital Modeling</span>
          </div>
          <h2 className="font-editorial text-4xl md:text-5xl font-light text-[#1a2317] tracking-tight">
            <FoldText text="Comprehensive Construction Budget Engine" splitBy="word" trigger="scroll" />
          </h2>
          <p className="mt-2 text-sm text-[#48553f] leading-relaxed">
            Transparent algorithmic breakdown of luxury residential investment—incorporating structural engineering, artisanal envelopes, location index multipliers, and amortized capital financing.
          </p>
        </div>

        <button
          onClick={handlePrintSummary}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#556345] text-white font-semibold text-xs tracking-wider uppercase border-2 border-[#d9ccb6] shadow-md hover:bg-[#434f36] transition-all cursor-pointer self-start md:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Pro-Forma Summary</span>
        </button>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <ScrollReveal animation="slide-left" delay={0.05} className="lg:col-span-6 space-y-6">
          {/* Square Footage Slider */}
          <div className="bg-[#f4f6ef] border-2 border-[#d9ccb6] rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#5e6c52] font-semibold">Gross Living Area</span>
              <span className="font-technical text-xl text-[#1a2317] font-bold">{sqFt.toLocaleString()} SQ FT</span>
            </div>
            <input
              type="range"
              min="2500"
              max="15000"
              step="250"
              value={sqFt}
              onChange={e => setSqFt(parseInt(e.target.value, 10))}
              className="w-full accent-[#556345] h-2 bg-[#d9ccb6] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#768564] font-technical">
              <span>2,500 sq ft</span>
              <span>8,500 sq ft</span>
              <span>15,000 sq ft</span>
            </div>
          </div>

          {/* Location Multiplier Selector */}
          <div className="bg-[#f4f6ef] border-2 border-[#d9ccb6] rounded-3xl p-6 space-y-3 shadow-sm">
            <span className="text-xs uppercase tracking-wider text-[#5e6c52] font-semibold block">
              Enclave Geographic Factor & Zoning Index
            </span>
            <div className="grid grid-cols-2 gap-2">
              {LOCATIONS.map(loc => (
                <button
                  key={loc.name}
                  onClick={() => setSelectedLocation(loc)}
                  className={`p-3 rounded-xl text-left border-2 text-xs transition-all ${selectedLocation.name === loc.name ? 'border-[#556345] bg-white text-[#1a2317] font-semibold shadow-sm' : 'border-[#d9ccb6] bg-white/70 text-[#48553f] hover:bg-white'}`}
                >
                  <div className="font-medium truncate">{loc.name}</div>
                  <div className="text-[10px] text-[#6b7a5f] mt-1 flex items-center justify-between font-technical">
                    <span>Index: {loc.factor}x</span>
                    <span>~{loc.avgPermitMonths}m permit</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Craft Quality Tier Selector */}
          <div className="bg-[#f4f6ef] border-2 border-[#d9ccb6] rounded-3xl p-6 space-y-3 shadow-sm">
            <span className="text-xs uppercase tracking-wider text-[#5e6c52] font-semibold block">
              Architectural Specification Grade
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { tier: 'Prestige', label: '$850/sq ft', desc: 'Custom luxury timber & stone' },
                { tier: 'Haute', label: '$1,250/sq ft', desc: 'Cantilevers & marble' },
                { tier: 'Museum', label: '$1,750/sq ft', desc: 'Gallery envelope & acoustics' }
              ].map(item => (
                <button
                  key={item.tier}
                  onClick={() => setQualityTier(item.tier as any)}
                  className={`p-3 rounded-xl text-left border-2 transition-all ${qualityTier === item.tier ? 'border-[#556345] bg-white text-[#1a2317] font-semibold shadow-sm' : 'border-[#d9ccb6] bg-white/70 text-[#48553f] hover:bg-white'}`}
                >
                  <div className="text-xs font-bold text-[#1a2317]">{item.tier}</div>
                  <div className="text-[11px] font-technical text-[#556345] mt-0.5 font-semibold">{item.label}</div>
                  <div className="text-[9px] text-[#6b7a5f] mt-1 line-clamp-1">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Luxury Addons Checklist */}
          <div className="bg-[#f4f6ef] border-2 border-[#d9ccb6] rounded-3xl p-6 space-y-3 shadow-sm">
            <span className="text-xs uppercase tracking-wider text-[#5e6c52] font-semibold block">
              Specialist Architectural Installations
            </span>
            <div className="space-y-2">
              {LUXURY_ADDONS.map(addon => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${isChecked ? 'border-[#556345] bg-white shadow-sm' : 'border-[#d9ccb6] bg-white/70 hover:bg-white'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border-2 transition-all ${isChecked ? 'bg-[#556345] border-[#556345] text-white' : 'border-[#d9ccb6] bg-white'}`}>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#1a2317]">{addon.name}</div>
                        <div className="text-[10px] text-[#6b7a5f]">{addon.description}</div>
                      </div>
                    </div>
                    <span className="text-xs font-technical text-[#556345] font-bold whitespace-nowrap ml-2">
                      +${addon.cost.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Results & Arithmetic Breakdown Column */}
        <ScrollReveal animation="slide-right" delay={0.1} className="lg:col-span-6 space-y-6">
          {/* Main Total Investment Hero Card */}
          <div className="bg-white border-2 border-[#d9ccb6] rounded-3xl p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b-2 border-[#d9ccb6] pb-4 mb-6">
              <div>
                <span className="text-[10px] uppercase font-technical tracking-widest text-[#556345] font-semibold">
                  Target Architectural Pro-Forma
                </span>
                <h3 className="font-editorial text-3xl md:text-4xl text-[#1a2317] font-light mt-1">
                  Estimated Capital Investment
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-[#6b7a5f] block font-medium">Unit Cost</span>
                <span className="font-technical text-base text-[#556345] font-bold">
                  ${calculatedBreakdown.totalEffectiveSqFtCost.toLocaleString()}/sq ft
                </span>
              </div>
            </div>

            {/* Huge Total Figure */}
            <div className="mb-8">
              <span className="font-technical text-4xl md:text-5xl font-bold text-[#1a2317] tracking-tight">
                ${calculatedBreakdown.totalProjectBudget.toLocaleString()}
              </span>
              <span className="text-xs text-[#5e6c52] block mt-1">
                Includes hard construction, specialized luxury packages, 14% architectural engineering fees, and 8% contingency.
              </span>
            </div>

            {/* Arithmetic Line Items */}
            <div className="space-y-3 font-technical text-xs border-t-2 border-[#d9ccb6] pt-6">
              <div className="flex justify-between items-center text-[#3d4835]">
                <span className="flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#8c9f7a]" />
                  Substructure, Earthwork & Foundation
                </span>
                <span className="font-semibold text-[#1a2317]">${calculatedBreakdown.substructure.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-[#3d4835]">
                <span className="flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#556345]" />
                  Structural Concrete & Post-Tensioned Steel Frame
                </span>
                <span className="font-semibold text-[#1a2317]">${calculatedBreakdown.structuralCore.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-[#3d4835]">
                <span className="flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#7a8c6a]" />
                  High-Performance Glazing & Facade
                </span>
                <span className="font-semibold text-[#1a2317]">${calculatedBreakdown.facadeEnvelope.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-[#3d4835]">
                <span className="flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#424e35]" />
                  Artisanal Interior Stonework & Millwork
                </span>
                <span className="font-semibold text-[#1a2317]">${calculatedBreakdown.interiorFinishes.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-[#3d4835]">
                <span className="flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#657654]" />
                  MEP, Circadian Lighting & Home Automation
                </span>
                <span className="font-semibold text-[#1a2317]">${calculatedBreakdown.mepAutomation.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-[#3d4835]">
                <span className="flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#96a984]" />
                  Terrace Hardscaping & Landscape Architecture
                </span>
                <span className="font-semibold text-[#1a2317]">${calculatedBreakdown.hardscapingLandscape.toLocaleString()}</span>
              </div>

              {calculatedBreakdown.addonsTotal > 0 && (
                <div className="flex justify-between items-center text-[#3d4835]">
                  <span className="flex items-center gap-2 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#b8952c]" />
                    Specialist Luxury Additions ({selectedAddons.length} selected)
                  </span>
                  <span className="font-semibold text-[#1a2317]">${calculatedBreakdown.addonsTotal.toLocaleString()}</span>
                </div>
              )}

              <div className="pt-3 border-t-2 border-[#d9ccb6] flex justify-between items-center text-[#556345] font-bold">
                <span>Architectural & Structural Engineering (14%)</span>
                <span>${calculatedBreakdown.architecturalFees.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-[#6b7a5f] font-medium">
                <span>Contingency Reserve Allocation (8%)</span>
                <span>${calculatedBreakdown.contingencyReserve.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Amortized Financing & Debt Service Engine */}
          <div className="bg-[#f4f6ef] border-2 border-[#d9ccb6] rounded-3xl p-6 space-y-5 shadow-sm">
            <div className="flex items-center justify-between border-b-2 border-[#d9ccb6] pb-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#1a2317] font-bold">
                <Building2 className="w-4 h-4 text-[#556345]" />
                <span>Capital Financing & Amortization</span>
              </div>
              <span className="text-[10px] font-technical text-[#6b7a5f]">Tier-1 Private Wealth Terms</span>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="flex justify-between text-xs text-[#48553f] mb-1 font-technical">
                  <span>Down Payment</span>
                  <span className="font-bold text-[#1a2317]">{downPaymentPercent}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={downPaymentPercent}
                  onChange={e => setDownPaymentPercent(parseInt(e.target.value, 10))}
                  className="w-full accent-[#556345] h-1.5 bg-[#d9ccb6] rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-[#48553f] mb-1 font-technical">
                  <span>Interest Rate</span>
                  <span className="font-bold text-[#1a2317]">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min="3.5"
                  max="9.0"
                  step="0.25"
                  value={interestRate}
                  onChange={e => setInterestRate(parseFloat(e.target.value))}
                  className="w-full accent-[#556345] h-1.5 bg-[#d9ccb6] rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-[#48553f] mb-1 font-technical">
                  <span>Loan Term</span>
                  <span className="font-bold text-[#1a2317]">{loanTermYears} Yrs</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="30"
                  step="5"
                  value={loanTermYears}
                  onChange={e => setLoanTermYears(parseInt(e.target.value, 10))}
                  className="w-full accent-[#556345] h-1.5 bg-[#d9ccb6] rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Output Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t-2 border-[#d9ccb6] font-technical text-xs">
              <div className="bg-white border-2 border-[#d9ccb6] rounded-xl p-3">
                <span className="text-[10px] uppercase text-[#6b7a5f] block">Initial Equity</span>
                <span className="font-bold text-[#1a2317]">${financingMetrics.downPayment.toLocaleString()}</span>
              </div>

              <div className="bg-white border-2 border-[#d9ccb6] rounded-xl p-3">
                <span className="text-[10px] uppercase text-[#6b7a5f] block">Debt Principal</span>
                <span className="font-bold text-[#1a2317]">${financingMetrics.principal.toLocaleString()}</span>
              </div>

              <div className="bg-white border-2 border-[#d9ccb6] rounded-xl p-3">
                <span className="text-[10px] uppercase text-[#6b7a5f] block">Monthly Service</span>
                <span className="font-bold text-[#556345]">${financingMetrics.monthlyPayment.toLocaleString()}/mo</span>
              </div>

              <div className="bg-white border-2 border-[#d9ccb6] rounded-xl p-3">
                <span className="text-[10px] uppercase text-[#6b7a5f] block">Lifetime Interest</span>
                <span className="font-bold text-[#1a2317]">${financingMetrics.totalInterestPaid.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
