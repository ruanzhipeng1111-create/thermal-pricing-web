import { formatMoney, formatNumber } from "../lib/format";
import type { ZkhCommonSize, ZkhTradePrice } from "../types";

type ZkhTradeReferenceTableProps = {
  prices: ZkhTradePrice[];
  onSelect: (size: ZkhCommonSize) => void;
};

type ZkhSupplierReferenceTableProps = {
  references: ZkhCommonSize[];
  onSelect: (size: ZkhCommonSize) => void;
};

export function ZkhTradeReferenceTable({ prices, onSelect }: ZkhTradeReferenceTableProps) {
  return (
    <section className="panel table-panel">
      <div className="panel-heading">
        <div>
          <p className="panel-kicker">Sheet2</p>
          <h2>震坤行通货价格参考</h2>
        </div>
      </div>
      <p className="panel-tip">只作为通货采购价参考，不覆盖上方客户报价公式。</p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>产品</th>
              <th>规格</th>
              <th>面积</th>
              <th>原材料平方价</th>
              <th>加工费</th>
              <th>成品采购价</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((item) => (
              <tr key={`${item.productName}-${item.spec}`}>
                <td>{item.productName}</td>
                <td>
                  <strong>{item.spec}</strong>
                </td>
                <td>{formatNumber(item.area, 3)}㎡</td>
                <td>{formatMoney(item.materialPrice)}</td>
                <td>{formatMoney(item.processPrice)}</td>
                <td className="money-cell success">{formatMoney(item.purchasePrice)}</td>
                <td>
                  <button
                    className="inline-button"
                    onClick={() =>
                      onSelect({
                        sku: item.spec,
                        productName: item.productName,
                        model: item.model,
                        spec: item.spec,
                        unit: item.unit,
                        width: item.width,
                        height: item.height,
                        sheets: item.sheets,
                        supplierPrice: item.purchasePrice,
                      })
                    }
                    type="button"
                  >
                    套用
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

export function ZkhSupplierReferenceTable({ references, onSelect }: ZkhSupplierReferenceTableProps) {
  return (
    <section className="panel table-panel">
      <div className="panel-heading">
        <div>
          <p className="panel-kicker">Sheet3</p>
          <h2>另外供应商价格参考</h2>
        </div>
      </div>
      <p className="panel-tip">只作为外部供应商采购价参考，报价仍以上方报价说明为准。</p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>品名</th>
              <th>SKU</th>
              <th>规格</th>
              <th>第一供应商采购价</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {references.map((item) => (
              <tr key={item.sku}>
                <td>{item.productName}</td>
                <td>{item.sku}</td>
                <td>
                  <strong>{item.spec}</strong>
                </td>
                <td className="money-cell success">{formatMoney(item.supplierPrice)}</td>
                <td>
                  <button className="inline-button" onClick={() => onSelect(item)} type="button">
                    套用
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
