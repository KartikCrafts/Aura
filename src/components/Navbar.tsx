import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import { Compass, Volume2, VolumeX, Menu, X, Sparkles, Building, Layers, Calculator, TrendingUp, Film, Hammer } from 'lucide-react';

interface NavbarProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenConsultation
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ambientAudioActive, setAmbientAudioActive] = useState(false);
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const gainNodeRef = React.useRef<GainNode | null>(null);
  const oscNodesRef = React.useRef<OscillatorNode[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAmbientAudio = () => {
    if (ambientAudioActive) {
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.5);
      }
      oscNodesRef.current.forEach(osc => {
        try { osc.stop(audioContextRef.current!.currentTime + 0.6); } catch (e) {}
      });
      oscNodesRef.current = [];
      setAmbientAudioActive(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.5);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        const freqs = [108, 216, 432];
        const oscs: OscillatorNode[] = [];

        freqs.forEach(f => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, ctx.currentTime);
          
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(800, ctx.currentTime);

          osc.connect(filter);
          filter.connect(masterGain);
          osc.start();
          oscs.push(osc);
        });

        oscNodesRef.current = oscs;
        setAmbientAudioActive(true);
      } catch (e) {
        console.warn('Web Audio initialization error:', e);
      }
    }
  };

  const navItems: { id: PageView; label: string; icon: React.ReactNode }[] = [
    { id: 'portfolio', label: 'Estates', icon: <Building className="w-3.5 h-3.5" /> },
    { id: '3d-tours', label: '3D Twin', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'materials', label: 'Materiality', icon: <Hammer className="w-3.5 h-3.5" /> },
    { id: 'calculator', label: 'Budget Math', icon: <Calculator className="w-3.5 h-3.5" /> },
    { id: 'floor-plan', label: 'AI Blueprint', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'market-value', label: 'Valuation', icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { id: 'cinema', label: 'Films', icon: <Film className="w-3.5 h-3.5" /> }
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'bg-[#e8ece0]/95 backdrop-blur-xl border-b-2 border-[#d9ccb6] shadow-md py-3.5' : 'bg-transparent py-5'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('portfolio')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#647154] p-[1px] shadow-sm border-2 border-[#d9ccb6]">
            <div className="w-full h-full bg-[#f4f6ee] rounded-[9px] flex items-center justify-center group-hover:bg-[#ffffff] transition-colors">
              <Compass className="w-5 h-5 text-[#556345] group-hover:rotate-45 transition-transform duration-500" />
            </div>
          </div>
          <div>
            <span className="font-editorial text-2xl tracking-[0.2em] font-bold text-[#1e261b] group-hover:text-[#556345] transition-colors block leading-none">
              AURA
            </span>
            <span className="text-[9px] font-technical uppercase tracking-widest text-[#5e6c52] block mt-0.5">
              Architectural Assets
            </span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#f4f6ef] backdrop-blur-md p-1.5 rounded-2xl border-2 border-[#d9ccb6] shadow-sm">
          {navItems.map(item => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${isActive ? 'bg-[#556345] text-white font-semibold shadow-sm' : 'text-[#48553f] hover:text-[#1e261b] hover:bg-[#e4e9db]'}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Tools: Ambient Audio & Consultation CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ambient Soundscape Toggle */}
          <button
            onClick={toggleAmbientAudio}
            className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer ${ambientAudioActive ? 'bg-[#556345] border-[#556345] text-white shadow-sm' : 'bg-[#f4f6ef] border-[#d9ccb6] text-[#556345] hover:bg-[#e4e9db]'}`}
            title={ambientAudioActive ? 'Mute 432Hz Architectural Frequency' : 'Activate 432Hz Ambient Harmonic Frequency'}
          >
            {ambientAudioActive ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Inquire Consultation Button */}
          <button
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#556345] text-white font-semibold text-xs tracking-wider uppercase border-2 border-[#d9ccb6] shadow-sm hover:bg-[#434f36] transition-all cursor-pointer"
          >
            Private Inquiry
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-[#f4f6ef] border-2 border-[#d9ccb6] text-[#1e261b] hover:bg-[#e4e9db] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 px-4 pb-4 animate-in slide-in-from-top-4 duration-200">
          <div className="bg-[#f4f6ef] border-2 border-[#d9ccb6] rounded-2xl p-4 space-y-1 shadow-xl">
            {navItems.map(item => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs transition-all text-left ${isActive ? 'bg-[#556345] text-white font-semibold' : 'text-[#48553f] hover:text-[#1e261b] hover:bg-[#e4e9db]'}`}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
            <div className="pt-3 border-t border-[#d9ccb6]">
              <button
                onClick={() => {
                  onOpenConsultation();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-[#556345] text-white font-semibold text-xs tracking-wider uppercase text-center border-2 border-[#d9ccb6]"
              >
                Schedule Private Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
