"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState("");
 
  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log(res);
      

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-20 border-[1px] rounded md:w-2/4 mx-auto shadow-lg ">
      <h3 className="text-xl font-semibold text-center">Login</h3>
      <form onSubmit={handleLogin} className="w-full mt-12 space-y-4">
        <div className="">
          <label htmlFor="" className="">
            Email
          </label>
          <br />
          <input
            type="email"
            name="email"
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
            placeholder="Enter Your Password"
            className="border-[1px] p-2 rounded-sm w-full  outline-0"
          />
        </div>

        <div>
          <input
            type="submit"
            value="Login"
            className="border-[1px] p-2 cursor-pointer rounded-md w-full outline-0 bg-primary text-white font-semibold "
          />
        </div>
      </form>
      <div className="flex mt-4">
        <p>Are you new </p>
        <Link href="/register" className="underline">
          Signup Now
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
