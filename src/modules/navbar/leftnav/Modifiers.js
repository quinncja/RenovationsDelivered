import Select from "react-dropdown-select";
import { useModifiers } from "context/ModifierContext";
import { useProjectContext } from "context/ProjectContext";
import { close } from "business/svg";
import { pmList, stateList } from "utils/modifiers";

export function Modifiers() {
  const {
    projects,
    getAllProjects,
    getProjectByNum,
    getYearsByJob,
    getYearById,
    getPhasesByYear,
  } = useProjectContext();
  const { pageModifiers, modTimeout, updatePageModifiers } = useModifiers();

  const allProjects = getAllProjects() || [];
  const { jobs = {} } = projects || {};

  const selectedJobNum = pageModifiers.jobNum;
  const selectedYearId = pageModifiers.yearId;
  const selectedPhaseId = pageModifiers.phaseId;
  const selectedState = pageModifiers.state;
  const selectedPM = pageModifiers.pm;

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
      state: null,
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

  const handleStateChange = (value) => {
    if (modTimeout) return;
    const state = value.length > 0 ? value[0].id : null;

    const newMods = {
      state: state,
    };

    updatePageModifiers(newMods);
  };

  const handlePMChange = (value) => {
    if (modTimeout) return;
    const pm = value.length > 0 ? value[0].id : null;

    const newMods = {
      pm: pm,
    };

    updatePageModifiers(newMods);
  };

  const clearModifiers = () => {
    const newMods = {
      jobNum: null,
      yearId: null,
      phaseId: null,
      state: null,
      pm: null,
    };

    updatePageModifiers(newMods);
  };

  return (
    <div className="modifier-options">
      <Select
        labelField="name"
        valueField="num"
        options={allProjects || []}
        values={
          selectedJobNum && jobs[selectedJobNum] ? [jobs[selectedJobNum]] : []
        }
        placeholder="Showing All Projects"
        className="select-dropdown"
        dropdownGap={10}
        dropdownHandle={false}
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
        onChange={handlePhaseChange}
      />

      <Select
        labelField="name"
        valueField="id"
        options={stateList}
        values={
          selectedState
            ? [stateList.find((state) => state.id === selectedState)].filter(
                Boolean,
              )
            : []
        }
        placeholder="State"
        className="select-dropdown select-dropdown-small"
        dropdownGap={10}
        dropdownHandle={false}
        onChange={handleStateChange}
      />

      <Select
        labelField="name"
        valueField="id"
        options={pmList}
        values={
          selectedPM
            ? [pmList.find((pm) => pm.id === selectedPM)].filter(Boolean)
            : []
        }
        placeholder="PM"
        className="select-dropdown select-dropdown-small"
        dropdownGap={10}
        dropdownHandle={false}
        onChange={handlePMChange}
      />

      {(selectedJobNum ||
        selectedYearId ||
        selectedPhaseId ||
        selectedState ||
        selectedPM) && (
        <button className="clear-modifiers" onClick={clearModifiers}>
          {close()}
        </button>
      )}
    </div>
  );
}
