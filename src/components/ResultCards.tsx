import type { QuoteResult } from "../types";
import { formatMoney, formatNumber } from "../lib/format";

type ResultCardsProps = {
  result: QuoteResult | null;
};

const emptyCards = [
  ["我家理论价", "填完宽、高、张数后自动计算"],
  ["竞品最低价", "会同步显示同尺寸市场底价"],
  ["建议常规价", "根据我家理论价和竞品均价给出"],
];

export default function ResultCards({ result }: ResultCardsProps) {
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
    { title: "我家面积(㎡)", value: formatNumber(result.area, 3), tone: "neutral" },
    { title: "我家加工价", value: formatMoney(result.processPrice), tone: "neutral" },
    { title: "我家理论价", value: formatMoney(result.quote), tone: "primary" },
    { title: "竞品最低价", value: formatMoney(result.minCompetitorPrice), tone: "success" },
    { title: "竞品均价", value: formatMoney(result.avgCompetitorPrice), tone: "neutral" },
    { title: "建议下限", value: formatMoney(result.suggestedFloor), tone: "warning" },
    { title: "建议常规价", value: formatMoney(result.suggestedRegular), tone: "primary" },
  ];

  return (
    <section className="result-grid">
      {cards.map((card) => (
        <article className={`result-card tone-${card.tone}`} key={card.title}>
          <p className="result-label">{card.title}</p>
          <p className="result-value">{card.value}</p>
        </article>
      ))}
    </section>
  );
}
