'use client';

import { useEffect, useMemo, useState } from 'react';
import { displays } from '@/data/displays';
import { alertsStore, alertEventsStore } from '@/lib/storage';
import type { AlertEvent, AlertItem } from '@/lib/types';

function formatPrice(value: number) {
  return `${value.toFixed(2)}€`;
}

export function AlertsClient() {
  const [items, setItems] = useState<AlertItem[]>([]);
  const [events, setEvents] = useState<AlertEvent[]>([]);
  const [product, setProduct] = useState(displays[0].name);
  const [triggerPrice, setTriggerPrice] = useState('');
  const [direction, setDirection] = useState<'below' | 'above'>('below');
  const [delivery, setDelivery] = useState<'in-app' | 'browser'>('in-app');
  const [permission, setPermission] = useState<'default' | 'granted' | 'denied'>('default');
  const currentProduct = useMemo(() => displays.find((display) => display.name === product) ?? displays[0], [product]);

  useEffect(() => {
    setItems(alertsStore.get());
    setEvents(alertEventsStore.get());
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  function maybeNotify(event: AlertEvent, alert: AlertItem) {
    if (typeof window === 'undefined') return;
    if (alert.delivery !== 'browser') return;
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    new Notification('AlphaSignal alert triggered', {
      body: `${event.product} is now ${formatPrice(event.currentPrice)} (${event.direction} ${formatPrice(event.triggerPrice)}).`
    });
  }

  function evaluateAlert(alert: AlertItem) {
    const display = displays.find((item) => item.name === alert.product);
    if (!display) return;
    const crossed = alert.direction === 'below'
      ? display.currentPrice <= alert.triggerPrice
      : display.currentPrice >= alert.triggerPrice;
    if (!crossed) return;
    if (alert.lastTriggeredAt) return;

    const event: AlertEvent = {
      id: crypto.randomUUID(),
      alertId: alert.id,
      product: alert.product,
      direction: alert.direction,
      triggerPrice: alert.triggerPrice,
      currentPrice: display.currentPrice,
      createdAt: new Date().toISOString(),
    };

    const nextEvents = [event, ...alertEventsStore.get()].slice(0, 20);
    alertEventsStore.set(nextEvents);
    setEvents(nextEvents);

    const nextAlerts = alertsStore.get().map((item) => item.id === alert.id ? { ...item, lastTriggeredAt: event.createdAt } : item);
    alertsStore.set(nextAlerts);
    setItems(nextAlerts);
    maybeNotify(event, alert);
  }

  useEffect(() => {
    alertsStore.get().forEach(evaluateAlert);
  }, []);

  async function enableBrowserAlerts() {
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    const result = await Notification.requestPermission();
    setPermission(result);
  }

  function addAlert(event: React.FormEvent) {
    event.preventDefault();
    const parsed = Number(triggerPrice.replace(',', '.'));
    if (!Number.isFinite(parsed) || parsed <= 0) return;

    const next: AlertItem = {
      id: crypto.randomUUID(),
      product,
      triggerPrice: parsed,
      direction,
      delivery,
      createdAt: new Date().toISOString(),
    };
    const updated = [next, ...items];
    setItems(updated);
    alertsStore.set(updated);
    setTriggerPrice('');
    evaluateAlert(next);
  }

  function removeAlert(id: string) {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    alertsStore.set(updated);
  }

  return (
    <div className="list" style={{ gap: 24 }}>
      <div className="card">
        <div className="kicker">How alerts work</div>
        <h2 style={{ marginTop: 8, marginBottom: 10 }}>Simple thresholds, clear delivery, zero ambiguity.</h2>
        <p className="lead" style={{ marginBottom: 0 }}>
          Save a product, choose a rule, and AlphaSignal will watch the latest reference price in this workspace. When a threshold is crossed, it appears in your alert activity immediately and can also trigger a browser notification on this device.
        </p>
        <div className="grid-3" style={{ marginTop: 20 }}>
          <div className="metric"><small>Current reference price</small><strong>{formatPrice(currentProduct.currentPrice)}</strong></div>
          <div className="metric"><small>Recommended buy zone</small><strong>Below {formatPrice(currentProduct.buyBelow)}</strong></div>
          <div className="metric"><small>Browser notifications</small><strong>{permission === 'granted' ? 'Enabled' : permission === 'denied' ? 'Blocked' : 'Off'}</strong></div>
        </div>
        <div className="notice" style={{ marginTop: 18 }}>
          Alerts are delivered inside the Alerts page and optionally as browser notifications. Email delivery belongs in the paid cloud version once account auth and background jobs are connected.
        </div>
        <div className="cta-row" style={{ marginTop: 16 }}>
          <button className="btn btn-secondary" type="button" onClick={enableBrowserAlerts}>Enable browser alerts</button>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="kicker">Alert engine</div>
          <h3 style={{ marginTop: 8 }}>Create threshold alerts</h3>
          <p>Set the exact level that should pull your attention back to a product. No clutter, just the condition that matters.</p>
          <form className="list" onSubmit={addAlert}>
            <label className="field">
              <span className="field-label">Product</span>
              <select className="select" value={product} onChange={(e) => setProduct(e.target.value)}>
                {displays.map((display) => <option key={display.slug}>{display.name}</option>)}
              </select>
            </label>
            <div className="form-grid">
              <label className="field">
                <span className="field-label">Rule</span>
                <select className="select" value={direction} onChange={(e) => setDirection(e.target.value as 'below' | 'above')}>
                  <option value="below">Trigger when price falls below</option>
                  <option value="above">Trigger when price rises above</option>
                </select>
              </label>
              <label className="field">
                <span className="field-label">Target price</span>
                <input className="input" inputMode="decimal" value={triggerPrice} onChange={(e) => setTriggerPrice(e.target.value)} placeholder="399.00" aria-label="Target price" />
              </label>
            </div>
            <label className="field">
              <span className="field-label">Delivery</span>
              <select className="select" value={delivery} onChange={(e) => setDelivery(e.target.value as 'in-app' | 'browser')}>
                <option value="in-app">In-app alert center</option>
                <option value="browser">Browser notification + in-app</option>
              </select>
            </label>
            <div className="small">Watching now: {currentProduct.name} at {formatPrice(currentProduct.currentPrice)}</div>
            <button className="btn btn-primary" type="submit">Save alert</button>
          </form>
        </div>

        <div className="card">
          <div className="kicker">Saved alerts</div>
          <h3 style={{ marginTop: 8 }}>Your thresholds</h3>
          {items.length === 0 ? (
            <div className="empty">No alerts yet. Create one threshold and the app will keep watching the current reference price for that product.</div>
          ) : (
            <table className="table">
              <thead><tr><th>Product</th><th>Rule</th><th>Status</th><th /></tr></thead>
              <tbody>
                {items.map((item) => {
                  const display = displays.find((entry) => entry.name === item.product);
                  const currentPrice = display?.currentPrice ?? 0;
                  const status = item.lastTriggeredAt
                    ? `Triggered at ${new Date(item.lastTriggeredAt).toLocaleDateString()}`
                    : item.direction === 'below'
                      ? `Watching for ${formatPrice(item.triggerPrice)} or lower` : `Watching for ${formatPrice(item.triggerPrice)} or higher`;
                  return (
                    <tr key={item.id}>
                      <td>
                        <strong>{item.product}</strong>
                        <div className="small">Current reference: {formatPrice(currentPrice)}</div>
                      </td>
                      <td>{item.direction === 'below' ? 'Below' : 'Above'} {formatPrice(item.triggerPrice)}</td>
                      <td>{status}</td>
                      <td><button className="btn btn-secondary" style={{ padding: '8px 12px' }} onClick={() => removeAlert(item.id)}>Remove</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="card">
        <div className="kicker">Alert activity</div>
        <h3 style={{ marginTop: 8 }}>What fired and why</h3>
        <p>Every triggered alert is logged here so the user always understands what happened, at what price, and in which direction.</p>
        {events.length === 0 ? (
          <div className="empty">No triggered alerts yet. Once a reference price crosses one of your thresholds, the event appears here.</div>
        ) : (
          <table className="table">
            <thead><tr><th>Product</th><th>Trigger</th><th>Current price</th><th>Time</th></tr></thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.product}</td>
                  <td>{event.direction === 'below' ? 'Dropped below' : 'Moved above'} {formatPrice(event.triggerPrice)}</td>
                  <td>{formatPrice(event.currentPrice)}</td>
                  <td>{new Date(event.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
