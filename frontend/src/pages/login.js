import { useState, useEffect } from "react";
import CSRFToken from "../components/CSRFToken";
import postLoginUser from "../functions/postLoginUser";
import Alerts from "../components/alerts";
import "../styles/login.css";
import Wavify from "../components/svgWave";
import { useNavigate } from "react-router-dom";
import modifyDocumentBody from "../functions/modifyDocumentBody";
import { encode } from "base-64";

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

  //Chekcs url for any redirects and prompts an error message
  useEffect(() => {
    if (window.location.href.includes("?next=")) {
      setAlertData({
        hidden: false,
        message: "Login",
        borderColor: "1px solid #f5c6cb",
        backgroundColor: "#f8d7da",
        fontColor: "#721c24",
      });
    }
  }, []);

  //Modify .login-container height on re-size
  useEffect(() => {
    modifyDocumentBody("body", ".navbar-container", ".login-container");
    window.addEventListener("resize", () => {
      modifyDocumentBody("body", ".navbar-container", ".login-container");
    });
  }, []);

  //Post request to login user and add email to session storage
  function handleSubmit(event) {
    event.preventDefault();
    postLoginUser({ email: email, password: password }).then((status) => {
      if (status.status == 200) {
        try {
          sessionStorage.setItem("email", encode(email));
        } catch {
          console.log("Warning ... Email In Use");
        }
        navigate("/dashboard/");
        navigate(0);
      } else if (status.status == 400) {
        try {
          sessionStorage.setItem("email", encode(email));
        } catch {
          console.log("Warning ... Email In Use");
        }

        navigate("/verify-email/");
      } else if (status.status == 401) {
        setAlertData((prev) => {
          return {
            ...prev,
            hidden: false,
            borderColor: "1px solid #f5c6cb",
            backgroundColor: "#f8d7da",
            fontColor: "#721c24",
            message: "Invalid Credentials",
          };
        });
      } else {
        setAlertData((prev) => {
          return {
            ...prev,
            hidden: false,
            borderColor: "1px solid #f5c6cb",
            backgroundColor: "#f8d7da",
            fontColor: "#721c24",
            message: "Internal Error",
          };
        });
      }
    });
  }

  return (
    <div className="login-container">
      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="login-account-form">
          <CSRFToken></CSRFToken>
          <div className="login-account-form-title">
            <p>Login</p>
          </div>
          <div className="login-input-container">
            <label>Enter an email</label>
            <input
              type="email"
              id="email"
              onChange={() => setEmail(document.querySelector("#email").value)}
              minLength="3"
              maxLength="25"
              required
            ></input>
          </div>
          <div className="login-input-container">
            <label>Enter a password</label>
            <input
              type="password"
              id="password"
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
          <div className="login-input-container">
            <input type="submit" value="Sign In"></input>
          </div>
        </form>
      </div>
      <div className="login-wave-container">
        <Wavify></Wavify>
      </div>
    </div>
  );
}
