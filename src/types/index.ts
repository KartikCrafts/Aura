export interface Estate {
  id: string;
  name: string;
  subtitle: string;
  location: string;
  style: string;
  price: number;
  sqFt: number;
  lotAcres: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  heroImage: string;
  gallery: string[];
  videoUrl?: string;
  architecturalPhilosophy: string;
  highlights: string[];
  specs: {
    ceilingHeight: string;
    solarRating: string;
    acousticInsulation: string;
    foundation: string;
    facadeSystem: string;
    smartSystems: string;
  };
  primaryMaterials: string[];
  floorPlanDetails: {
    levels: number;
    roomsCount: number;
    outdoorAreaSqFt: number;
    poolDimensions: string;
  };
}

export interface MaterialSpec {
  id: string;
  name: string;
  category: 'Stone' | 'Timber' | 'Metal' | 'Glass' | 'Mineral' | 'Concrete';
  origin: string;
  textureImage: string;
  colorHex: string;
  carbonFootprint: string; // e.g. "Low (14 kg CO2/m2)"
  durabilityYears: number;
  acousticRatingSTC: number;
  thermalMass: 'High' | 'Very High' | 'Moderate';
  costPerSqFt: number;
  applications: string[];
  description: string;
}

export interface GeneratedRoom {
  id: string;
  name: string;
  level: number;
  sqFt: number;
  x: number;
  y: number;
  w: number;
  h: number;
  category: 'living' | 'bedroom' | 'service' | 'outdoor' | 'wellness';
  color: string;
  sunExposure: string;
  materials: string;
  acousticRating: string;
}

export interface GeneratedFloorPlan {
  planName: string;
  conceptStatement: string;
  totalSqFt: number;
  stories: number;
  dimensions: { width: number; length: number };
  rooms: GeneratedRoom[];
  circulationFlow: string;
  sustainabilityScore: number;
  passiveDesignStrategies: string[];
  estimatedConstructionDuration: string;
  recommendedMaterials: string[];
}

export interface MarketValuationResult {
  projectedValuation: number;
  valuationRange: { low: number; high: number };
  pricePerSqFt: number;
  confidenceScore: number;
  fiveYearForecast: Array<{ year: number; value: number; growth: string }>;
  comparables: Array<{
    address: string;
    soldPrice: number;
    sqFt: number;
    similarityScore: number;
    daysOnMarket: number;
  }>;
  marketLiquidity: string;
  projectedAnnualRentalGross: number;
  estimatedAnnualAppreciationRate: string;
  architecturalPremiumFactor: string;
  investmentExecutiveSummary: string;
}

export type PageView = 
  | 'portfolio' 
  | '3d-tours' 
  | 'materials' 
  | 'calculator' 
  | 'floor-plan' 
  | 'market-value' 
  | 'cinema';
