import React from "react";
import { Link } from "react-router-dom";
import Illustration404 from "../Assets/img/404Illustration.png";

const Error404 = () => {
  return (
    <>
      <div className="justify-center items-center">
        <div className="flex font-bold ">
          <div>4</div>
          <div>0</div>
          <div>4</div>
        </div>
        Error
        <img src={Illustration404} alt="" />
        {/* <Link to="/"> */}
          <button className="bg-teal-300 rounded">Back to the Menu</button>
        {/* </Link> */}
      </div>
    </>
  );
};

export default Error404;
