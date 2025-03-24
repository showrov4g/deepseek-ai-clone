import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "@/models/User";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB(); // Ensure database is connected

    const wh = new Webhook(process.env.SIGNIN_SECRET);
    const headerPayload = headers();

    const svixHeaders = {
      "svix-id": headerPayload.get("svix-id"),
      "svix-timestamp": headerPayload.get("svix-timestamp"),
      "svix-signature": headerPayload.get("svix-signature"),
    };

    if (!svixHeaders["svix-id"] || !svixHeaders["svix-timestamp"] || !svixHeaders["svix-signature"]) {
      throw new Error("Missing webhook headers");
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);
    const { data, type } = wh.verify(body, svixHeaders);

    if (!data) {
      throw new Error("Invalid webhook payload");
    }

    // Ensure email_addresses exist
    const email = data?.email_addresses?.[0]?.email_address || "";
    if (!email) {
      throw new Error("Email address is missing in the webhook payload");
    }

    const userData = {
      _id: data.id,
      email,
      name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url || "",
    };

    switch (type) {
      case "user.created":
        await User.create(userData);
        break;

      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData, { new: true, upsert: true });
        break;

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;

      default:
        console.log(`Unhandled webhook event type: ${type}`);
    }

    return NextResponse.json({ message: "Event Received" });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: err.message || "Invalid webhook" }, { status: 400 });
  }
}
