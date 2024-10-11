import { useState } from "react";
import VisualLayer from "./VisualLayer";

function FilterLayer(props) {
  const { data, ...rest } = props;

  const [currentId, setCurrentId] = useState(null);
  const filteredData =
    currentId === null ? data : data.filter((datum) => datum.id === currentId);

  const toggleData = (datum, type = "Pie") => {
    if (type === "Line") {
      setCurrentId(datum.points[0].data.x);
      console.log(datum, type);
    } else if (datum.id === currentId) setCurrentId(null);
    else setCurrentId(datum.id);
  };

  return (
    <VisualLayer
      data={filteredData}
      unfiltered={data}
      currentId={currentId}
      toggleData={toggleData}
      {...rest}
    />
  );
}

export default FilterLayer;
