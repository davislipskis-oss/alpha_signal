const tiers = [
  { name: 'Free', price: '0€', period: '', cta: 'Start free', features: ['1 signal / day', '1 display tracked', 'Basic probability model'] },
  { name: 'Pro', price: '8.90€', period: '/month', cta: 'Upgrade to Pro', badge: 'Most popular', popular: true, features: ['Unlimited signals', 'Portfolio tracking', 'Sealed appreciation forecasts', 'EU price signals'] },
  { name: 'Trader', price: '18.90€', period: '/month', cta: 'Activate Trader', features: ['Retailer anomaly alerts', 'Stock alerts', 'Arbitrage detection', 'Priority signal updates'] },
  { name: 'Lifetime', price: '49€', period: 'one-time', cta: 'Claim launch offer', badge: 'Launch offer', features: ['Core analyzer forever', 'No monthly billing', 'Built for early adopters'] },
];

export function PricingGrid() {
  return (
    <div className="pricing-grid">
      {tiers.map((tier) => (
        <div key={tier.name} className={`card price-card ${tier.popular ? 'popular' : ''}`}>
          {tier.badge ? <div className="price-ribbon">{tier.badge}</div> : null}
          <div className="kicker">{tier.name}</div>
          <div className="price">{tier.price} <small>{tier.period}</small></div>
          <div className="list">
            {tier.features.map((feature) => (
              <div key={feature} className="list-item"><span className="dot" /> <span>{feature}</span></div>
            ))}
          </div>
          <div style={{ marginTop: 18 }}>
            <a href="/pricing" className={`btn ${tier.popular ? 'btn-primary' : 'btn-secondary'}`}>{tier.cta}</a>
          </div>
        </div>
      ))}
    </div>
  );
}
