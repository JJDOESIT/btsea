import axios from "axios";

export default function fetchUserWallet() {
  const BASE_URL='http://jamesgwhit.pythonanywhere.com/'
  const FULL_URL=BASE_URL+'framework/fetch-user-wallet/'
  return axios
    .post(FULL_URL)
    .then((response) => {
      console.log(response);
      return response.data
    })
    .catch((error) => {
      console.log(error);
      return error.response
    });
}
