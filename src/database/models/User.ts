import { Schema, Types, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  username: { type: String, min: 3, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  friends: [Types.ObjectId],
  enemies: [Types.ObjectId],
});

const User = model("User", userSchema, "users");

export default User;
