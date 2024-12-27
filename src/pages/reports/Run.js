import { close, confirmedSvg, userReviewSvg } from "business/svg";
import { useNavigate } from "react-router-dom";
import { dateTimeToString } from "utils/formatters";

function Run(props) {
  const { run, deleteReport } = props;
  const { _id, ran_by, run_type, cost_count, ran_on, previous_run } = run;
  const Navigate = useNavigate();

  const handleClick = () => {
    Navigate(`/reports/${run_type}/${_id}`);
  };

  const svg = run.is_completed ? confirmedSvg() : userReviewSvg();
  const title = run.is_completed ? "Completed" : "In progress";

  const cogBody = () => {
    return (
      <div className="run-left">
        <div className="home-widget-title">
          {" "}
          From {dateTimeToString(new Date(previous_run))}{" "}
        </div>
        <h2> To {dateTimeToString(new Date(ran_on))} </h2>
        <div className="home-widget-title"> Ran by {ran_by} </div>
      </div>
    );
  };

  const dataValidationBody = () => {
    return (
      <div className="run-left">
        <h2> {dateTimeToString(new Date(ran_on))} </h2>
        <div className="home-widget-title"> Ran by {ran_by} </div>
      </div>
    );
  };
  return (
    <div className="run-item clickable-widget" onClick={handleClick}>
      <div style={{ display: "flex", alignItems: "center", gap: "1.6rem" }}>
        <div title={title} className="run-svg">
          {" "}
          {svg}{" "}
        </div>
        {run_type === "cogs" ? cogBody() : dataValidationBody()}
      </div>
      <div style={{ display: "flex", gap: "20px" }}>
        <div className="run-right">
          <div className="home-widget-title"> Items </div>
          <h2> {cost_count} </h2>
        </div>
        <button
          className="x-button widget-item"
          onClick={(e) => {
            e.stopPropagation();
            deleteReport(_id);
          }}
          title="Delete report"
        >
          {close()}
        </button>
      </div>
    </div>
  );
}
export default Run;
