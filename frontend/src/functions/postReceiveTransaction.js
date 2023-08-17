import axios from "axios";

export default function postReceiveTransaction() {
  const PRODUCTION_URL =
  process.env.REACT_APP_BASE_URL+"framework/receive-transaction/";
  return axios
    .post(PRODUCTION_URL)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
}
