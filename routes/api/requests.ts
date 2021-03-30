import passport = require("passport");
import multer = require("multer");
import { Router } from "express";
import validateRequestInput from "../../validation/requests";
import { RequestModel } from "../../typescript/models";
import Request from "../../models/Request";

const upload = multer();
const router = Router();

router.get("/", (res: any) => {
  Request.find()
    .then((requests) => res.json(requests))
    .catch((err: any) => res.status(400).json(err));
});

router.get("/:requestId", (req, res) => {
  Request.findById(req.params.requestId)
    .then((request) => res.json(request))
    .catch((err: any) => res.status(400).json(err));
});

router.post(
  "/",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateRequestInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const newRequest: RequestModel = new Request({
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
      .catch((err) => res.json(err));
  }
);

router.delete(
  "/:id",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Request.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: "Deleted!" }))
      .catch((error: any) => res.status(400).json({ error: error }));
  }
);

export default router;
