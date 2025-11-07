import { useModalContext } from "@shared/context/ModalContext";
import TrackedJob from "../../../projects/components/tracked-projects/Project";
import { useTrackedProjects } from "@features/projects/context/TrackedProjectContext";
import { useProjectContext } from "@features/projects/context/ProjectContext";
import TrackedJobsHeader from "./header/TrackedProjectsHeader";
import { useEffect, useMemo, useRef } from "react";
import useIsAdmin from "@shared/hooks/useIsAdmin";
import { useInitializing } from "@core/context/InitializingContext";
import { toast } from "sonner";
import WidgetSection from "../WidgetSection";
import { fetchProjectListData } from "@features/projects/api/projectsApi";

function TrackedProjectsSection({ jobs }) {
  const { openModal } = useModalContext();
  const { updateTrackedJobs, setDataMap, filterJobs, setLoadingMap } =
    useTrackedProjects();
  const { getActiveJobs } = useProjectContext();
  const isAdmin = useIsAdmin();
  const activeJobs = useMemo(() => getActiveJobs(), [getActiveJobs]);
  const { isAppReady } = useInitializing();

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

          const result = await fetchProjectListData(
            jobsToShow,
            controller.signal,
          );
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
  // eslint-disable-next-line
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
    <WidgetSection color="white" title={`${isAdmin && "Active"} Projects`}>
      {!isAdmin && (
        <div style={{ display: "flex", alignItems: "baseline", gap: "15px" }}>
          <button
            className="job-button add-new-button"
            onClick={() => handleClick()}
          >
            + add new
          </button>
        </div>
      )}
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
    </WidgetSection>
  );
}

export default TrackedProjectsSection;
