import { useDashboard } from "@features/dashboard/context/DashboardContext";
import LineGraph from "./LineGraph";
import MoneyDisplay from "@shared/components/MoneyDisplay/MoneyDisplay";
import WidgetDetails from "@shared/components/WidgetDetails/WidgetDetails";
import { phaseToFullMonth, phaseToMonth, phaseToShortMonth } from "@shared/utils/functions";

function AnnualRevenueTrend() {
  const id = "annualRevenueTrend";
  const { getWidgetDataById, getOverUnder } = useDashboard();
  const data = getWidgetDataById(id);
  
  if (!data) {
    return (
      <div className="home-revenue-widget">
        <span className={`home-widget-num ${"home-widget-loading"}`}> </span>
        <span className="home-widget-title"> </span>
      </div>
    );
  }

  const { overUnder, overUnderPeriod} = getOverUnder();
  const year = new Date().getFullYear();
    console.log(data)
  const yearSum = data.find((item) => item.year === year)?.revenue;
  const totalSum =
    data.find((item) => item.year === 0)?.revenue + 20287424.35 ?? null;

  const chartData = [
    {
      year: 2011,
      revenue: 385205.98,
    },
    {
      year: 2012,
      revenue: 1340984.17,
    },
    {
      year: 2013,
      revenue: 1166296.47,
    },
    {
      year: 2014,
      revenue: 2159028.55,
    },
    {
      year: 2015,
      revenue: 3705796.32,
    },
    {
      year: 2016,
      revenue: 4531084.74,
    },
    {
      year: 2017,
      revenue: 6999028.12,
    }
  ];

  const databaseData = data.filter((item) => item.year !== 0);
  const combinedChartData = [...chartData, ...databaseData].sort(
    (a, b) => a.year - b.year,
  );

  const className = overUnder > 0 ? "green" : "red"

  return (
    <div className="home-revenue-widget" style={{paddingBlock: "5px"}}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "35px",
          width: "30%",
          flexShrink: "0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
          }}
        >
          <h4> {year} Revenue</h4>
          <MoneyDisplay value={yearSum} size={32} />
          {overUnder !== null ? (
              <div style={{color: 'white', display: "flex", gap: "5px", alignItems: "baseline"}}>
                <span style={{color: className}}> {overUnder > 0 ? "+" : "-"} 
                {<MoneyDisplay value={overUnder} tag={"h3"} className={className}/>} </span>
                <h4> {`${phaseToFullMonth(overUnderPeriod)} Under Over`} </h4>
              </div>
          ) : (
            ""
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
          }}
        >
          <h4> All Time</h4>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "15px",
              alignItems: "baseline",
            }}
          >
            <MoneyDisplay value={totalSum} size={32} />
          </div>
        </div>
      </div>
      <LineGraph data={combinedChartData} />
      <WidgetDetails type={id}/>
    </div>
  );
}

export default AnnualRevenueTrend;
