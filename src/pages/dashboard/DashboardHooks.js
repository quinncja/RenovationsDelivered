import {
  venderData,
  clientData,
  subData,
  revenueData,
  projectData,
} from "graphs/MockData";
import { modifierFormatter } from "utils/formatters";

export function getItemData(type, modifiers) {
  return new Promise((resolve) => {
    const randomDelay = Math.floor(Math.random() * 2000) + 500;

    setTimeout(() => {
      switch (type) {
        case "Vender Breakdown":
          resolve(venderData);
          break;
        case "Client Breakdown":
          resolve(clientData);
          break;
        case "Sub Breakdown":
          resolve(subData);
          break;
        case "Revenue":
          resolve(revenueData);
          break;
        case "Phase Summary":
          resolve(projectData);
          break;
        default:
          resolve([]);
      }
    }, randomDelay);
  });
}

export async function LoadItemData(chartObj, pageModifiers, signal) {
  const modifiers = chartObj.modifierOptions.reduce((acc, option) => {
    if (pageModifiers[option]) {
      if (pageModifiers[option][0]) acc[option] = pageModifiers[option][0].num;
      else acc[option] = undefined;
    }

    return acc;
  }, {});

  const formatted = modifierFormatter(modifiers);
  console.log("-------------" ,formatted)
  let newData = await chartObj.getter(formatted, signal);
  if (newData) {
    newData = chartObj.cleaner(newData);
    return newData;
  }

  return null;
}
