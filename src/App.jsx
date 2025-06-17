import { useEffect, useState } from "react";
import useData from "./useData";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import usePost from "./usePost";
import useSignStore from "./useSignStore";

function App() {
  console.log("select.app rendered");
  
  let [rot, setRot] = useState(0);
 let {data,isLoading,isError,error}=useData('select');


useEffect(()=>{useSignStore.subscribe((state)=>{return state.data},(x)=>{console.log(x);
})},[])

let nav=useNavigate();

useEffect(()=>{console.log(rot);
},[rot])
useEffect(()=>{data&&console.log(data,data.length);
},[isLoading,data])
 

useEffect(()=>{console.log(isError&&error.message);},[data,error])

  return (


<>







    <div className="h-screen mt-20 flex flex-col justify-center items-center">
{/* <Navbar/> */}
<div>


<h1 className="text-gray-200 font-black text-4xl mb-10">What would You like</h1>
<ul className="flex flex-col items-center text-white font-black text-xl  ">
  <li onClick={()=>{nav(`/cards?category=All`)}} className="bg-amber-900/85 mt-5 border-2 px-4 py-2 w-50 text-center rounded-full border-gray-400 ">All</li>
  {isLoading?<p>Loading...</p>:data?.map((x,i)=>{return <li onClick={()=>{nav(`/cards?category=${x._id}`)}} className="bg-amber-900/85 mt-5 border-2 px-4 py-2 w-50 text-center rounded-full border-gray-400 ">{x._id}</li>})}</ul>

<div> <p className="text-white sm:mt-40 sm:ml-15 font-black text-4xl">{isError&&error.message}</p></div>
</div>


    </div></>
  );
}

export default App;
