import "../styles/createWallet.css";
import postCreateWallet from "../functions/postCreateWallet";

export default function CreateWallet() {
  function handleSubmit() {
    postCreateWallet();
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
