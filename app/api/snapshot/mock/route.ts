import { NextResponse } from 'next/server';
import { displays } from '@/data/displays';

export async function GET() {
  return NextResponse.json({
    source: 'mock',
    capturedAt: new Date().toISOString(),
    rows: displays.map((display) => ({
      product: display.name,
      velocityScore: display.velocityScore,
      buyBelow: display.buyBelow,
      waitAbove: display.waitAbove,
      confidence: display.conviction,
    })),
  });
}
