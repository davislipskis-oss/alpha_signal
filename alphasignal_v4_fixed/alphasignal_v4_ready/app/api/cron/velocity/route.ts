import { NextRequest, NextResponse } from 'next/server';
import { displays } from '@/data/displays';

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ ok: false, error: 'Unauthorized cron trigger.' }, { status: 401 });
  }
  const snapshot = displays.map((display) => ({
    product: display.name,
    velocityScore: display.velocityScore,
    confidence: display.conviction,
    capturedAt: new Date().toISOString(),
  }));

  return NextResponse.json({
    ok: true,
    message: 'Cron scaffold executed. Replace this mock snapshot with real Cardmarket ingestion next.',
    snapshot,
  });
}
