import { useUserContext } from "context/UserContext";
import { hashData } from "utils/colors";
import { useCSSVariable } from "utils/hooks/useCSSVariable";

function LegendDisplay({ data, toggleData, filteredIds, line }) {
  const { getColorScheme } = useUserContext();
  const grayed = useCSSVariable("--grid-color");
  const colorPalette = getColorScheme();

  function Legend({ datum, index }) {
    const inactive = filteredIds.includes(datum.id);
    return (
      <div className="legend" key={index} onClick={() => toggleData(datum)}>
        <div
          className="tooltip-cube"
          style={{
            backgroundColor: inactive
              ? grayed
              : hashData(datum, colorPalette).color,
          }}
        />
        <strong
          style={{
            textDecoration: inactive ? "line-through" : "",
          }}
          color="legend-title"
        >
          {datum.id}
        </strong>{" "}
      </div>
    );
  }

  return (
    <>
      {data ? (
        <div className={`legend-box ${line ? "legend-box-line" : ""}`}>
          {data.map((datum, index) => (
            <Legend datum={datum} index={index} />
          ))}
        </div>
      ) : (
        <div className="empty-space" />
      )}
    </>
  );
}
export default LegendDisplay;
