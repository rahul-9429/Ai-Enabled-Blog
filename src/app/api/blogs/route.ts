import { NextResponse } from "next/server";
import BlogModel from "../../../../lib/models/BlogModel";
import ConnectDb from "../../../../lib/config/db";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_CONNECTION_URL as string);
const loadDb = async () => {
    try {
        await ConnectDb();
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw new Error("Database connection failed");
    }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  console.log("id is",id);

  try {
    await client.connect();
    const database = client.db("blog-app");
    const collection = database.collection("blogs");

    if (id) {
      const blog = await collection.findOne({ _id: new ObjectId(id) });
      if (!blog) {
        return NextResponse.json(
          { msg: "Blog not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ blog });
    } else {
      // Get all blogs
      const blogList = await collection.find().toArray();
      return NextResponse.json({ blogs: blogList });
    }
  } catch (error: unknown) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { msg: "Error fetching blogs" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request){
  const {searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  try {
    await loadDb();
    const blogToDelete = await  BlogModel.findOneAndDelete({ _id: id });
    if (!blogToDelete) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Blog deleted successfully" });
  } catch (error: unknown) {
    return NextResponse.json({error: error}, {status: 500});
  }
}

export async function PUT(){
  // const {searchParams} = new URL(request.url);
  // const id = searchParams.get("id");
  try {
    await loadDb();
    
  } catch (error: unknown) {
    return NextResponse.json({error: error}, {status: 500});
    
  }
}

export async function POST(request: Request) {
    try {
        await loadDb(); 
        // console.log("req is",request);
        const formData = await request.formData();
        // const timeStamp = Date.now();
        console.log(request.body);
        const image = formData.get("image") as File | null;
        // const authorImage = formData.get("authorImg") as File | null; 
        const drafts = formData.get("draft") === "true";
        if (!image) {
            return NextResponse.json({ error: "No image or author image uploaded" }, { status: 400 });
        }

        const blogData = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            category: formData.get("category") as string,
            author: formData.get("author") as string,
            image: formData.get("image") as string,
            authorImage: formData.get("authorImg") as string,  
            draft : drafts,
        };

        await BlogModel.create(blogData);
        console.log("Blog successfully created:", blogData);
        if(drafts){
            return NextResponse.json({ success: true, message: "Blog saved as draft" });
        }else{
        return NextResponse.json({ success: true, message: "Blog created successfully" });
        }

    } catch (error: unknown) {
        console.error("Error handling blog creation:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
