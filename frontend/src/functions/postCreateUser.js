import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export default async function postCreateUser(data) {
  const TEST_URL = "http://127.0.0.1:8000/framework/create-user/";
  const PRODUCTION_URL = "http://jamesgwhit.pythonanywhere.com/framework/create-user/";
  return await axios
    .post(PRODUCTION_URL, data)
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      console.log(error.response);
      return error.response.status;
    });
}
