import { useUserContext } from "context/UserContext";
import { useCSSVariable } from "utils/hooks/useCSSVariable";

function LegendDisplay({data, toggleData, filteredIds, line}) {
  const { getColorScheme } = useUserContext();
  const grayed = useCSSVariable("--grid-color")
  const colorPalette = getColorScheme();

  function Legend({datum, index}){
    return(
      <div className="legend" key={index} onClick={() => toggleData(datum)}>
        <div
          className="tooltip-cube"
          style={{
            backgroundColor: filteredIds.includes(datum.id) ? grayed : colorPalette[index % colorPalette.length],
          }}
        />
        <strong color="legend-title">{datum.id}</strong>{" "}
      </div>
    )
  }

  return (
    <>
      {data ? (
        <div className={`legend-box ${line ? "legend-box-line" : ""}`}>
          {data.map((datum, index) => (
            <Legend datum={datum} index={index}/>
         ))}
         </div>
      ) : (
        <div className="empty-space" />
      )}
    </>
  );
}
export default LegendDisplay;
