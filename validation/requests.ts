import Validator from "validator";
import validText from "./valid-text";
import validArray from "./valid-array";

export default function validateRequestInput(data: {
  postingId?: string;
  requestorId?: string;
  requestDates?: string | string[] | any;
}) {
  let errors: {
    postingId?: string;
    requestorId?: string;
    requestDates?: string;
  } = {};

  data.postingId = validText(data.postingId) ? data.postingId : "";
  data.requestorId = validText(data.requestorId) ? data.requestorId : "";
  data.requestDates = validArray(data.requestDates.trim().split(","))
    ? data.requestDates.trim().split(",")
    : "";

  if (Validator.isEmpty(data.postingId)) {
    errors.postingId = "Posting id field is required.";
  }

  if (Validator.isEmpty(data.requestorId)) {
    errors.requestorId = "Requestor id field is required.";
  }

  if (data.requestDates[0] === "") {
    errors.requestDates = "RequestDates field can't be empty.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}
