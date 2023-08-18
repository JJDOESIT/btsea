import { useEffect } from "react";
import Sidebar from "../components/sidebar.js";
import { Routes, Route } from "react-router-dom";
import "../styles/dashboard.css";
import Home from "./home.js";
import Receive from "./receive.js";
import modifyDocumentBody from "../functions/modifyDocumentBody.js";
import Send from "./send.js";

export default function Dashboard() {

  //Modify .dashboard-container on re-size
  useEffect(() => {
    setTimeout(() => {
      modifyDocumentBody("body", ".navbar-container", ".dashboard-container");
      window.addEventListener("resize", () => {
        modifyDocumentBody("body", ".navbar-container", ".dashboard-container");
      });
    }, 500);
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar></Sidebar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="receive/" element={<Receive></Receive>}></Route>
        <Route path="send/" element={<Send></Send>}></Route>
      </Routes>
    </div>
  );
}
