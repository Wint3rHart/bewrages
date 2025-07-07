

import React from 'react';
import { create } from 'zustand';

const UseGeneralStore=create((set,get)=>{
    
    return  {data:{search:"null"},fnx:{setSearch:(value)=>{set((state)=>{return  {...state,data:{...state.data,search:value}} })}}}


})
export default UseGeneralStore;
