import Select from "react-dropdown-select";
import React from "react";

const JobSelector = React.forwardRef(
  ({ id, options, index, handleChange, value }, ref) => {
    const handleJobChange = (selected) => {
      if (selected && selected.length > 0) {
        handleChange(selected[0]);
      } else handleChange({ num: null });
    };

    return (
      <Select
        ref={ref}
        id={id}
        labelField="name"
        valueField="num"
        options={options}
        value={value}
        placeholder="Select a project"
        className="job-select-dropdown"
        dropdownGap={7}
        dropdownHandle={false}
        searchBy="name"
        sortBy="name"
        onChange={handleJobChange}
        searchable="true"
        defaultMenuIsOpen={true}
        dropdownPosition={index > 3 ? "top" : "bottom"}
      />
    );
  },
);

export default JobSelector;
