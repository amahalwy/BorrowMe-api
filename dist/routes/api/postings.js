"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Posting_1 = __importDefault(require("../../models/Posting"));
var router = express_1.Router();
router.get("/", function (req, res) {
    Posting_1.default.find()
        .then(function (postings) { return res.json(postings); })
        .catch(function (err) { return res.status(402).json(err); });
});
router.get("/ownerId", function (req, res) {
    Posting_1.default.findById(req.params.id)
        .populate({
        path: "userId",
        select: "firstName",
    })
        .then(function (posting) {
        res.json(posting);
    }, function (err) { return res.status(400).json(err); });
});
router.get("/:postingId", function (req, res) {
    Posting_1.default.findById(req.params.postingId)
        .then(function (postings) { return res.json(postings); })
        .catch(function (err) { return res.status(400).json(err); });
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
exports.default = router;
