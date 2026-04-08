import Link from 'next/link';
import { SignalPreview } from '@/components/SignalPreview';
import { PricingGrid } from '@/components/PricingGrid';
import { FAQ } from '@/components/FAQ';
import { ClientAuth } from '@/components/ClientAuth';
import { OracleVisual } from '@/components/OracleVisual';

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">Oracle market intelligence</div>
            <h1>Know before you open.</h1>
            <p>
              AlphaSignal tells you whether a sealed product deserves patience, a disciplined entry,
              or no capital at all. Built for collectors who want cleaner decisions than guesswork.
            </p>
            <div className="cta-row">
              <Link href="/analyzer" className="btn btn-primary">Analyze a display</Link>
              <Link href="/portfolio" className="btn btn-secondary">Open portfolio</Link>
            </div>
            <div className="proof-strip">
              <div className="proof-item"><strong>6 launch models</strong><span>selected for real collector relevance, not filler</span></div>
              <div className="proof-item"><strong>EU-first logic</strong><span>signals framed around the market you actually buy in</span></div>
              <div className="proof-item"><strong>Fast verdicts</strong><span>conviction, thresholds, and upside in one view</span></div>
            </div>
          </div>
          <div className="oracle-card card">
            <OracleVisual />
            <div className="oracle-overlay">
              <div className="oracle-tag">Arcane decision engine</div>
              <h3>An oracle with restraint.</h3>
              <p>
                Elegant by design, ruthless in purpose. It turns noise into a signal you can act on.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div className="card">
            <div className="kicker">Why it matters</div>
            <h2>Most buyers confuse excitement with edge.</h2>
            <p className="lead">
              AlphaSignal separates momentum from conviction so you can avoid paying premium prices for low-quality decisions.
            </p>
            <div className="list">
              <div className="list-item"><span className="dot" /><span>Use a clear threshold before you commit 300–500€ to sealed product.</span></div>
              <div className="list-item"><span className="dot" /><span>See when nostalgia supports a thesis and when it is just temporary heat.</span></div>
              <div className="list-item"><span className="dot" /><span>Turn opening, holding, and watchlisting into a repeatable operating system.</span></div>
            </div>
          </div>
          <SignalPreview />
        </div>
      </section>

      <section className="section">
        <div className="container grid-3">
          <div className="card">
            <div className="kicker">Signal engine</div>
            <h3>Verdicts, not spreadsheets.</h3>
            <p>
              Each product view compresses hold score, entry threshold, confidence, and velocity into one concise call.
            </p>
          </div>
          <div className="card">
            <div className="kicker">Market context</div>
            <h3>Europe first.</h3>
            <p>
              Most sealed tools are US-centric. AlphaSignal is framed for European collectors, retailers, and pricing behaviour.
            </p>
          </div>
          <div className="card">
            <div className="kicker">Discipline layer</div>
            <h3>Build your sealed operating view.</h3>
            <p>
              Track inventory, store your entry prices, and set alerts so decisions come from a system, not a mood.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <ClientAuth />
          <div className="card">
            <div className="kicker">Private workspace</div>
            <h3>Your edge should be easy to revisit.</h3>
            <p>
              Save what you own, what you are watching, and which thresholds matter. That turns one-off analysis into ongoing decision support.
            </p>
            <div className="list">
              <div className="list-item"><span className="dot" /><span>Keep signals and inventory in one place.</span></div>
              <div className="list-item"><span className="dot" /><span>Review your average entry price before you add more exposure.</span></div>
              <div className="list-item"><span className="dot" /><span>Get back to the right decision faster next time.</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="pricing">
        <div className="container">
          <h2>Pricing that feels cheap after one avoided mistake.</h2>
          <p className="lead">
            This is not a hobby dashboard. It is decision support for collectors who would rather protect capital than improvise.
          </p>
          <PricingGrid />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Clear enough to trust. Honest enough to keep using.</h2>
          <p className="lead">
            AlphaSignal provides scenario-based analytics, not guaranteed outcomes. That keeps the product useful, credible, and legally disciplined.
          </p>
          <FAQ />
        </div>
      </section>

      <section className="section">
        <div className="container card hero-close" style={{ textAlign: 'center' }}>
          <div className="kicker">Final verdict</div>
          <h2>Opening without a process is gambling. Opening with a process is strategy.</h2>
          <p className="lead" style={{ marginInline: 'auto' }}>
            Use the analyzer, log your inventory, and make sealed decisions with more discipline than the average buyer.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link href="/analyzer" className="btn btn-primary">Run the analyzer</Link>
            <Link href="/pricing" className="btn btn-secondary">Compare plans</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
