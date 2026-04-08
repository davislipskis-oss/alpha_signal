import { NextRequest, NextResponse } from 'next/server';
import { scrapePrice } from '@/lib/scrape';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const url = body?.url as string | undefined;

  if (!url) {
    return NextResponse.json({ error: 'URL is required.' }, { status: 400 });
  }

  const result = await scrapePrice(url);
  return NextResponse.json({
    retailer: result.sourceHost,
    url: result.url,
    title: result.title,
    price: result.price,
    currency: result.currency,
    method: result.method,
    error: result.error
  });
}
