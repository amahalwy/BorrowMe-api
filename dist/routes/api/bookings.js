"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var multer = require("multer");
var express_1 = require("express");
var Booking_1 = __importDefault(require("../../models/Booking"));
var bookings_1 = __importDefault(require("../../validation/bookings"));
var upload = multer();
var router = express_1.Router();
router.get("/", function (req, res) {
    Booking_1.default.find({ ownerId: req.body.id })
        .then(function (bookings) { return res.json(bookings); })
        .catch(function (err) { return res.status(400).json(err); });
});
router.get("/:bookingId", function (req, res) {
    Booking_1.default.findById(req.params.bookingId)
        .then(function (booking) { return res.json(booking); })
        .catch(function (err) { return res.status(400).json(err); });
});
router.post("/", upload.single("file"), passport.authenticate("jwt", { session: false }), function (req, res) {
    var _a = bookings_1.default(req.body), isValid = _a.isValid, errors = _a.errors;
    if (!isValid)
        return res.status(400).json(errors);
    var newBooking = new Booking_1.default({
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
        .then(function (booking) { return res.json(booking); })
        .catch(function (err) { return res.json(err); });
});
router.delete("/:id", upload.single("file"), passport.authenticate("jwt", { session: false }), function (req, res) {
    Booking_1.default.deleteOne({ _id: req.params.id })
        .then(function () { return res.status(200).json({ message: "Deleted!" }); })
        .catch(function (error) { return res.status(400).json({ error: error }); });
});
exports.default = router;
