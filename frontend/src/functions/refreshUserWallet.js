import axios from "axios";

export default function refreshUserWallet() {
  const TEST_URL = "http://127.0.0.1:8000/framework/refresh-user-wallet/";
  const PRODUCTION_URL =
    "http://jamesgwhit.pythonanywhere.com/framework/refresh-user-wallet/";
  return axios
    .post(PRODUCTION_URL)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
}
