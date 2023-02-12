import {createContext, useState } from "react";


export const DatasContext = createContext();

const DatasContextProvider = (props) => {
    const [artsToRender, SetArts] = useState([]);
    const [SingleToRender, setSingleToRender] = useState([]);
    const [CarouselToRender, setHighlightCarousel] = useState([]);
    const [isLoadingDatas, setIsLoadingDatas] = useState(true);
    const [keywords, setKeywords] = useState(`""`)
    const [filter, setFilter] = useState([]);

    //Gestion de la pagination
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);


    // fetches only the card clicked and sends it to render
    const fetchSingleArt = async (id) => {
        const resp = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        );
        const data = await resp.json();
        setSingleToRender([...SingleToRender, data]);
    };



    const fetchForCarousel = async () => {
        var art = [];
        const res = await fetchAllArts(keywords, ["isHightlight=true"]);


        console.log("carousel fetch : ");

        for (var i = 0; i <= res.objectIDs.length - 1; i++) {

            var response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${res.objectIDs[i]}`,
                {
                    method: "GET",
                    cache: "force-cache",
                })
            const data1 = await response.json();

            if (data1.objectID &&       
                data1.primaryImageSmall != "" &&
               ( artsToRender.length > 0 ? artsToRender.filter(art =>
                    art.objectID == data1.objectID).length == 0 : true)) 
                    {
                console.log(data1.primaryImageSmall != "");
                art = [...art, data1];
                setHighlightCarousel(art);
                if (art.length > 10)
                    return false;
            }
        }
        setIsLoadingDatas(false);
    }

    const fetchAllArts = async (search, filter) => {
        setIsLoadingDatas(true)
        var url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects'

        if (search.length > 0 && search != `""` || filter.length != 0)
            url = `https://collectionapi.metmuseum.org/public/collection/v1/search?${filter.length > 0 ? filter.join('&') + "&" : ''}q=${search}`


            console.log(url);


        return await fetch(url,
            {
                method: "GET",
                cache: "force-cache",
            })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();

            })
            .catch(error => {
                console.error('Erreur lors du fetch de toute les arts :', error);
            });


    }


    const fetchArts = async (props) => {
        setIsLoadingDatas(true)
        var art = [];
        const data = await fetchAllArts(keywords, filter)

        await data.objectIDs.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage)
            .map(async (element) =>
                await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${element}`,
                    {
                        method: "GET",
                        cache: "force-cache",
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw Error(response.statusText);
                        }
                        return response.json();
                    })
                    .then(data1 => {
                        if (data1.objectID && (CarouselToRender.length > 0 ? CarouselToRender.filter(art => art.objectID == data1.objectID).length == 0 : true)) {
                            art = [...art, data1];
                            SetArts(art);
                        }
                    })
                    .catch(error => {
                        console.error('Erreur lors du second fetch :', error);
                    })
            )


                    if (props.displayCarousel == true)
                        fetchForCarousel();

        setIsLoadingDatas(false)

    };

    return (
        <DatasContext.Provider value={{
            fetchArts,
            fetchSingleArt,
            setIsLoadingDatas,
            CarouselToRender,
            fetchForCarousel,
            isLoadingDatas,
            artsToRender,
            setKeywords,
            keywords
        }}> {props.children}
        </DatasContext.Provider>
    )

};

export default DatasContextProvider;