import React, { useEffect, useState, useContext, useRef, useReducer, useLayoutEffect } from "react";
import Cards from "../Components/Cards";
import Carousel from "../Components/Carousel/Carousel";
import { DatasContext } from "../Contexts/DatasContext";
import ScrollArrow from "../Components/ScrollArrow";
import Arts from "../Components/Arts";




const Home = () => {

    const state = useContext(DatasContext)
    const [isLoading, setIsLoading] = useState(false);

    
    document.title = "SupKnowLedge | Home";

    return (
        <>

            {isLoading ? (
                <p>Loading</p>
            ) : (
                <>
                    <br />
                        <Carousel items={state.CarouselToRender} showControls={state.CarouselToRender?.length > 0 ? true : false} />
                    <br />
                    <br />
                    <hr />
                    <ScrollArrow />
                    <>
                       <Arts></Arts>
                    </>
                </>
            )}
        </>
    );
};

export default Home;
