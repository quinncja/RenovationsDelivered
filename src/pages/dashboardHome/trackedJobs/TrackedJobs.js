import { useModalContext } from "context/ModalContext";
import TrackedJob from "./TrackedJob";
import { useTrackedJobs } from "context/TrackedJobContext";
import { useState } from "react";
import { useHome } from "context/HomeContext";
import { useProjectContext } from "context/ProjectContext";

function TrackedJobs({ jobs }) {
  const { openModal } = useModalContext();
  const { updateTrackedJobs } = useTrackedJobs();
  const { getActiveJobs } = useProjectContext();
  const { homeState } = useHome();
  const activeJobs = getActiveJobs();

  const jobsToShow = homeState === "year" ? activeJobs : jobs;

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
          <div className="tracked-jobs">
            {jobsToShow.map((job) => (
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
