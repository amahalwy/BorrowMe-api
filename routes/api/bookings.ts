import passport = require("passport");
import multer = require("multer");
import { Router } from "express";
import Booking from "../../models/Booking";
import validateBookingInput from "../../validation/bookings";
import { BookingModel, PostingModel } from "./../../typescript/models";
import Posting from "../../models/Posting";

const upload = multer();
const router = Router();

router.get("/", (req, res) => {
  Booking.find()
    .then((bookings) => res.json(bookings))
    .catch((err: any) => res.status(400).json(err));
});

router.get("/:bookingId", (req, res) => {
  Booking.findById(req.params.bookingId)
    .then((booking) => res.json(booking))
    .catch((err: any) => res.status(400).json(err));
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { isValid, errors } = validateBookingInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const newBooking: BookingModel = new Booking({
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
    .then((booking) => console.log(booking))
    .catch((err) => res.json(err));

  Posting.findOne({
    _id: req.body.postingId,
  })
    .populate("bookings")
    .exec((err, posting) => {
      posting?.bookings?.push(newBooking);
      posting?.save().then((posting) => res.json(posting));
    });
});

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
