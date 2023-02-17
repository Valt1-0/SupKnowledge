import { useEffect,useContext, useState } from "react";
import { DatasContext } from "../../Contexts/DatasContext";
import { useLocation, useNavigate } from "react-router-dom";
import Cards from "../../Components/Cards";

const SingleCards = (req,res) => {
    
const state = useContext(DatasContext);
    const navigate = useNavigate();
    const location = useLocation();
    const search = location.search;
    const [id, setID] = useState(null);
    const params = new URLSearchParams(search);
    setID(params.get('id')); 

console.log(id);

useEffect(() => {
    if (!id) {
        return navigate("/404");
    }

    state.fetchSingleArt(id)
}, [id]);



return (
    <div> 
       {
            state.SingleToRender.title

       } 
        <p>console.log("Single");</p>
      test
    </div>
)

}

export default SingleCards;