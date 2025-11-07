import JobSelectors from "./JobSelectors";

function AddJobModal({ closeSelf }) {
  return (
    <div className="popup-wrapper">
      <div className="new-widget-popup" onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <h3> Add Tracked Project </h3>
              <h4> Select from the list below</h4>
            </div>
          </div>
        </div>
        <JobSelectors closeSelf={closeSelf} />
      </div>
    </div>
  );
}

export default AddJobModal;
