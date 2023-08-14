import axios from "axios";

export default function userLogout() {
  const TEST_URL = "http://127.0.0.1:8000/framework/user-logout/";
  const PRODUCTION_URL = "http://jamesgwhit.pythonanywhere.com/framework/user-logout/";
  return axios
    .post(TEST_URL, { message: "success" })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
}
