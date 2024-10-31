import { useState } from "react";
import VisualLayer from "./VisualLayer";
import useIsAdmin from "utils/hooks/useIsAdmin";

function removeContractValueDeep(data) {
  if (Array.isArray(data)) {
    return data.map((item) => removeContractValueDeep(item));
  } else if (data !== null && typeof data === "object") {
    const { contractValue, ...rest } = data;
    const newObject = {};

    for (const [key, value] of Object.entries(rest)) {
      newObject[key] = removeContractValueDeep(value);
    }

    return newObject;
  }

  return data;
}

function FilterLayer(props) {
  const { data, ...rest } = props;
  const isAdmin = useIsAdmin();
  const [currentId, setCurrentId] = useState(null);
  let filteredData =
    currentId === null ? data : data.filter((datum) => datum.id === currentId);
  let unfilteredData = data;
  if (!isAdmin) {
    filteredData = removeContractValueDeep(filteredData);
    unfilteredData = removeContractValueDeep(data);
  }

  const toggleData = (datum, type = "Pie") => {
    if (type === "Line") {
      setCurrentId(datum.points[0].data.x);
    } else if (datum.id === currentId) setCurrentId(null);
    else setCurrentId(datum.id);
  };

  return (
    <VisualLayer
      data={filteredData}
      unfiltered={unfilteredData}
      currentId={currentId}
      toggleData={toggleData}
      isAdmin={isAdmin}
      {...rest}
    />
  );
}

export default FilterLayer;
