import { cogSvg, invoiceSvg, validationSvg } from "business/svg";

export const reportList = [
  {
    type: "cogs",
    text: "COGS Changes",
    icon: cogSvg(),
  },
  {
    type: "data-validation",
    text: "Data Validation",
    icon: validationSvg(),
  },
  {
    type: "invoice-validation",
    text: "Invoice Validation",
    icon: invoiceSvg(),
  },
];
