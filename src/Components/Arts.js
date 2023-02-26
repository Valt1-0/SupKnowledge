import React, { useEffect, useState, useContext, useRef, useReducer, useLayoutEffect } from "react";
import Cards from "../Components/Cards";
import Carousel from "../Components/Carousel/Carousel";
import { DatasContext } from "../Contexts/DatasContext";
import ScrollArrow from "../Components/ScrollArrow";
import { useLocation } from "react-router-dom";


const initialState = {


    allObjects: [],
    artsToRender: [],

};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_ARTS_AND_ALL_OBJECTS':
            sessionStorage.setItem("allObjects", JSON.stringify(action.payload.allObjects));
            sessionStorage.setItem("artsToRender", JSON.stringify(action.payload.artsToRender));

            console.log(" SET_ARTS_AND_ALL_OBJECTS artsToRender : ", action.payload.artsToRender, " allObjects : ", action.payload.allObjects)
            return {
                artsToRender: action.payload.artsToRender,
                allObjects: action.payload.allObjects
            };
        case 'SET_ALL_OBJECTS':
            sessionStorage.setItem("allObjects", JSON.stringify(action.payload.allObjects))
            console.log(" SET_ALL_OBJECTS artsToRender : ", action.payload.artsToRender, " allObjects : ", action.payload.allObjects)
            return {
                ...state,
                allObjects: action.payload.allObjects,

            };
        case 'SET_ARTS':
            sessionStorage.setItem("artsToRender", JSON.stringify(action.payload.artsToRender));
            console.log(" SET_ARTS artsToRender : ", action.payload.artsToRender, " allObjects : ", state.allObjects)
            return {
                ...state,
                artsToRender: action.payload.artsToRender
            };
        default:
            throw new Error();
    }
}


const Arts = () => {
    const loc = useLocation();
    const state = useContext(DatasContext)
    const [isLoading, setIsLoading] = useState(false);

    const currentPage = React.useRef(10);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);
    const isMountedRef = useRef(true);
    const [state2, dispatch] = useReducer(reducer, initialState);
    const scrollPosition = useRef(0);



    useLayoutEffect(() => {

        window.onpopstate = async () => {
            if (loc.pathname == window.location.pathname) {
                sessionStorage.removeItem("isReturn");
                sessionStorage.setItem("isReturn", JSON.stringify(true));
            }
        }

    })

    const handleScroll = () => {
        const targetDiv = document.querySelector("#Cards-elements");
        if (!targetDiv) return;

        const targetDivRect = targetDiv.getBoundingClientRect();
        console.log(targetDivRect.bottom >= window.innerHeight)
        scrollPosition.current = window.scrollY;
        if (targetDivRect.bottom >= window.innerHeight) return;
        console.log("scrollY", window.scrollY)

        setLoading(true);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        const isFirstLoad = (/true/).test(sessionStorage.getItem("isFirstLoad")?.includes("false"))

        if (isFirstLoad && (/true/).test(sessionStorage.getItem("isReturn")?.includes("true"))) {

            const data = async () => {
                console.log('====================================');
                console.log("Set DATA");
                console.log('====================================');
                currentPage.current = parseInt(JSON.parse(sessionStorage.getItem("currentPage"))) + 10;
                console.log('====================================');
                console.log("getItem(scrollPosition)", JSON.parse(sessionStorage.getItem("scrollPosition")))

                scrollPosition.current = JSON.parse(sessionStorage.getItem("scrollPosition"))
                dispatch({ type: 'SET_ARTS_AND_ALL_OBJECTS', payload: { artsToRender: JSON.parse(sessionStorage.getItem("artsToRender")), allObjects: JSON.parse(sessionStorage.getItem("allObjects")) } });

            }
            data();
        }





        window.addEventListener('beforeunload', () => {
            console.log('clear sesion data')
            sessionStorage.clear();

        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            sessionStorage.removeItem(["currentPage"]);
            sessionStorage.setItem("currentPage", JSON.stringify(currentPage.current));
            sessionStorage.setItem("isFirstLoad", JSON.stringify(false));
            sessionStorage.setItem("scrollPosition", JSON.stringify(scrollPosition.current));
            isMountedRef.current = false;

        }
    }, []);



    async function fetchData() {
        var res = await state.fetchArts({ displayCarousel: true });
        dispatch({ type: 'SET_ARTS_AND_ALL_OBJECTS', payload: { artsToRender: [], allObjects: res } });
    }




    const loadData = async () => {
        console.log("Loading", state2.allObjects);
        if (state2.allObjects?.objectIDs?.length > 0) {
            var arts = [];
            arts = state2.artsToRender

            const sliceStart = currentPage.current - 10;
            let sliceEnd = currentPage.current

            if (sessionStorage.getItem("isReturn") == "true")
                sliceEnd -= 10

            var request = await (state2.allObjects?.objectIDs).slice(sliceStart, sliceEnd)
                .map(
                    async (element) => {
                        console.log(element);

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
                    }
                );

            return await Promise.all(request).then(() => {
                if (arts.length > 0) {
                    if (arts.length < 10)
                        setHasMore(false);
                    else setHasMore(true);
                    dispatch({ type: 'SET_ARTS', payload: { artsToRender: arts } });
                }
                const currentValue = sessionStorage.getItem("isReturn");
                if (currentValue != null) {
                    if (currentValue == "true") {
                        sessionStorage.removeItem("isReturn");
                        window.scrollTo(0, scrollPosition.current);
                    }
                }



                setLoading(false);
                return false;
            });
        } else {
            // setHasMore(false);
        }
    };


    useEffect(() => {
        console.log("state.keywords")
        console.log("IS REUTNR ", sessionStorage.getItem("isReturn"))
        if (isMountedRef.current && (sessionStorage.getItem("isReturn") == 'false' || sessionStorage.getItem("isReturn") == null)) {
            console.log("[state.keywords]", "MOUNT ");

            const data = async () => {
                currentPage.current = 10;
                await fetchData();
            };
            data();

            return;
        }
    }, [state.keywords, state.filter]);





    useEffect(() => {
        console.log("useEffect LOADING ", loading)
        if (!loading) return;
        const data = async () => {
            const timeoutId = setTimeout(async () => {
                // fetch more data here, then update the data and loading state
                currentPage.current = currentPage.current + 10;
                //  console.log("useEffect LOADING ", loading)
                await loadData();
                return;
            }, 500);
            return () => clearTimeout(timeoutId);
        }

        data();

    }, [loading == false]);


    //Save the data to the local storage

    useEffect(() => {
        console.log("allObjects EFFECTS ", state2.allObjects, state2.artsToRender);
        if (state2.allObjects?.objectIDs?.length > 0) {

            console.log("LOADDDDDDDD");
            loadData();
        }
    }, [state2.allObjects]);

    return (
        <>

            {isLoading ? (
                <p>Loading</p>
            ) : (
                <>
                        <ScrollArrow />
                    <div
                        id="Cards-elements"
                        className="flex justify-center flex-wrap items-center "
                    >
                        {state2.artsToRender?.map((art, index) => (
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

export default Arts;
