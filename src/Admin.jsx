import React, { useEffect } from 'react'
import useSignStore from './useSignStore'
import { useNavigate, useParams } from 'react-router';

import useData from './useData';

function Admin() {

    let {admin_id}=useParams();
let {name,email,id,role,status}=useSignStore(state=> {return state.data});
let {data,isLoading,error}=useData("orders_data");
useEffect(()=>{console.log(data);
},[data]);
let nav=useNavigate();
  return (

    <div className='flex flex-col justify-center items-center mt-25'>

 <span className='text-gray-300 border-1 hover:border-white  hover:text-white hover:scale-99 cursor-pointer transition-all duration-300 border-purple-400 inline-block rounded-full p-2' onClick={() => { nav('/select') }}>Back</span>
            {/* <img className='rounded-full w-50 m-auto border-2 h-50 border-purple-500' src={`data:image/webp;base64,${profilePic}`} /> */}
            <h1 className="text-2xl font-bold text-purple-500">{name?.toUpperCase()}</h1>
            <p className=" text-gray-300" > <strong className='text-purple-400'>Email:</strong>  {email?.toUpperCase()}</p>
            <p className="text-gray-300 text-sm"><strong className='text-purple-400'>ID:</strong> {id?.toUpperCase()}</p>

    </div>


  )
}

export default Admin