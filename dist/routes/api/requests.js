"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var multer = require("multer");
var express_1 = require("express");
var requests_1 = __importDefault(require("../../validation/requests"));
var Request_1 = __importDefault(require("../../models/Request"));
var upload = multer();
var router = express_1.Router();
router.get("/", function (res) {
    Request_1.default.find()
        .then(function (requests) { return res.json(requests); })
        .catch(function (err) { return res.status(400).json(err); });
});
router.get("/:requestId", function (req, res) {
    Request_1.default.findById(req.params.requestId)
        .then(function (request) { return res.json(request); })
        .catch(function (err) { return res.status(400).json(err); });
});
router.post("/", upload.single("file"), passport.authenticate("jwt", { session: false }), function (req, res) {
    var _a = requests_1.default(req.body), isValid = _a.isValid, errors = _a.errors;
    if (!isValid)
        return res.status(400).json(errors);
    var newRequest = new Request_1.default({
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
        .then(function (request) { return res.json(request); })
        .catch(function (err) { return res.json(err); });
});
router.delete("/:id", upload.single("file"), passport.authenticate("jwt", { session: false }), function (req, res) {
    Request_1.default.deleteOne({ _id: req.params.id })
        .then(function () { return res.status(200).json({ message: "Deleted!" }); })
        .catch(function (error) { return res.status(400).json({ error: error }); });
});
exports.default = router;
