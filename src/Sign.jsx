import React, { useEffect, useRef, useState } from 'react';
import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';
import usePost from './usePost';
import useSignStore from './useSignStore';
import { useNavigate } from 'react-router';

function Sign() {
  const [reg, setReg] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'User',
    },
  });

  const ref = useRef(null);
  const status_ref = useRef([]);
  const { query,abort_ref } = usePost(reg ? 'register' : 'sign');
  const { data, mutate, isError, error, isPending, isSuccess, isPaused } = query;
  const nav = useNavigate();

  useEffect(() => {
    console.log(data, error?.message,error);
  }, [isError]);
  useEffect(()=>{if(data?.dets?.role=="Admin"){nav(`/admin/${data.dets.id}`)}},[data,isSuccess]);

  useEffect(() => {
    if (isPending) {console.log("pending");
    
      status_ref.current[0].innerText = reg ? 'Signing Up' : 'Logging In';
      // setTimeout(() => {
      //  abort_ref.current.abort("took long,from useEffect");
        
      // }, 10000);
    } else if (isSuccess) {
      status_ref.current[0].innerText = 'Success';
      setTimeout(() => {
        status_ref.current[0].innerText = 'Submit';
      }, 1000);
    } else if (error) {
      status_ref.current[0].innerText = 'Failed';
      setTimeout(() => {
        status_ref.current[0].innerText = 'Submit';
      }, 1000);
    }
  }, [isPending, isSuccess, error]);

  return (
    <div className="flex justify-center items-center h-250 text-[#D3D3D3] p-6">
      <section className="shadow-2xl rounded-2xl p-8 w-full bg-gray-900/50 max-w-md border border-[#A9A9A9] text-[#D3D3D3]">
        <h1 className="text-xl font-bold w-50 m-auto mb-10 text-center">
          {reg ? 'User SignUp' : 'User Login'}
        </h1>

        <span
          className="text-gray-100 absolute top-75 m-auto cursor-pointer border border-yellow-700 inline-block rounded-full p-3 hover:text-white hover:border-white transition-all"
          onClick={() => {
            nav('/select');
          }}
        >
          Back
        </span>

        <div className="flex items-center justify-center mb-6">
          <button
            onClick={() => setReg(false)}
            className={`w-1/3 pb-4 font-medium text-center cursor-pointer transition border-b-2 ${
              !reg ? 'text-white border-white' : 'text-[#A9A9A9] border-[#A9A9A9]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setReg(true)}
            className={`w-1/3 pb-4 font-medium text-center cursor-pointer transition border-b-2 ${
              reg ? 'text-white border-white' : 'text-[#A9A9A9] border-[#A9A9A9]'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form
          className="space-y-6"
          onSubmit={handleSubmit((data) => {
            console.log('Submitted data:', data);
            mutate(data);
          })}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              className="w-full py-3 pl-4 pr-4 bg-transparent border border-[#A9A9A9] rounded-lg shadow-sm placeholder-[#A9A9A9]"
              {...register('username', {
                required: 'Cant Be Empty',
                validate: (value) =>
                  value.length < 6 ? 'Must be at least 6 characters' : true,
              })}
            />
            <p className="text-white font-black mt-2">{errors?.username?.message}</p>
          </div>

          {reg && (
            <div>
              <label
                htmlFor="dropzone-file"
                className="flex items-center justify-center py-3 text-center bg-transparent border-2 border-dashed border-[#A9A9A9] rounded-lg cursor-pointer hover:border-[#D3D3D3]"
              >
                <h2 className="ml-3 text-[#A9A9A9]">Profile Photo</h2>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  {...register('profilePic', { required: 'Cant be empty' })}
                />
              </label>
              <p className="text-white font-black mt-2">{errors?.profilePic?.message}</p>
            </div>
          )}

          <div className="relative">
            <input
              type="email"
              placeholder="Email address"
              className="w-full py-3 pl-4 pr-4 bg-transparent border border-[#A9A9A9] rounded-lg shadow-sm placeholder-[#A9A9A9]"
              {...register('email', { required: 'Cant be Empty' })}
            />
            <p className="text-white font-black mt-2">{errors?.email?.message}</p>
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full py-3 pl-4 pr-4 bg-transparent border border-[#A9A9A9] rounded-lg shadow-sm placeholder-[#A9A9A9]"
             {...register("password",{required:"Cant be Empty",validate: (value) =>
                  value.length < 8 ? 'Must be at least 8 characters long' : true,})}
              ref={(e) => {
                ref.current = e;register("password").ref(e)
              }}
            />
            <p className="text-white font-black mt-2">{errors?.password?.message}</p>
          </div>

          {reg && (
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full py-3 pl-4 pr-4 bg-transparent border border-[#A9A9A9] rounded-lg shadow-sm placeholder-[#A9A9A9]"
                {...register('confirmPassword', {
                  required: 'Cant be empty',
                  validate: (value) =>
                    value !== ref.current?.value ? 'Must be same as password' : true,
                })}
              />
              <p className="text-white font-black mt-2">{errors?.confirmPassword?.message}</p>
            </div>
          )}

          <fieldset className="mt-4">
            <legend className="text-white font-semibold mb-2">Select Role</legend>
            <div className="flex gap-4">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="Admin"
                  {...register('role', { required: "Can't be empty" })}
                  className="peer hidden"
                />
                <div className="peer-checked:bg-white peer-checked:text-black text-[#D3D3D3] bg-transparent border border-[#A9A9A9] rounded-lg px-4 py-2 transition-all hover:bg-[#A9A9A9]">
                  Admin
                </div>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="User"
                  {...register('role', { required: "Can't be empty" })}
                  className="peer hidden"
                  defaultChecked
                />
                <div className="peer-checked:bg-white peer-checked:text-black text-[#D3D3D3] bg-transparent border border-[#A9A9A9] rounded-lg px-4 py-2 transition-all hover:bg-[#A9A9A9]">
                  User
                </div>
              </label>
            </div>
            {errors?.role && (
              <p className="text-red-500 font-semibold mt-3">{errors.role.message}</p>
            )}
          </fieldset>

          <div className="mt-1 flex justify-evenly">
            <button
              type="submit"
              ref={(e) => {
                status_ref.current[0] = e;
              }}
              disabled={isPending || isPaused}
              className="group hover:shadow-[0_0px_7px_0px_rgba(70,10,174,1)] sm:w-64 w-40 border border-[#A9A9A9] bg-transparent text-[#A9A9A9] font-bold py-2 px-4 rounded-full hover:border-gray-100 hover:text-white"
            >
              Submit
            </button>
          </div>
          <p className="text-white mt-2">{isError && error?.message}</p>
        </form>

        <DevTool control={control} />
        <p className="text-sm text-gray-400 mt-4">Current Role: {watch('role')}</p>
      </section>
    </div>
  );
}

export default Sign;
