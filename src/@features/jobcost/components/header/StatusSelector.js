import { useJobcostContext } from "@features/jobcost/context/JobcostContext";
import Select from "react-dropdown-select";
import { close } from "@assets/icons/svgs";
import { useState } from "react";

function StatusSelector() {
  const { pageModifiers, modTimeout, updatePageModifiers } =
    useJobcostContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const status = pageModifiers.status;
  const active = pageModifiers.status;
  const statusList = [
    { id: 4, value: "Open" },
    { id: 5, value: "Closed" },
    { id: -1, value: "Mixed" },
  ];

  const getStatusObject = (statusId) => {
    return statusList.find((s) => s.id === statusId) || [];
  };

  const handlePhaseChange = (value) => {
    if (modTimeout) return;
    const status = value.length > 0 ? value[0].id : null;
    const newMods = {
      status: status,
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
      status: null,
    };
    updatePageModifiers(newMods);
  };

  return (
    <div
      className={`project-select-wrapper ${active ? "project-select-wrapper-active" : ""} ${isDropdownOpen ? "project-select-wrapper-open" : ""}`}
      title="Change status"
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
      <h4> Status </h4>
      <Select
        labelField="value"
        valueField="id"
        options={statusList}
        values={status ? [getStatusObject(status)] : []}
        placeholder="-"
        className="project-select-dropdown project-select-dropdown-smaller"
        dropdownGap={15}
        dropdownHandle={false}
        onChange={handlePhaseChange}
        portal={document.body}
        dropdownPosition="bottom"
        onDropdownOpen={() => setIsDropdownOpen(true)}
        onDropdownClose={() => setIsDropdownOpen(false)}
      />
      {active && (
        <div
          className="select-clear"
          title="Clear status"
          onClick={(e) => handleClear(e)}
        >
          {close()}
        </div>
      )}
    </div>
  );
}

export default StatusSelector;
