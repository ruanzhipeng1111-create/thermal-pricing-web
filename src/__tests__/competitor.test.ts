import details from "../data/competitor-details.json";
import summaries from "../data/competitor-summary.json";
import { buildSizeKey, filterDetails, findSummaryBySize } from "../lib/competitor";

describe("competitor helpers", () => {
  it("normalizes width and height into a size key", () => {
    expect(buildSizeKey({ width: 40, height: 30, qty: 800 })).toBe("30x40x800");
  });

  it("finds summary with just width height qty", () => {
    const found = findSummaryBySize(summaries, { width: 40, height: 30, qty: 800 });
    expect(found?.sizeKey).toBe("30x40x800");
    expect(found?.competitorCount).toBe(7);
  });

  it("narrows detail results when optional filters match", () => {
    const found = filterDetails(details, {
      material: "热胶热敏纸不干胶",
      width: "40",
      height: "30",
      qty: "800",
      rows: "1排",
      orientation: "横版",
      packageType: "",
    });
    expect(found.length).toBeGreaterThan(0);
    expect(found.every((item) => item.orientation === "横版" && item.rows === "1排")).toBe(true);
  });

  it("falls back to size matches when optional filters miss", () => {
    const found = filterDetails(details, {
      material: "热胶热敏纸不干胶",
      width: "40",
      height: "30",
      qty: "800",
      rows: "3排",
      orientation: "",
      packageType: "",
    });
    expect(found.length).toBeGreaterThan(0);
    expect(found.some((item) => item.sizeKey === "30x40x800")).toBe(true);
  });
});
