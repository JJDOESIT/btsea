import { useEffect } from "react";
import Sidebar from "../components/sidebar.js";
import { Routes, Route } from "react-router-dom";
import "../styles/dashboard.css";
import Logout from "./logout.js";
import Home from "./home.js";
import Receive from "./receive.js";
import modifyDocumentBody from "../functions/modifyDocumentBody.js";

export default function Dashboard() {
  useEffect(() => {
    window.addEventListener("resize", () => {
      modifyDocumentBody("body", ".navbar-container", ".dashboard-container");
    });
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar></Sidebar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="logout/" element={<Logout></Logout>}></Route>
        <Route path="receive/" element={<Receive></Receive>}></Route>
      </Routes>
    </div>
  );
}
