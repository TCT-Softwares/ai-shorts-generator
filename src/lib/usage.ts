const usageMap = new Map<string, number>();

export function checkUsage(userId: string, isPro: boolean) {
  const limit = isPro ? 9999 : 5;

  const current = usageMap.get(userId) || 0;

  if (current >= limit) return false;

  usageMap.set(userId, current + 1);
  return true;
}
