import { createContext, useState } from "react";

export const DatasContext = createContext();

const DatasContextProvider = (props) => {
  const [SingleToRender, setSingleToRender] = useState([]);
  const [CarouselToRender, setHighlightCarousel] = useState([]);
  const [isLoadingDatas, setIsLoadingDatas] = useState(true);
  const [keywords, setKeywords] = useState(`""`);
  const [filter, setFilter] = useState([]);

  //Gestion de la pagination
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // fetches only the card clicked and sends it to render
  const fetchSingleArt = async (id) => {
    const resp = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
      {
        method: "GET",
        cache: "force-cache",
      }
    )
      .then(async (response) => {
        const data = await response.json();
        setSingleToRender(data);
      })
      .catch(setSingleToRender([]));
  };

  const fetchForCarousel = async () => {
    var art = [];
    const res = await fetchAllArts(keywords, ["isHightlight=true"]);
    if (!res.objectIDs) 
    {
      setHighlightCarousel([])
      return ;
    }

    for (var i = 0; i <= res?.objectIDs?.length - 1; i++) {
      var response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${res.objectIDs[i]}`,
        {
          method: "GET",
          cache: "force-cache",
        }
      );
      const data1 = await response.json();

      if (data1.objectID && data1.primaryImageSmall != "") {
        console.log(data1.primaryImageSmall != "");
        art = [...art, data1];  
        if (art.length > 10) 
        { setHighlightCarousel(art); return false;}
      }
    }
   
    //   setIsLoadingDatas(false);
  };

  const fetchAllArts = async (search, filter) => {
    setIsLoadingDatas(true);
    var url =
      "https://collectionapi.metmuseum.org/public/collection/v1/objects";

    if ((search.length > 0 && search != `""`) || filter.length != 0)
      url = `https://collectionapi.metmuseum.org/public/collection/v1/search?${
        filter.length > 0 ? filter.join("&") + "&" : ""
      }q=${search}`;

    console.log(url);

    return await fetch(url, {
      method: "GET",
      cache: "force-cache",
    })
      .then(async (response) => {
        if (!response.ok) {
          // throw Error(response.statusText);
        }
        return await response.json();
      })
      .catch((error) => {
        console.error("Erreur lors du fetch de toute les arts :", error);
      });
  };

  const fetchArts = async (props) => {
    setIsLoadingDatas(true);

    if (props.displayCarousel == true) fetchForCarousel();

    var response = await fetchAllArts(keywords, filter);
    setIsLoadingDatas(false);
    return response;
  };

  return (
    <DatasContext.Provider
      value={{
        fetchArts,
        fetchSingleArt,
        SingleToRender,
        setIsLoadingDatas,
        CarouselToRender,
        fetchForCarousel,
        isLoadingDatas,
        setKeywords,
        setFilter,
        keywords,
      }}
    >
      {" "}
      {props.children}
    </DatasContext.Provider>
  );
};

export default DatasContextProvider;
