import React, { useEffect, useState, useContext, useRef, useLayoutEffect } from "react";
import Cards from "../../../Components/Cards";
import Carousel from "../../../Components/Carousel/Carousel";
import { DatasContext } from "../../../Contexts/DatasContext";
import ScrollArrow from "../../../Components/ScrollArrow";
import { useLocation } from "react-router-dom";

const Home = () => {
  const loc = useLocation();
  let isBack = useRef(false);
    const state = useContext(DatasContext)
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
      const data = async () => {
      if (loc.pathname == window.location.pathname) {
        setIsLoading(true);
        console.log("GO BACKKK ")
        

        const currentValue = localStorage.getItem("isReturn");
        if (currentValue != null) {
          localStorage.removeItem("isReturn");
        }
        localStorage.setItem("isReturn", JSON.stringify(true));


        currentPage.current = JSON.parse(localStorage.getItem("currentPage"));
        SetArts(JSON.parse(localStorage.getItem("artsToRender")));
        setAllObjects(JSON.parse(localStorage.getItem("allObjects")))
        console.log(JSON.parse(localStorage.getItem("artsToRender")))
        console.log(JSON.parse(localStorage.getItem("allObjects")))
       

      }
    }
      data();
    }

  });


  const loadData = async () => {
   
    if (allObjects?.objectIDs?.length > 0 ? allObjects?.objectIDs?.length > 0 : JSON.parse(localStorage.getItem("allObjects"))?.objectIDs?.length > 0)  {
      var arts = [];
      arts = artsToRender?.length > 0 ? artsToRender : JSON.parse(localStorage.getItem("artsToRender"));
      console.log("sliceStart", JSON.parse(localStorage.getItem("currentPage")) > currentPage.current ? JSON.parse(localStorage.getItem("currentPage")) : currentPage.current - 10);
      console.log("currentPage", JSON.parse(localStorage.getItem("currentPage")) > currentPage.current ? JSON.parse(localStorage.getItem("currentPage")) : currentPage.current)
      var request = await (allObjects?.objectIDs?.length > 0 ? allObjects?.objectIDs : JSON.parse(localStorage.getItem("allObjects"))?.objectIDs)
        .slice(JSON.parse(localStorage.getItem("currentPage")) > currentPage.current ? JSON.parse(localStorage.getItem("currentPage")) : currentPage.current - 10, JSON.parse(localStorage.getItem("currentPage")) > currentPage.current ? JSON.parse(localStorage.getItem("currentPage")) : currentPage.current)
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
        const currentValue = localStorage.getItem("isReturn");
        if (currentValue != null) {
          localStorage.removeItem("isReturn");
        }
        localStorage.setItem("isReturn", JSON.stringify(false));


        setLoading(false);
        return false;
      });
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    console.log("IS BACK / ", localStorage.getItem("isReturn"))
    if (isMountedRef.current && (localStorage.getItem("isReturn") === 'false' || localStorage.getItem("isReturn") === null)) {
      console.log("[state.keywords]", "MOUNT ");
    const data = async () => {
      var res = await state.fetchArts({ displayCarousel: true });
      currentPage.current = 10;
      SetArts([]);
      setAllObjects(res);
      const currentValue = localStorage.getItem("allObjects");
      if (currentValue != null) {
        localStorage.removeItem("allObjects");
      }
      localStorage.setItem("allObjects", JSON.stringify(res));
      console.log("res", JSON.parse(localStorage.getItem("allObjects")))

    };
    data();

        return;
  }

    return () => {
      isMountedRef.current = false;
    };

  }, [state.keywords]);


  useEffect(() => {
    console.log("allobject load",allObjects);
    loadData();
    return;
  }, [allObjects]);

  useEffect(() => {
    const handleScroll = () => {
      const targetDiv = document.querySelector("#Cards-elements");

      if (!targetDiv) return;

            const targetDivRect = targetDiv.getBoundingClientRect();
            console.log(targetDivRect)
            console.log(window.innerHeight)
            console.log(targetDivRect.bottom > window.innerHeight)
            if (targetDivRect.bottom >= window.innerHeight) return;
            if (allObjects != null) {
                setLoading(true);
            }
        };


    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);




    useEffect(() => {
      console.log("useEffect LOADING ", loading)
        if (!loading) return;
        const data = async () => {
            const timeoutId = setTimeout(async () => {
                // fetch more data here, then update the data and loading state
                currentPage.current = currentPage.current + 10;
              
                //save the data to local storage
                const currentValue = localStorage.getItem("currentPage");
              if (currentValue != null) {
                localStorage.removeItem("currentPage");
              }
              localStorage.setItem("currentPage", JSON.stringify(currentPage.current));

                await loadData();
                setLoading(false);
            }, 500);
            return () => clearTimeout(timeoutId);
        }

        data();

    }, [loading]);


//Save the data to the local storage

  useEffect(() => {
   
    if (localStorage.getItem("isReturn") === 'false' || localStorage.getItem("isReturn") === null)
    {
      console.log('Upd artsToRender')
      const currentValue = localStorage.getItem("artsToRender");
      if (currentValue != null) {
        localStorage.removeItem("artsToRender");
      }
      localStorage.setItem("artsToRender", JSON.stringify(artsToRender));
    }
  }, [artsToRender]);


    return (
        <>

      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <br/>
          <Carousel items={state.CarouselToRender} />
          <br/>
          <br/>
          <hr />
          <ScrollArrow/>
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

export default Home;
