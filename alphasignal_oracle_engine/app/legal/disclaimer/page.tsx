import Link from 'next/link';

export default function DisclaimerPage() {
  return (
    <main className="shell" style={{ padding: '40px 0 60px' }}>
      <div className="card cardPad">
        <div className="eyebrow">Legal notice</div>
        <h1 style={{ fontSize: 48, letterSpacing: '-0.05em', margin: '14px 0' }}>Disclaimer</h1>
        <div className="copyBlock">
          <p>AlphaSignal Oracle Engine provides market analytics, pricing observations, heuristic signals, and scenario views for collectible trading card products.</p>
          <p>It does not provide financial advice, investment advice, legal advice, tax advice, or personalised recommendations tailored to your individual financial circumstances.</p>
          <p>Any buy, hold, open, wait, avoid, or similar labels are informational heuristics generated from the product’s internal methodology. They are not guarantees of profit, liquidity, resale outcome, or future market behaviour.</p>
          <p>Collectible product markets can be volatile, illiquid, manipulated, and sentiment-driven. Users are solely responsible for their own purchasing, selling, opening, and holding decisions.</p>
          <p>If you launch this product commercially, keep all marketing language framed around analytics, signals, scenarios, and market checks. Avoid promises, certainty language, and statements that imply personalised regulated investment advice.</p>
        </div>
        <div className="actions" style={{ marginTop: 18 }}>
          <Link href="/" className="btn">Back to app</Link>
        </div>
      </div>
    </main>
  );
}
