import { NextResponse } from "next/server";
import ConnectDb from "../../../../lib/config/db";
import EmailModel from "../../../../lib/models/EmailModel"
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_CONNECTION_URL as string);
const loadDb = async () => {
    try {
        await ConnectDb();
    } catch (error) {
        console.error("Error connecting to the database", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};

export async function GET(request: Request) {
    try {
        await client.connect();
        const database = client.db("blog-app");
        const collection = database.collection("emails");
    
        const users = await collection.find().toArray();
        console.log(users);
return NextResponse.json({subscribers:users});}
catch (error:any) {
        console.error("Error fetching emails from db:", error.message);
        return NextResponse.json({ msg: "Error fetching emails from db" }, { status: 500 });
    }
}

export async function POST(request: Request){
    try {
        loadDb();
        const formData = await request.formData();
        const email = formData.get("email") as string;
        // const UserName = formData.get('name') as string;

        const emailData = {
            email: email,
        };
        const emailExists = await EmailModel.findOne({email: email});
        if(emailExists){
            return NextResponse.json({msg: "Email already exists"}, {status: 400});
        }else{
            await EmailModel.create(emailData);
            console.log("email data added");
    
            return NextResponse.json({msg:"Email added successfully"},{status: 200});
        }
       


    } catch (error: any) {
        console.error("Error saving email to db:", error.message);
        return NextResponse.json({msg:"Error saving email to db"}, {status: 500});
        
    }
}