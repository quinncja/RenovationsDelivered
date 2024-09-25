import { createContext, useContext, useState, useRef } from 'react';
import { useSystemMessage } from "modules/systemMessage/SystemMessageContext";
import { useRedo, useUndo } from 'utils/hooks/useHistory';

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
    const { setMessage } = useSystemMessage();
    const [history, setHistory] = useState([]);
    const historyPtr = useRef(0);
    const undoActive = historyPtr.current > 0;
    const redoActive = historyPtr.current <= history.length - 1;

    const pushHistory = (newData) => {
        setHistory((prevHistory) => {
        const truncatedHistory = prevHistory.slice(0, historyPtr.current);
        const newHistory = [...truncatedHistory, newData];
        historyPtr.current = newHistory.length;
        return newHistory;
        });
        console.log(newData)
    };

    const enactChange = (type, change) => {
        if (type === "undo") {
            change.undo();
            setMessage(`Undo ${change.text}`);
        }
        if (type === "redo") {
            change.redo();
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

    return (
        <HistoryContext.Provider value={{ pushHistory, undoActive, redoActive }}>
        {children}
        </HistoryContext.Provider>
    );
};

export const useHistory = () => useContext(HistoryContext);
