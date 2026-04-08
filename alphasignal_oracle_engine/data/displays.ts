export type RetailerSource = {
  name: string;
  url: string;
  region: string;
};

export type DisplayProduct = {
  id: string;
  shortName: string;
  name: string;
  category: 'Collector Booster Display' | 'Set Booster Display' | 'Masters Product';
  holdScore: number;
  signalConfidence: number;
  serializedOdds: string;
  appreciationCagr: string;
  appreciationRange: string;
  buyBelow: number;
  fairValue: number;
  waitAbove: number;
  marketNarrative: string;
  rationale: string[];
  historicalReference: string;
  retailerSources: RetailerSource[];
  priceHistory: number[];
};

export const displays: DisplayProduct[] = [
  {
    id: 'lotr-collector',
    shortName: 'LOTR Collector',
    name: 'The Lord of the Rings: Tales of Middle-earth Collector Booster Display',
    category: 'Collector Booster Display',
    holdScore: 78,
    signalConfidence: 91,
    serializedOdds: '1 / 128 displays',
    appreciationCagr: '+14.2% yearly',
    appreciationRange: '+48% to +115% over 5 years',
    buyBelow: 350,
    fairValue: 398,
    waitAbove: 430,
    marketNarrative: 'Cross-IP prestige plus iconic chase cards keeps sealed demand structurally stronger than average modern MTG.',
    rationale: ['Serialized halo effect still pulls sealed attention.', 'The One Ring ecosystem keeps long-tail interest high.', 'Collector supply feels absorbed better than standard-era products.'],
    historicalReference: 'Comparable to top-tier crossover collector products with sticky premium demand.',
    retailerSources: [
      { name: 'Poromagia', url: 'https://www.poromagia.com/en/catalogue/magic-the-gathering-the-lord-of-the-rings-tales-of-middle-earth-collector-booster-box/240637', region: 'FI' },
      { name: 'Fantasiapelit', url: 'https://www.fantasiapelit.com/index.php?main=ai&kat=single&mista=magic&etsittava=lord+of+the+rings+collector', region: 'FI' },
      { name: 'Cardmarket', url: 'https://www.cardmarket.com/en/Magic/Products/Booster-Boxes/The-Lord-of-the-Rings-Tales-of-Middle-earth-Collector-Booster-Box', region: 'EU' }
    ],
    priceHistory: [309, 332, 348, 366, 382, 398]
  },
  {
    id: 'tmnt-collector',
    shortName: 'TMNT Collector',
    name: 'Magic: The Gathering x Teenage Mutant Ninja Turtles Collector Booster Display',
    category: 'Collector Booster Display',
    holdScore: 82,
    signalConfidence: 87,
    serializedOdds: '1 / 96 displays',
    appreciationCagr: '+18.7% yearly',
    appreciationRange: '+62% to +138% over 5 years',
    buyBelow: 385,
    fairValue: 438,
    waitAbove: 470,
    marketNarrative: 'High nostalgia, crossover collector appetite, and premium variants create a stronger than normal sealed moat.',
    rationale: ['TMNT fandom extends beyond MTG players.', 'Collector booster format concentrates chase value.', 'Early sealed copies can tighten fast if crossover demand persists.'],
    historicalReference: 'Closer to premium crossover collectibles than to ordinary standard booster boxes.',
    retailerSources: [
      { name: 'VPD', url: 'https://www.vpd.fi/en/mtg-magic-teenage-mutant-ninja-turtles-collector-booster-display.html', region: 'FI' },
      { name: 'House of Games', url: 'https://www.houseofgames.fi/en/mtg-teenage-mutant-ninja-turtles-collector-booster-display-en', region: 'FI' },
      { name: 'Cardmarket', url: 'https://www.cardmarket.com/en/Magic/Products/Booster-Boxes/Magic-The-Gathering-Teenage-Mutant-Ninja-Turtles-Collector-Booster-Box', region: 'EU' }
    ],
    priceHistory: [329, 344, 362, 387, 418, 438]
  },
  {
    id: 'final-fantasy-collector',
    shortName: 'Final Fantasy Collector',
    name: 'Magic: The Gathering Final Fantasy Collector Booster Display',
    category: 'Collector Booster Display',
    holdScore: 80,
    signalConfidence: 89,
    serializedOdds: '1 / 110 displays',
    appreciationCagr: '+16.1% yearly',
    appreciationRange: '+55% to +124% over 5 years',
    buyBelow: 430,
    fairValue: 486,
    waitAbove: 520,
    marketNarrative: 'Massive crossover awareness plus collector-driven opening behavior supports sealed premium better than average.',
    rationale: ['Final Fantasy has non-MTG collector pull.', 'Collector boosters carry the premium chase concentration.', 'Strong launch demand tends to anchor sealed narratives.'],
    historicalReference: 'Fits the premium Universes Beyond profile rather than the average recent collector box.',
    retailerSources: [
      { name: 'Poromagia', url: 'https://www.poromagia.com/en/catalogue/magic-the-gathering-final-fantasy-collector-booster-box_271150/', region: 'FI' },
      { name: 'Fantasiapelit', url: 'https://www.fantasiapelit.com/index.php?main=ai&kat=single&mista=magic&etsittava=final+fantasy+collector', region: 'FI' },
      { name: 'Cardmarket', url: 'https://www.cardmarket.com/en/Magic/Products/Booster-Boxes/Magic-The-Gathering-Final-Fantasy-Collector-Booster-Box', region: 'EU' }
    ],
    priceHistory: [399, 418, 439, 448, 470, 486]
  },
  {
    id: 'tarkir-dragonstorm-collector',
    shortName: 'Tarkir Dragonstorm',
    name: 'Tarkir: Dragonstorm Collector Booster Display',
    category: 'Collector Booster Display',
    holdScore: 68,
    signalConfidence: 80,
    serializedOdds: '1 / 146 displays',
    appreciationCagr: '+11.4% yearly',
    appreciationRange: '+34% to +86% over 5 years',
    buyBelow: 265,
    fairValue: 308,
    waitAbove: 338,
    marketNarrative: 'Stronger than ordinary standard-adjacent product, but without the same cross-IP collector halo.',
    rationale: ['Dragons support broad casual appeal.', 'Serialized chase matters, but less than crossover prestige.', 'Sealed upside exists, but with a softer collector floor.'],
    historicalReference: 'More attractive than generic standard displays, less durable than premium crossover boxes.',
    retailerSources: [
      { name: 'VPD', url: 'https://www.vpd.fi/en/mtg-magic-tarkir-dragonstorm-collector-booster-display.html', region: 'FI' },
      { name: 'TCG-kauppa', url: 'https://www.tcgkauppa.fi/tuote/magic-the-gathering-tarkir-dragonstorm-collector-booster-display/', region: 'FI' },
      { name: 'Cardmarket', url: 'https://www.cardmarket.com/en/Magic/Products/Booster-Boxes/Tarkir-Dragonstorm-Collector-Booster-Box', region: 'EU' }
    ],
    priceHistory: [249, 256, 268, 281, 296, 308]
  },
  {
    id: 'modern-horizons-3-collector',
    shortName: 'Modern Horizons 3',
    name: 'Modern Horizons 3 Collector Booster Display',
    category: 'Collector Booster Display',
    holdScore: 74,
    signalConfidence: 88,
    serializedOdds: 'Chase premium, no public unified serialized estimate',
    appreciationCagr: '+13.7% yearly',
    appreciationRange: '+42% to +102% over 5 years',
    buyBelow: 360,
    fairValue: 408,
    waitAbove: 445,
    marketNarrative: 'Competitive relevance plus premium collector framing creates unusually durable demand.',
    rationale: ['Modern staples create stronger single-card gravity.', 'Collector supply is absorbed by both players and sealed buyers.', 'Less narrative risk than many crossover products.'],
    historicalReference: 'Competitive overlap improves resilience relative to flavor-only products.',
    retailerSources: [
      { name: 'Poromagia', url: 'https://www.poromagia.com/en/catalogue/magic-the-gathering-modern-horizons-3-collector-booster-box_264404/', region: 'FI' },
      { name: 'Fantasiapelit', url: 'https://www.fantasiapelit.com/index.php?main=ai&kat=single&mista=magic&etsittava=modern+horizons+3+collector', region: 'FI' },
      { name: 'Cardmarket', url: 'https://www.cardmarket.com/en/Magic/Products/Booster-Boxes/Modern-Horizons-3-Collector-Booster-Box', region: 'EU' }
    ],
    priceHistory: [332, 348, 361, 379, 392, 408]
  },
  {
    id: 'commander-masters-collector',
    shortName: 'Commander Masters',
    name: 'Commander Masters Collector Booster Display',
    category: 'Masters Product',
    holdScore: 70,
    signalConfidence: 78,
    serializedOdds: 'Premium chase concentration only',
    appreciationCagr: '+10.9% yearly',
    appreciationRange: '+30% to +78% over 5 years',
    buyBelow: 355,
    fairValue: 392,
    waitAbove: 425,
    marketNarrative: 'Commander demand supports the floor, but price memory can limit short-term expansion.',
    rationale: ['Commander audience is large and sticky.', 'Premium staples help sealed credibility.', 'Upside is decent, but not a cult-level collector story.'],
    historicalReference: 'Masters products tend to reward patience rather than immediate hype chasing.',
    retailerSources: [
      { name: 'Poromagia', url: 'https://www.poromagia.com/en/catalogue/magic-the-gathering-commander-masters-collector-booster-box_250534/', region: 'FI' },
      { name: 'Cardmarket', url: 'https://www.cardmarket.com/en/Magic/Products/Booster-Boxes/Commander-Masters-Collector-Booster-Box', region: 'EU' },
      { name: 'VPD', url: 'https://www.vpd.fi/en/mtg-magic-commander-masters-collector-booster-display.html', region: 'FI' }
    ],
    priceHistory: [338, 344, 355, 366, 380, 392]
  },
  {
    id: 'fallout-collector',
    shortName: 'Fallout Collector',
    name: 'Magic: The Gathering Fallout Collector Booster Display',
    category: 'Collector Booster Display',
    holdScore: 77,
    signalConfidence: 86,
    serializedOdds: 'Premium chase, no unified public serialized estimate',
    appreciationCagr: '+14.8% yearly',
    appreciationRange: '+49% to +112% over 5 years',
    buyBelow: 315,
    fairValue: 356,
    waitAbove: 388,
    marketNarrative: 'Cross-franchise collector interest plus Commander relevance gives sealed copies better long-term odds than average.',
    rationale: ['Fallout fans expand buyer pool.', 'Collector exclusives matter more in crossover products.', 'Lower than top-tier crossover prestige, still well above ordinary supply stories.'],
    historicalReference: 'A solid second-tier crossover sealed hold with better collector optionality than standard product.',
    retailerSources: [
      { name: 'Poromagia', url: 'https://www.poromagia.com/en/catalogue/magic-the-gathering-fallout-collector-booster-box_260637/', region: 'FI' },
      { name: 'Fantasiapelit', url: 'https://www.fantasiapelit.com/index.php?main=ai&kat=single&mista=magic&etsittava=fallout+collector', region: 'FI' },
      { name: 'Cardmarket', url: 'https://www.cardmarket.com/en/Magic/Products/Booster-Boxes/Magic-The-Gathering-Fallout-Collector-Booster-Box', region: 'EU' }
    ],
    priceHistory: [284, 296, 309, 327, 341, 356]
  }
];
