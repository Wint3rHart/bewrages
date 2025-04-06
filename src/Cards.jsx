import React, { useCallback, useEffect,useMemo,useReducer,useRef,useState } from "react";
import useData from "./useData";
import { useNavigate, useSearchParams } from "react-router";
import { Blurhash } from "react-blurhash";

const red_fnx=(state,action)=>{
return {...state,[action.payload]:true}

}


function Cards() {
  console.log('cards rendered');
  

const check=useCallback((x)=>{console.log(x);
},[])

  let [search, setSearch] = useSearchParams();
  let { data, isLoading } = useData(search.get("category"), "drinks");
  let [rotate,setRotate]=useState();
  let [reducer,setReducer]=useReducer(red_fnx,{})
let nav=useNavigate();
  useEffect(() => {
    data && console.log(data);
  }, [data, isLoading]);

useEffect(()=>{console.log("rotate",rotate);
},[rotate])

useEffect(()=>{ data&&data.forEach((x,i)=>{let image=new Image();image.src=x.images.image;image.onload=()=>{setReducer({payload:x.images.image});console.log('ready');
}
})  },[data])

const memo=useMemo(()=>{return data&& data.map((x, i) => (
  <div className="relative mt-50"
    key={i}
   
  >
    <div  className={` ${rotate==i?"-scale-x-100":"scale-x-100"} ${rotate==i?"opacity-0":"opacity-100"}  flex flex-col relative border-2 border-white hover:border-gray-300 rounded-lg overflow-hidden shadow-lg transition-all duration-1000 group sm:w-[400px] h-[480px] bg-black/50 backdrop-blur-sm`}>
    {/* Review Button */}
    <span className="absolute top-3 right-3 text-gray-200 hover:text-brown-400 cursor-pointer text-lg font-bold scale-0 group-hover:scale-100 transition-transform duration-1000">
      Reviews
    </span>

    {/* Image */}
  {reducer[x.images.image]?  <img
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
      className="w-full  object-cover  group-hover:brightness-75 transition-transform duration-200 group-hover:scale-105"
      src={x.images.image}
      alt={x.beverageName}
    />:<Blurhash  resolutionX="32" resolutionY="32" hash={x.images.blur} height="100%" width="100%" punch={1} />}

    {/* Beverage Name */}
    <h2 className="text-xl font-extrabold mt-4 text-center text-white group-hover:text-brown-400 transition-colors duration-1000">
      {x.beverageName}
    </h2>

    {/* Buttons */}
    <div className="flex justify-center space-x-6 mt-4">
      <button onClick={()=>{setRotate(x=>x=i)}} className="text-md font-bold text-brown-400 group-hover:text-gray-300 cursor-pointer hover:text-brown-500 transition">
        Details
      </button>
      <button onClick={()=>{check(i)}}>Check</button>
      <button onClick={()=>{nav(`/order?id=${x._id}` )}} className="text-md font-bold text-brown-400 group-hover:text-gray-300 cursor-pointer hover:text-brown-500 transition">
        Order
      </button>
    </div>

    {/* Animated Border */}
    <div className="border-t-2 border-white w-0   transition-all duration-500 group-hover:w-2/3 mx-auto mt-4"></div>
  </div>
  
   <div  className={`flex flex-col ${rotate==i?"scale-x-100":"-scale-x-100"} ${rotate==i?"z-1":"-z-1"} ${rotate==i?"opacity-100":"opacity-0"}   absolute top-0 border-2 -z-1 border-white hover:border-gray-300 rounded-lg overflow-hidden shadow-lg transition-all duration-1000  group sm:w-[400px] h-[480px] bg-black/50 backdrop-blur-sm`}><span onClick={()=>{setRotate(x=>x=null)}}>Back</span> <ul>{x.ingredients.map((y,i)=>{return <li className="text-white">{y}</li>})}</ul>  </div>    </div>
))},[data,rotate,reducer])

  return (
    <div
      className="flex flex-wrap justify-center gap-6 min-h-[900px] w-screen items-center border-4 border-white p-8"
      style={{
        backgroundImage: `url('Untitled-1 copy.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {
        memo}
        
    
    </div>
  );
}

export default Cards;
