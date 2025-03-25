import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.models.User || mongoose.model("User", ChatSchema);

export default Chat;