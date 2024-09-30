import { useMemo } from "react";
import getTableFunc from "utils/tableFuncs";

function useTableData(data, type) {
  const formattedData = useMemo(() => {
    const formatFunc = getTableFunc(type);
    return formatFunc(data);
  }, [data, type]);

  return formattedData;
}

export default useTableData;
