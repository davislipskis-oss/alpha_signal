'use client';

import { useEffect, useMemo, useState } from 'react';
import { displays } from '@/data/displays';
import { portfolioStore } from '@/lib/storage';
import type { PortfolioItem } from '@/lib/types';

export function PortfolioClient() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [product, setProduct] = useState(displays[0].name);
  const [quantity, setQuantity] = useState('1');
  const [averagePrice, setAveragePrice] = useState('');
  const [notes, setNotes] = useState('');
  const currentProduct = useMemo(() => displays.find((display) => display.name === product) ?? displays[0], [product]);

  useEffect(() => { setItems(portfolioStore.get()); }, []);

  function addItem(event: React.FormEvent) {
    event.preventDefault();
    const parsedQty = Number(quantity);
    const parsedPrice = Number((averagePrice || '0').replace(',', '.'));
    if (!Number.isFinite(parsedQty) || parsedQty < 1) return;
    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) return;

    const next: PortfolioItem = { id: crypto.randomUUID(), product, quantity: parsedQty, averagePrice: parsedPrice, notes };
    const updated = [next, ...items];
    setItems(updated);
    portfolioStore.set(updated);
    setQuantity('1'); setAveragePrice(''); setNotes('');
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
        <p>Add what you own, how many units you hold, and your average entry. The goal is not clutter. It is remembering your actual exposure before you buy again.</p>
        <form className="list" onSubmit={addItem}>
          <label className="field">
            <span className="field-label">Product</span>
            <select className="select" value={product} onChange={(e) => setProduct(e.target.value)}>
              {displays.map((display) => <option key={display.slug}>{display.name}</option>)}
            </select>
          </label>
          <div className="form-grid">
            <label className="field">
              <span className="field-label">Quantity</span>
              <input className="input" inputMode="numeric" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="1" />
            </label>
            <label className="field">
              <span className="field-label">Average entry price</span>
              <input className="input" inputMode="decimal" value={averagePrice} onChange={(e) => setAveragePrice(e.target.value)} placeholder="399.00" />
            </label>
          </div>
          <div className="small">Current reference price for this product: {currentProduct.currentPrice.toFixed(2)}€</div>
          <textarea className="textarea" rows={4} placeholder="Optional notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
          <button className="btn btn-primary" type="submit">Add to portfolio</button>
        </form>
      </div>
      <div className="card">
        <div className="kicker">Current holdings</div>
        <h3 style={{ marginTop: 8 }}>Estimated capital committed</h3>
        <div className="signal-score" style={{ fontSize: 44 }}>{totalCost.toFixed(2)}€</div>
        {items.length === 0 ? (
          <div className="empty">No holdings yet. Add your first display to build a usable record of what you already own.</div>
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
