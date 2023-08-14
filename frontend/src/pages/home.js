import { useEffect, useState } from "react";
import fetchUserWallet from "../functions/fetchUserWallet";
import DashboardTitle from "../components/dashboardTitle";
import LoadingSVG from "../components/loadingSVG";
import TransactionTable from "../components/transactionTable";
import CreateWallet from "./createWallet";
import refreshUserWallet from "../functions/refreshUserWallet";
import reverseArray from "../functions/reverseArray";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Loading");
  const [wallet, setWallet] = useState(null);
  const [walletCreated, setWalletCreated] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchUserWallet().then((response) => {
        if (response.status == 200) {
          response.transactions = reverseArray(response.transactions);
          setWallet(response);
          setWalletCreated(true);
          setLoading(false);
          clearTimeout(timeout);
        } else if (response.status == 404) {
          console.log("Wallet not found");
          setWalletCreated(false);
          setLoading(false);
          clearTimeout(timeout);
        }
      });
    }, 1000);
  }, []);

  function handleRefresh() {
    setLoading(true);
    refreshUserWallet().then((response) => {
      if (response.status == 200) {
        response.transactions = reverseArray(response.transactions);
        setWallet(response);
        setWalletCreated(true);
        setLoading(false);
      } else if (response.status == 404) {
        console.log("Wallet not found");
        setWalletCreated(false);
        setLoading(false);
      }
    });
  }

  if (!loading && walletCreated) {
    return (
      <div
        className="home-container"
        style={{ height: "100%", overflow: "auto" , width: '100%'}}
      >
        <DashboardTitle
          walletName={wallet.wallet_name}
          balance={wallet.balance}
        ></DashboardTitle>
        <div className="transaction-refresh-container">
          <div>
            <p>Transactions</p>
          </div>
          <div>
            <input type="button" value="↻" onClick={handleRefresh}></input>
          </div>
        </div>
        {wallet.transactions.length > 0 ? (
          <TransactionTable
            transactions={wallet.transactions}
          ></TransactionTable>
        ) : (
          <div style={{display: 'flex', justifyContent: 'center'}}>No transactions</div>
        )}
      </div>
    );
  } else if (!loading && !walletCreated) {
    return <CreateWallet></CreateWallet>;
  } else {
    return <LoadingSVG></LoadingSVG>;
  }
}
