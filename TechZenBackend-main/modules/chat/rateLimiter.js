/**
 * In-memory sliding window rate limiter for chatbot endpoints
 * Limits requests per client IP to safeguard resources and prevent abuse.
 */

const ipRequests = new Map();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 30; // Max requests per window per IP

// Periodically purge stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipRequests.entries()) {
    if (now - record.startTime > WINDOW_MS * 2) {
      ipRequests.delete(ip);
    }
  }
}, 5 * 60 * 1000).unref();

export function checkRateLimit(req) {
  const clientIp =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown-ip";

  const now = Date.now();
  let record = ipRequests.get(clientIp);

  if (!record || now - record.startTime > WINDOW_MS) {
    record = { count: 1, startTime: now };
    ipRequests.set(clientIp, record);
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (record.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((record.startTime + WINDOW_MS - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.max(retryAfter, 1)
    };
  }

  record.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS - record.count };
}
