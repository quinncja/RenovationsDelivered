import React, { createContext, useContext, useEffect, useState } from "react";
import { useUserSettings } from "./UserSettingsContext";
import { updatePageModifiersAction } from "utils/dashboardActions";
import { useHistory } from "./HistoryContext";
import { useItems } from "./ItemsContext";

const ModifierContext = createContext();

export const useModifiers = () => useContext(ModifierContext);

export const ModifierProvider = ({ children }) => {
  const { savePageModifiers } = useUserSettings();
  const { clearDataMap } = useItems();
  const [pageModifiers, setPageModifiers] = useState({
    jobNum: null,
    yearId: null,
    phaseId: null,
    state: null,
    pm: null,
    active: "Total",
  });
  const [modTimeout, setModTimeout] = useState(true);
  const { pushHistory } = useHistory();

  useEffect(() => {
    if (modTimeout) {
      setTimeout(() => {
        setModTimeout(false);
      }, 1000);
    }
  }, [modTimeout]);

  const updatePageModifiers = (newMods, flag = false) => {
    clearDataMap();
    setModTimeout(true);
    const oldMods = { ...pageModifiers };
    const newModObj = {
      ...pageModifiers,
      ...newMods,
    };

    const updatePageModifiersFn = updatePageModifiersAction(
      setPageModifiers,
      setModTimeout,
      clearDataMap,
    );
    updatePageModifiersFn(newMods);

    if (!flag) {
      const historyObj = {
        text: "Modifer change",
        type: "fixed",
        undo: () => updatePageModifiersFn(oldMods),
        redo: () => updatePageModifiersFn(newModObj),
      };
      pushHistory(historyObj);
    }
    setPageModifiers(newModObj);
  };

  useEffect(() => {
    const updateDBModifiers = async () => {
      try {
        await savePageModifiers(pageModifiers);
      } catch (error) {
        console.log(error);
      }
    };

    updateDBModifiers();
    // eslint-disable-next-line
  }, [pageModifiers]);

  // // // // // // //
  //    INACTIVE    //
  // Item Modifiers //
  // // // // // // //

  // const modifierSaver = async (mods) => {
  //   try {
  //     await saveModifiers(mods);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const editModifiers = async (id, newMods, flag, callback) => {
  //   let exisiting = {};
  //   let isEmpty = !newMods || Object.keys(newMods).length === 0;

  //   if (modifiers && modifiers.length > 0) {
  //     setModifiers((prevModifiers) => {
  //       let found = false;

  //       const newModifiers = prevModifiers.map((mod) => {
  //         if (mod.id === id) {
  //           exisiting = { ...mod };

  //           found = true;
  //           return {
  //             ...mod,
  //             modifiers: isEmpty ? {} : { ...mod.modifiers, ...newMods },
  //           };
  //         }
  //         return mod;
  //       });

  //       if (!found) {
  //         newModifiers.push({ id, modifiers: newMods });
  //       }

  //       modifierSaver(newModifiers);
  //       return newModifiers;
  //     });
  //   } else {
  //     modifierSaver([{ id, modifiers: newMods }]);
  //     setModifiers([{ id, modifiers: newMods }]);
  //   }

  //   if (!flag) {
  //     const historyObj = {
  //       text: "Modifier Edit",
  //       type: "fixed",
  //       unAction: () => editModifiers(id, newMods, true),
  //       action: () => editModifiers(id, exisiting.modifiers, true),
  //     };
  //     pushHistory(historyObj);
  //   }

  //   if (callback) {
  //     callback();
  //   }
  // };

  // const updateBoth = (newItems, newMods) => {
  //   setItems(newItems);
  //   setModifiers(newMods);
  //   itemSaver(newItems);
  //   modifierSaver(newMods);
  // }

  // const editAndAddItem = (oldItem, oldModifiers, iIndex) => {
  //   console.log("eanda", oldItem, oldModifiers)
  //     editModifiers(oldItem.id, oldModifiers.modifiers, true, () => {
  //       addItem(oldItem, iIndex, true);
  //     });
  // };

  // const getModifier = (id) => {
  //   if (modifiers) return modifiers.find((modifier) => modifier.id === id);
  // };

  // // // // // // //
  //    INACTIVE    //
  //   Smart Sort   //
  // // // // // // //

  // const getChartSize = (type) => {
  //   const chartType = getChartObj(type).chartType;
  //   if (chartType === "Pie") return 1;
  //   return 2;
  // };

  // const swapPositions = (i, k, newItems) => {
  //   const temp = newItems[i];
  //   newItems[i] = newItems[k];
  //   newItems[k] = temp;
  // };

  // const forwardSearch = (i, count, newItems, columnCount) => {
  //   let currentCount = count - getChartSize(newItems[i].type);

  //   for (let k = i + 1; k < newItems.length; k++) {
  //     const size = getChartSize(newItems[k].type);
  //     currentCount += size;

  //     if (currentCount > columnCount) {
  //       currentCount -= size;
  //     } else if (currentCount === columnCount) {
  //       swapPositions(i, k, newItems);
  //       return newItems;
  //     }
  //   }
  //   return newItems;
  // };

  // const smartSortFunc = () => {
  //   let count = 0;
  //   let columnCount = 4; // change this to be dynamic later
  //   let newItems = [...items];

  //   for (let i = 0; i < newItems.length; i++) {
  //     const size = getChartSize(newItems[i].type);
  //     count += size;
  //     if (count > columnCount) {
  //       newItems = forwardSearch(i, count, newItems, columnCount);
  //       count = 0;
  //     }
  //     if (count === columnCount) count = 0;
  //   }
  //   setItems(newItems);
  // };

  return (
    <ModifierContext.Provider
      value={{
        pageModifiers,
        setPageModifiers,
        updatePageModifiers,
        modTimeout,
        setModTimeout,
      }}
    >
      {children}
    </ModifierContext.Provider>
  );
};
