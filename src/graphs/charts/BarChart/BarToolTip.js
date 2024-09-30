import { dollarFormatter } from "utils/formatters";

function BarTooltip({id, color, value}){

    return(
        <div className="tooltip">
        <span
          className="tooltip-cube"
          style={{ backgroundColor: color }}
        ></span>
        <strong>{id}</strong> {dollarFormatter(value)}
      </div>
    )
}

export default BarTooltip;