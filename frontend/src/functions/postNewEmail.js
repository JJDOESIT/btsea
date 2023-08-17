import axios from "axios";

export default async function postSendNewEmail(data) {
  const PRODUCTION_URL =
    process.env.REACT_APP_BASE_URL + "framework/send-new-email/";
  return await axios
    .post(PRODUCTION_URL, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.response);
      return error.response;
    });
}
