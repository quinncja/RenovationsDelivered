import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  dollarFormatter,
  percentFomatter,
  phaseToMonth,
} from "utils/formatters";

function ReactTable({ data, activeColumn }) {

  const formatFuncMap = {
    x: phaseToMonth,
    Budgeted: dollarFormatter,
    Contracted: dollarFormatter,
    COGS: dollarFormatter,
    "Budget Difference ($)": dollarFormatter,
    "Budget Difference (%)": percentFomatter,
    "Contract Difference ($)": dollarFormatter,
    "Contract Difference (%)": percentFomatter,
    Margin: percentFomatter,
    value: dollarFormatter,
    unpaid: dollarFormatter,
    paid: dollarFormatter,
  };

  const headerMap = {
    value: "Total",
    unpaid: "Total Unpaid",
    paid: "Total Paid",
    vndnum: "Vender Number",
  };

  if (!data || data.length === 0) {
    return <div className="line-table-loading">
      <div className="line-table-loading-widget"/>
    </div>;
  }

  const frozenField = data[0].hasOwnProperty("x")
    ? "x"
    : data[0].hasOwnProperty("id")
      ? "id"
      : null;

  const columns = Object.keys(data[0]).filter((key) => key !== frozenField);

  return (
    <DataTable value={data} removableSort scrollable scrollHeight="400px">
      <Column
        key={frozenField}
        field={frozenField}
        header={frozenField === "x" ? "Phase" : "Name"}
        frozen
        body={(rowData) => {
          const formatter = formatFuncMap[frozenField];
          return formatter
            ? formatter(rowData[frozenField])
            : rowData[frozenField];
        }}
      />

      {columns.map((colKey) => (
        <Column
          key={colKey}
          field={colKey}
          header={headerMap[colKey] || colKey}
          sortable
          body={(rowData) => {
            const formatter = formatFuncMap[colKey];
            return formatter ? formatter(rowData[colKey]) : rowData[colKey];
          }}
        />
      ))}
    </DataTable>
  );
}

export default ReactTable;
