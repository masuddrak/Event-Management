"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navber = () => {
  const userInfo=useSession()
  console.log(userInfo?.data?.user.email)
  return (
    <nav className="shadow py-2">
      <div className="flex justify-between items-center container mx-auto">
        <Link className="text-2xl font-bold cursor-pointer" href={"/"}>Logo</Link>
        <div>
          <ul className="flex items-center gap-2">
            <Link href="/Service">Service</Link>
            <Link href="/About">About</Link>
            <Link href="/contact">contact</Link>
           {userInfo?.data?.user.email? <button className="bg-black text-white px-3 py-1 rounded" onClick={()=>signOut()}>Logut</button>:<Link href="/login" className="bg-black text-white px-3 py-1 rounded">Login</Link>}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navber;
