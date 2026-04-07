# AlphaSignal

A deployable Next.js MVP for MTG sealed product analytics.

## What is included

- Conversion-focused landing page
- Browser-side login/register
- Display analyzer with hold score, market thresholds, and rationale
- Portfolio tracking per logged-in browser user
- Retailer URL live price checking via a generic server-side scraper
- Threshold alerts with browser notifications
- Built-in disclaimer section for launch

## Important limitation

This ships fast because auth and portfolio persistence are browser-side using localStorage. That means:

- each browser has its own user database and session
- there is no shared cloud database yet
- if the browser storage is deleted, the account and portfolio disappear

That is acceptable for a fast MVP, but for paid production you should move auth and data to Supabase, Clerk + Supabase, Firebase, or Vercel Postgres.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Create a new GitHub repository.
2. Upload this project.
3. In Vercel, click **Add New Project**.
4. Import the GitHub repo.
5. Deploy.

No environment variables are required for this MVP.

## Legal / compliance guidance for launch

Use the product as an analytics and decision-support tool. Do **not** market it as personalised investment advice. Keep language such as:

- signal
- analytics
- scenario view
- market check
- decision support

Avoid language such as:

- guaranteed profit
- best investment for you
- personalised financial advice
- risk-free

Add terms, privacy notice, and disclaimer before charging users.
