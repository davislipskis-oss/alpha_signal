import { bySlug } from '@/data/displays';
import { convictionSummary, signalLabel, signalTone } from '@/lib/logic';

export function SignalPreview() {
  const display = bySlug('lotr-collector');
  const label = signalLabel(display.holdScore);
  const tone = signalTone(display.holdScore);

  return (
    <div className="card signal-card">
      <div className="kicker">Signal preview</div>
      <h3 style={{ marginTop: 8 }}>{display.name}</h3>
      <div className="signal-score">{display.holdScore}%</div>
      <div className={`badge ${tone}`}>{label}</div>
      <p style={{ marginTop: 16 }}>{convictionSummary(display)}</p>
      <div className="metrics">
        <div className="metric"><small>Serialized odds</small><strong>{display.serializedOdds}</strong></div>
        <div className="metric"><small>Expected appreciation</small><strong>{display.appreciation}</strong></div>
        <div className="metric"><small>Buy below</small><strong>{display.buyBelow}€</strong></div>
        <div className="metric"><small>Confidence</small><strong>{display.conviction}%</strong></div>
      </div>
    </div>
  );
}
