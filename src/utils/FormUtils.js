import { isNull, isNumber } from "lodash";

export const USERNAME_ID = "username";
export const EMAIL_ID = "email";
export const PASSWORD_ID = "password";
export const CONFIRM_PASSWORD_ID = "confirmPassword";
export const ROLE_ID = "role";
export const QUANTITY_ID = "quantity";
export const PRODUCT_CODE_ID = "productCode";
export const PRODUCT_NAME_ID = "productName";
export const BRAND_ID = "brand";
export const CUSTOMER_NAME_ID = "customerName";

const DEFAULT_INPUT_ERROR_LITERAL = "Field can't be empty.";
const ERROR_USERNAME_LITERAL = "Enter a username!";
const ERROR_EMAIL_LITERAL = "Enter a email address!";
const ERROR_SELECT_ROLE_LITERAL = "Select a role!";
const ERROR_QUANTITY_LITERAL = "Enter a quantity!";
const ERROR_PRODUCT_CODE_LITERAL = "Enter a product code!";
const ERROR_PRODUCT_NAME_LITERAL = "Enter a product name!";
const ERROR_BRAND_LITERAL = "Enter a brand name!";
const ERROR_PASSWORD_LITERAL = "Enter a password!";
const INVALID_PASSWORD_LITERAL =
  "Use 8 or more characters with a mix of letters, numbers & symbols!";
const ERROR_CONFIRM_PASSWORD_LITERAL = "Enter a confirm password!";
const INVALID_CONFIRM_PASSWORD_LITERAL =
  "Those passwords didn’t match. Try again!";
const INVALID_USER_LITERAL =
  "Wrong password. Try again or click Forgot password to reset it!";

const STRONG_PASSWORD_REGEX = new RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
);
const ERROR_SELECT = "Please select.";

export const validateInput = (id, value) => {
  if (id === USERNAME_ID && value.trim().length === 0) {
    return { id: id, error: ERROR_USERNAME_LITERAL };
  } else if (id === PASSWORD_ID && value.trim().length === 0) {
    return { id: id, error: ERROR_PASSWORD_LITERAL };
  } else if (id === EMAIL_ID && value.trim().length === 0) {
    return { id: id, error: ERROR_EMAIL_LITERAL };
  } else if (id === CONFIRM_PASSWORD_ID && value.trim().length === 0) {
    return { id: id, error: ERROR_CONFIRM_PASSWORD_LITERAL };
  } else if (id === ROLE_ID && value.trim().length === 0) {
    return { id: id, error: ERROR_SELECT_ROLE_LITERAL };
  } else if (id === PRODUCT_CODE_ID && value.trim().length === 0) {
    return { id: id, error: ERROR_PRODUCT_CODE_LITERAL };
  } else if (id === PRODUCT_NAME_ID && value.trim().length === 0) {
    return { id: id, error: ERROR_PRODUCT_NAME_LITERAL };
  } else if (id === BRAND_ID && value.trim().length === 0) {
    return { id: id, error: ERROR_BRAND_LITERAL };
  } else if (id === QUANTITY_ID && !isNumber(value)) {
    return { id: id, error: ERROR_QUANTITY_LITERAL };
  } else if (id === CUSTOMER_NAME_ID && value.trim().length === 0) {
    return { id: id, error: "Enter customer name!" };
  } else if (id === "customerPhoneNum" && value.trim().length === 0) {
    return { id: id, error: "Enter customer name!" };
  } else if (id === "customerAddress" && value.trim().length === 0) {
    return { id: id, error: "Enter customer address!" };
  } else if (id === "customerCompanyName" && value.trim().length === 0) {
    return { id: id, error: "Enter customer company name!" };
  } else if (id === "customerCompanyAddress" && value.trim().length === 0) {
    return { id: id, error: "Enter customer company address!" };
  } else {
    return "";
  }
};

export const validateSelect = (value) => {
  if (value.trim().length === 0) {
    return { error: ERROR_SELECT };
  } else {
    return "";
  }
};

export const validatePassword = (id, value) => {};
