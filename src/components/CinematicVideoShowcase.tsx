import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Film, Sparkles, Plus, Edit3, X, Check, ExternalLink } from 'lucide-react';
import FlyingPosters from './reactbits/FlyingPosters';
import FoldText from './reactbits/FoldText';
import ScrollReveal from './reactbits/ScrollReveal';

/**
 * =========================================================================================
 * HOW TO SET / CHANGE FILMS VIDEOS IN CODE (FILMS KI VIDEO KAISE SET KAREIN):
 * =========================================================================================
 * 1. File Path: /src/components/CinematicVideoShowcase.tsx
 * 2. Neeche `CINEMATIC_REELS` array diya gaya hai.
 * 3. Kisi bhi chapter object ke andar `videoUrl` ko apni video link se badal dein:
 *    - Local Public Video: "/videos/ArchitectureSociety_pindown.io_1790233776.mp4"
 *    - Direct MP4 / WebM: "https://your-server.com/my-video.mp4"
 *    - YouTube: "https://www.youtube.com/watch?v=VIDEO_ID" ya "https://youtu.be/VIDEO_ID"
 *    - Vimeo: "https://vimeo.com/VIDEO_ID"
 * 4. Saath hi `title`, `coverImage`, aur `estateName` ko bhi customize kar sakte hain.
 * 5. Aap UI ke andar "Set / Change Video URL" button se bhi directly paste kar sakte hain!
 * =========================================================================================
 */

export interface ReelChapter {
  id: string;
  title: string;
  timestamp: string;
  description: string;
  videoUrl: string;
  coverImage: string;
  estateName: string;
}

export const INITIAL_CINEMATIC_REELS: ReelChapter[] = [
  {
    id: 'cantilever-coastal',
    title: 'Pacific Cantilever & Horizon Drift',
    timestamp: '00:00 - 01:45',
    description: 'Aerial drone flight tracking the 32ft post-tensioned cantilever as sunset light reflects off the Pacific surf.',
    videoUrl: '/videos/ArchitectureSociety_pindown.io_1790233776.mp4',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    estateName: 'The Lumina Cantilever'
  },
  {
    id: 'engawa-light',
    title: 'Arashiyama Shadow & Engawa Threshold',
    timestamp: '01:45 - 03:10',
    description: 'Diurnal sunlight modulating across hand-rubbed Hinoki cypress slats and Kyoto moss garden ponds.',
    videoUrl: '/videos/ce9e802bc1ab7542b478e064333c5c18_720w.mp4',
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    estateName: 'Engawa Kanso Pavilion'
  },
  {
    id: 'alpine-obsidian',
    title: 'Aspen Highlands Snowfall & Basalt Core',
    timestamp: '03:10 - 04:30',
    description: 'High-altitude dusk falling over thermal glass curtain walls and floating black granite hearth.',
    videoUrl: '/videos/NenvoBeauty_pindown.io_1790233457.mp4',
    coverImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
    estateName: 'The Obsidian Sky Penthouse'
  },
  {
    id: 'mediterranean-lagoon',
    title: 'Costa Smeralda Curvilinear Flow',
    timestamp: '04:30 - 06:00',
    description: 'Sculptural lime plaster arches framing turquoise waters and natural cross-ventilated terraces.',
    videoUrl: '/videos/PerfectHomePlans_pindown.io_1790233611.mp4',
    coverImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    estateName: 'Villa Mare Sereno'
  }
];

export const resolveVideoSrc = (url: string): string => {
  if (!url) return '';
  if (url.includes('src/components/')) {
    const filename = url.split('/').pop() || '';
    return `/videos/${filename}`;
  }
  return url;
};

const POSTER_ITEMS = [
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    title: 'The Lumina Cantilever',
    subtitle: 'Big Sur, California'
  },
  {
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    title: 'Engawa Kanso Sanctuary',
    subtitle: 'Kyoto, Japan'
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
    title: 'The Obsidian Penthouse',
    subtitle: 'Aspen Highlands'
  },
  {
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    title: 'Villa Mare Sereno',
    subtitle: 'Costa Smeralda'
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    title: 'The Monolith Pavilion',
    subtitle: 'Zurich Goldcoast'
  }
];

const getEmbedUrl = (url: string): string | null => {
  if (!url) return null;
  // YouTube watch link
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=1&loop=1&playlist=${ytMatch[1]}`;
  }
  // Vimeo link
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=1&loop=1`;
  }
  return null;
};

