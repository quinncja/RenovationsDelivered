import { createContext, useContext, useState, useCallback } from "react";

const InitializingContext = createContext();

export const useInitializing = () => {
  const context = useContext(InitializingContext);
  if (!context)
    throw new Error("useInitializing must be used within LoadingProvider");
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [loadingState, setLoadingState] = useState({
    phase: "initializing",
    criticalDataLoaded: {
      user: false,
      projects: false,
    },
    routeDataLoaded: false,
    error: null,
  });

  const updateLoadingState = useCallback((updates) => {
    setLoadingState((prev) => ({ ...prev, ...updates }));
  }, []);

  const setCriticalDataLoaded = useCallback((dataType) => {
    setLoadingState((prev) => ({
      ...prev,
      criticalDataLoaded: {
        ...prev.criticalDataLoaded,
        [dataType]: true,
      },
    }));
  }, []);

  const value = {
    ...loadingState,
    updateLoadingState,
    setCriticalDataLoaded,
    isAppReady:
      loadingState.criticalDataLoaded.user &&
      loadingState.criticalDataLoaded.projects,
  };

  return (
    <InitializingContext.Provider value={value}>
      {children}
    </InitializingContext.Provider>
  );
};
