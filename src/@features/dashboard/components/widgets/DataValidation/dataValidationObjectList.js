export const dataValidationObjectList = [
  {
    id: "criticalIssues",
    accessor: "open",
    className: "red",
    title: "Critical Issues",
    subtitle: "Open POs on Completed Jobs",
    route: "item/dataValidation/criticalIssues",
  },
  {
    id: "dataQuality",
    className: "orange",
    accessor: "missing",
    title: "Data Quality",
    subtitle: "Missing Required Fields",
    route: "item/dataValidation/dataQuality",
  },
  {
    id: "dataIntegrity",
    className: "yellow",
    accessor: "wrong",
    title: "Data Integrity",
    subtitle: "Incorrect Job Numbers",
    route: "item/dataValidation/dataIntegrity",
  },
  {
    id: "unknownContract",
    className: "gray",
    accessor: "unknown",
    title: "Unknown Contracts",
    subtitle: "Jobs Missing Contracts",
    route: "item/dataValidation/unknownContract",
  },
];
