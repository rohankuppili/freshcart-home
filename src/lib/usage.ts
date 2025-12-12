// Lightweight local usage tracking for categories using localStorage

const STORAGE_KEY = 'category_usage_v1';

type UsageMap = Record<string, number>;

function readUsage(): UsageMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed ? parsed as UsageMap : {};
  } catch {
    return {};
  }
}

function writeUsage(map: UsageMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore write errors (e.g., storage full or disabled)
  }
}

export function recordCategoryUsage(categoryId: string, amount: number = 1) {
  if (!categoryId) return;
  const map = readUsage();
  map[categoryId] = (map[categoryId] || 0) + amount;
  writeUsage(map);
}

export function getCategoryUsageMap(): UsageMap {
  return readUsage();
}

export function getCategoryUsageScore(categoryId: string): number {
  const map = readUsage();
  return map[categoryId] || 0;
}
