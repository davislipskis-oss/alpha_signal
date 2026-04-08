import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container">
      <section className="page-head">
        <h1>Page not found</h1>
        <p className="lead">The signal you were looking for is gone or never existed.</p>
      </section>
      <div className="card">
        <p>Return to the analyzer or go back to the homepage.</p>
        <div className="cta-row">
          <Link href="/" className="btn btn-primary">Go home</Link>
          <Link href="/analyzer" className="btn btn-secondary">Open analyzer</Link>
        </div>
      </div>
    </main>
  );
}
