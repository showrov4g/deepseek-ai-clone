import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "@/models/User";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req) {
  const wh = new Webhook(process.env.SIGNIN_SECRET);
  const headerPayload = await headers();
  const svixHeaders = {
    svix_id: headerPayload.get("svix_id"),
    svix_signature: headerPayload.get("svix_signature"),
  };
  // get preloader and verify it

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const { data, type } = wh.verify(body, svixHeaders);

  //prepare the user data to the data base

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

    case "user.created":
      await User.findByIdAndUpdate(data.id, userData);
      break;

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;

    default:
      break;
  }
  return NextRequest.json({message: "Event Received"})
}
