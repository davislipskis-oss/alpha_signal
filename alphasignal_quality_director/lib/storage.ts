'use client';

import type { AlertItem, PortfolioItem } from '@/lib/types';

const PORTFOLIO_KEY = 'alphasignal_portfolio';
const ALERTS_KEY = 'alphasignal_alerts';
const USER_KEY = 'alphasignal_user';

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export const portfolioStore = { get: () => read<PortfolioItem[]>(PORTFOLIO_KEY, []), set: (items: PortfolioItem[]) => write(PORTFOLIO_KEY, items) };
export const alertsStore = { get: () => read<AlertItem[]>(ALERTS_KEY, []), set: (items: AlertItem[]) => write(ALERTS_KEY, items) };
export const userStore = { get: () => read<{ email: string } | null>(USER_KEY, null), set: (user: { email: string } | null) => write(USER_KEY, user) };
