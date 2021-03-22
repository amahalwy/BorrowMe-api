import { router } from "express";
import { bcrypt } from "bcryptjs";
import { passport } from "passport";
import { jwt } from "jsonwebtoken";
import { multer } from "multer";
import { jwt_decode } from "jwt-decode";
import User from "../../models/User";
import Posting from "../../models/Posting";
import Booking from "../../models/Booking";
import Request from "../../models/Request";
import validateLoginInput from "../../validation/login";
import validateUserInput from "../../validation/user";
import uploadImage from "../../lib/uploadImage";
import {
  BookingProps,
  PostingProps,
  RequestProps,
  UserProps,
} from "../../typescript/models";
import validateSignupInput from "../../validation/signup";

// Middleware for postman form-data
const upload = multer();

// Login for a user
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user: UserProps) => {
    if (!user)
      return res.status(404).json({ email: "This user does not exist" });

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          address: user.address,
          city: user.city,
          state: user.state,
          zipCode: user.zipCode,
          profilePhoto: user.profilePhoto,
          postings: user.postings,
        };

        jwt.sign(
          payload,
          process.env.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

// Signup user
router.post("/signup", (req, res) => {
  const { errors, isValid } = validateSignupInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  User.findOne({ email: req.body.email }).then((user: UserProps) => {
    if (user) {
      return res
        .status(400)
        .json({ email: "User already registered with this email." });
    } else {
      const newUser: UserProps = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        profilePhoto:
          "https://borrowme-pro.s3.us-east-2.amazonaws.com/6c40245f-69eb-40e1-be43-ce2476ecc72c",
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user: UserProps) => {
              const payload = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profilePhoto: user.profilePhoto,
              };

              jwt.sign(
                payload,
                process.env.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) {
                    res.status(400).json(err);
                  } else {
                    res.json({
                      success: true,
                      token: "Bearer " + token,
                      user,
                    });
                  }
                }
              );
            })
            .catch((err: {}) => res.status(400).json(err));
        });
      });
    }
  });
});

router.get("/:userId", (req, res) => {
  User.findOne({ _id: req.params.userId })
    .then((user: UserProps) => res.json(user))
    .catch((err: {}) => res.status(400).json(err));
});

// Users' postings
router.get(
  "/:userId/postings",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Posting.find({ ownerId: req.params.userId })
      .then((postings: PostingProps[]) => res.json(postings))
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
      .then((requests: RequestProps[]) => res.json(requests))
      .catch((err: {}) => res.status(400).json(err));
  }
);

// Users' requests (as receiver)
router.get(
  "/:userId/requests/receiver",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Request.find({ receiverId: req.params.userId })
      .then((requests: RequestProps[]) => res.json(requests))
      .catch((err: {}) => res.status(400).json(err));
  }
);

// Users' bookings
router.get(
  "/:userId/bookings/owner",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Booking.find({ ownerId: req.params.userId })
      .then((bookings: BookingProps[]) => res.json(bookings))
      .catch((err: {}) => res.status(400).json(err));
  }
);

router.get(
  "/:userId/bookings/renter",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Booking.find({ requestorId: req.params.userId })
      .then((bookings: BookingProps[]) => res.json(bookings))
      .catch((err: {}) => res.status(400).json(err));
  }
);

router.get("/", (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt_decode(token);
  res.json(decoded);
});

router.put("/:id", upload.single("file"), (req, res) => {
  const { errors, isValid } = validateUserInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  if (req.file === undefined) {
    User.findOne({ email: req.body.email })
      .then((user: UserProps) => {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.address = req.body.address;
        user.city = req.body.city;
        user.state = req.body.state;
        user.zipCode = req.body.zipCode;
        user.profilePhoto = req.body.file;

        user
          .save()
          .then((savedUser) => res.status(200).json(savedUser))
          .catch((err) => res.json(err));
      })
      .catch((err) => res.status(400).json(err));
  } else {
    uploadImage(req.file)
      .then((data) => {
        const uploadedImageURL = data.Location;
        User.findOne({ email: req.body.email })
          .then((user: UserProps) => {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.address = req.body.address;
            user.city = req.body.city;
            user.state = req.body.state;
            user.zipCode = req.body.zipCode;
            user.profilePhoto = uploadedImageURL;

            user
              .save()
              .then((savedUser) => res.status(200).json(savedUser))
              .catch((err) => res.json(err));
          })
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => res.status(400).json(err));
  }
});

const usersRouter = router;
export default usersRouter;
