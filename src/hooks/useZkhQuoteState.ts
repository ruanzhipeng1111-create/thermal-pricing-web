import { useMemo, useState } from "react";
import materialData from "../data/zkh-materials.json";
import commonSizeData from "../data/zkh-common-sizes.json";
import tradePriceData from "../data/zkh-trade-prices.json";
import { calculateZkhQuote } from "../lib/zkhPricing";
import type { ZkhCommonSize, ZkhMaterialConfig, ZkhQuoteFormInput, ZkhTradePrice } from "../types";

const materials = materialData as ZkhMaterialConfig[];
const supplierReferences = commonSizeData as ZkhCommonSize[];
const tradePrices = tradePriceData as ZkhTradePrice[];
const commonSizes = tradePrices.map((item) => ({
  sku: item.spec,
  productName: item.productName,
  model: item.model,
  spec: item.spec,
  unit: item.unit,
  width: item.width,
  height: item.height,
  sheets: item.sheets,
  supplierPrice: item.purchasePrice,
}));

const defaultMaterial = materials.find((item) => item.material === "热胶热敏纸不干胶") ?? materials[0];

const defaultInput: ZkhQuoteFormInput = {
  material: defaultMaterial.material,
  width: "",
  height: "",
  sheets: "",
  rolls: "1",
};

function toPositiveNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function matchesSize(item: { width: number; height: number; sheets: number }, width: number, height: number, sheets: number) {
  return (
    item.sheets === sheets &&
    ((item.width === width && item.height === height) || (item.width === height && item.height === width))
  );
}

export function useZkhQuoteState() {
  const [input, setInput] = useState<ZkhQuoteFormInput>(defaultInput);

  const selectedMaterial = useMemo(
    () => materials.find((item) => item.material === input.material) ?? defaultMaterial,
    [input.material],
  );

  const quoteResult = useMemo(() => {
    const width = toPositiveNumber(input.width);
    const height = toPositiveNumber(input.height);
    const sheets = toPositiveNumber(input.sheets);
    const rolls = toPositiveNumber(input.rolls) ?? 1;

    if (!width || !height || !sheets) {
      return null;
    }

    return calculateZkhQuote({ width, height, sheets, rolls }, selectedMaterial);
  }, [input.height, input.rolls, input.sheets, input.width, selectedMaterial]);

  const matchedSize = useMemo(() => {
    const width = toPositiveNumber(input.width);
    const height = toPositiveNumber(input.height);
    const sheets = toPositiveNumber(input.sheets);

    if (!width || !height || !sheets) {
      return null;
    }

    return commonSizes.find((item) => matchesSize(item, width, height, sheets)) ?? null;
  }, [input.height, input.sheets, input.width]);

  const matchedTradePrices = useMemo(() => {
    const width = toPositiveNumber(input.width);
    const height = toPositiveNumber(input.height);
    const sheets = toPositiveNumber(input.sheets);

    if (!width || !height || !sheets) {
      return [];
    }

    return tradePrices.filter((item) => matchesSize(item, width, height, sheets));
  }, [input.height, input.sheets, input.width]);

  const matchedSupplierReferences = useMemo(() => {
    const width = toPositiveNumber(input.width);
    const height = toPositiveNumber(input.height);
    const sheets = toPositiveNumber(input.sheets);

    if (!width || !height || !sheets) {
      return [];
    }

    return supplierReferences.filter((item) => matchesSize(item, width, height, sheets));
  }, [input.height, input.sheets, input.width]);

  function updateInput<K extends keyof ZkhQuoteFormInput>(key: K, value: ZkhQuoteFormInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  function applyCommonSize(size: ZkhCommonSize) {
    setInput((current) => ({
      ...current,
      width: String(size.width),
      height: String(size.height),
      sheets: String(size.sheets),
    }));
  }

  function reset() {
    setInput(defaultInput);
  }

  return {
    input,
    materials,
    selectedMaterial,
    quoteResult,
    commonSizes,
    tradePrices,
    supplierReferences,
    matchedSize,
    matchedTradePrices,
    matchedSupplierReferences,
    updateInput,
    applyCommonSize,
    reset,
  };
}
