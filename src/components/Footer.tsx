import React from 'react';
import { Compass, ArrowUpRight, ShieldCheck, Award } from 'lucide-react';
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (view: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-24 border-t-2 border-[#d9ccb6] bg-[#e4e8db] pt-16 pb-12 text-[#48553f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b-2 border-[#d9ccb6]">
          {/* Col 1 & 2: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#556345] border-2 border-[#d9ccb6] flex items-center justify-center text-white shadow-sm">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-editorial text-2xl tracking-[0.2em] font-bold text-[#1a2317]">
                AURA
              </span>
            </div>
            <p className="text-xs text-[#5e6c52] leading-relaxed max-w-sm">
              International architectural atelier and sovereign asset advisory. Sculpting residential sanctuaries where structural audacity, acoustic serenity, and geologic permanence converge.
            </p>
            <div className="flex items-center gap-4 text-xs font-technical text-[#768564] pt-2 font-medium">
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#556345]" />
                AIA National Honor
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#556345]" />
                RIBA Chartered
              </span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-technical uppercase tracking-widest text-[#556345] font-bold">
              Spatial Suites
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-[#1a2317] transition-colors cursor-pointer text-[#48553f]"
                >
                  Estates Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('3d-tours')}
                  className="hover:text-[#1a2317] transition-colors cursor-pointer text-[#48553f]"
                >
                  Interactive 3D Digital Twin
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('materials')}
                  className="hover:text-[#1a2317] transition-colors cursor-pointer text-[#48553f]"
                >
                  Materiality & Craft Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calculator')}
                  className="hover:text-[#1a2317] transition-colors cursor-pointer text-[#48553f]"
                >
                  Construction Budget Arithmetic
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('floor-plan')}
                  className="hover:text-[#1a2317] transition-colors cursor-pointer text-[#48553f]"
                >
                  AI Floor Plan Blueprint
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('market-value')}
                  className="hover:text-[#1a2317] transition-colors cursor-pointer text-[#48553f]"
                >
                  Market Value Appraisal Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cinema')}
                  className="hover:text-[#1a2317] transition-colors cursor-pointer text-[#48553f]"
                >
                  Cinematic Architectural Films
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Studios */}
          <div className="space-y-3">
            <h4 className="text-xs font-technical uppercase tracking-widest text-[#556345] font-bold">
              Atelier Enclaves
            </h4>
            <div className="space-y-2.5 text-xs text-[#48553f]">
              <div>
                <span className="text-[#1a2317] block font-bold">Aspen</span>
                <span className="text-[11px] text-[#6b7a5f]">Red Mountain Way, Highlands</span>
              </div>
              <div>
                <span className="text-[#1a2317] block font-bold">Zurich</span>
                <span className="text-[11px] text-[#6b7a5f]">Bahnhofstrasse 28, Goldcoast</span>
              </div>
              <div>
                <span className="text-[#1a2317] block font-bold">Kyoto</span>
                <span className="text-[11px] text-[#6b7a5f]">Arashiyama Sagatenryuji</span>
              </div>
              <div>
                <span className="text-[#1a2317] block font-bold">Sardinia</span>
                <span className="text-[11px] text-[#6b7a5f]">Porto Cervo Marina, Costa Smeralda</span>
              </div>
            </div>
          </div>

          {/* Col 5: Private Dispatch */}
          <div className="space-y-3">
            <h4 className="text-xs font-technical uppercase tracking-widest text-[#556345] font-bold">
              Private Monographs
            </h4>
            <p className="text-xs text-[#5e6c52] leading-relaxed">
              Quarterly private publication documenting unreleased structural commissions and rare material acquisitions.
            </p>
            <div className="flex items-center gap-1 bg-white border-2 border-[#d9ccb6] rounded-xl p-1 shadow-sm">
              <input
                type="email"
                placeholder="private@domain.com"
                className="w-full bg-transparent px-3 py-1.5 text-xs text-[#1a2317] placeholder-[#768564] outline-none font-medium"
              />
              <button className="p-2 rounded-lg bg-[#556345] text-white hover:bg-[#434f36] transition-colors cursor-pointer border border-[#d9ccb6]">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6b7a5f] font-technical">
          <div>
            © {new Date().getFullYear()} AURA Architectural Assets & Sovereign Design. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Non-Disclosure Protocol</span>
            <span>·</span>
            <span>AIA Ethics Compliance</span>
            <span>·</span>
            <span>Private Client Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
