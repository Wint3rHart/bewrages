import React, { createContext, lazy, Suspense ,useEffect, useMemo, useRef, useState} from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router'
import Navbar from './Navbar';
import usePost from './usePost';
import { useQuery } from '@tanstack/react-query';
import useSignStore from './useSignStore';
import Registration from './Registration';
import { AnimatePresence } from 'framer-motion';
import Completed from './Completed';

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
 console.log("main re rendered");
 let loc=useLocation();
let nav=useNavigate();

 const cards_fnx=(x,y)=>{
console.log(y);

setSearch((a)=>{return a=x });


};



useEffect(()=>{
  if(search.length>1){nav("/cards?category=custom")}
  
},[search]);


  
const memo=useMemo(()=>{console.log("yyyy");
;return <Suspense fallback={<p>Loading...</p>}>
<Registration/>
{/* <AnimatePresence mode='wait'> */}
<Routes  >

<Route path='/select'  element={ <Select/> }/>
<Route  path='/' element={<Home/> }  />
<Route path='/cards' element={ <Cards/>}  ><Route path='reviews' element={<Reviews/>}/></Route>
<Route path='/sign' element={<Sign/>} />
<Route path='/order' element={<Order/>} />
<Route path='/admin/:admin_id' element={<Admin/>}/>
<Route path='/user/:id'  element={<User/>}/>
<Route path='/completed' element={<Completed/>}/>

</Routes>
{/* </AnimatePresence> */}
</Suspense>},[]);

  return (
    <SearchContext.Provider value={{cards_fnx,search}}>
    <div class="min-h-screen border-5 border-red-900 items-center justify-center bg-[url('/Untitled-1%20copy.jpg')] bg-no-repeat bg-center -z-3 bg-cover bg-fixed">

  

<Navbar/>

{memo
  }

        
    </div>
    </SearchContext.Provider>
  )
}

export default MainRoutes
export {SearchContext}