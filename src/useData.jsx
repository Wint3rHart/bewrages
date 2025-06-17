import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import useDelay from './useDelay';

function useData(type, key) {

let states=useDelay(type=="search"&&key);
console.log("useData rendered");
useEffect(()=>{console.log(states);},[states]) 

    const query = useQuery({ queryKey: [type, type!="search"?key:states], queryFn: async (queryKey) => { 
    
    console.log("state");
    
  let url=type=="select"?"http://localhost:4800/select":type=="orders"?`http://localhost:4800/order/${queryKey.queryKey[1]}`:type=="user"?
  `http://localhost:4800/user/${queryKey.queryKey[1]}`:type=="reviews"?`http://localhost:4800/reviews/${queryKey.queryKey[1]}`:
type=="search"&&states?`http://localhost:4800/search?value=${queryKey.queryKey[1]}`:type=="orders_data"?`http://localhost:4800/orders_data` :
  `http://localhost:4800/drinks?category=${queryKey.queryKey[0]}`  ;
 
 



 let get = await fetch(
        
      url,{credentials:"include"}); if (!get.ok) { let conv = await get.json(); throw new Error('error'||conv ) }; return await get.json() },refetchOnWindowFocus:false,staleTime:90000,retry:false,refetchInterval:false })

// V2kci-CL6SHsVogWgZX0GWwI4MI

return query

}

export default useData