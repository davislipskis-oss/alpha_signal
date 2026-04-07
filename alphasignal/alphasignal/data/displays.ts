export type DisplayRecord = {
  id: string;
  name: string;
  shortName: string;
  category: 'collector' | 'set' | 'play';
  msrpGuessEur: number;
  holdScore: number;
  serializedOdds: string;
  appreciationCagr: number;
  buyBelow: number;
  waitAbove: number;
  signalConfidence: number;
  rationale: string[];
  sourceUrls: { label: string; url: string }[];
};

export const displays: DisplayRecord[] = [
  {
    id: 'lotr-collector',
    name: 'The Lord of the Rings: Tales of Middle-earth Collector Booster Display',
    shortName: 'LOTR Collector',
    category: 'collector',
    msrpGuessEur: 399,
    holdScore: 72,
    serializedOdds: '1 / 128 displays',
    appreciationCagr: 14.2,
    buyBelow: 350,
    waitAbove: 420,
    signalConfidence: 89,
    rationale: [
      'Cross-over IP with durable collector demand.',
      'Serialized chase history supports sealed premium.',
      'Secondary market depth is stronger than most standard-era boxes.'
    ],
    sourceUrls: [
      { label: 'VPD', url: 'https://www.vpd.fi/en/mtg-magic-lord-of-the-rings-tales-of-middle-earth-collector-booster-display.html' },
      { label: 'Cardmarket search', url: 'https://www.cardmarket.com/en/Magic/Products/Booster-Boxes/The-Lord-of-the-Rings-Tales-of-Middle-earth-Collector-Booster-Box' }
    ]
  },
  {
    id: 'tmnt-collector',
    name: 'Teenage Mutant Ninja Turtles Collector Booster Display',
    shortName: 'TMNT Collector',
    category: 'collector',
    msrpGuessEur: 449,
    holdScore: 81,
    serializedOdds: '1 / 96 displays',
    appreciationCagr: 18.7,
    buyBelow: 380,
    waitAbove: 460,
    signalConfidence: 84,
    rationale: [
      'Fresh cross-over with scarcity-driven premium variants.',
      'Collector boxes are the only format worth tracking for upside.',
      'Volatility is higher, but upside is larger if supply tightens.'
    ],
    sourceUrls: [
      { label: 'VPD', url: 'https://www.vpd.fi/en/mtg-magic-teenage-mutant-ninja-turtles-collector-booster-display.html' },
      { label: 'Cardmarket search', url: 'https://www.cardmarket.com/en/Magic/Products/Booster-Boxes/Magic-The-Gathering-Teenage-Mutant-Ninja-Turtles-Collector-Booster-Box' }
    ]
  },
  {
    id: 'final-fantasy-collector',
    name: 'Final Fantasy Collector Booster Display',
    shortName: 'Final Fantasy Collector',
    category: 'collector',
    msrpGuessEur: 499,
    holdScore: 76,
    serializedOdds: '1 / 110 displays',
    appreciationCagr: 16.3,
    buyBelow: 420,
    waitAbove: 520,
    signalConfidence: 82,
    rationale: [
      'Cross-over demand is broad beyond MTG-only buyers.',
      'Premium variant density supports sealed positioning.',
      'Entry price is high, so timing matters more than usual.'
    ],
    sourceUrls: [
      { label: 'Cardmarket search', url: 'https://www.cardmarket.com/en/Magic/Products/Booster-Boxes/Final-Fantasy-Collector-Booster-Box' }
    ]
  },
  {
    id: 'lotr-set',
    name: 'The Lord of the Rings: Tales of Middle-earth Set Booster Display',
    shortName: 'LOTR Set',
    category: 'set',
    msrpGuessEur: 249,
    holdScore: 64,
    serializedOdds: 'No serialized upside in this format',
    appreciationCagr: 9.4,
    buyBelow: 215,
    waitAbove: 275,
    signalConfidence: 74,
    rationale: [
      'Stronger than most set boxes because the IP is elite.',
      'Still a weaker vehicle than collector boxes for long-term sealed upside.',
      'Works as a lower-risk hold, not as a jackpot product.'
    ],
    sourceUrls: [
      { label: 'VPD', url: 'https://www.vpd.fi/en/mtg-magic-lord-of-the-rings-tales-of-middle-earth-set-booster-display.html' },
      { label: 'Cardmarket search', url: 'https://www.cardmarket.com/en/Magic/Products/Booster-Boxes/The-Lord-of-the-Rings-Tales-of-Middle-earth-Set-Booster-Box' }
    ]
  }
];

export const displayMap = Object.fromEntries(displays.map((item) => [item.id, item]));
