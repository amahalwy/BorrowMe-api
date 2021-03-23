import passport = require("passport");
import multer = require("multer");
import { Router } from "express";
const Booking = require("../../models/Booking");
import validateBookingInput from "../../validation/bookings";
import { BookingProps } from "./../../typescript/models";

const upload = multer();
const router = Router();

router.get("/", (req, res) => {
  Booking.find({ ownerId: req.body.id })
    .then((bookings: BookingProps[]) => res.json(bookings))
    .catch((err: any) => res.status(400).json(err));
});

router.get("/:bookingId", (req, res) => {
  Booking.findById(req.params.bookingId)
    .then((booking: BookingProps) => res.json(booking))
    .catch((err: any) => res.status(400).json(err));
});

router.post(
  "/",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateBookingInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const newBooking: BookingProps = new Booking({
      ownerId: req.body.ownerId,
      requestorId: req.body.requestorId,
      requestorName: req.body.requestorName,
      postingId: req.body.postingId,
      requestDates: req.body.requestDates,
      price: req.body.price,
      bookingImage: req.body.bookingImage,
    });

    newBooking
      .save()
      .then((booking: BookingProps) => res.json(booking))
      .catch((err) => res.json(err));
  }
);

router.delete(
  "/:id",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Booking.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: "Deleted!" }))
      .catch((error: any) => res.status(400).json({ error: error }));
  }
);

export default router;
