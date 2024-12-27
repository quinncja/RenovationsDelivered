import Select from "react-dropdown-select";
import React from "react";

const JobSelector = React.forwardRef(({ id, options, handleChange }, ref) => {
  return (
    <Select
      ref={ref}
      id={id}
      labelField="name"
      valueField="num"
      options={options}
      placeholder="Select a project"
      className="job-select-dropdown"
      dropdownGap={7}
      dropdownHandle={false}
      searchBy="name"
      sortBy="name"
      onChange={(values) => handleChange(values)}
      searchable="true"
      defaultMenuIsOpen={true}
      dropdownPosition={"bottom"}
      multi={true}
    />
  );
});

export default JobSelector;
