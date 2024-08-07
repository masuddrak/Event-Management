"use client";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react';

const SignupForm = () => {
  const [error,setError]=useState("")
  const router=useRouter()
  const handelForm=async(e)=>{
    e.preventDefault()
    const name =e.target.name.value
    const email =e.target.email.value
    const password =e.target.password.value
    const userInfo={name,email,password}
   console.log(userInfo)
    try {
      
      // create user
      const res=await axios.post("/register/api",userInfo)
  
      if(res.status===200){
        e.target.reset()
        router.push("/")
      }
    } catch (error) {
      if(error.response.status===500){
        setError("already exis user")
      }
      console.log(error.response)
    }
  }
    return (
        <div className="p-20 border-[1px] rounded md:w-2/4 mx-auto shadow-lg ">
      <h3 className="text-xl font-semibold text-center">Register</h3>
      <form className="w-full mt-12 space-y-4" onSubmit={handelForm}>
        <div className="">
          <label htmlFor="" className="">
            Name
          </label>
          <br />
          <input
            type="text"
            name="name"
            required
            placeholder="Enter Your NName"
            className="border-[1px] p-2 rounded-sm w-full  outline-0"
          />
        </div>
        <div className="">
          <label htmlFor="" className="">
            Email
          </label>
          <br />
          <input
            type="email"
            name="email"
            required
            placeholder="Enter Your Email"
            className="border-[1px] p-2 rounded-sm w-full  outline-0"
          />
        </div>
        <div className="">
          <label htmlFor="" className="">
            Password
          </label>
          <br />
          <input
            type="password"
            name="password"
            required
            placeholder="Enter Your Password"
            className="border-[1px] p-2 rounded-sm w-full  outline-0"
          />
        </div>

        <div>
          <input
            type="submit"
            value="Sign Up"
            className="border-[1px] p-2 cursor-pointer rounded-md w-full outline-0 bg-primary text-white font-semibold "
          />
        </div>
      </form>
      {
        error && <p className='text-primary my-3'>{error}</p>
      }
      <div className="flex mt-4">
        <p>Are you ne</p>
        <Link href="/login" className="underline">Login Now</Link>
      </div>
    </div>
    );
};

export default SignupForm;