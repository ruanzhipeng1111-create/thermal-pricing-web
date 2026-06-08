import ZkhPricingModule from "./ZkhPricingModule";

export default function ZkhPricingPage() {
  return (
    <main className="app-shell">
      <div className="page-stack">
        <header className="hero-card">
          <h1>震坤行材料客户报价计算器</h1>
          <p className="hero-copy">
            客户报价以“报价说明”参数为准；震坤行通货价和另外供应商价只作为采购参考与规格套用。
          </p>
        </header>
        <ZkhPricingModule />
      </div>
    </main>
  );
}
