import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import useSignStore from './useSignStore';

function Navbar() {

    let nav=useNavigate();
    let role=useSignStore(x=> x.data.role);
    let sign_id=useSignStore(state=> state.data.id);
useEffect(()=>{console.log(role);
})

console.log('nav render');

    return (
        <div className='border-4'>

            <ul className='list-none text-white absolute top-0 flex justify-evenly list-style-none h-20 items-center font-black text-2xl bg-transparent w-full left-0'><li onClick={()=>{nav("/")}}>Home</li><li onClick={()=>{nav("/sign")}}>signUp</li>
            <li onClick={()=>{nav("/")}}>AboutUs</li><li onClick={()=>{nav("/select")}}>Store</li> <ul className=' group border-2 relative p-2'>Account <ul> <div className='border-1  transition-all duration-400 opacity-0 text-center group-hover:opacity-100 h-20 w-20 absolute left-3 top-12'><li  onClick={()=>{nav(`user/${encodeURIComponent(sign_id)}`)}}>User</li> </div> </ul> </ul> </ul>
        </div>
    )
}

export default React.memo(Navbar)