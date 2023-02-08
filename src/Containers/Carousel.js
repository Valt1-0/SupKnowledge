import React from "react";
import anime from "animejs";

const Carousel = () => {

    
  return (
    <>
      <div className="text-center mt-10 font-bold ">
        Highlight
        <hr className="w-20 m-auto border-2 border-yellow-100" />
      </div>
      <div class="carousel" className="flex justify-between mt-10 mx-40 items-center">
        <div className="w-1/4 h-52 bg-red-500 rounded"></div>
        <div className="w-1/4 h-52 bg-green-500"></div>
        <div className="w-1/4 h-52 bg-blue-500"></div>
      </div>
    </>
  );
};


// const elements = document.querySelectorAll('.carousel');

// anime({
//   targets: "div",
//   translateX: 5
// });

export default Carousel;
