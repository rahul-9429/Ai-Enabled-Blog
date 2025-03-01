import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function authenticate(request: Request){
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
        return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
    }
    try {
        const decode = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string);
        return decode;
        
    } catch (error: unknown) {
        return NextResponse.json({ message: "Unauthorized: Invalid token",error:error }, { status: 401 });
        
    }
}