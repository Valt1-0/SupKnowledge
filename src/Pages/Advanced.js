import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useLayoutEffect,
} from "react";
import Cards from "../Components/Cards";
import { DatasContext } from "../Contexts/DatasContext";
import ScrollArrow from "../Components/ScrollArrow";
import { useLocation } from "react-router-dom";
import { Select } from "antd";
import Arts from "../Components/Arts";

const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];

const Advanced = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [ListDepartment, setListDepartment] = useState([]);
  const [filter,setFilter] = useState("");

  document.title = "SupKnowLedge | Advanced Search";

  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));


  useLayoutEffect(() => {
    GetListDepartment();
  },[])

  useEffect(() => {
    console.log(filter);
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
      
      const regex = new RegExp(`${key}=[^&]*&?`, 'g');
      const deleteFilter = filter.replace(regex, '');
      console.log(filter);
      console.log("deleteFilter",deleteFilter);
      if (deleteFilter.endsWith('&')) 
        setFilter('');     
      else
        setFilter(deleteFilter);     
      // const regex = new RegExp(`${key}=[^&]*&?`);
      // setFilter( filter.replace(regex, ""));
    } else {
      // Modifier la valeur si elle existe déjà
      const regex = new RegExp(`${key}=[^&]*`);
      if (filter.match(regex)) {
        setFilter(filter.replace(regex, `${key}=${value}`));
      } else { 
        // Ajouter un nouveau paramètre s'il n'existe pas déjà
        setFilter(filter
          ? `${filter}&${key}=${value}`
          : `${key}=${value}`);
      }
    }
  }
  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          {/* Utile ??? */}
          {/* <div class=" bg-white rounded flex justify-center items-center w-full p-3 shadow-sm border border-gray-200">
            <button class="outline-none focus:outline-none">
              <svg
                class=" w-5 text-gray-600 h-5 cursor-pointer"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
            <input
              type="search"
              placeholder="search for images"
              x-model="q"
              class="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent"
            />
          </div> */}

          <div className="zz">
            <strong className="my-5">Filter By</strong>

            {/* `https://collectionapi.metmuseum.org/public/collection/v1/objects/${element}`, */}
            {/* "medium" */}
            <div className="flex justify-evenly items-center">
              <Select
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
                  {
                    value: "lucy",
                    label: "Lucy (101)",
                  },
                  {
                    value: "lucy",
                    label: "Lucy (101)",
                  },
                  {
                    value: "lucy",
                    label: "Lucy (101)",
                  },
                  {
                    value: "lucy",
                    label: "Lucy (101)",
                  },
                  {
                    value: "lucy",
                    label: "Lucy (101)",
                  },
                  {
                    value: "lucy",
                    label: "Lucy (101)",
                  },
                ]}
              />

              {/* country */}
              <Select
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
              />

              {/*Plus compliquer, objectDate  */}
              <Select
                labelInValue
                mode="multiple"
                placeholder="Date / Era"
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
              />

              {/* department */}
              <Select
              
                labelInValue
                mode=""
                placeholder="Département"
                style={{ width: 200 }}
                  options={ListDepartment.map((department) => ({
                      value: department.departmentId,
                      label: department.displayName,
                    }))
                
                  
                  }
                  onChange={(selectedValue) => handleFilterChange("departmentId",selectedValue?.value)}
                  allowClear={true}
              />
            </div>
          </div>

          <Arts/>
        </>
      )}
    </>
  );
};

export default Advanced;
