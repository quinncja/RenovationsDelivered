import { phaseToMonth, dollarFormatter } from "utils/formatters"
export default function RevenueTooltip({slice}){

    return(
        <div className="tooltip slice" key={`${slice.points[0].data.xFormatted}-${slice.points[1].data.xFormatted}`}>
          <strong> {phaseToMonth(slice.points[0].data.xFormatted)} </strong>
          {slice.points.map((point) => (
            <div className="single-slice" key={`${point.data.xFormatted}-${point.data.yFormatted}`}>
              <div>
                <div
                  className="tooltip-cube"
                  style={{
                    backgroundColor: point.serieColor,
                    width: "10px",
                    height: "10px",
                    display: "inline-block",
                    marginRight: "5px",
                  }}
                />
                <strong>{point.serieId} </strong>
              </div>
              {dollarFormatter(point.data.yFormatted)} 
            </div>
          ))}
        </div>
    )
}