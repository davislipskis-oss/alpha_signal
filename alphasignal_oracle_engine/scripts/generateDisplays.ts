import fs from 'node:fs';

const products = [
  'Innistrad Remastered Collector Booster Display',
  'Doctor Who Collector Booster Display',
  'Warhammer 40,000 Collector Booster Display',
  'Outlaws of Thunder Junction Collector Booster Display',
  'Murders at Karlov Manor Collector Booster Display',
  'Double Masters 2022 Collector Booster Display'
];

const records = products.map((name, index) => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  shortName: name.replace(' Collector Booster Display', ''),
  name,
  category: 'Collector Booster Display',
  holdScore: 58 + (index * 4),
  signalConfidence: 74 + (index * 2),
  serializedOdds: 'Model pending',
  appreciationCagr: `+${10 + index}.0% yearly`,
  appreciationRange: `+${35 + index * 3}% to +${80 + index * 5}% over 5 years`,
  buyBelow: 220 + index * 25,
  fairValue: 260 + index * 28,
  waitAbove: 290 + index * 30,
  marketNarrative: 'Auto-generated placeholder narrative. Replace with human judgement before launch.',
  rationale: ['Auto-generated rationale line one.', 'Auto-generated rationale line two.', 'Auto-generated rationale line three.'],
  historicalReference: 'Generated reference.',
  retailerSources: [],
  priceHistory: [200 + index * 20, 210 + index * 20, 225 + index * 20, 240 + index * 20, 250 + index * 20, 260 + index * 20]
}));

fs.writeFileSync('./generated-display-records.json', JSON.stringify(records, null, 2));
console.log('Generated display record JSON. Review before merging into data/displays.ts');
