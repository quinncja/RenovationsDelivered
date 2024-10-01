import Select from "react-dropdown-select";
import { useModifiers } from "context/ModifierContext";
import { useProjectContext } from "context/ProjectContext";
import { useEffect, useState } from "react";
import { close } from "business/svg";

export function Modifiers() {
  const { projects, getAllProjects, getProjectByNum,
    getYearsByJob, getYearById, getPhasesByYear } = useProjectContext();
  const { pageModifiers, modTimeout, updatePageModifiers } = useModifiers();
  const [loading, setLoading] = useState(!projects);

  useEffect(() => {
    if (projects) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [projects]);

  const allProjects = getAllProjects() || [];
  const { jobs = {} } = projects || {};

  
  const selectedJobNum = pageModifiers.jobNum;
  const selectedYearId = pageModifiers.yearId;
  const selectedPhaseId = pageModifiers.phaseId;

  const selectedJob = getProjectByNum(selectedJobNum);
  const selectedJobYears = getYearsByJob(selectedJob);
  const selectedYear = getYearById(selectedYearId);
  const selectedYearPhases = getPhasesByYear(selectedYear, selectedJob);

  const handleJobChange = (value) => {
    if (modTimeout) return;
    const jobNum = value.length > 0 ? value[0].num : null;

    const newMods = {
      jobNum: jobNum,
      yearId: null,
      phaseId: null,
    };

    updatePageModifiers(newMods);
  };

  const handleYearChange = (value) => {
    if (modTimeout) return;
    const yearId = value.length > 0 ? value[0].id : null;

    const newMods = {
      yearId: yearId,
      phaseId: null,
    };

    updatePageModifiers(newMods);
  };

  const handlePhaseChange = (value) => {
    if (modTimeout) return;
    const phaseId = value.length > 0 ? value[0].id : null;

    const newMods = {
      phaseId: phaseId,
    };

    updatePageModifiers(newMods);
  };

  const clearModifiers = () => {
    const newMods = {
      jobNum: null,
      yearId: null,
      phaseId: null,
    };

    updatePageModifiers(newMods);
  };

  return (
    <div className="modifier-options">
      <Select
        labelField="name"
        valueField="num"
        options={allProjects}
        values={
          selectedJobNum && jobs[selectedJobNum] ? [jobs[selectedJobNum]] : []
        }
        placeholder="Showing All Projects"
        className="select-dropdown"
        dropdownGap={10}
        dropdownHandle={false}
        disabled={loading}
        searchBy="name"
        sortBy="name"
        onChange={handleJobChange}
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
        className="select-dropdown select-dropdown-small"
        dropdownGap={10}
        dropdownHandle={false}
        disabled={loading}
        onChange={handleYearChange}
      />

      <Select
        labelField="name"
        valueField="id"
        options={selectedYearPhases}
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
        className="select-dropdown select-dropdown-small"
        dropdownGap={10}
        dropdownHandle={false}
        disabled={loading}
        onChange={handlePhaseChange}
      />

      {(selectedJobNum || selectedYearId || selectedPhaseId) && (
        <button className="clear-modifiers" onClick={clearModifiers}>
          {close()}
        </button>
      )}
    </div>
  );
}
