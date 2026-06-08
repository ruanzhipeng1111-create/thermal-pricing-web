import type { ZkhMaterialConfig, ZkhQuoteFormInput } from "../types";

type ZkhInputPanelProps = {
  input: ZkhQuoteFormInput;
  materials: ZkhMaterialConfig[];
  onChange: <K extends keyof ZkhQuoteFormInput>(key: K, value: ZkhQuoteFormInput[K]) => void;
  onReset: () => void;
};

export default function ZkhInputPanel({ input, materials, onChange, onReset }: ZkhInputPanelProps) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <h2>客户销售价计算</h2>
        </div>
        <button className="ghost-button" onClick={onReset} type="button">
          重置
        </button>
      </div>

      <div className="input-grid">
        <label>
          材料
          <select value={input.material} onChange={(event) => onChange("material", event.target.value)}>
            {materials.map((item) => (
              <option key={item.material} value={item.material}>
                {item.material}
              </option>
            ))}
          </select>
        </label>
        <label>
          宽度(mm)
          <input
            aria-label="震坤行宽度(mm)"
            inputMode="decimal"
            placeholder="例如 80"
            value={input.width}
            onChange={(event) => onChange("width", event.target.value)}
          />
        </label>
        <label>
          高度(mm)
          <input
            aria-label="震坤行高度(mm)"
            inputMode="decimal"
            placeholder="例如 50"
            value={input.height}
            onChange={(event) => onChange("height", event.target.value)}
          />
        </label>
        <label>
          每卷张数
          <input
            aria-label="震坤行每卷张数"
            inputMode="numeric"
            placeholder="例如 1000"
            value={input.sheets}
            onChange={(event) => onChange("sheets", event.target.value)}
          />
        </label>
        <label>
          卷数
          <input
            aria-label="震坤行卷数"
            inputMode="numeric"
            placeholder="默认 1"
            value={input.rolls}
            onChange={(event) => onChange("rolls", event.target.value)}
          />
        </label>
      </div>

      <p className="panel-tip">加工价档位按整单总面积判断；卷数不填或填错时按 1 卷计算。</p>
    </section>
  );
}
