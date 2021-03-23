import passport = require("passport");
import multer = require("multer");
import { Router } from "express";
import { PostingPropsModel } from "../../typescript/models";
import validatePostingInput from "../../validation/postings";
import uploadImage from "../../lib/uploadImage";
import Posting from "../../models/Posting";

const router = Router();

router.get("/", (req, res) => {
  Posting.find()
    .then((postings) => res.json(postings))
    .catch((err: any) => res.status(402).json(err));
});

router.get("/ownerId", (req, res) => {
  Posting.findById(req.params.id)
    .populate({
      path: "userId",
      select: "firstName",
    })
    .then(
      (posting) => {
        res.json(posting);
      },
      (err: any) => res.status(400).json(err)
    );
});

router.get("/:postingId", (req, res) => {
  Posting.findById(req.params.postingId)
    .then((postings) => res.json(postings))
    .catch((err: any) => res.status(400).json(err));
});

// router.post(
//   "/",
//   upload.single("file"),
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const { isValid, errors } = validatePostingInput(req.body);
//     if (!isValid) return res.status(400).json(errors);

//     uploadImage(req.file)
//       .then((data) => {
//         const uploadedImageURL = data.Location;
//         const newPosting: PostingPropsModel = new Posting({
//           ownerId: req.user,
//           title: req.body.title,
//           description: req.body.description,
//           price: req.body.price,
//           image: uploadedImageURL,
//           tags: req.body.tags,
//           address: req.body.address,
//           city: req.body.city,
//           state: req.body.state,
//           zipCode: req.body.zipCode,
//         });

//         newPosting
//           .save()
//           .then((posting) => res.json(posting))
//           .catch((err) => res.json(err));
//       })
//       .catch((err) => res.status(400).json(err));
//   }
// );

// update
// router.patch(
//   "/:postingId",
//   upload.single("file"),
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const { isValid, errors } = validatePostingInput(req.body);
//     if (!isValid) return res.status(400).json(errors);

//     uploadImage(req.file)
//       .then((data) => {
//         const uploadedImageURL = data.Location;

//         Posting.findOne(req.body._id).then((posting: PostingPropsModel) => {
//           posting.ownerId = req.body.ownerId;
//           posting.title = req.body.title;
//           posting.description = req.body.description;
//           posting.price = req.body.price;
//           posting.zipCode = req.body.zipCode;
//           posting.image = uploadedImageURL;
//           posting.tags = req.body.tags;

//           posting
//             .save()
//             .then((savedPosting) => res.json(savedPosting))
//             .catch((err) => res.json(err));
//         });
//       })
//       .catch((err) => res.status(400).json(err));
//   }
// );

// delete
// router.delete("/:id", (req, res) => {
//   Posting.deleteOne({ _id: req.params.id })
//     .then(() => {
//       res.json("Posting deleted successfully!");
//     })
//     .catch((err) => res.status(400).json(err));
// });

export default router;
