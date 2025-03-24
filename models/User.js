import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: { typeof: String, require:true },
    name: { typeof: String, require:true },
    email: { typeof: String, require:true },
    image: { typeof: String, require:false },
  },
  {
    timestamps: true,
  }
);

const User =mongoose.model.User || mongoose.model("User", UserSchema)

export default User;