import React from "react";

import SearchIcon from "../Assets/img/search.svg";

const Navbar = () => {
  return (
    <>
      <div class="px-4 mt-3 sm:px-8 lg:px-16 xl:px-20 mx-auto">
        <div class="bg-white rounded flex items-center w-3/6 p-3 shadow-sm border border-gray-200">
          <button class="outline-none focus:outline-none">
            <img src={SearchIcon} alt=""></img>
          </button>
          <input
            type="search"
            name=""
            id=""
            placeholder="Search ..."
            x-model="q"
            class="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent"
          />
          <div class="select">
            <select
              name=""
              id=""
              x-model="image_type"
              class="text-sm outline-none focus:outline-none bg-transparent"
            >
              <option value="all" selected>
                All
              </option>
              <option value="photo">Photo</option>
              <option value="illustration">Illustration</option>
              <option value="vector">Vector</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
