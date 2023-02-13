import React, { useState } from "react";
import { Link } from "react-router-dom";
import Illustration404 from "../Assets/img/404Illustration.png";
import { motion } from "framer-motion";

const Error404 = () => {
  const [imageLoading, setImageLoading] = useState(true);
  const [pulsing, setPulsing] = useState(true);

  const imageLoaded = () => {
    setImageLoading(false);
    setTimeout(() => setPulsing(false), 600);
  };

  return (
    <>
      <div className="grid place-items-center mt-10">
        <motion.img
          initial={{ height: "16rem", opacity: 0 }}
          // style={{ height: imageLoading ? "6rem" : "auto" }}
          animate={{
            height: imageLoading ? "16rem" : "auto",
            opacity: imageLoading ? 0 : 1,
          }}
          transition={
            ({ height: { delay: 0, duration: 0.4 } },
            { opacity: { delay: 0.4, duration: 0.4 } })
          }
          onLoad={imageLoaded}
          src={Illustration404}
        />
        <motion.span
          className="font-bold text-7xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          404
        </motion.span>

        <motion.span
          className="font-bold text-8xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.7,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          Error
        </motion.span>
      </div>
      <div className="flex justify-center items-center mt-5">
        <Link to="/">
        <motion.button
          className="bg-slate-200 rounded hover:bg-slate-400 text-black hover:text-white font-bold py-2 px-4"
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10,
            duration: 0.8,
            delay: 0.9,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          Back to the Menu
        </motion.button>
        </Link>
      </div>
    </>
  );
};

export default Error404;
