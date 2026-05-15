import type { CommonSizeSummary } from "../types";
import { formatMoney, labelFromSizeKey } from "../lib/format";

type CompetitorTableProps = {
  summaries: CommonSizeSummary[];
  onOpenDetails: (sizeKey: string) => void;
};

export default function CompetitorTable({ summaries, onOpenDetails }: CompetitorTableProps) {
  return (
    <section className="panel table-panel">
      <div className="panel-heading">
        <div>
          <p className="panel-kicker">竞品横向对比</p>
          <h2>同尺寸价格</h2>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>通货尺寸</th>
              <th>覆盖竞品数</th>
              <th>最低价</th>
              <th>最高价</th>
              <th>均价</th>
              <th>各家价格</th>
              <th>明细</th>
            </tr>
          </thead>
          <tbody>
            {summaries.map((summary) => (
              <tr key={summary.sizeKey}>
                <td>{labelFromSizeKey(summary.sizeKey)}</td>
                <td>{summary.competitorCount}</td>
                <td className="money-cell success">{formatMoney(summary.minPrice)}</td>
                <td className="money-cell">{formatMoney(summary.maxPrice)}</td>
                <td className="money-cell">{formatMoney(summary.avgPrice)}</td>
                <td>
                  <div className="price-pill-wrap">
                    {Object.entries(summary.competitorPrices)
                      .filter(([, price]) => price !== null)
                      .slice(0, 8)
                      .map(([competitor, price]) => (
                        <span className="price-pill" key={`${summary.sizeKey}-${competitor}`}>
                          {competitor} {formatMoney(price)}
                        </span>
                      ))}
                  </div>
                </td>
                <td>
                  <button className="inline-button" onClick={() => onOpenDetails(summary.sizeKey)} type="button">
                    查看SKU
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
