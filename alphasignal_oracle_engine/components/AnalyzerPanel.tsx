'use client';

import { useMemo, useState } from 'react';
import { displays } from '@/data/displays';
import { growthFromHistory, holdClass, holdLabel, marketClass, marketLabel } from '@/lib/signals';
import { SignalBadge } from './SignalBadge';

export function AnalyzerPanel() {
  const [selectedId, setSelectedId] = useState(displays[0].id);
  const selected = useMemo(() => displays.find((item) => item.id === selectedId) || displays[0], [selectedId]);
  const historyGrowth = growthFromHistory(selected.priceHistory);

  return (
    <div className="card cardPad" id="analyzer">
      <div className="actions" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="eyebrow">Live example signal</div>
          <h3 style={{ margin: '14px 0 8px', fontSize: 28, letterSpacing: '-0.04em' }}>Know before you open.</h3>
          <p className="copyBlock" style={{ margin: 0 }}>
            The Oracle does not try to entertain you. It tries to stop expensive guessing. Pick a product and watch the market logic resolve into a decision.
          </p>
        </div>
        <SignalBadge label={holdLabel(selected.holdScore)} className={holdClass(selected.holdScore)} />
      </div>

      <div className="hr" />

      <div className="formGrid">
        <div>
          <label className="small muted">Select sealed product</label>
          <select className="productSelect" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
            {displays.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>

          <div className="metricRow" style={{ marginTop: 16 }}>
            <div className="metric">
              <span className="metricLabel">Hold score</span>
              <span className="metricValue">{selected.holdScore}%</span>
            </div>
            <div className="metric">
              <span className="metricLabel">Signal confidence</span>
              <span className="metricValue">{selected.signalConfidence}%</span>
            </div>
            <div className="metric">
              <span className="metricLabel">Market fair value</span>
              <span className="metricValue">€{selected.fairValue}</span>
            </div>
            <div className="metric">
              <span className="metricLabel">6-point history move</span>
              <span className="metricValue">{historyGrowth.toFixed(1)}%</span>
            </div>
          </div>

          <div className="grid2" style={{ marginTop: 16 }}>
            <div className="metric">
              <span className="metricLabel">Serialized / premium chase odds</span>
              <span className="metricValue" style={{ fontSize: 20 }}>{selected.serializedOdds}</span>
            </div>
            <div className="metric">
              <span className="metricLabel">Expected appreciation band</span>
              <span className="metricValue" style={{ fontSize: 20 }}>{selected.appreciationRange}</span>
            </div>
          </div>
        </div>

        <div className="metric">
          <span className="metricLabel">Oracle verdict</span>
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <SignalBadge label={holdLabel(selected.holdScore)} className={holdClass(selected.holdScore)} />
            <SignalBadge label={marketLabel(selected.fairValue, selected)} className={marketClass(marketLabel(selected.fairValue, selected))} />
          </div>
          <p className="copyBlock" style={{ marginTop: 14 }}>{selected.marketNarrative}</p>
          <div className="list">
            {selected.rationale.map((reason) => (
              <div className="notice" key={reason}>{reason}</div>
            ))}
          </div>
          <div className="hr" />
          <div className="grid2">
            <div>
              <span className="metricLabel">Buy below</span>
              <div className="metricValue">€{selected.buyBelow}</div>
            </div>
            <div>
              <span className="metricLabel">Wait above</span>
              <div className="metricValue">€{selected.waitAbove}</div>
            </div>
          </div>
          <p className="small muted" style={{ marginTop: 14 }}>{selected.historicalReference}</p>
        </div>
      </div>
    </div>
  );
}
