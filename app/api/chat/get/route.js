import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const {userId} = getAuth();
    if(!userId){
        return NextResponse.json({success:false, message:"user is not Authorized"})
    }
    // connect database to get user chat data 
    await connectDB();
    const data = await Chat.find({userId});
    return NextResponse.json({success:true, data})


  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
