import { RequestPropsModel } from "./../typescript/models";
import mongoose, { model, Schema } from "mongoose";

const RequestSchema = new mongoose.Schema<RequestPropsModel>(
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

const Request = model<RequestPropsModel>("Request", RequestSchema);
export default Request;
