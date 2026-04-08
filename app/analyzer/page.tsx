import { AnalyzerClient } from '@/components/AnalyzerClient';

export default function AnalyzerPage() {
  return (
    <main className="container">
      <section className="page-head">
        <h1>Analyzer</h1>
        <p className="lead">Run a signal, inspect the verdict, and review the thresholds that matter before you commit capital or crack a seal.</p>
      </section>
      <AnalyzerClient />
      <section className="section">
        <div className="card notice">
          AlphaSignal provides analytics and scenario views based on market patterns. It does not provide personal financial advice.
        </div>
      </section>
    </main>
  );
}
