import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize GoogleGenAI SDK with environment key if available
const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI() : null;

// POST /api/generate-floorplan
app.post('/api/generate-floorplan', async (req, res) => {
  try {
    const {
      style = 'Contemporary Biophilic Villa',
      sqFt = 4500,
      bedrooms = 4,
      bathrooms = 4.5,
      stories = 2,
      lotWidth = 80,
      lotLength = 120,
      orientation = 'South-Facing Passive Solar',
      features = ['Double-Height Great Room', 'Zen Water Courtyard', 'Cantilevered Master Terrace', 'Chef Prep Scullery'],
      budgetTier = 'Ultra-Luxury Bespoke'
    } = req.body;

    if (ai) {
      const prompt = `You are a world-renowned luxury residential architect (AIA, RIBA).
Design an award-winning, tailored floor plan layout for a ${budgetTier} residence:
- Architectural Style: ${style}
- Total Target Area: ${sqFt} sq ft across ${stories} level(s)
- Program: ${bedrooms} Bedrooms, ${bathrooms} Bathrooms
- Lot Dimensions: ${lotWidth}ft x ${lotLength}ft, Solar Orientation: ${orientation}
- Signature Features: ${features.join(', ')}

Return a strict JSON object (and nothing else, no markdown codeblock wraps if possible, or clean JSON) matching this schema:
{
  "planName": "Poetic Architectural Project Name (e.g. The Glass Horizon Villa)",
  "conceptStatement": "2-3 sentences explaining the architectural philosophy and spatial choreography.",
  "totalSqFt": ${sqFt},
  "stories": ${stories},
  "dimensions": { "width": ${lotWidth}, "length": ${lotLength} },
  "rooms": [
    {
      "id": "room_1",
      "name": "Room Name (e.g., Grand Living Pavilion)",
      "level": 1,
      "sqFt": 650,
      "x": 10,
      "y": 10,
      "w": 40,
      "h": 35,
      "category": "living" | "bedroom" | "service" | "outdoor" | "wellness",
      "color": "#d4af37",
      "sunExposure": "Southern golden light with motorized louvers",
      "materials": "Rammed earth accent wall, honed limestone flooring",
      "acousticRating": "STC 55 - Sound isolated acoustic envelope"
    }
  ],
  "circulationFlow": "Description of the axis, sightlines, and transitional thresholds.",
  "sustainabilityScore": 96,
  "passiveDesignStrategies": ["list of 3 strategies"],
  "estimatedConstructionDuration": "14-18 Months",
  "recommendedMaterials": ["Calacatta marble", "Shou Sugi Ban charred cedar", "Triple-pane structural glass"]
}

Make sure the "rooms" cover both level 1 and level 2 (if stories >= 2), with realistic x, y, w, h percentages (between 5 and 90) representing spatial bounding boxes in a 100x100 architectural grid for top-down 2D blueprint rendering. Provide at least 8-12 comprehensive rooms/zones (foyer, living, dining, kitchen, primary suite, guest suites, terrace, wellness/spa, garage/service).`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
      });

      const responseText = response.text || '';
      try {
        const parsed = JSON.parse(responseText);
        return res.json({ success: true, plan: parsed });
      } catch (parseErr) {
        console.warn('Failed to parse Gemini JSON, falling back to algorithmic generator:', parseErr);
      }
    }

    // Algorithmic Fallback Generator (high precision architectural data)
    const fallbackPlan = generateAlgorithmicFloorPlan({
      style,
      sqFt,
      bedrooms,
      bathrooms,
      stories,
      lotWidth,
      lotLength,
      features,
      orientation
    });

    return res.json({ success: true, plan: fallbackPlan, mode: 'algorithmic' });
  } catch (error: any) {
    console.error('Floorplan generation error:', error);
    res.status(500).json({
      error: 'Failed to generate floor plan blueprint',
      details: error?.message || 'Server error'
    });
  }
});

