"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var S3_1 = __importDefault(require("./S3"));
var uploadImage = function (file) {
    var bucketKey = process.env.S3Bucket;
    var params = {
        Bucket: bucketKey,
        Key: uuid_1.v4(),
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
    };
    var uploadPhoto = S3_1.default.upload(params).promise();
    return uploadPhoto;
};
exports.default = uploadImage;
