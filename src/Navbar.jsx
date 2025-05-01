import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import useSignStore from './useSignStore';
import useData from './useData';
import {SearchContext} from './MainRoutes'

function Navbar() {

const {cards_fnx}=useContext(SearchContext);

let titles= [{title:"Home",link:"/"},{title:"SignUp",link:"/sign"},{title:"About Us",link:"/aboutUs"},{title:"Store",link:"/select"}]
 
let nav = useNavigate();
    let role = useSignStore(x => x.data.role);
    let sign_id = useSignStore(state => state.data.id);
  let loc=useLocation();
    

    // console.log('nav render');

    return (
        <div  className='flex justify-evenly mt-10'>

           {titles.map((x,i)=>{return <ul><li className='text-white font-black' onClick={()=>{nav(x.link)}}>{x.title}</li></ul>})}  
            <div className='group text-white font-black relative'> Account
           <div className='border-1  transition-all duration-400 opacity-0 text-center group-hover:opacity-100 h-20 w-20 absolute left-3 top-12'><li onClick={() => { nav(`user/${encodeURIComponent(sign_id)}`) }}>User</li> </div> 
           </div>
              <div><input className='border-2 text-white border-white rounded-lg' type='search' onChange={(e)=>{
                cards_fnx(e.target.value,loc)}}/></div>  
                  
        </div>
    )
}

export default React.memo(Navbar)