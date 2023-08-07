import { useEffect, useState } from "react";
import fetchUserWallet from "../functions/fetchUserWallet";
import DashboardTitle from "../components/dashboardTitle";
import LoadingSVG from "../components/loadingSVG";
import TransactionTable from "../components/transactionTable";
import CreateWallet from "./createWallet";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Loading");
  const [wallet, setWallet] = useState(null);
  const [walletCreated, setWalletCreated] = useState(false);

  useEffect(() => {
    fetchUserWallet().then((response) => {
      if (response.status == 200) {
        setWallet(response);
        setWalletCreated(true);
        setLoading(false);
      } else if (response.status == 404) {
        console.log("Wallet not found");
        setWalletCreated(false);
        setLoading(false);
      }
    });
  }, []);

  if (!loading && walletCreated) {
    return (
      <div>
        <DashboardTitle
          walletName={wallet.wallet_name}
          balance={wallet.balance}
        ></DashboardTitle>
        {wallet.transactions.length > 0 ? (
          <TransactionTable
            transactions={wallet.transactions}
          ></TransactionTable>
        ) : (
          <div>No transactions</div>
        )}
      </div>
    );
  } else if (!loading && !walletCreated) {
    return <CreateWallet></CreateWallet>;
  } else {
    return <LoadingSVG></LoadingSVG>;
  }
}
