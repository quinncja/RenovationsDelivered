import { deleteImageCache } from "utils/images/imageCacheUtils";
import { useUserSettings } from "./UserSettingsContext";
import { useHistory } from "./HistoryContext";
import { arrayMove } from "@dnd-kit/sortable";
import {
  addItemAction,
  addMultItemsAction,
  deleteMultItemsAction,
  removeItemAction,
  reorderByIndexAction,
} from "utils/dashboardActions";
import { createContext, useContext, useState, useRef } from "react";

const ItemsContext = createContext();
export const useItems = () => useContext(ItemsContext);

export const ItemsProvider = ({ children }) => {
  const { saveItems } = useUserSettings();
  const { pushHistory } = useHistory();
  const [items, setItems] = useState(false);
  const [dataMap, setDataMap] = useState({});
  const [dragging, setDragging] = useState(false);
  const chartRefs = useRef({});
  const idRef = useRef([]);
  const [capturedState, setCapturedState] = useState({});

  const itemSaver = async (items) => {
    try {
      await saveItems(items);
    } catch (error) {
      console.log(error);
    }
  };

  const updateDataMap = (id, data) => {
    setDataMap((prev) => {
      return {
        ...prev,
        [id]: data,
      };
    });
  };

  const clearDataMap = () => {
    setDataMap({});
  };

  const clearOpenData = () => {
    setDataMap((prev) => {
      return {
        ...prev,
        open: null,
      };
    });
  };

  const addItemFn = addItemAction(setItems, itemSaver);
  const removeItemFn = removeItemAction(setItems, itemSaver, deleteImageCache);
  const reorderByIndexFn = reorderByIndexAction(setItems, itemSaver);
  const addMultItemsFn = addMultItemsAction(setItems, itemSaver);
  const deleteMultItemsFn = deleteMultItemsAction(
    setItems,
    itemSaver,
    deleteImageCache,
  );

  const addMultItems = async (itemList) => {
    const prevItems = [...items]
    setItems([])
    addMultItemsFn(itemList);

    const itemsCopy = [...itemList];
    const historyObj = {
      text: "New Widgets",
      redo: () => {
        setItems([])
        addMultItemsFn(itemsCopy)
      },
      undo: () => {
        deleteMultItemsFn(itemsCopy)
        addMultItemsFn(prevItems)},
    };

    pushHistory(historyObj);
  };

  const addItem = async (newItem, newIndex) => {
    addItemFn(newItem, newIndex);

    const historyObj = {
      text: "New Widget",
      type: "add",
      redo: () => addItemFn(newItem, newIndex),
      undo: () => removeItemFn(newItem),
    };

    pushHistory(historyObj);
  };

  const removeItem = (id, historyFlag = false) => {
    const itemToRemove = items.find((item) => item.id === id);
    const index = items.findIndex((item) => item.id === id);

    removeItemFn(itemToRemove);

    if (!historyFlag) {
      const historyObj = {
        text: "Delete Widget",
        undo: () => addItemFn(itemToRemove, index),
        redo: () => removeItemFn(itemToRemove),
      };
      pushHistory(historyObj);
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

  return (
    <ItemsContext.Provider
      value={{
        items,
        setItems,
        dragging,
        setDragging,
        addItem,
        removeItem,
        addMultItems,
        reorderById,
        captureItemState,
        compareItemStates,
        chartRefs,
        dataMap,
        updateDataMap,
        clearDataMap,
        clearOpenData,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
