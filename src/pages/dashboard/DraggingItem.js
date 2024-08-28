
import ChartDisplay from "graphs/ChartDisplay";

export function DraggingItem({chartType, type, id, chart, data, children}){

    return (
        <div
          className={`dashboard-widget`}
        {...children}
        >
          <div className={`widget-background ${chartType === "Line" || chartType === "Bar" ? "wide-widget" : ""} dragging-widget`}>
          <div className="widget-top">
            <div className="drag-handle-wrapper">
              <div
                className="drag-handle widget-item"
              ></div>
            </div>
            <div className="widget-titles">
              <div
                className="widget-title"
                layoutId={`dashboard-item-title-${id}`}
              >
                {type}
              </div>
            </div>
            <button
              className="x-button widget-item"
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={{width: "36px"}}
            >
            </button>
          </div>
            {data && 
            <div> 
                <ChartDisplay chartObj={chart} data={data} id={id}/>
            </div>
            }
          </div>
        </div>
    )
}

export default DraggingItem;