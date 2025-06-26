import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import useData from "./useData";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router";
import { Blurhash } from "react-blurhash";
import { SearchContext } from "./MainRoutes";
import { motion, AnimatePresence } from "framer-motion";


const red_fnx = (state, action) => {
  return { ...state, [action.payload]: true };
};

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
      staggerChildren: 0.15,
      staggerDirection: -1,
    },
  },
};

const childVar = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,y:0,
    
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};


function Cards() {
  let context = useContext(SearchContext);
  let loc = useLocation();console.log("cards rendered");
  let [search, setSearch] = useSearchParams();
  let { data, isLoading, error, isError ,isPending} = useData(
    search.get("category") !== "custom"
      ? search.get("category")
      : "search",
    search.get("category") !== "custom" ? "drinks" : context.search
  );

  let [rotate, setRotate] = useState(null);
  let [reducer, setReducer] = useReducer(red_fnx, {});
  let nav = useNavigate();
useEffect(()=>{console.log(data);
},[data])
  useEffect(() => {
    data &&
      data.forEach((x) => {
        let image = new Image();
        image.src = x.images.image;
        image.onload = () => {
          setReducer({ payload: x.images.image });
        };
      });
  }, [data]);
// if(isLoading){
// ;return <p className="font-black animate-pulse text-red-900">Loading</p>}
  const memo = useMemo(() => {
    return (
      data &&
   <motion.div variants={parentVar} initial="initial" animate="animate" exit="exit" className="flex flex-wrap justify-evenly">{data.map((x, i) =>  {return <motion.div key={i} variants={childVar}  className="relative">
          {/* Front Side */}
         ( <div
            className={`${
              rotate === i ? "-scale-x-100 opacity-0" : "scale-x-100 opacity-100"
            } flex flex-col border-2 border-white hover:border-gray-300 rounded-lg overflow-hidden shadow-lg transition-all duration-1000 group w-[400px] h-[500px] bg-black/50 backdrop-blur-xs ml-3 mt-3`}
          >
            {/* Image */}
            {reducer[x.images.image] ? (
              <img
                className="w-full h-84 object-fit group-hover:brightness-75 transition-transform duration-200 group-hover:scale-98"
                src={x.images.image}
                alt={x.beverageName}
                fetchpriority={i === 0 ? "high" : "auto"} // Preload first card image
                // loading="lazy"
              />
            ) : (
            <div className="rder-5 w-full h-full">   <Blurhash
    hash={x.images.blur}
    resolutionX={32}
    resolutionY={32}
    punch={1}
         style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
  /></div>
            )}

            {/* Beverage Name */}
            <h2 className="text-xl font-extrabold mt-4 text-center text-white group-hover:text-brown-400 transition-colors duration-500 group-hover:text-yellow-600/85 group-hover:scale-98">
              {x.name}
            </h2>

            {/* Buttons */}
            <div className="flex justify-center space-x-4 mt-4 p-4">
              <button
                onClick={() => setRotate(i)}
                className="text-md font-bold text-white hover:text-yellow-700 transition-all duration-1000"
              >
                Details
              </button>
              <button
                onClick={() =>
                  nav(`reviews?id=${x._id}&type=reviews`)
                }
                 className="text-md font-bold text-white hover:text-yellow-700 transition-all duration-1000"
              >
                Reviews
              </button>
              <button
                onClick={() => nav(`/order?id=${x._id}`)}
                 className="text-md font-bold text-white hover:text-yellow-700 transition-all duration-1000"
              >
                Order
              </button>
            </div>

            {/* Border Accent */}
            <div className="border-t-2 border-white w-0 transition-all duration-500 group-hover:w-2/3 mx-auto mt-2"></div>
          </div>)

          {/* Back Side */}
      (    <div
            className={`${
              rotate === i
                ? "scale-x-100 opacity-100 z-10"
                : "-scale-x-100 opacity-0 -z-10"
            } absolute top-9 flex flex-col border-2 border-white hover:border-gray-300 rounded-lg overflow-hidden shadow-lg transition-all duration-1000 w-[400px] h-[500px] bg-black/70 backdrop-blur-sm`}
          >
            <button
              onClick={() => setRotate(null)}
              className="text-white text-left p-2 hover:text-red-300"
            >
              ← Back
            </button> <ul className="pt-5 pl-4"><span className="text-yellow-700 font-black">Details :</span><li className="text-white font-bold text-sm">Type : {
              x.type
              }</li> <li className="text-white font-bold text-sm">Category : {
              x.category
              }</li><li className="text-white font-bold text-sm">Origin : {
              x.origin
              }</li><li className="text-white font-bold text-sm">Rating : {
              x.rating
              }</li><li className="text-white font-bold text-sm">Price : {
              x.price
              }</li></ul>
            <ul className="p-4 space-y-1 overflow-y-auto text-yellow-700 font-black">Ingredients : 
              {x?.ingredients?.map((y, idx) => (
                <li key={idx} className="text-white font-bold text-sm">
                  {y}
                </li>
              ))}
            </ul>
           <ul className="p-4 space-y-1 overflow-y-auto text-yellow-700 font-black">Flavors : 
              {x?.flavors?.map((y, idx) => (
                <li key={idx} className="text-white font-bold text-sm">
                  {y}
                </li>
              ))}
            </ul>
          </div>)
        </motion.div>
      })}</motion.div>   
    );
  }, [data, rotate, reducer]);

  return (
    <div className="flex flex-wrap justify-center gap-6 min-h-[900px] w-screen items-center p-8">
      {memo}
      <div>
        <p className="text-white sm:mt-40 sm:ml-15 font-black text-4xl">
          {isError && error.message}
        </p>
      </div>
      {loc.pathname.includes("reviews") && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/70 backdrop-blur-sm z-50">
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default Cards;
