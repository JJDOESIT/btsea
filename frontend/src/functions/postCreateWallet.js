import axios from "axios";

export default function postCreateWallet() {
  const TEST_URL = "http://127.0.0.1:8000/framework/create-user-wallet/";
  const PRODUCTION_URL =
    "http://jamesgwhit.pythonanywhere.com/framework/create-user-wallet/";
  return axios
    .post(TEST_URL)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
}
