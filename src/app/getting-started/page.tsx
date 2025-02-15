"use client";
import React from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

const page = () => {
    const [actions, setActions] = React.useState('signin')
  return (
    <div className=' py-36   flex items-center h-screen flex-col'> 
        <Link href='/'>
        <h1 className='font-bold text-3xl pb-10'>Blog.</h1>
        </Link>
        <div className=' border  border-black pt-6 sm:p-9 
        shadow-[-7px_7px_0_#000000]'>
        <div className='w-full flex  justify-around'>
            <button 
            className={`${actions === 'signin' ? 'bg-black p-2 px-5 text-white rounded-sm' : 'bg-white text-black'}`}
            onClick={() => setActions('signin')}
            >SignIn</button>
            <button
            className={`${actions === 'signup' ? 'bg-black p-2 px-5 text-white rounded-sm' : 'bg-white text-black'}`}
            onClick={() => setActions('signup')}
            >SignUp</button>

        </div>
            <form action=""
            className='flex flex-col gap-8 px-14 py-10'>    
                <input type="email"
                placeholder='Enter your email' 
                className='px-4 outline-none border-b border-black'/>
                <input type="password" 
                placeholder="Enter your password"
                className='px-4 outline-none border-b border-black'/>
                <button type='submit' className=" font-medium py-1 px-3 sm:py-2 sm:px-3 border text-center border-solid border-black shadow-[-7px_7px_0_#000000]">{`${actions==='signin'?"Signin":"Signup"}`}</button>
                <button type='submit' className=" font-medium py-1 px-3 justify-around sm:py-2 sm:px-3 border text-center border-solid border-black shadow-[-7px_7px_0_#000000]">
                    {`${actions==='signin'?" Signin":"   Signup"}`}
                    <span className='text-sm'> with </span>
                <FontAwesomeIcon icon={faGoogle} size='1x' className="text-black-500" />
                </button>
            </form>
            
        </div>
    </div>
  )
}

export default page