import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedEstate?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  preselectedEstate
}) => {
  const [inquiryType, setInquiryType] = useState<string>('Commission Custom Build');
  const [budgetTier, setBudgetTier] = useState<string>('$10M – $25M');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>(preselectedEstate ? `Inquiring specifically about ${preselectedEstate}.` : '');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-[#f4f6ef] border-2 border-[#d9ccb6] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white border-2 border-[#d9ccb6] text-[#48553f] hover:text-[#1a2317] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-white border-2 border-[#d9ccb6] text-[#556345] mx-auto flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-editorial text-3xl text-[#1a2317] font-bold">Inquiry Received Confidentially</h3>
            <p className="text-xs text-[#48553f] max-w-md mx-auto leading-relaxed">
              An AURA Senior Architectural Partner and Sovereign Asset Director will review your dossier and contact you via your preferred confidential channel within 12 hours.
            </p>
            <div className="p-3 bg-white rounded-xl border-2 border-[#d9ccb6] text-[11px] font-technical text-[#556345] font-semibold">
              Reference Dossier ID: AUR-2026-{Math.floor(100000 + Math.random() * 900000)}
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl bg-[#556345] text-white font-semibold text-xs tracking-wider uppercase cursor-pointer border-2 border-[#d9ccb6] hover:bg-[#434f36] transition-all"
            >
              Return to Portfolio
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <span className="text-[10px] font-technical uppercase tracking-widest text-[#556345] font-bold">
                Confidential Architectural Advisory
              </span>
              <h3 className="font-editorial text-3xl text-[#1a2317] font-light mt-1">
                Private Consultation
              </h3>
              <p className="text-xs text-[#48553f] mt-1">
                Direct engagement with licensed AIA/RIBA principal partners. Strictly non-disclosed.
              </p>
            </div>

            {/* Inquiry Typology */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#5e6c52] font-semibold block mb-2">
                Nature of Advisory
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  'Commission Custom Build',
                  'Acquire Existing Estate',
                  'Spatial 3D Digital Twin',
                  'Capital Asset Valuation'
                ].map(type => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setInquiryType(type)}
                    className={`py-2 px-3 rounded-xl border-2 text-left transition-all ${inquiryType === type ? 'border-[#556345] bg-[#556345] text-white font-semibold shadow-sm' : 'border-[#d9ccb6] bg-white text-[#48553f] hover:bg-[#e4e9db]'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Range */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#5e6c52] font-semibold block mb-2">
                Allocated Capital Scale
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {['$5M – $10M', '$10M – $25M', '$25M+ Bespoke'].map(tier => (
                  <button
                    type="button"
                    key={tier}
                    onClick={() => setBudgetTier(tier)}
                    className={`py-2 px-2 text-center rounded-xl border-2 transition-all ${budgetTier === tier ? 'border-[#556345] bg-[#556345] text-white font-semibold shadow-sm' : 'border-[#d9ccb6] bg-white text-[#48553f] hover:bg-[#e4e9db]'}`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <label className="text-xs uppercase tracking-wider text-[#5e6c52] font-semibold block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Principal or Family Office Representative"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-white border-2 border-[#d9ccb6] rounded-xl py-2.5 px-3.5 text-xs text-[#1a2317] placeholder-[#768564] focus:border-[#556345] outline-none font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#5e6c52] font-semibold block mb-1">
                    Confidential Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-white border-2 border-[#d9ccb6] rounded-xl py-2.5 px-3.5 text-xs text-[#1a2317] placeholder-[#768564] focus:border-[#556345] outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#5e6c52] font-semibold block mb-1">
                    Direct Phone / Signal
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-white border-2 border-[#d9ccb6] rounded-xl py-2.5 px-3.5 text-xs text-[#1a2317] placeholder-[#768564] focus:border-[#556345] outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#5e6c52] font-semibold block mb-1">
                  Project Notes or Target Enclave
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Describe your site parameters, timeline, or preferred architecture..."
                  className="w-full bg-white border-2 border-[#d9ccb6] rounded-xl py-2.5 px-3.5 text-xs text-[#1a2317] placeholder-[#768564] focus:border-[#556345] outline-none resize-none font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#556345] text-white font-semibold text-xs tracking-wider uppercase border-2 border-[#d9ccb6] shadow-md hover:bg-[#434f36] transition-all cursor-pointer"
            >
              Submit Confidential Advisory Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
