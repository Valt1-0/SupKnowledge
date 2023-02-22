import React, { useEffect, useState, useContext, useRef, useLayoutEffect } from "react";
import Cards from "../Components/Cards";
import Carousel from "../Components/Carousel/Carousel";
import { DatasContext } from "../Contexts/DatasContext";
import ScrollArrow from "../Components/ScrollArrow";
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

      if (loc.pathname == window.location.pathname) {
        currentPage.current = parseInt(JSON.parse(sessionStorage.getItem("currentPage"))) + 10;

        console.log("currentPage ", currentPage.current);
        SetArts(JSON.parse(sessionStorage.getItem("artsToRender")));
        setAllObjects(JSON.parse(sessionStorage.getItem("allObjects")))

        setLoading(true);

        const currentValue = sessionStorage.getItem("isReturn");
        if (currentValue != null) {
          sessionStorage.removeItem("isReturn");
        }
        sessionStorage.setItem("isReturn", JSON.stringify(true));

       
        

        
       
      }

    }


    window.addEventListener('beforeunload', () => {
      sessionStorage.clear();
    });

  }, []);


  


  const removeSessionStorage = () => {
  
    sessionStorage.clear();
  
  }

  const loadData = async () => {
   
    if (allObjects?.objectIDs?.length > 0 ? allObjects?.objectIDs?.length > 0 : JSON.parse(sessionStorage.getItem("allObjects"))?.objectIDs?.length > 0)  {
      var arts = [];
      arts = artsToRender?.length > 0 ? artsToRender : JSON.parse(sessionStorage.getItem("artsToRender"));


      const sliceStart = currentPage.current - 10;
      let sliceEnd = currentPage.current
      if (sessionStorage.getItem("isReturn") == "true")
        sliceEnd -= 10
        


      console.log(sliceStart);
      var request = await (allObjects?.objectIDs?.length > 0 ? allObjects?.objectIDs : JSON.parse(sessionStorage.getItem("allObjects"))?.objectIDs).slice(sliceStart, sliceEnd)
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
          if (currentValue == "true")
            removeSessionStorage()
        }
         


        setLoading(false);
        return false;
      });
    } else {
      setHasMore(false);
    }
  };


  useEffect(() => {
    console.log("IS BACK / ", sessionStorage.getItem("isReturn"))
    if (isMountedRef.current && (sessionStorage.getItem("isReturn") === 'false' || sessionStorage.getItem("isReturn") === null)) {
      console.log("[state.keywords]", "MOUNT ");
    const data = async () => {
      var res = await state.fetchArts({ displayCarousel: true });
      currentPage.current = 10;
      console.log("currentPage2 ", currentPage.current);
      const currentValuePage = sessionStorage.getItem("currentPage");
      if (currentValuePage != null) {
        sessionStorage.removeItem("currentPage");
      }
      sessionStorage.setItem("currentPage", JSON.stringify(currentPage.current));
      SetArts([]);
      setAllObjects(res);
      const currentValue = sessionStorage.getItem("allObjects");
      if (currentValue != null) {
        sessionStorage.removeItem("allObjects");
      }
      sessionStorage.setItem("allObjects", JSON.stringify(res));
      console.log("res", JSON.parse(sessionStorage.getItem("allObjects")))

    };
    data();

        return;
  }

    return () => {
      isMountedRef.current = false;
    };

  }, [state.keywords]);


  useEffect(() => {
    if (sessionStorage.getItem("isReturn") != "true")
    {
    console.log("allObjects effet déclanché ")
    loadData();
  }
  }, [allObjects]);

  useEffect(() => {



    
    const handleScroll = () => {
      console.log('Scroll');
      const targetDiv = document.querySelector("#Cards-elements");
      console.log("targetDiv",targetDiv);
      if (!targetDiv) return;

            const targetDivRect = targetDiv.getBoundingClientRect();
      console.log(targetDivRect.bottom >= window.innerHeight)
            if (targetDivRect.bottom >= window.innerHeight) return;
      console.log("allObjects", allObjects)
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
                const currentValue = sessionStorage.getItem("currentPage");
              if (currentValue != null) {
                sessionStorage.removeItem("currentPage");
              }
              sessionStorage.setItem("currentPage", JSON.stringify(currentPage.current));

                await loadData();
                setLoading(false);
            }, 500);
            return () => clearTimeout(timeoutId);
        }

        data();

    }, [loading, sessionStorage.getItem("isReturn")]);


//Save the data to the local storage

  useEffect(() => {
   
    if (sessionStorage.getItem("isReturn") === 'false' || sessionStorage.getItem("isReturn") === null)
    {
      console.log('Upd artsToRender')
      const currentValue = sessionStorage.getItem("artsToRender");
      if (currentValue != null) {
        sessionStorage.removeItem("artsToRender");
      }
      sessionStorage.setItem("artsToRender", JSON.stringify(artsToRender));
    }
  }, [artsToRender]);

  document.title = "SupKnowLedge | Home";

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