import axios from "axios";

export default async function postLoginUser(data) {
  const BASE_URL = "http://jamesgwhit.pythonanywhere.com/";
  const FULL_URL = BASE_URL + "framework/login-user/";
  return await axios
    .post(FULL_URL, data)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error.response);
      return error.response;
    });
}
