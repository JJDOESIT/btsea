import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const BASE_URL = "http://jamesgwhit.pythonanywhere.com/";
const FULL_URL = BASE_URL + "framework/create-user/";

export default async function postCreateUser(data) {
  return await axios
    .post(FULL_URL, data)
    .then((response) => {
      console.log(response);
      return response.status;
    })
    .catch((error) => {
      console.log(error.response);
      return error.response.status;
    });
}
