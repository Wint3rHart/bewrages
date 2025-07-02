import React, { useEffect, useRef } from 'react';
import usePost from './usePost';
import { useQuery } from '@tanstack/react-query';
import useSignStore from './useSignStore';



const Registration = () => {
  console.log("reg rendered");
  
let ref=useRef(null);
let sign_fnx=useSignStore(state=>state.fnx.set_data);
  let sign_property=useSignStore(state=> state.data);

  let {query}=usePost("refresh");
  let login=useQuery({queryKey:["login"],queryFn:async()=>{ console.log(sign_property?"Status true":"Status false");
  ;let get=await fetch("http://localhost:4800/login",{credentials:'include'});if(!get.ok){let conv=await get.json();throw new Error(conv||'error in login')};return await get.json() },retry:false ,refetchOnWindowFocus:false,refetchInterval:false,enabled:sign_property.status?false:true});
  
  
  useEffect(()=>{login.data?sign_fnx(login.data):login.isError&&query.mutate();
  
  },[login.data,login.isError,login.isLoading]);
  
  useEffect(()=>{ if(query.isSuccess){login.refetch();ref.current.style.transform="scaleY(1)";ref.current.innerText="In progress"};if(query.isError){console.log(query.error);ref.current.style.transform="scaleY(1)";ref.current.innerText="Failed,Login Again"} setTimeout(() => {
  // ref.current.style.transform="scaleY(0)";

}, 1300)
     },[query.isSuccess,,query.error,query.data]);

useEffect(()=>{
  
if (login.isLoading) {
  
ref.current.style.transform="scaleY(1)";

ref.current.innerText="Logging In";
}
else if(login.data||query.data){ref.current.innerText="Login Success";
setTimeout(() => {
  ref.current.style.transform="scaleY(0)";

}, 1300);  }
else if(login.isError){ref.current.innerText="Refreshing Session"; 
setTimeout(() => {
  ref.current.style.transform="scaleY(0)";

}, 1300)
 }
},[login.data,login.error,login.isLoading])
return (<div ref={ref} className={`border-3 flex absolute top-0 justify-center duration-1000 items-center text-white border-red-900 w-100 h-[100px]  mt-10 ml-10 origin-top `}>Loading </div>)

    
}


export default Registration;
