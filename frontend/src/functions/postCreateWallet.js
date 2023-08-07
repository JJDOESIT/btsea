import axios from "axios";

export default function postCreateWallet() {
  const postCreateWalletURL =
    "http://127.0.0.1:8000/framework/create-user-wallet/";
  axios
    .post(postCreateWalletURL)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
