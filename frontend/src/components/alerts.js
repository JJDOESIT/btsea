import "../styles/alerts.css";

export default function Alerts(props) {
  return (
    <div
      className="alert-container"
      hidden={props.hidden}
      style={{
        backgroundColor: props.backgroundColor,
        border: props.borderColor,
      }}
    >
      <div className="alert-message-container">
        <p style={{ color: props.fontColor }}>{props.message}</p>
      </div>
      <div
        className="alert-button-container"
        onClick={() => {
          props.toggleHidden();
        }}
      >
        <input type="button" value="X"></input>
      </div>
    </div>
  );
}
