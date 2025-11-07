import Revenue from "./AnnualRevenueTrend/AnnualRevenueTrend";
import Insights from "./Insights/Insights";
import YearRevenue from "./CumulativeRevenueGrowth/CumulativeRevenueGrowth";
import DataValidation from "./DataValidation/DataValidation";
import MonthlyYearRevenue from "./MonthlyRevenueComparison/MonthlyRevenueComparison";
import AgingSummary from "@features/dashboard/components/widgets/AgingSummary/AgingSummary";
import EmployeePerformance from "./EmployeePerformance/EmployeePerformance";
import MarginPerformance from "./MarginPerformance/MarginPerformance";
import YearCompletion from "./YearCompletion/YearCompletion";
import WidgetSection from "../WidgetSection";
import SectionSubheading from "../SectionSubheader";

function HomeWidgets() {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="home-widget-container">
        <WidgetSection title="Business Development" color="green">
          <Revenue />
          <div style={{ width: "100%", display: "flex", gap: "10px" }}>
            <YearRevenue />
            <MonthlyYearRevenue />
          </div>
        </WidgetSection>

        <WidgetSection title={`${year} Overview`} color="blue">
          <MarginPerformance />
          <div style={{ height: "10px" }}> </div>
          <YearCompletion />
          <SectionSubheading>Business Insights</SectionSubheading>
          <Insights />
          <SectionSubheading>Project Manager Performance</SectionSubheading>
          <EmployeePerformance />
        </WidgetSection>

        <WidgetSection title="Finances" color="purple">
          <AgingSummary />
        </WidgetSection>

        <WidgetSection title="Reports" color="red" gap="0px">
          <DataValidation />
        </WidgetSection>
      </div>
    </>
  );
}

export default HomeWidgets;
