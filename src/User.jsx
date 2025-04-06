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

    <div className="flex flex-col  mt-30 w-full hover:bg-purple-900/3 transition-all duration-300  hover:border-gray-200 items-center justify-center p-6 space-y-4 bg-transparent border-1 border-purple-600 rounded-lg shadow-lg">
      
      {
        data && (
          <div className="space-y-2 text-center  ">
            <span className='text-gray-300 border-1 hover:border-white  hover:text-white hover:scale-99 cursor-pointer transition-all duration-300 border-purple-400 inline-block rounded-full p-2' onClick={() => { nav('/select') }}>Back</span>
            <img className='rounded-full w-50 m-auto border-2 h-50 border-purple-500' src={`data:image/webp;base64,${data.user.profilePic}`} />
            <h1 className="text-2xl font-bold text-purple-500">{data.user.name.toUpperCase()}</h1>
            <p className=" text-gray-300" > <strong className='text-purple-400'>Email:</strong>  {data.user.email}</p>
            <p className="text-gray-300 text-sm"><strong className='text-purple-400'>ID:</strong> {data.user._id}</p>

            <div>
              <p className='font-bold  text-xl text-purple-500'>Bookings :</p>
              <ul className='flex flex-wrap mt-3  p-5 justify-evenly'>{
                data?.orders.length > 0 ? data.orders.map((x, i) => { return <ul className='px-2 text-white font-lg text-center mt-30'>
                  <li className=''> <strong className='text-purple-300'>Booking Id : </strong>{x.order_id}</li> 
                  <li> <strong className='text-purple-300'>Hotel Name : </strong>{x.bewrage_id}</li> 
                <li> <strong className='text-purple-300'>No of Bookings : </strong>{x.order}</li> <li> <strong className='text-purple-300'>Check In Date :  </strong>{x.flavour}</li><li><strong className='text-purple-300'>Check Out Date :</strong>  {x.quantity}</li><li> <strong className='text-purple-300'>Suite : </strong>{x.size}</li>  <li><strong className='text-purple-300'>Requests :</strong> {x.requests?.length > 0 ? x.requests : 'none'}</li> 
                <button onClick={()=>{console.log(i);query.mutate({customer_id:x.customer_id,index:i,order_id:x.order_id})
                }} className='border-1 border-purple-500 hover:border-gray-300 hover:scale-99 hover:text-purple-400 transition-all duration-300 text-sm bg-transparent p-2 rounded-xl mt-3 cursor-pointer'>Cancel</button> </ul> }) : <p className='text-gray-300'>No Bookings</p>}</ul>

            </div>
          </div>
        )
      }
    </div>

  );


}

export default User