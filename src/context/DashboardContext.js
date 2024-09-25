import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { chartObjects } from "graphs/ChartObjects";
import { arrayMove } from "@dnd-kit/sortable";
import { useSystemMessage } from "modules/systemMessage/SystemMessageContext";
import { useUserSettings } from "./UserSettingsContext";
import { deleteImageCache } from "utils/images/imageCacheUtils";
import { addItemAction, addMultItemsAction, deleteMultItemsAction, removeItemAction, reorderByIndexAction, updatePageModifiersAction } from "utils/dashboardActions";
import { useHistory } from "./HistoryContext";

const DashboardContext = createContext();

export const useDashboardContext = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const { saveItems, saveModifiers, savePageModifiers } = useUserSettings();
  const [active, setActive] = useState(false);
  const [smartSort, setSmartSort] = useState("true");
  const [items, setItems] = useState([]);
  const chartRefs = useRef({});
  const [pageModifiers, setPageModifiers] = useState({
    job: null,
    year: null,
    phase: null,
    active: null,
  });
  const [modifiers, setModifiers] = useState([]);
  const [legends, setLegends] = useState([]);
  const [capturedState, setCapturedState] = useState({});
  const idRef = useRef([]);
  const [loaded, setLoaded] = useState(false);
  const { setMessage } = useSystemMessage();
  const [modTimeout, setModTimeout] = useState(true);
  const { pushHistory } = useHistory()

  useEffect(() => {
    if (modTimeout) {
      setTimeout(() => {
        setModTimeout(false);
      }, 1000);
    }
  }, [modTimeout]);

  useEffect(() => {
    if (smartSort === "true") smartSortFunc();
    // eslint-disable-next-line
  }, [smartSort]);

  const onLoad = (items, modifiers, pageModifiers) => {
    setLoaded(true);
    setItems(items);
    setModifiers(modifiers);
    setPageModifiers(pageModifiers);
  };

  // // // // // // // //
  // Add / Delete Item //
  // // // // // // // //

  const addMultItems = async (itemList) => {
    const addMultItemsFn = addMultItemsAction(setItems, itemSaver);
    const deleteMultItemsFn = deleteMultItemsAction(setItems, itemSaver, deleteImageCache);

    addMultItemsFn(itemList);

    const itemsCopy = [...itemList];
    const historyObj = {
      text: "New Widgets",
      redo: () => addMultItemsFn(itemsCopy),
      undo: () => deleteMultItemsFn(itemsCopy),
    };

    pushHistory(historyObj);
  }
  
  const addItem = async (newItem, newIndex) => {
    const addItemFn = addItemAction(setItems, itemSaver)
    const removeItemFn = removeItemAction(setItems, itemSaver);

    addItemFn(newItem, newIndex);

    const historyObj = {
      text: "New Widget",
      type: "add",
      redo: () => addItemFn(newItem, newIndex),
      undo: () => removeItemFn(newItem),
    };

    pushHistory(historyObj);
  };

  const resetActiveModifier = () => {
    setTimeout(() => {
      setMessage("Filter set to all Jobs");
      setPageModifiers((prev) => ({
        ...prev,
        active: "Total",
      }));
    }, 100);
  };

  const removeItem = (id, historyFlag = false) => {
    const itemToRemove = items.find((item) => item.id === id);
    const index = items.findIndex((item) => item.id === id);

    const removeItemFn = removeItemAction(
      setItems,
      itemSaver,
      deleteImageCache,
      resetActiveModifier
    );

    const addItemFn = addItemAction(setItems, itemSaver);

    removeItemFn(itemToRemove);

    if (!historyFlag) {
      const historyObj = {
        text: 'Delete Widget',
        undo: () => addItemFn(itemToRemove, index),
        redo: () => removeItemFn(itemToRemove),
      };
      pushHistory(historyObj);
    }
  };

  // // // // // // //
  // Reorder Items  //
  // // // // // // //

  const itemSaver = async (items) => {
    try {
      await saveItems(items);
    } catch (error) {
      console.log(error);
    }
  };

  const captureItemState = (active) => {
    const activeIndex = items.findIndex((item) => item.id === active.id);
    idRef.current[0] = activeIndex;
    setCapturedState(items);
  };

  const compareItemStates = () => {
    let array1 = JSON.stringify(items);
    let array2 = JSON.stringify(capturedState);

    if (array1 === array2) {
      setCapturedState({});
      return;
    }

    const ids = [...idRef.current];

    const reorderByIndexFn = reorderByIndexAction(setItems, itemSaver);
    
    const historyObj = {
      text: "Move",
      type: "fixed",
      redo: () => reorderByIndexFn(ids[0], ids[1]),
      undo: () => reorderByIndexFn(ids[1], ids[0]),
    };

    pushHistory(historyObj);
  };

  const reorderById = (activeId, overId) => {
    setItems((items) => {
      const activeIndex = items.findIndex((item) => item.id === activeId);
      const overIndex = items.findIndex((item) => item.id === overId);

      idRef.current[1] = [overIndex];

      const newItems = arrayMove(items, activeIndex, overIndex);
      itemSaver(newItems);
      return newItems;
    });
  };

  // // // // // // //
  //  DB Modifiers  //
  // // // // // // //

  const updatePageModifiers = (newMods, flag = false) => {
    setModTimeout(true);
    const oldMods = { ...pageModifiers };
    const newModObj = {
      ...pageModifiers,
      ...newMods,
    };

    const updatePageModifiersFn = updatePageModifiersAction(setPageModifiers, setModTimeout);
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

    if (loaded) updateDBModifiers();
    // eslint-disable-next-line
  }, [pageModifiers, loaded]);

  // // // // // //
  //  Modifiers  //
  // // // // // //
  //   INACTIVE  //
  // // // // // //

  const modifierSaver = async (mods) => {
    try {
      await saveModifiers(mods);
    } catch (error) {
      console.log(error);
    }
  };

  const editModifiers = async (id, newMods, flag, callback) => {
    let exisiting = {};
    let isEmpty = !newMods || Object.keys(newMods).length === 0;

    if (modifiers && modifiers.length > 0) {
      setModifiers((prevModifiers) => {
        let found = false;

        const newModifiers = prevModifiers.map((mod) => {
          if (mod.id === id) {
            exisiting = { ...mod };

            found = true;
            return {
              ...mod,
              modifiers: isEmpty ? {} : { ...mod.modifiers, ...newMods },
            };
          }
          return mod;
        });

        if (!found) {
          newModifiers.push({ id, modifiers: newMods });
        }

        modifierSaver(newModifiers);
        return newModifiers;
      });
    } else {
      modifierSaver([{ id, modifiers: newMods }]);
      setModifiers([{ id, modifiers: newMods }]);
    }

    if (!flag) {
      const historyObj = {
        text: "Modifier Edit",
        type: "fixed",
        unAction: () => editModifiers(id, newMods, true),
        action: () => editModifiers(id, exisiting.modifiers, true),
      };
      pushHistory(historyObj);
    }

    if (callback) {
      callback();
    }
  };

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

  const getModifier = (id) => {
    if (modifiers) return modifiers.find((modifier) => modifier.id === id);
  };

  const getModiferOptions = (type) => {
    return chartObjects.find((obj) => obj.type === type).modifierOptions;
  };

  const getChartObj = (type) => {
    return chartObjects.find((obj) => obj.type === type);
  };

  // // // // // //
  // Smart Sort  //
  // // // // // //

  const getChartSize = (type) => {
    const chartType = getChartObj(type).chartType;
    if (chartType === "Pie") return 1;
    return 2;
  };

  const swapPositions = (i, k, newItems) => {
    const temp = newItems[i];
    newItems[i] = newItems[k];
    newItems[k] = temp;
  };

  const forwardSearch = (i, count, newItems, columnCount) => {
    let currentCount = count - getChartSize(newItems[i].type);

    for (let k = i + 1; k < newItems.length; k++) {
      const size = getChartSize(newItems[k].type);
      currentCount += size;

      if (currentCount > columnCount) {
        currentCount -= size;
      } else if (currentCount === columnCount) {
        swapPositions(i, k, newItems);
        return newItems;
      }
    }
    return newItems;
  };

  const smartSortFunc = () => {
    let count = 0;
    let columnCount = 4; // change this to be dynamic later
    let newItems = [...items];

    for (let i = 0; i < newItems.length; i++) {
      const size = getChartSize(newItems[i].type);
      count += size;
      if (count > columnCount) {
        newItems = forwardSearch(i, count, newItems, columnCount);
        count = 0;
      }
      if (count === columnCount) count = 0;
    }
    setItems(newItems);
  };

  return (
    <DashboardContext.Provider
      value={{
        active,
        setActive,
        items,
        removeItem,
        onLoad,
        legends,
        setLegends,
        reorderById,
        addItem,
        editModifiers,
        getModifier,
        getChartObj,
        getModiferOptions,
        captureItemState,
        compareItemStates,
        smartSort,
        setSmartSort,
        pageModifiers,
        setPageModifiers,
        updatePageModifiers,
        chartRefs,
        addMultItems,
        loaded,
        modTimeout,
        setModTimeout,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
