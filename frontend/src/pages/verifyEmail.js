import { useState, useEffect } from "react";
import postCheckUserActive from "../functions/postCheckUserActive";
import { decode } from "base-64";
import LoadingSVG from "../components/loadingSVG";
import postSendNewEmail from "../functions/postNewEmail";
import "../styles/verifyEmail.css";
import Alerts from "../components/alerts";
import modifyDocumentBody from "../functions/modifyDocumentBody";
import DepthButton from "../components/depthButton";

export default function VerifyEmail() {
  const [loaded, setLoaded] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [alertData, setAlertData] = useState({
    hidden: true,
    message: "",
    borderColor: "",
    backgroundColor: "",
    fontColor: "",
  });

  useEffect(() => {
    setTimeout(() => {
      if (loaded) {
        modifyDocumentBody(
          "body",
          ".navbar-container",
          ".verify-email-container"
        );
        window.addEventListener("resize", () => {
          modifyDocumentBody(
            "body",
            ".navbar-container",
            ".verify-email-container"
          );
        });
      }
    }, 100);
  }, []);
  useEffect(() => {
    var email = sessionStorage.getItem("email");
    email = decode(email);
    postCheckUserActive(email).then((response) => {
      if (response.status == 200) {
        setActiveUser(true);
        setLoaded(true);
      } else if (response.status == 400) {
        setActiveUser(false);
        setLoaded(true);
      }
    });
  }, []);

  function handleSubmit() {
    postSendNewEmail({ email: decode(sessionStorage.getItem("email")) }).then(
      (response) => {
        if (response.status == 200) {
          setAlertData((prev) => {
            return {
              ...prev,
              hidden: false,
              borderColor: "1px solid #c3e6cb",
              backgroundColor: "#d4edda",
              fontColor: "#155724",
              message: "Email Sent",
            };
          });
        } else if (response.status == 400) {
          setAlertData((prev) => {
            return {
              ...prev,
              hidden: false,
              borderColor: "1px solid #f5c6cb",
              backgroundColor: "#f8d7da",
              fontColor: "#721c24",
              message: "Please Wait 60 Seconds",
            };
          });
        }
      }
    );
  }

  if (loaded && activeUser) {
    return (
      <div className="email-verified-container">
        <div>
          <p>Congrats!</p>
        </div>
        <div>
          <p>Your email is already verified.</p>
        </div>
      </div>
    );
  } else if (loaded && !activeUser) {
    return (
      <div className="verify-email-container">
        <div>
          <p>Uh Oh!</p>
        </div>
        <div>
          <p>
            It looks like your account is restricted. To continue forward,
            please <strong>verify</strong> your email using the link provided,
            or request a new email below.
          </p>
        </div>
        <div className="verify-alert-container">
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
        </div>
        <div>
          <DepthButton
            depthText="Send Email"
            depthFunction={handleSubmit}
          ></DepthButton>
        </div>
      </div>
    );
  } else {
    return <LoadingSVG></LoadingSVG>;
  }
}
