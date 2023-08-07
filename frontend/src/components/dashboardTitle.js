export default function DashboardTitle(props){
    return <div>
        <div>{props.walletName}</div>
        <div>{props.balance}</div>
    </div>
}