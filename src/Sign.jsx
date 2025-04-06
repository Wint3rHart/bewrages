
import React, { useEffect, useRef, useState } from 'react';
import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';
import usePost from './usePost';
import useSignStore from './useSignStore';
import { data, useNavigate, useSearchParams } from 'react-router';


function Sign() {


  let [reg, setReg] = useState(true);
let {register,handleSubmit,formState,control}=useForm({defaultValues:{username:'',email:"",password:"",confirmPassword:"",role:"User"}});
let {errors}=formState
let ref=useRef(null);
let status_ref=useRef([]);
let {query,abort}=usePost(reg?"register":"sign")
let {data,mutate,isError,error,isPending,isSuccess,isPaused}=query;
let nav=useNavigate();
console.log("sign rendered");


useEffect(()=>{console.log(data,error?.message,typeof(error));
},[isError])

useEffect(()=>{ 

if(isPending){reg? status_ref.current[0].innerText="Signing Up":status_ref.current[0].innerText="Logging In"}
else if(isSuccess){ status_ref.current[0].innerText="Success";setTimeout(() => {
  status_ref.current[0].innerText="Submit"
}, 1000)}
else if(error){status_ref.current[0].innerText="Failed";setTimeout(() => {
  status_ref.current[0].innerText="Submit"
}, 1000);}
  },[isPending,isSuccess,error])

// useEffect(()=>{ console.log(status_ref.current[0].innerText);
// },);

// useEffect(()=>{useSignStore.subscribe((state)=>{return state.data},(x)=>{console.log(x);
// })},[])
  
  return (
    <div className='flex justify-center items-center h-250  text-[#D3D3D3] p-6 ' >
      
      <section className="shadow-2xl rounded-2xl p-8 w-full bg-gray-900/50 max-w-md border border-[#A9A9A9] text-[#D3D3D3]">
      
      <h1 {...register("role")} className='text-xl font-bold w-50 m-auto mb-10 text-center'>{"User SignUp"}</h1>
      <span className='text-gray-400 hover:pointer absolute top-5 hover:border-white hover:text-white hover:scale-99 cursor-pointer transition-all duration-300 border-purple-700 inline-block mb-5 rounded-full p-3 mt-45 ml-0 border-1 rounded-full' onClick={()=>{nav("/select")}}>Back</span>
        <div className="flex items-center justify-center mb-6">
          <button
            onClick={() => setReg(false)}
            className={`w-1/3 pb-4 font-medium text-center text-${!reg ? 'white' : '[#A9A9A9]'} cursor-pointer scale-98 hover:scale-99 hover:border-white capitalize border-b-2 border-${!reg ? 'white' : '[#A9A9A9]'} transition`}
          >
            Sign In
          </button>
          <button
            onClick={() => setReg(true)}
            className={`w-1/3 pb-4 font-medium text-center cursor-pointer scale-99 hover:scale-98 ${reg ? 'text-white' : 'text-[#A9A9A9]'} capitalize border-b-2 hover:border-white border-${reg ? 'white' : '[#A9A9A9]'} transition`}
          >
            Sign Up
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit((data)=>{mutate(data);console.log(data);
        
        
        
        })} >
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              className="w-full py-3 pl-4 pr-4 text-[#D3D3D3] bg-transparent border border-[#A9A9A9] rounded-lg shadow-sm focus:ring-2 focus:ring-[#A9A9A9] focus:outline-none placeholder-[#A9A9A9]"
              {...register("username",{required:{message:"Cant Be Empty"},validate:(value)=>{return value.length<6?"Must be atleast 6 characters":true }  })}
            />
            <p className='text-white  font-black mt-4'>{errors?.username&&errors.username.message}</p>
          </div>

          {reg && (
            <div>
              <label
                htmlFor="dropzone-file"
                className="flex items-center justify-center py-3 text-center bg-transparent border-2 border-dashed border-[#A9A9A9] rounded-lg cursor-pointer hover:border-[#D3D3D3]"
              >
                <h2 className="ml-3 text-[#A9A9A9]">Profile Photo</h2>
                <input id="dropzone-file" type="file" className="hidden" {...register("profilePic",{required:"Cant be empty"})} />
              </label>
              <p className='text-white  font-black mt-4'>{errors?.file&&errors.username.file}</p>
            </div>
          )}

          <div className="relative">
            <input
              type="email"
              placeholder="Email address"
              className="w-full py-3 pl-4 pr-4 text-[#D3D3D3] bg-transparent border border-[#A9A9A9] rounded-lg shadow-sm focus:ring-2 focus:ring-[#A9A9A9] focus:outline-none placeholder-[#A9A9A9]"

              {...register("email",{required:"Cant be Empty"})}
            />
            <p className='text-white  font-black mt-4'>{errors?.email&&errors.email.message}</p>
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full py-3 pl-4 pr-4 text-[#D3D3D3] bg-transparent border border-[#A9A9A9] rounded-lg shadow-sm focus:ring-2 focus:ring-[#A9A9A9] focus:outline-none placeholder-[#A9A9A9]"
               {...register("password",{required:"Cant be Empty",validate:(value)=>{return value.length<8?"Must be atleast 8  characters long":true  }})}
               ref={(e)=>{ref.current=e;register('password').ref(e)}}

            /><p className='text-white  font-black mt-4'>{errors?.password&&errors.password.message}</p>
          </div>

          {reg && (
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full py-3 pl-4 pr-4 text-[#D3D3D3] bg-transparent border border-[#A9A9A9] rounded-lg shadow-sm focus:ring-2 focus:ring-[#A9A9A9] focus:outline-none placeholder-[#A9A9A9]"

              {...register('confirmPassword',{required:"Cant be empty",validate:(value)=>{ return value!=ref.current.value?"Must be same as password":true  } })}

              />
              <p className='text-white  font-black mt-4'>{errors?.confirmPassword&&errors.confirmPassword.message}</p>
            </div>
          )}

        
          {/* <div className="relative">
         <label><input
              type="radio"
              placeholder="role"
              value="Admin"
              
              className=" text-white py-3 pl-4 pr-4 text-[#D3D3D3] bg-transparent  rounded-lg shadow-sm focus:ring-2 focus:ring-[#A9A9A9] focus:outline-none placeholder-[#A9A9A9]"
               {...register("role",{required:"Cant be Empty"})}
       
            />Admin</label>   <p className='text-white  font-black mt-4'>{errors?.role&&errors.role.message}</p>
          </div>
          <div className="relative">
        <label><input
              type="radio"
              placeholder="role"
             
              value="User"
              className=" text-white py-3 pl-4 pr-4 text-[#D3D3D3] bg-transparent  rounded-lg shadow-sm focus:ring-2 focus:ring-[#A9A9A9] focus:outline-none placeholder-[#A9A9A9]"
               {...register("role",{required:"Cant be Empty"})}
       
            />User</label>    <p className='text-white  font-black mt-4'>{errors?.role&&errors.role.message}</p>
          </div> */}
          <div className='mt-1 flex justify-evenly'>
            <button type='submit' ref={(e)=>{status_ref.current[0]=e}} disabled={isPending||isPaused?true:false}   className="group hover:shadow-[0_0px_7px_0px_rgba(70,10,174,1)] sm:w-64 w-40 border-1 border-[#A9A9A9] transition-color duration-300 relative bg-transparent text-[#A9A9A9] font-bold py-2 px-4 border hover:border-gray-100 hover:text-white rounded-full">
              Submit
            </button>
          </div>
          <p className='text-white'>{isError&&error.message}</p>
        </form>
       <DevTool control={control}/>
      </section>
    </div>
  );
}

export default Sign;
