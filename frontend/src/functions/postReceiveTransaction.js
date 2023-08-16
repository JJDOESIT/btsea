import axios from "axios";

export default function postReceiveTransaction() {
  const TEST_URL = "http://127.0.0.1:8000/framework/receive-transaction/";
  const PRODUCTION_URL =
    "http://jamesgwhit.pythonanywhere.com/framework/receive-transaction/";
  return axios
    .post(PRODUCTION_URL)
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.log(error);
      return error.response
    });
}
