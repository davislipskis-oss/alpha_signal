import { type DisplayProduct } from '@/data/displays';

export function signalLabel(score: number): 'STRONG HOLD' | 'HOLD' | 'WATCH' | 'AVOID' {
  if (score >= 75) return 'STRONG HOLD';
  if (score >= 60) return 'HOLD';
  if (score >= 45) return 'WATCH';
  return 'AVOID';
}

export function signalTone(score: number): 'hold' | 'watch' | 'avoid' {
  if (score >= 60) return 'hold';
  if (score >= 45) return 'watch';
  return 'avoid';
}

export function convictionSummary(display: DisplayProduct): string {
  if (display.conviction >= 90) return 'High-confidence signal with unusually strong data alignment.';
  if (display.conviction >= 80) return 'Strong signal, but entry price still matters.';
  return 'Useful edge, but this is not a blind conviction play.';
}
