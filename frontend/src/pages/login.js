import { useState, useEffect } from "react";
import CSRFToken from "../components/CSRFToken";
import postLoginUser from "../functions/postLoginUser";
import Alerts from "../components/alerts";
import "../styles/login.css";
import "../styles/SVGWave.css";
import Wavify from "../components/svgWave";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertData, setAlertData] = useState({
    hidden: true,
    message: "",
    borderColor: "",
    backgroundColor: "",
    fontColor: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.href.includes("?next=/dashboard/")) {
      setAlertData({
        hidden: false,
        message: "Login",
        borderColor: "1px solid #f5c6cb",
        backgroundColor: "#f8d7da",
        fontColor: "#721c24",
      });
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    postLoginUser({ email: email, password: password }).then((status) => {
      if (status.status == 200) {
        window.localStorage.setItem("activeUser", email);
        navigate("/dashboard/");
      } else if (status.status == 400) {
        navigate("/verify-email/");
      }
    });
  }

  return (
    <div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="login-account-form">
          <CSRFToken></CSRFToken>
          <div className="login-account-form-title">
            <p>Sign In</p>
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
            <input type="submit" value="Login"></input>
          </div>
        </form>
      </div>
      <Wavify></Wavify>
    </div>
  );
}
