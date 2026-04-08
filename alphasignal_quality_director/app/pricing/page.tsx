import { PricingGrid } from '@/components/PricingGrid';

export default function PricingPage() {
  return (
    <main className="container">
      <section className="page-head">
        <h1>Pricing</h1>
        <p className="lead">Choose the level of discipline you need: quick checks, a persistent sealed workspace, or a more active operator setup.</p>
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
          <h3>More speed, more persistence, more operating leverage.</h3>
          <p>
            Free gets you the product logic. Pro makes the habit sticky. Trader is for users who want a sharper workflow around thresholds and repeat checks.
          </p>
        </div>
      </section>
    </main>
  );
}
