import { NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json({message:"At drafts route"});
}

export async function POST(){
    return NextResponse.json({message:"At drafts route"});
}