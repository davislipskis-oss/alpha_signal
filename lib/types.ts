export type PortfolioItem = {
  id: string;
  product: string;
  quantity: number;
  averagePrice: number;
  notes?: string;
};

export type AlertItem = {
  id: string;
  product: string;
  triggerPrice: number;
  direction: 'below' | 'above';
  delivery: 'in-app' | 'browser';
  notes?: string;
  createdAt: string;
  lastTriggeredAt?: string;
};

export type AlertEvent = {
  id: string;
  alertId: string;
  product: string;
  direction: 'below' | 'above';
  triggerPrice: number;
  currentPrice: number;
  createdAt: string;
};
