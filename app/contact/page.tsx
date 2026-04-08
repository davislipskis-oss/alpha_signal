export default function ContactPage() {
  return (
    <main className="container">
      <section className="page-head">
        <h1>Contact</h1>
        <p className="lead">Questions, partnership requests, bug reports, and billing issues should have a clear home. This page exists because commercial software needs a credible way to reach the operator behind it.</p>
      </section>

      <section className="grid-2">
        <div className="card">
          <div className="kicker">Support</div>
          <h3 style={{ marginTop: 8 }}>Get help from a real operator.</h3>
          <p>If a signal looks off, a page breaks, or a billing issue needs attention, reach out here. For launch, the fastest route is direct email.</p>
          <div className="list">
            <div className="list-item"><span className="dot" /><span><strong>Email:</strong> support@alphasignal.example</span></div>
            <div className="list-item"><span className="dot" /><span><strong>Response target:</strong> within 2 business days</span></div>
            <div className="list-item"><span className="dot" /><span><strong>Topics:</strong> product support, billing, partnerships, bug reports</span></div>
          </div>
        </div>

        <div className="card">
          <div className="kicker">Before you write</div>
          <h3 style={{ marginTop: 8 }}>Include enough detail to solve the issue fast.</h3>
          <div className="list">
            <div className="list-item"><span className="dot" /><span>The page where the issue happened</span></div>
            <div className="list-item"><span className="dot" /><span>Your browser and device</span></div>
            <div className="list-item"><span className="dot" /><span>What you expected versus what actually happened</span></div>
            <div className="list-item"><span className="dot" /><span>A screenshot if the issue is visual</span></div>
          </div>
          <div className="notice" style={{ marginTop: 18 }}>
            Replace the placeholder support email with your real support address before launch.
          </div>
        </div>
      </section>
    </main>
  );
}
