import { PortfolioClient } from '@/components/PortfolioClient';

export default function PortfolioPage() {
  return (
    <main className="container">
      <section className="page-head">
        <h1>Portfolio</h1>
        <p className="lead">Track position size, average entry, and conviction so your sealed inventory behaves more like a managed portfolio than a loose pile of boxes.</p>
      </section>
      <PortfolioClient />
    </main>
  );
}
