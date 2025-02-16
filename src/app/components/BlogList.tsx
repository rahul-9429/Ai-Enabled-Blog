"use client";
import React from 'react'
import Blogitem from './Blogitem'
import axios from 'axios';
import { useEffect, useState } from 'react';

type blogList = {
  _id: string;
  title: string;
  description: string;
  category: string;
  author:string;
  authorImg:string;
  img:string;
  draft:boolean;
}


const BlogList =  () => {
    const [menu, setMenu] = React.useState('All')
    const [blogList, setBlogList] = useState<blogList[]>([]);
  
  const fecthBlogs = async () =>{
    try {
      const response = await axios.get("/api/blogs")
      setBlogList(response.data.blogs || []);
      console.log(blogList);
      // console.log(response.data.blogs._id , "id from bloglist");
      
    } catch (error:unknown) {
      console.error("Error fetching blogs:", error);
    }
  }
  
  useEffect(()=>{
    fecthBlogs();
  },[blogList])


  return (
    <div>
        <div className='flex justify-center gap-6 my-10'>
            <button onClick={()=>setMenu('All')} className={ menu=== 'All' ? 'bg-black text-white py-1 px-4 rounded-sm':""}>All</button>
            <button onClick={()=>setMenu('technology')} className={ menu=== 'technology' ? 'bg-black text-white py-1 px-4 rounded-sm':""}>Technology</button>
            <button onClick={()=>setMenu('startup')} className={ menu=== 'startup' ? 'bg-black text-white py-1 px-4 rounded-sm':""}>Startup</button>
            <button onClick={()=>setMenu('lifestyle')}className={ menu=== 'lifestyle' ? 'bg-black text-white py-1 px-4 rounded-sm':""}>Lifestyle</button>
        </div>
        <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
          {
            blogList
            .filter((blog)=> menu === "All" ? true : blog.category === menu)

            .filter((blog)=> blog.draft ? false : blog).map((blog,i)=>{
              return(
                <Blogitem key={i}
                _id={blog._id}
                title={blog.title}
                description={blog.description}
                category={blog.category}
                img={blog.img}
                />
              )
            })
          }
        </div>

    </div>
  )
}

export default BlogList