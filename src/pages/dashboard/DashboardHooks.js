import { modifierFormatter } from "utils/formatters";

export async function LoadItemData(chartObj, pageModifiers, signal) {
  const formatted = modifierFormatter(pageModifiers);

  let newData = await chartObj.getter(formatted, signal);
  if (newData) {
    newData = chartObj.cleaner(newData);
    return newData;
  }

  return null;
}
