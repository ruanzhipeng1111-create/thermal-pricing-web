import type { CommonSizeSummary, CompetitorDetail, QuoteInput } from "../types";

export function normalizeSides(width: number, height: number) {
  return width <= height ? { shortSide: width, longSide: height } : { shortSide: height, longSide: width };
}

export function buildSizeKey(input: { width: number; height: number; qty: number }) {
  const { shortSide, longSide } = normalizeSides(input.width, input.height);
  return `${shortSide}x${longSide}x${input.qty}`;
}

export function findSummaryBySize(
  summaries: CommonSizeSummary[],
  input: { width: number; height: number; qty: number },
) {
  const sizeKey = buildSizeKey(input);
  return summaries.find((item) => item.sizeKey === sizeKey) ?? null;
}

export function filterDetails(details: CompetitorDetail[], input: QuoteInput) {
  const width = Number(input.width);
  const height = Number(input.height);
  const qty = Number(input.qty);
  if (!width || !height || !qty) {
    return [];
  }

  const sizeKey = buildSizeKey({ width, height, qty });
  const sizeMatches = details.filter((detail) => detail.sizeKey === sizeKey);

  const narrowed = sizeMatches.filter((detail) => {
    if (input.rows && detail.rows !== input.rows) {
      return false;
    }
    if (input.orientation && detail.orientation !== input.orientation) {
      return false;
    }
    if (input.packageType && detail.packageType !== input.packageType) {
      return false;
    }
    return true;
  });

  return narrowed.length > 0 ? narrowed : sizeMatches;
}

export function getFeaturedSizes(summaries: CommonSizeSummary[], limit = 12) {
  return [...summaries]
    .sort((a, b) => b.competitorCount - a.competitorCount || a.avgPrice - b.avgPrice)
    .slice(0, limit);
}
