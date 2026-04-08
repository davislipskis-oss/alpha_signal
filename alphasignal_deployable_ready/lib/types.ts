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
  notes?: string;
};
