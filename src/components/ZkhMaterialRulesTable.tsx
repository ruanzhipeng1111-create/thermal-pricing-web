import { formatMoney } from "../lib/format";
import type { ZkhMaterialConfig } from "../types";

type ZkhMaterialRulesTableProps = {
  materials: ZkhMaterialConfig[];
};

export default function ZkhMaterialRulesTable({ materials }: ZkhMaterialRulesTableProps) {
  return (
    <section className="panel table-panel">
      <div className="panel-heading">
        <div>
          <p className="panel-kicker">Sheet1</p>
          <h2>报价说明主规则</h2>
        </div>
      </div>
      <p className="panel-tip rule-priority">客户报价以报价说明参数为准</p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>材料</th>
              <th>材料平方价</th>
              <th>边距</th>
              <th>跳距</th>
              <th>100平以下</th>
              <th>100-300平</th>
              <th>300-2000平</th>
              <th>2000平以上</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((item) => (
              <tr key={item.material}>
                <td>
                  <strong>{item.material}</strong>
                </td>
                <td>{formatMoney(item.materialPrice)}</td>
                <td>{item.edgeMm}mm</td>
                <td>{item.gapMm}mm</td>
                <td>{formatMoney(item.processLt100)}</td>
                <td>{formatMoney(item.process100To300)}</td>
                <td>{formatMoney(item.process300To2000)}</td>
                <td>{formatMoney(item.processGte2000)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
