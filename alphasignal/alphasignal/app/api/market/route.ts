import { load } from 'cheerio';

function parseJsonLdPrice(html: string): { price: number | null; currency?: string; title?: string; method?: string } {
  const $ = load(html);
  const scripts = $('script[type="application/ld+json"]');

  for (const el of scripts.toArray()) {
    const raw = $(el).html();
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw);
      const items = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of items) {
        const offers = item?.offers;
        const offer = Array.isArray(offers) ? offers[0] : offers;
        const price = offer?.price ?? item?.price;
        if (price && !Number.isNaN(Number(price))) {
          return {
            price: Number(price),
            currency: offer?.priceCurrency || item?.priceCurrency || 'EUR',
            title: item?.name,
            method: 'json-ld'
          };
        }
      }
    } catch {
      continue;
    }
  }

  return { price: null };
}

function parseMetaPrice(html: string): { price: number | null; currency?: string; title?: string; method?: string } {
  const $ = load(html);
  const ogPrice = $('meta[property="product:price:amount"]').attr('content') || $('meta[property="og:price:amount"]').attr('content');
  const currency = $('meta[property="product:price:currency"]').attr('content') || 'EUR';
  const title = $('title').text().trim() || undefined;
  if (ogPrice && !Number.isNaN(Number(ogPrice))) {
    return { price: Number(ogPrice), currency, title, method: 'meta' };
  }
  return { price: null };
}

function parseFallbackPrice(html: string): { price: number | null; method?: string } {
  const patterns = [
    /(€|EUR)\s?([0-9]{1,5}[\.,][0-9]{2})/i,
    /([0-9]{1,5}[\.,][0-9]{2})\s?(€|EUR)/i,
    /"price"\s*:\s*"?([0-9]{1,5}[\.,][0-9]{2})"?/i
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      const value = Number(match[2] || match[1]);
      if (!Number.isNaN(value)) return { price: value, method: 'regex' };
    }
  }
  return { price: null };
}

export async function POST(request: Request) {
  try {
    const { url } = (await request.json()) as { url?: string };

    if (!url) {
      return Response.json({ error: 'URL is required.', foundPrice: null, url: '' }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AlphaSignal/1.0; +https://example.com)'
      },
      cache: 'no-store'
    });

    const html = await response.text();
    const jsonLd = parseJsonLdPrice(html);
    const meta = parseMetaPrice(html);
    const fallback = parseFallbackPrice(html);

    const foundPrice = jsonLd.price ?? meta.price ?? fallback.price;
    const currency = jsonLd.currency || meta.currency || 'EUR';
    const title = jsonLd.title || meta.title;
    const method = jsonLd.method || meta.method || fallback.method || 'unknown';
    const hostname = new URL(url).hostname;

    return Response.json({
      url,
      foundPrice,
      currency,
      title,
      method,
      source: hostname,
      error: foundPrice === null ? 'No price was detected on that page.' : undefined
    });
  } catch (error) {
    return Response.json(
      {
        url: '',
        foundPrice: null,
        error: error instanceof Error ? error.message : 'Unknown scraping error.'
      },
      { status: 500 }
    );
  }
}
