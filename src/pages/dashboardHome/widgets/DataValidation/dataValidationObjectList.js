export const dataValidationObjectList = [
  {
    id: "critical-issues",
    accessor: "open",
    className: "red",
    title: "Critical Issues",
    subtitle: "Open POs on Completed Jobs",
    route: "item/data-validation/critical-issues",
  },
  {
    id: "data-quality",
    className: "orange",
    accessor: "missing",
    title: "Data Quality",
    subtitle: "Missing Required Fields",
    route: "item/data-validation/data-quality",
  },
  {
    id: "data-integrity",
    className: "yellow",
    accessor: "wrong",
    title: "Data Integrity",
    subtitle: "Incorrect Job Numbers",
    route: "item/data-validation/data-integrity",
  },
];
