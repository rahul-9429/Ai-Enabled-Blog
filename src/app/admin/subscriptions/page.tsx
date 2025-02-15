"use client";
import axios from "axios";
import Head from "next/head";
import React, { useState, useEffect } from "react";

type Subscriber = {
  _id: string;
  email: string;
};

const Page = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  
  const fetchSubscribers = async () => {
    try {
      const response = await axios.get("/api/email");
      setSubscribers(response.data.subscribers || []); 
    } catch (err) {
      console.error("Error fetching subscribers:", err);
      setError("Failed to fetch subscribers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (<>
  
    <Head>
        <title>Email Subscribers</title>
        <meta name="description" content="List of email subscribers for the admin panel" />
      </Head>
    <div className='overflow-y-auto h-screen px-12'>
    <div className='flex items-center justify-between w-full py-2 max-h-[60px] '>
    <span className="font-semibold text-3xl">Dashboard : Subscribers</span></div>
      {loading ? (
        <p className="w-full h-full flex fixed left-[55%] top-[45%] font-bold text-2xl">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : subscribers.length === 0 ? (
        <p className="w-full h-full flex fixed left-[55%] top-[45%] font-bold text-2xl">No subscribers found.</p>
      ) : (
        subscribers.map((subscriber) => (
          <div key={subscriber._id} 
          className="border-2 border-gray-300 p-4  my-3 rounded-md" 
          >
            <span
            className="font-semibold text-lg "
            >
            {subscriber.email}</span>
          </div>
        ))
      )}
    </div>
  </>
  );
};

export default Page;
