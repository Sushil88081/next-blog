const map = new Map<string, number>();

export function rateLimit(ip: string) {
  const now = Date.now();
  const last = map.get(ip) || 0;

  if (now - last < 10000) return false; // 10 sec
  map.set(ip, now);
  return true;
}
