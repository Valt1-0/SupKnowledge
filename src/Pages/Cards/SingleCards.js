import { useEffect, useContext, useState } from "react";
import { DatasContext } from "../../Contexts/DatasContext";
import { useLocation, useNavigate } from "react-router-dom";
import Cards from "../../Components/Cards";

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
        const response  = await fetch(url, {
            method: "GET",
            cache: "force-cache",
        })
           if (response.statusCode === 200) {       
               const data = await response.json();
               description =  data.entities[id].descriptions.en.value;
       
               setWikiDescription(description)
               const imageClaim = data.entities[id].claims.P18;
               if (imageClaim)
               {
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
                 await fetchWikiData('Q116392635')
              
            }
            catch (error)
            {
                console.error("Error : ",error)
            }
         
           
         
        }
        setIsLoading(false);

    }
    data()

    }, [state.SingleToRender])





  return (
    <> {isLoading ? (<p>Loading</p>) : (
          state.SingleToRender.message == undefined ? 
              (<div>
                  {
                    <>
                          <h2>
                            Title : { state.SingleToRender.title}
                          </h2>

                        
                            <div>
                                
                              description : {descriptionWiki}
                          </div>  
                         
                    </>
                
                       
                  }
                 
                  
              </div>) : (<> { navigate("/404")}</>)
          
    )}

    </>
  );
};

export default SingleCards;
