import { PricingGrid } from '@/components/PricingGrid';

export default function PricingPage() {
  return (
    <main className="container">
      <section className="page-head">
        <h1>Pricing</h1>
        <p className="lead">Choose the level of workflow you need: quick checks, a persistent sealed workspace, or a more active operating setup.</p>
        <div className="stat-bar">
          <div className="stat-pill">Free for first-pass decisions</div>
          <div className="stat-pill">Pro for ongoing portfolio use</div>
          <div className="stat-pill">Trader for active monitoring</div>
          <div className="stat-pill">Lifetime for early adopters</div>
        </div>
      </section>
      <PricingGrid />
      <section className="section">
        <div className="card">
          <div className="kicker">What changes between tiers</div>
          <h3>More persistence, more monitoring, more operating leverage.</h3>
          <p>
            Free is enough to understand the product. Pro turns the workflow into a habit. Trader is for users who want sharper threshold monitoring around repeat buying and watchlists.
          </p>
        </div>
      </section>
    </main>
  );
}
