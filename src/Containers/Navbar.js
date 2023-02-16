import React, { useContext,useState } from "react";
import { useLocation } from 'react-router-dom';
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {DatasContext} from "../Contexts/DatasContext";

import logo from "../Assets/img/SupKnowledge2.png";

const navigation = [
  { name: "Accueil", href: "", current: true },
  { name: "Gallerie", href: "Gallerie", current: false },
  { name: "Projects", href: "TEST", current: false },
  { name: "Calendar", href: "TEST2", current: false },
];


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


const Navbar = ({ is404Page }) => {
  const state = useContext(DatasContext)
  const [timeoutToken, setTimeoutToken] = useState(null);
  const location = useLocation();

 

  const setKeywordDebounced = keyword => {
    clearTimeout(timeoutToken);
    var token = setTimeout(() => setKeywordAction(keyword), 800);
    setTimeoutToken(token);
  };


  const setKeywordAction = result => {
    state.setKeywords(`"${result}"`);
    state.setIsLoadingDatas(true);
    const test1 =  state.fetchArts({ displayCarousel: true })
  };

  const test = async (search) => {
    console.log("test1 : " + state)
   setKeywordDebounced(search.target.value)
    
    console.log("test1 : " + search.target.value)
  
  }
  return (
    <>
      <Disclosure as="nav" className="bg-slate-100 drop-shadow-md">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-20 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <a href="/">
                      <img
                        className="block h-8 w-8 lg:hidden"
                        src={logo}
                        alt="Logo Of SupKnowledge"
                      />
                    </a>
                    <a href="/">
                      <img
                        className="hidden h-8 w-8 lg:block"
                        src={logo}
                        alt="Logo Of SupKnowledge"
                      />
                    </a>
                    <a href="/">
                      <span className="ml-4 text-gray-900 font-righteous">
                        <strong>SupKnowledge</strong>
                      </span>
                    </a>
                  </div>

                  {!is404Page ? (
                  <div className="px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
                    <div className="box pt-6">
                      <div className="box-wrapper">
                        <div className=" bg-white rounded flex items-center w-full p-3 shadow-sm border border-gray-200">
                          <button className="outline-none focus:outline-none">
                            <svg
                              className=" w-5 text-gray-600 h-5 cursor-pointer"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                          </button>
                          <input
                            type="search"
                            name=""
                            id=""
                            placeholder="Search an Art Work ..."
                            x-model="q"
                            onChange={(e) => test(e)}
                            ref={(input) => input && input.focus()}
                            aria-label="search term"
                            className=" w-full pl-4 text-sm outline-none focus:outline-none bg-transparent"
                          />
                          <div class="select">
                            <select
                              name=""
                              id=""
                              x-model="image_type"
                              className="text-sm outline-none focus:outline-none bg-transparent"
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
                    </div>
                  </div>
                  ) : (<div></div>)}





                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      

                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-700 text-white"
                              : "text-gray-900 hover:bg-gray-500 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium "
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-700 text-white"
                        : "text-gray-900 hover:bg-gray-500 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;
