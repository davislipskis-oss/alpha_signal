'use client';

import { useEffect, useState } from 'react';
import { displays } from '@/data/displays';
import { alertsStore } from '@/lib/storage';
import type { AlertItem } from '@/lib/types';

export function AlertsClient() {
  const [items, setItems] = useState<AlertItem[]>([]);
  const [product, setProduct] = useState(displays[0].name);
  const [triggerPrice, setTriggerPrice] = useState(0);
  const [direction, setDirection] = useState<'below' | 'above'>('below');

  useEffect(() => { setItems(alertsStore.get()); }, []);

  function addAlert(event: React.FormEvent) {
    event.preventDefault();
    const next: AlertItem = { id: crypto.randomUUID(), product, triggerPrice, direction };
    const updated = [next, ...items];
    setItems(updated);
    alertsStore.set(updated);
    setTriggerPrice(0);
  }

  function removeAlert(id: string) {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    alertsStore.set(updated);
  }

  return (
    <div className="grid-2">
      <div className="card">
        <div className="kicker">Alert engine</div>
        <h3 style={{ marginTop: 8 }}>Create threshold alerts</h3>
        <p>Define the exact price level that should pull your attention back to a product.</p>
        <form className="list" onSubmit={addAlert}>
          <select className="select" value={product} onChange={(e) => setProduct(e.target.value)}>
            {displays.map((display) => <option key={display.slug}>{display.name}</option>)}
          </select>
          <div className="form-grid">
            <select className="select" value={direction} onChange={(e) => setDirection(e.target.value as 'below' | 'above')}>
              <option value="below">Alert me below price</option>
              <option value="above">Alert me above price</option>
            </select>
            <input className="input" type="number" min="0" step="0.01" value={triggerPrice} onChange={(e) => setTriggerPrice(Number(e.target.value))} placeholder="Trigger price" />
          </div>
          <button className="btn btn-primary" type="submit">Save alert</button>
        </form>
      </div>
      <div className="card">
        <div className="kicker">Saved alerts</div>
        <h3 style={{ marginTop: 8 }}>Your thresholds</h3>
        {items.length === 0 ? (
          <div className="empty">No alerts yet. Add one threshold and turn passive browsing into an active watchlist.</div>
        ) : (
          <table className="table">
            <thead><tr><th>Product</th><th>Rule</th><th>Price</th><th /></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.product}</td><td>{item.direction === 'below' ? 'Below' : 'Above'}</td><td>{item.triggerPrice.toFixed(2)}€</td>
                  <td><button className="btn btn-secondary" style={{ padding: '8px 12px' }} onClick={() => removeAlert(item.id)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
