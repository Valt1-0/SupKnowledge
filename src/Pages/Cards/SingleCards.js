import { useEffect,useContext } from "react";
import Cards from "../../Components/Cards";
import { DatasContext } from "../../Contexts/DatasContext";


const SingleCards = () => {
const {fetchArts, SingleToRender} = useContext(DatasContext);

useEffect(() => {
    fetchArts();
}, []);



return (
    <div>
        <p>console.log("Single");</p>
        {SingleToRender.map((art,index) => (
            <Cards/>
        ))}
    </div>
)

}

export default SingleCards;