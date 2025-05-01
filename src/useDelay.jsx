import React, { useEffect, useState } from 'react'

function useDelay(x) {


let [state,setState]=useState(x);


useEffect(()=>{


let time=setTimeout(() => {
    setState(val=>val=x)
}, 2000);

return ()=> {clearTimeout(time)}


},[x]);


  return state;
    
  
}

export default useDelay