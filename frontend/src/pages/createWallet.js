import "../styles/createWallet.css";
import postCreateWallet from "../functions/postCreateWallet";
import { useNavigate } from "react-router-dom";

export default function CreateWallet() {
  const navigate = useNavigate();
  function handleSubmit() {
    postCreateWallet().then((response) => {
      if (response.status == 200) {
        navigate(0);
      }
    });
  }
  return (
    <div className="create-wallet-container">
      <input
        className="create-wallet-button"
        type="button"
        value="Create Wallet"
        onClick={handleSubmit}
      ></input>
    </div>
  );
}
