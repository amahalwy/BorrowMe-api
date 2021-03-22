import { router } from "express";
import { passport } from "passport";
import { multer } from "multer";
import Posting from "../../models/Posting";
import validatePostingInput from "../../validation/postings";
import { PostingProps } from "../../typescript/models";
import uploadImage from "../../lib/uploadImage";

const upload = multer();

router.get("/", (req, res) => {
  Posting.find()
    .then((postings: PostingProps[]) => res.json(postings))
    .catch((err) => res.status(400).json(err));
});

router.get("/ownerId", (req, res) => {
  Posting.findById(req.params.id)
    .populate({
      path: "userId",
      select: "firstName",
    })
    .then(
      (posting: PostingProps) => {
        res.json(posting);
      },
      (err) => res.status(400).json(err)
    );
});

router.get("/:postingId", (req, res) => {
  Posting.findById(req.params.postingId)
    .then((postings) => res.json(postings))
    .catch((err: {}) => res.status(400).json(err));
});

router.post(
  "/",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validatePostingInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    uploadImage(req.file)
      .then((data) => {
        const uploadedImageURL = data.Location;

        const newPosting: PostingProps = new Posting({
          ownerId: req.user.id,
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          image: uploadedImageURL,
          tags: req.body.tags,
          address: req.body.address,
          city: req.body.city,
          state: req.body.state,
          zipCode: req.body.zipCode,
        });

        newPosting
          .save()
          .then((posting) => res.json(posting))
          .catch((err: {}) => res.json(err));
      })
      .catch((err: {}) => res.status(400).json(err));
  }
);

// update
router.patch(
  "/:postingId",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validatePostingInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    uploadImage(req.file)
      .then((data) => {
        const uploadedImageURL = data.Location;

        Posting.findOne(req.body._id).then((posting: PostingProps) => {
          posting.ownerId = req.body.ownerId;
          posting.title = req.body.title;
          posting.description = req.body.description;
          posting.price = req.body.price;
          posting.zipCode = req.body.zipCode;
          posting.image = uploadedImageURL;
          posting.tags = req.body.tags;

          posting
            .save()
            .then((savedPosting) => res.json(savedPosting))
            .catch((err: {}) => res.json(err));
        });
      })
      .catch((err: {}) => res.status(400).json(err));
  }
);

// delete
router.delete("/:id", (req, res) => {
  Posting.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json("Posting deleted successfully!");
    })
    .catch((err: {}) => res.status(400).json(err));
});

const postingsRouter = router;
export default postingsRouter;
