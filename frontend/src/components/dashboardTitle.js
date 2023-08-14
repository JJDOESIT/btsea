export default function DashboardTitle(props) {
  return (
    <div className="dashboard-title-container">
      <div>
        <p>{props.walletName}</p>
      </div>
      <div>
        <p>Balance: {props.balance} TBTC</p>
      </div>
    </div>
  );
}
