import { NextResponse } from "next/server";
import User from "../../../../lib/models/UserModel";
import ConnectDb from "../../../../lib/config/db";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import config from "dotenv"
config.config();
export async function GET(request: Request) {
    try {
        await ConnectDb();

        const url = new URL(request.url);
        const mail = url.searchParams.get("mail");
        const pass = url.searchParams.get("pass");
        if (!mail || !pass) {
            return NextResponse.json({ message: "Missing email or password" }, { status: 400 });
        }
        const user = await User.findOne({ email: mail });
        if (!user) {
            return NextResponse.json({ message: "Account doest exist! Signup to continue" }, { status: 404 });
        }
const isMatch = await bcryptjs.compare(pass, user.password);
if (!isMatch) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
const token = jwt.sign({ email: mail }, process.env.NEXT_PUBLIC_JWT_SECRET as string, { expiresIn: "30d" });
return NextResponse.json({ message: "Signin Successful", redirect: "/admin" }, { status: 200 });

    } catch (error: unknown) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await ConnectDb();

        const formData = await request.formData();
        const umail = formData.get("mail") as string;
        const upass = formData.get("pass") as string;

        console.log("mail is %s and pass is %s", umail, upass);

        if (!umail || !upass) {
            return NextResponse.json({ message: "Missing email or password" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email: umail });

        if (existingUser) {
            return NextResponse.json({ message: "User already exists, Signin to continue" }, { status: 409 });
        }

        

        await new User({
            email: umail,
            password: upass
        }).save();

        const token = jwt.sign({ email: umail }, process.env.NEXT_PUBLIC_JWT_SECRET as string, { expiresIn: "30d" });

        return NextResponse.json({ message: "Signup Successful",redirect: "/admin" }, { status: 201 });

    } catch (error: unknown) {
        console.log((error as Error).message);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
