'use client';

import { useEffect, useMemo, useState } from 'react';
import { displays } from '@/data/displays';
import type { AlertRule, PortfolioPosition } from '@/lib/storage';
import { getAlerts, getPortfolio, saveAlerts, savePortfolio } from '@/lib/storage';
import { marketClass, marketLabel } from '@/lib/signals';
import { SignalBadge } from './SignalBadge';

export function PortfolioPanel({ sessionEmail }: { sessionEmail: string | null }) {
  const [positions, setPositions] = useState<PortfolioPosition[]>([]);
  const [alerts, setAlerts] = useState<AlertRule[]>([]);
  const [displayId, setDisplayId] = useState(displays[0].id);
  const [quantity, setQuantity] = useState('1');
  const [averageCost, setAverageCost] = useState('');
  const [note, setNote] = useState('');
  const [alertTarget, setAlertTarget] = useState('');
  const [direction, setDirection] = useState<'below' | 'above'>('below');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionEmail) {
      setPositions([]);
      setAlerts([]);
      return;
    }
    setPositions(getPortfolio(sessionEmail));
    setAlerts(getAlerts(sessionEmail));
  }, [sessionEmail]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    if (Notification.permission === 'default') {
      Notification.requestPermission().catch(() => undefined);
    }
  }, []);

  const portfolioSummary = useMemo(() => {
    return positions.reduce(
      (acc, position) => {
        const product = displays.find((item) => item.id === position.displayId);
        if (!product) return acc;
        const positionCost = position.averageCost * position.quantity;
        const fairValue = product.fairValue * position.quantity;
        acc.cost += positionCost;
        acc.fairValue += fairValue;
        return acc;
      },
      { cost: 0, fairValue: 0 }
    );
  }, [positions]);

  function persistPositions(next: PortfolioPosition[]) {
    setPositions(next);
    if (sessionEmail) savePortfolio(sessionEmail, next);
  }

  function persistAlerts(next: AlertRule[]) {
    setAlerts(next);
    if (sessionEmail) saveAlerts(sessionEmail, next);
  }

  function addPosition() {
    if (!sessionEmail) return;
    const parsedQty = Number(quantity);
    const parsedCost = Number(averageCost);
    if (!parsedQty || !parsedCost) {
      setMessage('Enter both quantity and average cost to add a sealed position.');
      return;
    }
    const next: PortfolioPosition[] = [
      {
        id: crypto.randomUUID(),
        displayId,
        quantity: parsedQty,
        averageCost: parsedCost,
        note,
        createdAt: new Date().toISOString()
      },
      ...positions
    ];
    persistPositions(next);
    setQuantity('1');
    setAverageCost('');
    setNote('');
    setMessage('Position added to your local sealed portfolio.');
  }

  function deletePosition(id: string) {
    persistPositions(positions.filter((position) => position.id !== id));
  }

  function addAlert() {
    if (!sessionEmail) return;
    const parsedTarget = Number(alertTarget);
    if (!parsedTarget) {
      setMessage('Enter a target price to create an alert.');
      return;
    }
    const next: AlertRule[] = [
      {
        id: crypto.randomUUID(),
        displayId,
        targetPrice: parsedTarget,
        direction,
        createdAt: new Date().toISOString()
      },
      ...alerts
    ];
    persistAlerts(next);
    setAlertTarget('');
    setMessage('Alert armed. When live prices cross your line, you will see it here.');
  }

  function deleteAlert(id: string) {
    persistAlerts(alerts.filter((alert) => alert.id !== id));
  }

  async function testAlert(alert: AlertRule) {
    const product = displays.find((item) => item.id === alert.displayId);
    if (!product) return;
    const priceToTest = product.fairValue;
    const triggered = alert.direction === 'below' ? priceToTest <= alert.targetPrice : priceToTest >= alert.targetPrice;
    const messageText = triggered
      ? `${product.shortName} crossed your ${alert.direction} €${alert.targetPrice} line.`
      : `${product.shortName} has not crossed your ${alert.direction} €${alert.targetPrice} line yet.`;
    setMessage(messageText);
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification('AlphaSignal alert check', { body: messageText });
    }
  }

  return (
    <div className="card cardPad" id="portfolio">
      <div className="actions" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="eyebrow">Portfolio and alerts</div>
          <h3 style={{ margin: '14px 0 8px', fontSize: 28, letterSpacing: '-0.04em' }}>Track your sealed collection like a portfolio</h3>
          <p className="copyBlock" style={{ margin: 0 }}>
            This is the retention engine. Once people log positions, price memory and alert lines inside the product become the moat.
          </p>
        </div>
      </div>
      <div className="hr" />
      {!sessionEmail ? (
        <div className="notice">Login above to unlock portfolio tracking and local alert storage in this browser.</div>
      ) : (
        <>
          <div className="metricRow">
            <div className="metric">
              <span className="metricLabel">Positions</span>
              <span className="metricValue">{positions.length}</span>
            </div>
            <div className="metric">
              <span className="metricLabel">Cost basis</span>
              <span className="metricValue">€{portfolioSummary.cost.toFixed(0)}</span>
            </div>
            <div className="metric">
              <span className="metricLabel">Oracle fair value</span>
              <span className="metricValue">€{portfolioSummary.fairValue.toFixed(0)}</span>
            </div>
            <div className="metric">
              <span className="metricLabel">Implied edge</span>
              <span className="metricValue">€{(portfolioSummary.fairValue - portfolioSummary.cost).toFixed(0)}</span>
            </div>
          </div>

          <div className="grid2" style={{ marginTop: 18 }}>
            <div className="metric">
              <span className="metricLabel">Add sealed position</span>
              <div className="grid2" style={{ marginTop: 12 }}>
                <select className="productSelect" value={displayId} onChange={(e) => setDisplayId(e.target.value)}>
                  {displays.map((item) => <option key={item.id} value={item.id}>{item.shortName}</option>)}
                </select>
                <input className="textInput" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
                <input className="textInput" value={averageCost} onChange={(e) => setAverageCost(e.target.value)} placeholder="Average cost per box" />
                <input className="textInput" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional note" />
              </div>
              <div className="actions" style={{ marginTop: 12 }}>
                <button className="btn" onClick={addPosition}>Add to portfolio</button>
              </div>
            </div>
            <div className="metric">
              <span className="metricLabel">Create alert</span>
              <div className="grid2" style={{ marginTop: 12 }}>
                <select className="productSelect" value={displayId} onChange={(e) => setDisplayId(e.target.value)}>
                  {displays.map((item) => <option key={item.id} value={item.id}>{item.shortName}</option>)}
                </select>
                <select className="productSelect" value={direction} onChange={(e) => setDirection(e.target.value as 'below' | 'above')}>
                  <option value="below">Alert if below</option>
                  <option value="above">Alert if above</option>
                </select>
                <input className="textInput" value={alertTarget} onChange={(e) => setAlertTarget(e.target.value)} placeholder="Target price" />
              </div>
              <div className="actions" style={{ marginTop: 12 }}>
                <button className="btnGhost" onClick={addAlert}>Create alert</button>
              </div>
            </div>
          </div>

          {message ? <div className="notice" style={{ marginTop: 16 }}>{message}</div> : null}

          <div className="list" style={{ marginTop: 18 }}>
            {positions.map((position) => {
              const product = displays.find((item) => item.id === position.displayId);
              if (!product) return null;
              const verdict = marketLabel(product.fairValue, product);
              return (
                <div className="itemRow" key={position.id}>
                  <div>
                    <strong>{product.shortName}</strong>
                    <div className="small muted">{position.note || 'No note'}</div>
                  </div>
                  <div className="small muted">Qty {position.quantity} · Cost €{position.averageCost}</div>
                  <div><strong>Fair €{product.fairValue}</strong></div>
                  <div><SignalBadge label={verdict} className={marketClass(verdict)} /></div>
                  <button className="btnGhost" onClick={() => deletePosition(position.id)}>Remove</button>
                </div>
              );
            })}
            {!positions.length ? <div className="notice">No positions yet. The minute a collector logs real positions, switching cost appears.</div> : null}
          </div>

          <div className="list" style={{ marginTop: 18 }}>
            {alerts.map((alert) => {
              const product = displays.find((item) => item.id === alert.displayId);
              if (!product) return null;
              return (
                <div className="itemRow" key={alert.id}>
                  <div>
                    <strong>{product.shortName}</strong>
                    <div className="small muted">Trigger {alert.direction} €{alert.targetPrice}</div>
                  </div>
                  <div className="small muted">Current fair €{product.fairValue}</div>
                  <div><SignalBadge label={alert.direction === 'below' ? 'Buy line' : 'Sell line'} className="badge badgeWatch" /></div>
                  <button className="btnGhost" onClick={() => testAlert(alert)}>Test alert</button>
                  <button className="btnGhost" onClick={() => deleteAlert(alert.id)}>Delete</button>
                </div>
              );
            })}
            {!alerts.length ? <div className="notice">No alerts armed yet.</div> : null}
          </div>
        </>
      )}
    </div>
  );
}
