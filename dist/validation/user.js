"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = __importDefault(require("validator"));
var valid_text_1 = __importDefault(require("./valid-text"));
function validateUserInput(data) {
    var errors = {};
    data.firstName = valid_text_1.default(data.firstName) ? data.firstName : "";
    data.lastName = valid_text_1.default(data.lastName) ? data.lastName : "";
    data.address = valid_text_1.default(data.address) ? data.address : "";
    data.city = valid_text_1.default(data.city) ? data.city : "";
    data.state = valid_text_1.default(data.state) ? data.state : "";
    data.zipCode = valid_text_1.default(data.zipCode) ? data.zipCode : "";
    if (validator_1.default.isEmpty(data.firstName)) {
        errors.firstName = "First Name field is required.";
    }
    if (validator_1.default.isEmpty(data.lastName)) {
        errors.lastName = "Last Name field is required.";
    }
    if (validator_1.default.isEmpty(data.address)) {
        errors.address = "Adress field is required.";
    }
    if (validator_1.default.isEmpty(data.city)) {
        errors.city = "City field is required.";
    }
    if (validator_1.default.isEmpty(data.state)) {
        errors.state = "State field is required.";
    }
    if (validator_1.default.isEmpty(data.zipCode)) {
        errors.zipCode = "Zipcode field is required.";
    }
    return {
        errors: errors,
        isValid: Object.keys(errors).length === 0,
    };
}
exports.default = validateUserInput;
