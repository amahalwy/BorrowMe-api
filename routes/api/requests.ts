import passport = require("passport");
import multer = require("multer");
import { Router } from "express";
import validateRequestInput from "../../validation/requests";
import { RequestProps } from "../../typescript/models";
const Request = require("../../models/Request");

const upload = multer();
const router = Router();

router.get("/", (req, res) => {
  Request.find()
    .then((requests: RequestProps[]) => res.json(requests))
    .catch((err: {}) => res.status(400).json(err));
});

router.get("/:requestId", (req, res) => {
  Request.findById(req.params.requestId)
    .then((request: RequestProps) => res.json(request))
    .catch((err: {}) => res.status(400).json(err));
});

router.post(
  "/",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateRequestInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const newRequest: RequestProps = new Request({
      requestorName: req.body.requestorName,
      requestorId: req.body.requestorId,
      receiverId: req.body.receiverId,
      postingId: req.body.postingId,
      requestDates: req.body.requestDates,
      postingImage: req.body.postingImage,
      postingTitle: req.body.postingTitle,
      amount: req.body.amount,
    });

    newRequest
      .save()
      .then((request) => res.json(request))
      .catch((err: {}) => res.json(err));
  }
);

router.delete(
  "/:id",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Request.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: "Deleted!" }))
      .catch((error: {}) => res.status(400).json({ error: error }));
  }
);

module.exports = router;
