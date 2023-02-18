import React from "react";
import { Link } from "react-router-dom";
import noImage from "../Assets/img/no-image.png";

const Cards = (props) => {
  return (
    <div className="relative group w-[300px] flex flex-col justify-center items-center transition duration-700 m-8 animate-cards">
      <img
        className="transition duration-700 w-[300px] h-[400px] object-cover rounded-2xl shadow-md hover:brightness-20"
        src={
          props.art.primaryImageSmall ? props.art.primaryImageSmall : noImage
        }
        alt="Art"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 text-white text-center opacity-0 group-hover:opacity-100 rounded-2xl flex flex-col justify-center items-center cursor-default transition duration-300">
        <div>
          <h1 className="m-auto text-center">
            {props.art.title.length > 25
              ? props.art.title.slice(0, 25).concat("...")
              : props.art.title}
          </h1>
          <span>{props.art.objectBeginDate} </span>
          <p className="italic">{props.art.artistDisplayName}</p>
        </div>
        <div className="flex flex-col w-full text-center justify-center items-center">
          <Link to={`/art/${props.art.objectID}`}>
            <button className="text-white text-[1rem] w-24 bg-transparent border-solid border-white border cursor-pointer rounded-md transition duration-500 mt-4 hover:text-black hover:bg-white">
              Learn more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;
