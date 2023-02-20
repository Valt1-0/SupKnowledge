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
    const [wikiData, setWikiData] = useState(null);

  // const params = new URLSearchParams(search);
  // setID(params.get("id"));

  const objectID = location.pathname.slice(5);
  // setID(objectID);


const fetchWikiData = async (id) => {
    console.log(id)
    let description = String.empty;
    if (id != String.empty) {


        const url = `https://www.wikidata.org/w/api.php?origin=*&action=wbgetentities&ids=${id}&props=descriptions&languages=en&format=json`
        console.log(url)
        const response  = await fetch(url, {
            method: "GET",
            cache: "force-cache",
        })
           
        const data = await response.json();
    description =  data.entities[id].descriptions.en.value;
    
       
        // if (!response.ok) {
        //     console.log(response.statusText);
        //     throw Error(response.statusText);
        // }
       
        
        
    }
    return description;
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
                const wiki = await fetchWikiData('Q116392635')
                setWikiData(wiki)
                console.log("Wiki : ", wiki)
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
                                
                             description : {wikiData}
                          </div>  
                         
                    </>
                
                       
                  }
                 
                  
              </div>) : (<> { navigate("/404")}</>)
          
    )}

    </>
  );
};

export default SingleCards;
