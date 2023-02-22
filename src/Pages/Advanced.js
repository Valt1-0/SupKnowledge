import React, { useState } from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";


const Advanced = () => {
  const [value, setvalue] = useState("");

  const handleOnchange = (val) => setvalue(val);

  const options = [
    { label: "Option A", value: "Option 1" },
    { label: "Option 2", value: "Option 2" },
    { label: "Option 3", value: "Option 3" },
    { label: "Option 4", value: "Option 4" },
  ];

  return (
    <div className="">
      <label>Dropdown label</label>
      <MultiSelect
        className="multi-select"
        onChange={handleOnchange}
        options={options}
      />
      <br />

      <div className="preview-values">
        <b>Values: </b>
        {value}
      </div>
    </div>
  );
};

export default Advanced;
