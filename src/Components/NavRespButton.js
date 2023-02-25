import React from "react";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

const NavRespButton = (props) => {
  return (
    <Disclosure.Panel className="sm:hidden">
      <div className="space-y-1 px-2 pb-2">
        <Link to={props.link}>
          <Disclosure.Button
            key={props.name}
            as="a"
            className={classNames(
                props.current
                ? "bg-gray-700 text-white"
                : "text-gray-900 hover:bg-gray-500 hover:text-white",
              "block px-3 py-2 rounded-md text-center font-medium "
            )}
            aria-current={props.current ? "page" : undefined}
          >
            {props.name}
          </Disclosure.Button>
          </Link>
      </div>
    </Disclosure.Panel>
  );
};

export default NavRespButton;
