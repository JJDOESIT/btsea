import { useState, useEffect } from "react";
import CSRFToken from "../components/CSRFToken";
import postCreateUser from "../functions/postCreateUser";
import Alerts from "../components/alerts";
import "../styles/register.css";
import "../styles/SVGWave.css";
import Wavify from "../components/svgWave";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertData, setAlertData] = useState({
    hidden: true,
    message: "",
    borderColor: "",
    backgroundColor: "",
    fontColor: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    postCreateUser({ email: email, password: password }).then((status) => {
      console.log(status);
      if (status == 200) {
        setAlertData((prev) => {
          return {
            ...prev,
            hidden: false,
            borderColor: "1px solid #c3e6cb",
            backgroundColor: "#d4edda",
            fontColor: "#155724",
            message: "Account Created",
          };
        });
      } else if (status == 400) {
        setAlertData((prev) => {
          return {
            ...prev,
            hidden: false,
            borderColor: "1px solid #f5c6cb",
            backgroundColor: "#f8d7da",
            fontColor: "#721c24",
            message: "Email Taken",
          };
        });
      }
    });
  }

  return (
    <div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="create-account-form">
          <CSRFToken></CSRFToken>
          <div className="create-account-form-title">
            <p>Register Now</p>
          </div>
          <div className="input-container">
            <input
              type="email"
              id="email"
              placeholder="email"
              onChange={() => setEmail(document.querySelector("#email").value)}
              minLength="3"
              maxLength="25"
              required
            ></input>
          </div>
          <div className="input-container">
            <input
              type="password"
              id="password"
              placeholder="password"
              onChange={() =>
                setPassword(document.querySelector("#password").value)
              }
              minLength="8"
              maxLength="25"
              required
            ></input>
          </div>
          <Alerts
            hidden={alertData["hidden"]}
            message={alertData["message"]}
            borderColor={alertData["alertData"]}
            backgroundColor={alertData["backgroundColor"]}
            fontColor={alertData["fontColor"]}
            toggleHidden={() =>
              setAlertData((prev) => {
                return { ...prev, hidden: true };
              })
            }
          ></Alerts>
          <div className="input-container">
            <input type="submit" value="Create Account"></input>
          </div>
        </form>
      </div>
      <Wavify></Wavify>
    </div>
  );
}
