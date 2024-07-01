import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    default: "",
  },
  email: {
    type: String,
    unique: true,
  },
  image: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  token: {
    type: String,
    default: "",
  },
});

export default model("User", userSchema);
