import React from "react";
import noImage from '../Assets/img/no-image.png';
import * as S from './styles'

const Cards = (props) => {
  return (

    <div className="relative w-[300] flex flex-col justify-center items-center [transition:0.3s] animate-cards m-8 hover:[transform:scale(1.02)]">
    <img className="[transition:0.5s] w-[300px] h-[400px] object-cover rounded-2xl [box-shadow:rgba(0,0,0,0.35)_0px_5px_15px] hover:[filter:brightness(20%)]" src={props.art.primaryImageSmall ? props.art.primaryImageSmall : noImage} alt="" />
      <div className=" text-white hidden max-w-[80] cursor-default hover:absolute hover:w-full hover:h-full hover:flex hover:flex-col hover:items-center hover:text-center">
        <div>
          <h1 className="mb-2">{props.art.title.length > 25 ? props.art.title.slice(0, 25).concat("...") : props.art.title}</h1>
          <span>{props.art.objectBeginDate} </span>
          <p className="italic">{props.art.artistDisplayName}</p>
        </div>
        <div className="flex flex-col w-full text-center justify-center items-center">
          <button className="text-white text-[1px] w-[90%] bg-transparent p-2 border-solid border-white border cursor-pointer rounded-md [transition:0.5s] mt-4 hover:text-black hover:bg-white"
            onClick={() => { window.open(`https://www.metmuseum.org/art/collection/search/${props.art.objectID}`, '_blank') }}
          >Learn more
          </button>
        </div>
      </div>
    </div>


    // <div className="flex justify-center">
    //   <div className="rounded-lg shadow-lg bg-white max-w-sm">
    //     <a href="#!">
    //       <img
    //         className="rounded-t-lg"
    //         src={props.art.primaryImageSmall ? props.art.primaryImageSmall : noImage}
    //         alt=""
            
    //       />
    //     </a>
    //     <div className="p-6">
    //       <h5 className="text-gray-900 text-xl font-medium mb-2"> {props.art.title.length > 25
    //         ? props.art.title.slice(0, 25).concat("...")
    //         : props.art.title}</h5>
    //       <span>{props.art.objectBeginDate}</span>
    //       <p>{props.art.artistDisplayName}</p>
    //       <button
    //         type="button"
    //         className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
    //       >
    //         Button
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Cards;
