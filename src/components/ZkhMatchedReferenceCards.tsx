import { formatMoney, formatNumber } from "../lib/format";
import type { ZkhCommonSize, ZkhTradePrice } from "../types";

type ZkhMatchedReferenceCardsProps = {
  tradePrices: ZkhTradePrice[];
  supplierReferences: ZkhCommonSize[];
};

export default function ZkhMatchedReferenceCards({ tradePrices, supplierReferences }: ZkhMatchedReferenceCardsProps) {
  if (tradePrices.length === 0 && supplierReferences.length === 0) {
    return null;
  }

  return (
    <aside className="matched-reference-panel">
      <div className="matched-reference-heading">
        <p className="formula-note-label">当前规格参考价格</p>
        <p className="matched-reference-tip">以下价格仅作采购参考，客户报价仍以上方报价说明公式为准。</p>
      </div>

      <div className="matched-reference-grid">
        {tradePrices.map((item) => (
          <article className="matched-reference-card" key={`trade-${item.productName}-${item.spec}`}>
            <p className="matched-reference-source">命中震坤行通货价格</p>
            <h3>{item.spec}</h3>
            <p>{item.productName}</p>
            <dl>
              <div>
                <dt>参考采购价</dt>
                <dd>{formatMoney(item.purchasePrice)}</dd>
              </div>
              <div>
                <dt>含底纸面积</dt>
                <dd>{formatNumber(item.area, 3)}㎡</dd>
              </div>
            </dl>
          </article>
        ))}

        {supplierReferences.map((item) => (
          <article className="matched-reference-card" key={`supplier-${item.sku}`}>
            <p className="matched-reference-source">命中另外供应商价格</p>
            <h3>{item.spec}</h3>
            <p>{item.productName}</p>
            <dl>
              <div>
                <dt>参考采购价</dt>
                <dd>{formatMoney(item.supplierPrice)}</dd>
              </div>
              <div>
                <dt>SKU</dt>
                <dd>{item.sku}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </aside>
  );
}
