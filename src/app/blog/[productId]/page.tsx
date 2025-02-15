"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { useRef } from "react";

type BlogList = {
  _id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  authorImg: string;
  image: string;
};

export default function Page({ params }: { params: Promise<{ productId: string }> }) {
  const airef = useRef<HTMLDivElement>(null);
  const [blog, setBlog] = useState<BlogList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isaiLoading, setIsaiLoading] = useState(false);

  const [productId, setProductId] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setProductId(resolvedParams.productId);
    });
  }, [params]);

  // Fetch the blog data
  const fetchBlog = async () => {
    if (!productId) return;

    try {
      const response = await fetch(`/api/blogs?id=${productId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch the blog");
      }
      const data = await response.json();
      setBlog(data.blog);
      console.log(data.blog);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (productId) {
      fetchBlog();
    }
  }, [productId]);

  const handleAnalyse = async () => {
    setIsaiLoading(true);
    const formdata = new FormData();
    formdata.append("description", blog?.description || "");
  
    try {
      const response = await axios.post('/api/analyse', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setSummary(response.data.summarizedText);
  
      if (airef.current) {
        airef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error: any) {
      console.error("Error analyzing blog:", error.message);
  
      setSummary("Failed to analyze the blog. Please try again.");
    } finally {
      setIsaiLoading(false); 
    }
  };
  

  return (<>
  
  {isaiLoading && (
  <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 flex items-center justify-center shadow-[10px_10px_10px_pink]">
    <div className="text-xl font-bold z-50">
      <span className="text-3xl font-semibold text-black font-mono">
      Analyzing with AI...
      </span>
      </div>
  </div>
)}

    <div className="py-5 px-5 md:px-12 lg:px-28 w-full">
      
      <div className="flex justify-between items-center">
        <span className="font-bold text-3xl">Blog.</span>
        <Link href={"/getting-started"}>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-2 sm:px-3 border border-solid border-black shadow-[-7px_7px_0_#000000]">
            Get Started
          </button>
        </Link>
      </div>

      <div className="mt-6">
        {isLoading ? (
          <p>Loading...</p>
        ) : blog ? (
          <div>
            {/* <Image
        src={blog.image}
        alt="Base64 Example"
        width={300}
        height={300}
      /> */}
      
      <div className="overflow-hidden flex flex-col justify-center">
      <h1 className="text-3xl text-center font-bold capitalize mb-4">{blog.title}</h1>
      <div className="flex justify-center m-auto align-center  border-2 border-gray-300 rounded-md">
      <img src={blog.image} alt="Base64 Example" loading="lazy"
      className=""
      />
      </div>
    
      </div>
      <div className="flex items-center font-xl justify-between px-10 ">
      <p className="mt-4 font-medium capitalize ">Category: {blog.category}</p>
      <p className="mt-4 font-medium capitalize ">{blog.author}</p>
      <button
            onClick={handleAnalyse}
            className=" px-4  py-1 border border-solid border-black shadow-[-7px_7px_0_#000000]">
              Analyse with Ai
            </button>
      </div>
       <div className=" px-11 ">
       <p className="mt-6" 
            dangerouslySetInnerHTML={{ __html: blog.description }}>
            </p>
           
       </div>
           
           {summary && (
              <div className="mt-5 px-10">
                <hr className=" my-6"/>
                <h2 className="text-3xl font-bold pb-4" ref={airef}>Summary</h2>
                <p
                dangerouslySetInnerHTML={{ __html: summary }}></p>
              </div>
            )}


           
          </div>
        ) : (
          <p>Blog not found.</p>
        )}
      </div>
    </div>
    </>
  );
}
