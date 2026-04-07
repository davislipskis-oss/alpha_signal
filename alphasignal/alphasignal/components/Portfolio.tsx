'use client';

import { useEffect, useMemo, useState } from 'react';
import { displays, displayMap } from '@/data/displays';
import { marketBadge } from '@/lib/signal';
import { AlertRule, PortfolioItem, STORAGE_KEYS, readJson, uid, writeJson } from '@/lib/storage';
import { MarketPriceCard, ScrapeResult } from '@/components/MarketPriceCard';
import { SignalBadge } from '@/components/SignalBadge';

type Props = {
  sessionEmail: string;
};

export function Portfolio({ sessionEmail }: Props) {
  const [selectedId, setSelectedId] = useState(displays[0].id);
  const [buyPrice, setBuyPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [notes, setNotes] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [alerts, setAlerts] = useState<AlertRule[]>([]);
  const [alertDisplayId, setAlertDisplayId] = useState(displays[0].id);
  const [alertTargetType, setAlertTargetType] = useState<'below' | 'above'>('below');
  const [alertPrice, setAlertPrice] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const allPortfolio = readJson<PortfolioItem[]>(STORAGE_KEYS.portfolio, []);
    const allAlerts = readJson<AlertRule[]>(STORAGE_KEYS.alerts, []);
    setPortfolio(allPortfolio.filter((item) => item.userEmail === sessionEmail));
    setAlerts(allAlerts.filter((item) => item.userEmail === sessionEmail));
  }, [sessionEmail]);

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const portfolioValue = useMemo(() => {
    return portfolio.reduce((sum, item) => {
      const reference = item.lastObservedPrice ?? displayMap[item.displayId]?.buyBelow ?? 0;
      return sum + reference * item.quantity;
    }, 0);
  }, [portfolio]);

  function persistPortfolio(next: PortfolioItem[]) {
    const current = readJson<PortfolioItem[]>(STORAGE_KEYS.portfolio, []);
    const withoutMine = current.filter((item) => item.userEmail !== sessionEmail);
    const merged = [...withoutMine, ...next];
    writeJson(STORAGE_KEYS.portfolio, merged);
    setPortfolio(next);
  }

  function persistAlerts(next: AlertRule[]) {
    const current = readJson<AlertRule[]>(STORAGE_KEYS.alerts, []);
    const withoutMine = current.filter((item) => item.userEmail !== sessionEmail);
    const merged = [...withoutMine, ...next];
    writeJson(STORAGE_KEYS.alerts, merged);
    setAlerts(next);
  }

  function addHolding() {
    const price = Number(buyPrice);
    const qty = Number(quantity);
    if (!price || !qty) {
      setStatus('Average buy price and quantity are required.');
      return;
    }
    const item: PortfolioItem = {
      id: uid('holding'),
      userEmail: sessionEmail,
      displayId: selectedId,
      quantity: qty,
      averageBuyPrice: price,
      notes,
      sourceUrl: sourceUrl || undefined,
      lastObservedPrice: null,
      lastCheckedAt: null
    };
    persistPortfolio([item, ...portfolio]);
    setBuyPrice('');
    setQuantity('1');
    setNotes('');
    setSourceUrl('');
    setStatus('Holding added.');
  }

  function removeHolding(id: string) {
    persistPortfolio(portfolio.filter((item) => item.id !== id));
  }

  function addAlert() {
    const target = Number(alertPrice);
    if (!target) {
      setStatus('Alert target price is required.');
      return;
    }
    const next: AlertRule = {
      id: uid('alert'),
      userEmail: sessionEmail,
      displayId: alertDisplayId,
      targetPrice: target,
      targetType: alertTargetType,
      enabled: true
    };
    persistAlerts([next, ...alerts]);
    setAlertPrice('');
    setStatus('Alert created.');
  }

  function removeAlert(id: string) {
    persistAlerts(alerts.filter((item) => item.id !== id));
  }

  function notifyIfRuleMatches(item: PortfolioItem, price: number) {
    const relatedAlerts = alerts.filter((a) => a.enabled && a.displayId === item.displayId);
    const shown = readJson<string[]>(STORAGE_KEYS.notificationsShown, []);
    const nextShown = [...shown];

    for (const alert of relatedAlerts) {
      const hit = alert.targetType === 'below' ? price <= alert.targetPrice : price >= alert.targetPrice;
      const dedupe = `${alert.id}:${price}`;
      if (hit && !shown.includes(dedupe)) {
        nextShown.push(dedupe);
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('AlphaSignal alert', {
            body: `${displayMap[item.displayId].shortName} is ${price.toFixed(2)} EUR (${alert.targetType} ${alert.targetPrice} EUR).`
          });
        }
      }
    }
    writeJson(STORAGE_KEYS.notificationsShown, nextShown);
  }

  function updateHoldingPrice(holdingId: string, result: ScrapeResult) {
    if (result.foundPrice === null) return;
    const next = portfolio.map((item) => {
      if (item.id !== holdingId) return item;
      const updated = {
        ...item,
        sourceUrl: result.url,
        lastObservedPrice: result.foundPrice,
        lastCheckedAt: new Date().toISOString()
      };
      notifyIfRuleMatches(updated, result.foundPrice);
      return updated;
    });
    persistPortfolio(next);
  }

  return (
    <div className="sectionGrid">
      <div className="card">
        <h3 className="cardTitle">Portfolio tracker</h3>
        <p className="muted">Track sealed positions like a portfolio. This version stores data in the browser so it works immediately after deploy.</p>
        <div className="gridTwo gap12">
          <label>
            <span>Display</span>
            <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
              {displays.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </label>
          <label>
            <span>Average buy price (€)</span>
            <input value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} placeholder="399" />
          </label>
          <label>
            <span>Quantity</span>
            <input value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="1" />
          </label>
          <label>
            <span>Source URL (optional)</span>
            <input value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} placeholder="https://shop.example/product" />
          </label>
        </div>
        <label>
          <span>Notes</span>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Bought on release weekend." />
        </label>
        <div className="row gap12 top12">
          <button className="button" onClick={addHolding}>Add holding</button>
          <span className="muted">Estimated portfolio reference value: €{portfolioValue.toFixed(2)}</span>
        </div>
        {status ? <p className="muted top12">{status}</p> : null}
      </div>

      <div className="card">
        <h3 className="cardTitle">Price alerts</h3>
        <p className="muted">Create threshold alerts. They trigger in-app and browser notifications when you refresh and the live price crosses the line.</p>
        <div className="gridThree gap12 alignEnd">
          <label>
            <span>Display</span>
            <select value={alertDisplayId} onChange={(e) => setAlertDisplayId(e.target.value)}>
              {displays.map((d) => <option key={d.id} value={d.id}>{d.shortName}</option>)}
            </select>
          </label>
          <label>
            <span>Trigger</span>
            <select value={alertTargetType} onChange={(e) => setAlertTargetType(e.target.value as 'below' | 'above')}>
              <option value="below">Price falls below</option>
              <option value="above">Price rises above</option>
            </select>
          </label>
          <label>
            <span>Target price (€)</span>
            <input value={alertPrice} onChange={(e) => setAlertPrice(e.target.value)} placeholder="350" />
          </label>
        </div>
        <div className="top12"><button className="button" onClick={addAlert}>Create alert</button></div>
        <div className="stack top16">
          {alerts.length === 0 ? <p className="muted">No active alerts yet.</p> : alerts.map((alert) => (
            <div className="resultBox" key={alert.id}>
              <div className="row between wrap">
                <span>{displayMap[alert.displayId].shortName} — {alert.targetType} €{alert.targetPrice}</span>
                <button className="linkButton" onClick={() => removeAlert(alert.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card fullWidth">
        <h3 className="cardTitle">Your holdings</h3>
        <div className="stack">
          {portfolio.length === 0 ? <p className="muted">No holdings yet. Add at least one sealed box to start tracking live prices and alerts.</p> : portfolio.map((item) => {
            const display = displayMap[item.displayId];
            const current = item.lastObservedPrice;
            const signal = marketBadge(current ?? null, display.buyBelow, display.waitAbove);
            const pnl = current !== null ? (current - item.averageBuyPrice) * item.quantity : null;

            return (
              <div className="portfolioCard" key={item.id}>
                <div className="row between wrap gap12">
                  <div>
                    <h4>{display.name}</h4>
                    <p className="muted">Qty {item.quantity} · Avg €{item.averageBuyPrice.toFixed(2)}</p>
                  </div>
                  <div className="row gap12 alignCenter">
                    <SignalBadge label={signal} />
                    <button className="linkButton" onClick={() => removeHolding(item.id)}>Remove</button>
                  </div>
                </div>
                <div className="gridThree top16 gap12">
                  <div className="metricBox">
                    <span className="metricLabel">Live price</span>
                    <strong>{current !== null ? `€${current.toFixed(2)}` : 'Not checked yet'}</strong>
                  </div>
                  <div className="metricBox">
                    <span className="metricLabel">Position P/L</span>
                    <strong>{pnl !== null ? `€${pnl.toFixed(2)}` : '—'}</strong>
                  </div>
                  <div className="metricBox">
                    <span className="metricLabel">Checked</span>
                    <strong>{item.lastCheckedAt ? new Date(item.lastCheckedAt).toLocaleString() : 'Never'}</strong>
                  </div>
                </div>
                <div className="top16">
                  <MarketPriceCard defaultUrl={item.sourceUrl} onPriceUpdate={(result) => updateHoldingPrice(item.id, result)} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
