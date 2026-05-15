import type { CommonSizeSummary } from "../types";
import { formatMoney, labelFromSizeKey } from "../lib/format";

type CommonSizeListProps = {
  sizes: CommonSizeSummary[];
  onSelect: (summary: CommonSizeSummary) => void;
};

export default function CommonSizeList({ sizes, onSelect }: CommonSizeListProps) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="panel-kicker">通货尺寸</p>
          <h2>高频尺寸快捷入口</h2>
        </div>
      </div>

      <div className="chip-list">
        {sizes.slice(0, 8).map((item) => (
          <button className="size-chip" key={item.sizeKey} onClick={() => onSelect(item)} type="button">
            {labelFromSizeKey(item.sizeKey)}
          </button>
        ))}
      </div>

      <div className="rank-list">
        {sizes.slice(0, 10).map((item) => (
          <button className="rank-row" key={`${item.sizeKey}-rank`} onClick={() => onSelect(item)} type="button">
            <span>{labelFromSizeKey(item.sizeKey)}</span>
            <span>{item.competitorCount} 家</span>
            <span>均价 {formatMoney(item.avgPrice)}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
