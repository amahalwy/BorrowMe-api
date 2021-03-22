import mongoose, { model, Schema } from "mongoose";

const RequestSchema = new mongoose.Schema(
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

export default model("Request", RequestSchema);
