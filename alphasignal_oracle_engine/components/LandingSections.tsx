export function LandingSections() {
  return (
    <>
      <section className="section" id="why-pay">
        <div className="sectionHeader">
          <h2>Most collectors open blindly. <span className="gradientText">That is where money dies.</span></h2>
          <p>
            The market does not reward excitement. It rewards positioning. AlphaSignal translates sealed product chaos into a clean verdict: hold, buy, wait, or walk away.
          </p>
        </div>
        <div className="grid3">
          <div className="card cardPad">
            <div className="eyebrow">Loss aversion</div>
            <h3 style={{ fontSize: 26, letterSpacing: '-0.04em' }}>Avoid expensive mistakes</h3>
            <p className="copyBlock">One bad €400 opening pays for a long time of analytics. That is why the copy must sell certainty, not dashboards.</p>
          </div>
          <div className="card cardPad">
            <div className="eyebrow">Insider edge</div>
            <h3 style={{ fontSize: 26, letterSpacing: '-0.04em' }}>See Europe, not just the US</h3>
            <p className="copyBlock">Collectors in Europe buy into a different market structure. Retailer spreads, availability, and timing all behave differently here.</p>
          </div>
          <div className="card cardPad">
            <div className="eyebrow">Decision engine</div>
            <h3 style={{ fontSize: 26, letterSpacing: '-0.04em' }}>The product gives a verdict</h3>
            <p className="copyBlock">Data alone feels free. A decision feels premium. That is the entire monetisation architecture in one sentence.</p>
          </div>
        </div>
      </section>

      <section className="section" id="copy-strategy">
        <div className="sectionHeader">
          <h2>The landing page that actually converts</h2>
          <p>
            It should not sound like a hobby site. It should sound like a precision instrument built for people who hate wasting money.
          </p>
        </div>
        <div className="grid2">
          <div className="card cardPad">
            <div className="eyebrow">Hero structure</div>
            <p className="copyBlock"><strong>Headline:</strong> Know before you open.</p>
            <p className="copyBlock"><strong>Subheadline:</strong> AlphaSignal reveals whether your display is a hold, a flip, or a mistake.</p>
            <p className="copyBlock"><strong>Proof line:</strong> Serialized odds. EU price signals. Sealed appreciation forecasts.</p>
            <p className="copyBlock"><strong>CTA:</strong> Analyze my display.</p>
          </div>
          <div className="card cardPad">
            <div className="eyebrow">Psychological sequence</div>
            <p className="copyBlock"><strong>1.</strong> Trigger curiosity.<br /><strong>2.</strong> Frame the pain of opening blindly.<br /><strong>3.</strong> Show a real signal output.<br /><strong>4.</strong> Prove the Europe-first edge.<br /><strong>5.</strong> Turn portfolio tracking into retention.</p>
          </div>
        </div>
      </section>

      <section className="section" id="pricing">
        <div className="sectionHeader">
          <h2>Pricing that makes psychological sense</h2>
          <p>
            The buyer is not comparing you to Netflix. They are comparing you to one expensive mistake. Price it like a decision shield, not like entertainment.
          </p>
        </div>
        <div className="pricingGrid">
          <div className="priceCard">
            <div className="eyebrow">Free</div>
            <div className="priceValue">€0</div>
            <p className="copyBlock">Enough to prove the concept. Not enough to replace your own judgement yet.</p>
            <ul>
              <li>Core analyzer access</li>
              <li>Manual URL price check</li>
              <li>Limited portfolio preview</li>
            </ul>
          </div>
          <div className="priceCard priceCardFeatured">
            <div className="eyebrow">Pro</div>
            <div className="priceValue">€8.90</div>
            <p className="copyBlock">The main money tier. One correct decision can pay for months.</p>
            <ul>
              <li>Unlimited analysis</li>
              <li>Market overview scraping</li>
              <li>Portfolio tracking</li>
              <li>Alert lines</li>
            </ul>
          </div>
          <div className="priceCard">
            <div className="eyebrow">Trader</div>
            <div className="priceValue">€18.90</div>
            <p className="copyBlock">For buyers who actively hunt mispriced sealed product and track multiple boxes at once.</p>
            <ul>
              <li>Everything in Pro</li>
              <li>Sharper retailer anomaly workflows</li>
              <li>More alerts</li>
              <li>Priority new-set models</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
