import { close } from "business/svg";
import JobSelectors from "./JobSelectors";

function AddJobModal({ closeSelf }) {

  return (
    <div className="popup-wrapper">
      <div
        className="new-widget-popup"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="widget-top new-widget-top">
          <h2> Add Tracked Project </h2>
          <button className="x-button widget-item" onClick={closeSelf}>
            {close()}
          </button>
        </div>
        <JobSelectors closeSelf={closeSelf}  />
      </div>
    </div>
  );
}

export default AddJobModal;
