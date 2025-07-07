import React, { useEffect } from 'react'
import useSignStore from './useSignStore'
import { useNavigate, useParams } from 'react-router';
import usePost from './usePost'
import useData from './useData';

function Admin() {

    let {admin_id}=useParams();
let {name,email,id,role,status}=useSignStore(state=> {return state.data});
let {data,isLoading,error}=useData("orders_data");
let {query,abort_ref}=usePost("acknowledge");

useEffect(()=>{console.log(data);
},[data]);
let nav=useNavigate();
  return (

    <div className='flex flex-col  mt-30 w-full  transition-all duration-300  hover:border-yellow-900 items-center justify-center p-6 space-y-4 bg-yellow-900/30 border-3 border-white rounded-lg shadow-lg'>

 <span className='text-gray-300 border-1 hover:border-white  hover:text-white hover:scale-99 cursor-pointer transition-all duration-300 border-white inline-block rounded-full p-2' onClick={() => { nav('/select') }}>Back</span>
            {/* <img className='rounded-full w-50 m-auto border-2 h-50 border-purple-500' src={`data:image/webp;base64,${profilePic}`} /> */}
            <h1 className="text-2xl font-bold text-white">{name?.toUpperCase()}</h1>
            <p className=" text-white" > <strong className='text-yellow-700'>Email:</strong>  {email}</p>
            <p className="text-white text-sm"><strong className='text-yellow-700'>ID:</strong> {id?.toUpperCase()}</p>
<div className='flex justify-evenly items-center'>
  {data?.map((x,i)=>{return <ul className='px-2 text-white font-lg text-center mt-30'>
                  <li className=''> <strong className='text-yellow-700'>Order-ID : </strong>{x.data.order_id}</li> 
                  <li> <strong className='text-yellow-700'>Bewrage-ID : </strong>{x.data.bewrage_id}</li> 
                   <li className=''> <strong className='text-yellow-700'>Customer-ID : </strong>{x.data.customer_id}</li>
                <li> <strong className='text-yellow-600'>Order : </strong>{x.data.order}</li> <li> <strong className='text-yellow-600'>Flavour :  </strong>{x.data.flavour}</li><li><strong className='text-yellow-600'>Quantity :</strong>  {x.data.quantity}</li><li> <strong className='text-yellow-600'>Size : </strong>{x.data.size}</li>  <li><strong className='text-yellow-600'>Requests :</strong> {x.data.requests?.length > 0 ? x.requests : 'none'}</li> <li> <strong className='text-yellow-600'>Delivery : </strong>{x.data.delivery}</li>
                <li> <strong className='text-yellow-600'>Status : </strong>{x.data.status}</li><li> <strong className='text-yellow-700'>placementDate : </strong>{x.data.placementDate}</li>
                <button onClick={()=>{
                
                ;query.mutate({orderId:x.data.order_id,customer:x.data.customer_id,bewrage:x.data.bewrage_id,time:x.data.placementDate})}} className='border-1 border-white hover:border-yellow-700 hover:scale-99 hover:text-yellow-600 transition-all duration-300 text-sm bg-transparent p-2 rounded-xl mt-3 cursor-pointer'>Acknowledge</button> </ul>})}
</div>
    </div>


  )
}

export default Admin