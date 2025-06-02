import { clockSvg } from "business/svg";

function UpdatesButton() {
  return (
    <div
      className="job-cost-updates-button clickable-co"
      style={{ paddingInline: "20px" }}
      title="View activity log"
    >
      {clockSvg()}
    </div>
  );
}

export default UpdatesButton;
