import React, { lazy, Suspense ,useEffect} from 'react'
import { Route, Routes } from 'react-router'
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

function MainRoutes() {
 console.log("maiin re rendered");
 
  let sign_fnx=useSignStore(state=>state.fnx.set_data);
  let sign_property=useSignStore(state=> state.data);

  let {query}=usePost("refresh");
  let login=useQuery({queryKey:["login"],queryFn:async()=>{ console.log(sign_property?"Status true":"Status false");
  ;let get=await fetch("http://localhost:4800/login",{credentials:'include'});if(!get.ok){let conv=await get.json();throw new Error(conv||'error in login')};return await get.json() },retry:false ,refetchOnWindowFocus:false,refetchInterval:false,enabled:sign_property.status?false:true});
  
  
  useEffect(()=>{login.data?sign_fnx(login.data):login.isError&&query.mutate();
  
  },[login.data,login.isError,login.isLoading]);
  
  useEffect(()=>{ query.isSuccess&&login.refetch();query.isError&&console.log(login.error);
     },[query.isSuccess,query.isError]);

useEffect(()=>{console.log(sign_property.name,sign_property.status);
},[])

  return (
    <div>

<Navbar/>
{<Suspense fallback={<p>Loading...</p>}>
<Routes>

<Route path='/select'  element={ <Select/> }/>
<Route  path='/' element={<Home/> }  />
<Route path='/cards' element={ <Cards/>}  />
<Route path='/sign' element={<Sign/>} />
<Route path='/order' element={<Order/>} />
<Route path='/user/:id'  element={<Suspense fallback={<p>Loading...</p>}> <User/> </Suspense>}/>


</Routes>
</Suspense>}

        
    </div>
  )
}

export default MainRoutes