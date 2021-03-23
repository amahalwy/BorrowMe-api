"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = __importDefault(require("validator"));
var valid_text_1 = __importDefault(require("./valid-text"));
var valid_array_1 = __importDefault(require("./valid-array"));
function validateRequestInput(data) {
    var errors = {};
    data.postingId = valid_text_1.default(data.postingId) ? data.postingId : "";
    data.requestorId = valid_text_1.default(data.requestorId) ? data.requestorId : "";
    data.requestDates = valid_array_1.default(data.requestDates.trim().split(","))
        ? data.requestDates.trim().split(",")
        : "";
    if (validator_1.default.isEmpty(data.postingId)) {
        errors.postingId = "Posting id field is required.";
    }
    if (validator_1.default.isEmpty(data.requestorId)) {
        errors.requestorId = "Requestor id field is required.";
    }
    if (data.requestDates[0] === "") {
        errors.requestDates = "RequestDates field can't be empty.";
    }
    return {
        errors: errors,
        isValid: Object.keys(errors).length === 0,
    };
}
exports.default = validateRequestInput;