export const CinematicVideoShowcase: React.FC = () => {
  const [reels, setReels] = useState<ReelChapter[]>(INITIAL_CINEMATIC_REELS);
  const [activeReel, setActiveReel] = useState<ReelChapter>(INITIAL_CINEMATIC_REELS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [inputUrl, setInputUrl] = useState<string>('');
  const [inputTitle, setInputTitle] = useState<string>('');
  const [inputEstate, setInputEstate] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const embedUrl = getEmbedUrl(activeReel.videoUrl);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSelectReel = (reel: ReelChapter) => {
    setActiveReel(reel);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  };

  const handleOpenEditModal = () => {
    setInputUrl(activeReel.videoUrl);
    setInputTitle(activeReel.title);
    setInputEstate(activeReel.estateName);
    setIsEditModalOpen(true);
  };

  const handleSaveCustomVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl) return;

    const updatedReel: ReelChapter = {
      ...activeReel,
      videoUrl: inputUrl,
      title: inputTitle || activeReel.title,
      estateName: inputEstate || activeReel.estateName
    };

    setReels(prev => prev.map(r => (r.id === activeReel.id ? updatedReel : r)));
    setActiveReel(updatedReel);
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-[#d9ccb6] pb-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-technical tracking-widest text-[#556345] uppercase mb-1 font-semibold">
            <span>Cinematography & Spatial Atmosphere</span>
            <span>·</span>
            <span>4K Architectural Motion</span>
          </div>
          <h2 className="font-editorial text-4xl md:text-5xl font-light text-[#1a2317] tracking-tight">
            <FoldText text="Cinematic Architectural Showcases" splitBy="word" trigger="scroll" />
          </h2>
          <p className="mt-2 text-sm text-[#48553f] leading-relaxed">
            Experience spatial choreography through calibrated motion, changing diurnal light, and sensory acoustics. Watch high-altitude drone passes and interior twilight transitions.
          </p>
        </div>

        {/* Change / Add Video Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenEditModal}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#edf0e5] text-[#556345] border-2 border-[#d9ccb6] text-xs font-technical uppercase font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Set / Change Video URL</span>
          </button>
        </div>
      </div>

      {/* Main Video Cinema Theater */}
      <ScrollReveal animation="fade-up" delay={0.05} className="relative w-full rounded-3xl overflow-hidden border-2 border-[#d9ccb6] bg-black shadow-2xl aspect-video max-h-[640px] group">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={activeReel.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            ref={videoRef}
            src={resolveVideoSrc(activeReel.videoUrl)}
            poster={activeReel.coverImage}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          />
        )}

        {/* Ambient Dark Overlay Vignette (Only for native video) */}
        {!embedUrl && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 pointer-events-none" />
        )}

        {/* Top Video Header */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-2 bg-[#f4f6ef]/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#d9ccb6] text-xs shadow-md">
            <Film className="w-4 h-4 text-[#556345]" />
            <span className="font-editorial text-sm text-[#1a2317] font-semibold">{activeReel.estateName}</span>
            <span className="text-[#5e6c52]">·</span>
            <span className="font-technical text-[#556345] font-semibold">{activeReel.timestamp}</span>
          </div>
        </div>

        {/* Bottom Playback HUD (Only for native video) */}
        {!embedUrl && (
          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pointer-events-none">
            <div className="max-w-lg pointer-events-auto bg-[#f4f6ef]/90 backdrop-blur-md p-4 rounded-2xl border-2 border-[#d9ccb6] shadow-lg">
              <span className="text-[10px] font-technical uppercase tracking-widest text-[#556345] font-semibold block">
                Featured Chapter
              </span>
              <h3 className="font-editorial text-xl md:text-2xl text-[#1a2317] font-bold mt-0.5">
                {activeReel.title}
              </h3>
              <p className="text-xs text-[#48553f] mt-1 leading-relaxed line-clamp-2">
                {activeReel.description}
              </p>
            </div>

            {/* Controls Bar */}
            <div className="pointer-events-auto flex items-center gap-2 bg-[#f4f6ef]/90 backdrop-blur-xl p-2 rounded-2xl border-2 border-[#d9ccb6] shadow-xl">
              <button
                onClick={togglePlay}
                className="p-3 rounded-xl bg-[#556345] text-white hover:bg-[#434f36] transition-all cursor-pointer shadow-sm border border-[#d9ccb6]"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={toggleMute}
                className="p-3 rounded-xl bg-white text-[#1a2317] hover:bg-[#e9ede2] transition-all cursor-pointer border border-[#d9ccb6]"
                title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#556345]" />}
              </button>
            </div>
          </div>
        )}
      </ScrollReveal>

      {/* Chapters Carousel */}
      <ScrollReveal animation="fade-up" delay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reels.map(reel => {
          const isSelected = activeReel.id === reel.id;
          return (
            <div
              key={reel.id}
              onClick={() => handleSelectReel(reel)}
              className={`cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-300 relative group shadow-sm ${isSelected ? 'border-[#556345] ring-2 ring-[#556345]/30 bg-white' : 'border-[#d9ccb6] bg-[#f4f6ef] hover:border-[#7a8867]'}`}
            >
              <div className="h-32 w-full relative overflow-hidden bg-black border-b-2 border-[#d9ccb6]">
                <img
                  src={reel.coverImage}
                  alt={reel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 backdrop-blur-md transition-transform ${isSelected ? 'bg-[#556345] text-white border-[#d9ccb6] scale-110 shadow-md' : 'bg-[#f4f6ef]/80 text-[#1a2317] border-[#d9ccb6] group-hover:scale-110'}`}>
                    <Play className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="p-3.5 space-y-1">
                <span className="text-[10px] font-technical text-[#556345] uppercase tracking-wider block font-semibold">
                  {reel.estateName}
                </span>
                <h4 className="font-editorial text-sm text-[#1a2317] font-bold line-clamp-1">
                  {reel.title}
                </h4>
              </div>
            </div>
          );
        })}
      </ScrollReveal>

      {/* ReactBits Flying Posters 3D Showcase */}
      <ScrollReveal animation="fade-up" delay={0.12} className="space-y-4 pt-6">
        <div className="flex items-center gap-2 text-xs font-technical uppercase tracking-widest text-[#556345] font-semibold">
          <Sparkles className="w-4 h-4 text-[#556345]" />
          <span>ReactBits · 3D Orbiting Flying Posters Gallery</span>
        </div>
        <FlyingPosters items={POSTER_ITEMS} speed={1.2} distortion={0.6} />
      </ScrollReveal>

      {/* Custom Video Editor Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-[#edf0e5] border-2 border-[#d9ccb6] rounded-3xl p-6 shadow-2xl relative">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white hover:bg-[#e4e9db] text-[#1a2317] border border-[#d9ccb6] transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2 mb-5">
              <span className="text-[10px] font-technical uppercase tracking-widest text-[#556345] font-bold">
                Cinematic Reel Configuration
              </span>
              <h3 className="font-editorial text-2xl text-[#1a2317] font-bold">
                Set Custom Film Video
              </h3>
              <p className="text-xs text-[#48553f]">
                Paste any direct MP4 URL, YouTube URL, or Vimeo URL below to update this film.
              </p>
            </div>

            <form onSubmit={handleSaveCustomVideo} className="space-y-4 text-xs font-technical">
              <div>
                <label className="block text-[#1a2317] font-semibold mb-1 uppercase text-[10px]">
                  Video URL (MP4, YouTube, or Vimeo):
                </label>
                <input
                  type="text"
                  value={inputUrl}
                  onChange={e => setInputUrl(e.target.value)}
                  placeholder="https://example.com/video.mp4 OR https://youtube.com/watch?v=..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#d9ccb6] text-[#1a2317] focus:outline-none focus:border-[#556345]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#1a2317] font-semibold mb-1 uppercase text-[10px]">
                  Film Chapter Title:
                </label>
                <input
                  type="text"
                  value={inputTitle}
                  onChange={e => setInputTitle(e.target.value)}
                  placeholder="e.g. Pacific Cantilever Flight"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#d9ccb6] text-[#1a2317] focus:outline-none focus:border-[#556345]"
                />
              </div>

              <div>
                <label className="block text-[#1a2317] font-semibold mb-1 uppercase text-[10px]">
                  Estate Name:
                </label>
                <input
                  type="text"
                  value={inputEstate}
                  onChange={e => setInputEstate(e.target.value)}
                  placeholder="e.g. The Lumina Cantilever"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#d9ccb6] text-[#1a2317] focus:outline-none focus:border-[#556345]"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#556345] hover:bg-[#434f36] text-white font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
                >
                  <Check className="w-4 h-4" />
                  <span>Apply Video URL</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="py-3 px-4 rounded-xl bg-white hover:bg-[#f4f6ef] text-[#1a2317] border border-[#d9ccb6] font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CinematicVideoShowcase;
