'use client';

import { useState } from 'react';
import Link from 'next/link';
import { OracleAvatar } from '@/components/OracleAvatar';
import { LandingSections } from '@/components/LandingSections';
import { AnalyzerPanel } from '@/components/AnalyzerPanel';
import { PriceRadar } from '@/components/PriceRadar';
import { PortfolioPanel } from '@/components/PortfolioPanel';
import { AuthPanel } from '@/components/AuthPanel';

export default function HomePage() {
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);

  return (
    <>
      <nav className="nav">
        <div className="shell navInner">
          <div className="brand">
            <div className="brandMark" />
            <div>
              <div className="brandTitle">Arcane sealed intelligence</div>
              <span className="brandStrong">AlphaSignal Oracle Engine</span>
            </div>
          </div>
          <div className="navLinks">
            <a href="#analyzer">Analyzer</a>
            <a href="#radar">Price radar</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#pricing">Pricing</a>
            <Link href="/legal/disclaimer">Disclaimer</Link>
          </div>
        </div>
      </nav>

      <main className="shell">
        <section className="hero">
          <div className="heroPanel heroCopy">
            <div className="eyebrow">For sealed collectors who refuse to guess</div>
            <h1>
              Know before you <span className="gradientText">open.</span>
            </h1>
            <p>
              AlphaSignal reveals whether your display is a hold, a flip, or a mistake. It blends sealed price structure, collector demand, retailer scraping, and scarcity logic into a clean verdict you can actually act on.
            </p>
            <div className="heroActions">
              <a href="#analyzer" className="btn">Analyze my display</a>
              <a href="#pricing" className="btnGhost">See launch pricing</a>
            </div>
            <div className="heroProof">
              <div className="proofPill">Serialized odds and premium chase framing</div>
              <div className="proofPill">Europe-first price checks and anomaly detection</div>
              <div className="proofPill">Portfolio tracking and alert lines</div>
            </div>
          </div>

          <div className="heroPanel oracleSide">
            <OracleAvatar />
          </div>
        </section>

        <LandingSections />
        <AuthPanel onSessionChange={setSessionEmail} />
        <section className="section"><AnalyzerPanel /></section>
        <section className="section"><PriceRadar /></section>
        <section className="section"><PortfolioPanel sessionEmail={sessionEmail} /></section>

        <section className="section">
          <div className="card cardPad">
            <div className="sectionHeader" style={{ marginBottom: 0 }}>
              <h2>Why the legal language matters</h2>
              <p>
                This product should speak like analytics, not personal investment advice. Keep the site framed around signals, probabilities, scenario views, and market checks. Do not promise profits or personalise recommendations as if you knew each user’s financial circumstances.
              </p>
            </div>
            <div className="actions" style={{ marginTop: 18 }}>
              <Link href="/legal/disclaimer" className="btnGhost">Read disclaimer</Link>
              <Link href="/legal/terms" className="btnGhost">Terms</Link>
              <Link href="/legal/privacy" className="btnGhost">Privacy</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="shell footer">
        <div className="footerLinks">
          <Link href="/legal/disclaimer">Disclaimer</Link>
          <Link href="/legal/terms">Terms</Link>
          <Link href="/legal/privacy">Privacy</Link>
        </div>
        <p>AlphaSignal Oracle Engine is an analytics product for sealed MTG collectors. It is not financial, legal, or tax advice.</p>
      </footer>
    </>
  );
}
