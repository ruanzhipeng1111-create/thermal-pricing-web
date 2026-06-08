import { formatMoney, formatNumber } from "../lib/format";
import type { ZkhCommonSize, ZkhMaterialConfig, ZkhTradePrice } from "../types";
import ZkhMatchedReferenceCards from "./ZkhMatchedReferenceCards";

type ZkhResult = {
  unitArea: number;
  totalArea: number;
  processPrice: number;
  processTierLabel: string;
  unitQuote: number;
  totalQuote: number;
};

type ZkhResultCardsProps = {
  result: ZkhResult | null;
  material: ZkhMaterialConfig;
  matchedTradePrices: ZkhTradePrice[];
  matchedSupplierReferences: ZkhCommonSize[];
};

const emptyCards = [
  ["建议单卷报价", "填完宽、高、张数后自动计算"],
  ["整单建议报价", "卷数默认按 1 卷计算"],
  ["加工价档位", "按整单总面积匹配"],
];

export default function ZkhResultCards({
  result,
  material,
  matchedTradePrices,
  matchedSupplierReferences,
}: ZkhResultCardsProps) {
  if (!result) {
    return (
      <section className="result-grid">
        {emptyCards.map(([title, description]) => (
          <article className="result-card empty-card" key={title}>
            <p className="result-label">{title}</p>
            <p className="result-empty">{description}</p>
          </article>
        ))}
      </section>
    );
  }

  const cards = [
    { title: "建议单卷报价", value: formatMoney(result.unitQuote), tone: "primary", size: "hero" },
    { title: "整单建议报价", value: formatMoney(result.totalQuote), tone: "primary-soft", size: "hero" },
    { title: "加工价档位", value: result.processTierLabel, tone: "success", size: "standard" },
    { title: "单卷面积(㎡)", value: formatNumber(result.unitArea, 3), tone: "neutral", size: "standard" },
    { title: "整单面积(㎡)", value: formatNumber(result.totalArea, 3), tone: "neutral", size: "standard" },
    { title: "材料平方价", value: formatMoney(material.materialPrice), tone: "neutral", size: "compact" },
    { title: "加工费平方价", value: formatMoney(result.processPrice), tone: "neutral", size: "compact" },
    { title: "边距 / 跳距", value: `${material.edgeMm} / ${material.gapMm} mm`, tone: "neutral", size: "compact" },
  ];

  return (
    <section className="result-stack">
      <div className="result-grid">
        {cards.map((card) => (
          <article className={`result-card tone-${card.tone} size-${card.size}`} key={card.title}>
            <p className="result-label">{card.title}</p>
            <p className="result-value">{card.value}</p>
          </article>
        ))}
      </div>
      <aside className="formula-note">
        <p className="formula-note-label">报价公式依据</p>
        <p className="formula-note-text">
          建议报价 = ((宽 + {material.edgeMm}) / 1000 × (高 + {material.gapMm}) / 1000 × 每卷张数) ×
          (材料平方价 + 按总面积匹配的加工费)
        </p>
      </aside>
      <ZkhMatchedReferenceCards
        tradePrices={matchedTradePrices}
        supplierReferences={matchedSupplierReferences}
      />
    </section>
  );
}
