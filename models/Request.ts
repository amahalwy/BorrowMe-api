import { Mongoose } from "mongoose";
const mongoose = new Mongoose();
const Schema = mongoose.Schema;

const RequestSchema = new Schema(
  {
    requestorId: { type: Schema.Types.ObjectId, ref: "User" },
    receiverId: { type: Schema.Types.ObjectId, ref: "User" },
    requestorName: {
      type: String,
      required: true,
    },
    postingImage: {
      type: String,
      required: true,
    },
    postingTitle: {
      type: String,
      required: true,
    },
    postingId: {
      type: String,
      required: false,
    },
    requestDates: {
      type: Array,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", RequestSchema);
export default Request;
