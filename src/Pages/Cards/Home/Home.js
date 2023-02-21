import React, { useEffect, useState, useContext, useRef } from "react";
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
        console.log("GO BACKKK ")
        isBack.current = true;
        console.log("IS BACKK ?? ", isBack.current)
        currentPage.current = localStorage.getItem("currentPage");
        SetArts(localStorage.getItem("artsToRender"));
        return true;

      }
    }
      data();
    }
  });


  const loadData = async () => {
    console.log("allObjects : ", allObjects);
    if (allObjects.objectIDs != null) {
      var arts = [];
      arts = artsToRender;
      console.log("sliceStart", currentPage.current - 10);
      console.log("currentPage", currentPage.current);

      var request = await allObjects.objectIDs
        .slice(currentPage.current - 10, currentPage.current)
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
        setLoading(false);
        return false;
      });
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    console.log("IS BACK / ", isBack.current)
    if (isMountedRef.current && !isBack.current) {
      console.log("[state.keywords]", "MOUNT ");
    const data = async () => {
      var res = await state.fetchArts({ displayCarousel: true });
      currentPage.current = 10;
      SetArts([]);
      setAllObjects(res);
    };
    data();

        return;
  }

    return () => {
      isMountedRef.current = false;
    };

  }, [state.keywords]);


  useEffect(() => {
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
    const currentValue = localStorage.getItem("artsToRender");
    if (currentValue != null) {
      localStorage.removeItem("artsToRender");
    }
    localStorage.setItem("artsToRender", JSON.stringify(artsToRender));
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
