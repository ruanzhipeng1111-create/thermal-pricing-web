export default function EmptyState() {
  return (
    <section className="panel empty-state">
      <div>
        <p className="panel-kicker">使用说明</p>
        <h2>先输入宽、高、张数，或者直接点一个热门尺寸</h2>
      </div>
      <ul>
        <li>只要填完宽、高、张数，就会自动计算我家理论报价。</li>
        <li>排数、横版/竖版、卷装/叠装只是辅助筛选，不是必填。</li>
        <li>点击“查看SKU”可以回查原始竞品明细。</li>
      </ul>
    </section>
  );
}
