import { AlertsClient } from '@/components/AlertsClient';

export default function AlertsPage() {
  return (
    <main className="container">
      <section className="page-head">
        <h1>Alerts</h1>
        <p className="lead">Stop babysitting prices. Set a rule once, understand exactly how delivery works, and come back only when a condition actually changed.</p>
      </section>
      <AlertsClient />
    </main>
  );
}
