import type { ZkhMaterialConfig, ZkhQuoteInput } from "../types";

export type ZkhProcessTier = {
  label: string;
  price: number;
};

export function calculateZkhUnitArea(width: number, height: number, sheets: number, config: ZkhMaterialConfig) {
  return Number((((width + config.edgeMm) / 1000) * ((height + config.gapMm) / 1000) * sheets).toFixed(3));
}

export function getZkhProcessTier(totalArea: number, config: ZkhMaterialConfig): ZkhProcessTier {
  if (totalArea < 100) {
    return { label: "100平以下", price: config.processLt100 };
  }
  if (totalArea < 300) {
    return { label: "100-300平", price: config.process100To300 };
  }
  if (totalArea < 2000) {
    return { label: "300-2000平", price: config.process300To2000 };
  }
  return { label: "2000平以上", price: config.processGte2000 };
}

export function calculateZkhQuote(input: ZkhQuoteInput, config: ZkhMaterialConfig) {
  const unitArea = calculateZkhUnitArea(input.width, input.height, input.sheets, config);
  const totalArea = Number((unitArea * input.rolls).toFixed(3));
  const processTier = getZkhProcessTier(totalArea, config);
  const unitQuote = Number((unitArea * (config.materialPrice + processTier.price)).toFixed(2));
  const totalQuote = Number((totalArea * (config.materialPrice + processTier.price)).toFixed(2));

  return {
    unitArea,
    totalArea,
    processPrice: processTier.price,
    processTierLabel: processTier.label,
    unitQuote,
    totalQuote,
  };
}
