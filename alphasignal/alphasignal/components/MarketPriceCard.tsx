'use client';

import { useState } from 'react';

export type ScrapeResult = {
  url: string;
  foundPrice: number | null;
  currency?: string;
  source?: string;
  method?: string;
  title?: string;
  error?: string;
};

export function MarketPriceCard({
  defaultUrl,
  onPriceUpdate
}: {
  defaultUrl?: string;
  onPriceUpdate?: (result: ScrapeResult) => void;
}) {
  const [url, setUrl] = useState(defaultUrl || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScrapeResult | null>(null);

  async function scrape() {
    if (!url) return;
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('/api/market', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const json = (await response.json()) as ScrapeResult;
      setResult(json);
      onPriceUpdate?.(json);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <div className="row between">
        <div>
          <h3 className="cardTitle">Live price scraper</h3>
          <p className="muted">Paste a product page URL. The scraper tries Product JSON-LD, Open Graph, and price text fallbacks.</p>
        </div>
      </div>
      <div className="row gap12 wrap">
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." className="growInput" />
        <button className="button" onClick={scrape} disabled={loading}>{loading ? 'Checking...' : 'Check live price'}</button>
      </div>
      {result ? (
        <div className="resultBox">
          <p><strong>Source:</strong> {result.source || 'Unknown'}</p>
          <p><strong>Method:</strong> {result.method || 'Unknown'}</p>
          <p><strong>Title:</strong> {result.title || 'N/A'}</p>
          <p><strong>Price:</strong> {result.foundPrice !== null ? `${result.foundPrice.toFixed(2)} ${result.currency || 'EUR'}` : 'Not found'}</p>
          {result.error ? <p className="errorText">{result.error}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
