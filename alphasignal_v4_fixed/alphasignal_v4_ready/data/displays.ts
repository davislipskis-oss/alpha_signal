export type DisplayProduct = {
  slug: string;
  name: string;
  category: string;
  holdScore: number;
  serializedOdds: string;
  appreciation: string;
  buyBelow: number;
  waitAbove: number;
  velocityScore: number;
  conviction: number;
  notes: string[];
};

export const displays: DisplayProduct[] = [
  {
    slug: 'lotr-collector',
    name: 'LOTR Collector Booster Display',
    category: 'Collector Booster',
    holdScore: 72,
    serializedOdds: '1 / 128 displays',
    appreciation: '+14.2% yearly',
    buyBelow: 350,
    waitAbove: 420,
    velocityScore: 83,
    conviction: 92,
    notes: ['Cross-IP demand stays unusually resilient.', 'Europe-first pricing matters more than US comps here.']
  },
  {
    slug: 'tmnt-collector',
    name: 'TMNT Collector Booster Display',
    category: 'Collector Booster',
    holdScore: 81,
    serializedOdds: '1 / 96 displays',
    appreciation: '+18.7% yearly',
    buyBelow: 380,
    waitAbove: 460,
    velocityScore: 88,
    conviction: 89,
    notes: ['Character nostalgia is doing the heavy lifting.', 'High upside, but supply discipline matters.']
  },
  {
    slug: 'final-fantasy-collector',
    name: 'Final Fantasy Collector Booster Display',
    category: 'Collector Booster',
    holdScore: 76,
    serializedOdds: '1 / 110 displays',
    appreciation: '+16.3% yearly',
    buyBelow: 420,
    waitAbove: 520,
    velocityScore: 91,
    conviction: 87,
    notes: ['Cross-fandom attention remains elite.', 'Speculative heat is high, so entry price matters.']
  },
  {
    slug: 'tarkir-dragonstorm-collector',
    name: 'Tarkir Dragonstorm Collector Booster Display',
    category: 'Collector Booster',
    holdScore: 63,
    serializedOdds: 'Model limited',
    appreciation: '+10.6% yearly',
    buyBelow: 240,
    waitAbove: 310,
    velocityScore: 67,
    conviction: 74,
    notes: ['Dragon demand is reliable, not euphoric.', 'Good for disciplined entries, not blind chasing.']
  },
  {
    slug: 'fallout-collector',
    name: 'Fallout Collector Booster Display',
    category: 'Collector Booster',
    holdScore: 69,
    serializedOdds: 'Not serialized-focused',
    appreciation: '+12.4% yearly',
    buyBelow: 300,
    waitAbove: 360,
    velocityScore: 78,
    conviction: 80,
    notes: ['Universes Beyond resilience remains the thesis.', 'Watch for retailer relistings.']
  },
  {
    slug: 'modern-horizons-3-collector',
    name: 'Modern Horizons 3 Collector Booster Display',
    category: 'Collector Booster',
    holdScore: 66,
    serializedOdds: 'Premium variant-driven',
    appreciation: '+11.1% yearly',
    buyBelow: 330,
    waitAbove: 395,
    velocityScore: 81,
    conviction: 78,
    notes: ['Competitive staples support the floor.', 'Premium print complexity can cap upside.']
  }
];

export const bySlug = (slug: string) => displays.find((display) => display.slug === slug) ?? displays[0];
