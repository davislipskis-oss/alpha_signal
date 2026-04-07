export const STORAGE_KEYS = {
  users: 'alphasignal.users.v1',
  session: 'alphasignal.session.v1',
  portfolio: 'alphasignal.portfolio.v1',
  alerts: 'alphasignal.alerts.v1',
  notificationsShown: 'alphasignal.notifications.v1'
} as const;

export type UserRecord = {
  email: string;
  password: string;
  createdAt: string;
};

export type PortfolioItem = {
  id: string;
  userEmail: string;
  displayId: string;
  quantity: number;
  averageBuyPrice: number;
  notes?: string;
  sourceUrl?: string;
  lastObservedPrice?: number | null;
  lastCheckedAt?: string | null;
};

export type AlertRule = {
  id: string;
  userEmail: string;
  displayId: string;
  targetType: 'below' | 'above';
  targetPrice: number;
  enabled: boolean;
};

export function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
