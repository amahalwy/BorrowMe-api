import { Mongoose } from "mongoose";
const mongoose = new Mongoose();
const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    ownerId: {
      type: String,
      required: true,
    },
    requestorId: {
      type: String,
      required: true,
    },
    requestorName: {
      type: String,
      required: true,
    },
    postingId: {
      type: String,
      required: true,
    },
    requestDates: {
      type: Array,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    bookingImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Booking", BookingSchema);
