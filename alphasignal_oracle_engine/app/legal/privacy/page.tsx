import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="shell" style={{ padding: '40px 0 60px' }}>
      <div className="card cardPad">
        <div className="eyebrow">Privacy</div>
        <h1 style={{ fontSize: 48, letterSpacing: '-0.05em', margin: '14px 0' }}>Privacy notice</h1>
        <div className="copyBlock">
          <p>This MVP stores account details, portfolio positions, and alert rules in the user’s own browser localStorage. The data is not shared across devices and may disappear if local browser data is cleared.</p>
          <p>The server-side price checker fetches retailer pages requested by the user or configured in the product dataset. For a production launch, you should add a proper privacy policy covering logs, analytics, cookies, and any third-party processors you use.</p>
        </div>
        <div className="actions" style={{ marginTop: 18 }}>
          <Link href="/" className="btn">Back to app</Link>
        </div>
      </div>
    </main>
  );
}
