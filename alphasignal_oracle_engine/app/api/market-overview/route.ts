import { NextRequest, NextResponse } from 'next/server';
import { displays } from '@/data/displays';
import { average } from '@/lib/signals';
import { scrapePrice } from '@/lib/scrape';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const productId = body?.productId as string | undefined;
  if (!productId) {
    return NextResponse.json({ error: 'productId is required.' }, { status: 400 });
  }

  const product = displays.find((item) => item.id === productId);
  if (!product) {
    return NextResponse.json({ error: 'Unknown productId.' }, { status: 404 });
  }

  const checks = await Promise.all(product.retailerSources.map(async (source) => {
    const scraped = await scrapePrice(source.url);
    return {
      retailer: source.name,
      region: source.region,
      url: source.url,
      title: scraped.title,
      price: scraped.price,
      currency: scraped.currency,
      method: scraped.method,
      error: scraped.error
    };
  }));

  const prices = checks.map((check) => check.price).filter((price): price is number => price !== null);
  const averageLivePrice = prices.length ? average(prices) : null;
  let anomalySummary = 'Not enough live prices to generate an anomaly summary.';
  if (averageLivePrice !== null) {
    if (averageLivePrice <= product.buyBelow) {
      anomalySummary = 'Retailers are listing below your buy line. This is a real buy signal.';
    } else if (averageLivePrice <= product.waitAbove) {
      anomalySummary = 'Retailers are near fair value. Watch, do not rush.';
    } else {
      anomalySummary = 'Retailers are listing above your wait line. The market is hot or overpriced.';
    }
  }

  return NextResponse.json({
    productId,
    checks,
    averageLivePrice,
    fairValue: product.fairValue,
    buyBelow: product.buyBelow,
    waitAbove: product.waitAbove,
    anomalySummary
  });
}
