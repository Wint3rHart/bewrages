import React from 'react'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'


const useSignStore=create(subscribeWithSelector((set,get)=>{
return {

    data:{name:null,email:null,id:null,role:"User",status:false},
    fnx:{
        set_data:(x)=>{ 
        ;set((state)=>{return {...state,data:{...state.data,name:x.name,email:x.email,id:x.id,role:x.role,status:true}  }  })  }
    }


}


}))

export default useSignStore