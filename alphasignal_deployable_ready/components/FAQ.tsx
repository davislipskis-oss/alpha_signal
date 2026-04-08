const faq = [
  { q: 'Is this financial advice?', a: 'No. AlphaSignal provides analytical signals based on sealed market patterns, not personal investment advice.' },
  { q: 'How often do signals update?', a: 'The app is structured for weekly signal refreshes. This deployable build includes a mock snapshot and cron-ready scaffolding.' },
  { q: 'Does AlphaSignal track Cardmarket?', a: 'The architecture is ready for Cardmarket velocity ingestion, but live Cardmarket integration still needs your API credentials and backend setup.' },
];

export function FAQ() {
  return (
    <div className="grid-3">
      {faq.map((item) => (
        <div className="card" key={item.q}>
          <h3 style={{ fontSize: 22 }}>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
    </div>
  );
}
