export default function EmptyState() {
  return (
    <section className="panel empty-state">
      <div className="empty-state-head">
        <p className="panel-kicker">使用说明</p>
        <p className="empty-state-lead">按下面 3 步操作，就能快速得到报价结果和同尺寸竞品参考。</p>
      </div>
      <div className="guide-steps">
        <article className="guide-step">
          <span className="guide-index">1</span>
          <div className="guide-copy">
            <h3>先填尺寸</h3>
            <p>输入宽、高、张数，或直接点击右侧高频尺寸。</p>
          </div>
        </article>
        <article className="guide-step">
          <span className="guide-index">2</span>
          <div className="guide-copy">
            <h3>自动报价</h3>
            <p>系统会自动计算我家理论报价，排数和版向只是辅助筛选。</p>
          </div>
        </article>
        <article className="guide-step">
          <span className="guide-index">3</span>
          <div className="guide-copy">
            <h3>查看对比</h3>
            <p>继续查看竞品均价、最低价，点“查看 SKU”回查原始明细。</p>
          </div>
        </article>
      </div>
    </section>
  );
}
