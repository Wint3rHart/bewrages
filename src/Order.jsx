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
else if(action.type=="quantity"){return {...state,quantity:action.payload}}

}




function Order() {

  let nav=useNavigate();
let {query,abort_ref}=usePost("order")

  console.log('orders rendered');
let [search,setSearch]=useSearchParams();
let [reducer,setReducer]=useReducer(red_fnx,{delivery:"Pickup",size:1,quantity:1});

let {data,isLoading,isError,error}=useData("orders",search.get("id"));
let user_id=useSignStore(state=>state.data.id);
let [placing,setPlace]=useState(false);
let {register,handleSubmit,formState,control}=useForm({defaultValues:{flavour:data?.flavors?.[0],size:1,delivery:"Pickup",quantity:1,request:""}});
let ref=useRef([]);
let priceRef=useRef([]);
let {isSubmitting,errors}=formState;

// useEffect(()=>{console.log(reducer
// );
// },[reducer]);

// useEffect(()=>{console.log(data?.flavors?.[0]);
// },[data])

useEffect(()=>{console.log(query,query.isError);
},)
useEffect(()=>{
  // console.log(data&&data);
  console.log(reducer);

},[reducer])
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
return <p className='text-white font-black text-4xl animate-pulse  flex justify-center h-100 items-center  ml-auto  '>Loading.....</p>  


  return (
    <div className="flex mt-30  bg-transparent relative text-gray-400 items-center  justify-center min-h-screen w-full">
      <span className='text-gray-100 font-black border-2 hover:border-yellow-700 absolute  hover:pointer absolute top-5 hover:border-white hover:text-white hover:scale-99 cursor-pointer transition-all duration-300 border-white inline-block z-1 ml-90 mt-10 rounded-full p-3' onClick={()=>{nav("/select")}}>Back</span>
      <div className={`w-full flex relative transition-all duration-1000 border-white justify-center `}>
        <div className="bg-yellow-900/25 border-3 mt-5  border-white rounded-full p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-white text-center">Order</h2>
          <span>{data.rating}</span>
          {/* <button onClick={()=>{abort_ref.current.abort();abort_ref.current=new AbortController()}}> ABORT</button> */}
          
          <form  onSubmit={handleSubmit((data)=>{ console.log(data);
          ;query.mutate({order:data.order,bewrage_id:search.get("id"),customer_id:user_id,flavour:data.flavour,quantity:data.quantity,delivery:data.delivery,size:data.size,address:data.address,requests:data.request,price:priceRef.current[1].value}) })}>


   
 <div className="mb-4 ">
              <label className="block font-semibold mb-1 text-white font-semibold  " ></label>
               <input type='text'  disabled={true} value={data?.name} {...register("order",{required:"Must be mentioned"})} className='font-semibold text-white'/>
             
            </div>
      
            {/* // */}
            <div className="mb-4 ">
              <label className="block font-semibold w-1/2border-white text-white mb-1">Flavor</label>
              <select className='border-1 border-white text-white rounded-full p-1' {...register("flavour")}>
              
              {isLoading?"loading...":data?.flavors?.map((x,i)=>{ return <option>{x}</option>  })
              }
              </select>
              
            </div>
            
            <div className="mb-4">
              <label className="block font-semibold mb-1 text-white color-white">Size</label>
              <input type="range" className="w-1/2 text-white border color-white border-white rounded-md p-2" placeholder="1" min="1" max="3"
              {...register("size",{onChange:(e)=>{setReducer({type:"size",payload:e.target.value});console.log(e.target.value);
              }})}
              />
              <p className='text-white font-semibold'>{reducer.size==1?"Small":reducer.size==2?"Mid":"Large"}</p>
            </div>
            
          
            <div className="mb-4">
              <label className="block font-semibold mb-1 text-white">Quantity</label>
              <input type="number" {...register("quantity")} onChange={(e)=>{setReducer({type:"quantity",payload:e.target.value})}} ref={(e)=>{priceRef.current[0]=e;register("quantity").ref(e)}} className="w-1/4 border border-white text-white rounded-md p-2" min="1" max='10' />
            </div>
            
          
            {/* /// */}
            <div className="mb-4 ">
              <label className="block font-semibold w-1/2 border-white text-white mb-1">Delivery</label>
              <select  {...register("delivery",{onChange:(e)=>{setReducer({type:"delivery",payload:e.target.value})}})} ref={(e)=>{ref.current[0]=e;register("delivery").ref(e)}} className='border-1 border-white text-white rounded-full p-1 '>
              
             <option>Pickup </option>
             {/* <option>Standard Delivery </option> */}
            
              </select>
              
            </div>
            
           {/* {ref.current?.[0]?.value=="Standard Delivery"&& <div className="mb-4">
              <label className="block font-semibold mb-1 text-white font-semibold  " >Address</label>
               <input type='text' {...register("address",{required:"Must be mentioned"})} className='text-black font-semibold'/>
             
            </div>} */}
            
          
            <div className="mb-4 ">
              <label className="block font-semibold w-1/2 border-white text-white mb-1">Requests</label>
             <textarea className='border-2 border-white text-white font-bold' {...register("request")} ></textarea>
              
            </div>
            


            <button type='submit' disabled={query.isPending?true:false} ref={(e)=>{ ref.current[1]=e }}  className="group hover:scale-98 sm:w-64 w-40 border-1 border-white transition-color duration-600 relative bg-transparent text-white font-semibold sm:font-bold py-2 px-4 border hover:border-gray-100 cursor-pointer hover:text-yellow-700 rounded-full sm:translate-x-1/4">
            Place Order
            </button>
            <div><span className='text-yellow-700 font-black'>Price : </span><input ref={(e)=>{priceRef.current[1]=e}} disabled className='text-yellow-700 font-black'  value={data?.price*reducer.quantity*(reducer.size==1?1:reducer.size==2?12:reducer.size==3&&20)+(reducer.delivery=="Standard Delivery"&&80)}/></div>

          <p  className='text-white font-black text-lg'> {query.isError&&query.error.message} </p>
          </form>
          <DevTool control={control}/>
        </div>
      </div>
    </div>
  );
}

export default Order;
