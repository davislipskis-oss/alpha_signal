'use client';

import { AuthGate } from '@/components/AuthGate';
import { Portfolio } from '@/components/Portfolio';
import { SignalBadge } from '@/components/SignalBadge';
import { displays, displayMap } from '@/data/displays';
import { holdBadge, marketBadge } from '@/lib/signal';
import { useMemo, useState } from 'react';

export default function AnalyzerPage() {
  const [selectedId, setSelectedId] = useState(displays[0].id);
  const [livePrice, setLivePrice] = useState('');

  const selected = useMemo(() => displayMap[selectedId], [selectedId]);
  const currentPrice = livePrice ? Number(livePrice) : null;
  const holdLabel = holdBadge(selected.holdScore);
  const marketLabel = marketBadge(currentPrice, selected.buyBelow, selected.waitAbove);

  return (
    <AuthGate>
      {(sessionEmail) => (
        <main className="pageWrap narrow">
          <div className="row between wrap gap12 top16">
            <div>
              <div className="eyebrow">ALPHASIGNAL DASHBOARD</div>
              <h1 className="pageTitle">Know before you open</h1>
            </div>
            <a className="buttonGhostLink" href="/">Back to landing page</a>
          </div>

          <section className="card top24">
            <div className="row between wrap gap12">
              <div>
                <h2 className="sectionTitle">Display analyzer</h2>
                <p className="muted">Choose a sealed product and instantly see the strategic posture.</p>
              </div>
              <SignalBadge label={holdLabel} />
            </div>
            <div className="gridTwo gap12 top16">
              <label>
                <span>Display</span>
                <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
                  {displays.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>Observed market price (€)</span>
                <input value={livePrice} onChange={(e) => setLivePrice(e.target.value)} placeholder={String(selected.buyBelow)} />
              </label>
            </div>
            <div className="metricGrid top16">
              <div className="metricBox">
                <span className="metricLabel">Hold score</span>
                <strong>{selected.holdScore}%</strong>
              </div>
              <div className="metricBox">
                <span className="metricLabel">Market signal</span>
                <strong>{marketLabel}</strong>
              </div>
              <div className="metricBox">
                <span className="metricLabel">Signal confidence</span>
                <strong>{selected.signalConfidence}%</strong>
              </div>
              <div className="metricBox">
                <span className="metricLabel">Expected CAGR</span>
                <strong>+{selected.appreciationCagr}%</strong>
              </div>
              <div className="metricBox">
                <span className="metricLabel">Buy below</span>
                <strong>€{selected.buyBelow}</strong>
              </div>
              <div className="metricBox">
                <span className="metricLabel">Wait above</span>
                <strong>€{selected.waitAbove}</strong>
              </div>
            </div>
            <div className="top16">
              <h3 className="cardTitle">Why the model leans this way</h3>
              <ul className="bulletList">
                {selected.rationale.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </section>

          <Portfolio sessionEmail={sessionEmail} />

          <section className="card top24">
            <h2 className="sectionTitle">Disclaimer for launch</h2>
            <p className="muted">
              AlphaSignal is an analytics and decision-support product. It does not give personalised investment advice, legal advice, tax advice, or a guarantee of profit. Users make their own buying, selling, opening, and holding decisions. All prices can be stale, incomplete, or wrong. External retailer prices and scraped pages can change or disappear without notice.
            </p>
            <p className="muted">
              The product should avoid language that sounds like personalised financial advice. Use terms such as “signal”, “analytics”, “market check”, “supporting data”, and “scenario view” instead of promising returns.
            </p>
          </section>
        </main>
      )}
    </AuthGate>
  );
}
