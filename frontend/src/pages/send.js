import sendTransaction from "../functions/postSendTransaction";
import { useState, useEffect } from "react";
import Alerts from "../components/alerts";
import "../styles/send.css";
import CryptButton from "../components/encryptButton";
import modifyDocumentBody from "../functions/modifyDocumentBody";
import LoadingSVG from "../components/loadingSVG";

export default function Send() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      modifyDocumentBody("body", ".navbar-container", ".send-container");
      window.addEventListener("resize", () => {
        modifyDocumentBody("body", ".navbar-container", ".send-container");
      });
      setLoaded(true);
    },0);
  }, []);
  const [outputAddress, setOutputAddress] = useState(null);
  const [amount, setAmount] = useState(null);
  const [alertData, setAlertData] = useState({
    hidden: true,
    borderColor: "1px solid #f5c6cb",
    backgroundColor: "#f8d7da",
    fontColor: "#721c24",
    message: "Invalid Input",
  });

  function handleSubmit() {
    sendTransaction({ outputAddress: outputAddress, amount: amount }).then(
      (response) => {
        if (response.status == 200) {
          setAlertData((prev) => {
            return {
              ...prev,
              hidden: false,
              borderColor: "1px solid #c3e6cb",
              backgroundColor: "#d4edda",
              fontColor: "#155724",
              message: "Success",
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
              message: "Invalid Input",
            };
          });
        } else if (response.status == 401) {
          setAlertData((prev) => {
            return {
              ...prev,
              hidden: false,
              borderColor: "1px solid #f5c6cb",
              backgroundColor: "#f8d7da",
              fontColor: "#721c24",
              message: "Invalid Amount",
            };
          });
        }
        else if (response.status==404){
          setAlertData((prev) => {
            return {
              ...prev,
              hidden: false,
              borderColor: "1px solid #f5c6cb",
              backgroundColor: "#f8d7da",
              fontColor: "#721c24",
              message: "No Wallet Found",
            };
          });
        }
      }
    );
  }
  return (
    <div className="send-container">
      {loaded ? (
        <div className="send-inputs-container">
          <div>
            <p>Send Transaction</p>
          </div>
          <div>
            <label>Enter a valid output address: </label>
            <input
              type="text"
              onChange={(e) => {
                setOutputAddress(e.target.value);
              }}
              className="send-text-input"
            ></input>
          </div>
          <div>
            <label>Enter an amount: </label>
            <input
              type="number"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              className="send-text-input"
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
          <div>
            <CryptButton
              targetText="Send Transaction"
              targetFunction={handleSubmit}
            ></CryptButton>
          </div>
        </div>
      ) : (
        <LoadingSVG></LoadingSVG>
      )}
    </div>
  );
}
