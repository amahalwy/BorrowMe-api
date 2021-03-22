import Validator from "validator";
import validText from "./valid-text";
import validArray from "./valid-array";

const validateBookingInput = (data: {
  ownerId: string;
  requestorId: string;
  requestorName: string;
  postingId: string;
  requestDates: any;
  price: any;
}) => {
  let errors: {
    ownerId?: string;
    requestorId?: string;
    requestorName?: string;
    postingId?: string;
    requestDates?: any;
    price?: any;
  } = {};

  data.ownerId = validText(data.ownerId) ? data.ownerId : "";
  data.requestorId = validText(data.requestorId) ? data.requestorId : "";
  data.requestorName = validText(data.requestorName) ? data.requestorName : "";
  data.postingId = validText(data.postingId) ? data.postingId : "";
  data.requestDates = validArray(data.requestDates.trim().split(","))
    ? data.requestDates.trim().split(",")
    : "";
  data.price = validText(data.price) ? data.price : "";

  if (Validator.isEmpty(data.ownerId)) {
    errors.ownerId = "Owner id field is required.";
  }

  if (Validator.isEmpty(data.requestorId)) {
    errors.requestorId = "Requestor id field is required.";
  }

  if (Validator.isEmpty(data.requestorName)) {
    errors.requestorName = "Requestor name field is required.";
  }

  if (Validator.isEmpty(data.postingId)) {
    errors.postingId = "Posting id field is required.";
  }

  if (data.requestDates[0] === "") {
    errors.requestDates = "RequestDates field can't be empty.";
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = "Price field is required.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

export default validateBookingInput;
