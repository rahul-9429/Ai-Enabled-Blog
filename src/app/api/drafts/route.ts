import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request){
    return NextResponse.json({message:"At drafts route"});
}

export async function POST(request: Request){
    return NextResponse.json({message:"At drafts route"});
}