// POST /api/market-valuation
app.post('/api/market-valuation', async (req, res) => {
  try {
    const {
      location = 'Aspen, Colorado',
      sqFt = 5200,
      lotAcreage = 1.4,
      bedrooms = 5,
      bathrooms = 6,
      style = 'Alpine Modernist Glass Villa',
      materialsGrade = 'Haute Luxury Artisanal',
      yearBuilt = 2026,
      amenities = ['Geothermal HVAC', 'Wine Cave', 'Infinity Edge Pool', 'Sub-Zero & Gaggenau Suite']
    } = req.body;

    if (ai) {
      const prompt = `You are a premier luxury real estate appraiser and market analyst specializing in Sotheby's and Christie's International Real Estate tier properties.
Perform an analytical market valuation assessment for this residence:
- Location: ${location}
- Gross Living Area: ${sqFt} sq ft, Lot Size: ${lotAcreage} acres
- Program: ${bedrooms} bed, ${bathrooms} bath
- Architecture: ${style}, Specification Grade: ${materialsGrade}
- Completion Year: ${yearBuilt}
- Amenities: ${amenities.join(', ')}

Provide a strict JSON response:
{
  "projectedValuation": 8950000,
  "valuationRange": { "low": 8400000, "high": 9600000 },
  "pricePerSqFt": 1721,
  "confidenceScore": 94,
  "fiveYearForecast": [
    { "year": 2026, "value": 8950000, "growth": "Baseline" },
    { "year": 2027, "value": 9480000, "growth": "+5.9%" },
    { "year": 2028, "value": 10120000, "growth": "+6.7%" },
    { "year": 2029, "value": 10790000, "growth": "+6.6%" },
    { "year": 2030, "value": 11550000, "growth": "+7.0%" }
  ],
  "comparables": [
    {
      "address": "1420 Red Mountain Way",
      "soldPrice": 9200000,
      "sqFt": 5400,
      "similarityScore": 96,
      "daysOnMarket": 42
    },
    {
      "address": "88 Pinecrest Ridge",
      "soldPrice": 8650000,
      "sqFt": 4900,
      "similarityScore": 91,
      "daysOnMarket": 28
    }
  ],
  "marketLiquidity": "High Demand / Ultra-Prime Luxury Segment",
  "projectedAnnualRentalGross": 420000,
  "estimatedAnnualAppreciationRate": "6.5%",
  "architecturalPremiumFactor": "+18.4% above standard luxury comps due to bespoke craft & low-carbon footprint",
  "investmentExecutiveSummary": "3-sentence appraisal narrative on neighborhood velocity, prime demographics, and wealth preservation value."
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
      });

      try {
        const parsed = JSON.parse(response.text || '{}');
        return res.json({ success: true, valuation: parsed });
      } catch (e) {
        console.warn('Valuation parse error, falling back to algorithmic valuation');
      }
    }

    // Algorithmic Valuation fallback
    const fallbackValuation = generateAlgorithmicValuation({
      location,
      sqFt,
      lotAcreage,
      bedrooms,
      bathrooms,
      style,
      materialsGrade,
      yearBuilt
    });

    return res.json({ success: true, valuation: fallbackValuation, mode: 'algorithmic' });
  } catch (error: any) {
    console.error('Market valuation error:', error);
    res.status(500).json({
      error: 'Failed to compute market valuation',
      details: error?.message || 'Server error'
    });
  }
});

function generateAlgorithmicFloorPlan(params: any) {
  const isTwoStory = params.stories >= 2;
  return {
    planName: `The ${params.style.split(' ')[0]} Sanctuary Horizon`,
    conceptStatement: `A masterwork of geometric purity and light modulation, framing organic perimeter courtyards with seamless threshold transitions.`,
    totalSqFt: params.sqFt,
    stories: params.stories,
    dimensions: { width: params.lotWidth, length: params.lotLength },
    rooms: [
      {
        id: 'r1',
        name: 'Great Room & Double-Height Atrium',
        level: 1,
        sqFt: Math.round(params.sqFt * 0.22),
        x: 10,
        y: 10,
        w: 48,
        h: 40,
        category: 'living',
        color: '#c5a059',
        sunExposure: 'Expansive southern glazing with automated deep louvers',
        materials: 'Honed travertine floor slabs, acoustic fluted oak ceiling',
        acousticRating: 'STC 58 - Gallery acoustic standard'
      },
      {
        id: 'r2',
        name: 'Gourmet Culinary Lab & Scullery',
        level: 1,
        sqFt: Math.round(params.sqFt * 0.12),
        x: 60,
        y: 10,
        w: 32,
        h: 30,
        category: 'service',
        color: '#8b9bb4',
        sunExposure: 'Eastern morning light for culinary ergonomics',
        materials: 'Seamless Taj Mahal quartzite monolithic island, brushed titanium accents',
        acousticRating: 'STC 50'
      },
      {
        id: 'r3',
        name: 'Zen Reflection Water Courtyard',
        level: 1,
        sqFt: Math.round(params.sqFt * 0.08),
        x: 60,
        y: 42,
        w: 32,
        h: 22,
        category: 'outdoor',
        color: '#4e9a8e',
        sunExposure: 'Direct zenith sunlight filtering through Japanese maple canopy',
        materials: 'Basalt stepping pavers, recirculating infinity spillway',
        acousticRating: 'Acoustic sanctuary with white-noise babbling cascade'
      },
      {
        id: 'r4',
        name: 'Formal Dining Pavilion',
        level: 1,
        sqFt: Math.round(params.sqFt * 0.10),
        x: 10,
        y: 52,
        w: 48,
        h: 22,
        category: 'living',
        color: '#d4af37',
        sunExposure: 'Western sunset ambient glow',
        materials: 'Smoked oak chevron parquet, architectural bronze reveals',
        acousticRating: 'STC 52'
      },
      {
        id: 'r5',
        name: 'Wellness Spa, Sauna & Plunge Pool',
        level: 1,
        sqFt: Math.round(params.sqFt * 0.09),
        x: 10,
        y: 76,
        w: 38,
        h: 18,
        category: 'wellness',
        color: '#55828b',
        sunExposure: 'Diffused skylight with cedar privacy battens',
        materials: 'Thermo-treated cedar, monolithic granite cold plunge',
        acousticRating: 'STC 60 - Complete sensory isolation'
      },
      {
        id: 'r6',
        name: 'Climate-Controlled 3-Car Gallery',
        level: 1,
        sqFt: Math.round(params.sqFt * 0.14),
        x: 50,
        y: 66,
        w: 42,
        h: 28,
        category: 'service',
        color: '#6c757d',
        sunExposure: 'North perimeter with recessed LED accent light channels',
        materials: 'Polished epoxy terrazzo, flush custom architectural garage doors',
        acousticRating: 'STC 55'
      },
      ...(isTwoStory ? [
        {
          id: 'r7',
          name: 'Cantilevered Primary Suite & Veranda',
          level: 2,
          sqFt: Math.round(params.sqFt * 0.18),
          x: 10,
          y: 12,
          w: 52,
          h: 44,
          category: 'bedroom',
          color: '#e0a96d',
          sunExposure: 'Panoramic 180° sunrise-to-sunset vistas',
          materials: 'Silk wall coverings, bookmatched Calacatta en-suite',
          acousticRating: 'STC 62 - Master sleep sanctuary'
        },
        {
          id: 'r8',
          name: 'Dual Wardrobe & Haute Couture Dressing Room',
          level: 2,
          sqFt: Math.round(params.sqFt * 0.08),
          x: 64,
          y: 12,
          w: 28,
          h: 30,
          category: 'service',
          color: '#c0a080',
          sunExposure: 'CRI 98 museum color-temperature diffused lighting',
          materials: 'Custom walnut joinery with leather-lined drawers',
          acousticRating: 'STC 50'
        },
        {
          id: 'r9',
          name: 'Secondary Guest Suites (x2)',
          level: 2,
          sqFt: Math.round(params.sqFt * 0.14),
          x: 10,
          y: 58,
          w: 42,
          h: 34,
          category: 'bedroom',
          color: '#e0a96d',
          sunExposure: 'Northwest evening ambient light',
          materials: 'European white oak, concealed trimless doors',
          acousticRating: 'STC 56'
        },
        {
          id: 'r10',
          name: 'Architectural Library & Sky Gallery',
          level: 2,
          sqFt: Math.round(params.sqFt * 0.09),
          x: 54,
          y: 58,
          w: 38,
          h: 34,
          category: 'living',
          color: '#9c8266',
          sunExposure: 'Overlooks two-story atrium void with zenith sun track',
          materials: 'Patinated bronze railings, custom steel library shelving',
          acousticRating: 'STC 54'
        }
      ] : [])
    ],
    circulationFlow: 'Linear promenade organizing public entertainment suites along the southern glazed axis, with tranquil private quarters buffered behind acoustic stone spine.',
    sustainabilityScore: 97,
    passiveDesignStrategies: [
      'Thermal mass limestone flooring capturing low winter sun angles',
      'Cross-ventilation induced via central courtyard stack effect',
      'Automated exterior micro-perforated sun shades'
    ],
    estimatedConstructionDuration: '14-16 Months',
    recommendedMaterials: [
      'Roman Travertine Classico',
      'Shou Sugi Ban Charred Cypress',
      'Ultra-Clear Low-Iron Triple Glazing',
      'Brushed Champagne Bronze Profiles'
    ]
  };
}

function generateAlgorithmicValuation(params: any) {
  const baseRates: Record<string, number> = {
    'Aspen': 2400,
    'Beverly Hills': 2100,
    'Lake Como': 1850,
    'Miami Beach': 1650,
    'Zurich': 2250,
    'Kyoto': 1400,
    'Manhattan': 2300,
    'London': 2200,
  };

  const matchedKey = Object.keys(baseRates).find(k => params.location.toLowerCase().includes(k.toLowerCase())) || 'Aspen';
  const sqFtRate = baseRates[matchedKey] || 1750;
  const gradeMultiplier = params.materialsGrade.includes('Haute') ? 1.25 : 1.12;
  const calculatedBase = Math.round(params.sqFt * sqFtRate * gradeMultiplier + (params.lotAcreage * 800000));

  return {
    projectedValuation: calculatedBase,
    valuationRange: {
      low: Math.round(calculatedBase * 0.94),
      high: Math.round(calculatedBase * 1.08)
    },
    pricePerSqFt: Math.round(calculatedBase / params.sqFt),
    confidenceScore: 95,
    fiveYearForecast: [
      { year: 2026, value: calculatedBase, growth: 'Current Baseline' },
      { year: 2027, value: Math.round(calculatedBase * 1.062), growth: '+6.2%' },
      { year: 2028, value: Math.round(calculatedBase * 1.134), growth: '+6.8%' },
      { year: 2029, value: Math.round(calculatedBase * 1.211), growth: '+6.8%' },
      { year: 2030, value: Math.round(calculatedBase * 1.298), growth: '+7.2%' }
    ],
    comparables: [
      {
        address: `1400 Vista Crest Ave, ${params.location}`,
        soldPrice: Math.round(calculatedBase * 1.03),
        sqFt: Math.round(params.sqFt * 1.04),
        similarityScore: 97,
        daysOnMarket: 34
      },
      {
        address: `72 Grand Veranda Blvd, ${params.location}`,
        soldPrice: Math.round(calculatedBase * 0.96),
        sqFt: Math.round(params.sqFt * 0.95),
        similarityScore: 93,
        daysOnMarket: 22
      },
      {
        address: `290 Skyline Terraces, ${params.location}`,
        soldPrice: Math.round(calculatedBase * 1.06),
        sqFt: Math.round(params.sqFt * 1.08),
        similarityScore: 91,
        daysOnMarket: 45
      }
    ],
    marketLiquidity: 'Prime Tier / High Global Net Worth Demand',
    projectedAnnualRentalGross: Math.round(calculatedBase * 0.052),
    estimatedAnnualAppreciationRate: '6.8%',
    architecturalPremiumFactor: '+22.5% premium attributed to bespoke architectural signature, museum-grade envelope, and thermal efficiency',
    investmentExecutiveSummary: `Located in the high-barrier enclave of ${params.location}, this asset demonstrates extraordinary capital retention. Bespoke architectural execution and passive wellness engineering command top-decile yields.`
  };
}

// Dev & Production serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AURA Luxury Architecture Server running on port ${PORT}`);
  });
}

startServer();
