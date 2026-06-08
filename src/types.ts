export type PricingConfig = {
  material: string;
  materialPrice: number;
  edgeMm: number;
  gapMm: number;
  processLt100: number;
  process100To500: number;
  process500To2000: number;
};

export type CommonSizeSummary = {
  sizeKey: string;
  shortSide: number;
  longSide: number;
  qty: number;
  competitorCount: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  competitorPrices: Record<string, number | null>;
  competitorNotes: Record<string, string>;
};

export type CompetitorDetail = {
  competitor: string;
  title: string;
  sku: string;
  originalPrice: number;
  packCount: number;
  normalizedUnitPrice: number;
  width: number;
  height: number;
  shortSide: number;
  longSide: number;
  qty: number;
  sizeKey: string;
  orientation: string;
  rows: string;
  packageType: string;
};

export type QuoteInput = {
  material: string;
  width: string;
  height: string;
  qty: string;
  rows: string;
  orientation: string;
  packageType: string;
};

export type QuoteResult = {
  area: number;
  materialPrice: number;
  processPrice: number;
  quote: number;
  suggestedFloor: number;
  suggestedRegular: number;
  minCompetitorPrice: number | null;
  avgCompetitorPrice: number | null;
  maxCompetitorPrice: number | null;
};

export type ZkhMaterialConfig = {
  material: string;
  materialPrice: number;
  edgeMm: number;
  gapMm: number;
  processLt100: number;
  process100To300: number;
  process300To2000: number;
  processGte2000: number;
};

export type ZkhQuoteInput = {
  width: number;
  height: number;
  sheets: number;
  rolls: number;
};

export type ZkhQuoteFormInput = {
  material: string;
  width: string;
  height: string;
  sheets: string;
  rolls: string;
};

export type ZkhCommonSize = {
  sku: string;
  productName: string;
  model: string;
  spec: string;
  unit: string;
  width: number;
  height: number;
  sheets: number;
  supplierPrice: number;
};

export type ZkhTradePrice = {
  productName: string;
  model: string;
  spec: string;
  unit: string;
  width: number;
  height: number;
  sheets: number;
  area: number;
  materialPrice: number;
  processPrice: number;
  purchasePrice: number;
};
