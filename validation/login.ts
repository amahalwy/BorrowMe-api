import Validator from "validator";
import validText from "./valid-text";

const validateLoginInput = (data: { email?: string; password?: string }) => {
  let errors: {
    email?: string;
    password?: string;
  } = {};

  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

export default validateLoginInput;
