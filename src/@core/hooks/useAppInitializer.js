import { useEffect, useCallback, useRef } from "react";
import { useTrackedProjects } from "@features/projects/context/TrackedProjectContext";
import { useJobcostContext } from "@features/jobcost/context/JobcostContext";
import { useProjectContext } from "@features/projects/context/ProjectContext";
import { loadProjectList } from "@features/projects/api/projectsApi";
import { loadUserData } from "@features/users/api/usersApi";
import { normalizeProjects } from "@features/projects/utils/projectNormalizer";
import { useInitializing } from "@core/context/InitializingContext";

export const useAppInitializer = (isAuthenticated) => {
  const { phase, updateLoadingState, setCriticalDataLoaded, isAppReady } =
    useInitializing();
  const { setTrackedJobs } = useTrackedProjects();
  const { setPageModifiers } = useJobcostContext();
  const { setProjects } = useProjectContext();
  const initRef = useRef(false);
  const abortControllerRef = useRef(null);

  const initializeCriticalData = useCallback(async () => {
    if (!isAuthenticated || initRef.current) return;
    initRef.current = true;

    const maxRetries = 5;
    let retryCount = 0;

    const attemptInit = async () => {
      let controller;
      try {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        controller = new AbortController();
        abortControllerRef.current = controller;

        updateLoadingState({ phase: "loading-critical" });

        const [userResult, projectsResult] = await Promise.allSettled([
          loadUserData(controller.signal),
          loadProjectList(controller.signal),
        ]);

        if (userResult.status === "fulfilled") {
          setPageModifiers(userResult.value?.data?.pageModifiers || {});
          setTrackedJobs(userResult.value?.data?.trackedJobs || []);
          setCriticalDataLoaded("user");
        } else {
          throw new Error("Failed to load user data");
        }

        if (projectsResult.status === "fulfilled") {
          const normalizedProjects = normalizeProjects(
            projectsResult.value.data,
          );
          console.log(normalizedProjects)
          setProjects(normalizedProjects);
          setCriticalDataLoaded("projects");
        } else {
          throw new Error("Failed to load projects");
        }

        updateLoadingState({ phase: "ready" });
      } catch (error) {
        console.log("Critical initialization error details:", {
          name: error.name,
          message: error.message,
          isAborted: controller?.signal?.aborted,
          retryCount: retryCount,
        });

        const isRealAbortError =
          error.name === "AbortError" && controller?.signal?.aborted;
        if (isRealAbortError) {
          console.log("Aborting due to explicit abort signal");
          throw error;
        }

        retryCount++;
        console.log(
          `Critical initialization error on attempt ${retryCount}/${maxRetries}:`,
          error.message,
        );

        if (retryCount <= maxRetries) {
          console.log(
            `Retrying critical initialization (attempt ${retryCount}/${maxRetries})`,
          );
          updateLoadingState({
            phase: "loading-critical",
            error: `Retrying... (${retryCount}/${maxRetries})`,
          });
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * retryCount),
          );
          return await attemptInit();
        } else {
          console.log(
            "Max retries reached for critical initialization, giving up",
          );
          throw error;
        }
      }
    };

    try {
      await attemptInit();
    } catch (error) {
      if (
        error.name !== "AbortError" &&
        !abortControllerRef.current?.signal?.aborted
      ) {
        console.error("Critical initialization failed after retries:", error);
        updateLoadingState({
          phase: "error",
          error: error.message,
        });
      }
    }
  }, [
    isAuthenticated,
    updateLoadingState,
    setCriticalDataLoaded,
    setPageModifiers,
    setTrackedJobs,
    setProjects,
  ]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated && phase === "initializing") {
      initializeCriticalData();
    }
  }, [isAuthenticated, phase, initializeCriticalData]);

  return { phase, isAppReady };
};
