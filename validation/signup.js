const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateSignupInput(data) {
  let errors = {};

  data.firstName = validText(data.firstName) ? data.firstName : "";
  data.lastName = validText(data.lastName) ? data.lastName : "";
  data.email = validText(data.email) ? data.email : "";
  data.zipCode = validText(data.zipCode) ? data.zipCode : "";
  data.password = validText(data.password) ? data.password : "";
  data.confirmPassword = validText(data.confirmPassword)
    ? data.confirmPassword
    : "";

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First Name can't be blank";
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last Name can't be blank";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm Password field is required";
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Passwords must match";
  }

  if (Validator.isEmpty(data.zipCode)) {
    errors.zipCode = "Zip code can't be blank";
  }

  if (!Validator.isLength(data.zipCode, { min: 5, max: 5 })) {
    errors.zipCode = "Zip code is incorrect length (5)";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
