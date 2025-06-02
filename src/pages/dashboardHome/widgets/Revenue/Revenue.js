import { useHome } from "context/HomeContext";
import { dollarFormatter } from "utils/formatters";
import RevenueLineChart from "./RevenueLineChart";

function Revenue() {
  const id = "homeRev";
  const { getWidgetDataById } = useHome();
  const data = getWidgetDataById(id);


  if (!data) {
    return (
      <div className="home-revenue-widget">
        <span className={`home-widget-num ${"home-widget-loading"}`}> </span>
        <span className="home-widget-title"> </span>
      </div>
    );
  }
  const year = new Date().getFullYear();

  const yearSum = data.find(item => item.year === year)?.revenue;
  const totalSum = data.find(item => item.year === 0)?.revenue + 20287424.35 ?? null;

  const chartData = [
    {
      year: 2011,
      revenue: 385205.98
    },
    {
      year: 2012,
      revenue: 1340984.17
    },
    {
      year: 2013,
      revenue: 1166296.47
    },
    {
      year: 2014,
      revenue: 2159028.55
    },
    {
      year: 2015,
      revenue: 3705796.32
    },
    {
      year: 2016,
      revenue: 4531084.74
    },
    {
      year: 2017,
      revenue: 6999028.12
    },
    {
      year: 2018,
      revenue: 8662978.92
    },
    {
      year: 2019,
      revenue: 7786213.64
    },
    {
      year: 2020,
      revenue: 3809706.81
    },
    {
      year: 2021,
      revenue: 5697187.62
    },
    {
      year: 2022,
      revenue: 10112575.28
    },
  ]

  const databaseData = data.filter(item => item.year !== 0);
  const combinedChartData = [...chartData, ...databaseData].sort((a, b) => a.year - b.year);

  const calculateYoyGrowth = () => {
    const currentYearData = combinedChartData.find(item => item.year === year);
    const previousYearData = combinedChartData.find(item => item.year === year - 1);
    
    if (!currentYearData || !previousYearData) {
      return null;
    }
    
    const growth = ((currentYearData.revenue - previousYearData.revenue) / previousYearData.revenue) * 100;
    return growth;
  };

  const yoyGrowth = calculateYoyGrowth();
  
  return (
    <div className="home-revenue-widget">
      <div style={{display: "flex", flexDirection: "column", gap: "35px", width: "30%", flexShrink: "0"}}> 
      <div
        style={{ display: "flex", flexDirection: "column", textAlign: "left" }}
      >
        <h4> {year} Revenue</h4>
        <h2 style={{ fontSize: "32px" }}> {dollarFormatter(yearSum)} </h2>
        {yoyGrowth !== null ? (
            <span className="thisyear" style={{
              paddingTop: "5px",
              color: yoyGrowth >= 0 ? '#28a745' : '#dc3545'
            }}>
              <strong>
                {yoyGrowth >= 0 ? '+' : ''}{yoyGrowth.toFixed(1)}%
              </strong> from last year
            </span>
          ) : (
            <span className="thisyear" style={{color: '#6a737d'}}>
              <strong>—</strong> No prior year data
            </span>
          )}
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", textAlign: "left" }}
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
          <h2 style={{ fontSize: "32px" }}> {dollarFormatter(totalSum)} </h2>
        </div>
      </div>
      </div>
      <RevenueLineChart data={combinedChartData} />
    </div>
  );
}

export default Revenue;
