import { useEffect, useState } from "react";
import useData from "./useData";
import { useNavigate } from "react-router";
import useSignStore from "./useSignStore";
import { motion, AnimatePresence } from "framer-motion";

const parentVar = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const childVar = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

function App() {

  const [rot, setRot] = useState(0);
  const { data, isLoading, isError, error } = useData("select");
  const nav = useNavigate();
console.log("app rendered");

  useEffect(() => {
    useSignStore.subscribe(
      (state) => state.data,
      (x) => {
        console.log(x);
      }
    );
  }, []);

  useEffect(() => {
    console.log(rot);
  }, [rot]);

  useEffect(() => {
    if (data) console.log(data, data.length);
  }, [isLoading, data]);

  useEffect(() => {
    console.log(isError && error.message);
  }, [data, error]);

if (!data) {
return <p className='text-white font-black text-4xl animate-pulse  flex justify-center h-100 items-center  ml-auto  '>Loading.....</p>  }

  return (
    <div className="h-screen mt-20 flex flex-col justify-center items-center"  
>

        <motion.div
          variants={parentVar}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.h1
            className="text-gray-200 font-black text-4xl flex justify-evenly mb-10"
          >
            {"What would You like".split(" ").map((x, i) => (
              <motion.p
                key={i}
                className="ml-5"
                variants={childVar}
              >
                {x}
              </motion.p>
            ))}
          </motion.h1>

          <ul className="flex flex-col items-center text-white font-black text-xl">
            <motion.li
              key="all"
              variants={childVar}
              className="bg-amber-900/25 mt-5  border-1 border-white hover:border-gray-300 hover:scale-98 px-4 py-2 w-50 text-center rounded-full transition-all duration-300 border-gray-400 cursor-pointer"
              onClick={() => nav(`/cards?category=All`)}
            >
              All
            </motion.li>

            {data?.map((x, i) => (
              <motion.li
                key={x._id}
                variants={childVar}
                className="bg-amber-900/25 mt-5 border-1 border-white hover:border-gray-300  hover:scale-98 transition-all duration-300 px-4 py-2 w-50 text-center rounded-full border-gray-400 cursor-pointer"
                onClick={() => nav(`/cards?category=${x._id}`)}
              >
                {x._id}
              </motion.li>
            ))}
          </ul>

          {isError && (
            <p className="text-white sm:mt-40 sm:ml-15 font-black text-4xl">
              {error.message}
            </p>
          )}
        </motion.div>
  
    </div>
  );
}

export default App;
