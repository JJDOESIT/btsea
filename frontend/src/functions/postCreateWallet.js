import axios from "axios";

export default function postCreateWallet() {
  const BASE_URL = "http://jamesgwhit.pythonanywhere.com/";
  const FULL_URL = BASE_URL + "framework/create-user-wallet/";
  axios
    .post(FULL_URL)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
