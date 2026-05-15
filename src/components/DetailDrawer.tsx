import type { CompetitorDetail } from "../types";
import { formatMoney } from "../lib/format";

type DetailDrawerProps = {
  open: boolean;
  sizeKey: string | null;
  details: CompetitorDetail[];
  onClose: () => void;
};

export default function DetailDrawer({ open, sizeKey, details, onClose }: DetailDrawerProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="drawer-backdrop" onClick={onClose} role="presentation">
      <aside className="drawer" onClick={(event) => event.stopPropagation()}>
        <div className="panel-heading">
          <div>
            <p className="panel-kicker">SKU 明细</p>
            <h2>{sizeKey ?? "当前尺寸"}</h2>
          </div>
          <button className="ghost-button" onClick={onClose} type="button">
            关闭
          </button>
        </div>

        {details.length === 0 ? (
          <p className="drawer-empty">暂无明细数据。</p>
        ) : (
          <div className="drawer-list">
            {details.map((detail) => (
              <article className="detail-card" key={`${detail.competitor}-${detail.sku}`}>
                <div className="detail-card-header">
                  <strong>{detail.competitor}</strong>
                  <span>{formatMoney(detail.normalizedUnitPrice)}</span>
                </div>
                <p>{detail.sku}</p>
                <div className="detail-meta">
                  <span>{detail.orientation || "未标注版向"}</span>
                  <span>{detail.rows || "未标注排数"}</span>
                  <span>{detail.packageType || "未标注包装"}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </aside>
    </div>
  );
}
