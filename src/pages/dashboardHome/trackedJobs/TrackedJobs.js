import { useModalContext } from "context/ModalContext";
import TrackedJob from "./TrackedJob";
import { useTrackedJobs } from "context/TrackedJobContext";
import { useProjectContext } from "context/ProjectContext";
import TrackedJobsHeader from "./header/TrackedJobsHeader";
import { useEffect, useMemo, useRef } from "react";
import { fetchJobListData } from "utils/api";
import useIsAdmin from "utils/hooks/useIsAdmin";
import { useLoading } from "app/LoadingContext";
import { toast } from "sonner";

function TrackedJobs({ jobs }) {
  const { openModal } = useModalContext();
  const { updateTrackedJobs, setDataMap, filterJobs, setLoadingMap } =
    useTrackedJobs();
  const { getActiveJobs } = useProjectContext();
  const isAdmin = useIsAdmin();
  const activeJobs = useMemo(() => getActiveJobs(), [getActiveJobs]);
  const { isAppReady } = useLoading();

  const jobsToShow = useMemo(
    () => (isAdmin ? activeJobs : jobs),
    [activeJobs, jobs, isAdmin],
  );

  const abortControllerRef = useRef(null);
  const headerRef = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    const sentinel = sentinelRef.current;
    if (!header || !sentinel) return;

    const observer = new IntersectionObserver(
      ([e]) => header.classList.toggle("is-pinned", e.intersectionRatio < 1),
      { threshold: [1] },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const loadJobListData = async () => {
      if (!jobsToShow || jobsToShow.length === 0) {
        setDataMap({});
        setLoadingMap(true);
        return;
      }

      const maxRetries = 5;
      let retryCount = 0;

      const attemptLoad = async () => {
        let controller;
        try {
          if (abortControllerRef.current) {
            abortControllerRef.current.abort();
          }
          controller = new AbortController();
          abortControllerRef.current = controller;

          const result = await fetchJobListData(jobsToShow, controller.signal);
          if (result) {
            setDataMap(result);
          }
          return;
        } catch (error) {
          console.log("Error details:", {
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
            `Error on attempt ${retryCount}/${maxRetries}:`,
            error.message,
          );

          if (retryCount <= maxRetries) {
            console.log(
              `Retrying job list data fetch (attempt ${retryCount}/${maxRetries})`,
            );
            await new Promise((resolve) =>
              setTimeout(resolve, 1000 * retryCount),
            );
          } else {
            console.log("Max retries reached, giving up");
            throw error;
          }
        }
      };

      while (retryCount <= maxRetries) {
        try {
          await attemptLoad();
          break;
        } catch (error) {
          if (
            error.name === "AbortError" &&
            abortControllerRef.current?.signal?.aborted
          ) {
            break;
          }
          if (retryCount > maxRetries) {
            console.error("Failed to load job list data after retries:", error);
            setDataMap({});
            toast.error("Failed to load job data");
            break;
          }
        }
      }

      setLoadingMap(false);
    };

    if (isAppReady) {
      loadJobListData();
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [jobsToShow, isAppReady]);

  const filteredJobsToShow = filterJobs(jobsToShow);

  const handleClick = () => {
    openModal("addJobs");
  };

  const handleDelete = async (id) => {
    const newJobs = jobs.filter((job) => job !== id);
    await updateTrackedJobs(newJobs, "Delete");
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", width: "100%" }}
      className="left-blur blur-white"
    >
      <div
        ref={sentinelRef}
        style={{
          height: "1px",
          position: "absolute",
          top: "-1px",
          left: 0,
          right: 0,
        }}
      />

      <div
        ref={headerRef}
        className="jobs-header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "15px" }}>
          <h2> {isAdmin && "Active"} Projects </h2>
          {!isAdmin && (
            <button
              className="job-button add-new-button"
              onClick={() => handleClick()}
            >
              + add new
            </button>
          )}
        </div>
      </div>
      <TrackedJobsHeader filteredJobsToShow={filteredJobsToShow} />
      <div className="tracked-jobs">
        {filteredJobsToShow.length > 0 ? (
          filteredJobsToShow.map((job) => (
            <TrackedJob
              key={job}
              job={job}
              id={job}
              deleteSelf={handleDelete}
            />
          ))
        ) : (
          <h4 style={{ color: "white", fontWeight: "500", paddingTop: "20px" }}>
            {" "}
            No projects to display{" "}
          </h4>
        )}
      </div>
    </div>
  );
}

export default TrackedJobs;
