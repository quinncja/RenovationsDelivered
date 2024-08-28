import { phaseToMonth } from "utils/formatters";
export default function MarginToolTip({ slice }) {
  return (
    <div className="tooltip slice" key={`${slice.points[0].data.xFormatted}`}>
      <strong> {phaseToMonth(slice.points[0].data.xFormatted)} </strong>
      {slice.points.map((point) => (
        <div
          className="single-slice"
          key={`${point.data.xFormatted}-${point.data.yFormatted}`}
        >
          <div>
            <strong>{point.serieId} </strong>
          </div>
          {point.data.yFormatted}%
        </div>
      ))}
    </div>
  );
}
