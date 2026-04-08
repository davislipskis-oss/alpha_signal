import { PricingGrid } from '@/components/PricingGrid';

export default function PricingPage() {
  return (
    <main className="container">
      <section className="page-head">
        <h1>Pricing</h1>
        <p className="lead">The core model is monthly. Lifetime exists as an early-cash-flow lever while the product is still young.</p>
        <div className="stat-bar">
          <div className="stat-pill">Free = acquisition</div>
          <div className="stat-pill">Pro = revenue engine</div>
          <div className="stat-pill">Trader = high-margin tier</div>
          <div className="stat-pill">Lifetime = launch conversion boost</div>
        </div>
      </section>
      <PricingGrid />
      <section className="section">
        <div className="card">
          <div className="kicker">Implementation note</div>
          <h3>Stripe is scaffolded next, not live yet.</h3>
          <p>
            This deploy is intentionally payment-ready rather than payment-connected. Add Stripe checkout and customer portal next so you can launch real billing without rewriting the pricing model.
          </p>
        </div>
      </section>
    </main>
  );
}
