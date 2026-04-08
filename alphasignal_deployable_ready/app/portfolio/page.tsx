import { PortfolioClient } from '@/components/PortfolioClient';

export default function PortfolioPage() {
  return (
    <main className="container">
      <section className="page-head">
        <h1>Portfolio</h1>
        <p className="lead">Add displays, track capital deployed, and start turning sealed ownership into a real operating view.</p>
      </section>
      <PortfolioClient />
    </main>
  );
}
