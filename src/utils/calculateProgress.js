export function calculateProgress(items = []) {
    if (!items.length) return 0;

    const bought = items.filter((item) => item.status === 'Bought').length;
  return Math.round((bought / items.length) * 100);
}