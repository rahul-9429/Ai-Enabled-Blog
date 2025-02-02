import React from 'react'
import Link from 'next/link'
export default function Page({ params }: { params: { productId: string } }) {
  return  <div className='py-5 px-5 md:px-12 lg:px-28 w-full'>
     <div className='flex justify-between items-center '>
            <span className='font-bold text-3xl'>Blog.</span>
            <Link href={'/getting-started'}>
            <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-2 sm:px-3 border border-solid border-black shadow-[-7px_7px_0_#000000]">Get Started
              {/* <Image src={Arrow} alt='arrow' /> */}
            </button>
            </Link>
          </div>
  </div>
}
