"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

type blogList = {
  _id: string;
  title: string;
  description: string;
  category: string;
  img:string;
  author:string;
  authorImg:string;
  draft:boolean;
}

const Page = () => {
  const [blogList, setBlogList] = useState<blogList[]>([]);
  
  const fecthBlogs = async () =>{
    try {
      const response = await axios.get("/api/blogs")
      setBlogList(response.data.blogs || []);

    } catch (error:unknown) {
      console.error("Error fetching blogs:", error);
    }
  }
  
  useEffect(()=>{
    fecthBlogs();
  },[])

  const handleEdit = () => {
    alert("Edit disabled for now");
  }

  const handleDelete = (id:string) => {
    return async () => {
      if (!confirm("Are you sure you want to delete this blog?")) {
        return;
      }
      try {
        await axios.delete(`/api/blogs?id=${id}`);
        toast.success("Blog deleted successfully");
        fecthBlogs(); 
      } catch (error: unknown) {
        console.error("Error deleting blog:", error);
        toast.error("Failed to delete the blog");
      }
    };
     

  }

  return (
    
    <div className='overflow-y-auto h-screen px-12'>
       <div className='flex items-center justify-between w-full py-2 max-h-[60px] '>
                <span className="font-semibold text-3xl">Dashboard : Bloglist</span></div>

 {
  blogList.length === 0 ?<p className="w-full h-full flex fixed left-[55%] top-[45%] font-bold text-2xl">No blogs found.</p>:

  blogList.filter((blog)=> blog.draft === false).map((blog,i)=>{
    return(
      <div key={i} 
      className='border-2 border-gray-300 p-4 flex justify-between items-center my-3 rounded-md'
      >

       
        <div className=''>
          <h1 className='text-2xl font-bold'>{blog.title}</h1>
          <p className='line-clamp-2'>{blog.description}</p>
          </div>
        <div className='flex gap-4'>  
          <button
          className='hover:bg-slate-400 text-black px-4 py-1 font-semibold rounded-md transform transition-all  ' 
          onClick={
            handleEdit
          }>
            Edit
          </button>
          <button 
          className='hover:bg-red-500 text-black px-4 py-1 font-semibold rounded-md transform transition-all'
          onClick={handleDelete(blog._id)}>
            Delete
          </button>
        </div>
      </div>
    )
  })
 }

    </div>
  )
}

export default Page