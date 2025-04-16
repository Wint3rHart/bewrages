import { useQuery } from '@tanstack/react-query'
import React from 'react'

function useData(type, key) {

    const query = useQuery({ queryKey: [type, key], queryFn: async (queryKey) => { 
    
  let url=type=="select"?"http://localhost:4800/select":type=="orders"?`http://localhost:4800/order/${queryKey.queryKey[1]}`:type=="user"?
  `http://localhost:4800/user/${queryKey.queryKey[1]}`:type=="user"?`http://localhost:4800/user/${queryKey.queryKey[1]}`:type=="reviews"?`http://localhost:4800/reviews/${queryKey.queryKey[1]}`:
    
  `http://localhost:4800/drinks?category=${queryKey.queryKey[0]}`  ;
 
 



 let get = await fetch(
        
      url,{credentials:"include"}); if (!get.ok) { let conv = await get.json(); throw new Error('error' ) }; return await get.json() },refetchOnWindowFocus:false,staleTime:90000,retry:false,refetchInterval:false })

// V2kci-CL6SHsVogWgZX0GWwI4MI

return query

}

export default useData