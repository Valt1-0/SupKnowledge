import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbutton = (props) => {
  return (
    <>
      <Link to={props.link}>
        <motion.button
          key={props.name}
          className={classNames(
            props.current
              ? "bg-gray-700 text-white"
              : "text-gray-900 hover:bg-gray-500 hover:text-white",
            "px-3 py-2 rounded-md text-sm font-medium"
          )}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          aria-current={props.current ? "page" : undefined}

        >
          {props.name}
        </motion.button>
      </Link>
    </>
  );
};

export default Navbutton;
