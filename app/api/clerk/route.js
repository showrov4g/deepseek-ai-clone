import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "@/models/User";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const wh = new Webhook(process.env.SIGNIN_SECRET);
    const headerPayload = headers();

    console.log("Headers received:", {
      svix_id: headerPayload.get("svix-id"),
      svix_timestamp: headerPayload.get("svix-timestamp"),
      svix_signature: headerPayload.get("svix-signature"),
    });

    const svixHeaders = {
      svix_id: headerPayload.get("svix-id"),
      svix_timestamp: headerPayload.get("svix-timestamp"),
      svix_signature: headerPayload.get("svix-signature"),
    };

    if (!svixHeaders.svix_id || !svixHeaders.svix_timestamp || !svixHeaders.svix_signature) {
      throw new Error("Missing webhook headers");
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);
    const { data, type } = wh.verify(body, svixHeaders);

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      name: `${data.first_name} ${data.last_name}`,
      image: data.image_url,
    };

    await connectDB();

    switch (type) {
      case "user.created":
        await User.create(userData);
        break;

      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData);
        break;

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;

      default:
        break;
    }

    return NextResponse.json({ message: "Event Received" });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }
}
