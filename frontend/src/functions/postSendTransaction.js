import axios from "axios";

export default function sendTransaction(data) {
    console.log(data)
  const TEST_URL = "http://127.0.0.1:8000/framework/send-transaction/";
  const PRODUCTION_URL =
    "http://jamesgwhit.pythonanywhere.com/framework/send-transaction/";
  return axios
    .post(PRODUCTION_URL,data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
}
