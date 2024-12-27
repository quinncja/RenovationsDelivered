import Select from "react-dropdown-select";
import { useProjectContext } from "context/ProjectContext";

function ChangeOrderSelectors({ modifiers, handleModifierChange }) {
  const {
    projects,
    getAllProjects,
    getProjectByNum,
    getYearsByJob,
    getYearById,
    getPhasesByYear,
  } = useProjectContext();

  const allProjects = getAllProjects() || [];
  const { jobs = {} } = projects || {};

  const selectedJobNum = modifiers.jobNum;
  const selectedYearId = modifiers.yearId;
  const selectedPhaseId = modifiers.phaseId;
  const selectedJob = getProjectByNum(selectedJobNum);
  const selectedJobYears = getYearsByJob(selectedJob);
  const selectedYear = getYearById(selectedYearId);
  const selectedYearPhases = getPhasesByYear(selectedYear, selectedJob);

  const handleJobChange = (value) => {
    const jobNum = value.length > 0 ? value[0].num : null;
    const newMods = {
      jobNum: jobNum,
      yearId: null,
      phaseId: null,
    };

    handleModifierChange(newMods);
  };

  const handleYearChange = (value) => {
    const yearId = value.length > 0 ? value[0].id : null;

    const newMods = {
      ...modifiers,
      yearId: yearId,
      phaseId: null,
    };

    handleModifierChange(newMods);
  };

  const handlePhaseChange = (value) => {
    const phaseId = value.length > 0 ? value[0].id : null;

    const newMods = {
      ...modifiers,
      phaseId: phaseId,
    };

    handleModifierChange(newMods);
  };

  const getFilteredPhases = (phases) => {
    const filtered = phases.filter((phase) => phase.status === 4);
    return filtered;
  };

  return (
    <>
      <Select
        labelField="name"
        valueField="num"
        options={allProjects || []}
        values={
          selectedJobNum && jobs[selectedJobNum] ? [jobs[selectedJobNum]] : []
        }
        placeholder="Project"
        className="co-select-dropdown"
        dropdownGap={10}
        dropdownHandle={false}
        searchBy="name"
        sortBy="name"
        onChange={handleJobChange}
        dropdownPosition={"top"}
      />

      <Select
        labelField="year"
        valueField="id"
        options={selectedJobYears}
        values={
          selectedYearId
            ? [
                selectedJobYears.find((year) => year.id === selectedYearId),
              ].filter(Boolean)
            : []
        }
        placeholder="Year"
        className="co-select-dropdown"
        dropdownGap={10}
        dropdownHandle={false}
        onChange={handleYearChange}
        dropdownPosition={"top"}
      />

      <Select
        labelField="name"
        valueField="id"
        options={getFilteredPhases(selectedYearPhases)}
        values={
          selectedPhaseId
            ? [
                selectedYearPhases.find(
                  (phase) => phase.id === selectedPhaseId,
                ),
              ].filter(Boolean)
            : []
        }
        placeholder="Phase"
        className="co-select-dropdown"
        dropdownGap={10}
        dropdownHandle={false}
        onChange={handlePhaseChange}
        dropdownPosition={"top"}
      />
    </>
  );
}

export default ChangeOrderSelectors;
