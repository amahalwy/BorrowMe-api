import uploadImage from "../../lib/uploadImage";
import {
  BookingPropsModel,
  PostingPropsModel,
  RequestPropsModel,
  UserPropsModel,
} from "../../typescript/models";
import { Router } from "express";
import bcrypt from "bcryptjs";
import passport from "passport";
import jwt, { SignCallback, SignOptions } from "jsonwebtoken";
import User from "../../models/User";
import Posting from "../../models/Posting";
import Booking from "../../models/Booking";
import Request from "../../models/Request";
import validateSignupInput from "../../validation/signup";
import validateLoginInput from "../../validation/login";
import validateUserInput from "../../validation/user";
import multer from "multer";
import { signJwt } from "../../lib/signJwt";

const router = Router();
const upload = multer();

router.get(
  "/",
  (res: {
    json: (arg0: any) => any;
    status: (
      arg0: number
    ) => { (): any; new (): any; json: { (arg0: any): any; new (): any } };
  }) => {
    User.find()
      .then((users: any) => res.json(users))
      .catch((err: any) => res.status(400).json(err));
  }
);

router.get("/current", (req: any) => {
  const token = req.body.token;
  console.log(token);
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const email: string = req.body.email;
  const password: string | any = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user)
      return res.status(404).json({ email: "This user does not exist" });

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        signJwt(res, user);
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

router.post("/signup", (req, res) => {
  const { errors, isValid } = validateSignupInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ email: "User already registered with this email." });
    } else {
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        address,
        city,
        state,
        zipCode,
      }: UserPropsModel = req.body;
      const _user = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        address,
        city,
        state,
        zipCode,
        profilePhoto:
          "https://borrowme-pro.s3.us-east-2.amazonaws.com/6c40245f-69eb-40e1-be43-ce2476ecc72c",
      };

      const newUser = new User(_user);

      bcrypt.genSalt(10, (err: Error, salt: string) => {
        const password: string | any = _user.password;

        bcrypt.hash(password, salt, (err: Error, hash: string) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user: UserPropsModel) => signJwt(res, user))
            .catch((err: any) => res.status(400).json(err));
        });
      });
    }
  });
});

router.get("/:userId", (req, res) => {
  User.findOne({ _id: req.params.userId })
    .then((user: UserPropsModel | null | any) => res.json(user))
    .catch((err: {}) => res.status(400).json(err));
});

router.get(
  "/:userId/postings",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Posting.find({ ownerId: req.params.userId })
      .then((postings: PostingPropsModel[]) => res.json(postings))
      .catch((err: {}) => res.status(400).json(err));
  }
);

// Users' requests (as requestor)
router.get(
  "/:userId/requests/requestor",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Request.find({ requestorId: req.params.userId })
      .then((requests: RequestPropsModel[]) => res.json(requests))
      .catch((err: {}) => res.status(400).json(err));
  }
);

// Users' requests (as receiver)
router.get("/:userId/requests/receiver", upload.single("file"), (req, res) => {
  Request.find({ receiverId: req.params.userId })
    .then((requests: RequestPropsModel[]) => res.json(requests))
    .catch((err: {}) => res.status(400).json(err));
});

// Users' bookings
router.get(
  "/:userId/bookings/owner",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Booking.find({ ownerId: req.params.userId })
      .then((bookings: BookingPropsModel[]) => res.json(bookings))
      .catch((err: {}) => res.status(400).json(err));
  }
);

router.get(
  "/:userId/bookings/renter",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Booking.find({ requestorId: req.params.userId })
      .then((bookings: BookingPropsModel[]) => res.json(bookings))
      .catch((err: {}) => res.status(400).json(err));
  }
);

router.put("/:id", upload.single("file"), (req, res) => {
  const { errors, isValid } = validateUserInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  if (!req.file) {
    User.findOne({ email: req.body.email })
      .then((user: UserPropsModel | null | any) => {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.address = req.body.address;
        user.city = req.body.city;
        user.state = req.body.state;
        user.zipCode = req.body.zipCode;
        user.profilePhoto = req.body.file;

        user
          .save()
          .then((savedUser: any) => {
            signJwt(res, savedUser);
          })
          .catch((err: any) => res.json(err));
      })
      .catch((err: any) => res.status(400).json(err));
  } else {
    uploadImage(req.file)
      .then((data) => {
        const uploadedImageURL = data.Location;
        User.findOne({ email: req.body.email })
          .then((user: UserPropsModel | null | any) => {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.address = req.body.address;
            user.city = req.body.city;
            user.state = req.body.state;
            user.zipCode = req.body.zipCode;
            user.profilePhoto = uploadedImageURL;

            user
              .save()
              .then((savedUser: any) => res.status(200).json(savedUser))
              .catch((err: any) => res.json(err));
          })
          .catch((err: any) => res.status(400).json(err));
      })
      .catch((err) => res.status(400).json(err));
  }
});

export default router;
