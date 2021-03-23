"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = __importDefault(require("validator"));
var valid_text_1 = __importDefault(require("./valid-text"));
function validateSignupInput(data) {
    var errors = {};
    data.firstName = valid_text_1.default(data.firstName) ? data.firstName : "";
    data.lastName = valid_text_1.default(data.lastName) ? data.lastName : "";
    data.email = valid_text_1.default(data.email) ? data.email : "";
    data.zipCode = valid_text_1.default(data.zipCode) ? data.zipCode : "";
    data.password = valid_text_1.default(data.password) ? data.password : "";
    data.confirmPassword = valid_text_1.default(data.confirmPassword)
        ? data.confirmPassword
        : "";
    if (validator_1.default.isEmpty(data.firstName)) {
        errors.firstName = "First Name can't be blank";
    }
    if (validator_1.default.isEmpty(data.lastName)) {
        errors.lastName = "Last Name can't be blank";
    }
    if (validator_1.default.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    if (!validator_1.default.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (validator_1.default.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (!validator_1.default.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (validator_1.default.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "Confirm Password field is required";
    }
    if (!validator_1.default.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = "Passwords must match";
    }
    if (validator_1.default.isEmpty(data.zipCode)) {
        errors.zipCode = "Zip code can't be blank";
    }
    if (!validator_1.default.isLength(data.zipCode, { min: 5, max: 5 })) {
        errors.zipCode = "Zip code is incorrect length (5)";
    }
    return {
        errors: errors,
        isValid: Object.keys(errors).length === 0,
    };
}
exports.default = validateSignupInput;
