import { useHome } from "context/HomeContext";
import Insight from "./Insight";

function Insights() {
  const { getWidgetDataById } = useHome();
  const client = getWidgetDataById("clientInsights");
  const job = getWidgetDataById("projectInsights");
  const sub = getWidgetDataById("subcontractorInsights");
  const vender = getWidgetDataById("vendorInsights");

  const loading = !client || !job || !sub || !vender;

  if (loading)
    return (
      <div className="insight-widget">
        <div className="insights">
          <div className="insight loading-widget" />
          <div className="insight loading-widget" />
          <div className="insight loading-widget" />
          <div className="insight loading-widget" />
        </div>
      </div>
    );

  return (
    <div className="insight-widget">
      <div className="insights">
        <Insight id={"clientInsights"} data={client} type={"Client"} />
        <Insight id={"projectInsights"} data={job} type={"Project"} />
        <Insight
          id={"subcontractorInsights"}
          data={sub}
          type={"Subcontractor"}
        />
        <Insight id={"vendorInsights"} data={vender} type={"Vendor"} />
      </div>
    </div>
  );
}

export default Insights;
