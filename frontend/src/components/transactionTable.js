import { useState, useEffect } from "react";
import "../styles/transactions.css";

export default function TransactionTable(transactions) {
  const [transactionList, setTransactionList] = useState(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTransactionList(transactions.transactions);
    setLoaded(true);
  }, []);

  if (loaded) {
    return (
      <div className="transaction-container">
        <table className="transaction-table">
          <tr>
            <th>
              <p>Address</p>
            </th>
            <th>
              <p>Value</p>
            </th>
            <th>
              <p>Status</p>
            </th>
            <th>
              <p>Date</p>
            </th>
            <th>
              <p>TXID</p>
            </th>
          </tr>
          {transactionList.map((transaction) => {
            console.log(transaction);
            return (
              <tr>
                <td>
                  {transaction.address}
                </td>
                <td>
                  {(transaction.value / (10**8))}
                </td>
                <td>
                  {transaction.status}
                </td>
                <td>
                  {transaction.date}
                </td>
                <td>
                {transaction.txid}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
