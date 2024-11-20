export const getBaseJobName = (jobName) => {
  if(!jobName) return ""
  const substrings = ["\\.", "ave", "tr", "pl", "st", "dr", "ct", "rd", "dt"];
  const substringsPattern = substrings.join("|");
  return jobName
    .replace(/\s[NSWE]\s/g, " ")
    .replace(/P\d{1,2}\s?|20\d{2}/g, "")
    .replace(/[.-]+$/g, "")
    .replace(
      new RegExp(
        `(\\s(${substringsPattern})\\.?\\s)|(\\s(${substringsPattern})\\.?$)`,
        "gi",
      ),
      " ",
    )
    .trim();
};
const fillSubData = (
  layer,
  maxLayer,
  entryList,
  dataLoc,
  data,
  value,
  query,
) => {
  const totName =
    query === "margin"
      ? "marginPercentage"
      : query === "revenue"
        ? "totalCost"
        : "Total";
  if (layer >= maxLayer) {
    if (query === "margin") {
      const projectName = getBaseJobName(data.Project);
      data.Project = projectName;
      delete data.Year;
    }
    dataLoc.push({ [totName]: value, ...data });
    return;
  }

  const { nameField, valueField, entriesField } = entryList[layer];
  const name = getBaseJobName(data[nameField]);
  let valueAtThisLevel = data[valueField];

  if (valueAtThisLevel === undefined) {
    valueAtThisLevel = value;
  }

  const rest = { ...data };
  delete rest[nameField];
  delete rest[valueField];

  if (!dataLoc[name]) {
    dataLoc[name] = {
      [nameField]: name,
      [valueField]: 0,
      [entriesField]: layer + 1 >= maxLayer ? [] : {},
    };
  }

  if (query === "margin") {
    if (!dataLoc[name]["totalCost"]) {
      dataLoc[name]["totalCost"] = 0;
    }
    if (!dataLoc[name]["contractValue"]) {
      dataLoc[name]["contractValue"] = 0;
    }

    dataLoc[name]["totalCost"] += data["totalCost"] || 0;
    dataLoc[name]["contractValue"] += data["contractValue"] || 0;

    const totalCost = dataLoc[name]["totalCost"];
    const contractValue = dataLoc[name]["contractValue"];
    if (contractValue !== 0) {
      dataLoc[name]["marginPercentage"] =
        ((contractValue - totalCost) / contractValue) * 100;
    } else {
      dataLoc[name]["marginPercentage"] = 0;
    }
  } else if (query === "revenue") {
    if (!dataLoc[name]["totalCost"]) {
      dataLoc[name]["totalCost"] = 0;
    }
    if (!dataLoc[name]["contractValue"]) {
      dataLoc[name]["contractValue"] = 0;
    }
    if (!dataLoc[name]["budgetedAmount"]) {
      dataLoc[name]["budgetedAmount"] = 0;
    }

    dataLoc[name]["totalCost"] += data["totalCost"] || 0;
    dataLoc[name]["contractValue"] += data["contractValue"] || 0;
    dataLoc[name]["budgetedAmount"] += data["budgetedAmount"] || 0;
  } else {
    dataLoc[name][valueField] += valueAtThisLevel;
  }

  fillSubData(
    layer + 1,
    maxLayer,
    entryList,
    dataLoc[name][entriesField],
    rest,
    valueAtThisLevel,
    query,
  );
};

export const transformData = (data, entryList, query) => {
  if (!data) return;
  if (entryList.length === 0) return data;

  const maxLayer = entryList.length;
  const newData = {};

  data.forEach((item) => {
    let layer = 0;
    const { nameField, valueField, entriesField } = entryList[layer];
    const name = getBaseJobName(item[nameField]);
    const value = item[valueField];

    const idName =
      query === "margin" || query === "revenue"
        ? maxLayer === 2
          ? "Year"
          : "Phase"
        : "id";
    if (!newData[name]) {
      newData[name] = {
        [idName]: name,
        [valueField]: 0,
        [entriesField]: layer + 1 >= maxLayer ? [] : {},
      };
    }

    if (query === "margin") {
      if (!newData[name]["totalCost"]) {
        newData[name]["totalCost"] = 0;
      }
      if (!newData[name]["contractValue"]) {
        newData[name]["contractValue"] = 0;
      }

      newData[name]["totalCost"] += item["totalCost"] || 0;
      newData[name]["contractValue"] += item["contractValue"] || 0;

      const totalCost = newData[name]["totalCost"];
      const contractValue = newData[name]["contractValue"];
      if (contractValue !== 0) {
        newData[name]["marginPercentage"] =
          ((contractValue - totalCost) / contractValue) * 100;
      } else {
        newData[name]["marginPercentage"] = 0;
      }
    } else if (query === "revenue") {
      if (!newData[name]["totalCost"]) {
        newData[name]["totalCost"] = 0;
      }
      if (!newData[name]["contractValue"]) {
        newData[name]["contractValue"] = 0;
      }
      if (!newData[name]["budgetedAmount"]) {
        newData[name]["budgetedAmount"] = 0;
      }

      newData[name]["totalCost"] += item["totalCost"] || 0;
      newData[name]["contractValue"] += item["contractValue"] || 0;
      newData[name]["budgetedAmount"] += item["budgetedAmount"] || 0;
    } else {
      newData[name][valueField] += value;
    }

    const rest = { ...item };
    delete rest[nameField];
    if (
      !["totalCost", "contractValue", "budgetedAmount"].includes(valueField)
    ) {
      delete rest[valueField];
    }

    layer += 1;

    fillSubData(
      layer,
      maxLayer,
      entryList,
      newData[name][entriesField],
      rest,
      value,
      query,
    );
  });

  const convertEntriesToArrays = (data, entryList, layer) => {
    if (layer >= entryList.length) {
      return data;
    }
    const entriesField = entryList[layer].entriesField;
    if (data[entriesField]) {
      if (Array.isArray(data[entriesField])) {
        data[entriesField] = data[entriesField].map((item) =>
          convertEntriesToArrays(item, entryList, layer + 1),
        );
      } else {
        data[entriesField] = Object.values(data[entriesField]).map((item) =>
          convertEntriesToArrays(item, entryList, layer + 1),
        );
      }
    }
    return data;
  };

  const transformedData = Object.values(newData).map((item) =>
    convertEntriesToArrays(item, entryList, 0),
  );

  transformedData.sort(
    (a, b) => b[entryList[0].valueField] - a[entryList[0].valueField],
  );

  return transformedData;
};
