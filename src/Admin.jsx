import React, { useEffect } from 'react'
import useSignStore from './useSignStore'
import { useParams } from 'react-router';
import { shallow } from 'zustand/shallow';
import useData from './useData';

function Admin() {

    let {admin_id}=useParams();
let {name,email,id,role,status}=useSignStore(state=> {return state.data});
let {data,isLoading,error}=useData("admin");
useEffect(()=>{console.log(name,email,id,status,role,admin_id);
},[])
  return (

    <div>

<ul className='mt-50  text-white'>
    <li>{name}</li>
    <li>{id}</li>
    <li>{email}</li>
    <li>{role}</li>
</ul>


    </div>


  )
}

export default Admin