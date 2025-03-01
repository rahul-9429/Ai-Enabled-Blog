"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";

const SideBar = () => {
  const handleSignout = async () =>{
    try {
      if (!confirm("Are you sure you want to signout?")) {
        return;
      }
      const res =  await axios.get('/auth/logout')

      if(res.data.message){
        window.location.href='/'
      }
    } catch (error: unknown) {
      console.log((error as Error).message);
      
    }
  }
  return (
    <div className="bg-slate-100 flex flex-col">
        <Link href='/'>
      <div 
      className="px-2 sm:pl-14 py-3 border border-black">
        <span className="font-bold text-3xl">Blog.</span>
      </div>
      </Link>
      <div className="w-28 sm:w-80 h-screen py-12 border border-black flex flex-col gap-6">
        <Link href='/admin/addProduct' className="flex items-center border border-black gap-3 font-medium py-2 px-3 bg-white shadow-[-5px_5px_0px_#000000]">
          <span className="border border-black rounded-full w-1/6 flex font-bold justify-center items-center text-3xl">
            <span className="-mt-1">+</span>
          </span>
          Add Blog
        </Link>

        <Link href='/admin/blogList' className="flex items-center border border-black gap-3 font-medium py-2 px-3 bg-white shadow-[-5px_5px_0px_#000000]">
          <span className="border border-black rounded-full w-1/6 flex font-bold justify-center items-center text-3xl">
            <span className="-mt-1">+</span>
          </span>
          Blog list
        </Link>
        <Link href='/admin/subscriptions' className="flex items-center border border-black gap-3 font-medium py-2 px-3 bg-white shadow-[-5px_5px_0px_#000000]">
          <span className="border border-black rounded-full w-1/6 flex font-bold justify-center items-center text-3xl">
            <span className="-mt-1">+</span>
          </span>
          Subscriptions
        </Link>
        <button 
        onClick={handleSignout}
        className="flex items-center border border-black gap-3 font-medium py-2 px-3 bg-white shadow-[-5px_5px_0px_#000000] text-red-500">
          <span className="border border-black rounded-full w-1/6 flex font-bold justify-center items-center text-xl">
            <span className="-mt-1">X</span>
          </span>
          SignOut
        </button>
       
      </div>
    </div>
  );
};

export default SideBar;
