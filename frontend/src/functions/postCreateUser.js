import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const postCreateUserURL = "http://127.0.0.1:8000/framework/create-user/";

export default async function postCreateUser(data) {
  return await axios
    .post(postCreateUserURL, data)
    .then((response) => {
      console.log(response);
      return response.status;
    })
    .catch((error) => {
      console.log(error.response);
      return error.response.status;
    });
}
