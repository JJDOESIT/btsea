import { useState } from "react";
import postReceiveTransaction from "../functions/postReceiveTransaction";
import Popup from "../components/popup";
import "../styles/receive.css";
import CryptButton from "../components/encryptButton";

export default function Receive() {

  const [address, setAddress] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [popupActive, setPopupActive] = useState(false);

  //Post request to generate child key from master key
  function generateAddress() {
    postReceiveTransaction()
      .then((response) => {
        if (response.status == 200) {
          setAddress(response.data.new_key, setLoaded(true));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Enable popup
  function showPopup() {
    setPopupActive(true);
  }

  return (
    <div style={{ width: "100%", position: "relative", overflowY: "auto" }}>
      <div
        className="receive-title"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <p
          style={{ fontSize: "2rem", fontFamily: "serif", fontWeight: "bold" }}
        >
          Receive transaction
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          paddingBottom: "10px",
        }}
      >
        <div>
          <CryptButton
            targetText="Generate Address"
            targetFunction={generateAddress}
          ></CryptButton>
        </div>
        <a
          href="#"
          onClick={() => showPopup()}
          style={{ paddingLeft: "20px" , alignSelf: 'center'}}
          className="receive-popup-link"
        >
          What is a bitcoin address?
        </a>
      </div>
      <hr
        style={{
          height: "10px",
          width: "80%",
          background: "black",
        }}
      ></hr>
      <Popup
        title="Bitcoin Address?"
        text="A Bitcoin address is a unique identifier used in the Bitcoin network for sending and receiving Bitcoins. It consists of a combination of letters and numbers, serving as a digital wallet for your transactions. It provides a secure and private way to interact with the Bitcoin network."
        isActive={popupActive}
        closePopup={() => {
          setPopupActive(false);
        }}
      ></Popup>
      {loaded ? (
        <div className="generated-address-container">
          <div>Your Address Is: </div>
          <div>
            <p>{address}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
