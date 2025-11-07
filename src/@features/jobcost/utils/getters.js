import {
  boxSvg,
  hammerSvg,
  hardHatSvg,
  piggyBankSvg,
} from "@assets/icons/svgs";

export const getBreakdownIconByType = (type) => {
  if (type === "Material") return boxSvg();
  else if (type === "Labor") return hammerSvg();
  else if (type === "Subcontractors") return hardHatSvg();
  else return piggyBankSvg();
};

export const getStatusColor = (budget, spent) => {
  if (budget > spent) return "var(--green)";
  else return "var(--red)";
};

export const getIconBackground = (budget, spent) => {
  if (budget > spent)
    return "linear-gradient(135deg, var(--green) 0%, #20692e 100%)";
  else return "linear-gradient(135deg, #ff4757 0%, var(--red) 100%)";
};
