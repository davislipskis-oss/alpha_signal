import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="shell" style={{ padding: '40px 0 60px' }}>
      <div className="card cardPad">
        <div className="eyebrow">Terms</div>
        <h1 style={{ fontSize: 48, letterSpacing: '-0.05em', margin: '14px 0' }}>Terms of use</h1>
        <div className="copyBlock">
          <p>You use AlphaSignal Oracle Engine at your own risk. The service is provided on an “as is” basis for informational use.</p>
          <p>You agree not to rely on the service as a substitute for your own judgement, due diligence, or professional advice.</p>
          <p>You also agree that scraped retailer data may be unavailable, incorrect, delayed, or blocked by website changes. Market conditions can change faster than any signal model can update.</p>
          <p>Before charging paying users, add your company details, governing law, refund terms, support email, and subscription billing terms here.</p>
        </div>
        <div className="actions" style={{ marginTop: 18 }}>
          <Link href="/" className="btn">Back to app</Link>
        </div>
      </div>
    </main>
  );
}
