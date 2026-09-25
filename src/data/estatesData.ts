import { Estate } from '../types';

export const ESTATES_DATA: Estate[] = [
  {
    id: 'lumina-cantilever',
    name: 'The Lumina Cantilever Residence',
    subtitle: 'Geometric suspension over Pacific horizons',
    location: 'Big Sur Coast, California',
    style: 'Modernist Cantilever Villa',
    price: 14850000,
    sqFt: 6400,
    lotAcres: 3.2,
    bedrooms: 5,
    bathrooms: 6.5,
    yearBuilt: 2025,
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-luxury-house-exterior-and-pool-41443-large.mp4',
    architecturalPhilosophy: 'Constructed on a 32-foot post-tensioned steel cantilever, Lumina floats above the coastal cliffside, dissolving the boundary between ocean fog and structural permanence. The plan is organized around a dual-axis atrium capturing changing diurnal light.',
    highlights: [
      '32-foot post-tensioned cantilever deck',
      'Solar thermal heated 75-foot infinity pool',
      'Acoustically isolated private cinema & wine tasting cellar',
      'Direct private funicular access to coastal beach cove'
    ],
    specs: {
      ceilingHeight: '14.5 ft floor-to-ceiling',
      solarRating: 'Net Zero Ready (24 kW Integrated PV Solar Tile)',
      acousticInsulation: 'STC 62 triple-glazed acoustic envelope',
      foundation: 'Deep caisson socket bedrock anchoring',
      facadeSystem: 'Swiss Schüco panoramic motorized sliding panels',
      smartSystems: 'Crestron Home Horizon lighting & geothermal climate'
    },
    primaryMaterials: [
      'Board-Formed Architectural Concrete',
      'Shou Sugi Ban Charred Cypress',
      'Monolithic Calacatta Oro Slabs',
      'Brushed Bronze Architectural Hardware'
    ],
    floorPlanDetails: {
      levels: 2,
      roomsCount: 14,
      outdoorAreaSqFt: 2800,
      poolDimensions: '75ft x 16ft Infinity Edge'
    }
  },
  {
    id: 'engawa-sanctuary',
    name: 'Engawa Kanso Pavilion',
    subtitle: 'Biophilic serenity anchored in Japanese minimalism',
    location: 'Kyoto Arashiyama Foothills, Japan',
    style: 'Modern Japanese Engawa Residence',
    price: 11200000,
    sqFt: 4800,
    lotAcres: 1.8,
    bedrooms: 4,
    bathrooms: 4.5,
    yearBuilt: 2026,
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-living-room-with-large-windows-41444-large.mp4',
    architecturalPhilosophy: 'Grounded in the spatial concept of Engawa—the sheltered transitional veranda that mediates interior meditation and moss garden landscape. Features natural cross-ventilation, cedar aroma, and concealed joinery executed without visible mechanical fasteners.',
    highlights: [
      'Wrapped 360-degree Hinoki cypress Engawa deck',
      'Indoor-outdoor natural Onsen hot spring bathhouse',
      'Wabi-sabi moss courtyard with century-old Bonsai pine',
      'Handmade Washi paper sliding screens with motorized acoustic glass backing'
    ],
    specs: {
      ceilingHeight: '11.8 ft exposed cedar rafters',
      solarRating: 'Passive House Certified (A+ Efficiency)',
      acousticInsulation: 'STC 58 sound-absorbing clay plaster walls',
      foundation: 'Seismic isolated damper footing foundation',
      facadeSystem: 'Hand-rubbed Hinoki wood and acoustic shoji double-glazing',
      smartSystems: 'Subtle environmental microclimate sensors & floor warming'
    },
    primaryMaterials: [
      'Kyoto Hinoki Cypress Timber',
      'Rammed Earth Acoustic Walls',
      'Honed Black Basalt Stone',
      'Natural Tadelakt Lime Plaster'
    ],
    floorPlanDetails: {
      levels: 1,
      roomsCount: 10,
      outdoorAreaSqFt: 3400,
      poolDimensions: 'Natural Spring Plunge & Reflexology Pond'
    }
  },
  {
    id: 'solarium-obsidian',
    name: 'The Obsidian Sky Penthouse',
    subtitle: 'Neo-brutalist mastery perched above the alpine tree line',
    location: 'Aspen Highlands, Colorado',
    style: 'Alpine Neo-Brutalist Residence',
    price: 21500000,
    sqFt: 7800,
    lotAcres: 4.5,
    bedrooms: 6,
    bathrooms: 7.5,
    yearBuilt: 2025,
    heroImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-luxury-villa-with-a-pool-and-sun-beds-41445-large.mp4',
    architecturalPhilosophy: 'A sculpture of cast basalt concrete and blackened titanium steel defying harsh alpine blizzards while framing jagged peak vistas through 20-foot thermal panoramic curtain walls. Designed with thermal mass core and radiant snow-melt terraces.',
    highlights: [
      'Ski-in/Ski-out direct mountain trail access',
      'Subterranean 2,000-bottle granite temperature-curated wine cellar',
      'Heated cantilevered hot tub jutting over alpine pine forests',
      'Oxygen-enriched primary suite for high-altitude recovery'
    ],
    specs: {
      ceilingHeight: '18 ft double-height great hall',
      solarRating: 'Geothermal Deep-Well Heat Recovery System',
      acousticInsulation: 'STC 65 sound-dampened structural concrete envelope',
      foundation: 'Rock-bolted high alpine reinforced piers',
      facadeSystem: 'Quad-pane heated anti-reflective glass curtain wall',
      smartSystems: 'Lutron Ketra circadian color lighting & automated snowmelt'
    },
    primaryMaterials: [
      'Carbon-Infused Blackened Concrete',
      'Antiqued Smoked White Oak',
      'Titanium Zinc Cladding',
      'Nero Marquina Bookmatched Marble'
    ],
    floorPlanDetails: {
      levels: 3,
      roomsCount: 18,
      outdoorAreaSqFt: 3100,
      poolDimensions: '25ft Cantilevered Heated Thermal Plunge'
    }
  },
  {
    id: 'villa-mare-sereno',
    name: 'Villa Mare Sereno',
    subtitle: 'Organic coastal curves bathed in Mediterranean azure',
    location: 'Costa Smeralda, Sardinia, Italy',
    style: 'Organic Mediterranean Coastal Estate',
    price: 18200000,
    sqFt: 7100,
    lotAcres: 2.7,
    bedrooms: 5,
    bathrooms: 6,
    yearBuilt: 2024,
    heroImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-beautiful-swimming-pool-in-a-luxury-house-41446-large.mp4',
    architecturalPhilosophy: 'Inspired by the wind-sculpted granite of the Gallura region, Mare Sereno uses continuous sinuous curves and chalk-white microcement to create a sanctuary where marine sea breezes naturally circulate without mechanical drafts.',
    highlights: [
      'Curvilinear cascading infinity pool merging with Mediterranean sea horizon',
      'Outdoor culinary rotisserie pavilion shaded by centenarian olive trees',
      'Private yacht mooring buoy and helicopter landing pad',
      'Integrated solar desalination water purification plant'
    ],
    specs: {
      ceilingHeight: '13 ft vaulted sculptural ceilings',
      solarRating: 'Solar PV + Desalination hybrid microgrid',
      acousticInsulation: 'STC 57 thick structural masonry with lime render',
      foundation: 'Monolithic coastal bedrock grade beam system',
      facadeSystem: 'Hand-applied marine lime plaster with marine bronze pivots',
      smartSystems: 'Savant Integrated audio & climate zoning'
    },
    primaryMaterials: [
      'Sardinian Roman Travertine',
      'Chalk White Microcement',
      'Weathered Teak Wood Decking',
      'Marine-Grade Architectural Bronze'
    ],
    floorPlanDetails: {
      levels: 2,
      roomsCount: 15,
      outdoorAreaSqFt: 4200,
      poolDimensions: '80ft Curved Saltwater Lagoon Pool'
    }
  },
  {
    id: 'nordic-monolith',
    name: 'The Monolith Pavilion',
    subtitle: 'Quiet monumentalism nestled in Norwegian fjords',
    location: 'Bergen Coastal Archipelago, Norway',
    style: 'Scandinavian Passive House Monolith',
    price: 9400000,
    sqFt: 4200,
    lotAcres: 5.0,
    bedrooms: 4,
    bathrooms: 4,
    yearBuilt: 2026,
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-luxury-house-exterior-and-pool-41443-large.mp4',
    architecturalPhilosophy: 'Sculpted from sustainably harvested Nordic Kebony timber and granite quarried directly on site. The structure is an airtight thermal cocoon requiring less than 15 kWh/(m²a) for heating, facing the aurora borealis.',
    highlights: [
      'Rooftop stargazing and Aurora Borealis heated observation lounge',
      'Nordic smoke sauna with glass wall opening directly to the fjord',
      'Airtight passive envelope with triple mechanical heat recovery',
      'Custom Norwegian cast-iron floating fireplace sculpture'
    ],
    specs: {
      ceilingHeight: '12 ft angled pitch ceiling',
      solarRating: 'Net Positive Energy (Generates 130% of consumption)',
      acousticInsulation: 'STC 64 multi-layer acoustic cellulose insulation',
      foundation: 'Fjord granite bedrock anchoring with heated sub-slab',
      facadeSystem: 'Modified Kebony wood rainscreen with zero maintenance',
      smartSystems: 'KNX automated architectural lighting and ventilation'
    },
    primaryMaterials: [
      'Norwegian Kebony Pine',
      'Local Flisa Granite Slabs',
      'Cast Iron Architectural Elements',
      'Triple-Pane Low-Emissivity Argon Glass'
    ],
    floorPlanDetails: {
      levels: 2,
      roomsCount: 9,
      outdoorAreaSqFt: 2100,
      poolDimensions: 'Fjord Thermal Cedar Soak Tub'
    }
  },
  {
    id: 'courtyard-biosphere',
    name: 'The Biophilic Atrium Villa',
    subtitle: 'An internalized jungle oasis shielded from urban noise',
    location: 'Bel Air, Los Angeles, California',
    style: 'Modern Biophilic Courtyard Residence',
    price: 16500000,
    sqFt: 6900,
    lotAcres: 1.2,
    bedrooms: 5,
    bathrooms: 6,
    yearBuilt: 2025,
    heroImage: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-living-room-with-large-windows-41444-large.mp4',
    architecturalPhilosophy: 'Centered around a 3-story glass biosphere atrium inhabited by rare tree ferns, orchids, and a natural rainfall misting system. The private living wings radiate outward, allowing every room a direct sensory connection to lush green foliage.',
    highlights: [
      'Internal 3-story biophilic rain forest atrium with living waterfall',
      'Zero-threshold sliding glass walls opening to olive grove gardens',
      'Automated subterranean vehicle turntable display gallery',
      'Sculptural helicoidal cantilevered oak staircase'
    ],
    specs: {
      ceilingHeight: '16 ft ceilings with 32 ft central atrium dome',
      solarRating: 'LEED Platinum Certified with microgrid storage',
      acousticInsulation: 'STC 60 acoustic fabric-wrapped interior walls',
      foundation: 'Cast-in-place post-tensioned mat foundation',
      facadeSystem: 'Fleetwood motorized ultra-slim glass pocket doors',
      smartSystems: 'Whole-home biophilic circadian lighting & air purification'
    },
    primaryMaterials: [
      'Roman Travertine Classico',
      'Smoked European Walnut',
      'Architectural Brass Reveals',
      'Acoustic Felt Millwork'
    ],
    floorPlanDetails: {
      levels: 2,
      roomsCount: 16,
      outdoorAreaSqFt: 3600,
      poolDimensions: '60ft Lap Pool with Underwater Audio'
    }
  }
];
