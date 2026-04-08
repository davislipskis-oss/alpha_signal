export type StoredUser = {
  email: string;
  password: string;
  createdAt: string;
};

export type PortfolioPosition = {
  id: string;
  displayId: string;
  quantity: number;
  averageCost: number;
  note?: string;
  createdAt: string;
};

export type AlertRule = {
  id: string;
  displayId: string;
  targetPrice: number;
  direction: 'below' | 'above';
  createdAt: string;
};

const USERS_KEY = 'alphasignal_users';
const SESSION_KEY = 'alphasignal_session';
const PORTFOLIO_PREFIX = 'alphasignal_portfolio_';
const ALERTS_PREFIX = 'alphasignal_alerts_';

function getWindow() {
  return typeof window !== 'undefined' ? window : null;
}

export function getUsers(): StoredUser[] {
  const w = getWindow();
  if (!w) return [];
  return JSON.parse(w.localStorage.getItem(USERS_KEY) || '[]');
}

export function registerUser(email: string, password: string) {
  const users = getUsers();
  if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('This email already exists in this browser.');
  }
  const user = { email, password, createdAt: new Date().toISOString() };
  const w = getWindow();
  if (!w) return user;
  users.push(user);
  w.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  w.localStorage.setItem(SESSION_KEY, JSON.stringify({ email }));
  return user;
}

export function loginUser(email: string, password: string) {
  const users = getUsers();
  const match = users.find((user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password);
  if (!match) throw new Error('Invalid email or password for this browser profile.');
  const w = getWindow();
  if (w) w.localStorage.setItem(SESSION_KEY, JSON.stringify({ email: match.email }));
  return match;
}

export function getSessionEmail() {
  const w = getWindow();
  if (!w) return null;
  const raw = w.localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw).email as string;
  } catch {
    return null;
  }
}

export function logoutUser() {
  const w = getWindow();
  if (!w) return;
  w.localStorage.removeItem(SESSION_KEY);
}

export function getPortfolio(email: string): PortfolioPosition[] {
  const w = getWindow();
  if (!w) return [];
  return JSON.parse(w.localStorage.getItem(`${PORTFOLIO_PREFIX}${email}`) || '[]');
}

export function savePortfolio(email: string, positions: PortfolioPosition[]) {
  const w = getWindow();
  if (!w) return;
  w.localStorage.setItem(`${PORTFOLIO_PREFIX}${email}`, JSON.stringify(positions));
}

export function getAlerts(email: string): AlertRule[] {
  const w = getWindow();
  if (!w) return [];
  return JSON.parse(w.localStorage.getItem(`${ALERTS_PREFIX}${email}`) || '[]');
}

export function saveAlerts(email: string, alerts: AlertRule[]) {
  const w = getWindow();
  if (!w) return;
  w.localStorage.setItem(`${ALERTS_PREFIX}${email}`, JSON.stringify(alerts));
}
