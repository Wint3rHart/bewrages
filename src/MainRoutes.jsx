import React, { createContext, lazy, Suspense ,useEffect, useRef, useState} from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router'
import Navbar from './Navbar';
import usePost from './usePost';
import { useQuery } from '@tanstack/react-query';
import useSignStore from './useSignStore';

let Select=lazy(()=>{return import('./App')});
let Home=lazy(()=>{return import('./Home')});
let Cards=lazy(()=>{return import("./Cards")});
let Sign=lazy(()=>{return import('./Sign')});
let Order=lazy(()=>{return import('./Order')});
let User=lazy(()=>{ return import("./User")});
let Admin=lazy(()=>{return import('./Admin')});
let Reviews=lazy(()=>{return import("./Reviews")});
const SearchContext=createContext();

function MainRoutes() {
  let[search,setSearch]=useState("");
//  console.log("main re rendered");
 let loc=useLocation();
let nav=useNavigate();

 const cards_fnx=(x,y)=>{
console.log(y);

setSearch((a)=>{return a=x });


};



useEffect(()=>{
  if(search.length>0){nav("/cards?category=custom")}
  else{nav(`/select`)}
},[search]);


  let sign_fnx=useSignStore(state=>state.fnx.set_data);
  let sign_property=useSignStore(state=> state.data);
let ref=useRef(null);
  let {query}=usePost("refresh");
  let login=useQuery({queryKey:["login"],queryFn:async()=>{ console.log(sign_property?"Status true":"Status false");
  ;let get=await fetch("http://localhost:4800/login",{credentials:'include'});if(!get.ok){let conv=await get.json();throw new Error(conv||'error in login')};return await get.json() },retry:false ,refetchOnWindowFocus:false,refetchInterval:false,enabled:sign_property.status?false:true});
  
  
  useEffect(()=>{login.data?sign_fnx(login.data):login.isError&&query.mutate();
  
  },[login.data,login.isError,login.isLoading]);
  
  useEffect(()=>{ query.isSuccess&&login.refetch();query.isError&&console.log(query.error);
     },[query.isSuccess,query.isError]);

useEffect(()=>{
  
if (login.isLoading) {
  
ref.current.style.transform="scaleY(1)";

ref.current.innerText="Logging In";
}
else if(login.data||query.data){ref.current.innerText="Login Success";
setTimeout(() => {
  ref.current.style.transform="scaleY(0)";

}, 1300);  }
else if(query.error||login.isError){ref.current.innerText="Login Failed"; 
setTimeout(() => {
  ref.current.style.transform="scaleY(0)";

}, 1300)
 }
},[login.data,login.error,login.isLoading,query.error,query.data])

  return (
    <SearchContext.Provider value={{cards_fnx,search,setSearch}}>
    <div>

<Navbar/>
<div ref={ref} className={`border-3 flex  justify-center duration-1000 items-center text-white border-red-900 w-100 h-[100px]  mt-20 ml-10 origin-top `}>Loading </div>
{<Suspense fallback={<p>Loading...</p>}>
<Routes>

<Route path='/select'  element={ <Select/> }/>
<Route  path='/' element={<Home/> }  />
<Route path='/cards' element={ <Cards/>}  ><Route path='reviews' element={<Reviews/>}/></Route>
<Route path='/sign' element={<Sign/>} />
<Route path='/order' element={<Order/>} />
<Route path='/user/:id'  element={<User/>}/>


</Routes>
</Suspense>}

        
    </div>
    </SearchContext.Provider>
  )
}

export default MainRoutes
export {SearchContext}