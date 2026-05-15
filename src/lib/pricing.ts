import type { PricingConfig } from "../types";

export function calculateArea(width: number, height: number, qty: number, config: PricingConfig) {
  return Number((((width + config.edgeMm) / 1000) * ((height + config.gapMm) / 1000) * qty).toFixed(3));
}

export function getProcessPriceByArea(area: number, config: PricingConfig) {
  if (area < 100) {
    return config.processLt100;
  }
  if (area <= 500) {
    return config.process100To500;
  }
  return config.process500To2000;
}

export function calculateQuote(width: number, height: number, qty: number, config: PricingConfig) {
  const area = calculateArea(width, height, qty, config);
  const processPrice = getProcessPriceByArea(area, config);
  const quote = Number((area * (config.materialPrice + processPrice)).toFixed(2));

  return { area, processPrice, quote };
}

export function buildSuggestedPrices(quote: number, minCompetitorPrice: number | null, avgCompetitorPrice: number | null) {
  const suggestedFloor = Number(Math.max(quote, minCompetitorPrice ?? quote).toFixed(2));
  const suggestedRegular = Number(Math.max(quote, avgCompetitorPrice ?? quote).toFixed(2));

  return { suggestedFloor, suggestedRegular };
}
