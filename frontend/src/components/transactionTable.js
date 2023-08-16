import { useState, useEffect, useLayoutEffect } from "react";
import _ from "lodash";
import "../styles/transactions.css";

export default function TransactionTable(transactions) {
  const [transactionList, setTransactionList] = useState(null);
  const [paginatedPageList, setPaginatedPageList] = useState([]);
  const [paginatedPageLink, setPaginatedPageLink] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTransactionList(transactions.transactions);
    setPageCount(transactions.transactions / pageSize);
    if (transactions.transactions.length <= pageSize) {
      setPaginatedPageList(transactions.transactions);
      setPaginatedPageLink(
        _.range(1, Math.ceil(transactions.transactions.length / pageSize) + 1)
      );
      setLoaded(true);
    } else {
      setPaginatedPageList(transactions.transactions.slice(0, pageSize));
      setPaginatedPageLink(
        _.range(1, Math.ceil(transactions.transactions.length / pageSize) + 1),
        setLoaded(true)
      );
    }
  }, []);

  useLayoutEffect(() => {
    if (currentPage != null) {
      const page_slice = _(transactionList)
        .slice(pageSize * currentPage - pageSize)
        .take(pageSize)
        .value();
      setPaginatedPageList(page_slice);
    }
  }, [currentPage]);

  if (loaded) {
    return (
      <div className="transaction-container">
        <table className="transaction-table">
          <tr>
            <th>Address</th>
            <th>Value</th>
            <th>Date</th>
            <th>TXID</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
          {paginatedPageList.map((transaction) => {
            return (
              <tr>
                <td>{transaction.address}</td>
                <td>{transaction.value / 10 ** 8}</td>
                <td>{transaction.date}</td>
                <td>{transaction.txid}</td>
                <td>{transaction.is_output ? "Sent" : "Received"}</td>
                <td
                  style={{
                    backgroundColor:
                      transaction.status == "confirmed" ? "green" : "red",
                    color: "white",
                  }}
                >
                  {transaction.status}
                </td>
              </tr>
            );
          })}
        </table>
        <div className="page-link-container">
          {paginatedPageLink.map((page) => {
            return (
              <a
                href="#"
                onClick={() => {
                  setCurrentPage(page);
                }}
                className={
                  currentPage == page ? "page-link is-active" : "page-link"
                }
                style={{ padding: "0 10px 0 0" }}
              >
                {page}
              </a>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
