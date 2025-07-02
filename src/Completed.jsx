import React, { useEffect, useRef } from 'react';
import usePost from './usePost';
import { useSearchParams } from 'react-router';
const Completed = () => {
    let {query,abort_ref}=usePost("post_complete")
    let {data,mutate,isPending,isError,error}=query;
let [search,setSearch]=useSearchParams();
let ref=useRef(0);
   useEffect(() => {
  if (isError) {
    console.error("Mutation Error:", error.message);
  }
}, [isError,error]);
useEffect(()=>{
    if(ref.current==0){
    mutate({url:search.get("session_id")});
    ref.current+=1;console.log(search.get("session_id"));}
    
return ()=>{ref.current=0}    
},[]);

    return (
        <div className='border-2'>
            <h1 className='text-white'>Payment <span className={`${isPending&&"animate-pulse"} text-white font-black text-4xl `}>{data?"COMPLETED":isPending?"Payment In Progress":isError&&error.message}</span> </h1>
            <p>THANK YOU</p>
        </div>
    );
}

export default Completed;
