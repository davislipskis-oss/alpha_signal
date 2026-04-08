import Link from 'next/link';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <strong>AlphaSignal Oracle Engine</strong>
          <div className="small" style={{ marginTop: 8 }}>
            Market signals for collectors who hate guessing.
          </div>
        </div>
        <div className="nav-links">
          <Link href="/legal/disclaimer">Legal Notice</Link>
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
