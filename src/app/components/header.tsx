"use client";
import React from 'react'
import Image from 'next/image'
import Arrow from '../../../assets/Arrow.png'
import Link from 'next/link'
import { useState } from 'react'

const header = () => {
  const [mail, setMail] = useState<string>("");

  const handleMail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value); 
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    const formData = new FormData();
    formData.append("email", mail); 

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Subscription successful:", result);

      setMail("");
      alert("You have successfully subscribed!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }}
  return (
    <>
        <div className='py-5 px-5 md:px-12 lg:px-28 w-full'>
          <div className='flex justify-between items-center '>
            <span className='font-bold text-3xl'>Blog.</span>
            <Link href={'/getting-started'}>
            <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-2 sm:px-3 border border-solid border-black shadow-[-7px_7px_0_#000000]">Get Started
              <Image src={Arrow} alt='arrow' />
            </button>
            </Link>
          </div>
          <div className='text-center my-8'>
            <h1 className='text-2xl sm:text-4xl font-medium'>Latest Blogs</h1>
           
            <p className='pt-10'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur nihil magni adipisci. Optio dolorum minima sint eaque, dolores mollitia neque vitae quasi qui asperiores suscipit ipsa, voluptate provident dolor dolorem.</p>
           
            <form className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border shadow-[-7px_7px_0_#000000]  border-black' action=""
            onSubmit={handleSubmit}
            >
                <input type="email" placeholder='Enter your email' className='pl-4 outline-none '
                onChange={handleMail}
                />
                <button
                type='submit' 
                className='border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white '>Subscribe</button>
            </form>
          </div>
        </div>
       
    </>

    
  )
}

export default header