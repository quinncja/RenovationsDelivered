import BodyDisplay from "pages/dashboard/items/display/BodyDisplay";
import { useMemo, useState } from "react";
import LegendDisplay from "./LegendDisplay";
import ReactTable from "./ReactTable";
import useTableData from "utils/hooks/useTableData";

function DataLayer(props) {
  const { data, chartObj } = props;
  const { chartType, type } = chartObj;
  const [filteredIds, setFilteredIds] = useState([]);
  const filteredData = useMemo(() => {
    if (filteredIds.length > 0) {
      return data.filter((item) => !filteredIds.includes(item.id));
    }
    return data;
  }, [data, filteredIds]);

  const tableData = useTableData(filteredData, type);

  function toggleData(item) {
    const { id: toggledId } = item;
    setFilteredIds((prevFilteredIds) => {
      if (prevFilteredIds.includes(toggledId)) {
        return prevFilteredIds.filter((currentId) => currentId !== toggledId);
      } else {
        return [...prevFilteredIds, toggledId];
      }
    });
  }

  return (
    <>
      <div className="open-chart-row">
        <BodyDisplay
          chartObj={chartObj}
          data={filteredData}
          id={"open"}
          open={true}
        />
        {chartType !== "Text" && type !== "Margin" && (
          <LegendDisplay
            data={data}
            toggleData={toggleData}
            filteredIds={filteredIds}
            line={chartType === "Line" ? true : false}
          />
        )}
      </div>
      {chartType !== "Text" && <ReactTable data={tableData} />}
    </>
  );
}

export default DataLayer;
