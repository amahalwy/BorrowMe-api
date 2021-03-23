"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = __importDefault(require("validator"));
var valid_text_1 = __importDefault(require("./valid-text"));
var valid_array_1 = __importDefault(require("./valid-array"));
function validatePostingInput(data) {
    var errors = {};
    data.title = valid_text_1.default(data.title) ? data.title : "";
    data.description = valid_text_1.default(data.description) ? data.description : "";
    data.price = valid_text_1.default(data.price) ? data.price : "";
    data.address = valid_text_1.default(data.address) ? data.address : "";
    data.state = valid_text_1.default(data.state) ? data.state : "";
    data.city = valid_text_1.default(data.city) ? data.city : "";
    data.zipCode = valid_text_1.default(data.zipCode) ? data.zipCode : "";
    data.ownerId = valid_text_1.default(data.ownerId) ? data.ownerId : "";
    data.tags = valid_array_1.default(data.tags.trim().split(","))
        ? data.tags.trim().split(",")
        : "";
    if (validator_1.default.isEmpty(data.ownerId)) {
        errors.ownerId = "Owner id required.";
    }
    if (validator_1.default.isEmpty(data.title)) {
        errors.title = "Title field is required.";
    }
    if (!validator_1.default.isLength(data.title, { min: 4, max: 20 })) {
        errors.title =
            "Title field should be minimum 4 characters and maximum 20 characters.";
    }
    if (validator_1.default.isEmpty(data.description)) {
        errors.description = "Description field is required.";
    }
    if (!validator_1.default.isLength(data.description, { min: 8, max: 100 })) {
        errors.description =
            "Description field should be minimum 8 characters and maximum 100 characters.";
    }
    if (validator_1.default.isEmpty(data.price)) {
        errors.price = "Price field is required.";
    }
    if (validator_1.default.isEmpty(data.state)) {
        errors.state = "State field is required.";
    }
    if (validator_1.default.isEmpty(data.address)) {
        errors.address = "Address code field is required.";
    }
    if (validator_1.default.isEmpty(data.city)) {
        errors.city = "City code field is required.";
    }
    if (validator_1.default.isEmpty(data.zipCode)) {
        errors.zipCode = "Zip code field is required.";
    }
    if (data.tags.length > 3) {
        errors.tags = "Tags field can't be more than 3.";
    }
    if (data.tags[0] === "") {
        errors.tags = "Tags field can't be empty.";
    }
    return {
        errors: errors,
        isValid: Object.keys(errors).length === 0,
    };
}
exports.default = validatePostingInput;
