import React, { act, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import useData from './useData';
import { useSearchParams } from 'react-router';
import usePost from './usePost';
import useSignStore from './useSignStore';

const red_fnx = (state, action) => {
  if (action.type === "read_val") return { ...state, read_val: action.payload };
  else if (action.type === "comment") return { ...state, comment: action.payload };
  else if (action.type === "type") return { ...state, type: action.payload };
  else if (action.type === "rating") return { ...state, rating: action.payload };
  else return state;
};

function Reviews() {
  console.log("modal rendered");
  let [search, setSearch] = useSearchParams();
  let user=useSignStore(state=>state.data.name)
  let ref = useRef(null);
  let stars_ref = useRef([]);
let {query,abort_ref}=usePost("comment","_",search.get("id"));

  let [reducer, setRed] = useReducer(red_fnx, {
    rating: 0,
    
    comment: '',
    type: "rating"
  });


  let { data, isLoading, isError, error } = useData("reviews", search.get("id"));

useEffect(()=>{data&&console.log(data);},[data])
useEffect(()=>{ 

if(query.isPending||query.isPaused){ref.current.innerText="Posting"}
else if(query.isSuccess){ ref.current.innerText="Success";
setTimeout(() => {
  ref.current.innerText="Post";
}, 1300)}
else if(query.error){ref.current.innerText=query.error;setTimeout(() => {
  ref.current.innerText="Post"
}, 1300);}
},[query.isPaused,query.isPending,query.error]);

  useEffect(() => {
    data && console.log(data);
  }, [data]);

  useEffect(() => {
    console.log(reducer);
  }, [reducer]);

useEffect(()=>{console.log(query);},[query.data,query.error])

  if (!data || isLoading) {
    return (
      <div className='text-white font-black text-4xl animate-pulse'>
        LOADING
      </div>
    );
  }

  return (
    <div className='text-white font-black flex justify-center text-center relative'>

      {data && (
        <div
          className={`flex flex-col absolute top-0 justify-evenly items-center mt-20 ml-0
          ${search.get("type") === "comment" ? '-rotate-y-180' : 'rotate-y-0'}
          transition-all duration-500
          ${search.get("type") === "comment" ? 'opacity-0 -z-10' : 'opacity-100 z-10'}
          border-3 h-[500px] w-[400px]`}
        >
          <h1 >
            {data.details.name}
          </h1>
          <h2>{data.details.type}</h2>
          
          <h3>{data.details.rating}</h3>

          <div className='border-4 border-red-900/25   max-h-60 overflow-y-scroll overflow-x-hidden'>
            {
              data?.reviews?.map((x, i) => (
              <div key={i} className='flex flex-col text-white mt-10'>
                <p>{x.user}</p>
                <p>{x.rating}</p>
                <div className='border-2 max-w-130 h-1/2'>
                  <p className={`${reducer.read_val === i ? '' : 'truncate'} w-69`}>
                    {x.comment}
                  </p>
                  <span onClick={() => {
                    if (reducer.read_val !== i) {
                      setRed({ type: "read_val", payload: i });
                    }
                  }}>
                    Read More
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        className={`absolute mt-25 flex flex-col justify-around items-center top-0
        border-3 border-blue-500 h-[500px] w-[400px]
        ${search.get("type") === "comment" ? 'rotate-y-0 opacity-100' : 'rotate-y-180 opacity-0'}
        transition-all duration-500`}
      >
       

        <p>Make A Comment</p>

        <div className='flex justify-center'>
          {[1, 2, 3, 4, 5].map((x, i) => (
            <svg 
              key={i}
              ref={(e) => { stars_ref.current[i] = e; }}
              onMouseEnter={() => {console.log('a');

             if( reducer.rating==0)  { ;for (let x = 0; x <= 4; x++) {
                 x<=i? stars_ref.current[x].style.fill = "red":stars_ref.current[x].style.fill=""
                 }   }
else{for(let y=0;y<=i;y++){stars_ref.current[y].style.fill="blue"} }              }}
           
onMouseLeave={() => {
             if(reducer.rating==0){   for (let x = 0; x <= 4; x++) {
                  stars_ref.current[x].style.fill = "";
                }}else{for(let z=0;z<=4;z++){
                z<reducer.rating?  stars_ref.current[z].style.fill="yellow":stars_ref.current[z].style.fill=""
                }}
              }}
              onClick={() => {
                setRed({ type: "rating", payload: i + 1 });
                for(let x=0;x<=4;x++){x<=i? stars_ref.current[x].style.fill = "yellow":stars_ref.current[x].style.fill=""}
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="yellow"
              className='w-6 h-6'
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14l-5-4.87 6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>

        <textarea
          className='w-90 h-30 border-2'
          value={reducer.comment}
          onChange={(e) => {
            setRed({ type: "comment", payload: e.target.value });
          }}
        ></textarea>
         <p ref={ref} onClick={() => {
         query.mutate({rating:reducer.rating,comment:reducer.comment,user:user,status:"temp",id:search.get("id")});
        }}>
        Post
        </p>
      </div>

      <button
        className='absolute top-5'
        onClick={() => {
          setSearch({
            id: search.get("id"),
            type: search.get("type")=="reviews"? "comment":"reviews"
          });
        }}
      >
        {search.get("type") === "comment" ? "Reviews" : 'Comment'}
      </button>

    </div>
  );
}

export default Reviews;
