import React, { useEffect, useRef } from 'react';
import usePost from './usePost';
import { useSearchParams } from 'react-router';
const Completed = () => {
    let {query,abort_ref}=usePost("post_complete")
    let {data,mutate,isPending,isError,error,isSuccess}=query;
let [search,setSearch]=useSearchParams();
let ref=useRef(0);
   useEffect(() => {
  if (isError) {
    console.error("Mutation Error:", error.message);
    
    
  };console.log(data);
}, [isError,error,data]);
useEffect(()=>{console.log("data",data,"isSuccess",isSuccess,"isError",isError,"isPending",isPending);
},[data,isSuccess,isError,isPending])
useEffect(()=>{
   
    mutate({url:search.get("session_id")});
    ref.current+=1;console.log(search.get("session_id"));
    
    ;
   
},[]);

    return (
        <div className='border-2'>
            <h1 className='text-white'> <span className={`${isPending&&"animate-pulse"} text-white font-black text-4xl `}>{data||isSuccess?"COMPLETED":isPending?"Payment In Progress":isError&&error.message}</span> </h1>
            <p className='text-white font-black text-2xl'>THANK YOU</p>
        </div>
    );
}

export default Completed;
