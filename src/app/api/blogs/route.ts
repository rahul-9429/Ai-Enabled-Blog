import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";

export async function GET(request: Request) {
    console.log("GET request to /api/blogs");
    return NextResponse.json({ msg: "API is working!" });
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const timeStamp = Date.now();
        const image = formData.get("image") as File | null;

        if (!image) {
            return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
        }

        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);
        const path = `./public/${timeStamp}_${image.name}`;

        await writeFile(path, buffer);
        const imageUrl = `/${timeStamp}_${image.name}`;
        
        console.log(imageUrl);
        return NextResponse.json({ imageUrl });

    } catch (error) {
        console.error("Error handling image upload:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
