const sign = (a: number, b: number) => (a > b ? 1 : a < b ? -1 : 0);

export function calculatePoints(
  predHome: number,
  predAway: number,
  resultHome: number | null,
  resultAway: number | null
): number {
  if (resultHome === null || resultAway === null) return 0;

  if (predHome === resultHome && predAway === resultAway) return 3;
  if (sign(predHome, predAway) === sign(resultHome, resultAway)) return 1;

  return 0;
}
