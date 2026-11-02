import axios from "axios";
import Toastr from "components/Common/Toastr";

axios.defaults.baseURL = "/";

export const setAuthHeaders = (setLoading = () => null) => {
  axios.defaults.headers = {
    Accept: "applicaion/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      .getAttribute("content"),
  };
  const token = localStorage.getItem("authToken");
  const email = localStorage.getItem("authEmail");
  if (token && email) {
    axios.defaults.headers["X-Auth-Email"] = email;
    axios.defaults.headers["X-Auth-Token"] = token;
  }
  setLoading(false);
};

const handleSuccessResponse = response => {
  if (response) {
    response.success = response.status === 200;
    if (response.data.notice) {
      Toastr.success(response.data.notice);
    }
  }
  return response;
};

const handleErrorResponse = error => {
  let errorMessage = "Something went wrong!";
  const errorData = error.response?.data?.errors;

  if (errorData) {
    errorMessage = Array.isArray(errorData) ? errorData.join(", ") : String(errorData);
  } else if (error.response?.data?.notice) {
    errorMessage = error.response.data.notice;
  } else if (error.message) {
    errorMessage = error.message;
  } else if (error.notice) {
    errorMessage = error.notice;
  }

  Toastr.error(errorMessage);
  if (error.response?.status === 423) {
    window.location.href = "/";
  }
  return Promise.reject(error);
};

export const registerIntercepts = () => {
  axios.interceptors.response.use(handleSuccessResponse, error =>
    handleErrorResponse(error)
  );
};
