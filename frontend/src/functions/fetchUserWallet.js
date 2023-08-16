import axios from "axios";

export default function fetchUserWallet() {
  const TEST_URL = "http://127.0.0.1:8000/framework/fetch-user-wallet/";
  const PRODUCTION_URL = "http://jamesgwhit.pythonanywhere.com/framework/fetch-user-wallet/";;
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
