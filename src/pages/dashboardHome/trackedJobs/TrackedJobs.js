import { useModalContext } from "context/ModalContext";
import TrackedJob from "./TrackedJob";
import { useTrackedJobs } from "context/TrackedJobContext";
import { useHome } from "context/HomeContext";
import { useProjectContext } from "context/ProjectContext";
import TrackedJobsHeader from "./header/TrackedJobsHeader";
import { useEffect, useMemo} from "react";
import { fetchJobListData } from "utils/api";

function TrackedJobs({ jobs }) {
  const { openModal } = useModalContext();
  const { updateTrackedJobs, setDataMap, filterJobs, setLoadingMap } = useTrackedJobs();
  const { getActiveJobs } = useProjectContext();
  const { homeState } = useHome();
  const activeJobs = useMemo(() => getActiveJobs(), [getActiveJobs]);

   const jobsToShow = useMemo(() => 
    homeState === "year" ? activeJobs : jobs, 
    [homeState, activeJobs, jobs]
  );
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    setLoadingMap(true);
    
    const loadJobListData = async () => {
      if (!jobsToShow || jobsToShow.length === 0) {
        setDataMap({});
        setLoadingMap(true);
        return;
      }
      
      try {
        const result = await fetchJobListData(jobsToShow, signal);
        if (result) {
          setDataMap(result);
        }
      } catch (error) {
        setDataMap({});
      } finally {
        setLoadingMap(false);
      }
    };
  
    loadJobListData();
    
    return () => {
      controller.abort();
    };
  }, [jobsToShow, setDataMap, setLoadingMap]);
  
  const filteredJobsToShow = filterJobs(jobsToShow);

  const handleClick = () => {
    openModal("addJobs");
  };

  const handleDelete = async (id) => {
    const newJobs = jobs.filter((job) => job !== id);
    await updateTrackedJobs(newJobs, "Delete");
  };

  return (
    <>
      <div className="jobs-header">
        <h2> Projects </h2>
        {homeState !== "year" && (
          <button
            className="job-button add-new-button"
            onClick={() => handleClick()}
          >
            + add new
          </button>
        )}
      </div>
      <TrackedJobsHeader filteredJobsToShow={filteredJobsToShow}/>
          <div className="tracked-jobs">
            {filteredJobsToShow.map((job) => (
              <TrackedJob
                key={job}
                job={job}
                id={job}
                deleteSelf={handleDelete}
              />
            ))}
          </div>   
    </>
  );
}

export default TrackedJobs;
