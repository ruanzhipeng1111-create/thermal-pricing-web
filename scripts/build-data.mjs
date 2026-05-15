import fs from "node:fs/promises";
import path from "node:path";

const sourcePath = "/Users/ryan/Documents/智能体/.codex-tmp/top-thermal/parsed.json";
const targetDir = "/Users/ryan/Documents/智能体/thermal-pricing-web/src/data";

const ownPricing = {
  material: "热胶热敏纸不干胶",
  materialPrice: 1.6,
  edgeMm: 4,
  gapMm: 3,
  processLt100: 1,
  process100To500: 0.6,
  process500To2000: 0.45,
};

const raw = JSON.parse(await fs.readFile(sourcePath, "utf8"));

const summary = raw.summary_rows.map((row) => ({
  sizeKey: row.size_key,
  shortSide: row.short_side,
  longSide: row.long_side,
  qty: row.qty,
  competitorCount: row.competitor_count,
  minPrice: row.min_price,
  maxPrice: row.max_price,
  avgPrice: row.avg_price,
  competitorPrices: Object.fromEntries(
    raw.competitors.map((competitor) => [competitor, row[`${competitor}_price`] === "" ? null : row[`${competitor}_price`]]),
  ),
  competitorNotes: Object.fromEntries(
    raw.competitors.map((competitor) => [competitor, row[`${competitor}_note`] ?? ""]),
  ),
}));

const details = raw.detail_rows.map((row) => ({
  competitor: row.competitor,
  title: row.title,
  sku: row.sku,
  originalPrice: row.original_price,
  packCount: row.pack_count,
  normalizedUnitPrice: row.normalized_unit_price,
  width: row.width,
  height: row.height,
  shortSide: row.short_side,
  longSide: row.long_side,
  qty: row.qty,
  sizeKey: row.size_key,
  orientation: row.orientation,
  rows: row.rows,
  packageType: row.package_type,
}));

await fs.mkdir(targetDir, { recursive: true });
await fs.writeFile(path.join(targetDir, "competitor-summary.json"), JSON.stringify(summary, null, 2));
await fs.writeFile(path.join(targetDir, "competitor-details.json"), JSON.stringify(details, null, 2));
await fs.writeFile(path.join(targetDir, "pricing-config.json"), JSON.stringify(ownPricing, null, 2));

console.log(
  JSON.stringify(
    {
      summaryRows: summary.length,
      detailRows: details.length,
      outputDir: targetDir,
    },
    null,
    2,
  ),
);
