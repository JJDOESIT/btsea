import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export default async function postCreateUser(data) {
  const PRODUCTION_URL =
    process.env.REACT_APP_BASE_URL + "framework/create-user/";
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
