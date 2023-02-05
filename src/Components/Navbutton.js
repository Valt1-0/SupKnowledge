import React from "react";


const Navbutton = (props) => {
  return (
    <>
      <li>
        <a
          href={props.href}
          class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
          aria-current="page"
        >
          {props.name}
        </a>
      </li>
    </>
  );
};

export default Navbutton;
