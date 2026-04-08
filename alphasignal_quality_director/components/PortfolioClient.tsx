'use client';

import { useEffect, useState } from 'react';
import { displays } from '@/data/displays';
import { portfolioStore } from '@/lib/storage';
import type { PortfolioItem } from '@/lib/types';

export function PortfolioClient() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [product, setProduct] = useState(displays[0].name);
  const [quantity, setQuantity] = useState(1);
  const [averagePrice, setAveragePrice] = useState(0);
  const [notes, setNotes] = useState('');

  useEffect(() => { setItems(portfolioStore.get()); }, []);

  function addItem(event: React.FormEvent) {
    event.preventDefault();
    const next: PortfolioItem = { id: crypto.randomUUID(), product, quantity, averagePrice, notes };
    const updated = [next, ...items];
    setItems(updated);
    portfolioStore.set(updated);
    setQuantity(1); setAveragePrice(0); setNotes('');
  }

  function removeItem(id: string) {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated); portfolioStore.set(updated);
  }

  const totalCost = items.reduce((sum, item) => sum + item.averagePrice * item.quantity, 0);

  return (
    <div className="grid-2">
      <div className="card">
        <div className="kicker">Portfolio tracking</div>
        <h3 style={{ marginTop: 8 }}>Track sealed inventory like a portfolio</h3>
        <form className="list" onSubmit={addItem}>
          <select className="select" value={product} onChange={(e) => setProduct(e.target.value)}>
            {displays.map((display) => <option key={display.slug}>{display.name}</option>)}
          </select>
          <div className="form-grid">
            <input className="input" type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} placeholder="Quantity" />
            <input className="input" type="number" min="0" step="0.01" value={averagePrice} onChange={(e) => setAveragePrice(Number(e.target.value))} placeholder="Average price" />
          </div>
          <textarea className="textarea" rows={4} placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
          <button className="btn btn-primary" type="submit">Add to portfolio</button>
        </form>
      </div>
      <div className="card">
        <div className="kicker">Current holdings</div>
        <h3 style={{ marginTop: 8 }}>Estimated capital committed</h3>
        <div className="signal-score" style={{ fontSize: 44 }}>{totalCost.toFixed(2)}€</div>
        {items.length === 0 ? (
          <div className="empty">No holdings yet. Add your first display to start tracking your sealed stack.</div>
        ) : (
          <table className="table">
            <thead><tr><th>Product</th><th>Qty</th><th>Avg</th><th /></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.product}</td><td>{item.quantity}</td><td>{item.averagePrice.toFixed(2)}€</td>
                  <td><button className="btn btn-secondary" style={{ padding: '8px 12px' }} onClick={() => removeItem(item.id)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
