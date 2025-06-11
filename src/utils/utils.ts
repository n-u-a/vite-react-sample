import axios from "axios";
import SHA256 from "crypto-js/sha256";

export const hasValue = (obj: any): boolean => {
  return Object.values(obj).some(
    (value) => value !== null && value !== undefined && value !== ""
  );
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getErrorInfo = (error: unknown) => {
  let errorInformation: string = "";

  if (axios.isAxiosError(error)) {
    if (error.response) {
      errorInformation = `(ErrorCode :  ${error.code}

      Message : ${error.message}

      StatusCode : ${error.response.status}

      ErrorResponseData : ${error.response.data})`;
    } else {
      errorInformation = `ErrorCode :  ${error.code}

      Request : ${error.request}

      Stack : ${error.stack}

      Message : ${error.message}`;
    }
  } else {
    errorInformation = "An unknown error occurred.";
  }

  return errorInformation;
};

export async function sha256(text: string) {
  return SHA256(text).toString();
}

export function toLocaleDefaultString(num: number, defaultString: string) {
  if (num == null || num == undefined) {
    return defaultString;
  }
  return num.toLocaleString();
}

export function isEmpty(object: any) {
  return object == null || object == undefined || object == "";
}

export function isNotNullish(object: any) {
  return object !== null && object !== undefined && object !== "";
}

export function isNotEmpty(str: string) {
  return str !== null && str !== undefined && str !== "";
}
