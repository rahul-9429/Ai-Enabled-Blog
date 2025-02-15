'use client';
import axios from 'axios';
import React, { useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from 'react-toastify';

interface BlogData {
    title: string;
    description: string;
    category: string;
    author: string;
    authorImg: string;
    draft: boolean;
  }

const Page = () => {
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [draft, setDraft] = useState<boolean>(false);
    // const {searchParams} = new URL(window.location.href);
    // const TUdescription = searchParams.get("description");
    // const TUtitle = searchParams.get("title");
    // const TU_id = searchParams.get("id");
    // const TUcategory = searchParams.get("category");
    // const TUdraft = searchParams.get("draft");
    // console.log(TUtitle);
    // console.log(TU_id);
    // console.log(TUcategory);
    // console.log(TUdraft);
    // console.log(TUdescription);
const defaultData: BlogData = {
    title: '',
    description: '',
    category: 'startup',
    author: 'Rahul',
    authorImg: '/author.png',
    draft: false,
  };
  
    const [data, setData] = useState<BlogData>(defaultData);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImageBase64(reader.result as string); 
        };

        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);

        return () => URL.revokeObjectURL(imageUrl);
    };

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!imageBase64) {
            toast.error('Please upload an image');
            return;
        }

        const finalData = {
            title: data.title || 'Untitled Blog',
            description: data.description || 'No description provided.',
            category: data.category || 'startup',
            author: data.author || 'Rahul',
            authorImg: data.authorImg || '/author.png',
            image: imageBase64,
            draft: draft,
          };
          

        try {
            const response = await axios.post('/api/blogs', finalData, {
                headers: { 'Content-Type': 'multipart/form-data' } 
            });

            if (response.data.success) {
                toast.success('Blog Published Successfully');
                setData({
                    title: '',
                    description: '',
                    category: 'startup',
                    author: 'Rahul',
                    authorImg: '/author.png',
                    draft: false,
                });
                setImageBase64(null);
                setPreview(null);
            } else {
                toast.error(response.data.error || 'Something went wrong');
            }
        } catch (error: any) {
            console.error('Axios error:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Server Error');
        }
    };


    return (
        <div className='overflow-y-auto h-screen px-12'>
            <div className='flex items-center justify-between w-full py-2 max-h-[60px] '>
            <span className="font-semibold text-3xl">Dashboard : Add Blog</span></div>
            <form onSubmit={onSubmitHandler} className='pt-5 sm:pt-12 '>
                <p className='text-xl'>Upload Thumbnail</p>
                <span className='border bg-gray-100 border-black flex w-fit'>
                    <label htmlFor="image">
                        {!preview ? 
                            <FaCloudUploadAlt className="text-xl w-[50px] h-[50px] mx-10 my-4" /> 
                            : 
                            <img src={preview} alt="thumbnail" className="w-[100px] h-[100px] mx-10 my-4" />
                        }    
                    </label>
                    <input 
                        type="file" 
                        id="image" 
                        hidden 
                        accept="image/*"
                        onChange={onImageChange}
                    /> 
                </span>

                <p className='text-xl mt-4'>Blog Title</p>
                <input 
                    type="text" 
                    placeholder='Type here' 
                    required
                    name='title' 
                    onChange={onChangeHandler}
                    value={data.title}
                    className='w-full sm:w-[500px] mt-4 px-4 py-3 border border-black'
                />
                <p className='text-xl mt-4'>Blog Description</p>
                <textarea 
                    name='description' 
                    onChange={onChangeHandler}
                    value={data.description}    
                    placeholder='Start Writing here' 
                    required
                    className='w-full sm:w-[500px] mt-4 px-4 py-3 border border-black'
                />

                <p className='text-xl mt-4'>Blog Category</p>
                <select 
                    name="category" 
                    onChange={onChangeHandler}
                    value={data.category}
                    className='w-40 mt-4 px-4 py-3 border text-gray-500 border-black'
                >
                    <option value="startup">Startup</option>
                    <option value="technology">Technology</option>
                    <option value="lifestyle">Lifestyle</option>
                </select>

                <br />
                <button type='submit' className='mt-3 w-40 h-12 bg-black text-white'>
                    Publish Blog
                </button>
                <button type='submit' 
                onClick={()=>{setDraft(!draft)}}
                className='mt-3 w-40 h-12 ml-4 bg-black text-white'>
                    Save as Draft
                </button>
            </form>
        </div>
    );
};

export default Page;
