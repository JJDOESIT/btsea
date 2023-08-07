import axios from "axios";

export default function userLogout() {
  const userLogoutURL = "http://127.0.0.1:8000/framework/user-logout/";
  return axios
    .post(userLogoutURL, { message: "success" })
    .then((response) => {
      console.log(response);
      return response.data
    })
    .catch((error) => {
      console.log(error);
      return error.response
    });
}
