import Select from "react-dropdown-select";
import { useProjectContext } from "@features/projects/context/ProjectContext";
import { useJobcostContext } from "@features/jobcost/context/JobcostContext";

function YearSelector() {
  const { getProjectByNum, getYearsByJob } = useProjectContext();
  const { pageModifiers, modTimeout, updatePageModifiers } =
    useJobcostContext();

  const selectedJobNum = pageModifiers.jobNum;
  let selectedYearId = pageModifiers.yearId;
  let selectedJobYears;
  if (selectedJobNum === "none") {
    selectedJobYears = [];
  } else {
    const selectedJob = getProjectByNum(selectedJobNum);
    selectedJobYears = getYearsByJob(selectedJob);
    if (selectedJobYears.length === 1) {
      selectedYearId = selectedJobYears[0].id;
    }
  }

  const active = pageModifiers.yearId;

  const handleYearChange = (value) => {
    if (modTimeout) return;
    const yearId = value.length > 0 ? value[0].id : null;

    const newMods = {
      yearId: yearId,
    };

    updatePageModifiers(newMods);
  };

  const handleWrapperClick = (e) => {
    if (e.target.closest(".react-dropdown-select")) return;

    const control = e.currentTarget.querySelector(".react-dropdown-select");

    if (control) {
      control.click();
    }
  };

  return (
    <div
      className={`project-select-wrapper ${active && "project-select-wrapper-active"} `}
      title="Change year"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
        alignItems: "flex-start",
        borderRadius: "0px",
      }}
      onClick={handleWrapperClick}
    >
      <h4> Year </h4>
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
        placeholder="-"
        className="project-select-dropdown project-select-dropdown-smaller"
        dropdownGap={-3}
        dropdownHandle={false}
        onChange={handleYearChange}
      />
    </div>
  );
}

export default YearSelector;
