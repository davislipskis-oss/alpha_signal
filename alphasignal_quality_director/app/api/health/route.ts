import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ ok: true, service: 'alphasignal-oracle', timestamp: new Date().toISOString() });
}
