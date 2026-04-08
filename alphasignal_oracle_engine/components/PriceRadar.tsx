'use client';

import { useMemo, useState } from 'react';
import { displays } from '@/data/displays';
import { marketClass, marketLabel } from '@/lib/signals';
import { SignalBadge } from './SignalBadge';

type RetailerCheck = {
  retailer: string;
  region: string;
  url: string;
  title: string | null;
  price: number | null;
  currency: string | null;
  method: string;
  error?: string;
};

type OverviewResponse = {
  productId: string;
  checks: RetailerCheck[];
  averageLivePrice: number | null;
  fairValue: number;
  buyBelow: number;
  waitAbove: number;
  anomalySummary: string;
};

export function PriceRadar() {
  const [selectedId, setSelectedId] = useState(displays[0].id);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<OverviewResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [manualUrl, setManualUrl] = useState('');
  const [manualResult, setManualResult] = useState<RetailerCheck | null>(null);

  const selected = useMemo(() => displays.find((item) => item.id === selectedId) || displays[0], [selectedId]);

  async function runOverview() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/market-overview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: selectedId })
      });
      const json = (await response.json()) as OverviewResponse & { error?: string };
      if (!response.ok) throw new Error(json.error || 'Market overview failed');
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown overview error');
    } finally {
      setLoading(false);
    }
  }

  async function runManualCheck() {
    if (!manualUrl) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/price-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: manualUrl })
      });
      const json = (await response.json()) as RetailerCheck & { error?: string };
      if (!response.ok) throw new Error(json.error || 'Price check failed');
      setManualResult(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown manual check error');
    } finally {
      setLoading(false);
    }
  }

  const averageLivePrice = data?.averageLivePrice;
  const averageLabel = averageLivePrice ? marketLabel(averageLivePrice, selected) : null;

  return (
    <div className="card cardPad" id="radar">
      <div className="actions" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="eyebrow">Price radar</div>
          <h3 style={{ margin: '14px 0 8px', fontSize: 28, letterSpacing: '-0.04em' }}>Europe-first retailer anomaly detection</h3>
          <p className="copyBlock" style={{ margin: 0 }}>
            This is where the product stops being a toy. The Oracle fetches retailer pages on the server, reads live prices, and tells you when listed market reality diverges from your decision thresholds.
          </p>
        </div>
      </div>

      <div className="hr" />

      <div className="grid2">
        <div>
          <label className="small muted">Product for automatic market overview</label>
          <select className="productSelect" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
            {displays.map((item) => (
              <option key={item.id} value={item.id}>{item.shortName}</option>
            ))}
          </select>
          <div className="actions" style={{ marginTop: 12 }}>
            <button className="btn" onClick={runOverview} disabled={loading}>{loading ? 'Reading the market...' : 'Run market overview'}</button>
          </div>
          {data ? (
            <>
              <div className="metricRow" style={{ marginTop: 16 }}>
                <div className="metric">
                  <span className="metricLabel">Oracle fair value</span>
                  <span className="metricValue">€{data.fairValue}</span>
                </div>
                <div className="metric">
                  <span className="metricLabel">Average live price</span>
                  <span className="metricValue">{averageLivePrice ? `€${averageLivePrice.toFixed(2)}` : 'N/A'}</span>
                </div>
                <div className="metric">
                  <span className="metricLabel">Market verdict</span>
                  <span className="metricValue" style={{ fontSize: 20 }}>{averageLabel || 'No valid prices'}</span>
                </div>
                <div className="metric">
                  <span className="metricLabel">Anomaly summary</span>
                  <span className="metricValue" style={{ fontSize: 18 }}>{data.anomalySummary}</span>
                </div>
              </div>
              <div className="list" style={{ marginTop: 16 }}>
                {data.checks.map((check) => (
                  <div className="itemRow" key={`${check.retailer}-${check.url}`}>
                    <div>
                      <strong>{check.retailer}</strong>
                      <div className="small muted">{check.region} · {check.title || check.url}</div>
                    </div>
                    <div className="small muted">Method: {check.method}</div>
                    <div><strong>{check.price !== null ? `${check.price.toFixed(2)} ${check.currency || 'EUR'}` : 'Not found'}</strong></div>
                    <div>
                      {check.price !== null ? (
                        <SignalBadge label={marketLabel(check.price, selected)} className={marketClass(marketLabel(check.price, selected))} />
                      ) : (
                        <span className="small muted">No price</span>
                      )}
                    </div>
                    <a className="btnGhost" href={check.url} target="_blank" rel="noreferrer">Open</a>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>

        <div>
          <label className="small muted">Manual retailer URL check</label>
          <input className="textInput" value={manualUrl} onChange={(e) => setManualUrl(e.target.value)} placeholder="Paste a product page URL" />
          <div className="actions" style={{ marginTop: 12 }}>
            <button className="btnGhost" onClick={runManualCheck} disabled={loading}>{loading ? 'Checking...' : 'Check live price'}</button>
          </div>
          {manualResult ? (
            <div className="notice" style={{ marginTop: 16 }}>
              <strong>{manualResult.title || manualResult.url}</strong><br />
              Source: {manualResult.retailer || manualResult.url}<br />
              Price: {manualResult.price !== null ? `${manualResult.price.toFixed(2)} ${manualResult.currency || 'EUR'}` : 'Not found'}<br />
              Method: {manualResult.method}
              {manualResult.error ? <><br />Error: {manualResult.error}</> : null}
            </div>
          ) : null}
        </div>
      </div>

      {error ? <div className="error" style={{ marginTop: 16 }}>{error}</div> : null}
    </div>
  );
}
