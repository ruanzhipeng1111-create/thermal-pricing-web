import type { QuoteInput } from "../types";

type InputPanelProps = {
  input: QuoteInput;
  onChange: <K extends keyof QuoteInput>(key: K, value: QuoteInput[K]) => void;
  onReset: () => void;
};

export default function InputPanel({ input, onChange, onReset }: InputPanelProps) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="panel-kicker">输入区</p>
          <h2>快速报价</h2>
        </div>
        <button className="ghost-button" onClick={onReset} type="button">
          重置
        </button>
      </div>

      <div className="input-grid">
        <label>
          材质
          <input value={input.material} readOnly />
        </label>
        <label>
          宽度(mm)
          <input
            aria-label="宽度(mm)"
            inputMode="numeric"
            placeholder="例如 80"
            value={input.width}
            onChange={(event) => onChange("width", event.target.value)}
          />
        </label>
        <label>
          高度(mm)
          <input
            aria-label="高度(mm)"
            inputMode="numeric"
            placeholder="例如 50"
            value={input.height}
            onChange={(event) => onChange("height", event.target.value)}
          />
        </label>
        <label>
          张数
          <input
            aria-label="张数"
            inputMode="numeric"
            placeholder="例如 1000"
            value={input.qty}
            onChange={(event) => onChange("qty", event.target.value)}
          />
        </label>
        <label>
          排数(可选)
          <select value={input.rows} onChange={(event) => onChange("rows", event.target.value)}>
            <option value="">不限</option>
            <option value="1排">单排 / 1排</option>
            <option value="2排">双排 / 2排</option>
            <option value="3排">三排 / 3排</option>
          </select>
        </label>
        <label>
          版向(可选)
          <select value={input.orientation} onChange={(event) => onChange("orientation", event.target.value)}>
            <option value="">不限</option>
            <option value="横版">横版</option>
            <option value="竖版">竖版</option>
          </select>
        </label>
        <label>
          包装(可选)
          <select value={input.packageType} onChange={(event) => onChange("packageType", event.target.value)}>
            <option value="">不限</option>
            <option value="卷">卷装</option>
            <option value="叠">叠装</option>
          </select>
        </label>
      </div>

      <p className="panel-tip">第一版只要求宽、高、张数必填；其余字段仅用于缩小竞品候选范围。</p>
    </section>
  );
}
