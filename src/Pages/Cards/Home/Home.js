import { useEffect, useState, useContext, Component } from "react";
import Cards from "../../../Components/Cards";
import Carousel from "../../../Components/Carousel/Carousel";
import { DatasContext } from "../../../Contexts/DatasContext";
import SingleCards from "../SingleCards";




const Home = () => {
    const [timeoutToken, setTimeoutToken] = useState(null);
    const state = useContext(DatasContext)
    const [search, setSearch] = useState(`""`);
    const [isLoading,setIsLoading] = useState(true);
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
                        <div className="flex justify-center flex-wrap items-center " > 
                            {state.artsToRender.map((art, index) => (<Cards key={index} art={art} />))}{" "}

                        </div>
                    </>










            }




        </>
    );
}

export default Home;




