import "../styles/sidebar.css";
import { useRef, useState } from "react";
import HandleUserLogout from "../functions/handleLogout";

export default function Sidebar() {
  const [menuToggle, setMenuToggle] = useState(true);
  const selectedLink = useRef("home");
  const sidebarLinkArray = ["home", "send", "receive"];

  return (
    <>
      <div
        className={menuToggle ? "menu-toggle" : "menu-toggle is-active"}
        onClick={() => {
          setMenuToggle((prev) => {
            return !prev;
          });
        }}
      >
        <div className="hamburger">
          <span></span>
        </div>
      </div>
      <div
        className={
          menuToggle ? "side-bar-container" : "side-bar-container is-active"
        }
      >
        <aside className="side-bar-wrapper">
          <h3>Menu</h3>
          <nav className="menu">
            <a
              href="/dashboard/"
              className={
                window.location.href.includes("send") ||
                window.location.href.includes("receive")
                  ? "menu-item"
                  : "menu-item is-active"
              }
              onClick={() => {
                selectedLink.current = sidebarLinkArray[0];
              }}
            >
              Home
            </a>
            <a
              href={process.env.REACT_APP_BASE_URL + "dashboard/send/"}
              className={
                window.location.href.includes("send")
                  ? "menu-item is-active"
                  : "menu-item"
              }
              onClick={() => {
                selectedLink.current = sidebarLinkArray[1];
              }}
            >
              Send
            </a>
            <a
              href={process.env.REACT_APP_BASE_URL + "dashboard/receive/"}
              className={
                window.location.href.includes("receive")
                  ? "menu-item is-active"
                  : "menu-item"
              }
              onClick={() => {
                selectedLink.current = sidebarLinkArray[2];
              }}
            >
              Receive
            </a>
            <HandleUserLogout></HandleUserLogout>
          </nav>
        </aside>
      </div>
    </>
  );
}
