import axios from "axios";

export default function userLogout() {
  const BASE_URL = "http://jamesgwhit.pythonanywhere.com/";
  const FULL_URL = BASE_URL + "framework/user-logout/";
  return axios
    .post(FULL_URL, { message: "success" })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
}
