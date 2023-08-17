import axios from "axios";

export default function postCreateWallet() {
  const PRODUCTION_URL =
    process.env.REACT_APP_BASE_URL + "framework/create-user-wallet/";
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
