export default function PrivacyPage() {
  return (
    <main className="container">
      <section className="page-head">
        <h1>Privacy Policy</h1>
        <p className="lead">This deployable version stores portfolio data, alert data, and demo login state in the local browser only.</p>
      </section>
      <div className="card">
        <p>
          No cloud user database is enabled by default in this version. When you later connect Supabase or another backend,
          update this page to reflect what personal data is stored server-side and how users can request deletion.
        </p>
      </div>
    </main>
  );
}
