import { BookingModel } from "./../typescript/models";
import mongoose, { model, Schema } from "mongoose";

const BookingSchema = new mongoose.Schema<BookingModel>(
  {
    postingId: { type: Schema.Types.ObjectId, ref: "Posting" },
    ownerId: { type: Schema.Types.ObjectId, ref: "User" },
    requestorId: { type: Schema.Types.ObjectId, ref: "User" },
    requestorName: {
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

const Booking = model<BookingModel>("Booking", BookingSchema);
export default Booking;
