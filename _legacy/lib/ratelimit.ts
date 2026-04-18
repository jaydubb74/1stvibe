/**
 * Simple in-memory IP rate limiter.
 *
 * Works great for a single serverless instance (Vercel edge/serverless functions
 * do share memory within a region during warm periods). For strict production
 * enforcement across all instances/regions, swap `store` for Vercel KV or
 * Upstash Redis — the interface stays identical.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const store = new Map<string, RateLimitRecord>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hour rolling window
export const RATE_LIMIT_MAX = 3; // max generations per window

/** Clean up stale keys every 10 minutes to avoid memory bloat. */
let lastCleanup = Date.now();
function maybeCleanup() {
  if (Date.now() - lastCleanup < 10 * 60 * 1000) return;
  lastCleanup = Date.now();
  const cutoff = Date.now() - WINDOW_MS;
  for (const [key, record] of store.entries()) {
    const fresh = record.timestamps.filter((t) => t > cutoff);
    if (fresh.length === 0) {
      store.delete(key);
    } else {
      record.timestamps = fresh;
    }
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  /** Minutes until the oldest request falls out of the window (only set when blocked). */
  resetInMinutes: number;
}

export function checkRateLimit(ip: string): RateLimitResult {
  maybeCleanup();

  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  const record = store.get(ip) ?? { timestamps: [] };
  // Drop timestamps outside the rolling window
  record.timestamps = record.timestamps.filter((t) => t > windowStart);

  if (record.timestamps.length >= RATE_LIMIT_MAX) {
    const oldestInWindow = record.timestamps[0];
    const resetInMs = oldestInWindow + WINDOW_MS - now;
    const resetInMinutes = Math.ceil(resetInMs / 1000 / 60);
    store.set(ip, record);
    return { allowed: false, remaining: 0, resetInMinutes };
  }

  record.timestamps.push(now);
  store.set(ip, record);

  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX - record.timestamps.length,
    resetInMinutes: 0,
  };
}
