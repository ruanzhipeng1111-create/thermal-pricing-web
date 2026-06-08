import CommonSizeList from "./components/CommonSizeList";
import CompetitorTable from "./components/CompetitorTable";
import DetailDrawer from "./components/DetailDrawer";
import EmptyState from "./components/EmptyState";
import Header from "./components/Header";
import InputPanel from "./components/InputPanel";
import ResultCards from "./components/ResultCards";
import ZkhPricingPage from "./components/ZkhPricingPage";
import { useQuoteState } from "./hooks/useQuoteState";

export default function App() {
  if (window.location.pathname === "/zkh-pricing") {
    return <ZkhPricingPage />;
  }

  return <MarketPricingPage />;
}

function MarketPricingPage() {
  const {
    input,
    quoteResult,
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
  } = useQuoteState();

  return (
    <main className="app-shell">
      <div className="page-stack">
        <Header />
        <div className="main-grid">
          <div className="left-column">
            <InputPanel input={input} onChange={updateInput} onReset={reset} />
            <ResultCards result={quoteResult} />
            {!hasRequiredFields && <EmptyState />}
          </div>
          <div className="right-column">
            <CommonSizeList sizes={featuredSizes} onSelect={applySizeSummary} />
          </div>
        </div>
        <CompetitorTable summaries={displayedSummaries} onOpenDetails={openDetails} />
        <DetailDrawer
          open={Boolean(activeDetailSize)}
          sizeKey={activeDetailSize}
          details={displayedDetails}
          onClose={closeDetails}
        />
      </div>
    </main>
  );
}
