"use client";
import React, { useEffect, useState } from "react";
import Blogitem from "./Blogitem";
import axios from "axios";

type blogList = {
  _id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  authorImg: string;
  image: string;
  draft: boolean;
};

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogList, setBlogList] = useState<blogList[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true); // Set loading to true when fetching starts
      const response = await axios.get("/api/blogs");
      setBlogList(response.data.blogs || []);
    } catch (error: unknown) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false); // Always set loading to false after fetch
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        <button
          onClick={() => setMenu("All")}
          className={menu === "All" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}
        >
          All
        </button>
        <button
          onClick={() => setMenu("technology")}
          className={menu === "technology" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}
        >
          Technology
        </button>
        <button
          onClick={() => setMenu("startup")}
          className={menu === "startup" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}
        >
          Startup
        </button>
        <button
          onClick={() => setMenu("lifestyle")}
          className={menu === "lifestyle" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}
        >
          Lifestyle
        </button>
      </div>
      <div className="flex min-h-screen flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {loading ? (
          <p className="font-semibold text-xl py-10">Loading...</p>
        ) : (
          blogList
            .filter((blog) => (menu === "All" ? true : blog.category === menu))
            .filter((blog) => !blog.draft) // Filter out drafts
            .map((blog, i) => {
              return (
                <Blogitem
                  key={blog._id}
                  _id={blog._id}
                  title={blog.title}
                  description={blog.description}
                  category={blog.category}
                  img={blog.image}
                />
              );
            })
        )}
      </div>
    </div>
  );
};

export default BlogList;
