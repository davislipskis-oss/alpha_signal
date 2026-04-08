import { AlertsClient } from '@/components/AlertsClient';

export default function AlertsPage() {
  return (
    <main className="container">
      <section className="page-head">
        <h1>Alerts</h1>
        <p className="lead">Set price thresholds so attention goes where it belongs: on conditions that changed, not noise that did not.</p>
      </section>
      <AlertsClient />
    </main>
  );
}
