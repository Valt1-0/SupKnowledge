import { useEffect, useState, useContext } from "react";
import Cards from "../../../Components/Cards";
import Carousel from "../../../Components/Carousel/Carousel";
import { DatasContext } from "../../../Contexts/DatasContext";
import ScrollArrow from "../../../Components/ScrollArrow";


const Home = () => {
  const [timeoutToken, setTimeoutToken] = useState(null);
  const state = useContext(DatasContext);
  const [search, setSearch] = useState(`""`);
  // const [isLoading,setIsLoading] = useState(true);
  // const [sliceStart, setSliceStart] = useState(0);
  const [sliceEnd, setSliceEnd] = useState(10);
  const setKeywordDebounced = (keyword) => {
    clearTimeout(timeoutToken);
    var token = setTimeout(() => setKeywordAction(keyword), 400);
    setTimeoutToken(token);
  };

  const setKeywordAction = (result) => {
    state.setKeywords(`"${result}"`);
    setSearch(result);
  };

  useEffect(() => {
    state.fetchArts({ displayCarousel: true }); // setting random arts to be shown
  }, [search]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const targetDiv = document.querySelector("#Cards-elements");
    const targetDivRect = targetDiv.getBoundingClientRect();
    if (targetDivRect.bottom <= window.innerHeight) {
      setSliceEnd(sliceEnd + 10);
      console.log(sliceEnd);
      //  state.fetchArts({ displayCarousel: false });
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* <input
        type="search"
        placeholder="Enter keyword here..."
        onChange={(e) => setKeywordDebounced(e.target.value)}
        ref={(input) => input && input.focus()}
        aria-label="search term"
      /> */}

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
                onChange={(e) => setKeywordDebounced(e.target.value)}
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

      {state.isLoadingDatas ? (
        <p>Loading</p>
      ) : (
        <>
          <br />
          <Carousel items={state.CarouselToRender} />
          <br />
          <hr />
          <div
            id="Cards-elements"
            className="flex justify-center flex-wrap items-center "
          >
            {state.artsToRender.map((art, index) => (
              <Cards key={index} art={art} />
            ))}{" "}
          </div>
        </>
      )}
      <ScrollArrow />
    </>
  );
};

export default Home;
