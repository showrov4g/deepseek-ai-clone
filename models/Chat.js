import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    messages: [
        {
            role: { type: String, required: true },
            content: { type: String, required: true },
            timestamp: { type: String, required: true },

        }
    ],
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.models.User || mongoose.model("User", ChatSchema);

export default Chat;
