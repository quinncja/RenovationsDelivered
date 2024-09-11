import { modifierFormatter } from "utils/formatters";

export async function LoadItemData(chartObj, pageModifiers, signal) {
  const modifiers = chartObj.modifierOptions.reduce((acc, option) => {
    if (pageModifiers[option]) {
      if (pageModifiers[option][0]) acc[option] = pageModifiers[option][0].num;
      else acc[option] = undefined;
    }

    return acc;
  }, {});

  const formatted = modifierFormatter(modifiers);
  let newData = await chartObj.getter(formatted, signal);
  if (newData) {
    newData = chartObj.cleaner(newData);
    return newData;
  }

  return null;
}
