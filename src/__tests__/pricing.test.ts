import config from "../data/pricing-config.json";
import { buildSuggestedPrices, calculateQuote } from "../lib/pricing";

describe("pricing", () => {
  it("calculates 80x50x1000 correctly", () => {
    expect(calculateQuote(80, 50, 1000, config)).toEqual({
      area: 4.452,
      processPrice: 1,
      quote: 11.58,
    });
  });

  it("calculates 100x100x500 correctly", () => {
    expect(calculateQuote(100, 100, 500, config).quote).toBe(13.93);
  });

  it("calculates 100x150x500 correctly", () => {
    expect(calculateQuote(100, 150, 500, config).quote).toBe(20.69);
  });

  it("builds suggested prices against competitor range", () => {
    expect(buildSuggestedPrices(5.12, 4.9, 6.47)).toEqual({
      suggestedFloor: 5.12,
      suggestedRegular: 6.47,
    });
  });
});
