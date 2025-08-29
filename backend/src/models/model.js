import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    // required: true
  },
  desc: {
    type: String,
    // required: true
  }
});

const DataUser = mongoose.model("User", userSchema);

export { DataUser };
