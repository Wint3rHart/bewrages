import React, { act, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import useData from './useData';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import usePost from './usePost';
import useSignStore from './useSignStore';


const red_fnx=(state,action)=>{
if(action.type=="size"){
;return {...state,size:action.payload}}
else if(action.type=="delivery"){return {...state,delivery:action.payload}}

}




function Order() {

  let nav=useNavigate();
let {query,abort_ref}=usePost("order")

  console.log('orders rendered');
let [search,setSearch]=useSearchParams();
let [reducer,setReducer]=useReducer(red_fnx,{delivery:"Pickup",size:1});

let {data,isLoading,isError,error}=useData("orders",search.get("id"));
let user_id=useSignStore(state=>state.data.id);
let [placing,setPlace]=useState(false);
let {register,handleSubmit,formState,control}=useForm({defaultValues:{flavour:data?.flavors?.[0],size:1,delivery:"Pickup",quantity:1,request:""}});
let ref=useRef([]);
let {isSubmitting,errors}=formState;

// useEffect(()=>{console.log(reducer
// );
// },[reducer]);

// useEffect(()=>{console.log(data?.flavors?.[0]);
// },[data])

useEffect(()=>{console.log(query,query.isError);
},)
useEffect(()=>{console.log(data&&data);
},[data])
useEffect(()=>{
  if(query.isPending){ref.current[1].innerText="Placing Order";} 
else if(query.isPaused){console.log("paused");
;abort_ref.current.abort();abort_ref.current=new AbortController();}
else if(!query.isPending&&query.isSuccess){ref.current[1].innerText="Order Placed successfully";setTimeout(() => {
  ref.current[1].innerText="Place Order";
}, 1000);}
else if(!query.isPending&&query.isError){ref.current[1].innerText="Order Failed";setTimeout(() => {
  ref.current[1].innerText="Place Order";
}, 1000);}},[query.isPending,query.isSuccess,query.isError,query.isPaused])



// useEffect(()=>{console.log(query.isPaused);
// },[query.isPaused])
  


// useEffect(()=>{console.log(placing);
// },[placing])
if (!data?.flavors) 
return <p>Loading.....</p>  


  return (
    <div className="flex mt-30  bg-transparent relative text-gray-400 items-center justify-center min-h-screen w-full">
      <span className='text-gray-400 hover:pointer absolute top-5 hover:border-white hover:text-white hover:scale-99 cursor-pointer transition-all duration-300 border-purple-700 inline-block mb-5 rounded-full p-3' onClick={()=>{nav("/select")}}>Back</span>
      <div className={`w-full flex relative transition-all duration-1000  justify-center `}>
        <div className="bg-transparent border-1  border-purple-700 rounded-full p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Hotel Booking</h2>
          <span>{data.rating}</span>
          {/* <button onClick={()=>{abort_ref.current.abort();abort_ref.current=new AbortController()}}> ABORT</button> */}
          
          <form  onSubmit={handleSubmit((data)=>{ console.log(data);
          ;query.mutate({order:data.order,bewrage_id:search.get("id"),customer_id:user_id,flavour:data.flavour,quantity:data.quantity,delivery:data.delivery,size:data.size,address:data.address,requests:data.request}) })}>


   
 <div className="mb-4">
              <label className="block font-semibold mb-1 text-black font-semibold  " ></label>
               <input type='text'  disabled={true} value={data?.name} {...register("order",{required:"Must be mentioned"})} className='font-semibold text-white'/>
             
            </div>
      
            {/* // */}
            <div className="mb-4 ">
              <label className="block font-semibold w-1/2 border-purple-500 text-gray-300 mb-1">Room Type</label>
              <select className='border-1 border-purple-500 rounded-full p-1' {...register("flavour")}>
              
              {isLoading?"loading...":data?.flavors?.map((x,i)=>{ return <option>{x}</option>  })
              }
              </select>
              
            </div>
            
            <div className="mb-4">
              <label className="block font-semibold mb-1">Number of Rooms</label>
              <input type="range" className="w-1/2 border border-gray-500 rounded-md p-2" placeholder="1" min="1" max="3"
              {...register("size",{onChange:(e)=>{setReducer({type:"size",payload:e.target.value});console.log(e.target.value);
              }})}
              />
              <p>{reducer.size==1?"Small":reducer.size==2?"Mid":"Large"}</p>
            </div>
            
          
            <div className="mb-4">
              <label className="block font-semibold mb-1">Quantity</label>
              <input type="number" {...register("quantity")} className="w-full border border-gray-500 rounded-md p-2" min="1" max='10' />
            </div>
            
          
            {/* /// */}
            <div className="mb-4 ">
              <label className="block font-semibold w-1/2 border-purple-500 text-gray-300 mb-1">Roo</label>
              <select  {...register("delivery",{onChange:(e)=>{setReducer({type:"delivery",payload:e.target.value})}})} ref={(e)=>{ref.current[0]=e;register("delivery").ref(e)}} className='border-1 border-purple-500 rounded-full p-1 '>
              
             <option>Pickup </option>
             <option>Standard Delivery </option>
            
              </select>
              
            </div>
            
           {ref.current?.[0]?.value=="Standard Delivery"&& <div className="mb-4">
              <label className="block font-semibold mb-1 text-black font-semibold " >Address</label>
               <input type='text' {...register("address",{required:"Must be mentioned"})} className='text-black font-semibold'/>
             
            </div>}
            
          
            <div className="mb-4 ">
              <label className="block font-semibold w-1/2 border-purple-500 text-gray-300 mb-1">Requests</label>
             <textarea className='border-2 border-black text-gray-900 font-bold' {...register("request")} ></textarea>
              
            </div>
            


            <button type='submit' disabled={query.isPending?true:false} ref={(e)=>{ ref.current[1]=e }}  className="group hover:shadow-[0_0px_7px_0px_rgba(70,10,174,1)] sm:w-64 w-40 border-1 border-purple-600 transition-color duration-300 relative bg-transparent text-purple-300 font-semibold sm:font-bold py-2 px-4 border hover:border-gray-100 cursor-pointer hover:text-white rounded-full sm:translate-x-1/4">
            Place Order
            </button>

          <p className='text-white font-black text-lg'> {query.isError&&query.error.message} </p>
          </form>
          <DevTool control={control}/>
        </div>
      </div>
    </div>
  );
}

export default Order;
