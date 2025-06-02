import { useHome } from "context/HomeContext";
import Insight from "./Insight";

function Insights() {
  const { getWidgetDataById } = useHome();
  const client = getWidgetDataById("client-insight");
  const job = getWidgetDataById("project-insight");
  const sub = getWidgetDataById("subcontractor-insight");
  const vender = getWidgetDataById("vendor-insight");

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
        <Insight id={"client-insight"} data={client} type={"Client"} />
        <Insight id={"project-insight"} data={job} type={"Project"} />
        <Insight
          id={"subcontractor-insight"}
          data={sub}
          type={"Subcontractor"}
        />
        <Insight id={"vendor-insight"} data={vender} type={"Vendor"} />
      </div>
    </div>
  );
}

export default Insights;
