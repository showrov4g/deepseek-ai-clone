import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = getAuth();
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "user not Authorized",
      });
    }
    // message save to the database
    const chatData = {
      userId,
      messages: [],
      name: "New Chat",
    };
    // connect database and create new chat in the database

    // datebase
    await connectDB();
    await Chat.create(chatData);

    return NextResponse.json({success: true, message:"New chat created"});
  } catch (error) {
    return NextResponse.json({success:false, error: error.message})
  }
}
