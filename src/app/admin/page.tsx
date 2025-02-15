"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Blog = {
  _id: string;
  title: string;
  description: string;
  category: string;
  img: string;
  author: string;
  authorImg: string;
  draft: boolean;
};

const Page = () => {
  const [blogList, setBlogList] = useState<Blog[]>([]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/blogs");
      const data = await response.json();
      setBlogList(data.blogs || []);
    } catch (error: any) {
      console.error("Error fetching blogs:", error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleEdit = (
    id: string,
    title: string,
    description: string,
    category: string,
    draft: boolean
  ) => {
    window.location.href = `/admin/addProduct?id=${id}&title=${encodeURIComponent(
      title
    )}&description=${encodeURIComponent(description)}&category=${encodeURIComponent(
      category
    )}&draft=${draft}`;
  };

  const handleDelete = (id: string) => {
    return async () => {
      if (!confirm("Are you sure you want to delete this blog?")) {
        return;
      }
      try {
        await axios.delete(`/api/blogs?id=${id}`);
        toast.success("Blog deleted successfully");
        fetchBlogs(); // Refresh the blog list
      } catch (error: any) {
        console.error("Error deleting blog:", error.message);
        toast.error("Failed to delete the blog");
      }
    };
  };

  return (
    <div className="overflow-y-auto h-screen px-12">
      <div className="flex items-center justify-between w-full py-2 max-h-[60px]">
        <span className="font-semibold text-3xl">Dashboard : Drafts</span>
      </div>
      {blogList
        .filter((blog) => blog.draft === true)
        .map((blog, i) => (
          <div
            key={i}
            className="border-2 border-gray-300 p-4 my-3 rounded-md capitalize flex justify-between items-center"
          >
            <div>
              <h1 className="text-2xl font-bold">{blog.title}</h1>
              <p>{blog.description}</p>
            </div>
            <div className="flex gap-4">
              <button
              
                // disabled={true}  
                className="hover:bg-slate-400 text-black px-4 py-1 font-semibold rounded-md transform transition-all"
                onClick={() =>
                  // handleEdit(
                  //   blog._id,
                  //   blog.title,
                  //   blog.description,
                  //   blog.category,
                  //   blog.draft
                  // )
                  alert("Edit disabled")
                }
              >
                Edit
              </button>
              <button
                className="hover:bg-red-500 text-black px-4 py-1 font-semibold rounded-md transform transition-all"
                onClick={handleDelete(blog._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Page;
