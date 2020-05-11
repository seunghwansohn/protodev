import Select from "react-select";
import React from "react";

const styles = {
    control: styles => ({ ...styles, backgroundColor: "white" }),
    option: styles => ({ ...styles, fontSize : '10px'}),
}

const SelectComp = ({ options, onChange }) => {

  return (
    <>
      <Select
        key={"color"}
        defaultValue={""}
        isClearable
        isSearchable
        name="dog"
        options={options}
        onChange={value => onChange(value)}
        getOptionValue={option => option["id"]}
        menuPlacement = 'top'
        styles = {styles}
        pageSize = {3}
        maxMenuHeight = {80}
      />
    </>
  );
};

export default SelectComp;
