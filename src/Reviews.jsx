import React, { act, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import useData from './useData';
import { useNavigate, useSearchParams } from 'react-router';
import usePost from './usePost';
import useSignStore from './useSignStore';
import { useInfiniteQuery } from '@tanstack/react-query';

const red_fnx = (state, action) => {
  if (action.type === "read_val") return { ...state, read_val: action.payload };
  else if (action.type === "comment") return { ...state, comment: action.payload };
  else if (action.type === "type") return { ...state, type: action.payload };
  else if (action.type === "rating") return { ...state, rating: action.payload };
  else return state;
};

function Reviews() {


let [state,setState]=useState(0);
let nav=useNavigate();
  console.log("modal rendered");




let [counter,setCounter]=useState(1);
  let [search, setSearch] = useSearchParams();
  let {name,status,id}=useSignStore(state=>state.data)
  let ref = useRef(null);
  let obs_ref=useRef(null);
  let stars_ref = useRef([]);
let {query,abort_ref}=usePost("comment","_",search.get("id"));

  let [reducer, setRed] = useReducer(red_fnx, {
    rating: 0,
    
    comment: '',
    type: "rating"
  });

  let {data,isLoading,isError,error,hasNextPage,fetchNextPage}=useInfiniteQuery({queryKey:["reviews",search.get("id")],queryFn:async({queryKey,pageParam=1,signal})=>{
    let get=await fetch(`http://localhost:4800/reviews/${queryKey[1]}?limit=5&page=${pageParam}`,{signal});if(!get.ok){let conv=await get.json();throw new Error("error in pagination for reviews"||conv)};return await get.json();  },
    initialPageParam:1,
    getNextPageParam:(lastPage,AllPages)=>{
      
console.log(counter,lastPage.details.count);

if (counter<lastPage.details.count) {
 console.log("lesser");
  return AllPages.length+1
}else{return undefined}

    } ,refetchOnWindowFocus:false});


useEffect(()=>{console.log(state);},[state])


useEffect(()=>{
if(!hasNextPage) return;
  let observe=new IntersectionObserver((entry)=>{if(entry[0].isIntersecting){console.log("in view");fetchNextPage(); setCounter(x=>x=x+1)};
}) 
if(obs_ref.current){observe.observe(obs_ref.current)};
return ()=>{if (obs_ref.current) {observe.unobserve(obs_ref.current)
  
}}
 },[hasNextPage])

let memo=useMemo(()=>{ console.log("re rendering from memo");
return  data && (

  <div
    className={`flex flex-col absolute top-0 justify-evenly items-center mt-25 ml-0
    ${search.get("type") === "comment" ? '-rotate-y-180' : 'rotate-y-0'}
    transition-all duration-500
    ${search.get("type") === "comment" ? 'opacity-0 -z-10' : 'opacity-100 z-10'}
    border-3 h-[500px] w-[400px]`}
  >
    <h1 >
      {data.pages[0].details.name}
    </h1>
    <h2>{data.pages[0].details.type}</h2>
    
    <h3>{data.pages[0].details.rating}</h3>

    <div className='border-4 border-yellow-900/80 p-3 rounded-lg  max-h-60 overflow-y-scroll overflow-x-hidden'>
      {
        data?.pages.map((a)=>{return a.reviews?.map((x, i) => (
        <div key={i} className='flex flex-col text-white mt-10'>
          <p className='text-yellow-800'>{x.user}</p>
          <p>{x.rating}</p>
          <div className='border-1 p-1 rounded-lg max-w-130 h-1/2'>
            <p className={`${reducer.read_val === i ? '' : 'truncate'} w-69`}>
              {x.comment}
            </p>
            {x?.comment?.length>36&&  <span onClick={() => {console.log(x.comment.length);
              if (reducer.read_val !== i) {
                setRed({ type: "read_val", payload: i });
              }else if(reducer.read_val==i){setRed({type:"read_val",payload:null})}
            }}>
              Read More
            </span>}
          </div>
        </div>
      ))}) }
      <p ref={obs_ref}>Obs</p>
    </div>
  </div>
)  },[data,setSearch])






  useEffect(() => {
    data && console.log(data);
  }, [data]);


useEffect(()=>{isError&&console.log(error);},[isError])



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


if (!data||isLoading) {
return <p className='text-white font-black text-4xl animate-pulse  flex justify-center h-100 items-center  ml-auto  '>Loading.....</p>  }

  return (
    <div className='text-white font-black relative flex justify-center text-center relative'>
<button className='absolute top-10 ml-70 ' onClick={()=>{nav("/select")}}>Back</button>
      {memo}

      <div
        className={`absolute mt-25 flex flex-col justify-around items-center top-0
        border-1 rounded-lg border-grey-500 h-[500px] w-[400px]
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
                 x<=i? stars_ref.current[x].style.fill = "#C2B280":stars_ref.current[x].style.fill=""
                 }   }
else{for(let y=0;y<=i;y++){stars_ref.current[y].style.fill="#D4AF37"} }              }}
           
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
         <button ref={ref} onClick={() => {
         query.mutate({rating:reducer.rating,comment:reducer.comment,user:name,status:"temp",id:search.get("id")});
        }} 
        disabled={query.isPending||query.isPaused?true:reducer.rating==0?true:!id?true:!status?true:false}
        >
        {reducer.rating==0?"Must Rate to Post a Comment":!id||!status?"Not Logged In":"Post"}
        </button>
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
      {/* <button className='text-white mt-40 absolute top-5 z-19 border-10 border-red-400' onClick={()=>{setState(x=> x=x+1)}}>CLICK</button> */}
    </div>
  );
}

export default Reviews;
