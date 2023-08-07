import axios from "axios";

export default async function postLoginUser(data) {
  const postLoginUserURL = "http://127.0.0.1:8000/framework/login-user/";
  return await axios
    .post(postLoginUserURL, data)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error.response);
      return error.response
    });
}
