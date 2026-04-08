export function FAQ() {
  return (
    <div className="grid-2">
      <div className="card">
        <div className="kicker">FAQ</div>
        <h3 style={{ marginTop: 8 }}>Is this financial advice?</h3>
        <p>No. AlphaSignal provides scenario-based analytics for sealed TCG products and should be treated as decision support, not guaranteed advice or a promise of returns.</p>
      </div>
      <div className="card">
        <div className="kicker">FAQ</div>
        <h3 style={{ marginTop: 8 }}>How do alerts work right now?</h3>
        <p>Alerts are saved inside this workspace and trigger when the latest reference price crosses your threshold. You can also enable browser notifications on the same device.</p>
      </div>
      <div className="card">
        <div className="kicker">FAQ</div>
        <h3 style={{ marginTop: 8 }}>Will alerts arrive by email?</h3>
        <p>Email delivery belongs in the account-connected cloud version. This launch build focuses on in-app alerts and optional browser notifications first.</p>
      </div>
      <div className="card">
        <div className="kicker">FAQ</div>
        <h3 style={{ marginTop: 8 }}>Why does Europe-first framing matter?</h3>
        <p>Because sealed supply, retailer pricing, and tax-inclusive buying behaviour in Europe often create different decisions than US-only dashboards suggest.</p>
      </div>
    </div>
  );
}
