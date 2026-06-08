import { calculateZkhQuote, getZkhProcessTier } from "../lib/zkhPricing";

const copperConfig = {
  material: "铜版纸不干胶",
  materialPrice: 1.55,
  edgeMm: 4,
  gapMm: 3,
  processLt100: 0.8,
  process100To300: 0.6,
  process300To2000: 0.45,
  processGte2000: 0.4,
};

describe("zkhPricing", () => {
  it("calculates a customer quote from the Excel material table", () => {
    expect(calculateZkhQuote({ width: 80, height: 50, sheets: 1000, rolls: 1 }, copperConfig)).toEqual({
      unitArea: 4.452,
      totalArea: 4.452,
      processPrice: 0.8,
      processTierLabel: "100平以下",
      unitQuote: 10.46,
      totalQuote: 10.46,
    });
  });

  it("selects the process tier from total area after multiplying rolls", () => {
    expect(calculateZkhQuote({ width: 80, height: 50, sheets: 1000, rolls: 100 }, copperConfig)).toMatchObject({
      totalArea: 445.2,
      processPrice: 0.45,
      processTierLabel: "300-2000平",
      unitQuote: 8.9,
      totalQuote: 890.4,
    });
  });

  it("uses inclusive lower bounds for tier boundaries", () => {
    expect(getZkhProcessTier(99.999, copperConfig).label).toBe("100平以下");
    expect(getZkhProcessTier(100, copperConfig).label).toBe("100-300平");
    expect(getZkhProcessTier(300, copperConfig).label).toBe("300-2000平");
    expect(getZkhProcessTier(2000, copperConfig).label).toBe("2000平以上");
  });
});
