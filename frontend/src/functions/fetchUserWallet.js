import axios from "axios";

export default function fetchUserWallet() {
  const fetchUserWalletURL =
    "http://127.0.0.1:8000/framework/fetch-user-wallet/";
  return axios
    .post(fetchUserWalletURL)
    .then((response) => {
      console.log(response);
      return response.data
    })
    .catch((error) => {
      console.log(error);
      return error.response
    });
}
