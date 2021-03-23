"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = __importDefault(require("validator"));
var valid_text_1 = __importDefault(require("./valid-text"));
function validateLoginInput(data) {
    var errors = {};
    data.email = valid_text_1.default(data.email) ? data.email : "";
    data.password = valid_text_1.default(data.password) ? data.password : "";
    if (!validator_1.default.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (validator_1.default.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    if (validator_1.default.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    return {
        errors: errors,
        isValid: Object.keys(errors).length === 0,
    };
}
exports.default = validateLoginInput;
