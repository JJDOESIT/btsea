import axios from "axios";

export default function postCheckUserActive(email) {
  const TEST_URL = "http://127.0.0.1:8000/framework/check-user-active/";
  const PRODUCTION_URL =
    "http://jamesgwhit.pythonanywhere.com/framework/check-user-active/";

  return axios
    .post(TEST_URL, { email: email })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
}
