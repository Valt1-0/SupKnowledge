import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useLayoutEffect,
  useReducer,
} from "react";
import Cards from "../Components/Cards";
import { DatasContext } from "../Contexts/DatasContext";
import ScrollArrow from "../Components/ScrollArrow";
import { useLocation } from "react-router-dom";
import { DatePicker, Select, Checkbox } from "antd";

import Arts from "../Components/Arts";

const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];

const Advanced = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [ListDepartment, setListDepartment] = useState([]);
  const [filter, setFilter] = useState("");


  const state = useContext(DatasContext)

  const [dateBegin, setDateBegin] = useState(0);
  const [dateEnd, setDateEnd] = useState(0);

  document.title = "SupKnowLedge | Advanced Search";

  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  useLayoutEffect(() => {
    GetListDepartment();
  }, []);

  useEffect(() => {
    if (dateBegin != 0) handleFilterChange("dateBegin", dateBegin);
  }, [dateBegin]);
  useEffect(() => {
    if (dateEnd != 0) handleFilterChange("dateEnd", dateEnd);
  }, [dateEnd]);

  
  useEffect(() => {
    state.setFilter(filter)
  }, [filter]);

  const GetListDepartment = async () => {
    try {
      const response = await fetch(
        "https://collectionapi.metmuseum.org/public/collection/v1/departments"
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      setListDepartment(data.departments);
    } catch (error) {
      console.error(error);
    }
  };

  function handleFilterChange(key, value) {
    console.log(key, value);
    // Supprimer la valeur si value est undefined
    if (value === undefined) {
      // setFilter(filter.replace(`${key}=${filter[key]}&`, ''));
      // delete filter[key];

      const regex = new RegExp(`${key}=[^&]*&?`, "g");
      const deleteFilter = filter.replace(regex, "");
      // console.log(filter);
      // console.log("deleteFilter", deleteFilter);
      if (deleteFilter.endsWith("&")) setFilter("");
      else setFilter(deleteFilter);
      // const regex = new RegExp(`${key}=[^&]*&?`);
      // setFilter( filter.replace(regex, ""));
    } else {
      // Modifier la valeur si elle existe déjà
      const regex = new RegExp(`${key}=[^&]*`);
      if (filter.match(regex)) {
        setFilter(filter.replace(regex, `${key}=${value}`));
      } else {
        // Ajouter un nouveau paramètre s'il n'existe pas déjà
        setFilter(filter ? `${filter}&${key}=${value}` : `${key}=${value}`);
      }
    }
  }

  const [options, setOptions] = useState({
    isHighlight: false,
  });

  const handleCheckboxChange = (optionName) => (event) => {
  
    const value = event.target.checked;
    setOptions({ ...options, [optionName]: value });
    console.log(`${optionName} : ${value}`);

    handleFilterChange(optionName, value)
  };

  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <div className="border-b shadow-md">
            <div className="m-5">
              <strong className="my-5">Filter By</strong>

              {/* `https://collectionapi.metmuseum.org/public/collection/v1/objects/${element}`, */}
              {/* "medium" */}
              <div className="flex justify-evenly items-center my-5">
                {/* <Select
                  className=" placeholder-gray-500"
                  mode="multiple"
                  labelInValue
                  placeholder="Object Type / Material"
                  style={{ width: 200 }}
                  options={[
                    //MAP

                    {
                      value: "jack",
                      label: "Jack (100)",
                    },
                  ]}
                /> */}

                {/* country */}
                {/* <Select
                  labelInValue
                  mode="multiple"
                  placeholder="Géographic Location"
                  style={{ width: 200 }}
                  options={[
                    //MAP

                    {
                      value: "jack",
                      label: "Jack (100)",
                    },
                    {
                      value: "lucy",
                      label: "Lucy (101)",
                    },
                  ]}
                /> */}

                {/* Date Begin / Date End */}
                <DatePicker.RangePicker
                  placeholder={["Begin Date", "End Date"]}
                  separator="-"
                  picker="year"
                  allowClear={true}
                  onChange={(selectedValue) => {
                    let date1 = undefined;
                    let date2 = undefined;

                    if (selectedValue) {
                      date1 = selectedValue[0]?.$y;
                      date2 = selectedValue[1]?.$y;
                    }
                    setDateBegin(date1);
                    setTimeout(() => {
                      setDateEnd(date2);
                    }, "700");
                  }}
                />

                {/* department */}
                <Select
                  labelInValue
                  placeholder="Département"
                  style={{ width: 200 }}
                  options={ListDepartment.map((department) => ({
                    value: department.departmentId,
                    label: department.displayName,
                  }))}
                  onChange={(selectedValue) =>
                    handleFilterChange("departmentId", selectedValue?.value)
                  }
                  allowClear={true}
                />
              </div>
              <div className="flex justify-center items-center">
                <Checkbox.Group>
                  <Checkbox
                    checked={options.isHighlight}
                    onChange={handleCheckboxChange("isHighlight")}
                  >
                    Highlight
                  </Checkbox>
                </Checkbox.Group>
              </div>
            </div>
          </div>

          <Arts />
        </>
      )}
    </>
  );
};

export default Advanced;
