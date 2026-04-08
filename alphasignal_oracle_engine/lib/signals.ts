import { DisplayProduct } from '@/data/displays';

export function holdLabel(score: number) {
  if (score >= 76) return 'Strong Hold';
  if (score >= 61) return 'Hold';
  if (score >= 45) return 'Watch';
  return 'Open';
}

export function holdClass(score: number) {
  if (score >= 76) return 'badge badgeHold signalPulse';
  if (score >= 61) return 'badge badgeHold';
  if (score >= 45) return 'badge badgeWatch';
  return 'badge badgeOpen';
}

export function marketLabel(price: number, product: DisplayProduct) {
  if (price <= product.buyBelow) return 'Buy';
  if (price <= product.waitAbove) return 'Wait';
  return 'Avoid';
}

export function marketClass(label: string) {
  if (label === 'Buy') return 'badge badgeBuy';
  if (label === 'Wait') return 'badge badgeWait';
  return 'badge badgeAvoid';
}

export function average(numbers: number[]) {
  if (!numbers.length) return 0;
  return numbers.reduce((sum, current) => sum + current, 0) / numbers.length;
}

export function growthFromHistory(history: number[]) {
  if (history.length < 2) return 0;
  const first = history[0];
  const last = history[history.length - 1];
  if (!first) return 0;
  return ((last - first) / first) * 100;
}
