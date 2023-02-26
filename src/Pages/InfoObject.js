import { useEffect, useContext, useState } from "react";
import { DatasContext } from "../Contexts/DatasContext";
import { useLocation, useNavigate } from "react-router-dom";
import Cards from "../Components/Cards";
import noImage from "../Assets/img/no-image.png";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { string } from "i/lib/util";

const InfoObject = (req, res) => {
  const [id, setID] = useState(null);
  const state = useContext(DatasContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [descriptionWiki, setWikiDescription] = useState(null);
  const [imageWiki, setWikiImage] = useState(null);
  const [wikipediaUrl, setWikipediaUrl] = useState(null);
  const [wikidataUrl, setWikidataUrl] = useState(null);

  // const params = new URLSearchParams(search);
  // setID(params.get("id"));

  const objectID = location.pathname.slice(5);
  // setID(objectID);

  const fetchWikiData = async (id) => {
    console.log("ID :" + id);
    let description = String.empty;
    if (id != String.empty) {
      const url = `https://www.wikidata.org/w/api.php?origin=*&action=wbgetentities&ids=${id}&props=claims|descriptions|sitelinks&languages=en&format=json`;
      console.log(url);
      const response = await fetch(url, {
        method: "GET",
        cache: "force-cache",
      });

      if (response.ok) {
        const data = await response.json();
        //Get the description of wiki data
        description = data.entities[id].descriptions.en.value;
        setWikiDescription(description);

        //Get thumbnail from Wikipedia
        const imageClaim = data.entities[id].claims.P18;
        if (imageClaim) {
          const imageFilename = imageClaim[0]?.mainsnak?.datavalue?.value;
          const imageSrc = `https://commons.wikimedia.org/wiki/Special:FilePath/${imageFilename}`;
          setWikiImage(imageSrc);
        }

        // Get the Wikipedia URL from the "sitelinks" property
        const wikipediaLink = data.entities[id].sitelinks.enwiki;

        const wikipediaUrl = `https://${wikipediaLink?.url}`;
        setWikipediaUrl(wikipediaUrl);

        const wikidataUrl = state.SingleToRender.objectWikidata_URL;
        setWikidataUrl(wikidataUrl);
      }
    }
    return true;
  };

  useEffect(() => {
    if (!objectID) {
      return navigate("/404");
    }
    const data = async () => {
      await state.fetchSingleArt(objectID);
    };
    data();
  }, [objectID]);

  useEffect(() => {
    const data = async () => {
      console.log("state : ", state.SingleToRender.objectWikidata_URL);
      if (state.SingleToRender.objectWikidata_URL) {
        try {
          await fetchWikiData(
            state.SingleToRender.objectWikidata_URL.split("/").pop()
          );
        } catch (error) {
          console.error("Error : ", error);
        }
      }
      setIsLoading(false);
    };
    data();
  }, [state.SingleToRender]);

  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : state.SingleToRender.message == undefined ? (
        <>
          <div className="flex flex-col lg:flex-row mx-10 my-20 justify-between items-start lg:items-center text-sm">
            <div className="w-[300px] m-auto">
              <img
                src={
                  imageWiki != null
                    ? imageWiki
                    : state.SingleToRender.primaryImage
                    ? state.SingleToRender.primaryImage
                    : noImage
                }
                alt=""
                className="w-full rounded"
              />
            </div>

            <div className="w-full lg:w-1/2 mt-5">
              <h1 className="text-3xl font-bold mb-2">
                {state.SingleToRender.title}
              </h1>
              <h2 className="text-lg font-medium mb-2">
                {state.SingleToRender.artistDisplayName
                  ? state.SingleToRender.artistDisplayName
                  : "By Unknown"}
                ,{" "}
                {state.SingleToRender.objectDate
                  ? state.SingleToRender.objectDate
                  : "Unknown"}
              </h2>
              <h2 className="text-lg font-medium mb-2">
                {descriptionWiki ? descriptionWiki : "No Description"}
              </h2>

              <p className="text-sm mb-4">
                {state.SingleToRender.medium
                  ? state.SingleToRender.medium
                  : "Unknown"}
              </p>
              <hr className="border-t border-gray-400 mb-4 max-w-4xl" />

              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="text-sm font-bold">On view at:</div>
                {state.SingleToRender.repository
                  ? state.SingleToRender.repository
                  : "Unknown"}{" "}
                -{" "}
                {state.SingleToRender.GalleryNumber
                  ? state.SingleToRender.GalleryNumber
                  : "Unknown Gallery Number"}
                <div className="text-sm font-bold">Accession Number:</div>
                {state.SingleToRender.accessionNumber
                  ? state.SingleToRender.accessionNumber
                  : "Unknown Accession Number"}
                <div className="text-sm font-bold">Credit Line:</div>
                {state.SingleToRender.creditLine
                  ? state.SingleToRender.creditLine
                  : "Unknown Credit Line"}
                <div className="text-sm font-bold">Date:</div>
                {state.SingleToRender.accessionYear
                  ? state.SingleToRender.accessionYear
                  : "Unknown Date"}
                <div className="text-sm font-bold">Culture:</div>
                {state.SingleToRender.culture
                  ? state.SingleToRender.culture
                  : "Unknown Culture"}
                <div className="text-sm font-bold">Dimensions:</div>
                {state.SingleToRender.dimensions
                  ? state.SingleToRender.dimensions
                  : "Unknown Dimensions"}
              </div>
              {console.log("pedia : " + wikipediaUrl, "data : " + wikidataUrl)}
              {console.log(/false/.test(wikipediaUrl?.includes("undefined")))}

              {/false/.test(wikipediaUrl?.includes("undefined")) ? (
                wikipediaUrl
              ) : wikidataUrl !== null ? (
                <a
                  href={
                    /false/.test(wikipediaUrl?.includes("undefined"))
                      ? wikipediaUrl
                      : wikidataUrl
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <motion.button
                    className="bg-slate-200 rounded hover:bg-slate-400 text-black hover:text-white font-bold py-2 px-4"
                    target="_blank"
                    whileHover={{ scale: 1.1 }}
                  >
                    Learn more about this art
                  </motion.button>
                </a>
              ) : (
                <> </>
              )}
            </div>
          </div>

          {/* <button className="bg-cyan-400" onClick={goBack}>
            <ArrowUturnLeftIcon /> Get Back
          </button> */}
        </>
      ) : (
        <> {navigate("/404")}</>
      )}
    </>
  );
};

export default InfoObject;
