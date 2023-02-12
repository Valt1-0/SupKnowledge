import React from "react";
import noImage from '../Assets/img/no-image.png';
import * as S from './styles'

const Cards = (props) => {
  return (

    <S.CardWrapper>
      <img src={props.art.primaryImageSmall ? props.art.primaryImageSmall : noImage} alt="" />
      <S.TextCardWrapper>
        <div>
          <h1>{props.art.title.length > 25 ? props.art.title.slice(0, 25).concat("...") : props.art.title}</h1>
          <span>{props.art.objectBeginDate} </span>
          <p>{props.art.artistDisplayName}</p>
        </div>
        <S.ButtonWrapper>

          <S.Button
            onClick={() => { window.open(`https://www.metmuseum.org/art/collection/search/${props.art.objectID}`, '_blank') }}
          >Learn more
          </S.Button>
        </S.ButtonWrapper>
      </S.TextCardWrapper>
    </S.CardWrapper>


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
