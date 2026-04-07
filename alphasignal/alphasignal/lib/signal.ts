export function holdBadge(score: number) {
  if (score >= 75) return 'STRONG HOLD';
  if (score >= 60) return 'HOLD';
  if (score >= 45) return 'WATCH';
  return 'OPEN';
}

export function marketBadge(currentPrice: number | null, buyBelow: number, waitAbove: number) {
  if (currentPrice === null) return 'NO LIVE PRICE';
  if (currentPrice <= buyBelow) return 'BUY SIGNAL';
  if (currentPrice >= waitAbove) return 'WAIT';
  return 'WATCH';
}

export function colorClassForBadge(label: string) {
  if (label.includes('BUY') || label.includes('HOLD')) return 'signal signalGood';
  if (label.includes('WATCH')) return 'signal signalWatch';
  return 'signal signalBad';
}
