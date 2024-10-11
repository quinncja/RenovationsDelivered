import { transformData } from "./transformData";
import { useNestingLevel } from "utils/hooks/useNestingLevel";
import FilterLayer from "./FilterLayer";

function TransformLayer(props) {
  const { data, chartObj } = props;
  const { query } = chartObj;

  const nestingList = useNestingLevel(query);
  const nestingLevel = nestingList.length;
  const transformedData = transformData(data, nestingList, query);

  return (
    <FilterLayer
      data={transformedData}
      chartObj={chartObj}
      nestingLevel={nestingLevel}
    />
  );
}

export default TransformLayer;
