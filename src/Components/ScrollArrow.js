import React, { useState } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

const ScrollArrow = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);

  return (
    <div className="bg-red-500">
      <ArrowUpIcon
        className="fixed w-full h-5 bottom-5 items-center justify-center z-50 cursor-pointer opacity-50"
        onClick={scrollTop}
        style={{ height: 40, display: showScroll ? "flex" : "none" }}
      />
    </div>
  );
};

export default ScrollArrow;
