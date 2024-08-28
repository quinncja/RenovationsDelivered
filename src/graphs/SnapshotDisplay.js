import { useDashboardContext } from "context/DashboardContext";

function SnapshotDisplay({ id, chartType }) {
  const { snapshots } = useDashboardContext();
  const snapshotImage = snapshots[id];

  const sizes = {
    Pie: { width: "100%", height: "100%" },
    Line: { width: "97%", height: "100%" },
    Bar: { width: "97%", height: "100%" },
  };

  return (
    <img
      src={snapshotImage}
      draggable="false"
      style={{ userSelect: "none", position: "relative", ...sizes[chartType] }}
    />
  );
}

export default SnapshotDisplay;
