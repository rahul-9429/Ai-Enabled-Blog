import React from 'react'
import SideBar from '../components/adminComponent/SideBar'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>){
    return (
       <>
        <div className='flex'>
            <ToastContainer theme='dark'/>
            <SideBar/>
            <div className='flex flex-col w-full '>
            {/* <div className='flex items-center justify-between w-full py-2 max-h-[60px] px-12 '>
                <span className="font-semibold text-3xl">Admin Pannel</span>
                <div>Photo</div>
                </div> */}
 {children}

            </div>
        </div>
       </>
    )
}
