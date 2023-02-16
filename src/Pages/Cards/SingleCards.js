import { useEffect,useContext } from "react";
import { DatasContext } from "../../Contexts/DatasContext";
import { useLocation, useNavigate } from "react-router-dom";

const SingleCards = (req,res) => {
    
const state = useContext(DatasContext);
    const navigate = useNavigate();
    const location = useLocation();
    const search = location.search;
    const params = new URLSearchParams(search);
    const id = params.get('id'); 

console.log(id);

useEffect(() => {
    if (!id) {
        return navigate("/404");
    }
    state.fetchSingleArt(1)
}, []);



return (
    <div>
        <p>console.log("Single");</p>
      test
    </div>
)

}

export default SingleCards;