import React, { useEffect } from 'react';

const Backside = ({data}) => {
   let {rotate,setRotate,x,i}=data;
    useEffect(()=>{console.log(rotate,x);
    })
    return <div
            className={`${
              rotate === i
                ? "scale-x-100 opacity-100 z-10"
                : "-scale-x-100 opacity-0 -z-10"
            } absolute top-7 flex flex-col border-20 border-white hover:border-gray-300 rounded-lg overflow-hidden shadow-lg transition-all duration-1000 w-[400px] h-[500px] bg-black/70 backdrop-blur-sm ml-3 mt-3 `}
          >
            <button
              onClick={() => setRotate(null)}
              className="text-white text-left p-2 hover:text-red-300"
            >
              ← Back
            </button> <ul className="pt-5 pl-4"><span className="text-yellow-700 font-black">Details :</span><li className="text-white font-bold text-sm">Type : {
              x?.type
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
          </div>
    ;
}

export default Backside;
