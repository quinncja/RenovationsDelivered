import BodyDisplay from "./display/BodyDisplay";

export function DraggingItem({ chartObj, type, id, children, data}) {
  const { chartType } = chartObj;

  return (
    <div className={`dashboard-widget`} {...children}>
      <div
        className={`widget-background ${chartType === "Line" || chartType === "Bar" || type === "Margin" ? "wide-widget" : ""} dragging-widget`}
      >
        <div className="widget-top">
          <div className="drag-handle-wrapper"></div>
          <div className="widget-titles">
            <div className="widget-title dragging">{type}</div>
          </div>
          <button
            className="x-button widget-item"
            onClick={(e) => {
              e.stopPropagation();
            }}
            style={{ width: "36px" }}
          ></button>
        </div>
        <div>
          <BodyDisplay chartObj={chartObj} id={id} dragging={true} data={data}/>
        </div>
      </div>
    </div>
  );
}

export default DraggingItem;
