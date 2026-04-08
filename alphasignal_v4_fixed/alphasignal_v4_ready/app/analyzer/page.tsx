import { AnalyzerClient } from '@/components/AnalyzerClient';

export default function AnalyzerPage() {
  return (
    <main className="container">
      <section className="page-head">
        <h1>Analyzer</h1>
        <p className="lead">Run a signal, inspect the verdict, and see why the model leans hold, watch, or avoid.</p>
      </section>
      <AnalyzerClient />
      <section className="section">
        <div className="card notice">
          Legal note: this tool provides analytical signals based on market patterns and product data. It does not provide personal financial advice.
        </div>
      </section>
    </main>
  );
}
