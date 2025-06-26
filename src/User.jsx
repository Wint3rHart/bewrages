import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router';
import useData from './useData';
import usePost from './usePost'
function User() {

  let { id } = useParams();
  let decode = decodeURIComponent(id);
  let { data, isLoading, error } = useData("user", decode);
  let {query,abort}=usePost("cancel")
let nav=useNavigate();


  useEffect(() => {
    console.log(data, error && error);
  }, [data])

  if (isLoading && !data) {
    return <p className='mt-50 ml-50 font-black text-xl text-gray-100 animate-pulse'>Loading...</p>
  }

  return (

    <div className="flex flex-col  mt-30 w-full  transition-all duration-300  hover:border-yellow-900 items-center justify-center p-6 space-y-4 bg-yellow-900/60 border-3 border-white rounded-lg shadow-lg">
      
      {
        data && (
          <div className="space-y-2 text-center  ">
            <span className='text-gray-300 border-2 hover:border-yellow-900  hover:text-white hover:scale-99 cursor-pointer transition-all duration-300 border-white inline-block rounded-full p-2' onClick={() => { nav('/select') }}>Back</span>
            <img className='rounded-full w-50 m-auto border-2 h-50 border-white' src={`data:image/webp;base64,${data.user.profilePic}`} />
            <h1 className="text-2xl font-bold text-white">{data.user.name.toUpperCase()}</h1>
            <p className=" text-white font-black " > <strong className='text-yellow-700 font-black'>Email:</strong>  {data.user.email}</p>
            <p className="text-white  font-black text-sm"><strong className='text-yellow-700 font-black'>ID:</strong> {data.user._id}</p>

            <div>
              <p className='font-bold  text-xl text-yellow-800'>Orders :</p>
              <ul className='flex flex-wrap mt-3  p-5 justify-evenly'>{
                data?.orders.length > 0 ? data.orders.map((x, i) => { return <ul className='px-2 text-white font-lg text-center mt-30'>
                  <li className=''> <strong className='text-yellow-700'>Order Id : </strong>{x.order_id}</li> 
                  <li> <strong className='text-yellow-700'>Bewrage Id : </strong>{x.bewrage_id}</li> 
                <li> <strong className='text-yellow-700'>Order : </strong>{x.order}</li> <li> <strong className='text-yellow-700'>Flavour :  </strong>{x.flavour}</li><li><strong className='text-yellow-700'>Quantity :</strong>  {x.quantity}</li><li> <strong className='text-yellow-700'>Size : </strong>{x.size}</li>  <li><strong className='text-yellow-700'>Requests :</strong> {x.requests?.length > 0 ? x.requests : 'none'}</li>
                 <li className=''> <strong className='text-yellow-700'>Time Of Order : </strong>{x.placementDate}</li>   
                <li className=''> <strong className='text-yellow-700'>Status : </strong>{x.status}</li> 
                 <li className=''> <strong className='text-yellow-700'>Time Of Order : </strong>{x.placementDate}</li>  
                   <li className=''> <strong className='text-yellow-700'>preperation Time : </strong>{x.preperationDate?x.preperationDate:"In Progress"}</li>
                    <li className=''> <strong className='text-yellow-700'>Price : </strong>{x.price}</li>  
                <button onClick={(e)=>{console.log(x);query.mutate({customer_id:x.customer_id,index:i,order_id:x.order_id})


                
                
                }} className='border-2 border-white hover:border-gray-100 hover:scale-99 hover:text-yellow-800 transition-all duration-300 text-sm bg-transparent p-2 rounded-xl mt-3 cursor-pointer'>{x.status=="Pending"?"Cancel":"Collect"}</button> </ul> }) : <p className='text-gray-100'>No Bookings</p>}</ul>

            </div>
          </div>
        )
      }
    </div>

  );


}

export default User