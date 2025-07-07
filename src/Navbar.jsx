import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import useSignStore from './useSignStore';
import useData from './useData';
import {SearchContext} from './MainRoutes'
import UseGeneralStore from './useGeneralStore';

function Navbar() {

const {cards_fnx}=useContext(SearchContext);
let search=UseGeneralStore((state)=>{return state.fnx.setSearch});
let titles= [{title:"Home",link:"/"},{title:"SignUp",link:"/sign"},{title:"About Us",link:"/aboutUs"},{title:"Store",link:"/select"}]
 
let nav = useNavigate();
   
    let {name,email,id,role,status}=useSignStore(state=>{return state.data})
    
  let loc=useLocation();
    

    console.log('nav render');

    return (
      <div className="flex justify-evenly items-center mt-2 bg-yellow-900/30 py-4">
  {/* Nav links */}
  {titles.map((x, i) => (
    <ul key={i}>
      <li
        className="text-white font-black cursor-pointer"
        style={{ fontFamily: 'cormorant-garamond' }}
        onClick={() => nav(x.link)}
      >
        {x.title}
      </li>
    </ul>
  ))}

  {/* Account + Dropdown */}
  <div className="relative group text-white font-black ">
    {/* This is the hover trigger */}
    <div className="cursor-pointer">Account</div>

    {/* This is the dropdown — appears directly below */}
    <div className="absolute left-0 top-full mt-0 bg-yellow-900/25 rounded-lg 
                    opacity-0 group-hover:opacity-100 
                    pointer-events-none group-hover:pointer-events-auto 
                    transition-opacity duration-300 z-50 border-1">
      <p
        className="p-4 cursor-pointer text-white"
        onClick={() => {
          console.log(role);
          role === "User"
            ? nav(`user/${encodeURIComponent(id)}`)
            : nav(`admin/${encodeURIComponent(id)}`);
        }}
      >
        {role === "User" ? "User" : "Admin"}
      </p>
    </div>
  </div>

  {/* Search */}
  <div>
    <input
      className="border-2 text-white border-white rounded-lg bg-transparent px-2 py-1"
      type="search"
      onChange={(e) => search(e.target.value)}
    />
  </div>
</div>

    )
}

export default React.memo(Navbar)