import Link from 'next/link';
import { displays } from '@/data/displays';
import { holdBadge, marketBadge } from '@/lib/signal';
import { SignalBadge } from '@/components/SignalBadge';

export default function HomePage() {
  const example = displays[0];
  return (
    <main className="pageWrap">
      <header className="hero">
        <div className="heroCopy">
          <div className="eyebrow">MTG SEALED INTELLIGENCE</div>
          <h1>Should you open your display — or keep it sealed?</h1>
          <p className="heroText">
            Serialized odds. Real price checks. Sealed appreciation signals. Know before you open.
          </p>
          <div className="row gap12 wrap">
            <Link href="/analyzer" className="buttonLink">Analyze my display</Link>
            <a href="#pricing" className="buttonGhostLink">See pricing</a>
          </div>
          <div className="heroBullets">
            <span>Open vs Hold score</span>
            <span>Portfolio tracking</span>
            <span>Live retailer URL price checks</span>
            <span>Threshold alerts</span>
          </div>
        </div>
        <div className="heroPanel card">
          <div className="row between alignCenter">
            <span className="muted">EXAMPLE SIGNAL</span>
            <SignalBadge label={holdBadge(example.holdScore)} />
          </div>
          <h3 className="cardTitle top12">{example.shortName}</h3>
          <div className="metricGrid top16">
            <div className="metricBox">
              <span className="metricLabel">Hold score</span>
              <strong>{example.holdScore}%</strong>
            </div>
            <div className="metricBox">
              <span className="metricLabel">Signal confidence</span>
              <strong>{example.signalConfidence}%</strong>
            </div>
            <div className="metricBox">
              <span className="metricLabel">Serialized odds</span>
              <strong>{example.serializedOdds}</strong>
            </div>
            <div className="metricBox">
              <span className="metricLabel">Market signal</span>
              <strong>{marketBadge(example.buyBelow, example.buyBelow, example.waitAbove)}</strong>
            </div>
          </div>
        </div>
      </header>

      <section className="sectionGrid top32">
        <div className="card">
          <h2 className="sectionTitle">What makes this different</h2>
          <p className="muted">Most MTG tools dump data. This one gives a decision.</p>
          <div className="stack top16">
            <div className="resultBox">
              <strong>Open vs Hold</strong>
              <p className="muted">Instant decision framing built around sealed expected value, category strength, and scarcity assumptions.</p>
            </div>
            <div className="resultBox">
              <strong>Portfolio tracking</strong>
              <p className="muted">Track your boxes like positions, not random purchases.</p>
            </div>
            <div className="resultBox">
              <strong>Live price checks</strong>
              <p className="muted">Paste retailer URLs and check live listed prices through a server-side scraper.</p>
            </div>
          </div>
        </div>
        <div className="card">
          <h2 className="sectionTitle">The core psychological promise</h2>
          <div className="quoteBox">Opening a display without data is gambling. Opening with AlphaSignal is strategy.</div>
          <ul className="bulletList top16">
            <li>Stop guessing what a sealed product is worth.</li>
            <li>Avoid one bad opening and the tool pays for itself.</li>
            <li>Get a cleaner market read before you spend real money.</li>
          </ul>
        </div>
      </section>

      <section className="card top32" id="pricing">
        <h2 className="sectionTitle">Simple pricing copy for launch</h2>
        <div className="pricingGrid top16">
          <div className="priceCard">
            <div className="eyebrow">FREE</div>
            <h3>€0</h3>
            <p className="muted">Analyze displays, test the scraper, and feel the product.</p>
          </div>
          <div className="priceCard priceCardFeatured">
            <div className="eyebrow">PRO</div>
            <h3>€9 / month</h3>
            <p className="muted">One correct decision pays for your subscription.</p>
          </div>
          <div className="priceCard">
            <div className="eyebrow">TRADER</div>
            <h3>€19 / month</h3>
            <p className="muted">For people who track multiple boxes and want sharper thresholds.</p>
          </div>
        </div>
      </section>

      <section className="legalStrip top32">
        <p>
          AlphaSignal is an analytics product, not financial, legal, or tax advice. See the full disclaimer before launch.
        </p>
        <Link href="/analyzer" className="buttonLink">Open the app</Link>
      </section>
    </main>
  );
}
