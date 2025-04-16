import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
function Home() {

  // let login=useQuery({queryKey:["Login"],queryFn:async()=>{ let get=await fetch("",{credentials:'include'});if(!get.ok){let conv=await get.json();throw new Error(conv||'error in login')};return await get.json() }  });


  // useEffect(()=>{login.data&&console.log(login.data);
  // },[login.data])
  


  return 
}

export default Home