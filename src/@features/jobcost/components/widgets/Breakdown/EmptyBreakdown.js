import { underConstructionSvg } from "@assets/icons/svgs";

function EmptyBreakdown() {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="empty-breakdown">
        {underConstructionSvg()}
        <h4> No data </h4>
      </div>
    </div>
  );
}

export default EmptyBreakdown;
