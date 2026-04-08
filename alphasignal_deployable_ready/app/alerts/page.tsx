import { AlertsClient } from '@/components/AlertsClient';

export default function AlertsPage() {
  return (
    <main className="container">
      <section className="page-head">
        <h1>Alerts</h1>
        <p className="lead">Set thresholds now. Hook them into cron, email, or Supabase later without rebuilding your product from scratch.</p>
      </section>
      <AlertsClient />
    </main>
  );
}
