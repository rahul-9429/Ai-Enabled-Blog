    import { NextResponse } from "next/server";
    import {config, configDotenv} from "dotenv"
    import { GoogleGenerativeAI } from "@google/generative-ai";
 
    export async function POST(request: Request){
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "AIzaSyA4__0sQy_3NvCpiQCBb18uv7H8jjx_Q70");
        const formdata = await request.formData();
        const description = formdata.get("description") as string;
        const author = formdata.get("author") as string;
        const category = formdata.get("category") as string;
        try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `${description}, authored by ${author}, category ${category}, summarize and breakdown this blog dont miss any important details in the result give response in html code format`;
        const result = await model.generateContent(prompt);
        const summarizedText = result.response.text()
        // console.log(summarizedText);
        return NextResponse.json({summarizedText: summarizedText});
        
        } catch (error: any) {
            console.error("Error :", error.message);
            return NextResponse.json({ msg: "Error" }, { status: 500 });
        }
    }