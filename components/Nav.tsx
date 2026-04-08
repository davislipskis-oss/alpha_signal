import Link from 'next/link';

export function Nav() {
  return (
    <div className="nav">
      <div className="container nav-inner">
        <Link href="/" className="brand">
          <span className="brand-orb" aria-hidden="true" />
          <span>AlphaSignal</span>
        </Link>
        <div className="nav-links">
          <Link href="/analyzer">Analyzer</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/alerts">Alerts</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </div>
  );
}
