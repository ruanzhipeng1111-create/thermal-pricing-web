import ZkhCommonSizeList from "./ZkhCommonSizeList";
import ZkhInputPanel from "./ZkhInputPanel";
import ZkhMaterialRulesTable from "./ZkhMaterialRulesTable";
import { ZkhSupplierReferenceTable, ZkhTradeReferenceTable } from "./ZkhReferenceTable";
import ZkhResultCards from "./ZkhResultCards";
import { useZkhQuoteState } from "../hooks/useZkhQuoteState";

export default function ZkhPricingModule() {
  const {
    input,
    materials,
    selectedMaterial,
    quoteResult,
    commonSizes,
    tradePrices,
    supplierReferences,
    matchedTradePrices,
    matchedSupplierReferences,
    updateInput,
    applyCommonSize,
    reset,
  } = useZkhQuoteState();

  return (
    <>
      <div className="main-grid">
        <div className="left-column">
          <ZkhInputPanel input={input} materials={materials} onChange={updateInput} onReset={reset} />
          <ZkhResultCards
            result={quoteResult}
            material={selectedMaterial}
            matchedTradePrices={matchedTradePrices}
            matchedSupplierReferences={matchedSupplierReferences}
          />
        </div>
        <div className="right-column">
          <ZkhCommonSizeList sizes={commonSizes} onSelect={applyCommonSize} />
        </div>
      </div>
      <ZkhMaterialRulesTable materials={materials} />
      <ZkhTradeReferenceTable prices={tradePrices} onSelect={applyCommonSize} />
      <ZkhSupplierReferenceTable references={supplierReferences} onSelect={applyCommonSize} />
    </>
  );
}
