import { arrayMove } from "@dnd-kit/sortable";

export const addItemAction = (setItems, itemSaver) => (newItem, newIndex) => {
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
};

export const removeItemAction =
  (setItems, itemSaver, deleteImageCache) => (itemToRemove) => {
    setItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== itemToRemove.id);
      itemSaver(newItems);
      return newItems;
    });

    if (deleteImageCache) {
      deleteImageCache(itemToRemove.id);
    }
  };

export const addMultItemsAction = (setItems, itemSaver) => (itemList) => {
  setItems((prevItems) => {
    const newItems = prevItems ? [...prevItems] : [];
    newItems.push(...itemList);
    itemSaver(newItems);
    return newItems;
  });
};

export const deleteMultItemsAction =
  (setItems, itemSaver, deleteImageCache) => (itemList) => {
    itemList.forEach((item) => {
      deleteImageCache(item.id);
    });

    setItems((prevItems) => {
      const newItems = prevItems.filter((item) => !itemList.includes(item));
      itemSaver(newItems);
      return newItems;
    });
  };

export const reorderByIndexAction =
  (setItems, itemSaver) => (index1, index2) => {
    setItems((items) => {
      const newItems = arrayMove(items, index2, index1);
      itemSaver(newItems);
      return newItems;
    });
  };

export const updatePageModifiersAction =
  (setPageModifiers, setModTimeout, clearDataMap) => (newMods) => {
    clearDataMap();
    setModTimeout(true);
    setPageModifiers((prevModifiers) => ({
      ...prevModifiers,
      ...newMods,
    }));
  };
