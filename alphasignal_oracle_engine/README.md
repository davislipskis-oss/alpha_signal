# AlphaSignal Oracle Engine

A deployable Next.js product skeleton for MTG sealed analytics with fantasy-themed premium positioning.

## What is included

- High-conversion landing page copy and structure
- Arcane premium visual layer
- Product analyzer with hold score and rationale
- Server-side retailer price scraping route
- Automatic market overview route across configured retailer URLs
- Browser-local auth, portfolio tracking, and alert storage
- Legal pages for disclaimer, privacy, and terms
- Dataset generator script for expanding the sealed product universe

## Important honesty note

This is a fast-launch MVP. It is **not** yet a full multi-user production SaaS.

- Accounts are stored in browser localStorage.
- Portfolio and alerts are stored in browser localStorage.
- Retailer scraping depends on page structure and may break when stores redesign pages or block requests.
- For real paid scale, move auth and data to Supabase or a similar backend.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Create a GitHub repository.
2. Upload this project.
3. Import the repo into Vercel.
4. Deploy.

No environment variables are required for this MVP.

## Recommended production upgrades

- Supabase auth and database
- Stripe billing
- Scheduled serverless jobs to snapshot retailer pricing
- Email alerts instead of browser-only notifications
- Per-user cloud portfolio sync
- Admin dataset tools and product review workflow
