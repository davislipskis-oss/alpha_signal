'use client';

import { useMemo, useState } from 'react';
import { displays } from '@/data/displays';
import { convictionSummary, signalLabel, signalTone } from '@/lib/logic';

export function AnalyzerClient() {
  const [slug, setSlug] = useState(displays[0].slug);
  const display = useMemo(() => displays.find((item) => item.slug === slug) ?? displays[0], [slug]);
  const label = signalLabel(display.holdScore);
  const tone = signalTone(display.holdScore);

  return (
    <div className="grid-2">
      <div className="card">
        <div className="kicker">Analyzer</div>
        <h3 style={{ marginTop: 8 }}>Run a signal in seconds</h3>
        <div className="list">
          <select className="select" value={slug} onChange={(e) => setSlug(e.target.value)}>
            {displays.map((item) => (
              <option key={item.slug} value={item.slug}>{item.name}</option>
            ))}
          </select>
        </div>
        <div className="metrics">
          <div className="metric"><small>Velocity score</small><strong>{display.velocityScore}</strong></div>
          <div className="metric"><small>Signal confidence</small><strong>{display.conviction}%</strong></div>
          <div className="metric"><small>Buy below</small><strong>{display.buyBelow}€</strong></div>
          <div className="metric"><small>Wait above</small><strong>{display.waitAbove}€</strong></div>
        </div>
      </div>
      <div className="card signal-card">
        <div className="kicker">Verdict</div>
        <h3 style={{ marginTop: 8 }}>{display.name}</h3>
        <div className="signal-score">{display.holdScore}%</div>
        <div className={`badge ${tone}`}>{label}</div>
        <p style={{ marginTop: 14 }}>{convictionSummary(display)}</p>
        <div className="metrics">
          <div className="metric"><small>Serialized odds</small><strong>{display.serializedOdds}</strong></div>
          <div className="metric"><small>Expected appreciation</small><strong>{display.appreciation}</strong></div>
        </div>
        <div className="list">
          {display.notes.map((note) => (
            <div key={note} className="list-item"><span className="dot" /><span>{note}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}
