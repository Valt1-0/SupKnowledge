import { useEffect, useContext, useState } from "react";
import { DatasContext } from "../../Contexts/DatasContext";
import { useLocation, useNavigate } from "react-router-dom";
import Cards from "../../Components/Cards";
 import noImage from "../../Assets/img/no-image.png";

const SingleCards = (req, res) => {
    const [id, setID] = useState(null);
    const state = useContext(DatasContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [descriptionWiki, setWikiDescription] = useState(null);
    const [imageWiki, setWikiImage] = useState(null);
    const [wikipediaUrl, setWikipediaUrl] = useState(null);

    // const params = new URLSearchParams(search);
    // setID(params.get("id"));

    const objectID = location.pathname.slice(5);
    // setID(objectID);


    const fetchWikiData = async (id) => {
        console.log(id)
        let description = String.empty;
        if (id != String.empty) {


            const url = `https://www.wikidata.org/w/api.php?origin=*&action=wbgetentities&ids=${id}&props=claims|descriptions|sitelinks&languages=en&format=json`
            console.log(url)
            const response = await fetch(url, {
                method: "GET",
                cache: "force-cache",
            })
            if (response.statusCode === 200) {
                const data = await response.json();
                //Get the description of wiki data
                description = data.entities[id].descriptions.en.value;
                setWikiDescription(description)

                //Get thumbnail from Wikipedia
                const imageClaim = data.entities[id].claims.P18;
                if (imageClaim) {
                    const imageFilename = imageClaim?.mainsnak?.datavalue?.value;
                    const imageSrc = `https://commons.wikimedia.org/wiki/Special:FilePath/${imageFilename}?width=200`;
                    setWikiImage(imageSrc);

                }

                // Get the Wikipedia URL from the "sitelinks" property
                const wikipediaLink = data.entities[id].sitelinks.enwiki;
                const wikipediaUrl = `https://${wikipediaLink?.url}`;
                setWikipediaUrl(wikipediaUrl);
            }

        }
        return true;
    }




    useEffect(() => {

        if (!objectID) {
            return navigate("/404");
        }
        const data = async () => {
            await state.fetchSingleArt(objectID);

        }
        data()
    }, [objectID]);


    useEffect(() => {
        const data = async () => {
            console.log("state : ", state.SingleToRender.objectWikidata_URL)
            if (state.SingleToRender.objectWikidata_URL) {
                try {
                  await fetchWikiData(state.SingleToRender.objectWikidata_URL.split('/').pop())

                }
                catch (error) {
                    console.error("Error : ", error)
                }



            }
            setIsLoading(false);

        }
        data()

    }, [state.SingleToRender])





    return (
        <> {isLoading ? (<p>Loading</p>) : (
            state.SingleToRender.message == undefined ?
                (<>         
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div className="w-full lg:w-auto lg:mr-12">
                {console.log(imageWiki != null ? "imageWiki" : "state.SingleToRender.primaryImage")}
                <img src={imageWiki != null ? imageWiki : state.SingleToRender.primaryImage ? state.SingleToRender.primaryImage : noImage} alt="" className="w-full" />
              </div>
              <div className="w-full lg:w-1/2 xl:w-1/3">
                <h1 className="text-3xl font-bold mb-2">{state.SingleToRender.title}</h1>
                <h2 className="text-lg font-medium mb-2">Artist name (if available), Date (if available)</h2>
                <p className="text-sm mb-4">Medium (if available)</p>
                <hr className="border-t border-gray-400 mb-4" />
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="text-sm font-bold">On view at:</div>
                  <div className="text-sm">{state.SingleToRender.repository} - {state.SingleToRender.GalleryNumber}</div>
                  <div className="text-sm font-bold">Accession Number:</div>
                  <div className="text-sm">{state.SingleToRender.accessionNumber}</div>
                  <div className="text-sm font-bold">Credit Line:</div>
                  <div className="text-sm">{state.SingleToRender.creditLine}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-bold">Date:</div>
                  <div className="text-sm">{state.SingleToRender.accessionYear}</div>
                  <div className="text-sm font-bold">Culture:</div>
                  <div className="text-sm">{state.SingleToRender.culture}</div>
                  <div className="text-sm font-bold">Dimensions:</div>
                  <div className="text-sm">{state.SingleToRender.dimensions}</div>
                </div>
              </div>
            </div>
 

</>

) : (<> {navigate("/404")}</>)

        )}

        </>
    );
};

export default SingleCards;
