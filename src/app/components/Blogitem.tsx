import React from 'react'
import Sampleimg from '../../../assets/Sampleimg.jpg'
import Image from 'next/image'
import Link from 'next/link';

type blogList ={
  _id: string;
  title: string;
  description: string;
  category: string;
  img:string;
}
const Blogitem: React.FC<blogList> = ({_id, title, description, category, img}) => {
  // console.log(_id , "from blogitem");
  return (
    <Link href={`blog/${_id}`}>
    <div className='max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0_#000000]'>
        <Image src={img} alt='sampleimg' width={400} height={400} 
        className='border border-black object-cover h-[220px]'/>
        {/* catageory */}
        <p className='ml-5 mt-5 px-1 inline-block bg-black text-white text-sm capitalize'>{category}</p>
        <div className='p-5 '>
            {/* title */}
            <h5 className='mb-5 font-medium text-gray-900 text-lg tracking-tight capitalize'>
              {title}
            </h5>
            {/* description */}
            <p className='tracking-tight mb-3 text-sm text-gray-700 line-clamp-2' 
            dangerouslySetInnerHTML={{__html:description.slice(0,80)}}>
            </p>
            <div className='inline-flex w-full items-centerpy-2 font-semibold  text-center'>
                Read more
                {/* <Image src={Arrow} alt='arrow' className='ml-2' width={20}/> */}
            </div>
        </div>
    </div>
    </Link>
  )
}

export default Blogitem