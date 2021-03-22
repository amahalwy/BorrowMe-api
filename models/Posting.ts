import mongoose, { model, Schema } from "mongoose";

const PostingSchema = new mongoose.Schema(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: "User" },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    tags: {
      type: Array,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    // available: {
    //     type: Boolean,
    //     required: true
    //   }
  },
  {
    timestamps: true,
  }
);

const Posting = model("Posting", PostingSchema);
module.exports = Posting;
