import { findBedByName } from "./hms.server";

function isValidName(value) {
  return value && value.trim().length > 0 && value.trim().length <= 30;
}

function isValidAmount(value) {
  const amount = parseFloat(value);
  return !isNaN(amount) && amount >= 0;
}

function isValidDate(value) {
  return value && new Date(value).getTime() < new Date().getTime();
}

function isValidPassword(password) {
  return password && password.trim().length >= 7;
}

export function validateCredentials(input) {
  let validateErrors = {};

  if (!isValidPassword(input.password)) {
    validateErrors.uname = "Invalid Password.";
  }
  if (Object.keys(validateErrors).length > 0) throw validateErrors;
}

export function validatePatientInput(input) {
  console.log("🚀 ~ validatePatientInput ~ input:", input);
  let validationErrors = {};

  if (!isValidName(input.pname)) {
    validationErrors.name =
      "Invalid User Name. Must be at most 30 characters long.";
  }

  if (!isValidAmount(input.due)) {
    validationErrors.due =
      "Invalid amount. Must be a number greater than zero.";
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}

function isValidBedName(name) {
  const bed = findBedByName(name);
  return bed;
}

export function validateBedInput(input) {
  console.log("🚀 ~ validateBedInput ~ input:", input);
  let validationErrors = {};

  if (!isValidBedName(input.name)) {
    validationErrors.name =
      "Invalid Bed Name. Must be Unique and at most 30 characters long.";
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}
