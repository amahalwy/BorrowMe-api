"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var uploadImage_1 = __importDefault(require("../../lib/uploadImage"));
var express_1 = require("express");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var passport_1 = __importDefault(require("passport"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var User_1 = __importDefault(require("../../models/User"));
var Posting_1 = __importDefault(require("../../models/Posting"));
var Booking_1 = __importDefault(require("../../models/Booking"));
var Request_1 = __importDefault(require("../../models/Request"));
var signup_1 = __importDefault(require("../../validation/signup"));
var login_1 = __importDefault(require("../../validation/login"));
var user_1 = __importDefault(require("../../validation/user"));
var multer_1 = __importDefault(require("multer"));
var router = express_1.Router();
var upload = multer_1.default();
router.get("/", function (res) {
    User_1.default.find()
        .then(function (users) { return res.json(users); })
        .catch(function (err) { return res.status(400).json(err); });
});
router.get("/current", function (req) {
    var token = req.body.token;
    console.log(token);
});
router.post("/login", function (req, res) {
    var _a = login_1.default(req.body), errors = _a.errors, isValid = _a.isValid;
    if (!isValid)
        return res.status(400).json(errors);
    var email = req.body.email;
    var password = req.body.password;
    User_1.default.findOne({ email: email }).then(function (user) {
        if (!user)
            return res.status(404).json({ email: "This user does not exist" });
        bcryptjs_1.default.compare(password, user.password).then(function (isMatch) {
            if (isMatch) {
                var payload = {
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
                var key = process.env.secretOrKey;
                jsonwebtoken_1.default.sign(payload, key, { expiresIn: 3600 }, function (err, encoded) {
                    res.json({
                        success: true,
                        token: "Bearer " + encoded,
                    });
                });
            }
            else {
                errors.password = "Incorrect password";
                return res.status(400).json(errors);
            }
        });
    });
});
router.post("/signup", function (req, res) {
    var _a = signup_1.default(req.body), errors = _a.errors, isValid = _a.isValid;
    if (!isValid)
        return res.status(400).json(errors);
    User_1.default.findOne({ email: req.body.email }).then(function (user) {
        if (user) {
            return res
                .status(400)
                .json({ email: "User already registered with this email." });
        }
        else {
            var _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword, address = _a.address, city = _a.city, state = _a.state, zipCode = _a.zipCode;
            var _user_1 = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                address: address,
                city: city,
                state: state,
                zipCode: zipCode,
                profilePhoto: "https://borrowme-pro.s3.us-east-2.amazonaws.com/6c40245f-69eb-40e1-be43-ce2476ecc72c",
            };
            var newUser_1 = new User_1.default(_user_1);
            bcryptjs_1.default.genSalt(10, function (err, salt) {
                var password = _user_1.password;
                bcryptjs_1.default.hash(password, salt, function (err, hash) {
                    if (err)
                        throw err;
                    newUser_1.password = hash;
                    newUser_1
                        .save()
                        .then(function (user) {
                        var payload = {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            profilePhoto: user.profilePhoto,
                        };
                        var key = process.env.secretOrKey;
                        var options = { expiresIn: 3600 };
                        var cb = function (err, encoded) {
                            if (err) {
                                res.status(400).json(err);
                            }
                            else {
                                res.json({
                                    success: true,
                                    token: "Bearer " + encoded,
                                    user: user,
                                });
                            }
                        };
                        jsonwebtoken_1.default.sign(payload, key, options, cb);
                    })
                        .catch(function (err) { return res.status(400).json(err); });
                });
            });
        }
    });
});
router.get("/:userId", function (req, res) {
    User_1.default.findOne({ _id: req.params.userId })
        .then(function (user) { return res.json(user); })
        .catch(function (err) { return res.status(400).json(err); });
});
router.get("/:userId/postings", upload.single("file"), passport_1.default.authenticate("jwt", { session: false }), function (req, res) {
    Posting_1.default.find({ ownerId: req.params.userId })
        .then(function (postings) { return res.json(postings); })
        .catch(function (err) { return res.status(400).json(err); });
});
// Users' requests (as requestor)
router.get("/:userId/requests/requestor", upload.single("file"), passport_1.default.authenticate("jwt", { session: false }), function (req, res) {
    Request_1.default.find({ requestorId: req.params.userId })
        .then(function (requests) { return res.json(requests); })
        .catch(function (err) { return res.status(400).json(err); });
});
// Users' requests (as receiver)
router.get("/:userId/requests/receiver", upload.single("file"), function (req, res) {
    Request_1.default.find({ receiverId: req.params.userId })
        .then(function (requests) { return res.json(requests); })
        .catch(function (err) { return res.status(400).json(err); });
});
// Users' bookings
router.get("/:userId/bookings/owner", upload.single("file"), passport_1.default.authenticate("jwt", { session: false }), function (req, res) {
    Booking_1.default.find({ ownerId: req.params.userId })
        .then(function (bookings) { return res.json(bookings); })
        .catch(function (err) { return res.status(400).json(err); });
});
router.get("/:userId/bookings/renter", upload.single("file"), passport_1.default.authenticate("jwt", { session: false }), function (req, res) {
    Booking_1.default.find({ requestorId: req.params.userId })
        .then(function (bookings) { return res.json(bookings); })
        .catch(function (err) { return res.status(400).json(err); });
});
router.put("/:id", upload.single("file"), function (req, res) {
    var _a = user_1.default(req.body), errors = _a.errors, isValid = _a.isValid;
    if (!isValid)
        return res.status(400).json(errors);
    if (!req.file) {
        User_1.default.findOne({ email: req.body.email })
            .then(function (user) {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.address = req.body.address;
            user.city = req.body.city;
            user.state = req.body.state;
            user.zipCode = req.body.zipCode;
            user.profilePhoto = req.body.file;
            user
                .save()
                .then(function (savedUser) { return res.status(200).json(savedUser); })
                .catch(function (err) { return res.json(err); });
        })
            .catch(function (err) { return res.status(400).json(err); });
    }
    else {
        uploadImage_1.default(req.file)
            .then(function (data) {
            var uploadedImageURL = data.Location;
            User_1.default.findOne({ email: req.body.email })
                .then(function (user) {
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.address = req.body.address;
                user.city = req.body.city;
                user.state = req.body.state;
                user.zipCode = req.body.zipCode;
                user.profilePhoto = uploadedImageURL;
                user
                    .save()
                    .then(function (savedUser) { return res.status(200).json(savedUser); })
                    .catch(function (err) { return res.json(err); });
            })
                .catch(function (err) { return res.status(400).json(err); });
        })
            .catch(function (err) { return res.status(400).json(err); });
    }
});
exports.default = router;
