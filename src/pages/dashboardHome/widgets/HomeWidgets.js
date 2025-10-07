import Revenue from "./Revenue/Revenue";
import Insights from "./Insights/Insights";
import YearRevenue from "./YearRevenue/YearRevenue";
import DataValidation from "./DataValidation/DataValidation";
import MonthlyYearRevenue from "./MonthlyYearRevenue/MonthlyYearRevenue";
import AgingSummary from "pages/dashboardOpen/AgingSummary/AgingSummary";
import EmployeePerformance from "./EmployeePerformance";
import { useEffect, useRef } from "react";
import MarginPerformance from "./MarginPerformance/MarginPerformance";
import YearCompletion from "./YearCompletion/YearCompletion";

const WidgetSection = ({
  title,
  color = "green",
  gap = "10px",
  children,
  className = "",
  style = {},
}) => {
  const headerRef = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    const sentinel = sentinelRef.current;
    if (!header || !sentinel) return;

    const observer = new IntersectionObserver(
      ([e]) => header.classList.toggle("is-pinned", e.intersectionRatio < 1),
      { threshold: [1] },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`left-blur blur-${color} ${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: gap,
        width: "100%",
        position: "relative",
        ...style,
      }}
    >
      <div
        ref={sentinelRef}
        style={{
          height: "1px",
          position: "absolute",
          top: "-1px",
          left: 0,
          right: 0,
        }}
      />
      <div
        ref={headerRef}
        className="jobs-header"
        style={{
          background: "none",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <h2 style={{ paddingLeft: "2px" }}>{title}</h2>
      </div>
      {children}
    </div>
  );
};

const SectionSubheading = ({ children, style = {} }) => {
  return (
    <h3
      style={{
        textAlign: "left",
        paddingTop: "20px",
        opacity: ".95",
        fontSize: "16px",
        fontWeight: "500",
        ...style,
      }}
    >
      {children}
    </h3>
  );
};

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
          <MarginPerformance/>
          <div style={{height: "10px"}}> </div>
          <YearCompletion/>
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
