import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useRef } from 'react'
import useSignStore from './useSignStore';

function usePost(type,abort,param) {


  let abort_ref=useRef(new AbortController());



  let client=useQueryClient();
let sign=useSignStore(state=>state.fnx.set_data);

let query =useMutation({mutationFn:async(data)=>{ 
 const abortController = new AbortController();
 
    const signal = abortController.signal;abort_ref.current=abortController;
  // let signal=abort_ref.current.signal
setTimeout(() => {
   abortController.abort("Taking too long ss");

}, 10000);
if(type=='register'){ 
    
// console.log(data);

// console.log(data);

    let form=new FormData();
    form.append("name",data.username);
    form.append("email",data.email);
    form.append("password",data.password);
    form.append("file",data.profilePic[0]);
    form.append("role",data.role);
   
    
    // console.log(form);
    
    ;let get=await fetch("http://localhost:4800/register",{method:"POST",body:form,signal});  if(!get.ok){let conv=await get.json();throw new Error(conv.err||"Error in register")};
return await get.json();  }


else if (type=='sign'){ let get=await fetch("http://localhost:4800/sign",{method:"POST",body:JSON.stringify(data),headers:{"Content-type":"Application/json"},credentials:"include" ,signal});if(!get.ok){let conv=await get.json();
;throw new Error(conv.msg||"error in sign")};
return await get.json();  }

else if(type=="refresh"){  let get=await fetch("http://localhost:4800/refresh",{credentials:"include",});if(!get.ok){let conv=await get.json();throw new Error(conv.msg||"error in refresh")};return await get.json();    }

else if(type=="order"){ let get=await fetch("http://localhost:4800/publish",{method:"POST",body:JSON.stringify(data),headers:{"content-type":"application/json"},signal});if(!get.ok){let conv=await get.json();throw new Error(conv.msg||"error in order")};return await get.json(); }
else if (type=="cancel"){console.log(data);let get=await fetch("http://localhost:4800/cancel",{method:"DELETE",headers:{"Content-type":"Application/json"},body:JSON.stringify(data),signal});if(!get.ok){let conv=await get.json();throw new Error(conv||"error in cancelation")
}
return await get.json();
}
else if(type=="comment"){console.log("comment data",data);
let get=await fetch(`http://localhost:4800/comment/${param}`,{method:"POST",headers:{"Content-Type":"Application/json"},body:JSON.stringify(data)  });
if(!get.ok){let conv=await get.json();throw new Error(conv||"error in comment post")};
return await get.json();
}
else if(type=="acknowledge"){console.log(data,"dd");
  let get=await fetch("http://localhost:4800/acknowledge",{method:"PUT",headers:{"Content-Type":"Application/json"},body:JSON.stringify(data)});
  let conv=await get.json();
  if(!conv){throw new Error(conv.msg||conv||"error in acknowledge")};
  return conv;
}

 },retry:false,onSuccess:(x)=>{switch(type){
   case "sign" : sign(x.dets);break;
   case "order":
   case "cancel" :client.invalidateQueries("user");break;
   case "comment":client.invalidateQueries(["comment"]);break;
   case "acknowledge":client.invalidateQueries(["orders_data"]);
   }
 },onError:(x)=>{
 }  })


  return {query,abort_ref}
}

export default usePost