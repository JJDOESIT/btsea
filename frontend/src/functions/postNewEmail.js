import axios from "axios";

export default async function postSendNewEmail(data) {
  const TEST_URL = "http://127.0.0.1:8000/framework/send-new-email/";
  const PRODUCTION_URL = "http://jamesgwhit.pythonanywhere.com/framework/send-new-email/";
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
