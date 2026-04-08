import Link from 'next/link';
import { SignalPreview } from '@/components/SignalPreview';
import { PricingGrid } from '@/components/PricingGrid';
import { FAQ } from '@/components/FAQ';
import { ClientAuth } from '@/components/ClientAuth';

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">Oracle market intelligence</div>
            <h1>Know before you open.</h1>
            <p>
              AlphaSignal reveals whether your display is a hold, a flip, or a mistake.
              It is built for collectors who hate wasting money and want a cleaner edge than guesswork.
            </p>
            <div className="cta-row">
              <Link href="/analyzer" className="btn btn-primary">Analyze my display</Link>
              <Link href="/pricing" className="btn btn-secondary">See pricing</Link>
            </div>
            <div className="proof-strip">
              <div className="proof-item"><strong>40+</strong><span>collector display models ready to scale</span></div>
              <div className="proof-item"><strong>EU-first</strong><span>pricing logic built for European collectors</span></div>
              <div className="proof-item"><strong>Weekly</strong><span>signal refresh architecture already scaffolded</span></div>
            </div>
          </div>
          <div className="oracle-card card">
            <div className="oracle-portrait" aria-hidden="true" />
            <div className="oracle-overlay">
              <div className="oracle-tag">Arcane decision engine</div>
              <h3>The Oracle does not entertain. It filters noise.</h3>
              <p>
                Signals, probabilities, price thresholds, and sealed upside estimates — wrapped in a premium interface that feels powerful without looking childish.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div className="card">
            <div className="kicker">The problem</div>
            <h2>Most collectors open blindly.</h2>
            <p className="lead">Some get lucky. Most destroy value. AlphaSignal shows what the market is actually doing before you break the seal.</p>
            <div className="list">
              <div className="list-item"><span className="dot" /><span>Stop treating a 300–500€ display like a casual impulse.</span></div>
              <div className="list-item"><span className="dot" /><span>See the difference between heat, conviction, and pure hopium.</span></div>
              <div className="list-item"><span className="dot" /><span>Turn sealed decisions into a repeatable system instead of a vibe.</span></div>
            </div>
          </div>
          <SignalPreview />
        </div>
      </section>

      <section className="section">
        <div className="container grid-3">
          <div className="card">
            <div className="kicker">How it works</div>
            <h3>Signal engine</h3>
            <p>AlphaSignal evaluates print-run pressure, collector demand velocity, serialized probability, and sealed market behavior before generating a signal.</p>
          </div>
          <div className="card">
            <div className="kicker">Why it wins</div>
            <h3>Europe-first edge</h3>
            <p>Most MTG tools are built around US pricing. European collectors make different decisions. Your signal should reflect your market.</p>
          </div>
          <div className="card">
            <div className="kicker">Retention layer</div>
            <h3>Portfolio engine</h3>
            <p>Track your sealed collection like a portfolio, set thresholds, and turn random browsing into disciplined inventory management.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <ClientAuth />
          <div className="card">
            <div className="kicker">Built for discipline</div>
            <h3>A cleaner way to make sealed decisions.</h3>
            <p>
              AlphaSignal helps collectors replace impulse with process: clearer thresholds, better timing, and fewer expensive mistakes.
            </p>
            <div className="list">
              <div className="list-item"><span className="dot" /><span>Check a display before you crack the seal.</span></div>
              <div className="list-item"><span className="dot" /><span>Track your sealed inventory in one place.</span></div>
              <div className="list-item"><span className="dot" /><span>Use alerts to act when price conditions actually change.</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="pricing">
        <div className="container">
          <h2>Pricing that matches the value of one avoided mistake.</h2>
          <p className="lead">The right subscription feels cheap the moment it prevents one bad opening decision.</p>
          <PricingGrid />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Trust without sounding like personal investment advice.</h2>
          <p className="lead">AlphaSignal focuses on analytics, probabilities, and market scenarios — not guaranteed outcomes or personal financial advice.</p>
          <FAQ />
        </div>
      </section>

      <section className="section">
        <div className="container card" style={{ textAlign: 'center' }}>
          <div className="kicker">Final verdict</div>
          <h2>Opening without data is gambling. Opening with AlphaSignal is strategy.</h2>
          <p className="lead" style={{ marginInline: 'auto' }}>Use the analyzer, build your watchlist, and make sealed decisions with more discipline than the average buyer.</p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link href="/analyzer" className="btn btn-primary">Run the analyzer</Link>
            <Link href="/portfolio" className="btn btn-secondary">Track my portfolio</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
