import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import useSignStore from './useSignStore';
import useData from './useData';
import {SearchContext} from './MainRoutes'

function Navbar() {

const {cards_fnx}=useContext(SearchContext);

let titles= [{title:"Home",link:"/"},{title:"SignUp",link:"/sign"},{title:"About Us",link:"/aboutUs"},{title:"Store",link:"/select"}]
 
let nav = useNavigate();
   
    let {name,email,id,role,status}=useSignStore(state=>{return state.data})
    
  let loc=useLocation();
    

    console.log('nav render');

    return (
        <div  className='flex justify-evenly mt-10 '>

           {titles.map((x,i)=>{return <ul><li className='text-white font-black ' style={{fontFamily:"cormorant-garamond"}} onClick={()=>{nav(x.link)}}>{x.title}</li></ul>})}  
            <div className='group text-white font-black relative'> Account
           <div className='border-1  transition-all duration-400 opacity-0 text-center group-hover:opacity-100 h-20 p-5 absolute left-3 top-12 z-2'>{<p  onClick={() => {console.log(role);
           ;role=="User"? nav(`user/${encodeURIComponent(id)}`):nav(`admin/${encodeURIComponent(id)}`) }}>{role=="User"?'User':"Admin"}</p>} </div> 
           </div>
              <div><input className='border-2 text-white border-white rounded-lg' type='search' onChange={(e)=>{
                cards_fnx(e.target.value,loc)}}/></div>  
                  
        </div>
    )
}

export default React.memo(Navbar)