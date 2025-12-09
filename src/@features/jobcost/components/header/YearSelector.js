import Select from "react-dropdown-select";
import { useProjectContext } from "@features/projects/context/ProjectContext";
import { useJobcostContext } from "@features/jobcost/context/JobcostContext";
import { close } from "@assets/icons/svgs";
import { useRef, useState } from "react";

function YearSelector() {
  const { getProjectByNum, getYearsByJob } = useProjectContext();
  const { pageModifiers, modTimeout, updatePageModifiers } =
    useJobcostContext();
  const wrapperRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedJobNum = pageModifiers.jobNum;
  let selectedYearId = pageModifiers.yearId;
  let selectedJobYears;

  if (selectedJobNum === "none") {
    selectedJobYears = [];
  } else {
    const selectedJob = getProjectByNum(selectedJobNum);
    selectedJobYears = getYearsByJob(selectedJob);
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

  const handleClear = (e) => {
    e.stopPropagation();
    const newMods = {
      yearId: null,
    };
    updatePageModifiers(newMods);
  };

  return (
    <div
      ref={wrapperRef}
      className={`project-select-wrapper ${active ? "project-select-wrapper-active" : ""} ${isDropdownOpen ? "project-select-wrapper-open" : ""}`}
      title="Change year"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
        alignItems: "flex-start",
        borderRadius: "0px",
        paddingLeft: "22px",
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
        dropdownGap={15}
        dropdownHandle={false}
        onChange={handleYearChange}
        portal={document.body}
        dropdownPosition="bottom"
        onDropdownOpen={() => setIsDropdownOpen(true)}
        onDropdownClose={() => setIsDropdownOpen(false)}
      />
      {active && (
        <div
          className="select-clear"
          title="Clear year"
          onClick={(e) => handleClear(e)}
        >
          {close()}
        </div>
      )}
    </div>
  );
}

export default YearSelector;
