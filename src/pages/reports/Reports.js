import Report from "./Report";
import { reportList } from "./reportList";

function Reports() {
  return (
    <div className="dashboard-welcome user-page">
      <h1> Reports </h1>
      <div className="reports">
        {reportList.map((report) => {
          return <Report report={report} />;
        })}
      </div>
    </div>
  );
}

export default Reports;
