# AlphaSignal Oracle Engine

Deployable Next.js app for sealed MTG analytics with premium landing page, analyzer, portfolio tracking, alerts, legal pages, and integration-ready API scaffolding.

## Included
- Production-ready landing page
- Display analyzer with signal logic
- Portfolio tracking in browser storage
- Alert thresholds in browser storage
- Pricing page with Free / Pro / Trader / Lifetime tiers
- Legal pages
- Health endpoint
- Mock velocity snapshot endpoint and cron scaffold
- Integration-ready stubs for Supabase / Stripe / Cardmarket

## Quick deploy to Vercel
1. Create a GitHub repository and upload this project.
2. In Vercel, import the repository.
3. Add environment variables from `.env.example`.
4. Deploy.

## Honest note
This version is fully deployable, but user auth, payments, and Cardmarket snapshots are scaffolded rather than live because they require your own keys and account setup. The app is built so those can be added cleanly next.

## Local run
```bash
npm install
npm run dev
```

## Endpoints
- `/api/health`
- `/api/snapshot/mock`
- `/api/cron/velocity?secret=YOUR_CRON_SECRET`
