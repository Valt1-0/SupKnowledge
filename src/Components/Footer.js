import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative mt-16 bg-slate-100 mb-auto">
      <svg
        className="absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 text-slate-100"
        preserveAspectRatio="none"
        viewBox="0 0 1440 54"
      >
        <path
          fill="currentColor"
          d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
        />
      </svg>
      <div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
          <div className="md:max-w-md lg:col-span-2">
            <a
              href="/"
              aria-label="Go home"
              title="SupKnowledge"
              className="inline-flex items-center"
            >
              <svg
                className="w-8 text-slate-500"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeMiterlimit="10"
                stroke="currentColor"
                fill="none"
              >
                <motion.rect
                  x="3"
                  y="1"
                  width="7"
                  height="12"
                  initial={{
                    y: 0,
                  }}
                  animate={{
                    y: 10,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <motion.rect
                  x="3"
                  y="17"
                  width="7"
                  height="6"
                  initial={{
                    x: 0,
                  }}
                  animate={{
                    x: 11,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <motion.rect
                  x="14"
                  y="1"
                  width="7"
                  height="6"
                  initial={{
                    x: 0,
                  }}
                  animate={{
                    x: -11,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <motion.rect
                  x="14"
                  y="11"
                  width="7"
                  height="12"
                  initial={{
                    y: 0,
                  }}
                  animate={{
                    y: -10,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </svg>
              <span className="ml-2 text-xl text-black font-righteous font-bold tracking-wide uppercase">
                SupKnowledge
              </span>
            </a>
            <div className="mt-4 lg:max-w-sm">
              <p className="text-sm text-deep-purple-50">
                SupKnowledge is a site that brings together art from around the
                world, it contains Architecture, Sculpture, Visual Art and many
                others ...
              </p>
              <p className="mt-4 text-sm text-deep-purple-50">
                This site was created for our 3rd year WEBD project at SUPINFO
                Caen
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-deep-purple-accent-200 sm:flex-row">
          <p className="text-sm text-gray-900">
            © Copyright 2023 Dimitry-Valentin. All rights reserved.
          </p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            <a
              href="https://github.com/Valt1-0/SupKnowledge.git"
              target={"_blank"}
              rel="noreferrer"
              className="transition-colors duration-300 text-deep-purple-100 hover:text-teal-accent-400"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                scale={4}
                className="h-5"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
