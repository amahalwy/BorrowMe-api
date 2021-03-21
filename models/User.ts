import { Mongoose } from "mongoose";
const mongoose = new Mongoose();
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    postings: [{ type: Schema.Types.ObjectId, ref: "Posting" }],
    requests: [{ type: Schema.Types.ObjectId, ref: "Request" }],
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    confirmPassword: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    zipCode: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      required: false,
    },
    currentUser: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
