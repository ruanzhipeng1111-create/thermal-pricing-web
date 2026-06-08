import { useMemo, useState } from "react";
import summaryData from "../data/competitor-summary.json";
import detailData from "../data/competitor-details.json";
import pricingConfig from "../data/pricing-config.json";
import type { CommonSizeSummary, CompetitorDetail, QuoteInput } from "../types";
import { filterDetails, findSummaryBySize, getFeaturedSizes } from "../lib/competitor";
import { buildSuggestedPrices, calculateQuote } from "../lib/pricing";

const defaultInput: QuoteInput = {
  material: pricingConfig.material,
  width: "",
  height: "",
  qty: "",
  rows: "",
  orientation: "",
  packageType: "",
};

export function useQuoteState() {
  const [input, setInput] = useState<QuoteInput>(defaultInput);
  const [activeDetailSize, setActiveDetailSize] = useState<string | null>(null);

  const summaries = summaryData as CommonSizeSummary[];
  const details = detailData as CompetitorDetail[];

  const hasRequiredFields = Boolean(input.width && input.height && input.qty);

  const matchedSummary = useMemo(() => {
    if (!hasRequiredFields) {
      return null;
    }
    return findSummaryBySize(summaries, {
      width: Number(input.width),
      height: Number(input.height),
      qty: Number(input.qty),
    });
  }, [hasRequiredFields, input.height, input.qty, input.width, summaries]);

  const matchedDetails = useMemo(() => {
    if (!hasRequiredFields) {
      return [];
    }
    return filterDetails(details, input);
  }, [details, hasRequiredFields, input]);

  const quoteResult = useMemo(() => {
    if (!hasRequiredFields) {
      return null;
    }

    const calculated = calculateQuote(Number(input.width), Number(input.height), Number(input.qty), pricingConfig);
    const suggested = buildSuggestedPrices(
      calculated.quote,
      matchedSummary?.minPrice ?? null,
      matchedSummary?.avgPrice ?? null,
    );

    return {
      area: calculated.area,
      processPrice: calculated.processPrice,
      quote: calculated.quote,
      minCompetitorPrice: matchedSummary?.minPrice ?? null,
      avgCompetitorPrice: matchedSummary?.avgPrice ?? null,
      suggestedFloor: suggested.suggestedFloor,
      suggestedRegular: suggested.suggestedRegular,
    };
  }, [hasRequiredFields, input.height, input.qty, input.width, matchedSummary]);

  const featuredSizes = useMemo(() => getFeaturedSizes(summaries, 16), [summaries]);

  const displayedSummaries = hasRequiredFields
    ? matchedSummary
      ? [matchedSummary]
      : []
    : featuredSizes;

  const displayedDetails = activeDetailSize
    ? details.filter((detail) => detail.sizeKey === activeDetailSize)
    : matchedDetails;

  function updateInput<K extends keyof QuoteInput>(key: K, value: QuoteInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  function applySizeSummary(summary: CommonSizeSummary) {
    setInput((current) => ({
      ...current,
      width: String(summary.shortSide),
      height: String(summary.longSide),
      qty: String(summary.qty),
    }));
    setActiveDetailSize(summary.sizeKey);
  }

  function reset() {
    setInput(defaultInput);
    setActiveDetailSize(null);
  }

  function openDetails(sizeKey: string) {
    setActiveDetailSize(sizeKey);
  }

  function closeDetails() {
    setActiveDetailSize(null);
  }

  return {
    input,
    quoteResult,
    matchedSummary,
    matchedDetails,
    displayedSummaries,
    displayedDetails,
    featuredSizes,
    activeDetailSize,
    hasRequiredFields,
    updateInput,
    applySizeSummary,
    reset,
    openDetails,
    closeDetails,
  };
}
