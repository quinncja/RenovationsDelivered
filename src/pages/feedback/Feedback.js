import { close } from "business/svg";
import { dateTimeToString } from "utils/formatters";

function Feedback(props) {
  const { item, deleteSelf } = props;
  const { _id, date_submitted, message, type, user } = item;

  return (
    <div className="db-change-order-card feedback-card" key={_id}>
      <div style={{ display: "flex", flexDirection: "column", gap: "45px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <h2> {type} </h2>
          <div> {message} </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <div> {user} </div>-{" "}
          <div> {dateTimeToString(new Date(date_submitted))} </div>
        </div>
      </div>
      <button
        className="x-button widget-item feedback-item"
        onClick={(e) => {
          e.stopPropagation();
          deleteSelf(_id);
        }}
      >
        {close()}
      </button>
    </div>
  );
}

export default Feedback;
