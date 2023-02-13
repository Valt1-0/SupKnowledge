import { useEffect, useState, useContext } from "react";
import Cards from "../../../Components/Cards";
import Carousel from "../../../Components/Carousel/Carousel";
import { DatasContext } from "../../../Contexts/DatasContext";




const Home = () => {
    const [timeoutToken, setTimeoutToken] = useState(null);
    const state = useContext(DatasContext)
    const [search, setSearch] = useState(`""`);
    // const [isLoading,setIsLoading] = useState(true);
    // const [sliceStart, setSliceStart] = useState(0);
    const [sliceEnd, setSliceEnd] = useState(10);
    const setKeywordDebounced = keyword => {
        clearTimeout(timeoutToken);
        var token = setTimeout(() => setKeywordAction(keyword), 400);
        setTimeoutToken(token);
    };


    const setKeywordAction = result => {
        state.setKeywords(`"${result}"`);
        setSearch(result);


    };


    useEffect( () => {
        state.fetchArts({displayCarousel: true}); // setting random arts to be shown
    }, [search]);

    useEffect( () => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    },[])

    const handleScroll = () => {
        const targetDiv = document.querySelector("#Cards-elements");
        const targetDivRect = targetDiv.getBoundingClientRect();
        if (targetDivRect.bottom <= window.innerHeight) {
            setSliceEnd(sliceEnd + 10);
            console.log(sliceEnd)
          //  state.fetchArts({ displayCarousel: false });
        }
    };

    return (
        <>
            <input
                type="search"
                placeholder="Enter keyword here..."
                onChange={e => setKeywordDebounced(e.target.value)}
                ref={input => input && input.focus()}
                aria-label="search term"
            />

            {
                state.isLoadingDatas ? <p>Loading</p> :
                    <>
                        <Carousel items={state.CarouselToRender} />
                        <hr />
                        {/* flex justify-center flex-wrap items-center  */}
                        <div id="Cards-elements" className="flex justify-center flex-wrap items-center " > 
                            {state.artsToRender.map((art, index) => (<Cards key={index} art={art} />))}{" "}

                        </div>
                    </>

            }


        </>
    );
}

export default Home;




