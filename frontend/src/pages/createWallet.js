import "../styles/createWallet.css";
import postCreateWallet from "../functions/postCreateWallet";
import { useNavigate } from "react-router-dom";


//Sends a post request to create a wallet
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
      <div className='create-wallet-wrapper'>
      <div>
        <p>No Wallet Found!</p>
      </div>
      <input
        className="create-wallet-button"
        type="button"
        value="Create Wallet"
        onClick={handleSubmit}
      ></input>
      </div>
    </div>
  );
}
