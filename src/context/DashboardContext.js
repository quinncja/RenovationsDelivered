import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { chartObjects } from "graphs/ChartObjects";
import { arrayMove } from "@dnd-kit/sortable";
import { useRedo, useUndo } from "utils/hooks/useHistory";
import { useSystemMessage } from "context/SystemMessageContext";
import { useUserSettings } from "./UserSettingsContext";

const DashboardContext = createContext();

export const useDashboardContext = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const {saveItems, saveModifiers, savePageModifiers} = useUserSettings();
  const [active, setActive] = useState(false);
  const [smartSort, setSmartSort] = useState("true");
  const [items, setItems] = useState([]);
  const [snapshots, setSnapshots] = useState([]);
  const chartRefs = useRef({});
  const [pageModifiers, setPageModifiers] = useState({
    job: null,
    year: null,
    phase: null,
  });
  const [modifiers, setModifiers] = useState([]);
  const [legends, setLegends] = useState([]);
  const [capturedState, setCapturedState] = useState({});
  const [history, setHistory] = useState([]);
  const historyPtr = useRef(0);
  const idRef = useRef([]);
  const undoActive = historyPtr.current > 0;
  const redoActive = historyPtr.current <= history.length - 1;
  const [loaded, setLoaded] = useState(false);
  const { setMessage } = useSystemMessage();

  const [newWidgetOpen, setNewWidgetOpen] = useState(false);

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

  // // // // // //
  // Undo / Redo //
  // // // // // //

  const pushHistory = (newData) => {
    setHistory((prevHistory) => {
      const truncatedHistory = prevHistory.slice(0, historyPtr.current);
      const newHistory = [...truncatedHistory, newData];
      historyPtr.current = newHistory.length;
      return newHistory;
    });
  };

  const enactChange = (type, change) => {
    if (type === "undo") {
      change.action();
      setMessage(`Undo ${change.text}`);
    }
    if (type === "redo") {
      change.unAction();
      setMessage(`Redo ${change.text}`);
    }
  };

  const handleRedo = () => {
    if (redoActive) {
      const actionToRedo = history[historyPtr.current];
      enactChange("redo", actionToRedo);
      historyPtr.current += 1;
    }
  };

  const handleUndo = () => {
    if (undoActive) {
      historyPtr.current -= 1;
      const actionToUndo = history[historyPtr.current];
      enactChange("undo", actionToUndo);
    }
  };

  useUndo(handleUndo);
  useRedo(handleRedo);

  // // // // // // // //
  // Add / Delete Item //
  // // // // // // // //

  const addMultItems = async (itemList) => {
    setItems((prevItems) => {
      const newItems = prevItems ? [...prevItems] : [];
      newItems.push(...itemList);
      itemSaver(newItems);
      return newItems;
    });
  }

  const addItem = async (newItem, newIndex, flag) => {
    setItems((prevItems) => {
      const newItems = prevItems ? [...prevItems] : [];

      if (newIndex >= 0 && newIndex < newItems.length) {
        newItems.splice(newIndex, 0, newItem);
      } else {
        newItems.push(newItem);
      }

      itemSaver(newItems);
      return newItems;
    });
    if (!flag) {
      const item = newItem;
      const index = newIndex;
      const historyObj = {
        text: "New Widget",
        type: "add",
        unAction: () => addItem(item, index, true),
        action: () => removeItem(item, true),
      };
      pushHistory(historyObj);
    }
  };

  const removeItem = async (id) => {
    const newItems = [...items];
    const iIndex = newItems.findIndex((item) => item.id === id);
    const oldItem = { ...newItems[iIndex] };

    if (iIndex > -1) {
      newItems.splice(iIndex, 1);
    }

    const historyObj = {
      text: "Delete Widget",
      unAction: () => removeItem(oldItem, true),
      action: () => addItem(oldItem, iIndex),
    };
    pushHistory(historyObj);
    itemSaver(newItems)
    setItems(newItems);
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

    const historyObj = {
      text: "Move",
      type: "fixed",
      action: () => reorderByIndex(ids[0], ids[1]),
      unAction: () => reorderByIndex(ids[1], ids[0]),
    };

    pushHistory(historyObj);
  };

  const reorderByIndex = (index1, index2) => {
    setItems((items) => {
      const newItems = arrayMove(items, index1, index2);
      itemSaver(newItems);
      return newItems;
    });
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
        handleUndo,
        handleRedo,
        undoActive,
        redoActive,
        smartSort,
        setSmartSort,
        pageModifiers,
        setPageModifiers,
        snapshots,
        setSnapshots,
        chartRefs,
        newWidgetOpen,
        setNewWidgetOpen,
        addMultItems,
        loaded
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
