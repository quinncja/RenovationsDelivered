import Select from "react-dropdown-select";
import { useProjectContext } from "@features/projects/context/ProjectContext";
import { yearList } from "@features/projects/utils/defaultModifiers";

function YearSelector() {
  const { projectQuery, updateProjectQuery } = useProjectContext();

  let selectedYearId = projectQuery.year;
  const active = projectQuery.year;

  const handleYearChange = (value) => {
    const year = value.length > 0 ? value[0].id : null;

    const newMods = {
      year: year,
    };

    updateProjectQuery(newMods);
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
        options={yearList}
        values={
          yearList
            ? [yearList.find((year) => year.id === selectedYearId)].filter(
                Boolean,
              )
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
