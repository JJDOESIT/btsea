import "../styles/popup.css";

export default function Popup(props) {
  return (
    <div
      className="popup-container"
      style={
        props.isActive ? { transform: "scale(1)"} : { transform: "scale(0)" }
      }
    >
      <div className="popup-wrapper">
        <div className="popup-title">
          <p>{props.title}</p>
          <div>
            <input type="button" value="X" onClick={()=>props.closePopup()}></input>
          </div>
        </div>
        <div className="popup-text">
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
}
