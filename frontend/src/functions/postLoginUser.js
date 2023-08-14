import axios from "axios";

export default async function postLoginUser(data) {
  const TEST_URL = "http://127.0.0.1:8000/framework/login-user/";
  const PRODUCTION_URL = "http://jamesgwhit.pythonanywhere.com/framework/login-user/";
  return await axios
    .post(TEST_URL, data)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error.response);
      return error.response;
    });
}
