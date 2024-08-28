import { useEffect } from 'react';

export const useUndo = (onUndo) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.metaKey || event.ctrlKey) && (!event.shiftKey) && event.key === 'z') {
                event.preventDefault(); 
                onUndo();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onUndo]);
};

export const useRedo = (onRedo) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === 'z') {
                event.preventDefault(); 
                onRedo();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onRedo]);
}