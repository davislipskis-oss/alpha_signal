const faq = [
  {
    q: 'Is this financial advice?',
    a: 'No. AlphaSignal presents analytical signals and scenario views based on sealed-market behaviour. It does not provide personal financial advice or guaranteed outcomes.'
  },
  {
    q: 'How often do signals update?',
    a: 'The platform is designed for recurring refreshes so hold scores, thresholds, and conviction can evolve as market conditions change.'
  },
  {
    q: 'What happens to my saved portfolio and alerts?',
    a: 'In this build, your saved data stays on this device. The structure is ready for cloud sync when you connect a backend later.'
  },
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
