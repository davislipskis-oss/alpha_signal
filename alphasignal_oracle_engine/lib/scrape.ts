import { load } from 'cheerio';

export type PriceScrapeResult = {
  url: string;
  sourceHost: string;
  title: string | null;
  price: number | null;
  currency: string | null;
  method: string;
  rawSnippet?: string | null;
  error?: string;
};

function normalizePrice(value: string) {
  const cleaned = value
    .replace(/\u00a0/g, ' ')
    .replace(/[A-Za-z$£]/g, '')
    .replace(/€/g, '')
    .replace(/\s+/g, '')
    .replace(/,(?=\d{3}(\D|$))/g, '')
    .replace(/,(?=\d{2}$)/, '.')
    .replace(/(?<=\d)\.(?=\d{3}(\D|$))/g, '');

  const match = cleaned.match(/\d+(?:\.\d+)?/);
  if (!match) return null;
  const parsed = Number(match[0]);
  return Number.isFinite(parsed) ? parsed : null;
}

function extractFromJsonLd(html: string) {
  const scripts = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const script of scripts) {
    const text = script[1]?.trim();
    if (!text) continue;
    try {
      const parsed = JSON.parse(text);
      const nodes = Array.isArray(parsed) ? parsed : parsed['@graph'] ? parsed['@graph'] : [parsed];
      for (const node of nodes) {
        const offers = node?.offers ?? node?.mainEntity?.offers;
        const title = node?.name ?? null;
        if (!offers) continue;
        const candidate = Array.isArray(offers) ? offers[0] : offers;
        const price = normalizePrice(String(candidate?.price ?? ''));
        const currency = candidate?.priceCurrency ?? null;
        if (price !== null) {
          return { title, price, currency, method: 'json-ld' };
        }
      }
    } catch {
      continue;
    }
  }
  return null;
}

function extractFromMeta($: ReturnType<typeof load>) {
  const title = $('meta[property="og:title"]').attr('content') || $('title').text() || null;
  const candidates = [
    $('meta[property="product:price:amount"]').attr('content'),
    $('meta[property="og:price:amount"]').attr('content'),
    $('meta[name="twitter:data1"]').attr('content')
  ];
  for (const candidate of candidates) {
    if (!candidate) continue;
    const price = normalizePrice(candidate);
    if (price !== null) {
      const currency = $('meta[property="product:price:currency"]').attr('content') || 'EUR';
      return { title, price, currency, method: 'meta' };
    }
  }
  return null;
}

function extractBySelectors($: ReturnType<typeof load>) {
  const selectors = [
    '[itemprop="price"]',
    '.price',
    '.product-price',
    '.current-price',
    '[data-price]',
    '.sales .value',
    '.woocommerce-Price-amount',
    '.money'
  ];
  const title = $('meta[property="og:title"]').attr('content') || $('h1').first().text().trim() || $('title').text() || null;

  for (const selector of selectors) {
    const element = $(selector).first();
    const text = element.attr('content') || element.attr('data-price') || element.text();
    if (!text) continue;
    const price = normalizePrice(text);
    if (price !== null) {
      return { title, price, currency: text.includes('$') ? 'USD' : 'EUR', method: `selector:${selector}`, rawSnippet: text.trim() };
    }
  }
  return null;
}

export async function scrapePrice(url: string): Promise<PriceScrapeResult> {
  try {
    const response = await fetch(url, {
      headers: {
        'user-agent': 'Mozilla/5.0 (compatible; AlphaSignalOracle/1.0; +https://vercel.app)',
        accept: 'text/html,application/xhtml+xml'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      return {
        url,
        sourceHost: new URL(url).hostname,
        title: null,
        price: null,
        currency: null,
        method: 'fetch',
        error: `HTTP ${response.status}`
      };
    }

    const html = await response.text();
    const $ = load(html);

    const jsonLd = extractFromJsonLd(html);
    if (jsonLd) {
      return { url, sourceHost: new URL(url).hostname, ...jsonLd };
    }

    const meta = extractFromMeta($);
    if (meta) {
      return { url, sourceHost: new URL(url).hostname, ...meta };
    }

    const selectors = extractBySelectors($);
    if (selectors) {
      return { url, sourceHost: new URL(url).hostname, ...selectors };
    }

    return {
      url,
      sourceHost: new URL(url).hostname,
      title: $('title').text() || null,
      price: null,
      currency: null,
      method: 'not-found',
      error: 'No readable price found on page.'
    };
  } catch (error) {
    return {
      url,
      sourceHost: (() => {
        try { return new URL(url).hostname; } catch { return 'unknown'; }
      })(),
      title: null,
      price: null,
      currency: null,
      method: 'exception',
      error: error instanceof Error ? error.message : 'Unknown scraping error'
    };
  }
}
