import { useState } from "react";
import JobSelector from "./JobSelector";
import { useTrackedJobs } from "context/TrackedJobContext";
import { useProjectContext } from "context/ProjectContext";
import RecommendedJobs from "./ReccomendedJobs";


function JobSelectors({ closeSelf }) {
  const { trackedJobs, updateTrackedJobs } = useTrackedJobs();
  const { getAllProjects } = useProjectContext();
  const allProjects = getAllProjects() || [];
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedRec, setSelectedRec] = useState([]);

  const handleChange = (values) => {
    const jobNums = values.map((item) => item.num)
    setSelectedJobs(jobNums);
  };

  const handleSubmit = async () => {
    const allJobs = [
      ...trackedJobs,
      ...selectedJobs.filter(Boolean),
      ...selectedRec.filter(Boolean),
    ];

    updateTrackedJobs(allJobs, "Add");
    closeSelf();
  };

  const options = allProjects.filter(
    (project) =>
      !selectedJobs.includes(project.num) &&
      !trackedJobs.includes(project.num) &&
      !selectedRec.includes(project.num),
  );

  const updateSelected = (id) => {
    setSelectedRec((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((item) => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  return (
    <>
      <RecommendedJobs selected={selectedRec} updateSelected={updateSelected} />
      <div className="job-selector-body">
        <div>
          <h4 style={{ textAlign: "left", fontWeight: "500" }}>
            Select from list
          </h4>
          <div className="job-selector-wrapper"> 
              <JobSelector
                  options={options}
                  handleChange={(values) => handleChange(values)}
                />
          </div>
        </div>
        <button className="job-button add-job-button" onClick={handleSubmit}>
          {" "}
          Save{" "}
        </button>
      </div>
    </>
  );
}

export default JobSelectors;
