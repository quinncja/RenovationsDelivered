import { useModifiers } from "context/ModifierContext";
import { useSingle } from "./useSingle";
import { useMemo } from "react";

const typeMap = {
  budget: { list: [] },
  "margin-single": { list: [] },
  "revenue-single": { list: [] },
  revenue: {
    entriesTag: "Projects",
    list: [
      {
        prevTag: "Years",
        nameField: "Year",
        valueField: "contractValue",
        entriesField: "Phases",
      },
      {
        prevTag: "Phases",
        nameField: "Phase",
        valueField: "contractValue",
        entriesField: "Items",
      },
    ],
  },
  margin: {
    entriesTag: "Projects",
    list: [
      {
        prevTag: "Years",
        nameField: "Year",
        valueField: "marginPercentage",
        entriesField: "Phases",
      },
      {
        prevTag: "Phases",
        nameField: "Phase",
        valueField: "marginPercentage",
        entriesField: "Items",
      },
    ],
  },
  vender: {
    entriesTag: "Orders",
    list: [
      {
        nameField: "vendorName",
        valueField: "value",
        entriesField: "Projects",
      },
      {
        prevTag: "Projects",
        nameField: "Project",
        valueField: "Total",
        entriesField: "Years",
      },
      {
        prevTag: "Years",
        nameField: "Year",
        valueField: "Total",
        entriesField: "Phases",
      },
      {
        prevTag: "Phases",
        nameField: "Phase",
        valueField: "Total",
        entriesField: "Items",
      },
    ],
  },
  cogs: {
    entriesTag: "Items",
    list: [
      {
        nameField: "vendorName",
        valueField: "value",
        entriesField: "jobNames",
      },
      {
        prevTag: "Projects",
        nameField: "Project",
        valueField: "Total",
        entriesField: "Phases",
      },
      {
        prevTag: "Years",
        nameField: "Year",
        valueField: "Total",
        entriesField: "Phases",
      },
      {
        prevTag: "Phases",
        nameField: "Phase",
        valueField: "Total",
        entriesField: "Items",
      },
    ],
  },
  sub: {
    entriesTag: "Contracts",
    list: [
      {
        nameField: "subName",
        valueField: "value",
        entriesField: "Jobs",
      },
      {
        prevTag: "Projects",
        nameField: "Project",
        valueField: "Total",
        entriesField: "Phases",
      },
      {
        prevTag: "Years",
        nameField: "Year",
        valueField: "Total",
        entriesField: "Phases",
      },
      {
        prevTag: "Phases",
        nameField: "Phase",
        valueField: "Total",
        entriesField: "Contracts",
      },
    ],
  },

  client: {
    entriesTag: "Phases",
    list: [
      {
        nameField: "clientName",
        valueField: "value",
        entriesField: "Jobs",
      },
      {
        prevTag: "Projects",
        nameField: "Project",
        valueField: "Total",
        entriesField: "Phases",
      },
      {
        prevTag: "Years",
        nameField: "Year",
        valueField: "Total",
        entriesField: "Phases",
      },
    ],
  },
};

export const useNestingLevel = (type) => {
  const { pageModifiers } = useModifiers();
  const single = useSingle();
  const nestingObj = typeMap[type];
  const { entriesTag, list } = nestingObj;
  const nestingList = useMemo(() => {
    let newList = [...list];

    if (single)
      newList = newList.filter(
        (item) =>
          item.nameField !== "Project" &&
          item.nameField !== "Phase" &&
          item.nameField !== "Year",
      );
    else if (pageModifiers.jobNum && !pageModifiers.phaseId)
      newList = newList.filter((item) => item.nameField !== "Project");
    else if (pageModifiers.phaseId && !pageModifiers.jobNum)
      newList = newList.filter((item) => item.nameField !== "Phase");

    if (pageModifiers.yearId)
      newList = newList.filter((item) => item.nameField !== "Year");

    for (var i = 0; i < newList.length - 1; i++) {
      newList[i].entriesField = newList[i + 1].prevTag;
    }

    if (newList[newList.length - 1])
      newList[newList.length - 1].entriesField = entriesTag;

    return newList;
  }, [pageModifiers, single, entriesTag, list]);

  return nestingList;
};
