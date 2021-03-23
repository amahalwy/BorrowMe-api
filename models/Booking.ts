import { BookingPropsModel } from "./../typescript/models";
import mongoose, { model, Schema } from "mongoose";

const BookingSchema = new mongoose.Schema<BookingPropsModel>(
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

const Booking = model<BookingPropsModel>("Booking", BookingSchema);
export default Booking;
