import { useUserContext } from "context/UserContext";
import { hashData } from "utils/colors";
import { useCSSVariable } from "utils/hooks/useCSSVariable";

function LegendDisplay({ data, toggleData, currentId, allowToggle }) {
  const { getColorScheme } = useUserContext();
  const grayed = useCSSVariable("--grid-color");
  const colorPalette = getColorScheme();

  function Legend({ datum, index }) {
    return (
      <div className="legend" key={index} onClick={() => toggleData(datum)}>
        <div
          className="tooltip-cube"
          style={{
            backgroundColor: currentId
              ? currentId === datum.id
                ? hashData(datum, colorPalette).color
                : grayed
              : hashData(datum, colorPalette).color,
          }}
        />
        <strong
          style={{
            textDecoration: currentId
              ? currentId !== datum.id
                ? "line-through"
                : ""
              : "",
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
        <div className={`legend-box ${!allowToggle ? "no-legend-click" : ""}`}>
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
