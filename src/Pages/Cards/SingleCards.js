import { useEffect, useContext, useState } from "react";
import { DatasContext } from "../../Contexts/DatasContext";
import { useLocation, useNavigate } from "react-router-dom";
import Cards from "../../Components/Cards";

const SingleCards = (req, res) => {
  const [id, setID] = useState(null);
  const state = useContext(DatasContext);
  const navigate = useNavigate();
  const location = useLocation();

  // const params = new URLSearchParams(search);
  // setID(params.get("id"));

  const objectID = location.pathname.slice(5);
  // setID(objectID);

  console.log(objectID);

  useEffect(() => {
    if (!objectID) {
      return navigate("/404");
    }

    state.fetchSingleArt(objectID);
  }, [id]);

  return (
    <div>
      {state.SingleToRender.title}
      test
    </div>
  );
};

export default SingleCards;
