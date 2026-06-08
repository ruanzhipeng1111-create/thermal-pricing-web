import { formatMoney } from "../lib/format";
import type { ZkhCommonSize } from "../types";

type ZkhCommonSizeListProps = {
  sizes: ZkhCommonSize[];
  onSelect: (size: ZkhCommonSize) => void;
};

export default function ZkhCommonSizeList({ sizes, onSelect }: ZkhCommonSizeListProps) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="panel-kicker">常用尺寸</p>
          <h2>通货规格快捷入口</h2>
        </div>
      </div>

      <div className="chip-list">
        {sizes.slice(0, 10).map((item) => (
          <button className="size-chip" key={item.sku} onClick={() => onSelect(item)} type="button">
            {item.width}×{item.height} / {item.sheets}张
          </button>
        ))}
      </div>

      <div className="rank-list">
        {sizes.slice(0, 10).map((item) => (
          <button className="rank-row" key={`${item.sku}-rank`} onClick={() => onSelect(item)} type="button">
            <span>{item.spec}</span>
            <span>{item.productName}</span>
            <span>参考采购价 {formatMoney(item.supplierPrice)}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
