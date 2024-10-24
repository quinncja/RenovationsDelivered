import { useState } from "react";
import JobSelector from "./JobSelector";
import { plus } from "business/svg";
import { useTrackedJobs } from "context/TrackedJobContext";
import { useProjectContext } from "context/ProjectContext";
import RecommendedJobs from "./ReccomendedJobs";

let nextId = 0;
const generateId = () => nextId++;

function JobSelectors({ closeSelf }) {
  const { trackedJobs, updateTrackedJobs } = useTrackedJobs();
  const { getAllProjects } = useProjectContext();
  const allProjects = getAllProjects() || [];
  const [jobSelectors, setJobSelectors] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedRec, setSelectedRec] = useState([])

  const handleChange = (index, selectedJobNum) => {
    const updatedJobs = [...selectedJobs];
    updatedJobs[index] = selectedJobNum;
    setSelectedJobs(updatedJobs);
  };

  const handleAdd = () => {
    setJobSelectors([...jobSelectors, { id: generateId() }]);
    setSelectedJobs([...selectedJobs, null]);
  };

  const handleSubmit = async () => {
    const allJobs = [...trackedJobs, ...selectedJobs.filter(Boolean), ...selectedRec.filter(Boolean)];

    updateTrackedJobs(allJobs, "Add");
    closeSelf();
  };

  const options = allProjects.filter(
    (project) =>
      !selectedJobs.includes(project.num) && !trackedJobs.includes(project.num) && !selectedRec.includes(project.num),
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
    <RecommendedJobs selected={selectedRec} updateSelected={updateSelected}/>
    <div className="job-selector-body">
      <div> 
    <h4 style={{textAlign: "left", fontWeight: "500"}}> 
        Select from list
      </h4>
      <div className="job-selector-row">
        {jobSelectors.map((jobSelector, index) => (
          <div key={jobSelector.id} className={`job-selector-item ${(selectedJobs[index] && selectedJobs[index] !== null) ? "active-job-select" : ""}`}>
            <JobSelector
              id={jobSelector.id}
              key={jobSelector.id}
              options={options}
              index={index}
              value={selectedJobs[index] || null}
              handleChange={(job) => handleChange(index, job.num)}
            />
          </div>
        ))}
        {jobSelectors.length < 8 && (
          <button className="add-button" onClick={handleAdd}>
            {plus()} Project
          </button>
        )}
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
