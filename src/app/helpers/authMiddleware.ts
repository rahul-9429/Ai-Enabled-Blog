import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function authenticate(request: Request){
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
        return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
    }
    try {
        const decode = jwt.Verify(token, NEXT_PUBLIC_process.env.JWT_SECRET);
        return decode;
        
    } catch (error: unknown) {
        return NextResponse.json({ message: "Unauthorized: Invalid token" }, { status: 401 });
        
    }
}