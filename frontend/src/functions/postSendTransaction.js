import axios from "axios";

export default function sendTransaction(data) {
  const PRODUCTION_URL =
    process.env.REACT_APP_BASE_URL + "framework/send-transaction/";
  return axios
    .post(PRODUCTION_URL, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
}
