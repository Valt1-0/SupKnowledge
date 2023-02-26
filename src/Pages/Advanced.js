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

const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];

const Advanced = () => {
  const loc = useLocation();
  let isBack = useRef(false);
  const state = useContext(DatasContext);
  const [search, setSearch] = useState(`""`);
  const [isLoading, setIsLoading] = useState(false);
  const [sliceStart, setSliceStart] = useState(0);
  const currentPage = React.useRef(10);
  const [allObjects, setAllObjects] = useState([]);
  const [artsToRender, SetArts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const [loading, setLoading] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    window.onpopstate = () => {
      if (loc.pathname == window.location.pathname) {
        currentPage.current =
          parseInt(JSON.parse(sessionStorage.getItem("currentPage"))) + 10;

        console.log("currentPage ", currentPage.current);
        SetArts(JSON.parse(sessionStorage.getItem("artsToRender")));
        setAllObjects(JSON.parse(sessionStorage.getItem("allObjects")));

        setLoading(true);

        const currentValue = sessionStorage.getItem("isReturn");
        if (currentValue != null) {
          sessionStorage.removeItem("isReturn");
        }
        sessionStorage.setItem("isReturn", JSON.stringify(true));
      }
    };

    window.addEventListener("beforeunload", () => {
      sessionStorage.clear();
    });
  }, []);

  const removeSessionStorage = () => {
    sessionStorage.clear();
  };

  const loadData = async () => {
    if (
      allObjects?.objectIDs?.length > 0
        ? allObjects?.objectIDs?.length > 0
        : JSON.parse(sessionStorage.getItem("allObjects"))?.objectIDs?.length >
          0
    ) {
      var arts = [];
      arts =
        artsToRender?.length > 0
          ? artsToRender
          : JSON.parse(sessionStorage.getItem("artsToRender"));

      const sliceStart = currentPage.current - 10;
      let sliceEnd = currentPage.current;
      if (sessionStorage.getItem("isReturn") == "true") sliceEnd -= 10;

      console.log(sliceStart);
      var request = await (allObjects?.objectIDs?.length > 0
        ? allObjects?.objectIDs
        : JSON.parse(sessionStorage.getItem("allObjects"))?.objectIDs
      )
        .slice(sliceStart, sliceEnd)
        .map(
          async (element) =>
            await fetch(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${element}`,
              {
                method: "GET",
                cache: "force-cache",
              }
            )
              .then((response) => {
                if (!response.ok) {
                  throw Error(response.statusText);
                }
                return response.json();
              })
              //
              .then((data1) => {
                if (data1.objectID) {
                  arts = [...arts, data1];
                }
              })
              .catch((error) => {
                console.error("Erreur lors du second fetch :", error);
              })
        );

      return await Promise.all(request).then(() => {
        if (arts.length > 0) {
          if (arts.length < 10) setHasMore(false);
          else setHasMore(true);
          SetArts(arts);
        }
        const currentValue = sessionStorage.getItem("isReturn");
        if (currentValue != null) {
          if (currentValue == "true") removeSessionStorage();
        }

        setLoading(false);
        return false;
      });
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    if (
      isMountedRef.current &&
      (sessionStorage.getItem("isReturn") === "false" ||
        sessionStorage.getItem("isReturn") === null)
    ) {
      const data = async () => {
        var res = await state.fetchArts({ displayCarousel: true });
        currentPage.current = 10;
        console.log("currentPage2 ", currentPage.current);
        const currentValuePage = sessionStorage.getItem("currentPage");
        if (currentValuePage != null) {
          sessionStorage.removeItem("currentPage");
        }
        sessionStorage.setItem(
          "currentPage",
          JSON.stringify(currentPage.current)
        );
        SetArts([]);
        setAllObjects(res);
        const currentValue = sessionStorage.getItem("allObjects");
        if (currentValue != null) {
          sessionStorage.removeItem("allObjects");
        }
        sessionStorage.setItem("allObjects", JSON.stringify(res));
        console.log("res", JSON.parse(sessionStorage.getItem("allObjects")));
      };
      data();

      return;
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [state.keywords]);

  useEffect(() => {
    if (sessionStorage.getItem("isReturn") != "true") {
      console.log("allObjects effet déclanché ");
      loadData();
    }
  }, [allObjects]);

  useEffect(() => {
    const handleScroll = () => {
      const targetDiv = document.querySelector("#Cards-elements");
      if (!targetDiv) return;

      const targetDivRect = targetDiv.getBoundingClientRect();
      if (targetDivRect.bottom >= window.innerHeight) return;
      if (allObjects != null) {
        setLoading(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!loading) return;
    const data = async () => {
      const timeoutId = setTimeout(async () => {
        // fetch more data here, then update the data and loading state
        currentPage.current = currentPage.current + 10;

        //save the data to local storage
        const currentValue = sessionStorage.getItem("currentPage");
        if (currentValue != null) {
          sessionStorage.removeItem("currentPage");
        }
        sessionStorage.setItem(
          "currentPage",
          JSON.stringify(currentPage.current)
        );

        await loadData();
        setLoading(false);
      }, 500);
      return () => clearTimeout(timeoutId);
    };

    data();
  }, [loading, sessionStorage.getItem("isReturn")]);

  //Save the data to the local storage

  useEffect(() => {
    if (
      sessionStorage.getItem("isReturn") === "false" ||
      sessionStorage.getItem("isReturn") === null
    ) {
      const currentValue = sessionStorage.getItem("artsToRender");
      if (currentValue != null) {
        sessionStorage.removeItem("artsToRender");
      }
      sessionStorage.setItem("artsToRender", JSON.stringify(artsToRender));
    }
  }, [artsToRender]);

  document.title = "SupKnowLedge | Advanced Search";

  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  const ListDepartment = async () => {
    try {
      const response = await fetch(
        "https://collectionapi.metmuseum.org/public/collection/v1/departments"
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const data = await response.json();
      return data.departments;
    } catch (error) {
      console.error(error);
    }
  };


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
                mode="multiple"
                placeholder="Département"
                style={{ width: 200 }}
                options={ListDepartment.map((department) => ({
                  value: department.departmentId,
                  label: department.displayName,
                }))}
              />
            </div>
          </div>

          <ScrollArrow />
          <div
            id="Cards-elements"
            className="flex justify-center flex-wrap items-center "
          >
            {artsToRender.map((art, index) => (
              <Cards key={index} art={art} />
            ))}{" "}
          </div>

          <>
            {hasMore && loading ? (
              <div className="relative flex ">
                <div className="absolute  bottom-0 w-full flex justify-center items-center">
                  <div className="border-t-transparent border-solid animate-spin  rounded-full border-slate-400 border-8 h-10 w-10"></div>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        </>
      )}
    </>
  );
};

export default Advanced;
