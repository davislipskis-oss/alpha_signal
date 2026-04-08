export default function PrivacyPage() {
  return (
    <main className="container">
      <section className="page-head">
        <h1>Privacy Policy</h1>
        <p className="lead">This build stores portfolio data, alert data, and local workspace state on the current device only.</p>
      </section>
      <div className="card">
        <p>
          No server-side user database is active in this version. If you later enable cloud storage, update this page to describe what data is stored, how long it is retained, and how users can request deletion.
        </p>
      </div>
    </main>
  );
}
