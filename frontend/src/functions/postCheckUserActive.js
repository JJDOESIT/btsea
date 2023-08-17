import axios from "axios";

export default function postCheckUserActive(email) {
  const PRODUCTION_URL =
    process.env.REACT_APP_BASE_URL + "framework/check-user-active/";

  return axios
    .post(PRODUCTION_URL, { email: email })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
}
